const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const themeBtn = document.getElementById('themeBtn');
const emojiSelect = document.getElementById('emojiSelect');
const bgSelect = document.getElementById('bgSelect');

// Load tasks from localStorage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task.text, task.emoji, false));

// Theme toggle
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

// Background color change
bgSelect.addEventListener('change', (e) => {
  document.body.style.background = e.target.value;
});

// Add task
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  const emoji = emojiSelect.value;
  if (text) {
    addTaskToDOM(text, emoji, true);
    tasks.push({ text, emoji });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';

    // Push notification
    if (Notification.permission === "granted") {
      new Notification("Task Added!", { body: `${emoji} ${text}` });
    }
  }
});

function addTaskToDOM(text, emoji, animate) {
  const li = document.createElement('li');
  li.textContent = `${emoji} ${text}`;

  li.addEventListener('click', () => {
    li.remove();
    const index = tasks.findIndex(t => t.text === text && t.emoji === emoji);
    if (index > -1) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });

  taskList.appendChild(li);
  if (animate) setTimeout(() => li.classList.add('show'), 50);
}

// Request notification permission
if ("Notification" in window) {
  Notification.requestPermission();
}

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker registered'));
  });
}
