import React, {useState} from 'react'
import {connect} from 'react-redux'


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

  const {userName} = props
  const [state, setState] = useState({
    userName: '',
    password: ''
  })


  //will probably break these components out into seperate form components (one for username and one for pasword)
  const handleSubmit = (evt) => {
    evt.preventDefault()
    if(authFormValidation(state.password)){
      // need the correct redux function
      // props.sendAuth(state.password)
    }else{
      console.error('please fill out the field')
    }
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
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" value={state.password} onChange={handleChange}/>
          <button type="submit">Change Password</button>
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
  }
}

export default connect(mapState)(Account)

