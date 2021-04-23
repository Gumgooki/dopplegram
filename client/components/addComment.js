import React, {useState} from 'react'
import {connect} from 'react-redux'
import {uploadComment} from '../store/image'


//this is just going to be for testing purposes for now; once i know this works, i'll refactor this whole slice
const mapDispatchToProps = function(dispatch){
  return {
    createNewComment: (payload, imageId, userId) => dispatch(uploadComment(payload, imageId, userId))
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

export const AddComment = props => {
  const {userId} = props
  const [state, setState] = useState({
    comment: '',
    errors: {}
  })

  const handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(state.comment)
    props.createNewComment(state, props.imageId, userId)
    setState({...state, comment: ''})
  }

  const handleChange = evt => {
    setState({...state, [evt.target.name]:  evt.target.value})
  }

  return(
    <div>
      <form onSubmit={handleSubmit}>
      <div className="credentialField">
          <input name="comment" type="text" value={state.comment} onChange={handleChange}/>
          <div className="text-danger">{state.errors.comment}</div>
        </div>
        {/* commented out to test if it submits with enter; it seems to work and i kinda like it more tbh */}
        {/* <button className="changeCredentialSubmit" type="submit">Add Comment</button> */}
      </form>
    </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
