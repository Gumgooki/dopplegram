import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AddImage, ViewAllImages, ViewAllUsersImages} from './index'
import {receiveImages, receiveUsersImages} from '../store'

/**
 * COMPONENT
 */

 //TODO will want to probably remove the useEffects from here once i've set up components to viewBulkImages and view personal images
export const UserHome = props => {

  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <AddImage userId = {props.id}/>
      <ViewAllImages/>
      <ViewAllUsersImages userId={props.id}/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    id: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    receiveImages: () => dispatch(receiveImages()),
    receiveUsersImages: (id) => dispatch(receiveUsersImages(id))
  }
}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
