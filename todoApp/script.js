
const input = document.querySelector('#todoInput');
const addBtn = document.querySelector('#addBtn');
const list = document.querySelector('#todos');

let todos = [];

function saveTodos () {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos () {
    const storedTodos = localStorage.getItem('todos');
    if(storedTodos) {
        todos = JSON.parse(storedTodos);
    }
}

function renderTodos() {
    list.innerHTML = '';
    todos.forEach((todo, index )=> {
        const li = document.createElement('li');
        const p = document.createElement('p');
        const deleteBtn = document.createElement('button');

        p.innerText = todo;
        deleteBtn.innerText = 'Delete'
        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
            // li.remove();
        })
        li.append(p, deleteBtn);
        list.append(li);
        })
}

addBtn.addEventListener('click', () => {
    const inputText = input.value.trim();
    input.value = '';
    if(!inputText) {
        alert('Input field is required!');
        return;
    }
    todos.push(inputText);
    saveTodos();
    renderTodos();   
})


getTodos();
renderTodos();
