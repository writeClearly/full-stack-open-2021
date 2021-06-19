import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const namePlaceholder = "Add name"
  const handleInput = (event) =>{
    // Receives input form name field and adds new person
    const person = {
      name:event.target.value
    }
      console.log("INPUT HANDLER")
      setNewName(person)
  }
  const handleAddNote = (event) =>{
    // 
    event.preventDefault()
    if (newName !== ""){
    console.log("New name empty", persons)
    setPersons(persons.concat(newName))
    setNewName('')
  }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input placeholder={namePlaceholder} onChange = {handleInput}/>
        </div>
        <div>
          <button type="submit" onClick = {handleAddNote}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <li>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App