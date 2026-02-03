/* ---------- Canvas Ambient Particles ---------- */
const canvas = document.getElementById("ambient");
const ctx = canvas.getContext("2d");

let w, h, particles = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.r = Math.random() * 1.5 + 0.5;
    this.vy = Math.random() * 0.3 + 0.1;
    this.alpha = Math.random() * 0.4 + 0.1;
  }
  update() {
    this.y += this.vy;
    if (this.y > h) this.y = 0;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(186,230,253,${this.alpha})`;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0,0,w,h);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();

/* ---------- UI Logic ---------- */
const enterBtn = document.getElementById("enterBtn");
const content = document.getElementById("content");

enterBtn.addEventListener("click", () => {
  content.classList.remove("hidden");
  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
});

/* Intersection Observer */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll(".block").forEach(el => observer.observe(el));
