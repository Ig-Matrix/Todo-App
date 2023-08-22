const addTaskSection = document.querySelector('#addTask')
const allTaskSection = document.querySelector('#allTask')
const contactSection = document.querySelector('#contact')
const navLinks = document.querySelectorAll('nav a')
const taskCount = document.querySelector('nav a span')
const elememtContent = (elementName, content) => {
  const element = document.createElement(elementName)
  element.textContent = content
  return element
}

const elememtClassName = (elementName, className) => {
  const element = document.createElement(elementName)
  element.classList.add(className)
  return element
}

const elememtContentAndClassName = (elementName, content, className) => {
  const element = document.createElement(elementName)
  element.textContent = content
  element.classList.add(className)
  return element
}

const elementProperty = (elementName, propertyName, value) => {
  const element = document.createElement(elementName)
  element[propertyName] = value
  return element
}

const form = document.createElement('form')
const h1 = elememtContent('h1', 'Add Task')
const allTasksTitle = elememtContent('h1', 'All Tasks')
const taskNameContainer = document.createElement('div')
const taskTimeContainer = document.createElement('div')
const taskName = elementProperty('input', 'placeholder', 'Enter task')
const taskTime = elementProperty('input', 'type', 'time')
addTaskBtn = elememtContentAndClassName('button', '+', 'addBtn')
const allTasksList = elememtClassName('div', 'all-tasks-lists')
clearAllBtn = elememtContentAndClassName(
  'button',
  'Clear Completed Tasks',
  'clear-all'
)

allTaskSection.append(allTasksTitle, allTasksList, clearAllBtn)

taskNameContainer.appendChild(taskName)
taskTimeContainer.appendChild(taskTime)
form.append(h1, taskNameContainer, taskTimeContainer, addTaskBtn)

addTaskSection.appendChild(form)

// SPA
document.addEventListener('DOMContentLoaded', () => {
  allTaskSection.style.display = 'none'
  contactSection.style.display = 'none'
})

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    if (e.target.className === 'add') {
      allTaskSection.style.display = 'none'
      contactSection.style.display = 'none'
      addTaskSection.style.display = 'initial'
    } else if (e.target.className === 'all') {
      allTaskSection.style.display = 'initial'
      contactSection.style.display = 'none'
      addTaskSection.style.display = 'none'
    } else if (e.target.className === 'contact') {
      allTaskSection.style.display = 'none'
      contactSection.style.display = 'initial'
      addTaskSection.style.display = 'none'
    }
  })
})

function displayTasks (task, time) {
  const taskContainer = elememtClassName('div', 'tasksList')
  const taskCheck = elementProperty('input', 'type', 'checkbox')
  const theTask = elememtClassName('p', 'nameOfTask')
  const at = elememtContentAndClassName('p', 'by', 'at')
  const theTime = elememtClassName('p', 'timeOfTask')
  const theCont = elememtClassName('p', 'task-time-cont')
  const editBtn = elememtContentAndClassName('button', 'Edit', 'editBtn')
  const deleteBtn = elememtContentAndClassName('button', 'Delete', 'deleteBtn')

  deleteBtn.addEventListener('click', (e) => {
    e.target.parentElement.remove()
    taskCount.innerText--
    updateLocalStorage()
  })

  clearAllBtn.addEventListener('click', () => {
    const checkInput = allTaskSection.querySelectorAll('input')
    checkInput.forEach((input) => {
      if (input.checked) {
        input.parentElement.remove()
        updateLocalStorage()
        taskCount.innerText--
      }
    })
  })
  theTask.textContent = task
  theTime.textContent = time
  theCont.append(theTask, at, theTime)
  taskContainer.append(taskCheck, theCont, editBtn, deleteBtn)

  const existingTasks = allTaskSection.querySelectorAll('.tasksList')
  if (existingTasks.length > 0) {
    allTasksList.insertBefore(taskContainer, existingTasks[0])
  } else {
    allTasksList.appendChild(taskContainer)
  }

  displayPopUp(time)
  taskCount.innerText++
  taskName.value = ''
  taskTime.value = ''
}

addTaskBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (taskName.value && taskTime.value) {
    displayTasks(taskName.value, taskTime.value)
    updateLocalStorage()
  }
})

// Edit tasks
allTasksList.addEventListener('click', (e) => {
  if (e.target.className === 'editBtn') {
    const button = e.target
    const list = e.target.parentElement
    const taskTimeCont = list.querySelector('.task-time-cont')

    if (button.textContent === 'Edit') {
      const task = taskTimeCont.firstElementChild
      const editTask = elementProperty('input', 'type', 'text')
      editTask.classList.add('editInput')
      editTask.value = task.textContent
      taskTimeCont.insertBefore(editTask, task)
      button.textContent = 'save'
      task.remove()
    } else if (button.textContent === 'save') {
      const editedTask = taskTimeCont.firstElementChild
      const savedTask = elememtContentAndClassName(
        'p',
        editedTask.value,
        'nameOfTask'
      )
      taskTimeCont.insertBefore(savedTask, editedTask)

      button.textContent = 'Edit'
      editedTask.remove()
      updateLocalStorage()
    }
  }
})

function updateLocalStorage () {
  const taskCont = allTaskSection.querySelectorAll('.task-time-cont')
  const tasksToSave = Array.from(taskCont).map((entry) => {
    const nameOfTask = entry.querySelector('.nameOfTask').textContent
    const timeOfTask = entry.querySelector('.timeOfTask').textContent
    return { nameOfTask, timeOfTask }
  })
  localStorage.setItem('taskEntries', JSON.stringify(tasksToSave))
}

function loadFromLocalStorage () {
  const savedTasks = JSON.parse(localStorage.getItem('taskEntries')) || '[]'
  for (let i = savedTasks.length - 1; i >= 0; i--) {
    const task = savedTasks[i]
    displayTasks(task.nameOfTask, task.timeOfTask)
  }
}

const notif = document.querySelector('.pop')
function displayPopUp (time) {
  const currentDate = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })

  const currentTime = new Date()
  const userTimeParts = time.split(':')
  const hrs = parseInt(userTimeParts[0])
  const mins = parseInt(userTimeParts[1])
  currentTime.setHours(hrs)
  currentTime.setMinutes(mins)
  const userTime = currentTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })

  if (userTime === currentDate) {
    const popUpMessage = elememtContentAndClassName(
      'p',
            `Hey there, you have a task scheduled for ${userTime}.
        Kindly check your task lists`,
            'notif-pop'
    )
    notif.appendChild(popUpMessage)
    popUpMessage.addEventListener('click', () => {
      allTaskSection.style.display = 'block'
      addTaskSection.style.display = 'none'
      contactSection.style.display = 'none'
      // add the class focused to the taskList element that the task time matches current time
      const focusedTime = allTasksList.querySelector('.timeOfTask')
      focusedTime.parentElement.parentElement.classList.add('focused')
    })
    setTimeout(() => (popUpMessage.style.display = 'none'), 10000)
    setTimeout(() => removeFocusedClass(), 10000)
  }
}

function removeFocusedClass () {
  const focusedElement = document.querySelector('.focused')
  if (focusedElement) {
    focusedElement.classList.remove('focused')
  }
}

loadFromLocalStorage()
