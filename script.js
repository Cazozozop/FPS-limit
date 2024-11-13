// Variables Globales
let fpsSlider = document.getElementById("fps-slider");
let fpsValue = document.getElementById("fps-value");
let gameCube = document.getElementById("game-cube");
let modeToggle = document.querySelector(".mode-toggle");
let sparksContainer = document.getElementById("sparks-container");

// Variables Mode Sombre/Clair
let isDarkMode = false;

// Variables FPS et mouvement du cube
let fpsInterval = null;
let fps = 0;
let maxSpeed = 2000; // La vitesse maximale du cube

// Fonction de changement de mode
function toggleMode() {
    if (isDarkMode) {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        modeToggle.innerHTML = "🌞";
    } else {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
        modeToggle.innerHTML = "🌙";
    }
    isDarkMode = !isDarkMode;
}

// Fonction de mise à jour des FPS
fpsSlider.oninput = function () {
    fpsValue.textContent = fpsSlider.value;
    fps = parseInt(fpsSlider.value);
    if (fps === 0) {
        clearInterval(fpsInterval);
    } else {
        startFPS(fps);
    }
};

// Fonction de gestion du FPS et du mouvement du cube
function startFPS(fps) {
    let speed = (fps / maxSpeed) * 100;  // Calcul de la vitesse du cube en fonction du FPS
    gameCube.style.transitionDuration = `${Math.max(1, speed / 100)}s`;  // Limite de la vitesse

    // Mouvement du cube
    gameCube.style.left = `${Math.random() * 70}%`;
    gameCube.style.top = `${Math.random() * 70}%`;

    // Lancer un intervalle pour mettre à jour la position du cube
    clearInterval(fpsInterval);
    fpsInterval = setInterval(() => {
        gameCube.style.left = `${Math.random() * 70}%`;
        gameCube.style.top = `${Math.random() * 70}%`;
    }, 1000 / fps);
}

// Fonction pour créer des étincelles
function createSparks() {
    const spark = document.createElement("div");
    spark.classList.add("spark");
    spark.style.left = `${Math.random() * 100}%`;
    spark.style.top = `${Math.random() * 100}%`;
    spark.style.setProperty("--dx", (Math.random() - 0.5) * 100 + "px");
    spark.style.setProperty("--dy", (Math.random() - 0.5) * 100 + "px");
    sparksContainer.appendChild(spark);

    // Supprimer les étincelles après l'animation
    setTimeout(() => {
        spark.remove();
    }, 2000);
}

// Générer des étincelles régulièrement
setInterval(createSparks, 100);

// Fonction pour démarrer le test
function startTest() {
    fpsSlider.value = 0;
    fpsValue.textContent = "0";
    clearInterval(fpsInterval);
    gameCube.style.left = "50%";
    gameCube.style.top = "50%";
}
