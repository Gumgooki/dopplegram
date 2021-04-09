import React from 'react'
import {connect} from 'react-redux'
import {ViewAllImages, AddComment} from './index'
import {receiveImages} from '../store'

/**
 * COMPONENT
 */

 //TODO will want to probably remove the useEffects from here once i've set up components to viewBulkImages and view personal images
export const UserHome = () => {
  return (
    <>
      <ViewAllImages/>
      <AddComment/>
    </>
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
