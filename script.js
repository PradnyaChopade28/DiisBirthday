/* =========================================================
   EDIT ME — everything personal lives in this one object.
   ========================================================= */
const CONTENT = {
  name: "Dii",
  from: "your little sister",

  // Set to { month, day } (month is 1-indexed) to lock the page behind a
  // countdown until that date every year. Leave as null so the page always
  // opens straight away, any time it's visited.
  birthday: null,

  reasons: [
    "I’m lucky I got you as my sister 💕",
    "You care even when I pretend I don’t need it 🫶🏻🙇",
    "You’re my favourite kind of annoying 🤗🙌🏻",
    "You always have to have it your way 🫩🫡",
    "Still my favourite nuisance 💙🫂",
  ],

  letter: `Happy Birthday to my favourite headache! ❤️ You’re bossy, stubborn and annoyingly cute, but you’re also the one who knows when to scold me, guide me and stand by me. I still remember your "flower showers" when we were little. 🥹
Now, living in another city, your care never feels far away. From tough days to silly laughs, you’re always there. That bus ride reminded me of the same caring Dii I’ve always known.
Thank you for being my sister, my guide and my constant.
Love you! ❤️`,

  cakeMessage: "Happy Birthday to my favourite sister! 🎂❤️",
  treeHeading: "I love you, Dii 💖",

  // Local photos — these match the /images folder that ships right next to
  // this file. Just rename files in /images (and update src below to match)
  // if you ever want to swap one out.
  photos: [
    { src: "images/diiNdad.jpeg", caption: "You and Papa's Strong girl energy 👨‍👧" },
    { src: "images/diiNmumma.jpeg", caption: "You and Mumma, my favourite duo 🥻" },
    { src: "images/meNdiiNmumma.jpeg", caption: "The three of us, always 💫" },
    { src: "images/meNgau.jpeg", caption: "My favourite partner in crime 😂" },
    { src: "images/meNgau2.jpeg", caption: "My constants 💞" },
    { src: "images/meNgau3.jpeg", caption: "Still stealing outfits together 🛍️" },
  ],
};

/* ========================= Setup ========================= */
document.addEventListener("DOMContentLoaded", () => {
  fillNames();
  renderReasons();
  renderPolaroids();
  spawnPetals();
  buildTree();

  setupGate();
  setupSound();
  setupLightbox();
  setupDeck();
  setupCover();
  setupCandle();
  setupCake();
  setupReplay();
});

function fillNames() {
  document.querySelectorAll(".name-slot, #cover-name").forEach(el => (el.textContent = CONTENT.name));
  document.querySelectorAll(".name-slot-from, #cover-from").forEach(el => (el.textContent = CONTENT.from));
  document.getElementById("message-heading").textContent = CONTENT.cakeMessage;
}

/* ===================== Ambient petals + cute stickers ===================== */
const AMBIENT_EMOJI = ["🌸", "💕", "✨", "🎀", "⭐", "💫", "🌷", "🧸"];

function spawnPetals() {
  const field = document.getElementById("petal-field");
  const count = 20;
  for (let i = 0; i < count; i++) {
    const useEmoji = Math.random() > 0.4;
    const p = document.createElement("span");
    p.className = useEmoji ? "petal petal-emoji" : "petal";
    if (useEmoji) p.textContent = AMBIENT_EMOJI[Math.floor(Math.random() * AMBIENT_EMOJI.length)];
    const left = Math.random() * 100;
    const fallDuration = 9 + Math.random() * 9;
    const swayDuration = 3 + Math.random() * 3;
    const delay = Math.random() * 14;
    const scale = 0.7 + Math.random() * 1.1;
    p.style.left = `${left}%`;
    p.style.animationDuration = `${fallDuration}s, ${swayDuration}s`;
    p.style.animationDelay = `${delay}s, ${delay}s`;
    p.style.setProperty("--scale", scale);
    field.appendChild(p);
  }
}

/* ===================== Tree finale (heart leaves) ===================== */
function buildTree() {
  const canopy = document.getElementById("tree-canopy");
  const hearts = ["💖", "💕", "💗", "💓", "💞"];
  const count = 22;
  for (let i = 0; i < count; i++) {
    const leaf = document.createElement("span");
    leaf.className = "leaf";
    leaf.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    // scatter within an oval "canopy" zone
    const left = 10 + Math.random() * 80;
    const top = 5 + Math.random() * 70;
    leaf.style.left = `${left}%`;
    leaf.style.top = `${top}%`;
    leaf.style.animationDelay = `${Math.random() * 0.6}s, ${Math.random() * 3}s`;
    leaf.style.fontSize = `${1 + Math.random() * 0.8}rem`;
    canopy.appendChild(leaf);
  }
}

/* ===================== Gate / countdown ===================== */
function nextOccurrence(month, day) {
  const now = new Date();
  let target = new Date(now.getFullYear(), month - 1, day, 0, 0, 0);
  if (target < now) target.setFullYear(target.getFullYear() + 1);
  return target;
}

function setupGate() {
  const gate = document.getElementById("gate");

  if (!CONTENT.birthday) {
    gate.hidden = true;
    return;
  }

  const now = new Date();
  const thisYearBday = new Date(now.getFullYear(), CONTENT.birthday.month - 1, CONTENT.birthday.day);
  const alreadyPassedToday =
    now.getFullYear() > thisYearBday.getFullYear() ||
    now.getMonth() > thisYearBday.getMonth() ||
    (now.getMonth() === thisYearBday.getMonth() && now.getDate() >= thisYearBday.getDate());

  if (alreadyPassedToday) {
    gate.hidden = true;
    return;
  }

  gate.hidden = false;
  const target = nextOccurrence(CONTENT.birthday.month, CONTENT.birthday.day);

  const dEl = document.getElementById("cd-days");
  const hEl = document.getElementById("cd-hours");
  const mEl = document.getElementById("cd-mins");
  const sEl = document.getElementById("cd-secs");

  const tick = () => {
    const diff = target - new Date();
    if (diff <= 0) {
      clearInterval(timer);
      gate.hidden = true;
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    dEl.textContent = String(d).padStart(2, "0");
    hEl.textContent = String(h).padStart(2, "0");
    mEl.textContent = String(m).padStart(2, "0");
    sEl.textContent = String(s).padStart(2, "0");
  };
  tick();
  const timer = setInterval(tick, 1000);

  document.getElementById("peek-btn").addEventListener("click", () => {
    clearInterval(timer);
    gate.hidden = true;
  });
}

/* ===================== Background music ===================== */
function setupSound() {
  const btn = document.getElementById("sound-toggle");
  const audio = document.getElementById("bg-audio");
  if (!btn || !audio) return;

  btn.addEventListener("click", e => {
    e.stopPropagation();
    if (audio.paused) {
      audio.play().then(() => {
        btn.textContent = "🔊";
        btn.classList.add("playing");
      }).catch(() => {
        alert("Add your own song file to the audio/ folder as \"theme-song.mp3\" first — see the README.");
      });
    } else {
      audio.pause();
      btn.textContent = "🔈";
      btn.classList.remove("playing");
    }
  });
}

function tryPlayMusic() {
  const audio = document.getElementById("bg-audio");
  const btn = document.getElementById("sound-toggle");
  if (!audio || audio.src === "" || !audio.paused) return;
  audio.play().then(() => {
    btn.textContent = "🔊";
    btn.classList.add("playing");
  }).catch(() => { /* no file added yet, or autoplay blocked — silently ignore */ });
}

/* ===================== Slide deck controller ===================== */
let slides = [];
let currentIndex = 0;

function setupDeck() {
  slides = Array.from(document.querySelectorAll("#app .slide"));
  buildDots();

  slides.forEach(slide => {
    // Any interactive control inside a slide should stopPropagation itself;
    // clicking the slide's own background advances, but only once it's "ready".
    slide.addEventListener("click", () => {
      if (slide.classList.contains("ready")) nextSlide();
    });
  });

  document.getElementById("prev-btn").addEventListener("click", e => {
    e.stopPropagation();
    prevSlide();
  });

  goToSlide(0);
}

function buildDots() {
  const wrap = document.getElementById("progress-dots");
  slides.forEach(() => {
    const dot = document.createElement("span");
    dot.className = "dot";
    wrap.appendChild(dot);
  });
}

function updateDots() {
  document.querySelectorAll(".progress-dots .dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentIndex);
  });
}

function goToSlide(i) {
  if (i < 0 || i >= slides.length) return;
  slides.forEach(s => s.classList.remove("active"));
  currentIndex = i;
  const slide = slides[currentIndex];
  slide.classList.add("active");
  updateDots();
  document.getElementById("prev-btn").hidden = currentIndex === 0;
  onSlideEnter(slide.id);
}

function nextSlide() { goToSlide(currentIndex + 1); }
function prevSlide() { goToSlide(currentIndex - 1); }

function markReady(slide) { slide.classList.add("ready"); }

// Per-slide side effects that should fire the moment a slide becomes active.
function onSlideEnter(id) {
  if (id === "slide-reasons" || id === "slide-gallery") {
    markReady(document.getElementById(id));
  }
  if (id === "slide-letter") {
    const slide = document.getElementById(id);
    typewriterLetter(() => markReady(slide));
    markReady(slide); // allow skipping mid-type too
  }
  if (id === "slide-message") {
    const slide = document.getElementById(id);
    burstConfetti(window.innerWidth / 2, window.innerHeight * 0.35, 90);
    tryPlayMusic();
    markReady(slide);
  }
}

/* ===================== Cover / unwrap ===================== */
function setupCover() {
  const btn = document.getElementById("open-btn");
  btn.addEventListener("click", e => {
    e.stopPropagation();
    btn.classList.add("opened");
    burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 70);
    setTimeout(() => nextSlide(), 480);
  });
}

/* ===================== Candle / wish ===================== */
function setupCandle() {
  const candle = document.getElementById("candle-btn");
  const hint = document.getElementById("wish-hint");
  const slide = document.getElementById("slide-wish");

  candle.addEventListener("click", e => {
    e.stopPropagation();
    if (candle.classList.contains("blown")) return;
    candle.classList.add("blown");
    hint.textContent = "wish made 🤞 — tap anywhere for next →";
    const rect = candle.getBoundingClientRect();
    burstConfetti(rect.left + rect.width / 2, rect.top, 45);
    markReady(slide);
  });
}

/* ===================== Cake bake + blow ===================== */
function setupCake() {
  const rig = document.getElementById("bowl-rig");
  const cake = document.getElementById("cake-el");
  const cakeCandle = document.getElementById("cake-candle");
  const hint = document.getElementById("cake-hint");
  const slide = document.getElementById("slide-cake");
  let stage = "idle"; // idle -> baking -> baked -> blown

  rig.addEventListener("click", e => {
    e.stopPropagation();
    if (stage !== "idle") return;
    stage = "baking";
    rig.classList.add("baking");
    hint.textContent = "baking... 🔥";
    setTimeout(() => {
      rig.hidden = true;
      cake.hidden = false;
      stage = "baked";
      hint.textContent = "tap the candle to make a wish";
      burstConfetti(window.innerWidth / 2, window.innerHeight * 0.55, 25);
    }, 1600);
  });

  cakeCandle.addEventListener("click", e => {
    e.stopPropagation();
    if (stage !== "baked") return;
    stage = "blown";
    cake.classList.add("blown");
    hint.textContent = "yay! 🎉 tap anywhere to continue →";
    const rect = cakeCandle.getBoundingClientRect();
    burstConfetti(rect.left + rect.width / 2, rect.top, 50);
    markReady(slide);
  });
}

/* ===================== Replay ===================== */
function setupReplay() {
  document.getElementById("replay-btn").addEventListener("click", e => {
    e.stopPropagation();
    window.location.reload();
  });
}

/* ===================== Reasons: reliable cross-fade flip ===================== */
function renderReasons() {
  const grid = document.getElementById("notes-grid");
  CONTENT.reasons.forEach((text, i) => {
    const note = document.createElement("button");
    note.type = "button";
    note.className = "note";
    note.style.setProperty("--tilt", `${(i % 2 === 0 ? -1 : 1) * (2 + (i % 3))}deg`);
    note.innerHTML = `
      <span class="note-front">#${i + 1}</span>
      <span class="note-back">${text}</span>`;
    note.addEventListener("click", e => {
      e.stopPropagation();
      note.classList.toggle("flipped");
    });
    grid.appendChild(note);
  });
}

/* ===================== Polaroids + lightbox ===================== */
function renderPolaroids() {
  const strip = document.getElementById("polaroid-strip");
  CONTENT.photos.forEach((p, i) => {
    const fig = document.createElement("button");
    fig.type = "button";
    fig.className = "polaroid";
    fig.style.setProperty("--tilt", `${(i % 2 === 0 ? -1 : 1) * (3 + (i % 4))}deg`);
    fig.innerHTML = `<img src="${p.src}" alt="${p.caption || ""}" loading="lazy"><figcaption>${p.caption || ""}</figcaption>`;
    fig.addEventListener("click", e => {
      e.stopPropagation();
      openLightbox(p.src, p.caption);
    });
    strip.appendChild(fig);
  });
}

function setupLightbox() {
  const box = document.getElementById("lightbox");
  document.getElementById("lightbox-close").addEventListener("click", e => {
    e.stopPropagation();
    closeLightbox();
  });
  box.addEventListener("click", e => {
    if (e.target === box) closeLightbox();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeLightbox();
  });
}

function openLightbox(src, caption) {
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox-caption").textContent = caption || "";
  document.getElementById("lightbox").hidden = false;
}
function closeLightbox() {
  document.getElementById("lightbox").hidden = true;
}

/* ===================== Letter typewriter ===================== */
function typewriterLetter(onDone) {
  const el = document.getElementById("letter-body");
  if (el.dataset.typed === "true") return; // only type once
  el.dataset.typed = "true";
  const text = CONTENT.letter;
  let i = 0;
  const speed = 16;
  (function type() {
    el.textContent = text.slice(0, i);
    i++;
    if (i <= text.length) {
      setTimeout(type, speed);
    } else if (onDone) {
      onDone();
    }
  })();
}

/* ===================== Confetti (vanilla canvas) ===================== */
const canvas = document.getElementById("fx-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const CONFETTI_COLORS = ["#E4567B", "#E8B75E", "#A084C4", "#C43D63", "#F5A6C0", "#FFE29B"];
const CONFETTI_SHAPES = ["square", "circle", "heart"];

function burstConfetti(x, y, count = 40) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 5.5;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2,
      size: 5 + Math.random() * 6,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      shape: CONFETTI_SHAPES[Math.floor(Math.random() * CONFETTI_SHAPES.length)],
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
      life: 0,
      maxLife: 65 + Math.random() * 45,
    });
  }
  if (!animating) animate();
}

function drawHeart(size) {
  ctx.beginPath();
  const s = size / 2;
  ctx.moveTo(0, s * 0.3);
  ctx.bezierCurveTo(0, -s * 0.4, -s, -s * 0.4, -s, s * 0.1);
  ctx.bezierCurveTo(-s, s * 0.6, 0, s * 0.8, 0, s * 1.1);
  ctx.bezierCurveTo(0, s * 0.8, s, s * 0.6, s, s * 0.1);
  ctx.bezierCurveTo(s, -s * 0.4, 0, -s * 0.4, 0, s * 0.3);
  ctx.fill();
}

let animating = false;
function animate() {
  animating = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.vy += 0.12;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.spin;
    p.life++;
    const alpha = Math.max(0, 1 - p.life / p.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    if (p.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === "heart") {
      drawHeart(p.size);
    } else {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    }
    ctx.restore();
  });
  particles = particles.filter(p => p.life < p.maxLife && p.y < canvas.height + 40);

  if (particles.length > 0) {
    requestAnimationFrame(animate);
  } else {
    animating = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
