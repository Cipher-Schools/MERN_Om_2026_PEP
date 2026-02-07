import { useState } from 'react'
import Message from './Message';
import './App.css'
import User from './User';
import Todo from './Todo';

function App() {

  // let name = 'Tom'
  // let count = 0;
  // const [count, setCount] = useState(0);
  // const [inputValue, setInputValue] = useState('');

  // function inscCount() {
  //   count += 1;
  //   console.log(count);
  // }

  return (
    <>
      {/* <h1>Hello World</h1>
      <p>Hello {name}</p>
      <Message /> */}
      {/* <p>Count: {count}</p> */}
      {/* <button onClick={inscCount}>Inscrease Count</button> */}
      {/* <button onClick={() => setCount(count+1)}>Inscrease Count</button> */}
      {/* <User name='Om' city='Punjab' />

      <input type="text" onChange={(e) => setInputValue(e.target.value)} />
      <p>Input value: {inputValue} </p> */}

      <Todo />

    </>
  )
}


export default App

