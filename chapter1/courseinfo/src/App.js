import React from 'react'

/*
REFACTOR:
Content - How to render unknown number of <p> rows without hardcoding?
*/
function App() {
  // Variables
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header title={course} />
      <Content parts = {[part1, part2, part3]} />
      <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
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
  console.log(props.parts[0].name)
  return (
    <div>
    {/* <p>{props.parts[0]} {props.exercises[0]} </p> */}
    <Part part = {props.parts[0].name} exercise = {props.parts[0].exercises}/>
    <Part part = {props.parts[1].name} exercise = {props.parts[1].exercises}/>
    <Part part = {props.parts[2].name} exercise = {props.parts[2].exercises}/>
    </div>
  )
}
const Part = (props) =>{
  // Return single paragraph containg course part name and number of exercises
  console.log(props.part)  
  return (
    <p>{props.part} {props.exercise}</p>
  )

}
export default App;
