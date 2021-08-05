import React from 'react'
import Part from './Part.js'
const Content = ({course}) =>{
    // Prints subjects of single module
    // console.log("CONTENT",course ,course.map(row => row.exercises))
    return( 
        <div>
            {course.map(row => <Part name = {row.name} exercises = {row.exercises}/>)}
        </div>
    )
}
export default Content