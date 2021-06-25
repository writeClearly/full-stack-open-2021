import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: "Ada", phone:'124',  searched:true }, 
                                          { name: "Jane",phone:'1312', searched:true },
                                          { name: "Bill",phone:'1312', searched:true }])
  const [newPerson, setNewPerson] = useState([])
  const [newPhone, setNewPhone] = useState([])
  const handleAddNote = (event) => {
    // handles adding note after clicking on submit add
    event.preventDefault()                                //Disable reload onclick
    if (newPerson.length === 0)
      return
    if (persons.some(({ name }) => name === newPerson)){  // Prevent duplicate object
      window.alert(`${newPerson} is already in phonebook`)
        return
      }
    if (newPhone.length === 0)
      return
    setPersons(persons.concat({ name: newPerson, phone: newPhone, searched: true }))
    setNewPerson([])
    setNewPhone([])
  }
  const handleSearchName = (event) =>{
    // dynamically print only searched person

    let searchedString = event.target.value.toLowerCase()
    let searchedList = persons.map(p =>{
      if(p.name.toLowerCase().indexOf(searchedString)!==-1){ // -1 === string not present in any substring
        return {...p, searched:true}
      }
      else
      return {...p, searched:false}
    })
    setPersons(searchedList)
  }
  const handleNameInput = (event) => {
    setNewPerson(event.target.value)
  }
  const handlePhoneInput = (event)=>{
    setNewPhone(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>search for: <input onChange = {handleSearchName}/></div>
      <form>
        <div>name: <input onChange={handleNameInput} /></div>
        <div>number: <input onChange={handlePhoneInput}/></div>
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
  // Print PersonName and Phone if currently searched
  return(
    <div>
      {persons.map((person) => 
                person.searched ===true ? <li>{person.name} {person.phone}</li>:"")}
    </div>
  )
}
export default App