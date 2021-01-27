import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {deleteImage} from '../store/image'
import {Link} from 'react-router-dom'

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
      {/* TODO: this is harcoded right now; i would rather change this up so it can work no other ports/URLs */}
      <img src={`http://localhost:3000/${imageObj.imageData}`}/>

      {imageObj.userId === props.userId ?
        <Link to='/my-images'>
          <p>Uploaded By {imageObj.user.userName}</p>
        </Link> :
        <Link to={'/user/'+ imageObj.userId}>
          <p>Uploaded By {imageObj.user.userName}</p>
        </Link>
      }
      <p>Comments:</p>
      {/*Can only access the delete button, if your userId is the same as the userId that is attached to the image. */}
      {imageObj.userId === props.userId &&
        <button type="button" onClick={()=>props.destroyImage(props.userId, props.imageObj.id)}>Delete</button>
      }
      {/* We'll put the comments here; will probably need to loop over */}
    </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleImage)
