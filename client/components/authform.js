import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'


// VALIDATION FUNCTION

// const authFormValidation = (credentials) => {
//     if(credentials.length === 0){
//       return false
//     }else{
//       return true
//     }
// }

const authFormValidation = (credentials) => {
  console.log('actually in the function')
  Object.keys(credentials).map((field) => {
    console.log(credentials, field, ':', credentials[field], 'actually in the loop', 'length:', credentials[field].length)
    if(credentials[field].length === 0){
      console.log(credentials[field])
      return false
    }
  })
  return true
}


/**
 * COMPONENT
 */

const AuthForm = props => {
  // const {name, displayName, handleSubmit, error} = props
  const {name, displayName, error} = props
  const [state, setState] = useState({
    userName: '',
    email: '',
    password: ''
  })

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const formName = evt.target.name
    if(authFormValidation(state)){
      props.sendAuth(state.userName, state.email, state.password, formName)
    }else{
      console.error('please fill out the fields')
    }
  }

  const handleChange = evt => {
    setState({...state, [evt.target.name]: evt.target.value})
  }


  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' &&
          <div>
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="userName" type="text" value={state.userName} onChange={handleChange} />
          </div>
        }
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
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const email = evt.target.email.value
//       const password = evt.target.password.value
//       const userName = evt.target.username.value
//       dispatch(auth(userName, email, password, formName))
//     }
//   }
// }

const mapDispatch = function(dispatch){
  return {
    sendAuth: (formName, email, password, userName) => dispatch(auth(formName, email, password, userName))
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  //handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
