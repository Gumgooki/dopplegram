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
  const [expandCommentSubmit, setExpandCommentSubmit] = useState({
    extended: false
  })

  const [boxColor, setBoxColor] = useState({
    expandComments: '#90593d',
    expandSubmit: '#90593d'
  })

  useEffect(()=>{
    if(imageObj.comments.length > 3){
      setExpandCollapse({...expandCollapse, moreThanThree: true})
    }
  }, [imageObj.comments])

  useEffect(() => {
    if(expandCommentSubmit.extended){
      setBoxColor({...boxColor, expandSubmit: '#9b734f'})
    }else if (!expandCommentSubmit.extended){
      setBoxColor({...boxColor, expandSubmit: '#90593d'})
    }
  }, [expandCommentSubmit.extended])


  useEffect(() => {
    if(expandCollapse.expanded){
      setBoxColor({...boxColor, expandComments: '#9b734f'})
    }else if (!expandCollapse.expanded){
      setBoxColor({...boxColor, expandComments: '#90593d'})
    }
  }, [expandCollapse.expanded])


  return (
    <div className="imageBox" key = {imageObj.id}>

      <div className="imageBoxTop">
      {/*Can only access the delete button, if your userId is the same as the userId that is attached to the image. */}
        {imageObj.userId === props.userId &&
        <button className='trashButton' type="button" onClick={()=>props.destroyImage(props.userId, props.imageObj.id)}>
          <svg width="22" height="22" viewBox="0 0 1024 1024">
            <path d="M192 1024h640l64-704h-768zM640 128v-128h-256v128h-320v192l64-64h768l64 64v-192h-320zM576 128h-128v-64h128v64z" />
          </svg>
        </button>
      }

      <p>Uploaded {moment(imageObj.createdAt).fromNow()}{' '}
        {imageObj.userId === props.userId ?
          <Link to='/my-images'>
            <>by {imageObj.user.userName}</>
          </Link> :
          <Link to={'/user/'+ imageObj.userId}>
            <>by {imageObj.user.userName}</>
          </Link>
        }
      </p>
      </div>

      {/* TODO: this is harcoded right now; i would rather change this up so it can work no other ports/URLs */}
      <div className='imageContainer'>
        <img src={`http://localhost:3000/${imageObj.imageData}`}/>
      </div>

      <p>Comments:</p>
      <CommentList imageId={imageObj.id}comments={imageObj.comments} expanded={expandCollapse.expanded}/>
      <div className="imageButtons">
        {expandCollapse.moreThanThree && <button className="expandCommentsBut" onClick={
          () => setExpandCollapse({
            ...expandCollapse,
            expanded: !expandCollapse.expanded })}
          type="submit" style={{backgroundColor: boxColor.expandComments}}>
          {expandCollapse.expanded ?
          <>Collapse {imageObj.comments.length - 3} Comments</> :
          <> Expand {imageObj.comments.length - 3} Comments</>}
        </button>}

        <button className="addCommentsBut" type="submit" onClick={() => setExpandCommentSubmit({
          extended: !expandCommentSubmit.extended
        })} style={{backgroundColor: boxColor.expandSubmit}}>Post a comment</button>

        {expandCommentSubmit.extended &&
          <AddComment imageId={imageObj.id}/>
        }
      </div>
    </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleImage)
