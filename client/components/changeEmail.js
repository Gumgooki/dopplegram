import React, {useState} from 'react'
import {connect} from 'react-redux'
import {editAccount} from '../store'


//VALIDATION FUNCTION: will need to make sure there is a confirmation in order to turn change the passwords

export const ChangeEmail = props => {
  const {id, email} = props
  const [state, setState] = useState({
    email: email,
    errors: {}
  })

  const emailValidation = (email) => {
    let isValid = true
    let errors = {}
    if(!email.length || email === ''){
      isValid = false
      errors['email'] = "Email field is blank"
    }

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
      isValid = false
      errors['email'] = "Email format is not valid"
    }

    console.log(errors)
    setState({...state, errors: errors})
    return isValid
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if(emailValidation(state.email)){
      props.editAccount(state, id)
    }
  }

  const handleChange = evt => {
    setState({...state, [evt.target.name]:  evt.target.value})
  }

  return(
    <div className='accountDiv'>
      <div>
        <h3>Change Email</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" value={state.email} onChange={handleChange}/>
            <div className="text-danger">{state.errors.email}</div>
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
    email: state.user.email
  }
}

const mapDispatch = function(dispatch){
  return {
    editAccount: (state, id) => dispatch(editAccount(state, id))
  }
}

export default connect(mapState, mapDispatch)(ChangeEmail)
