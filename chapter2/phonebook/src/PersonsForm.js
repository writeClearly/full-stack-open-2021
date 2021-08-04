import axios from 'axios'
import { useState } from 'react'
import PersonsStorage from './services/PersonsStorage.js'
const PersonForm = ({ persons, setPersons }) => {
  const [newPerson, setNewPerson] = useState([])

  const handleInputNameChange = (event) => {
    setNewPerson({ name: event.target.value, number: newPerson.number })
  }
  const handleInputNumberChange = (event) => {
    setNewPerson({ name: newPerson.name, number: event.target.value })
  }

  const handleAddPerson = (event) => {
    event.preventDefault();
    if (newPerson.number === undefined || newPerson.name === undefined) return;
    if (newPerson.number.length < 1 || newPerson.name.length < 1) return;

    console.log(newPerson)
    //If name is already present prompt update
    if (persons.map(person => person.name.toLowerCase()).indexOf(newPerson.name.toLowerCase()) !== -1) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number ?`))
        updatePerson()
      return;
    }

    PersonsStorage.postPerson(newPerson).then(result => {
      console.log(result);
      setPersons(persons.concat(result))
    })
    setNewPerson('')
  }
  const updatePerson = () => {
    // 1. find updated person by name, 
    // 2. take its ID, 
    // 3. send put request for this URL
    // 4. filter out old object and set state with new one
    const updatedPerson = persons.filter(person => person.name === newPerson.name)
    const resourceURL = `/${updatedPerson[0].id}`
    PersonsStorage.updatePerson(resourceURL, newPerson).then(resp =>
      setPersons(persons.filter(p => p.id !== updatedPerson[0].id).concat(resp.data)))
  }
  return (
    <div>
      <form onSubmit={handleAddPerson}>
        <div>name:<input onChange={handleInputNameChange} /></div>
        <div>number:<input onChange={handleInputNumberChange} /></div>
        <input type="submit" value="Add" />
      </form>
    </div>
  )
}
export default PersonForm