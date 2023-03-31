// const addTaskButtons = document.querySelectorAll('.add-task');
let draggables = document.querySelectorAll(".task");
let allTasks = document.querySelectorAll(".tasks");
let columns = document.querySelectorAll(".column");

let tasksLS = [];

if (localStorage.getItem("tasks")) {
  tasksLS = JSON.parse(localStorage.getItem("tasks"));
}

// getDataFromLS();

// Add new task
const addTask = document.querySelectorAll(".add-task");

addTask.forEach((add) => {
  add.addEventListener("click", () => {
    const taskInput = document.createElement("input");
    taskInput.className = "task-text";
    taskInput.type = "text";

    let newtask = document.createElement("div");
    newtask.className = "task";
    newtask.draggable = true;
    newtask.appendChild(taskInput);
    add.previousElementSibling.appendChild(newtask);

    const iconArea = document.createElement("div");
    iconArea.className = "icon-area";

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-edit";
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-delete";

    iconArea.appendChild(editBtn);
    iconArea.appendChild(deleteBtn);

    const editIcon = document.createElement("i");
    editIcon.className = "fa-regular fa-pen-to-square icon icon-edit";

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash icon icon-delete";

    editBtn.appendChild(editIcon);
    deleteBtn.appendChild(deleteIcon);

    newtask.appendChild(iconArea);

    let inputsLS = document.querySelectorAll("input");
    inputsLS.forEach((inputLS) => {
      inputLS.addEventListener("input", updateValue);
    });

    function updateValue(e) {
      taskLS.content = e.target.value;
    }

    const taskLS = {
      id: Math.round(Math.random() * 1000000),
      content: taskInput.value,
      col: newtask.parentElement.parentElement.id,
    };

    tasksLS.push(taskLS);

    console.log(taskLS);
    console.log(tasksLS);

    addDataToLS(tasksLS);
    getDataFromLS();

    let draggables = document.querySelectorAll(".task");
    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("is-dragging");
      });
      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("is-dragging");
      });
    });

    allTasks.forEach((zone) => {
      zone.addEventListener("dragover", (e) => {
        e.preventDefault();

        let curTask = document.querySelector(".is-dragging");
        let bottomTask = insertAboveTask(zone, e.clientY);

        if (!bottomTask) {
          zone.appendChild(curTask);
        } else {
          zone.insertBefore(curTask, bottomTask);
        }
      });
    });

    function insertAboveTask(zone, mouseY) {
      let els = zone.querySelectorAll(".task:not(.is-dragging)");

      let closestTask = null;
      let closestOffset = Number.NEGATIVE_INFINITY;

      els.forEach((task) => {
        const { top } = task.getBoundingClientRect();

        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
          closestOffset = offset;
          closestTask = task;
        }
      });
      return closestTask;
    }

    editBtn.addEventListener("click", () => {
      taskInput.disabled = false;
      taskInput.focus();
      updateLS();
    });

    deleteBtn.addEventListener("click", () => {
      newtask.remove();
      updateLS();
    });
  });
});

//  add Localstorage

function addDataToLS(tasksLS) {
  window.localStorage.setItem("tasks", JSON.stringify(tasksLS));
}

function getDataFromLS() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasksLS = JSON.parse(data);
  }
}
