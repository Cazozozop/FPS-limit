let fpsSlider = document.getElementById('fpsSlider');
let fpsValueDisplay = document.getElementById('fpsValue');
let startBtn = document.getElementById('startBtn');
let maxCpuBtn = document.getElementById('maxCpuBtn');
let warningText = document.getElementById('warningText');

let isTestRunning = false;
let loadMultiplier = 0;
let cpuMaximized = false;

let themeToggle = document.getElementById('themeToggle');
let themeIcon = document.getElementById('themeIcon');

// Canevas et jeu
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let squareSize = 30;
let squareX = Math.random() * (canvas.width - squareSize);
let squareY = Math.random() * (canvas.height - squareSize);
let squareSpeedX = Math.random() * 2 - 1; // Vitesse aléatoire
let squareSpeedY = Math.random() * 2 - 1; // Vitesse aléatoire

// Mise à jour de l'animation du jeu
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer l'ancien dessin
    ctx.fillStyle = "#007bff"; // Couleur du carré
    ctx.fillRect(squareX, squareY, squareSize, squareSize);

    // Déplacer le carré
    squareX += squareSpeedX * (loadMultiplier / 100); // Multiplicateur basé sur FPS
    squareY += squareSpeedY * (loadMultiplier / 100);

    // Vérifier si le carré touche les bords
    if (squareX <= 0 || squareX + squareSize >= canvas.width) squareSpeedX *= -1;
    if (squareY <= 0 || squareY + squareSize >= canvas.height) squareSpeedY *= -1;

    requestAnimationFrame(updateGame); // Demander une nouvelle animation
}

// Fonction pour générer une charge CPU maximale
function maxCpuLoad() {
    let startTime = performance.now();
    let frameCount = 0;

    function busyLoop() {
        let now = performance.now();
        let elapsed = now - startTime;

        if (elapsed > 1000) {
            fpsValueDisplay.textContent = `FPS: ${frameCount}`;
            startTime = now;
            frameCount = 0;
        }

        // Charge CPU maximale avec des calculs lourds (calcule des nombres premiers)
        let i = 2;
        while (i < 10000000) {
            let prime = true;
            for (let j = 2; j < Math.sqrt(i); j++) {
                if (i % j === 0) {
                    prime = false;
                    break;
                }
            }
            i++;
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
            fpsValueDisplay.textContent = `FPS: ${frameCount}`;
            startTime = now;
            frameCount = 0;
        }

        // Charge CPU contrôlée par le slider
        if (loadMultiplier > 0) {
            let i = 2;
            while (i < 1000000 * (loadMultiplier / 100)) {
                let prime = true;
                for (let j = 2; j < Math.sqrt(i); j++) {
                    if (i % j === 0) {
                        prime = false;
                        break;
                    }
                }
                i++;
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
        warningText.style.display = 'block';
        loadMultiplier = fpsSlider.value;
        isTestRunning = true;
        controlledCpuLoad();
    }
});

// Maximiser la charge CPU
maxCpuBtn.addEventListener('click', () => {
    if (!cpuMaximized) {
        warningText.style.display = 'block';
        loadMultiplier = 100;
        cpuMaximized = true;
        maxCpuLoad();
    }
});

// Mise à jour de la valeur du FPS
fpsSlider.addEventListener('input', () => {
    fpsValueDisplay.textContent = `${fpsSlider.value} FPS`;
    loadMultiplier = fpsSlider.value;
});

// Fonction de changement de thème
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeIcon.classList.toggle('sun');
    themeIcon.classList.toggle('moon');
});

updateGame();
