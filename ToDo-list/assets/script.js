let moonIcon = document.querySelector('.moon')
let sunIcon = document.querySelector('.sun')
let containerElem = document.querySelector('.container')
let titleElem = document.querySelector('.title')
let inputWrapperElem = document.querySelector('.input-wrapper')
let toDoWrapperElem = document.querySelector('.todo-list-wrapper')
let addBtn = document.querySelector('.addbtn')
let inputElem = document.querySelector('.input')
let toDoListContainer = document.querySelector('.todo-lists')
let toDosArray = []
let toDoListFragment = document.createDocumentFragment()

function applyDarkTheme() {
    document.body.classList.add('dark-body')
    containerElem.classList.add('dark-container')
    titleElem.classList.add('dark-title')
    moonIcon.style.display = 'none'
    sunIcon.style.display = 'block'
    localStorage.setItem('theme' , 'dark')
}

function applyLightTheme() {
    document.body.classList.remove('dark-body')
    containerElem.classList.remove('dark-container')
    titleElem.classList.remove('dark-title')
    moonIcon.style.display = 'block'
    sunIcon.style.display = 'none'
    localStorage.setItem('theme' , 'light')
}

function loadTheme() {
    let themevalue = localStorage.getItem('theme')
    if (themevalue === 'dark') {
        applyDarkTheme()
    }
}

function addNewToDo() {
    let inputValue = inputElem.value
    if (inputValue){
        let newObject = {
        id : toDosArray.length + 1 ,
        content : inputValue , 
        status : false ,
    }
    toDosArray.push(newObject)
    setLocalStorage(toDosArray)
    toDoListGenerator(toDosArray)
    }
}

function setLocalStorage(todos) {
    localStorage.setItem('todos' , JSON.stringify(todos))
}

function toDoListGenerator(todos) {
    toDoListContainer.innerHTML = ''
    todos.forEach(function (todo) {
        let newCheckElem = document.createElement('i')
        newCheckElem.className = 'fa-solid fa-circle-check checked'
        newCheckElem.setAttribute('onclick','editToDo(' + todo.id + ')') 

        let newTextElem = document.createElement('p')
        newTextElem.className = 'text'
        newTextElem.innerHTML = todo.content

        let newDivElem = document.createElement('div')

        let newCrossElem = document.createElement('i')
        newCrossElem.className = 'fa-solid fa-circle-xmark cross'
        newCrossElem.setAttribute('onclick','removeToDo(' + todo.id + ')')
        
        let newToDoWrapperElem = document.createElement('div')
        newToDoWrapperElem.className = 'todo-list-wrapper'

        if (todo.status) {
            newTextElem.className = 'uncompleted'
        } 

        newDivElem.append(newCheckElem , newTextElem)
        newToDoWrapperElem.append(newDivElem , newCrossElem)
        toDoListFragment.append(newToDoWrapperElem)

        inputElem.value = ''
        inputElem.focus()
    })
    toDoListContainer.append(toDoListFragment)
}

function editToDo(todoId) {
    let localStorageToDos = JSON.parse(localStorage.getItem('todos'))
    toDosArray = localStorageToDos
    toDosArray.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.status = !todo.status
        }
    })
    setLocalStorage(toDosArray)
    toDoListGenerator(toDosArray)
}

function removeToDo(todoId) {
    let localStorageToDos = JSON.parse(localStorage.getItem('todos'))
    toDosArray = localStorageToDos
    let omitToDo = toDosArray.findIndex(function (todo) {
        return todo.id === todoId
    })
    toDosArray.splice(omitToDo , 1)
    setLocalStorage(toDosArray)
    toDoListGenerator(toDosArray)
}

function loadToDo() {
    let localStorageToDos = JSON.parse(localStorage.getItem('todos'))
    if (localStorageToDos) {
        toDosArray = localStorageToDos
    } else {
        toDosArray = []
    }
    toDoListGenerator(toDosArray)
}

moonIcon.addEventListener('click', applyDarkTheme)
sunIcon.addEventListener('click', applyLightTheme)
window.addEventListener('load', loadTheme)
window.addEventListener('load', loadToDo)
addBtn.addEventListener('click', addNewToDo)
inputElem.addEventListener('keydown', function (event) {
    if (event.key === 'Enter'){
        addNewToDo()
    }
})