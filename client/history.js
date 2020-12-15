import {createMemoryHistory, createBrowserHistory} from 'history'

// const history =
//   process.env.NODE_ENV === 'test'
//     ? createMemoryHistory()
//     : createBrowserHistory()

const history = createBrowserHistory()
export default history
