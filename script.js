// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Phone menu
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");

function setMenu(open) {
  links.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

toggle.addEventListener("click", () => setMenu(!links.classList.contains("open")));
links.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

// Photo carousel: auto-advances every 3s, pauses for 5s after you swipe, click or use the arrow keys
const carousel = document.querySelector(".carousel");
const slides = [...carousel.querySelectorAll("img")];
const count = carousel.querySelector(".carousel-count");
const dotsBox = carousel.querySelector(".carousel-dots");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let current = 0;
let timer = null;
let resumeTimer = null;

const dots = slides.map((_, i) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Go to image ${i + 1}`);
  dot.addEventListener("click", () => {
    show(i);
    pauseThenResume();
  });
  dotsBox.append(dot);
  return dot;
});

function show(i) {
  current = (i + slides.length) % slides.length;
  slides.forEach((img, n) => img.classList.toggle("active", n === current));
  dots.forEach((dot, n) => dot.setAttribute("aria-current", String(n === current)));
  count.textContent = `${current + 1}/${slides.length}`;
}

function start() {
  if (reduceMotion) return;
  clearInterval(timer);
  timer = setInterval(() => show(current + 1), 3000);
}

function pauseThenResume() {
  clearInterval(timer);
  clearTimeout(resumeTimer);
  resumeTimer = setTimeout(start, 5000);
}

// Swipe (touch) and drag (mouse)
let startX = null;
carousel.addEventListener("pointerdown", (e) => {
  if (e.target.closest("button")) return;
  startX = e.clientX;
  clearInterval(timer);
});
carousel.addEventListener("pointerup", (e) => {
  if (startX === null) return;
  const dx = startX - e.clientX;
  if (dx > 50) show(current + 1);
  else if (dx < -50) show(current - 1);
  startX = null;
  pauseThenResume();
});
carousel.addEventListener("pointercancel", () => {
  startX = null;
  pauseThenResume();
});

carousel.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    e.preventDefault();
    show(current + (e.key === "ArrowRight" ? 1 : -1));
    pauseThenResume();
  }
});

show(0);
start();
