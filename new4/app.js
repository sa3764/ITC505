// --------------------- DOM Elements ---------------------
const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const prioritySelect = document.getElementById("prioritySelect");
const reminderInput = document.getElementById("reminderInput");
const recurringSelect = document.getElementById("recurringSelect");
const addBtn = document.getElementById("addBtn");
const themeBtn = document.getElementById("themeBtn");
const bgSelect = document.getElementById("bgSelect");

const taskList = document.getElementById("taskList");
const completedList = document.getElementById("completedList");
const reminderList = document.getElementById("reminderList");
const progressBar = document.getElementById("progressBar");
const sweetNote = document.getElementById("sweetNote");
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

// Fullscreen canvas
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// --------------------- Task Arrays ---------------------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

// --------------------- Add Task ---------------------
addBtn.addEventListener("click", () => {
  const task = {
    text: taskInput.value,
    category: categorySelect.value,
    priority: prioritySelect.value,
    reminder: reminderInput.value,
    recurring: recurringSelect.value
  };
  if (!task.text) return;
  tasks.push(task);
  taskInput.value = "";
  reminderInput.value = "";
  saveTasks();
  renderTasks();
  renderReminders();
  updateProgress();
});

// --------------------- Render Tasks ---------------------
function renderTasks() {
  taskList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.priority;
    li.textContent = `${task.text} (${task.category})`;
    li.onclick = () => completeTask(index);
    taskList.appendChild(li);
  });

  completedTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.priority;
    li.textContent = `${task.text} (${task.category})`;
    completedList.appendChild(li);
  });
}

// --------------------- Complete Task ---------------------
function completeTask(index) {
  completedTasks.push(tasks[index]);
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  updateProgress();
  showConfetti();
  showSweetNote();
}

// --------------------- Save Tasks ---------------------
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

// --------------------- Progress Bar ---------------------
function updateProgress() {
  const total = tasks.length + completedTasks.length;
  const percent = total ? (completedTasks.length / total) * 100 : 0;
  progressBar.style.width = percent + "%";
}

// --------------------- Sweet Note ---------------------
const notes = [
  "🎉 Great Job! Task Completed!",
  "✨ You're Awesome! Keep Going!",
  "🌟 Success! Task Done!"
];
function showSweetNote() {
  const note = notes[Math.floor(Math.random() * notes.length)];
  sweetNote.textContent = note;
  setTimeout(() => { sweetNote.textContent = ""; }, 3000);
}

// --------------------- Confetti ---------------------
function showConfetti() {
  const emojis = ["🎉","✨","💖","🌟","🎊"];
  const confettis = [];
  for (let i = 0; i < 50; i++) {
    confettis.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height / 2,
      dy: Math.random() * 2 + 2,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      fontSize: Math.random() * 24 + 18
    });
  }

  const interval = setInterval(() => {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettis.forEach(c => {
      ctx.font = c.fontSize + "px Arial";
      ctx.fillText(c.emoji, c.x, c.y);
      c.y += c.dy;
    });
  }, 30);

  setTimeout(() => {
    clearInterval(interval);
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }, 3000);
}

// --------------------- Theme Toggle ---------------------
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// --------------------- Background Color ---------------------
bgSelect.addEventListener("change", (e) => {
  document.body.style.background = e.target.value;
});

// --------------------- Reminders ---------------------
function renderReminders() {
  reminderList.innerHTML = "";
  tasks.forEach(task => {
    if (task.reminder) {
      const li = document.createElement("li");
      li.textContent = `${task.text} - ${task.reminder}`;
      reminderList.appendChild(li);
    }
  });
}

// --------------------- Motivation Quote ---------------------
const quotes = ["💪 Stay Focused!", "🚀 Keep Moving Forward!", "🌟 You Can Do It!"];
document.getElementById("quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];

// --------------------- Service Worker (PWA) ---------------------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker registered!', reg))
      .catch(err => console.log('Service Worker failed:', err));
  });
}

// --------------------- Resize Canvas ---------------------
window.addEventListener("resize", () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

// --------------------- Initial Render ---------------------
renderTasks();
renderReminders();
updateProgress();




