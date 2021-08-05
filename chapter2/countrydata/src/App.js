import axios from 'axios'
import React, { useState, useEffect } from 'react';

const baseUrl = 'https://restcountries.eu/rest/v2/'
function App() {
  //App fetches country name from API and print searched
  console.log('Initial Render')
  const [countries, setCountries] = useState([])
  useEffect(()=>{
    console.log('UseEffect render')
    axios.get(baseUrl + 'all').then(response => setCountries(response.data))
  }, []) //Empty array means single call after startup render
  if(countries.length > 0)
  return( 
  <div>
    {console.log('Return render')}
    <CountrySearcher countries ={countries}/>
  </div>)
  else 
  return<div>Loading</div>
}
const CountrySearcher = ({countries}) => {
  const [countryMatches, setCountryMatches] = useState([])
  const [pattern, setPattern] = useState('awi')
  const handleInput = (event) => {
    if(event.target.value.length > 0)
    setPattern(event.target.value)
  }
  useEffect(()=>{
    console.log('Map effect')
    let arr = []
    //Insert into arr if searched country matches substring in countries
    countries.map(c => c.name.indexOf(pattern) > -1 ? arr.push(c.name) : "")
    setCountryMatches(arr)
  }, [pattern, countries])
  if (countryMatches.length === 1)
  return(
    <div>
      <input onChange={handleInput}/>
      <CountryDetails name = {countryMatches}/>
    </div>
  )
  return(
    <div>
    <input onChange={handleInput}/>
    <p>{countryMatches.length < 10 ? countryMatches.map(c=><li>{c}</li>) : "To many matches specify another filter"}</p>
    </div>
     )
}
const CountryDetails = ({name}) =>{
  const [country, setCountry] = useState([])
  useEffect(()=>{
    axios.get(baseUrl + 'name/' + name).then(response => setCountry(response.data))
    console.log(baseUrl+ 'name/'+ name)
  },[])
  console.log(country)
  if(country.length > 0)
  return ( <div>Country Details
   <h2>{name}</h2>
   <p>Capital: {country[0].capital}</p>
   <p>Population: {country[0].population}</p>
   <h3>languages</h3>
   <ul>
     {country[0].languages.map(c => <li>{c.name}</li>)}
   </ul>
   <p><img src={country[0].flag} style={{height:"100px"}} /></p>
  </div>)
  else
  return<div>loading</div>
}
export default App;
