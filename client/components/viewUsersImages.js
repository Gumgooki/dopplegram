import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {receiveUsersImages} from '../store'
import {SingleImage} from '.'

const mapDispatchToProps = function(dispatch){
  return{
    getUsersImages: (id) => dispatch(receiveUsersImages(id))
  }
}

const mapStateToProps = state => {
  return{
    allUsersImages: state.image.usersImages,
  }
}


export const ViewMyImages = props => {
  useEffect(()=>{
    if(props.getUsersImages){
      props.getUsersImages(props.match.params.userId)
    }
  }, [])

  return (
    <div className="AllImages AllUsersImages">
      {props.allUsersImages && props.allUsersImages.map(imageObj =>
      (
        <SingleImage key={imageObj.id} imageObj={imageObj} imageComments={imageObj.comments}/>
      ))}
    </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewMyImages)
