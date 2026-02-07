import { useState } from "react"

function Todo() {

    const [todoInput, setTodoInput] = useState('');
    const [todos, setTodos] = useState([]);

    function addTodo() {
        if(!todoInput) {
            alert("Can't add empty todo")
        }
        setTodos([...todos, todoInput]);
        setTodoInput('');
    }

    return (
        <div>
            <input type="text" value={todoInput} onChange={(e) => setTodoInput(e.target.value)} />
            <button onClick={addTodo}>Add Todo</button>

            <h2>Your Todos</h2>
            {todos.map((todo, index )=> (
                <p key={index}>{todo}</p>
            ))}
        </div>
    )
}

export default Todo;