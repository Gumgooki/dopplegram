import axios from 'axios'
import history from '../history'

//action types

const CREATE_COMMENT = 'CREATE_COMMENT'
const GET_COMMENTS ='GET_COMMENTS'

//initial state

const defaultComments = {}

//action creators

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  payload: comment,
})

//thunk creators

export const uploadComment = (commentData, imageId, userId) => async dispatch => {
  try{
    let response = await axios.post(`/api/comment/${imageId}/${userId}`, commentData)
    console.log('in the thunk', response.data)
    dispatch(createComment(commentData))
  } catch(err){
    console.log(err)
  }
}

//reducer

export default function dummyReducer(state = defaultComments, action){
  switch(action.type){
    case CREATE_COMMENT:
      return {...state, comments: [...state.comment, action.payload]}
    default:
      return state
  }
}
