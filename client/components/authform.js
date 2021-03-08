import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'


// VALIDATION FUNCTION

const authFormValidation = (credentials, formName) => {
  let isValid = true
  Object.keys(credentials).map((field) => {
    if(!credentials[field].length || credentials[field] === ""){
      isValid = false
      if(formName === 'login' && field === 'userName'){
        isValid = true
      }
    }else if(field === 'email'){
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(credentials[field])){
        isValid = false
      }
    }
  })
  return isValid
}


/**
 * COMPONENT
 */

const AuthForm = props => {
  const {name, displayName, error} = props
  const [state, setState] = useState({
    userName: '',
    email: '',
    password: ''
  })

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const formName = evt.target.name
    if(authFormValidation(state, formName)){
      props.sendAuth(state.userName, state.email, state.password, formName)
    }else{
      console.error('please fill out the fields')
    }
  }

  const handleChange = evt => {
    setState({...state, [evt.target.name]: evt.target.value})
  }


  return (
    <div className="credentialForm">
      <form onSubmit={handleSubmit} name={name}>
        {name === 'signup' &&
          <div className="credentialField">
            <label htmlFor="username">
              <small>Username</small>
            </label>
            <input name="userName" type="text" value={state.userName} onChange={handleChange} />
          </div>
        }
        <div className="credentialField">
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" value={state.email} onChange={handleChange}/>
        </div>
        <div className="credentialField">
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" value={state.password} onChange={handleChange}/>
        </div>
        <div className="credentialField">
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">
        <div className="google-btn">
        <div className="google-icon-wrapper">
          <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
        </div>
        <p className={name+'-btn-text btn-text'}>{displayName} with Google</p>
      </div>
      </a>
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
