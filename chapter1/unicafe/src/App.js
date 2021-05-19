import { useState } from "react";
import React from 'react'

const App = () => {
  const [voteCounter, setVote] = useState(0)
  const [goodCounter,setGood] = useState(0)
  const [neutralCounter,setNeutral] = useState(0)
  const [badCounter,setBad] = useState(0)
  const handleGood = () =>{
   setGood(goodCounter + 1)
   setVote(voteCounter + 1)
   console.log(goodCounter)
  }
  const handleNeutral = () =>{
    setNeutral(neutralCounter + 1)
    setVote(voteCounter + 1) 
    console.log(neutralCounter)
   }
   const handleBad = () =>{
    setBad(badCounter + 1)
    setVote(voteCounter + 1)
    console.log(goodCounter)
   }
  return (
    <div><h1>What is your feedback?</h1>
    <p>
      <Button text = {"Good"} handleClick = {handleGood}/>
      <Button text = {"Neutral"} handleClick = {handleNeutral}/>
      <Button text = {"Bad"} handleClick = {handleBad}/>
      </p>
      <h2>Statistics</h2>
      <ul>
          <p>Good:{goodCounter}</p>
          <p>Neutral:{neutralCounter}</p>
          <p>Bad:{badCounter}</p>
      </ul>
    </div>
  )
}
 const Button =  ({text, handleClick}) =>{
   return(
   <button onClick = {handleClick}> {text}</button>
   )
 }

export default App;
