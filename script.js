// script.js
const epiSlider = document.getElementById("epi-slider");
const epiCount = document.getElementById("epi-count");
const fpsCounter = document.getElementById("fps");
const maxEpiBtn = document.getElementById("max-epi-btn");
const themeToggle = document.getElementById("theme-toggle");
let darkMode = false;

// Slider Event Listener
epiSlider.addEventListener("input", () => {
    epiCount.textContent = epiSlider.value;
});

// Toggle Dark/Light Mode
themeToggle.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-mode", darkMode);
    themeToggle.textContent = darkMode ? "Mode Clair" : "Mode Sombre";
});

// Simulate Max CPU Epi Calculation
maxEpiBtn.addEventListener("click", () => {
    const maxEpis = Math.floor(Math.random() * 2000) + 1; // Simule une capacité aléatoire
    alert(`Votre CPU peut générer un maximum de ${maxEpis} épis.`);
});

// FPS Counter
let lastFrameTime = performance.now();
function updateFpsCounter() {
    const now = performance.now();
    const fps = Math.round(1000 / (now - lastFrameTime));
    fpsCounter.textContent = fps;
    lastFrameTime = now;
    requestAnimationFrame(updateFpsCounter);
}
updateFpsCounter();
