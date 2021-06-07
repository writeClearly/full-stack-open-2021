import React,{useState} from 'react'

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

  const [counters,setCounters] = useState(Array(anecdotes.length).fill((0)))
  // console.log(counters)
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length))
  const randomLabel = "Random Quote"
  const voteLabel = "Vote"
  // console.log("Counters: ", counters)
  const randQuote = () =>{
    const randint = getRandomInt(anecdotes.length)
    setSelected(randint)
  }

  const voteQuote = () =>{
    //Copy counters to incremeted array, then increment vote counter
    var incremented = [...counters]
    incremented[selected] += 1 
    setCounters(incremented)
  }
  return (
    <div>
      {anecdotes[selected]}
      <Button text = {randomLabel} onClick = {randQuote}/>
      <Button text = {voteLabel} onClick = {voteQuote}/>
      <p>This quote has: {counters[selected]} votes</p>
    </div>
    
  )
}
const Button  = ({text, onClick}) =>{
  return (
    <div><button onClick = {onClick}>{text}</button></div>
  )
}
function getRandomInt(max){
  return Math.floor(Math.random() * max)
}
export default App