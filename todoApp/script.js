const input = document.querySelector('input');
const button = document.querySelector('button');
const list = document.querySelector('ul');

let todos = [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}



