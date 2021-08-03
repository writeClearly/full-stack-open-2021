import { useState } from "react"
import Persons from './Persons.js'
const Filter = ({persons}) =>{
    // Show persons matching user input from searchbar
    const [searchedPerson, setSearchedPerson] = useState([])
    const handleInputSearchedPerson = (event) => {
      setSearchedPerson(event.target.value)
    }
    const filterArray = (persons, searchedPerson) =>{
    let filtered = []
    for (let index in persons){
      if(persons[index].name.toLowerCase().indexOf(String(searchedPerson).toLowerCase()) !== -1)
      filtered.push(persons[index])
    }
    return filtered
  }
    return (
      <div>
        <div><p>filter shown with<input onChange={handleInputSearchedPerson}/></p></div>
        <h3>Numbers</h3>
        <Persons persons={filterArray(persons, searchedPerson)}/>
      </div>
    )
  }

  export default Filter