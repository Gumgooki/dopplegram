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
  const [isLiked, setIsLiked] = useState(false)

  useEffect(async () => {
    if(props.fetchLike){
      const test = await props.fetchLike(props.imageId, userId)
      console.log('what did we get back from thunk?', test)
      setIsLiked(true)
    }
  }, [like])


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
    <div>
      <button type="submit" onClick={handleSubmit}>
        {like ? <>Unlike Image</> : <>Like Image</>}
      </button>
    </div>
  )

}

export default connect(mapStateToProps, mapDispatchToProps)(AddLike)
