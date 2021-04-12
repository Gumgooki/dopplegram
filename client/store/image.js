import axios from 'axios'
import history from '../history'

// action types

const CREATE_IMAGE = 'CREATE_IMAGE'
const GET_ALL_IMAGES = 'GET_ALL_IMAGES'
const GET_USERS_IMAGES = 'GET_USERS_IMAGES'
const DELETE_USER_IMAGE = 'DELETE_USER_IMAGE'
const CREATE_COMMENT = 'CREATE_COMMENT'

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

const removeImage = (deletedImage, id) => ({
  type: DELETE_USER_IMAGE,
  payload: deletedImage,
  delImgId: id
})

const createComment = (commentedImage, imageId) => ({
  type: CREATE_COMMENT,
  payload: commentedImage,
  imageId
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

export const uploadComment = (commentData, imageId, userId) => async dispatch => {
  try{
    let {data} = await axios.post(`/api/comment/${imageId}/${userId}`, commentData)
    console.log('in the thunk', data)
    dispatch(createComment(data, imageId))
  } catch(err){
    console.log(err)
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
    dispatch(removeImage(data, imageId))
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
        return {
          ...state,
          usersImages: [...state.usersImages.filter((image) => image.id !== action.delImgId)],
          allImages: [...state.allImages.filter((image) => image.id !== action.delImgId)]
        }
      case CREATE_COMMENT:
        return {
          ...state,
          allImages: [...state.allImages.map(image => {
            if(image.id === action.imageId){
              image = action.payload
            }
            return image
          })]
        }
    default:
      return state
  }
}
