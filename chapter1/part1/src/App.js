
import React from 'react'

const App = () =>{
  const currentDate = new Date()
  const ten = 10
  const twenty = 20
   return (
    <div>
    <p>Current date:{currentDate.toString()} in Arrow function </p>
    <p>{ten} plus {twenty} is {ten + twenty}</p>
    <Rect name="VSCode"/>
    </div>
  )
}
const Rect = (props) =>{
  return(
    <div
    style ={{color:"white", background:"blue", width:"100%", height:"30%"}}>
      <p>CSS in REACT with: {props.name}</p>
    </div>
  )
}
export default App;
