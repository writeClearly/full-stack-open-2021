import {useState} from 'react'
import PersonsStorage from './services/PersonsStorage.js'
const PersonForm = ({persons, setPersons}) =>{
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
      //If name is not present
      if (persons.map(person => person.name.toLowerCase()).indexOf(newPerson.name.toLowerCase()) !== -1) {
        alert(`${newPerson.name} is already added to phonebook`)
        return;
      }

      PersonsStorage.postPerson(newPerson).then(result => 
        {
          console.log(result);
          setPersons(persons.concat(result))
        })
      setNewPerson('')
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