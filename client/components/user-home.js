import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AddImage, ViewAllImages, ViewAllUsersImages} from './index'
import {receiveImages, receiveUsersImages} from '../store'

/**
 * COMPONENT
 */

 //TODO will want to probably remove the useEffects from here once i've set up components to viewBulkImages and view personal images
export const UserHome = () => {
  return (
    <div>
      <ViewAllImages/>
    </div>
  )
}

/**
 * CONTAINER
 */

const mapDispatchToProps = dispatch => {
  return {
    receiveImages: () => dispatch(receiveImages()),
  }
}

export default connect(null, mapDispatchToProps)(UserHome)
