const logger = require("../utils/logger")
const Blog = require("../models/blogpost")
const blogPostRouter = require("express").Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const getTokenFrom = (request) =>{
  const authorization = request.get("authorization")
  if(authorization && authorization.toLowerCase().startsWith("bearer"))
    return authorization.substring(7)
  else
    return null
}


blogPostRouter.get("/status", (request, response) => {
  response.json("Works fine")
})
  
blogPostRouter.get("/", async (request, response) => {
  const result = await Blog.find({}).populate("user")
  response.json(result)
})
  
blogPostRouter.post("/", async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!decodedToken)
    return response.status(401).send("Auth token missing")
  const blog = new Blog(request.body)
  logger.info(decodedToken.id)
  const userCreator = await User.findById(decodedToken.id)
  if(!userCreator)
    return response.sendStatus(401)
  const savedBlog = await blog.save()
  userCreator.blogpost = userCreator.blogpost.concat(savedBlog.id)
  await userCreator.save()
  response.status(201).json(savedBlog)
})

blogPostRouter.delete("/:id", async (request, response) => {
  Blog.findByIdAndDelete(request.params.id,  (error) =>{
    if(error){
      let errorHint = "error hint not ready"
      if(error.name === "CastError")
        errorHint = "Value of id seems to be incorrect" 
      logger.error(error.message)
      response.status(400).send(errorHint)}
    else{
      logger.info("Successful deletion")
      response.status(204).end()
    }
  })
})

blogPostRouter.put("/:id", async (request, response) => {
  const body = request.body
  const blog = {
    "title": request.body.title,
    "author": request.body.author,
    "url": request.body.url,
    "likes": request.body.likes
  }
  console.log(body)
  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true}) // new:true returns updated note
    console.log(updatedBlog)
    response.sendStatus(200)
  }catch(error){
    if(error.message === "CastError")
      response.status(400).send("Bad id")
  }
})
module.exports = blogPostRouter