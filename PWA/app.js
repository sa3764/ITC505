// ---------------------
// Elements
// ---------------------
const taskInput = document.getElementById("taskInput");
const categorySelect = document.getElementById("categorySelect");
const prioritySelect = document.getElementById("prioritySelect");
const reminderInput = document.getElementById("reminderInput");
const recurringSelect = document.getElementById("recurringSelect");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const completedList = document.getElementById("completedList");
const reminderList = document.getElementById("reminderList");
const progressBar = document.getElementById("progressBar");
const sweetNote = document.getElementById("sweetNote");
const themeBtn = document.getElementById("themeBtn");
const bgSelect = document.getElementById("bgSelect");
const quoteEl = document.getElementById("quote");
const confettiCanvas = document.getElementById("confetti");
const confettiCtx = confettiCanvas.getContext("2d");
const headerEl = document.querySelector("header");

let tasks = [];
let completed = 0;

const sweetNotes = [
  "🎉 Task Completed! Keep going! ✨",
  "✅ Well done! 🔥",
  "⭐ Another one down! 🌟",
  "💡 Great work! 🚀",
  "👏 Fantastic! 💪"
];

const quotes = [
  "Believe you can and you're halfway there. –Theodore Roosevelt",
  "Don't watch the clock; do what it does. Keep going. –Sam Levenson",
  "The secret of getting ahead is getting started. –Mark Twain",
  "Small steps every day lead to big results. –Unknown"
];

const categoryEmojis = {
  "Cooking 🍳": "🍳",
  "Cleaning 🧹": "🧹",
  "Studying 📚": "📚",
  "Writing ✍️": "✍️",
  "Fitness 🏋️": "🏋️",
  "Shopping 🛒": "🛒",
  "Birthday 🎂": "🎂",
  "Wedding 💍": "💍",
  "Exam 📝": "📝",
  "Study Reminder 📖": "📖"
};

// Canvas setup
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// Add Task
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const category = categorySelect.value;
  const priority = prioritySelect.value;
  const reminderDate = reminderInput.value ? new Date(reminderInput.value) : null;
  const recurring = recurringSelect.value;

  const li = document.createElement("li");
  li.innerHTML = `<span>${category} - ${text}</span> <span>${reminderDate ? reminderDate.toLocaleString() : ''}</span>`;
  li.classList.add(priority);

  li.setAttribute("draggable", "true");
  taskList.appendChild(li);

  tasks.push({ li, category, priority, reminder: reminderDate, recurring, text });

  li.addEventListener("click", () => completeTask(li));
  li.addEventListener("dragstart", dragStart);
  li.addEventListener("dragover", dragOver);
  li.addEventListener("drop", dropTask);
  li.addEventListener("dragend", dragEnd);

  taskInput.value = "";
  reminderInput.value = "";

  updateProgress();
  updateReminders();
}

// Complete Task
function completeTask(li) {
  li.remove();
  completedList.appendChild(li);
  completed++;
  sweetNote.textContent = sweetNotes[Math.floor(Math.random() * sweetNotes.length)];
  quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  const taskObj = tasks.find(t => t.li === li);
  if (taskObj) startConfetti(taskObj.category);

  tasks = tasks.filter(t => t.li !== li);
  updateProgress();
  updateReminders();
}

// Progress Bar
function updateProgress() {
  const total = tasks.length + completed;
  const percent = total === 0 ? 0 : (completed / total) * 100;
  progressBar.style.width = percent + "%";
}

// Reminders
function updateReminders() {
  reminderList.innerHTML = "";
  const now = new Date();
  tasks.forEach(t => {
    if (t.reminder && t.reminder >= now) {
      const li = document.createElement("li");
      li.textContent = `${t.category} - ${t.text} ⏰ ${t.reminder.toLocaleString()}`;
      reminderList.appendChild(li);
    }
  });
}

// Drag & Drop
let dragged;
function dragStart(e) { dragged = e.target; }
function dragOver(e) { e.preventDefault(); }
function dropTask(e) { e.preventDefault(); taskList.insertBefore(dragged, e.target); }
function dragEnd() { dragged = null; }

// Theme & Background
themeBtn.addEventListener("click", () => document.body.classList.toggle("dark"));
bgSelect.addEventListener("change", () => {
  document.body.style.background = bgSelect.value;
  headerEl.style.background = bgSelect.value;
});

// Confetti
let confettis = [];
let confettiActive = false;
function startConfetti(category) {
  if (confettiActive) return;
  confettiActive = true;
  const emoji = categoryEmojis[category] || "✨";
  confettis = [];
  for (let i = 0; i < 150; i++) {
    confettis.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      emoji: emoji,
      size: Math.random() * 30 + 15,
      speedY: Math.random() * 4 + 2,
      speedX: Math.random() * 4 - 2,
      alpha: 1,
      decay: Math.random() * 0.02 + 0.01
    });
  }
  function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let allGone = true;
    confettis.forEach(c => {
      if (c.alpha > 0) {
        allGone = false;
        confettiCtx.globalAlpha = c.alpha;
        confettiCtx.font = c.size + "px Arial";
        confettiCtx.fillText(c.emoji, c.x, c.y);
        c.y += c.speedY;
        c.x += c.speedX;
        c.alpha -= c.decay;
        if (c.y > confettiCanvas.height) c.y = -10;
      }
    });
    confettiCtx.globalAlpha = 1;
    if (!allGone) requestAnimationFrame(animateConfetti);
    else confettiActive = false;
  }
  animateConfetti();
}

// Events
addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => { if (e.key === "Enter") addTask(); });

// Random quote on load
quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];

// Notifications
if (Notification.permission !== "granted") Notification.requestPermission();

// PWA Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then(() => console.log("✅ Service Worker registered"))
    .catch(err => console.log("❌ Service Worker registration failed:", err));
}
