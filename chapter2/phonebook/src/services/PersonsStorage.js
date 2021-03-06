import axios from 'axios'
const baseURL = 'https://warm-stream-65671.herokuapp.com/api/persons'
const getPersons = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}
const postPerson = (person) => {
  const request = axios.post(baseURL, person)
  return request.then(response => response.data)
}
const deletePerson = (personId) => {
  return axios.delete(baseURL + `/${personId}`)
}
const updatePerson = (resourceURL, updatedPerson) => {
  return axios.put(baseURL + resourceURL, updatedPerson)
}
export default {
  getPersons,
  postPerson,
  deletePerson,
  updatePerson
}