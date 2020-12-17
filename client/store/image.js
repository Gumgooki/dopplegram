import axios from 'axios'
import history from '../history'

// action types

const CREATE_IMAGE = 'CREATE_IMAGE'
const GET_ALL_IMAGES = 'GET_ALL_IMAGES'
const GET_USERS_IMAGES = 'GET_USERS_IMAGES'

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
    const {data} = await axios.get('/api/image')
    dispatch(getAllImages(data))
  } catch(err){
    console.log(err)
  }
}

export const receiveUsersImages = (userId) => async dispatch => {
  try{
    //stuff to get some specific images
    const {data} = await axios.get(`/api/image/${userId}`)
    dispatch(getUsersImages(data))
  } catch(err){
    console.log(err)
  }
}

// reducer

export default function dummyReducer (state = defaultImage, action){
  switch (action.type){
    case CREATE_IMAGE:
      return {...state, allImages: [...state.allImages, {...action.payload}]}
    case GET_ALL_IMAGES:
        return{...state, allImages: [...action.payload]}
    case GET_USERS_IMAGES:
        return{...state, usersImages: [...action.payload]}
    default:
      return state
  }
}
