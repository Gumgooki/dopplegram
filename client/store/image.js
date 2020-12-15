import axios from 'axios'
import history from '../history'

// action types

const CREATE_IMAGE = 'CREATE_IMAGE'

//initial state

const defaultImage = {}

//action creators


const createImage = () => ({
  type: CREATE_IMAGE,
  payload: newImage,
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

// reducer

export default function dummyReducer (state = defaultImage, action){
  switch (action.type){
    case CREATE_IMAGE:
      return {...state, data: [...state.data, {...action.payload}]}
    default:
      return state
  }
}
