import axios from 'axios'
import history from '../history'

// action types

const CREATE_IMAGE = 'CREATE_IMAGE'
const GET_ALL_IMAGES = 'GET_ALL_IMAGES'

//initial state

const defaultImage = {}

//action creators


const createImage = (newImage) => ({
  type: CREATE_IMAGE,
  payload: newImage,
})

const getAllImages = (allImages) => ({
  type: GET_ALL_IMAGES,
  payload: allImages
})

//thunk creators

export const uploadImage = (imageData) => async dispatch => {
  try {
    let response = await axios.post('/api/image', imageData)
    dispatch(createImage(response.data))
  } catch(err) {
    console.error(err)
  }
}

export const receiveImages = () => async dispatch => {
  try{
    //stuff to get all the images
    let response = await axios.get('/api/image')
    dispatch(getAllImages(response))
  } catch(err){
    console.log(err)
  }
}

// reducer

export default function dummyReducer (state = defaultImage, action){
  switch (action.type){
    case CREATE_IMAGE:
      return {...state, uploadedImage: action.payload}
    case GET_ALL_IMAGES:
        return{...state, allImages: action.payload}
    default:
      return state
  }
}
