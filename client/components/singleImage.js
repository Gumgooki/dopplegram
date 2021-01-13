import React from 'react'
import moment from 'moment'


export const SingleImage = props => {
  const {imageObj} = props

  return (
    <div key = {imageObj.id}>
      <h1>{imageObj.imageName}</h1>
      <p>Uploaded {moment(imageObj.createdAt).fromNow()}</p>
      <img src={imageObj.imageData}/>
      <p>Uploaded By {imageObj.userId}</p>
      <p>Comments:</p>
      {/* We'll put the comments here; will probably need to loop over */}
    </div>
  )
}


export default SingleImage
