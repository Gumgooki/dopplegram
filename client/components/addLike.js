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
      console.log('in the if block', like)
      setLike(true)
      console.log('if block, after setting like', like)
      props.createNewLike(true, props.imageId, userId)
    } else{
      console.log('in the else block', like)
      setLike(false)
      console.log('in the else block, after setting like', like)
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
