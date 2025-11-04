const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Lataa tallennetut tehtävät kun sivu avataan
document.addEventListener('DOMContentLoaded', loadTasks);

// Lisää uusi tehtävä
addBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return alert('Please write a task!');

  const li = createTaskElement(taskText);
  taskList.appendChild(li);

  saveTasks();
  taskInput.value = '';
}

// Luo yksittäinen tehtävä-elementti
function createTaskElement(text, completed = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span);

  if (completed) {
    li.classList.add('completed');
  }

  const doneBtn = document.createElement('button');
  doneBtn.textContent = '✓';
  doneBtn.classList.add('done-btn');

  doneBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  li.appendChild(doneBtn);
  return li;
}

// Tallennetaan localStorageen
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const completed = li.classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Ladataan tallennetut tehtävät
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  saved.forEach(task => {
    const li = createTaskElement(task.text, task.completed);
    taskList.appendChild(li);
  });
}
