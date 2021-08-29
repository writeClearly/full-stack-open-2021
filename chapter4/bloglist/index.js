require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model("Blog", blogSchema)

//{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
mongoose.connect(MONGO_URL)

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
  response.send("Works fine")
})

app.get("/api/blogs", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})