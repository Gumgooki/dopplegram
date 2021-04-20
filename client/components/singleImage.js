import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {deleteImage} from '../store/image'
import {Link} from 'react-router-dom'
import {AddComment, CommentList} from './'

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
  const [expandCollapse, setExpandCollapse] = useState({
    expanded: false,
    moreThanThree: false
  })

  useEffect(()=>{
    if(imageObj.comments.length > 3){
      setExpandCollapse({...expandCollapse, moreThanThree: true})
    }
  }, [imageObj.comments])

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
      <CommentList comments={imageObj.comments} expanded={expandCollapse.expanded}/>
      {expandCollapse.moreThanThree && <button onClick={
        () => setExpandCollapse({
          ...expandCollapse,
          expanded: !expandCollapse.expanded })}
        type="submit">
        {expandCollapse.expanded ?
        <>Collapse Comments</> :
        <> Expand Comments</>}
      </button>}
      <AddComment imageId={imageObj.id}/>
    </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleImage)
