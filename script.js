const formu = document.getElementById("formulary");
const boxTask = document.getElementById("boxTask");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => addElementos(task));

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

formu.addEventListener("submit", (event) => {
  event.preventDefault();

  const task = document.getElementById("task").value.trim();

  if (task) {
    tasks.push(task);
    saveTasks(tasks);
    addElementos(task);
  } else {
    alert("Error. Usuario inválido.");
  }

  document.getElementById("task").value = "";
});

function addElementos(task) {
  const div = document.createElement("div");
  div.classList.add("newTask");

  div.innerHTML = `
                <div>
                    <p>${task}</p>
                </div>
                <div>
                    <button class="done">✔</button>
                    <button class="delete">🗑️</button>
                </div>
            `;

  boxTask.appendChild(div);

  const deleteButton = div.querySelector(".delete");
  deleteButton.addEventListener("click", () => {
    const taskIndex = tasks.indexOf(task);
    if (taskIndex > -1) {
      tasks.splice(taskIndex, 1);
    }
    saveTasks(tasks);
    div.remove();
  });

  const doneButton = div.querySelector(".done");
  doneButton.addEventListener("click", () => {
    const taskText = div.querySelector("p");
    taskText.classList.toggle("completed");
  });
}
