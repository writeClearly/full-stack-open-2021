import PersonsStorage from "./services/PersonsStorage"

const Persons = ({ persons, setPersons }) => {
  const deletePerson = (personId) => {
    if (window.confirm(`Delete ${persons.filter(entry => entry.id === personId)[0].name} ?`)) //Ensure that user wish to delete
      PersonsStorage.deletePerson(personId)
      .then(response => setPersons(persons.filter(p => p.id !== personId)))
  }
  return (
    <div>{persons.map(person => <li key = {person.id}>{person.name} {person.number} <input type="button" value="delete" onClick={() => deletePerson(person.id)} /></li>)}</div>
  )
}
export default Persons