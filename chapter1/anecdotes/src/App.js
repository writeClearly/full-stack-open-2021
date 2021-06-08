import React, { useEffect, useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [counters, setCounters] = useState(Array(anecdotes.length).fill((0))) // Create zeroed array counting votes on anecdotes
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length))    // Generate random index
  const randomLabel = "Random Quote"
  const voteLabel = "Vote"
  const randQuote = () => {
    const randint = getRandomInt(anecdotes.length)
    setSelected(randint)
  }

  const voteQuote = () => {
    //Copy counters to incremeted array, then increment vote counter
    var incremented = [...counters]
    incremented[selected] += 1
    setCounters(incremented)
  }
  const maxIndex = (arr) => {
    // Return index of maximal element in array
    var max = arr[0]
    var index = 0
    for (let i = 1; i < arr.length; i++) {
      if (max < arr[i]) {
        max = arr[i]
        index = i
      }
    }
    return index
  }
  const buttonStyle = {
    display: "inline-block"
  }
  return (
    // To small app to worth it refactor into separate components
    
    <div> {/*Main div*/}
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected]}</div>  {/*Current quote*/}
      <div style={buttonStyle}>         {/*Get random quote*/}
        <Button text={randomLabel} onClick={randQuote} />
      </div>
      <div style={buttonStyle}>         {/*Vote on current quote*/}
        <Button text={voteLabel} onClick={voteQuote} />
      </div>

      <div>{/*Most voted anecdote*/}
      <p>This quote has: {counters[selected]} votes</p>
      <div>
        <h2>Anecdote with most votes</h2>
        <div>{anecdotes[maxIndex(counters)]}</div>      {/*Print anecodete with most votes*/}
        </div>
      <p>Max votes: {counters[maxIndex(counters)]}</p>  {/*Print anecdote max score*/}
      </div>
    </div>

  )
}
const Button = ({ text, onClick }) => {
  return (
    <div><button onClick={onClick}>{text}</button></div>
  )
}
function getRandomInt(max) {
  // Generate random integer from range 1..n-1
  return Math.floor(Math.random() * max)
}
export default App