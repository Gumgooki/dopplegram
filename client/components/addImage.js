import React from 'react'
import {connect} from 'react-redux'
import {uploadImage} from '../store/image'


const mapDispatchToProps = function(dispatch){
  return {
    createNewImage: (payload, id) => dispatch(uploadImage(payload, id))
  }
}
const DefaultImg = "https://www.stevenstaekwondo.com/wp-content/uploads/2017/04/default-image-620x600.jpg"

class AddImage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      multerImage: DefaultImg
    }
  }

  uploadImage(e){

    let imageData = new FormData()

    imageData.append("imageName", "multer-image-" + Date.now())
    imageData.append("imageData", e.target.files[0])
    //store a readable instance of the image being uploaded using multer

    this.setState({
      multerImage: URL.createObjectURL(e.target.files[0])
    })

    this.props.createNewImage(imageData, this.props.userId).then((data) => {
      if(data.data.success){
        this.setState({
          multerImage: DefaultImg
        })
      }
    }).catch((err)=> {
      console.error(err)
      this.setState({
        multerImage: DefaultImg
      })
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


export default connect(null, mapDispatchToProps)(AddImage)
