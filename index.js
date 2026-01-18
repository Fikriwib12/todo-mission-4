function updateClock() {
  const clockElement = document.getElementById("clock");
  const dateElement = document.getElementById("date");

  const now = new Date();
  const time = now.toLocaleTimeString();

  const date = now.toLocaleDateString("id-ID", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  clockElement.textContent = time;
  dateElement.textContent = date;
}

setInterval(updateClock, 1000);

updateClock();

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const prioritySelect = document.getElementById("prioritySelect");

  const tasktext = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (!tasktext) {
    alert("Task Harus diisi");
    return;
  }

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const newTask = {
    text: tasktext,
    priority: priority,
  };
  tasks.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";

  displayTask();
}

function displayTask() {
  const todoList = document.getElementById("todolist");

  todoList.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add(
      "task-item",
      "bg-white",
      "shadow-md",
      "flex",
      "justify-between",
      "items-start",
      "p-4",
      "border-l-4",
      "border-black",
      "rounded-md",
      "relative",
    );
    taskItem.innerHTML += `  
              <div class="flex items-start">
                <input type="checkbox" name="" id="checkbox-task-${index}" class="w-4" />
                <div class="task-content ml-4 flex flex-col gap-2">
                  <span class="task-text">${task.text} </span>
                  <div class="task-meta">Prioritas : <strong>${task.priority}</strong></div>
                </div>
              </div>

              <button
                class="border-red-500 bg-red-500 text-white font-bold text-xl border-[2px] cursor-pointer"
                id="btn-delete-task"
                onclick="deleteTask(${index})"
              >
                x
              </button>
           

           `;
    const checkbox = taskItem.querySelector(`#checkbox-task-${index}`);
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        moveToDone(index, task);
      }
    });

    todoList.appendChild(taskItem);
  });
}

function moveToDone(index, task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];
  tasks.splice(index, 1);
  doneTasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("doneTasks", JSON.stringify(doneTasks));

  displayTask();
  displayDone();
}

function displayDone() {
  const doneList = document.getElementById("done");
  doneList.innerHTML = "";

  let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

  doneTasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add(
      "task-done",
      "bg-slate-300",
      "shadow-md",
      "flex",
      "items-start",
      "justify-between",
      "p-4",
      "border-l-4",
      "border-black",
      "rounded-md",
      "relative",
    );

    taskItem.innerHTML = `
      <div class="flex items-start">
        <input type="checkbox" id="checkbox-done-${index}" class="w-4" checked disabled />
        <div class="task-content ml-4 flex flex-col gap-2">
          <span class="task-text line-through">${task.text}</span>
          <div class="task-meta">Prioritas : <strong>${task.priority}</strong></div>
        </div>
      </div>

      <button class="border-red-500 bg-red-500 text-white font-bold text-xl border-[2px] cursor-pointer" id="btn-delete-done" onclick="deleteDone(${index})">
        x
      </button>
    `;

    doneList.appendChild(taskItem);
  });
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTask();
}

function deleteAllTask(key) {
  localStorage.removeItem(key);
  displayTask();
}
function deleteDone(index) {
  let doneTasks = JSON.parse(localStorage.getItem("doneTasks"));
  doneTasks.splice(index, 1);
  localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
  displayDone();
}
function deleteAllDone(key) {
  localStorage.removeItem(key);
  displayDone();
}

displayTask();
displayDone();
