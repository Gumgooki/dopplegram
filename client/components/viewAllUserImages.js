import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {receiveUsersImages} from '../store'
import {SingleImage} from '.'

const mapDispatchToProps = function(dispatch){
  return{
    getAllUsersImages: (id) => dispatch(receiveUsersImages(id))
  }
}

const mapStateToProps = state => {
  return{
    allUsersImages: state.image.usersImages
  }
}


export const ViewAllUsersImages = props => {
  useEffect(()=>{
    if(props.getAllUsersImages){
      props.getAllUsersImages(props.userId)
    }
  }, [])

  return (
    <div className="AllUsersImages">
      {props.allUsersImages && props.allUsersImages.map(imageObj =>
      (
        <SingleImage key={imageObj.id} imageObj={imageObj}/>
      ))}
    </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewAllUsersImages)
