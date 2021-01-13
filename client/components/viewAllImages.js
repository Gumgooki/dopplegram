import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {receiveImages} from '../store'
import {SingleImage} from '.'

const mapDispatchToProps = function(dispatch){
  return {
    getAllImages: () => dispatch(receiveImages())
  }
}

const mapStateToProps = state => {
  return {
    allImages: state.image.allImages
  }
}

export const ViewAllImages = props =>{
  useEffect(()=>{
    if(props.getAllImages){
      props.getAllImages()
    }
  }, [])

  return (
    <div className="AllImages">
      {props.allImages && props.allImages.map(imageObj =>
        (
          <SingleImage key={imageObj.id} imageObj={imageObj}/>
        )
      )}
    </div>
  )

}
//need create a react component that can fetch a list of all imageURLs in an array
//will then need to loop through that array and display within an <image> tag for now
//in the future, we should add a link to the <image> tag with a link to the SingleImage componenent so users can travel deeper


export default connect(mapStateToProps, mapDispatchToProps)(ViewAllImages)
