import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  // setInterval(() => {
    // setCount(count+1);
  // }, 2000)

  useEffect(() => {
    const id = setInterval(() => {
      setCount(prev => prev+1)
    }, 2000)
    return () => {
      clearInterval(id);
    }
  }, [])

  return (
    <>
      <h1>Hello World</h1>
      <h2>Count: {count}</h2>
    </>
  )
}

export default App
