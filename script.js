let fpsSlider = document.getElementById('fpsSlider');
let fpsValueDisplay = document.getElementById('fpsValue');
let fpsDisplay = document.getElementById('fpsDisplay');
let startBtn = document.getElementById('startBtn');
let warningText = document.getElementById('warningText');

let intervalId;
let isTestRunning = false;

// Variable pour le calcul de la charge CPU
let loadMultiplier = 0;

fpsSlider.addEventListener('input', () => {
    loadMultiplier = fpsSlider.value;  // Réglage de la charge en fonction du slider
    fpsValueDisplay.textContent = `${loadMultiplier} FPS`;
});

function calculateCpuLoad() {
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

        // Effectuer des calculs pour augmenter la charge CPU
        if (loadMultiplier > 0) {
            for (let i = 0; i < loadMultiplier * 10000; i++) {
                Math.sqrt(Math.random());
            }
        }

        frameCount++;
        requestAnimationFrame(busyLoop);
    }

    busyLoop();
}

startBtn.addEventListener('click', () => {
    if (!isTestRunning) {
        warningText.style.display = 'block';  // Avertir l'utilisateur que l'appareil peut chauffer
        isTestRunning = true;
        calculateCpuLoad();  // Lancer la simulation de charge CPU
    }
});
