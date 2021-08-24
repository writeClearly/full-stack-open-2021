/*
Simple server which allow on POST,GET,DELETE from hardcoded array.
Basic error handling included 

Stack:
Express
Morgan (request logger)
Cors (fetching request outside origin domain)
*/

require("dotenv").config()
const express = require("express")
const cors = require("cors")
const personModel = require("./models/person")

const app = express()
const PORT = process.env.PORT || 3001
app.listen(PORT)
app.use(express.json()) //Without it request.body is undefined becouse input is not read by express
app.use(cors()) //without it fetching from different url/port is impossible 
app.use(express.static("build")) // loades frontend react app

console.log(`Listening port:${PORT}`)
app.get("/", (req, res)=>{
  res.send("All clear")
})

app.get("/api/persons", (req, res, next) => {
  personModel.find({}).then(result => {
    res.send(result) 
  }).catch((error) => next(error))
})

app.get("/api/persons/info", (req, res, next) => {
  personModel.find({}).then(result => {
    let len = result.length
    res.send(`${Date()} Phonebook contains ${len} entries`)
  }).catch((error) => next(error))
})

app.get("/api/persons/:id", (req, res, next) => {
  personModel.findById(req.params.id).then(result => {
    res.send(result)
  }).catch(error => next(error))
})

app.post("/api/persons", (req, res, next) => {
  // console.log(req.body)
  personModel.findOne({"name" : req.body.name}).then(result => {
    if (result !== null)
      res.status(400).send("Can't add this person already exists") 
  })
  const person = new personModel({
    name: req.body.name,
    number: req.body.number
  })
  console.log("Post before save", person)
  person.save().then( result => {
    console.log(person, "successfully added")
    if(result){
      res.status(201).send(result)
    }
    else 
      res.status(400).end()
  }
  ).catch(error => next(error))
})

app.put("/api/persons/:id", (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number
  }
  personModel.findByIdAndUpdate(req.params.id, person, {new:true})
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res) => {
  personModel.findByIdAndDelete(req.params.id, function (err)  {
    if (err) 
      console.log(err)
  }
  ).then(result => res.send(result)).catch(err => console.log("Eror while deleting", err.message))
})

const errorLogger = (error, request, response) => {
  console.error(error.name)
  console.error(error.message)
  if(error.name === "CastError")
    response.status(400).send("Bad request")
}

app.use((req, res) => {
  res.status(404).send({error:"No such page"})
})
app.use(errorLogger)