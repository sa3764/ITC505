const storyStages = {
  start: {
    text: "You stand before the abandoned St. Mercy Hospital. The doors creak open by themselves. Inside, something moves. Do you dare to enter?",
    choices: [
      { text: "Enter the hospital", next: "lobby" },
      { text: "Explore the ambulance bay", next: "bay" }
    ],
    image: "images/hospital_outside.jpg"
  },

  lobby: {
    text: "The air smells like rust and decay. The lights flicker, revealing blood-stained walls. A wheelchair moves on its own down the hallway.",
    choices: [
      { text: "Follow the wheelchair", next: "ward" },
      { text: "Go toward the operating room", next: "operating" }
    ],
    image: "images/lobby.jpg"
  },

  bay: {
    text: "The ambulance bay is silent. You see an old patient file fluttering in the wind. The name on it... is yours.",
    choices: [
      { text: "Read the file", next: "ending_file" },
      { text: "Drop it and go inside", next: "lobby" }
    ],
    image: "images/ambulance_bay.jpg"
  },

  ward: {
    text: "You follow the wheelchair into a dark ward. Rows of beds are covered with dusty sheets. One of them... moves.",
    choices: [
      { text: "Pull off the sheet", next: "ending_patient" },
      { text: "Run to the nurse station", next: "nurseStation" }
    ],
    image: "images/ward.jpg"
  },

  operating: {
    text: "The operating room reeks of old blood. The lights flicker on, revealing surgical tools laid out neatly... still wet.",
    choices: [
      { text: "Inspect the tools", next: "ending_surgeon" },
      { text: "Leave immediately", next: "hallway" }
    ],
    image: "images/operating_room.jpg"
  },

  hallway: {
    text: "A faint voice calls your name from the darkness. You see a glowing door marked 'MORGUE'.",
    choices: [
      { text: "Enter the morgue", next: "morgue" },
      { text: "Ignore it and go upstairs", next: "staircase" }
    ],
    image: "images/hallway.jpg"
  },

  morgue: {
    text: "Cold air hits you. Body drawers line the walls. One of them slides open slowly. Something whispers... 'You were never discharged.'",
    choices: [
      { text: "Open the drawer", next: "ending_morgue" },
      { text: "Run away", next: "ending_escape" }
    ],
    image: "images/morgue.jpg"
  },

  staircase: {
    text: "The stairway creaks. Halfway up, you see bloody footprints leading to a dimly lit room labeled 'ICU'.",
    choices: [
      { text: "Enter ICU", next: "icu" },
      { text: "Go back down", next: "hallway" }
    ],
    image: "images/stairs.jpg"
  },

  icu: {
    text: "Inside the ICU, monitors beep faintly. One patient is awake — their eyes are white. They whisper, 'You shouldn’t be alive.'",
    choices: [
      { text: "Ask what they mean", next: "ending_truth" },
      { text: "Unplug the machines", next: "ending_silence" }
    ],
    image: "images/icu.jpg"
  },

  nurseStation: {
    text: "You find a dusty nurse station. A radio crackles to life: 'Code Red — patient loose in Ward 7!'",
    choices: [
      { text: "Hide under the desk", next: "ending_found" },
      { text: "Run down the corridor", next: "ending_corridor" }
    ],
    image: "images/nurse_station.jpg"
  },

  // 🔥 ENDINGS
  ending_file: {
    text: "The file says: 'Time of death — tonight.' As you read, your heart stops. You were already a patient here.",
    choices: [],
    image: "images/ending_file.jpg"
  },

  ending_patient: {
    text: "Under the sheet is... you. The body smiles. You never left the hospital.",
    choices: [],
    image: "images/ending_patient.jpg"
  },

  ending_surgeon: {
    text: "You touch a scalpel — it's warm. A shadow behind you whispers: 'The operation isn't over.'",
    choices: [],
    image: "images/ending_surgeon.jpg"
  },

  ending_morgue: {
    text: "Inside the drawer lies your name tag and a toe tag. The door slams shut. Eternal silence.",
    choices: [],
    image: "images/ending_morgue.jpg"
  },

  ending_escape: {
    text: "You burst outside, gasping — dawn breaks. But when you look back, the hospital is gone.",
    choices: [],
    image: "images/ending_escape.jpg"
  },

  ending_truth: {
    text: "The patient says, 'You died in this hospital five years ago.' Your vision fades. You remember everything.",
    choices: [],
    image: "images/ending_truth.jpg"
  },

  ending_silence: {
    text: "You pull the plug. The beeping stops. A voice whispers, 'Now, we switch places.'",
    choices: [],
    image: "images/ending_silence.jpg"
  },

  ending_found: {
    text: "Footsteps approach. Something cold grabs your ankle. You’re dragged into the darkness.",
    choices: [],
    image: "images/ending_found.jpg"
  },

  ending_corridor: {
    text: "You run endlessly through dark hallways. The hospital keeps shifting — you’ll never find the exit.",
    choices: [],
    image: "images/ending_corridor.jpg"
  }
};

// 🧠 GAME FUNCTIONS
let currentStage = "start";

function startGame() {
  currentStage = "start";
  updatePage();
}

function updatePage() {
  const stage = storyStages[currentStage];
  document.getElementById("story-text").textContent = stage.text;
  document.getElementById("story-image").src = stage.image;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  if (stage.choices.length === 0) {
    const endBtn = document.createElement("button");
    endBtn.textContent = "🔁 Try a Different Fate";
    endBtn.onclick = startGame;
    choicesDiv.appendChild(endBtn);
    return;
  }

  stage.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.onclick = () => {
      currentStage = choice.next;
      updatePage();
    };
    choicesDiv.appendChild(btn);
  });
}

startGame();
