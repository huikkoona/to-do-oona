const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

//tallennetut tehtävät kun sivu avataan
document.addEventListener('DOMContentLoaded', loadTasks);

// uusi tehtävä
addBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return alert('Please write a task!');

  const li = createTaskElement(taskText);
  taskList.appendChild(li);

  saveTasks();
  taskInput.value = '';
}

// yksittäinen tehtävä-elementti
function createTaskElement(text, completed = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span);

  if (completed) li.classList.add('completed');

  // nappi tehtävän merkkaamiseen
  const doneBtn = document.createElement('button');
  doneBtn.textContent = '✓';
  doneBtn.classList.add('done-btn');
  doneBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  // nappi tehtävän poistamiseen
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('button-group');
  buttonGroup.append(doneBtn, deleteBtn);

  li.appendChild(buttonGroup);
  return li;
}

// localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const completed = li.classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// tallennetut tehtävät
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  saved.forEach(task => {
    const li = createTaskElement(task.text, task.completed);
    taskList.appendChild(li);
  });
}
