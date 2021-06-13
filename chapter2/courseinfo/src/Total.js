import React from 'react'

const Total = ({parts}) =>{
    // Calculates and prints total number of exercises in module
    // console.log("TOTAL here", parts)
    
    // Sum all exercises in one module
    const exercises_sum = parts.reduce((sum, currentValue)  => sum + currentValue.exercises, 0)
    return(
        <p><strong>Total exercises: {exercises_sum}</strong></p>
    )
}
export default Total