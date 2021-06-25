const PersonSearchForm = ({handleSearchName})=>{
    return(
      <div>search for: <input onChange = {handleSearchName}/></div>
    )
  }
export default PersonSearchForm