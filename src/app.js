const addTaskSection = document.querySelector("#addTask"),
    allTaskSection = document.querySelector("#allTask"),
    contactSection = document.querySelector("#contact");
const navLinks = document.querySelectorAll("nav a");
const taskCount = document.querySelector("nav a span");

const elememtContent = (elementName, content) => {
    let element = document.createElement(elementName);
    element.textContent = content;
    return element;
};

const elememtClassName = (elementName, className) => {
    let element = document.createElement(elementName);
    element.classList.add(className);
    return element;
};

const elememtContentAndClassName = (elementName, content, className) => {
    let element = document.createElement(elementName);
    element.textContent = content;
    element.classList.add(className);
    return element;
};

const elementProperty = (elementName, propertyName, value) => {
    let element = document.createElement(elementName);
    element[propertyName] = value;
    return element;
};

const form = document.createElement("form");
const h1 = elememtContent("h1", "Add Task");
const taskNameContainer = document.createElement("div");
const taskTimeContainer = document.createElement("div");
const taskName = elementProperty("input", "placeholder", "Enter task");
const taskTime = elementProperty("input", "type", "time");
addTaskBtn = elememtContentAndClassName("button", "+", "addBtn");

taskNameContainer.appendChild(taskName);
taskTimeContainer.appendChild(taskTime);
form.append(h1, taskNameContainer, taskTimeContainer, addTaskBtn);

addTaskSection.appendChild(form);

// SPA
document.addEventListener("DOMContentLoaded", () => {
    allTaskSection.style.display = "none";
    contactSection.style.display = "none";
});


navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        if (e.target.className === "add") {
            allTaskSection.style.display = "none";
            contactSection.style.display = "none";
            addTaskSection.style.display = "initial";
        } else if (e.target.className === "all") {
            allTaskSection.style.display = "initial";
            contactSection.style.display = "none";
            addTaskSection.style.display = "none";
        } else if (e.target.className === "contact") {
            allTaskSection.style.display = "none";
            contactSection.style.display = "initial";
            addTaskSection.style.display = "none";
        }
    });
});

function addTaskFunc(tasks, times) {
    const userTask= tasks;
    const timeInput=times
    const taskContainer =elememtClassName('div', 'taskDiv'),
          taskCheck=elementProperty('input', 'type', 'checkbox'),
          theTask=elememtClassName('p','nameOfTask'),
          editBtn=elememtContent('button', 'Edit'),
          deleteBtn=elememtContent('button', 'Delete');
    theTask.textContent=`${userTask} @ ${timeInput}`
    taskContainer.append(taskCheck,theTask,editBtn,deleteBtn)
allTaskSection.appendChild(taskContainer)
}

addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault()
    addTaskFunc(taskName.value, taskTime.value)
})