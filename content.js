let lastUrl = "";
let video = null;

const observer = new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;

    setTimeout(() => {
      loadVideo();
    }, 500); // Let YouTube load the video first
  }
});

observer.observe(document, {
  subtree: true,
  childList: true,
});

function loadVideo() {
  found = document.querySelector("video");

  if (found) {
    video = found;
    document.getElementById("box")?.remove();
    showController();
  }
}

document.addEventListener("keypress", (e) => {
  if (e.target.tagName !== "INPUT" || e.target.tagName !== "TEXTAREA") {
    if (e.key.toLowerCase() === "s") decSpeed();
    if (e.key.toLowerCase() === "d") incSpeed();
    if (e.key.toLowerCase() === "g") toggleSpeed();

    if (e.key.toLowerCase() === "z") backward();
    if (e.key.toLowerCase() === "x") forward();
  }
});

function showController() {
  const box = document.createElement("div");
  const inc = document.createElement("button");
  const dec = document.createElement("button");
  const speed = document.createElement("p");

  box.id = "box";
  speed.id = "speed";

  inc.textContent = "+";
  dec.textContent = "-";
  
  const s = localStorage.getItem("speed");
  if (s) {
    speed.textContent = parseFloat(s).toFixed(2) + "x";
    video.playbackRate = parseFloat(s);
  } else {
    speed.textContent = "1.00x";
    video.playbackRate = 1;
    localStorage.setItem("speed", 1);
  }

  inc.addEventListener("click", () => incSpeed());
  dec.addEventListener("click", () => decSpeed());

  box.append(dec, speed, inc);
  document.getElementById("movie_player")?.appendChild(box);
}

function incSpeed() {
  if (video.playbackRate < 16) {video.playbackRate += 0.25};
  showSpeed();
}

function decSpeed() {
  if (video.playbackRate > 0.25) {video.playbackRate -= 0.25};
  showSpeed();
}

function toggleSpeed() {
  let toggleSpeed = localStorage.getItem("toggleSpeed") || video.playbackRate;

  if (video.playbackRate !== 1) {
    localStorage.setItem("toggleSpeed", video.playbackRate);
    video.playbackRate = 1;
  } else {
    video.playbackRate = toggleSpeed;
  }

  showSpeed();
}

function showSpeed() {
  document.getElementById("speed").textContent = video.playbackRate.toFixed(2) + "x";
  localStorage.setItem("speed", video.playbackRate);
}

function backward() {
  if (video.currentTime < 5) {
    video.currentTime = 0;
  } else {
    video.currentTime -= 5;
  }
}

function forward() {
  if (video.currentTime > (video.duration - 5)) {
    video.currentTime = video.duration;
  } else {
    video.currentTime += 5;
  }
}