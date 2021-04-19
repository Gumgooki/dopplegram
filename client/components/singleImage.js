import React, { useEffect } from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {deleteImage} from '../store/image'
import {Link} from 'react-router-dom'
import {AddComment} from './'

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


  // const handleExpand = (evt) => {
  //   evt.preventDefault()

  // }
  //TODO: this doesn't actually do anything yet; i'm working on this funciton as of 04/19/21
  const handleComments = (maxIndex) =>  {
    imageObj.comments.map((comment, currentIndex) => {
      if(currentIndex <= maxIndex){
        return (
          <div key={comment.id}>
            <span>{comment.user.userName}: </span>{comment.commentText}
          </div>
        )
      }else{
        return(
          <button type="submit" onClick={() => handleComments(10)}>expand comments</button>
        )
      }
    })
  }

  return (
    <div className="imageBox" key = {imageObj.id}>
      {/*Can only access the delete button, if your userId is the same as the userId that is attached to the image. */}
        {imageObj.userId === props.userId &&
        <button className='trashButton' type="button" onClick={()=>props.destroyImage(props.userId, props.imageObj.id)}>
          <svg width="22" height="22" viewBox="0 0 1024 1024">
            <path d="M192 1024h640l64-704h-768zM640 128v-128h-256v128h-320v192l64-64h768l64 64v-192h-320zM576 128h-128v-64h128v64z" />
          </svg>
        </button>
      }
      <h1>{imageObj.imageName}</h1>
      <p>Uploaded {moment(imageObj.createdAt).fromNow()}</p>
      {/* TODO: this is harcoded right now; i would rather change this up so it can work no other ports/URLs */}
      <div className='imageContainer'>
        <img src={`http://localhost:3000/${imageObj.imageData}`}/>
      </div>

      {imageObj.userId === props.userId ?
        <Link to='/my-images'>
          <p>Uploaded By {imageObj.user.userName}</p>
        </Link> :
        <Link to={'/user/'+ imageObj.userId}>
          <p>Uploaded By {imageObj.user.userName}</p>
        </Link>
      }
      <p>Comments:</p>
      {/* We'll put the comments here; will probably need to loop over */}
      <div>
        {imageObj.comments.map(comment => {
          return (<div key={comment.id}><span>{comment.user.userName}: </span>{comment.commentText}</div>)
        })}
      </div>
      <div>
        <h3>this is the tsting one</h3>
        <button onClick={handleComments}>Click me</button>
      </div>
      <AddComment imageId={imageObj.id}/>
    </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleImage)
