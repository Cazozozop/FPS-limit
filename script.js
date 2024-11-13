let fpsSlider = document.getElementById('fpsSlider');
let fpsValueDisplay = document.getElementById('fpsValue');
let fpsDisplay = document.getElementById('fpsDisplay');
let startBtn = document.getElementById('startBtn');
let maxCpuBtn = document.getElementById('maxCpuBtn');
let warningText = document.getElementById('warningText');

let isTestRunning = false;
let loadMultiplier = 0;
let cpuMaximized = false;

fpsSlider.addEventListener('input', () => {
    loadMultiplier = fpsSlider.value;
    fpsValueDisplay.textContent = `${loadMultiplier} FPS`;
});

// Fonction pour générer une charge CPU maximale
function maxCpuLoad() {
    let startTime = performance.now();
    let frameCount = 0;

    function busyLoop() {
        let now = performance.now();
        let elapsed = now - startTime;

        if (elapsed > 1000) {
            fpsDisplay.textContent = `FPS: ${frameCount}`;
            startTime = now;
            frameCount = 0;
        }

        // Charge CPU maximale
        for (let i = 0; i < 10000000; i++) {
            Math.sqrt(Math.random()); // Faire un calcul simple mais lourd
        }

        frameCount++;
        requestAnimationFrame(busyLoop); // Continuer le calcul pour générer une charge constante
    }

    busyLoop();
}

// Fonction pour générer une charge CPU contrôlée
function controlledCpuLoad() {
    let startTime = performance.now();
    let frameCount = 0;

    function busyLoop() {
        let now = performance.now();
        let elapsed = now - startTime;

        if (elapsed > 1000) {
            fpsDisplay.textContent = `FPS: ${frameCount}`;
            startTime = now;
            frameCount = 0;
        }

        // Charge CPU contrôlée par le slider
        if (loadMultiplier > 0) {
            for (let i = 0; i < loadMultiplier * 10000; i++) {
                Math.sqrt(Math.random()); // Faire un calcul simple mais lourd
            }
        }

        frameCount++;
        requestAnimationFrame(busyLoop); // Continuer le calcul pour générer une charge constante
    }

    busyLoop();
}

// Démarrer le test avec la charge CPU contrôlée
startBtn.addEventListener('click', () => {
    if (!isTestRunning) {
        warningText.style.display = 'block'; // Avertir l'utilisateur
        isTestRunning = true;
        controlledCpuLoad(); // Lancer la simulation de charge contrôlée
    }
});

// Maximiser la charge CPU quand le bouton est cliqué
maxCpuBtn.addEventListener('click', () => {
    if (!cpuMaximized) {
        warningText.style.display = 'block'; // Avertir l'utilisateur
        cpuMaximized = true;
        maxCpuLoad(); // Lancer la charge CPU maximale
    }
});
