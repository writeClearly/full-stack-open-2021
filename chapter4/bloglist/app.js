const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const blogPostRouter = require("./controllers/blogposts")
// const middleware = require("./utils/middleware")
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const usersRouter = require("./controllers/users") 
const pathLogger = require("./utils/pathLogger")

//{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
mongoose.connect(config.MONGO_URL).then(logger.info("Connected to DB")).catch((error) => logger.error(`DB not connected ${error}`))
logger.info("App.js Here")
app.use(cors())
app.use(express.json())
app.use(pathLogger)
app.use("/api/blogs", blogPostRouter)
app.use("/api/users", usersRouter)
console.log(`Node env ${process.env.NODE_ENV}`)

module.exports = app