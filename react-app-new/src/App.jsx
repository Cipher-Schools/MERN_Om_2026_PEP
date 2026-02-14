import { useState } from 'react'
import './App.css'
import { Signin } from './pages/Signin';
import { Home } from './pages/Home';
import { Routes, Route } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import Signup from './pages/Signup';
import { Navbar } from './components/Navbar/Navbar';
import Cart from './components/cart/Cart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/'  element={ <Home /> } />
        <Route path='/signup' element={ <Signup />} />
        <Route path='/signin' element={ <Signin /> } />
        <Route path='*' element={ <NotFound /> } />
        <Route path='/cart' element={ <Cart /> } />
      </Routes>
    </>
  )
}

export default App
