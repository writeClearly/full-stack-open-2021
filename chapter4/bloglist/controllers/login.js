const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
const User = require("../models/user")
const loginRouter = require("express").Router()
loginRouter.post("/", async (request, response) => {
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
module.exports = loginRouter