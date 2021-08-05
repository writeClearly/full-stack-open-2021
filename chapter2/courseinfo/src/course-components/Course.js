import React from 'react'
import Content from './Content.js'
import Header from './Header.js'
import Total from './Total.js'

const Course = ({course}) =>{
    // Component printing outline of all courses
    // console.log("COURSE", props.course.parts)
    
    console.log("2COURSE", course.map((obj) => obj.name))
    return(
        <div>
        {course.map((obj) => [ // Array brackets are necessary to "return" multiple components 
        <Header name = {obj.name}/>,
        <Content course = {obj.parts}/>,
        <Total parts = {obj.parts}/>])}
        </div>

    )
}
export default Course