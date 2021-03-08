import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */

export const Account = props => {

  const {userName} = props

  return (
    <div className='accountDiv'>
      <h3>Welcome, {userName}</h3>
      <p>Will eventually put ways to change account info here</p>
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

/**
 * PROP TYPES
 */
Account.propTypes = {
  email: PropTypes.string
}
