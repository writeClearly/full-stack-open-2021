const bcrypt = require("bcrypt") // for storing passowrds on disk
const usersRouter = require("express").Router()
const logger = require("../utils/logger")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
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

usersRouter.post("/login", async (request, response) => {
  const body = request.body
  console.log(body.password)
  const userForLogin = await User.findOne({username:body.username})
  console.log(userForLogin)
  const isPasswordCorrect = await bcrypt.compare(body.password, userForLogin.passwordHash)
  if(!isPasswordCorrect){
    response.sendStatus(401)
    return
  }
  const userForToken = {
    username : userForLogin.username,
    id : userForLogin._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  response.status(200).send({token, username : userForLogin.username, name : userForLogin.name})
})
module.exports = usersRouter