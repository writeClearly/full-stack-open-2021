const bcrypt = require("bcrypt") // for storing passowrds on disk
const usersRouter = require("express").Router()
const logger = require("../utils/logger")
const User = require("../models/user")
usersRouter.post("/", (request, response) => {
  const saltRounds = 13
  bcrypt.hash(request.body.password, saltRounds, (error, hashedPassword) => {
    logger.info(hashedPassword)
    // bcrypt.compare("password1234", hashedPassword).then((result)=>console.log(result))
    const user = {
      "username" : request.body.username,
      "name" : request.body.name,
      "password" : request.body.password
    }
    const newUser = User(user)
    logger.info(newUser)
    newUser.save()  
  })
  logger.info(request.body)
  response.json(request.body)
})

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogpost", {title:1, url:1, author:1}) // {title:1} means include property in response
  response.json(users)
})
module.exports = usersRouter