import axios from 'axios'
import history from '../history'

// action types

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

//initial state

const defaultUser = {}

//action creators

const getUser = user => ({
  type: GET_USER, user
})

const removeUser = () => ({
  type: REMOVE_USER
})

//thunk creators

export const me = () => async dispatch =>{
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch(err){
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch(authError){
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch(dispatchOrHistoryErr){
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.delete('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch(err) {
    console.error(err)
  }
}

// reducer

export default function dummyReducer (state = defaultUser, action){
  switch (action.type){
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
