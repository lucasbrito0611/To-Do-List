const form = document.getElementById('container_submit')
const inputAddTask = document.getElementById('input_add_task')
const taskList = document.getElementById('container_task_list') 

const noTaskMessage = document.createElement('p')
noTaskMessage.innerText = 'Não há nenhuma tarefa'
noTaskMessage.classList.add('noTaskMessage')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []
let id = tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 0

function updateNoTextMessage() {
    if (tasks.length === 0) {
        taskList.appendChild(noTaskMessage);
    } else if (taskList.contains(noTaskMessage)){
        taskList.removeChild(noTaskMessage)
    }
}

function createTask(event) {
    event.preventDefault()
    
    const taskValue = inputAddTask.value.trim()
    
    if (taskValue === '') {
        alert('Digite algo para adicionar a tarefa')
        return
    }
    
    const task = {
        id: id++,
        text: taskValue,
        completed: false
    }
    
    tasks.push(task)
    createTaskElement(task)
    
    inputAddTask.value = ''
    updateNoTextMessage()
    saveTasks()
    console.log(tasks)
}

function createTaskElement(task) {
    const taskDiv = document.createElement('div')
    taskDiv.id = 'task-' + task.id
    taskDiv.classList.add('container_task')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = task.completed
    checkbox.id = 'checkbox' + task.id

    const label = document.createElement('label')
    label.textContent = task.text
    label.style.textDecoration = task.completed ? 'line-through' : 'none';
    label.htmlFor = checkbox.id

    const button = document.createElement('button')
    const img = document.createElement('img')
    img.src = 'assets/lixeira.png'
    img.alt = 'Ícone de lixeira'

    button.appendChild(img)
    taskDiv.appendChild(checkbox)
    taskDiv.appendChild(label)
    taskDiv.appendChild(button)
    taskList.appendChild(taskDiv)

    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked
        label.style.textDecoration = checkbox.checked ? 'line-through' : 'none'
        saveTasks()
    })
    
    button.addEventListener('click', () => {
        taskList.removeChild(taskDiv)
        const taskIndex = tasks.findIndex(task => task.id === id)
        tasks.splice(taskIndex, 1)
        updateNoTextMessage()
        saveTasks()
    })

}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

tasks.forEach(createTaskElement)
updateNoTextMessage()

form.addEventListener('submit', createTask)