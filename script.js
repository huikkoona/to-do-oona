const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// lataa tallennetut tehtävät
document.addEventListener('DOMContentLoaded', loadTasks);

// lisää uusi tehtävä
addBtn.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return alert('please write a task!');
  const li = createTaskElement(taskText);
  taskList.appendChild(li);
  saveTasks();
  taskInput.value = '';
}

// luo tehtävä
function createTaskElement(text, completed = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = text;
  li.appendChild(span);

  if (completed) li.classList.add('completed');

  const btns = document.createElement('div');
  btns.classList.add('button-group');

  const doneBtn = document.createElement('button');
  doneBtn.textContent = '✓';
  doneBtn.classList.add('done-btn');
  doneBtn.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = '✖';
  delBtn.classList.add('delete-btn');
  delBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  btns.append(doneBtn, delBtn);
  li.appendChild(btns);
  return li;
}

// tallenna localstorageen
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const completed = li.classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// lataa localstoragesta
function loadTasks() {
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  saved.forEach(task => {
    const li = createTaskElement(task.text, task.completed);
    taskList.appendChild(li);
  });
}
