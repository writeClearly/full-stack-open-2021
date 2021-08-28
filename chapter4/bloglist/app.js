const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const blogPostRouter = require("./controllers/blogposts")
// const middleware = require("./utils/middleware")
const mongoose = require("mongoose")
const logger = require("./utils/logger") 

//{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
mongoose.connect(config.MONGO_URL).then(logger.info("Connected to DB")).catch((error) => logger.error(`DB not connected ${error}`))
logger.info("App.js Here")
app.use(cors())
app.use(express.json())
app.use(blogPostRouter)
// app

module.exports = app