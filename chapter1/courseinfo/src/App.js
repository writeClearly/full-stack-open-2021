import React from 'react'

/*
REFACTOR:
Content - How to render unknown number of <p> rows without hardcoding?
*/
function App() {
  // Variables
  const course = 'Half Stack application development'
  const parts = [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
]

  return (
    <div>
      <Header title={course} />
      <Content parts = {parts} />
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
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
    <Part part = {props.parts[0].name} exercise = {props.parts[0].exercises}/>
    <Part part = {props.parts[1].name} exercise = {props.parts[1].exercises}/>
    <Part part = {props.parts[2].name} exercise = {props.parts[2].exercises}/>
    </div>
  )
}
const Part = (props) =>{
  // Return single paragraph containing course part name and number of exercises
  return (
    <p>{props.part} {props.exercise}</p>
  )

}
export default App;
