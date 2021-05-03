import React, {useState} from 'react'
import {connect} from 'react-redux'
import {uploadLike} from '../store/image'


const mapDispatchToProps = function(dispatch){
  return{
    createNewLike: (payload, imageId, userId) => dispatch(uploadLike(payload, imageId, userId))
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

export const AddLike = props => {
  const {userId} = props
  const {state, setState} = useState({
    like: false
  })


  //this isn't working
  const handleSubmit = (evt) => {
    evt.preventDefault()
    setState({like: !state.like})
    console.log(state.like)
    if(state.like === true){
      props.createNewLike(state.like, props.imageId, userId)
    }
  }

  return(
    <div>
      <button type="submit" onClick={handleSubmit}>
        Like Image
      </button>
    </div>
  )

}

export default connect(mapStateToProps, mapDispatchToProps)(AddLike)
