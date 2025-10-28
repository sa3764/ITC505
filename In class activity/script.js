// ========== Weather Theme Switcher & Interactivity Script ==========

// Elements
const weatherText = document.getElementById('weatherText');
const emoji = document.getElementById('emoji');
const body = document.body;

// Buttons
const sunnyBtn = document.getElementById('sunnyBtn');
const rainyBtn = document.getElementById('rainyBtn');
const snowyBtn = document.getElementById('snowyBtn');

// ========== Weather Theme Switcher (switch statement) ==========
function changeWeather(weather) {
  switch (weather) {
    case 'sunny':
      body.style.background = 'linear-gradient(135deg, #ffeb3b, #ffe082)';
      weatherText.textContent = 'Current Weather: Sunny ☀️';
      emoji.textContent = '😎';
      break;
    case 'rainy':
      body.style.background = 'linear-gradient(135deg, #64b5f6, #4fc3f7)';
      weatherText.textContent = 'Current Weather: Rainy 🌧️';
      emoji.textContent = '🌧️';
      break;
    case 'snowy':
      body.style.background = 'linear-gradient(135deg, #e3f2fd, #bbdefb)';
      weatherText.textContent = 'Current Weather: Snowy ❄️';
      emoji.textContent = '☃️';
      break;
    default:
      body.style.backgroundColor = '#b3e5fc'; // Baby blue default
      weatherText.textContent = 'Current Weather: Default 🌈';
      emoji.textContent = '🌈';
  }
}

// Add click events
sunnyBtn.addEventListener('click', () => changeWeather('sunny'));
rainyBtn.addEventListener('click', () => changeWeather('rainy'));
snowyBtn.addEventListener('click', () => changeWeather('snowy'));

// ========== Rollover Image Effect ==========
const rolloverImage = document.getElementById('rolloverImage');
rolloverImage.addEventListener('mouseover', () => {
  rolloverImage.src = 'https://via.placeholder.com/250x150/ffeb3b/000000?text=Sunny+Vibes';
});
rolloverImage.addEventListener('mouseout', () => {
  rolloverImage.src = 'https://via.placeholder.com/250x150/ffffff/000000?text=Hover+Me';
});

// ========== Button Color Change ==========
const colorButton = document.getElementById('colorButton');
const colors = ['#ff5252', '#42a5f5', '#66bb6a', '#ffb300', '#7e57c2'];
let index = 0;

colorButton.addEventListener('click', () => {
  colorButton.style.backgroundColor = colors[index];
  index = (index + 1) % colors.length; // looping structure
});

// ========== Input Field Validation ==========
const form = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (nameInput.value.trim() === '') {
    alert('⚠️ Please enter your name before submitting!');
  } else {
    alert(`Hello, ${nameInput.value}! Welcome to the Weather Switcher Page!`);
    nameInput.value = '';
  }
});

// ========== Display Modified Date and Time ==========
const dateTimeElement = document.getElementById('dateTime');

function updateDateTime() {
  const now = new Date();
  const formatted = now.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  dateTimeElement.innerHTML = `<strong>Last Modified:</strong> ${formatted}`;
}

setInterval(updateDateTime, 1000);
updateDateTime();
