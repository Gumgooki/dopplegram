import axios from 'axios'
import React from 'react'

//TODO this implementation does not have any ties with redux. right now this is just for testing purposes to see what Multer can do.

const DefaultImg = "https://www.stevenstaekwondo.com/wp-content/uploads/2017/04/default-image-620x600.jpg"

const API_URL = "http://localhost:3000"

export default class AddImageMulter extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      multerImage: DefaultImg
    }
  }

  setDefaultImage(uploadType){
    if(uploadType === "multer"){
      this.setState({
        multerImage: DefaultImg
      })
    }
  }

  uploadImage(e){

    let imageFormObj = new FormData()

    imageFormObj.append("imageName", "multer-image-" + Date.now())
    imageFormObj.append("imageData", e.target.files[0])

    //store a readable instance of the image being uploaded using multer

    this.setState({
      multerImage: URL.createObjectURL(e.target.files[0])
    })

    axios.post(`${API_URL}/api/image-multer`, imageFormObj).then((data) => {
      if(data.data.success){
        // this.setDefaultImage("multer")
      }
    }).catch((err)=> {
      console.error(err)
      // this.setDefaultImage("multer")
    })
  }
  render(){
    return(
      <div>
        <input type="file" onChange={(e)=>this.uploadImage(e, "multer")}/>
        <img src={this.state.multerImage}/>
      </div>
    )
  }
}
