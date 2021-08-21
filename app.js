const todoInput = document.querySelector('.todo__input')
const todoButton = document.querySelector('.todo__button')
const todoList = document.querySelector('.todo__list')
const filterOption = document.querySelector('.filter__todo')

// ALL EVENTS

document.addEventListener('DOMContentLoaded', getTodos())
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

function addTodo(event) {
    event.preventDefault()
   
    // CREATE TODO DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    // TODO LI

    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo__item')

    todoDiv.appendChild(newTodo)

    // SAVE TODO TO LOCAL STORAGE

    saveLocalTodos(todoInput.value)

    // MARK BUTTOM
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    // DELETE BUTTON
    
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add('delete-btn')
    todoDiv.appendChild(deleteButton)

    todoList.appendChild(todoDiv)

    todoInput.value = ''

}

// DELETE AND CHECK(MARK COMPLETE)

function deleteCheck (e) {
    const item = e.target
    
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement
       
        // REMOVE AFTER DELETING 

        removeLocalTodos(todo)

        todo.classList.add('delete')
        todo.addEventListener('transitionend', ()=>{
            todo.remove()
        })
        
    }

    // MARK COMPLETED
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')


    }
}


function filterTodo(e){
    const todos = todoList.children;

    for (i = 0; i <= todos.length - 1; i++) {
        switch (e.target.value) {
            case "all":
                todos[i].style.display = "flex";

                break;

            case "completed":
                if (todos[i].classList.contains("completed")) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }

                break;

            case "uncompleted":
                if (!todos[i].classList.contains("completed")) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }

                break;

            default:
                break;
        }
    }

}

// SAVE TODOS TO LOCAL STORAGE

function saveLocalTodos(todo) {

    // CHECK IF THERE'S ANYTHING STORED
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo)

    localStorage.setItem('todos', JSON.stringify(todos))
}

// localStorage.clear('todo')

function getTodos(todo) {
    // CHECK IF THERE'S ANYTHING STORED IN THE LOCAL STORAGE
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    
    todos.forEach(function(todo){
        

        // CREATE TODO DIV

        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        // TODO LI

        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo__item')

        todoDiv.appendChild(newTodo)


        // MARK BUTTOM
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)

        // DELETE BUTTON

        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
        deleteButton.classList.add('delete-btn')
        todoDiv.appendChild(deleteButton)

        todoList.appendChild(todoDiv)
    });
}

function removeLocalTodos(todo) {
    // CHECK IF THERE'S ANYTHING STORED IN THE LOCAL STORAGE
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    // CHECK INDEX OF TODO AND MAKE IT DELETE ON CLICK

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos))
}

