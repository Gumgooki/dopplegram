import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {receiveUsersImages} from '../store'
import {SingleImage} from '.'

const mapDispatchToProps = function(dispatch){
  return{
    getMyImages: (id) => dispatch(receiveUsersImages(id))
  }
}

const mapStateToProps = state => {
  return{
    allMyImages: state.image.usersImages,
    userId: state.user.id
  }
}


export const ViewMyImages = props => {
  useEffect(()=>{
    if(props.getMyImages){
      props.getMyImages(props.userId)
    }
  }, [])

  return (
    <div className="AllImages AllUsersImages">
      {props.allMyImages && props.allMyImages.map(imageObj =>
      (
        <SingleImage key={imageObj.id} imageObj={imageObj}/>
      ))}
    </div>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewMyImages)
