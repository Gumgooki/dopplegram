import React from 'react'
import {connect} from 'react-redux'
import {uploadImage} from '../store/image'


const mapDispatchToProps = function(dispatch){
  return {
    createNewImage: (payload, id) => dispatch(uploadImage(payload, id))
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id
  }
}

class AddImage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      multerImage: 0,
      imageData: {},
      imageDescription: '',
      errors: {}
    }
  }

  uploadImage(e){

    let imageData = new FormData()

    imageData.append("imageName", "multer-image-" + Date.now())
    imageData.append("imageData", e.target.files[0])
    //store a readable instance of the image being uploaded using multer

    this.setState({
      ...this.state,
      multerImage: URL.createObjectURL(e.target.files[0]),
      imageData: imageData
    })
  }

  storeImage(imageData, id){
    if(this.lengthValidation()){
      imageData.append("imageDescription", this.state.imageDescription)
      this.props.createNewImage(imageData, id).then((data) => {
        if(data.data.success){
          this.setState({
            ...this.state,
            multerImage: 0,
            imageData: {},
            imageDescription: ''
          })
        }
      }).catch((err)=> {
        console.error(err)
        this.setState({
          ...this.state,
          multerImage: 0,
          imageData: {},
          imageDescription: '',
        })
      })
    }
  }

  lengthValidation(){
    let isValid = true
    let errors = {}
    if(this.state.imageDescription === ""){
      isValid = false
      errors['imageDescription'] = 'You need to create a description'
    }
    else if(this.state.imageDescription.length > 150){
      isValid = false
      errors['imageDescription'] = 'Must be 150 characters or shorter'
    }

    this.setState({...this.state, errors: errors})
    return isValid
  }

  render(){
    return(
      <div className="AllImages uploader">
        <input id="photoUpload" type="file" onChange={(e)=>this.uploadImage(e, "multer")}/>
        <label htmlFor="photoUpload">
          <div className="imageContainer">
              {this.state.multerImage === 0 ?
              <p className="imagePlaceholder">CLICK HERE TO UPLOAD</p> :
              <img src={this.state.multerImage}/>}
          </div>
        </label>
        <label htmlFor="imageDescription">Write something about your photo!</label>
        <textarea
          name="imageDescription"
          id="imageDescription"
          type='text'
          value={this.state.imageDescription}
          onChange={(e)=>this.setState(
            {...this.state, [e.target.name]: e.target.value}
            )}/>
        <div className="text-danger">{this.state.errors.imageDescription}</div>
        <button className="uploadButton" type="button" onClick={()=>this.storeImage(this.state.imageData, this.props.userId)}>Submit Image</button>
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddImage)
