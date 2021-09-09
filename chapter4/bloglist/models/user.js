const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  blogpost: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"blogpost"
    }
  ],
})
userSchema.set("toJSON",  {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.passwordHash
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.blogpost // It may be usefull to uncomment, if blogs will be needed
  }
})
const User = mongoose.model("User", userSchema)
module.exports = User