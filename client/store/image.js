import axios from 'axios'
import history from '../history'

// action types

const CREATE_IMAGE = 'CREATE_IMAGE'
const GET_ALL_IMAGES = 'GET_ALL_IMAGES'
const GET_USERS_IMAGES = 'GET_USERS_IMAGES'
const DELETE_USER_IMAGE = 'DELETE_USER_IMAGE'

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

const getUsersImages = (usersImages) => ({
  type: GET_USERS_IMAGES,
  payload: usersImages
})

const removeImage = (deletedImage) => ({
  type: DELETE_USER_IMAGE,
  payload: deletedImage
})

// thunk creators
export const uploadImage = (imageData, userId) => async dispatch => {
  try {
    let response = await axios.post(`/api/image/${userId}`, imageData)
    console.log(response.data)
    dispatch(createImage(response.data.document))
    return response
  } catch(err) {
    console.error(err)
  }
}


export const receiveImages = () => async dispatch => {
  try{
    const {data} = await axios.get('/api/image')
    dispatch(getAllImages(data))
  } catch(err){
    console.log(err)
  }
}

export const receiveUsersImages = (userId) => async dispatch => {
  try{
    const {data} = await axios.get(`/api/image/${userId}`)
    dispatch(getUsersImages(data))
  } catch(err){
    console.log(err)
  }
}

export const deleteImage = (userId, imageId) => async dispatch => {
  try{
    const {data} = await axios.delete(`/api/image/${userId}/${imageId}`)
    dispatch(removeImage(data))
  }catch(err){
    console.log(err)
  }
}

// reducer

export default function dummyReducer (state = defaultImage, action){
  switch (action.type){
    case CREATE_IMAGE:
      return {...state, usersImages: [...state.usersImages, {...action.payload}], allImages: [...state.allImages, {...action.payload}]}
    case GET_ALL_IMAGES:
        return{...state, allImages: [...action.payload]}
    case GET_USERS_IMAGES:
        return{...state, usersImages: [...action.payload]}
    case DELETE_USER_IMAGE:
        //TODO: need to fix this so it actually removes the images from these state objects; not sure of the best way to do that yet.
        return{...state, userImages: [...state.userImages], allImages: [...state.allImages]}
    default:
      return state
  }
}
