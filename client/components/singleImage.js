import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {deleteImage} from '../store/image'

const mapDispatchToProps = function(dispatch){
  return {
    destroyImage: (userId, imageId) => dispatch(deleteImage(userId, imageId))
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

export const SingleImage = props => {
  const {imageObj} = props

  return (
    <div key = {imageObj.id}>
      <h1>{imageObj.imageName}</h1>
      <p>Uploaded {moment(imageObj.createdAt).fromNow()}</p>
      <img src={imageObj.imageData}/>
      <p>Uploaded By {imageObj.user.email}</p>
      <p>Comments:</p>
      <button type="button" onClick={()=>props.destroyImage(props.userId, props.imageObj.id)}>Delete</button>
      {/* We'll put the comments here; will probably need to loop over */}
    </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleImage)
