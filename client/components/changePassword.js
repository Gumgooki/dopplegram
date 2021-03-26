import React, {useState} from 'react'
import {connect} from 'react-redux'
import {editAccount} from '../store'


//VALIDATION FUNCTION: will need to make sure there is a confirmation in order to turn change the passwords

export const ChangePassword = props => {
  const {id} = props
  const [state, setState] = useState({
    password: '',
    confirmPassword: '',
    errors: {}
  })

  const passwordValidation = (password, confirmPassword) => {
    let isValid = true
    let errors = {}
    if(!password.length || password === ''){
      isValid = false
    }
    if(!confirmPassword.length || confirmPassword === ''){
      isValid = false
    }
    if(typeof password !== undefined && typeof confirmPassword !== undefined){
      if(password !== confirmPassword){
        isValid = false
        errors['password']="Passwords don't match"
      }
    }
    console.log(errors)
    setState({...state, errors: errors})
    return isValid
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if(passwordValidation(state.password, state.confirmPassword)){
      props.editAccount(state, id)
    }
  }

  const handleChange = evt => {
    setState({...state, [evt.target.name]:  evt.target.value})
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div className="credentialField">
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" value={state.password} onChange={handleChange}/>
          <div className="text-danger">{state.errors.password}</div>
        </div>
        <div className="credentialField">
          <label htmlFor="confirmPassword">
            <small>Confirm Password</small>
          </label>
          <input name="confirmPassword" type="password" value={state.confirmPassword} onChange={handleChange}/>
          <div className="text-danger">{state.errors.password}</div>
        </div>
        <button className="changeCredentialSubmit" type="submit">Change Password</button>
        </form>
    </div>
  )
}


const mapState = state => {
  return {
    id: state.user.id
  }
}

const mapDispatch = function(dispatch){
  return {
    editAccount: (state, id) => dispatch(editAccount(state, id))
  }
}

export default connect(mapState, mapDispatch)(ChangePassword)
