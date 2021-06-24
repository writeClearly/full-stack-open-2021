import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: "Jim" }, { name: "Jane" }])
  const [newPerson, setNewPerson] = useState([])

  const handleAddNote = (event) => {
    // handles adding note after clicking on submit add
    event.preventDefault()                                //Disable reload onclick
    if (newPerson.length === 0)
      return
    if (persons.some(({ name }) => name === newPerson)){  // Prevent duplicate object
      window.alert(`${newPerson} is already in phonebook`)
        return
      }
    setPersons(persons.concat({ name: newPerson }))
    setNewPerson([])
  }
  const handleInput = (event) => {
    setNewPerson(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input onChange={handleInput} />
        </div>
        <div>
          <button type="submit" onClick={handleAddNote}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <Phonebook persons={persons} />
      </ul>
    </div>)
}
const Phonebook = ({persons}) =>{
  return(
    <div>
      {persons.map((person) => <li>{person.name}</li>)}
    </div>
  )
}
export default App