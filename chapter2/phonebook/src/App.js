import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Phonebook from './Phonebook'
import PersonsAddForm from './PersonsAddForm'
import PersonsSearchForm from './PersonsSearchForm'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState([])
  const [newPhone, setNewPhone] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  const handleAddNote = (event) => {
    // handles adding note after clicking on submit add
    event.preventDefault()                                //Disable reload onclick
    if (newPerson.length === 0)
      return
    if (persons.some(({ name }) => name.toLowerCase() === newPerson.toLowerCase())) {  // Prevent duplicate object
      window.alert(`${newPerson} is already in phonebook`)
      return
    }
    if (newPhone.length === 0)
      return
    const PersonAdded = {name:newPerson, phone:newPhone, searched:true}
    setPersons(persons.concat(PersonAdded))
    axios.post('http://localhost:3001/persons', PersonAdded)
    .then(response=>{console.log(response,"Add")})
    setNewPerson([])
    setNewPhone([])
  }
  const handleSearchName = (event) => {
    // dynamically print only searched person

    let searchedString = event.target.value.toLowerCase()
    console.log("handleSearchName", searchedString)
    let searchedList = persons.map(p => {
      if (p.name.toLowerCase().indexOf(searchedString) !== -1) { // -1 === string not present in any substring
        return { ...p, searched: true }
      }
      else
        return { ...p, searched: false }
    })
    setPersons(searchedList)
  }
  const handleNameInput = (event) => {
    setNewPerson(event.target.value)
  }
  const handlePhoneInput = (event) => {
    setNewPhone(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <PersonsSearchForm handleSearchName={handleSearchName} />
      <PersonsAddForm handleNameInput={handleNameInput} handlePhoneInput={handlePhoneInput} handleAddNote={handleAddNote} />
      <Phonebook persons={persons} />
    </div>)
}
export default App