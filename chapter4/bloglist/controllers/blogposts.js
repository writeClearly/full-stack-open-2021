const logger = require("../utils/logger")
const Blog = require("../models/blogpost")
const blogPostRouter = require("express").Router()

const printRequestURL = (request) => {
  logger.info(`blogpost.js ${request.originalUrl}`)
}

blogPostRouter.get("/status", (request, response) => {
  printRequestURL(request)
  response.json("Works fine")
})
  
blogPostRouter.get("/", async (request, response) => {
  const result = await Blog.find({})
  response.json(result)
})
  
blogPostRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
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
module.exports = blogPostRouter