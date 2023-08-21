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
const allTasksTitle = elememtContent("h1", "All Tasks");
const taskNameContainer = document.createElement("div");
const taskTimeContainer = document.createElement("div");
const taskName = elementProperty("input", "placeholder", "Enter task");
const taskTime = elementProperty("input", "type", "time");
addTaskBtn = elememtContentAndClassName("button", "+", "addBtn");
const allTasksList = elememtClassName("div", "all-tasks-lists");
clearAllBtn = elememtContentAndClassName(
    "button",
    "Clear Completed Tasks",
    "clear-all"
);

allTaskSection.append(allTasksTitle, allTasksList, clearAllBtn);

taskNameContainer.appendChild(taskName);
taskTimeContainer.appendChild(taskTime);
form.append(h1, taskNameContainer, taskTimeContainer, addTaskBtn);

addTaskSection.appendChild(form);

// SPA
// document.addEventListener("DOMContentLoaded", () => {
//     allTaskSection.style.display = "none";
//     contactSection.style.display = "none";
// });

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

function displayTasks(task, time) {
    const taskContainer = elememtClassName("div", "tasksList"),
        taskCheck = elementProperty("input", "type", "checkbox"),
        theTask = elememtClassName("p", "nameOfTask"),
        at = elememtContentAndClassName("p", "by", "at"),
        theTime = elememtClassName("p", "timeOfTask"),
        theCont = elememtClassName("p", "task-time-cont"),
        editBtn = elememtContentAndClassName("button", "Edit", "editBtn"),
        deleteBtn = elememtContent("button", "Delete");

    deleteBtn.addEventListener("click", (e) => {
        e.target.parentElement.remove();
        taskCount.innerText--;
        updateLocalStorage();
    });

    clearAllBtn.addEventListener("click", () => {
        const checkInput = allTaskSection.querySelectorAll("input");
        checkInput.forEach((input) => {
            if (input.checked) {
                input.parentElement.remove();
                updateLocalStorage();
                taskCount.innerText--;
            }
        });
    });
    theTask.textContent = task;
    theTime.textContent = time;
    theCont.append(theTask, at, theTime);
    taskContainer.append(taskCheck, theCont, editBtn, deleteBtn);
    const existingTasks = allTaskSection.querySelectorAll(".tasksList");
    if (existingTasks.length > 0) {
        allTasksList.insertBefore(taskContainer, existingTasks[0]);
    } else {
        allTasksList.appendChild(taskContainer);
    }

    taskCount.innerText++;
    taskName.value = "";
    taskTime.value = "";
}

addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (taskName.value && taskTime.value) {
        displayTasks(taskName.value, taskTime.value);
        updateLocalStorage();
    }
});

//Edit tasks
allTasksList.addEventListener("click", (e) => {
    if (e.target.className === "editBtn") {
        const button = e.target;
        const list = e.target.parentElement;
        const taskTimeCont = list.querySelector(".task-time-cont");
        const time = taskTimeCont.children[2].textContent;

        if (button.textContent === "Edit") {
            const task = taskTimeCont.firstElementChild;
            const editTask = elementProperty("input", "type", "text");
            editTask.value = task.textContent;
            taskTimeCont.insertBefore(editTask, task);
            button.textContent = "save";
            task.remove();
        } else if (button.textContent === "save") {
            const editedTask = taskTimeCont.firstElementChild;
            const savedTask = elememtContentAndClassName(
                "p",
                editedTask.value,
                "nameOfTask"
            );
            taskTimeCont.insertBefore(savedTask, editedTask);

            button.textContent = "Edit";
            editedTask.remove();
            updateLocalStorage();
        }
    }
});

function updateLocalStorage() {
    let taskCont = allTaskSection.querySelectorAll(".task-time-cont");
    let tasksToSave = Array.from(taskCont).map((entry) => {
        const nameOfTask = entry.querySelector(".nameOfTask").textContent;
        const timeOfTask = entry.querySelector(".timeOfTask").textContent;
        return { nameOfTask, timeOfTask };
    });
    console.log(tasksToSave);
    localStorage.setItem("taskEntries", JSON.stringify(tasksToSave));
}


function loadFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem("taskEntries")) || "[]";
    for (let i = savedTasks.length - 1; i >= 0; i--) {
        const task = savedTasks[i];
        displayTasks(task.nameOfTask, task.timeOfTask);
    }
}

loadFromLocalStorage();
