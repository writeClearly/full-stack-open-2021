const bcrypt = require("bcrypt") // for storing passowrds on disk
const usersRouter = require("express").Router()
const logger = require("../utils/logger")
const User = require("../models/user")
const SALT_ROUNDS = 13

usersRouter.post("/", async (request, response) => {
  logger.info(request.body.password)
  const hashedPassword = await bcrypt.hash(request.body.password, SALT_ROUNDS)
  logger.info(hashedPassword)
  const newUser = new User({
    username : request.body.username,
    name : request.body.name,
    passwordHash : hashedPassword
  })
  await newUser.save()  
  logger.info(newUser)
  response.json(newUser)
})

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogpost", {title:1, url:1, author:1}) // {title:1} means include property in response
  response.json(users)
})
module.exports = usersRouter