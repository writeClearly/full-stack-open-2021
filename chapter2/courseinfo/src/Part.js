import React from 'react'

const Part = ({name, exercises}) =>{
    // Prints single line of Content
    // console.log("PART here", name)
    return(
        <p>{name} {exercises}</p>
    )
}
export default Part