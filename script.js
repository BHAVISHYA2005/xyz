// Array to store todos
let todos = [];

// Load todos when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
});

function addTodo() {
    const input = document.getElementById('todoInput');
    const list = document.getElementById('todoList');
    
    if(input.value.trim() !== '') {
        // Create todo object
        const todo = {
            id: Date.now(),
            text: input.value,
            completed: false
        };
        
        // Add to array
        todos.push(todo);
        
        // Save to local storage
        saveTodos();
        
        // Update display
        displayTodo(todo);
        
        // Clear input
        input.value = '';
    }
}

function displayTodo(todo) {
    const list = document.getElementById('todoList');
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <span>${todo.text}</span>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    list.appendChild(li);
}

function deleteTodo(id) {
    // Remove from array
    todos = todos.filter(todo => todo.id !== id);
    
    // Save updated array
    saveTodos();
    
    // Update display
    refreshDisplay();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        refreshDisplay();
    }
}

function refreshDisplay() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    todos.forEach(todo => displayTodo(todo));
}