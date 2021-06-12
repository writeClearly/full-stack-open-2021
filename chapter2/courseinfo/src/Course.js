import React from 'react'
import Content from './Content.js'
import Header from './Header.js'
import Total from './Total.js'

const Course = (props) =>{
    // Component printing course outline
    console.log("COURSE", props.course.parts)
    return(
        <div>
        <Header name = {props.course.name}/>
        <Content course = {props.course.parts}/>
        <Total parts = {props.course.parts}/>
        </div>

    )
}
export default Course