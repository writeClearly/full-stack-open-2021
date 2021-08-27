const logger = require("../utils/logger")
const Blog = require("../models/blogpost")
const blogPostRouter = require("express").Router()

blogPostRouter.get("/", (request, response) => {
  logger.info("default route")
  response.send("Works fine")
})
  
blogPostRouter.get("/api/blogs", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    }).catch((error) => logger.error(`Reason ${error}`))
})
  
blogPostRouter.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})
module.exports = blogPostRouter