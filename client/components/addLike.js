import React, {useState} from 'react'
import {connect} from 'react-redux'
import {uploadLike, deleteLike} from '../store/image'


const mapDispatchToProps = function(dispatch){
  return{
    createNewLike: (like, imageId, userId) => dispatch(uploadLike(like, imageId, userId)),
    deleteLike: (imageId, userId) => dispatch(deleteLike(imageId, userId))
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


  //this isn't working
  const handleSubmit = (evt) => {
    evt.preventDefault()
    if(like === false){
      setLike(true)
      props.createNewLike(like, props.imageId, userId)
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
