const PersonsAddForm = ({handleNameInput,handlePhoneInput,handleAddNote}) =>{
    return(
      <form>
          <div>name: <input onChange={handleNameInput} /></div>
          <div>number: <input onChange={handlePhoneInput}/></div>
          <div>
            <button type="submit" onClick={handleAddNote}>add</button>
          </div>
        </form>
    )
  }
export default PersonsAddForm