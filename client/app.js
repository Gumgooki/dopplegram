import React from 'react'

//import routes and navbar and whatnot into this section

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="application">
      <Navbar/>
      <Routes/>
    </div>
  )
}

export default App
