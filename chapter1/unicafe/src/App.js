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
  const positiveRate = "Good"
  const neutralRate = "Neutral"
  const negativeRate = "Bad"
  const mainVotesCounter = "All votes"
  const averageStat = "Average Score"
  const percentageSign = "%"
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
  useEffect(() => {
    if ((goodCounter > 0) && (badCounter > 0)) {
      setAverage((goodCounter - badCounter) / votesCounter)
    }
    if ((goodCounter > 0) && (votesCounter > 0)){
      setPositiveRatio(goodCounter/votesCounter * 100)
    }
  }, [averageScore, votesCounter, goodCounter, badCounter])

  return (
    <div><h1>What is your feedback?</h1>
      <p>
        <Button text={positiveRate} handleClick={handleGood} />
        <Button text={neutralRate} handleClick={handleNeutral} />
        <Button text={negativeRate} handleClick={handleBad} />
      </p>
      <h2>Statistics</h2>
      <ul>
        <StatsRow name={positiveRate} counter={goodCounter} />
        <StatsRow name={neutralRate} counter={neutralCounter} />
        <StatsRow name={negativeRate} counter={badCounter} />
        <StatsRow name={mainVotesCounter} counter={votesCounter} />
        <StatsRow name = {averageStat} counter = {averageScore}/>
        <StatsRow name = {averageStat} counter = {positiveRatio} sign={percentageSign}/>
      </ul>
    </div>
  )
}
const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}> {text}</button>
  )
}
const StatsRow = ({ name, counter, sign }) => {
  return (
    <p>{name}: {counter} {sign}</p>
  )
}

export default App;
