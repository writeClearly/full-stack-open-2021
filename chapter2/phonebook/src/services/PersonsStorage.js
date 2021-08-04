import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'
const getPersons = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}
  const postPerson = (person) => {
    const request = axios.post(baseURL, person)  
    return request.then(response =>response.data)
  }
  const deletePerson = (personId) => {
    const request = axios.delete(baseURL + `/${personId}`)
    return request
  }
export default {
    getPersons,
    postPerson,
    deletePerson
}