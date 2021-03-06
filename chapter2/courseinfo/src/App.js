import React from 'react';
import ReactDOM from 'react-dom';
import Course from './course-components/Course.js'

const App = () => {
  // This app is single page listing of courses in form:
  // Title:
  // List of subjects(Content) and their exercises:
  // Total exercises in one module:
  
  // Example:
  // Title: Half Stack application development
  // Content: Fundamentals of React 10
  // Content: Using props to pass data 7
  // Total: Total exercises: 42

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return <Course course={courses} />
}

ReactDOM.render(<App />, document.getElementById('root'))
export default App