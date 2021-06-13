import React from 'react'

const Part = ({name, exercises}) =>{
    // Prints single line of course  eg. React 12 
    // console.log("PART here", name)
    return(
        <p>{name} {exercises}</p>
    )
}
export default Part