import { useEffect, useState } from "react";
import React from 'react'
//Feedback site, handles clickable rating and prints basic statistics
const App = () => {
  const [votesCounter, setVotes] = useState(0)
  const [goodCounter, setGood] = useState(0)
  const [neutralCounter, setNeutral] = useState(0)
  const [badCounter, setBad] = useState(0)
  const [averageScore, setAverage] = useState(0)
  const [positiveRatio, setPositiveRatio] = useState(0) 
  const positiveLabel = "Good"
  const neutralLabel = "Neutral"
  const negativeLabel = "Bad"
  const positiveRatioLabel = "Positive percentage"
  const averageLabel ='Average Score'
  const percentageSign = "%"
  
  // 31/05/2021
  // All handle functions mantain incrementing relative score counter
  // and main counter currently called "votesCounter"
  const handleGood = () => {
    setGood(goodCounter + 1)
    setVotes(votesCounter + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutralCounter + 1)
    setVotes(votesCounter + 1)
  }
  const handleBad = () => {
    setBad(badCounter + 1)
    setVotes(votesCounter + 1)
  }
  const statsContainer = [
    {
      [positiveLabel]:goodCounter
    },
    {
      [neutralLabel]:neutralCounter
    },
    {
      [negativeLabel]:badCounter
    },
    {
      [averageLabel]:averageScore
    },
    {
      [positiveRatioLabel]:positiveRatio + percentageSign //Sign concatenation eg: Positives:70%
    }
]
  // 31/05/2021
  // useEffect() mantain refreshing side effects
  // without it when you updates counters by async function you will print old values, 
  // to avoid this, counters are wrapped by useEffect with specifed list of volatile counters 
  // which reneders them after each change  
  useEffect(() => {
    if ((goodCounter > 0) && (badCounter > 0)) {
      setAverage((goodCounter - badCounter) / votesCounter)
    }
    if ((goodCounter > 0) && (votesCounter > 0)){
      setPositiveRatio(goodCounter/votesCounter * 100)
    }
  }, [averageScore, votesCounter, goodCounter, badCounter]) // list of volatile counters checked by useEffect()

  return (
    // Main Page
    <div>
      <h1>What is your feedback?</h1>
      <p>
        <Button text={positiveLabel} handleClick={handleGood} />
        <Button text={neutralLabel} handleClick={handleNeutral} />
        <Button text={negativeLabel} handleClick={handleBad} />
      </p>
      <h2>Statistics</h2>
      <ul>
        <Statistics props = {statsContainer}/>
      </ul>
    </div>
  )
}
// Simple button decorator
const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}> {text}</button>
  )
}
const StatsRow = ({ name, counter}) => {
  return (
    <p>{name}: {counter}</p>
  )
}
// Prints all feedback statistics
const Statistics = ({props}) =>{
        return(
          //Takes each row from object and prints in Key:Value style by styling component
          <div>{props.map(row => <StatsRow name={Object.keys(row)} counter = {Object.values(row)} />)}</div>
          )
}
export default App;