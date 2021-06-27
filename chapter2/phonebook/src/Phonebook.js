import React from 'react'
const Phonebook = ({persons}) =>{
    // Print PersonName and Phone if currently searched
    return(
    <div>
        <h2>Numbers</h2>
        <ul>
      <div>
        {persons.map((person) => 
                   <li>{person.name} {person.phone}</li>)}
      </div>
      </ul>
    </div>
    )
  }
  export default Phonebook