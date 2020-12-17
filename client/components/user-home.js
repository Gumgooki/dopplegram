import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {CreateImage} from './index'
import {receiveImages} from '../store'

/**
 * COMPONENT
 */
export const UserHome = props => {
  useEffect(()=>{
    if(props.receiveImages){
      props.receiveImages()
    }
  }, [])

  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <CreateImage/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    receiveImages: () => dispatch(receiveImages())
  }
}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
