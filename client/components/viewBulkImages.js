import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {receiveImages} from '../store'
import moment from 'moment'

const mapDispatchToProps = function(dispatch){
  return {
    viewAllImages: () => dispatch(receiveImages())
  }
}

const mapStateToProps = state => {
  return {
    allImages: state.image.allImages
  }
}

export const ViewBulkImages = props =>{
  useEffect(()=>{
    if(props.viewAllImages){
      props.viewAllImages()
    }
  }, [])

  return (
    <div className="AllImages">
      {props.allImages && props.allImages.map(imageObj =>
        (
          <div key={imageObj.id}>
            <h1>{imageObj.imageURL}</h1>
            <p>Uploaded {moment(imageObj.createdAt).fromNow()}</p>
            <img src={imageObj.imageURL}/>
          </div>
        )
      )}
    </div>
  )

}
//need create a react component that can fetch a list of all imageURLs in an array
//will then need to loop through that array and display within an <image> tag for now
//in the future, we should add a link to the <image> tag with a link to the SingleImage componenent so users can travel deeper


export default connect(mapStateToProps, mapDispatchToProps)(ViewBulkImages)