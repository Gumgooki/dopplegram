import React, {useState} from 'react'
import {connect} from 'react-redux'
import {editAccount} from '../store'
import ChangeEmail from './changeEmail'
import ChangePassword from './changePassword'
import ChangeUsername from './changeUsername'


// VALIDATION FUNCTION


/**
 * COMPONENT
 */

export const Account = props => {

  const {userName, googleId} = props

  return (
    <div className='credentialForm'>
      <h3>Welcome, {userName}</h3>
      {googleId ? (
        <>
          <ChangeUsername/>
        </>
      ):(
       <>
          <ChangeUsername/>
          <ChangeEmail/>
          <ChangePassword/>
        </>)}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userName: state.user.userName,
    googleId: state.user.googleId
  }
}


export default connect(mapState)(Account)

