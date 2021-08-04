import React, { useEffect } from 'react'
import { useState } from 'react';
import Filter from './Filter.js'
import PersonForm from './PersonsForm.js';
import PersonsStorage from './services/PersonsStorage.js'
function App() {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    PersonsStorage.getPersons().then(storedPersons => {
      setPersons(storedPersons)
    })
  }, [persons.number])
  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <Filter persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App;
