let toDoInput
let errorInfo
let addBtn
let ulList
let popup
let popupBody
let popupInfo
let popupInput
let popAcceptBtn
let popCancelBtn
let toDoEdit


const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    toDoInput = document.querySelector('.todo-input')
    errorInfo = document.querySelector('.error-info')
    addBtn = document.querySelector('.btn-add')
    ulList = document.querySelector('.todolist ul')
    popup = document.querySelector('.popup')
    popAcceptBtn = document.querySelector('.accept')
    popCancelBtn = document.querySelector('.cancel')
    popupInput = document.querySelector('.popup-input')
    popupInfo = document.querySelector('.popup-info')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewTask)
    ulList.addEventListener('click', checkClick)
    popCancelBtn.addEventListener('click', closePopup)
    popAcceptBtn.addEventListener('click', editTask)
    toDoInput.addEventListener('keyup', enterKeyCheck)
}

const addNewTask = () => {
    if(toDoInput.value !== ''){
        const newTask = document.createElement('li')
        newTask.textContent = toDoInput.value
        
        ulList.append(newTask)
        createToolsArea(newTask)

        toDoInput.value = ''
        errorInfo.textContent = ' '
    }else{
        errorInfo.textContent = 'You have to write something!'
    }
}

const createToolsArea = (newTask) => {
    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    newTask.append(toolsPanel)

    const btn1 = document.createElement('button')
    btn1.classList.add('complete')
    btn1.innerHTML ='<i class="fas fa-check"></i>'

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent = 'EDIT'

    const delBtn = document.createElement('button')
    delBtn.classList.add('delete')
    delBtn.innerHTML = '<i class="fas fa-times"></i>'

    toolsPanel.append(btn1, editBtn, delBtn)

}

const checkClick = e => {
    if(e.target.matches('.complete')){
        e.target.closest('li').classList.toggle('completed')
        e.target.classList.toggle('completed')
    }else if(e.target.matches('.edit')){
        popupToDo(e)
    }else if(e.target.matches('.delete')){
        deleteToDo(e)
    }
}

const popupToDo = e => {
    toDoEdit = e.target.closest('li')
    popupInput.value = toDoEdit.firstChild.textContent
    popup.style.display = 'flex'

}

const closePopup = () => {
    popup.style.display = 'none'
    popupInfo.textContent = ''
}

const editTask = (e) => {
    if(popupInput.value !== ''){
        toDoEdit.firstChild.textContent = popupInput.value
        closePopup()
    }else{
        popupInfo.textContent = 'Nie można dodać pustego zadania'
    }
}

const deleteToDo = (e) => {
    e.target.closest('li').remove()
    const allTasks = ulList.querySelectorAll('li')

    if(allTasks.length === 0){
        errorInfo.textContent = 'Nie ma żadnych zadań'
    }
}

const enterKeyCheck = (e) => {
    if(e.key === 'Enter'){
        addNewTask()
    }
}

document.addEventListener('DOMContentLoaded', main)