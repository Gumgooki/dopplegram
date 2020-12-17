import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {CreateImage} from './index'
import {receiveImages, receiveUsersImages} from '../store'

/**
 * COMPONENT
 */
export const UserHome = props => {
  useEffect(()=>{
    if(props.receiveImages){
      props.receiveImages()
    }
  }, [])

  useEffect(() => {
    props.receiveUsersImages(props.id)
  })

  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <CreateImage userId={props.id}/>
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
