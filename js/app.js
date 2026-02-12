//ESTADO
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

//SELECTORES
const form = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll("[data-filter]");
const dueDateInput = document.getElementById("dueDate");
const sortSelect = document.getElementById("sort-date");
const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const pendingCount = document.getElementById("pending-count");

//FECHA MINIMA = HOY 
const today = new Date().toISOString().split("T")[0];
dueDateInput.setAttribute("min", today);

//EVENTOS
form.addEventListener("submit", handleAddTask);


sortSelect.addEventListener("change", () => {
  renderTasks();
});


filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    renderTasks();
  });
});


//FUNCIONES

function handleAddTask(e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;
  const description = document.getElementById("description").value.trim();

  if (title.length < 3) {
    alert("El título debe tener al menos 3 caracteres.");
    return;
  }

  if (!["Baja", "Media", "Alta"].includes(priority)) {
    alert("Debe seleccionar una prioridad válida.");
    return;
  }

  if (dueDate) {
    const selectedDate = new Date(dueDate);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (selectedDate < todayDate) {
      alert("No podés ingresar una fecha que ya pasó.");
      return;
    }
  }

  const newTask = {
    id: Date.now(),
    title,
    priority,
    dueDate,
    description,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  form.reset();
}

function renderTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (currentFilter === "pending") {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  // ORDENAR POR FECHA
  if (sortSelect.value === "asc") {
    filteredTasks.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }

  if (sortSelect.value === "desc") {
    filteredTasks.sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(b.dueDate) - new Date(a.dueDate);
    });
  }
  // MENSAJE SI NO HAY TAREAS
  if (filteredTasks.length === 0) {
    let message = "";

    if (currentFilter === "all") {
      message = "No hay tareas creadas.";
    }

    if (currentFilter === "pending") {
      message = "No hay tareas pendientes.";
    }

    if (currentFilter === "completed") {
      message = "No hay tareas completadas.";
    }

    taskList.innerHTML = `<p class="empty-message">${message}</p>`;
    updateCounters();
    return;
  }


  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";

    // Color por prioridad
    li.classList.add(`priority-${task.priority.toLowerCase()}`);

    if (task.completed) {
      li.classList.add("completed");
    }

    li.innerHTML = `
      <h3>${task.title}</h3>
      <p><strong>Prioridad:</strong> ${task.priority}</p>
      <p><strong>Fecha:</strong> ${task.dueDate || "Sin fecha"}</p>
      <p>${task.description || ""}</p>
      <div class="task-buttons">
        <button class="complete-btn">
          ${task.completed ? "Desmarcar" : "Completar"}
        </button>
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Eliminar</button>
      </div>
    `;

    const completeBtn = li.querySelector(".complete-btn");
    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    completeBtn.addEventListener("click", () => toggleTask(task.id));
    editBtn.addEventListener("click", () => editTask(task.id));
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    taskList.appendChild(li);
  });

  updateCounters();
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  if (confirm("¿Seguro que querés eliminar esta tarea?")) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
  }
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);

  if (task.completed) {
    alert("No podés editar una tarea completada.");
    return;
  }

  const newTitle = prompt("Editar título:", task.title);
  if (!newTitle || newTitle.trim().length < 3) {
    alert("El título debe tener mínimo 3 caracteres.");
    return;
  }

  const newPriority = prompt(
    "Editar prioridad (Baja / Media / Alta):",
    task.priority
  );

  if (!["Baja", "Media", "Alta"].includes(newPriority)) {
    alert("La prioridad debe ser Baja, Media o Alta.");
    return;
  }

  const newDueDate = prompt(
    "Editar fecha (YYYY-MM-DD):",
    task.dueDate
  );

  if (newDueDate) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(newDueDate)) {
      alert("Formato de fecha inválido.");
      return;
    }

    const selectedDate = new Date(newDueDate);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (selectedDate < todayDate) {
      alert("No podés ingresar una fecha que ya pasó.");
      return;
    }
  }

  const newDescription = prompt("Editar descripción:", task.description);

  task.title = newTitle.trim();
  task.priority = newPriority;
  task.dueDate = newDueDate || "";
  task.description = newDescription ? newDescription.trim() : "";

  saveTasks();
  renderTasks();
}

function updateCounters() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = tasks.filter(task => !task.completed).length;

  totalCount.textContent = total;
  completedCount.textContent = completed;
  pendingCount.textContent = pending;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//INICIALIZAR
renderTasks();
