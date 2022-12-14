import { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'
import Toast from './components/Toast'

import Inicio from './pages/Inicio'
import NotFound from './pages/NotFound'



function App() {

  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toast />
    </Fragment>
  )
}

export default App
