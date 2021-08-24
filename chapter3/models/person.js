  const mongoose = require('mongoose')

  const url = process.env.MONGO_URL
  mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:true, useCreateIndex:true})
      .then(console.log('Fetched phonebook (MongoDB)'))
      .catch((error)=>console.log(`Database connect failure reason: ${error.message}`))
  const personSchema = new mongoose.Schema({
    name:{type:String, unique:true, required:true},
    number:{type:String, unique:false, required:true}
  })
  
  personSchema.set('toJSON', {
    transform: (document, returnedObj) =>{
      returnedObj.id = returnedObj._id.toString()
      delete returnedObj._id
      delete returnedObj.__v
    }
  })
  
  module.exports = mongoose.model('Person', personSchema)