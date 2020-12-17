import React from 'react'
import {connect} from 'react-redux'
import {uploadImage} from '../store/image'

const mapDispatchToProps = function(dispatch){
  return {
    createNewImage: (payload, id) => dispatch(uploadImage(payload, id))
  }
}

class CreateImage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      imageURL: '',
    }
    console.log(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  render(){
    return(
      <div>
        <h2>Add Image</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="imageURL">
              <strong>imageURL:</strong>
            </label>
          </div>
          <input
            type="text"
            name="imageURL"
            value={this.state.imageURL}
            onChange={this.handleChange}/>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
  handleSubmit(event){
    event.preventDefault()
    this.props.createNewImage(this.state, this.props.userId)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]:event.target.value
    })
  }
}

export default connect(null, mapDispatchToProps)(CreateImage)
