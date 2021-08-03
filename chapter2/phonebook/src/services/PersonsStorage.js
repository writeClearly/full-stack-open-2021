import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'
const getPersons = () => {
  const request = axios.get(baseURL)
  return request
}
  const postPerson = (person) =>{
      axios.post(baseURL, person)
  }
export default {
    getPersons,
    postPerson
}