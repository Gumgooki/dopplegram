import React, {useState} from 'react'
import {connect} from 'react-redux'
import {editAccount} from '../store'


// VALIDATION FUNCTION

const authFormValidation = (credentials) => {
  let isValid = true
  if(!credentials.length || credentials === ""){
    isValid = false
  }
  return isValid
}


/**
 * COMPONENT
 */

export const Account = props => {

  const {userName, email, id} = props
  const [state, setState] = useState({
    email: email,
    userName: userName,
    password: ''
  })


  //will probably break these components out into seperate form components (one for username and one for pasword)
  const handleSubmit = (evt) => {
    evt.preventDefault()
    //just for testing
    props.editAccount(state, id)
    // if(authFormValidation(state)){
    //   props.editAccount(state, id)
    // }else{
    //   console.error('please fill out the fields')
    // }
  }

  const handleChange = evt => {
    setState({...state, [evt.target.name]: evt.target.value})
  }

  return (
    <div className='accountDiv'>
      <h3>Welcome, {userName}</h3>
      <p>Will eventually put ways to change Usename or Password here</p>
      <div>
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName">
              <small>Username</small>
            </label>
            <input name="userName" type="text" value={state.userName} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" value={state.email} onChange={handleChange}/>
          </div>
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userName: state.user.userName,
    email: state.user.email,
    id: state.user.id
  }
}

const mapDispatch = function(dispatch){
  return {
    editAccount: (state, id) => dispatch(editAccount(state, id))
  }
}

export default connect(mapState, mapDispatch)(Account)

