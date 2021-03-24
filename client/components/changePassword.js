import React, {useState} from 'react'
import {connect} from 'react-redux'
import {editAccount} from '../store'


//VALIDATION FUNCTION: will need to make sure there is a confirmation in order to turn change the passwords

const passwordValidation = (password, confirmPassword) => {
  let isValid = true
  if(!password.length || password === ''){
    isValid = false
  }
  if(!confirmPassword.length || confirmPassword === ''){
    isValid = false
  }


}

export const ChangePassword = props => {
  const {id} = props
  const [state, setState] = useState({
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.editAccount(state, id)
  }

  const handleChange = evt => {
    setState({...state, [evt.target.name]:  evt.target.value})
  }

  return(
    <div className='accountDiv'>
      <div>
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" value={state.password} onChange={handleChange}/>
          </div>
          <button type="submit">Change Credentials</button>
          </form>
        </div>
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
