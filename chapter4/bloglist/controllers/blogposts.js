const logger = require("../utils/logger")
const Blog = require("../models/blogpost")
const blogPostRouter = require("express").Router()
const User = require("../models/user")

blogPostRouter.get("/status", (request, response) => {
  response.json("Works fine")
})
  
blogPostRouter.get("/", async (request, response) => {
  const result = await Blog.find({}).populate("user")
  response.json(result)
})
  
blogPostRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body)
  if(!blog.user){
    const somePerson = await User.findOne({})
    blog.user = somePerson._id
  }

  const savedBlog = await blog.save()
  const userCreator = await User.findById(blog.user)
  userCreator.blogpost = userCreator.blogpost.concat(savedBlog._id)
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