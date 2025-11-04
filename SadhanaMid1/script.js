const storyStages = {
  start: {
    text: "You stand before a crumbling old mansion. Locals whisper it’s haunted — tonight, you must uncover its secrets. Will you enter?",
    choices: [
      { text: "Step inside the mansion", next: "hallway" },
      { text: "Circle around the house", next: "cemetery" }
    ],
    image: "images/haunted_mansion.jpg"
  },
  hallway: {
    text: "The door creaks open... Dust floats in the moonlight. A faint whisper echoes from upstairs.",
    choices: [
      { text: "Go upstairs toward the whisper", next: "attic" },
      { text: "Explore the old library", next: "library" }
    ],
    image: "images/hallway.jpg"
  },
  attic: {
    text: "You climb the creaky stairs into the attic. A mirror glows faintly — your reflection smiles back before you do.",
    choices: [
      { text: "Touch the mirror", next: "cursed" },
      { text: "Run back downstairs", next: "hallway" }
    ],
    image: "images/attic.jpg"
  },
  library: {
    text: "Cobwebs drape the shelves. An open diary lies on a dusty table. Its ink seems freshly wet...",
    choices: [
      { text: "Read the diary", next: "awakening" },
      { text: "Search behind the bookshelf", next: "treasure" }
    ],
    image: "images/library.jpg"
  },
  treasure: {
    text: "Behind the shelf, you find a secret room — filled with gold and bones. A spirit whispers: 'Take it... if you dare.'",
    choices: [
      { text: "Take the treasure", next: "cursed" },
      { text: "Leave quietly", next: "escape" }
    ],
    image: "images/treasure.jpg"
  },
  awakening: {
    text: "The diary trembles... a ghostly figure rises from the ink! It screams your name.",
    choices: [
      { text: "Apologize and close the book", next: "escape" },
      { text: "Challenge the spirit", next: "vanished" }
    ],
    image: "images/diary.jpg"
  },
  cemetery: {
    text: "You find a hidden graveyard behind the mansion. One grave glows faintly with your initials carved on it...",
    choices: [
      { text: "Touch the grave", next: "grave" },
      { text: "Run back inside", next: "hallway" }
    ],
    image: "images/cemetery.jpg"
  },
  grave: {
    text: "As your hand touches the stone, the ground gives way — and you fall into darkness. The mansion claims another soul.",
    choices: [],
    image: "images/grave.jpg"
  },
  cursed: {
    text: "Your reflection laughs as shadows consume you. The curse is sealed — forever.",
    choices: [],
    image: "images/cursed.jpg"
  },
  vanished: {
    text: "The ghost’s scream fades. You open your eyes... the mansion is gone. So are you.",
    choices: [],
    image: "images/vanished.jpg"
  },
  escape: {
    text: "You sprint out into the dawn! The mansion shrieks behind you as it fades into mist. You survived — for now...",
    choices: [],
    image: "images/sunrise_escape.jpg"
  }
};

let currentStage = "start";

function startGame() {
  currentStage = "start";
  updatePage();
}

function updatePage() {
  const stage = storyStages[currentStage];
  const storyDiv = document.getElementById("story");
  const choicesDiv = document.getElementById("choices");
  const storyImg = document.getElementById("storyImage");

  storyDiv.textContent = stage.text;
  storyImg.style.opacity = 0;

  setTimeout(() => {
    storyImg.src = stage.image;
    storyImg.style.opacity = 1;
  }, 300);

  choicesDiv.innerHTML = "";
  if(stage.choices.length === 0){
    const btn = document.createElement("button");
    btn.textContent = "🔁 Play Again";
    btn.onclick = startGame;
    choicesDiv.appendChild(btn);
  } else {
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
}

window.onload = startGame;


