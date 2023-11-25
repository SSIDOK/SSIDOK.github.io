document.addEventListener('DOMContentLoaded', function () {
  loadTasks();
});

function addTask(event) {
  if (event.key === 'Enter') {
      const input = document.getElementById('taskInput');
      const taskText = input.value.trim();
      if (taskText !== '') {
          const task = {
              text: taskText,
              timestamp: new Date().toLocaleString(),
              completed: false,
          };
          saveTask(task);
          input.value = '';
          loadTasks();
      }
  }
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = task.completed ? 'completed' : '';
      li.innerHTML = `
          <input type="checkbox" onchange="toggleTask(${index})" ${task.completed ? 'checked' : ''}>
          <span ondblclick="editTask(${index})">${task.text}</span>
          <span class="timestamp">${task.timestamp}</span>
          <span class="delete" onclick="deleteTask(${index})">&#10006;</span>
      `;
      taskList.appendChild(li);
  });
}

function toggleTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

function editTask(index) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const text = prompt('Редагувати завдання:', tasks[index].text);
  if (text !== null) {
      tasks[index].text = text;
      tasks[index].timestamp = new Date().toLocaleString();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      loadTasks();
  }
}
