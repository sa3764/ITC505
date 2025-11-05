let model, video, renderer, scene, camera, character, recorder, chunks = [];

async function init() {
  // Setup webcam
  video = document.getElementById("video");
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;

  // Load facemesh
  model = await facemesh.load();

  // Setup Three.js scene
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 640 / 480, 0.1, 1000);
  camera.position.z = 2;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(640, 480);
  document.getElementById("threeContainer").appendChild(renderer.domElement);

  // Load initial character
  loadCharacter(document.getElementById("characterSelect").value);

  // Load initial background
  scene.background = new THREE.TextureLoader().load(document.getElementById("bgSelect").value);

  // Event listeners
  document.getElementById("characterSelect").addEventListener("change", (e) => {
    loadCharacter(e.target.value);
  });

  document.getElementById("bgSelect").addEventListener("change", (e) => {
    scene.background = new THREE.TextureLoader().load(e.target.value);
  });

  document.getElementById("recordBtn").addEventListener("click", startRecording);

  animate();
}

function loadCharacter(path) {
  const loader = new THREE.GLTFLoader();
  loader.load(path, (gltf) => {
    if (character) scene.remove(character);
    character = gltf.scene;
    character.scale.set(1, 1, 1); // Adjust size if needed
    scene.add(character);
  });
}

async function animate() {
  requestAnimationFrame(animate);

  const predictions = await model.estimateFaces({ input: video });

  if (predictions.length > 0 && character) {
    const p = predictions[0];
    const nose = p.annotations.noseTip[0];
    const leftEye = p.annotations.leftEyeUpper0[3];
    const rightEye = p.annotations.rightEyeUpper0[3];

    // Head movement
    character.rotation.y = (nose[0] - 300) / 300;
    character.rotation.x = (nose[1] - 200) / 200;

    // Wink detection
    const eyeDistance = Math.abs(leftEye[1] - rightEye[1]);
    character.rotation.z = eyeDistance < 5 ? 0.3 : 0;
  }

  renderer.render(scene, camera);
}

function startRecording() {
  const stream = renderer.domElement.captureStream(30);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = saveRecording;
  recorder.start();
  setTimeout(() => recorder.stop(), 5000);
}

function saveRecording() {
  const blob = new Blob(chunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "holobooth_video.webm";
  a.click();
  chunks = [];
}

init();

