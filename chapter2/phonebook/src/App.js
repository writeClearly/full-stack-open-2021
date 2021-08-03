import React, { useEffect } from 'react'
import { useState } from 'react';
import Filter from './Filter.js'
import PersonForm from './PersonsForm.js';
import PersonsStorage from './services/PersonsStorage.js'
function App() {
  // const [persons, setPersons] = useState([{ name: "John Smith", number: "654" }, { name: "Mia Mitch", number: "754" }, { name: 'Ada Lovelace', number: '39-44-5323523' },
  // { name: 'Dan Abramov', number: '12-43-234345' }])
  const [persons, setPersons] = useState([])
  useEffect(()=>{
    PersonsStorage.getPersons().then(response => {
      setPersons(response.data)
    })
    console.log("Effect")
  }, [persons.name])
  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm persons = {persons} setPersons = {setPersons}/>
      <Filter persons = {persons} />
    </div>
  )
}

export default App;
