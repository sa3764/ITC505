const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const themeBtn = document.getElementById('themeBtn');
const emojiSelect = document.getElementById('emojiSelect');
const bgSelect = document.getElementById('bgSelect');
const sweetNote = document.getElementById('sweetNote');
const progressBar = document.getElementById('progressBar');
const quoteEl = document.getElementById('quote');
const statusEl = document.getElementById('status');

const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiParticles = [];

// Sample motivational quotes
const quotes = [
  "Keep going, you’re doing great! ✨",
  "Small steps lead to big results! 💪",
  "You can achieve anything! 🌟",
  "Tasks today, success tomorrow! 🚀",
  "Every completed task is a win! 🎉"
];

// Load tasks
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task.text, task.emoji, false));

let totalTasks = tasks.length;
let completedTasks = 0;

updateProgress();
showRandomQuote();

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

    totalTasks++;
    updateProgress();
    showRandomQuote();

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
    if (index > -1) tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    completedTasks++;
    updateProgress();
    showSweetNote();
    launchConfetti();
  });

  taskList.appendChild(li);
  if (animate) setTimeout(() => li.classList.add('show'), 50);
}

function updateProgress() {
  const percent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  progressBar.style.width = percent + "%";
}

// Sweet note
function showSweetNote() {
  sweetNote.textContent = "🎉 Great job! Task completed!";
  sweetNote.style.opacity = 1;
  setTimeout(() => sweetNote.style.opacity = 0, 2000);
}

// Show random motivational quote
function showRandomQuote() {
  quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

// Confetti functions
function launchConfetti() {
  for(let i=0; i<100; i++) {
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random()*6+4,
      d: Math.random()*100,
      color: `hsl(${Math.random()*360},100%,50%)`,
      tilt: Math.random()*10-10,
      tiltAngleIncrement: Math.random()*0.07+0.05
    });
  }
  requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
  ctx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
  for(let i=0; i<confettiParticles.length; i++){
    let p = confettiParticles[i];
    p.tiltAngle += p.tiltAngleIncrement;
    p.y += (Math.cos(p.d) + 3 + p.r/2)/2;
    p.x += Math.sin(p.d);
    p.tilt = Math.sin(p.tiltAngle) * 15;

    ctx.beginPath();
    ctx.lineWidth = p.r/2;
    ctx.strokeStyle = p.color;
    ctx.moveTo(p.x + p.tilt + p.r/4, p.y);
    ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r/4);
    ctx.stroke();
  }
  confettiParticles = confettiParticles.filter(p => p.y < confettiCanvas.height + 20);
  if(confettiParticles.length > 0) requestAnimationFrame(updateConfetti);
}

// Notifications
if ("Notification" in window) Notification.requestPermission();

// Service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then(() => console.log('Service Worker registered'));
  });
}

// Offline/Online Status
window.addEventListener('online', () => statusEl.textContent = "🌐 You are online");
window.addEventListener('offline', () => statusEl.textContent = "⚠️ You are offline");
