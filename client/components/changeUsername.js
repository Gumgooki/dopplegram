import React, {useState} from 'react'
import {connect} from 'react-redux'
import {editAccount} from '../store'


//VALIDATION FUNCTION: will need to make sure there is a confirmation in order to turn change the passwords

export const ChangeUsername = props => {
  const {id, userName} = props
  const [state, setState] = useState({
    userName: userName,
    errors: {}
  })

  const userNameValidation = (userName) => {
    let isValid = true
    let errors = {}
    if(!userName.length || userName === ''){
      isValid = false
      errors['userName'] = "Username should be 6 or more characters"
    }

    if(userName.length <= 5){
      isValid = false
      errors['userName'] = "Username should be 6 or more characters"
    }

    console.log(errors)
    setState({...state, errors: errors})
    return isValid
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if(userNameValidation(state.userName)){
      props.editAccount(state, id)
    }
  }

  const handleChange = evt => {
    setState({...state, [evt.target.name]:  evt.target.value})
  }

  return(
    <div className='accountDiv'>
      <div>
        <h3>Change Username</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">
              <small>Username</small>
            </label>
            <input name="userName" type="text" value={state.userName} onChange={handleChange}/>
            <div className="text-danger">{state.errors.userName}</div>
          </div>
          <button type="submit">Change Credentials</button>
          </form>
        </div>
    </div>
  )
}


const mapState = state => {
  return {
    id: state.user.id,
    userName: state.user.userName
  }
}

const mapDispatch = function(dispatch){
  return {
    editAccount: (state, id) => dispatch(editAccount(state, id))
  }
}

export default connect(mapState, mapDispatch)(ChangeUsername)
