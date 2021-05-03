import React from 'react'

/*
REFACTOR:
Content - How to render unknown number of <p> rows without hardcoding?
*/
function App() {
  // Variables
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title={course} />
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
}
const Header = (props) =>{
  // Return title of the page
  return (
    <h1>{props.title}</h1>
  )
}
const Content = (props) =>{
  // Retrun name of the all courses and exercises quantity
  return (
    <div>
    {/* <p>{props.parts[0]} {props.exercises[0]} </p> */}
    <Part part = {props.parts[0]} exercise = {props.exercises[0]}/>
    <Part part = {props.parts[1]} exercise = {props.exercises[1]}/>
    <Part part = {props.parts[2]} exercise = {props.exercises[2]}/>
    </div>
  )
}
const Part = (props) =>{
  // Return single paragraph containg course part name and number of exercises

  return (
    <p>{props.part} {props.exercise}</p>
  )

}
export default App;
