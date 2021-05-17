import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {uploadLike, deleteLike, receiveLike} from '../store/image'


const mapDispatchToProps = function(dispatch){
  return{
    createNewLike: (like, imageId, userId) => dispatch(uploadLike(like, imageId, userId)),
    deleteLike: (imageId, userId) => dispatch(deleteLike(imageId, userId)),
    fetchLike: (imageId, userId) => dispatch(receiveLike(imageId, userId))
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

export const AddLike = props => {
  const {userId} = props
  const [like, setLike] = useState(false)

  useEffect(async () => {
    if(props.fetchLike){
      const didLike = await props.fetchLike(props.imageId, userId)
      console.log('what did we get back from thunk?', didLike)
      setLike(didLike)
    }
  }, [])


  //this isn't working
  const handleSubmit = (evt) => {
    evt.preventDefault()
    if(like === false){
      setLike(true)
      props.createNewLike(true, props.imageId, userId)
    } else{
      setLike(false)
      props.deleteLike(props.imageId, userId)
    }
  }

  return(
    <div className="likeBox">
      <button type="submit" onClick={handleSubmit}>
        {like ? <>Unlike</> : <>Like</>}
      </button>
      <p>{props.imageLikes} Likes</p>
    </div>
  )

}

export default connect(mapStateToProps, mapDispatchToProps)(AddLike)
