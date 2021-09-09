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

usersRouter.get("/", (request, response) => {
  User.find({}).then((result) => response.send(result))
})
module.exports = usersRouter