import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Beranda from './page/Beranda'
import Login from './page/Login'
import Register from './page/Register'
import { Toaster } from 'react-hot-toast'


function App() {

  return (
    <BrowserRouter>
      <Toaster position='top-right'
        reverseOrder="true"/>
      <Routes>
        <Route path='/' element={<Beranda />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
