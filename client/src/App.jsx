import { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'

import Inicio from './pages/Inicio'
import NotFound from './pages/NotFound'



function App() {

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  )
}

export default App
