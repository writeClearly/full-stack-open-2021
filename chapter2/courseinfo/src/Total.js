import React from 'react'

const Total = ({parts}) =>{
    // Prints total number of exercises
    // console.log("TOTAL here", parts)
    const exercises_sum = parts.reduce((sum, currentValue)  => sum + currentValue.exercises, 0)
    return(
        <p>Total exercises: {exercises_sum}</p>
    )
}
export default Total