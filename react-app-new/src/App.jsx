import { useState } from 'react'
import './App.css'
import Timer from './Timer'
import Cart from './components/cart/Cart'
import Signup from './components/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>React App</h1>
      {/* <Timer /> */}
      {/* <Cart /> */}
      <Signup />
    </>
  )
}

export default App
