let fpsSlider = document.getElementById('fpsSlider');
let fpsValueDisplay = document.getElementById('fpsValue');
let fpsDisplay = document.getElementById('fpsDisplay');
let startBtn = document.getElementById('startBtn');
let intervalId;
let currentFps = 0;

fpsSlider.addEventListener('input', () => {
    currentFps = fpsSlider.value;
    fpsValueDisplay.textContent = `${currentFps} FPS`;
});

function simulateFpsLoad(fps) {
    let startTime = performance.now();
    let frameCount = 0;

    function frame() {
        let now = performance.now();
        let elapsed = now - startTime;
        
        if (elapsed > 1000) {
            fpsDisplay.textContent = `FPS: ${frameCount}`;
            startTime = now;
            frameCount = 0;
        }

        if (frameCount < fps) {
            frameCount++;
            requestAnimationFrame(frame);
        }
    }

    frame();
}

startBtn.addEventListener('click', () => {
    clearInterval(intervalId); // Clear any previous test
    simulateFpsLoad(currentFps);
});
