(function() {
    const timeDisplay = document.getElementById('timeDisplay');
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsContainer = document.getElementById('lapsContainer');

    let startTime = null;
    let elapsedTime = 0; 
    let timerInterval = null;
    let running = false;

    let laps = [];

    function updateTime() {
        const now = performance.now();
        elapsedTime = now - startTime;
        timeDisplay.textContent = formatTime(elapsedTime);
    }

    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const centiseconds = Math.floor((ms % 1000) / 10);

        
        return (
            pad(minutes, 2) + ':' +
            pad(seconds, 2) + ':' +
            pad(centiseconds, 2)
        );
    }

    function pad(num, size) {
        let s = "00" + num;
        return s.substr(s.length - size);
    }

    function startStopwatch() {
        if (!running) {
            startTime = performance.now() - elapsedTime;
            timerInterval = setInterval(() => {
                updateTime();
            }, 10);
            running = true;
            updateButtons();
        }
    }

    function pauseStopwatch() {
        if (running) {
            clearInterval(timerInterval);
            running = false;
            updateButtons();
        }
    }

    function resetStopwatch() {
        pauseStopwatch();
        elapsedTime = 0;
        timeDisplay.textContent = '00:00:00.00';
        laps = [];
        renderLaps();
        updateButtons();
    }

    function recordLap() {
        if (running) {
            laps.push(elapsedTime);
            renderLaps();
        }
    }

    function renderLaps() {
        lapsContainer.innerHTML = laps.length ? '' : '<em> laps records</em>';
        laps.forEach((lapTime, i) => {
            const lapDiv = document.createElement('div');
            lapDiv.classList.add('lap');
            lapDiv.textContent = `Lap ${i + 1}: ${formatTime(lapTime)}`;
            lapsContainer.appendChild(lapDiv);
        });
    }

    function updateButtons() {
        startBtn.disabled = running;
        pauseBtn.disabled = !running;
        lapBtn.disabled = !running;
        resetBtn.disabled = !elapsedTime && laps.length === 0;
    }

   
    startBtn.addEventListener('click', startStopwatch);
    pauseBtn.addEventListener('click', pauseStopwatch);
    resetBtn.addEventListener('click', resetStopwatch);
    lapBtn.addEventListener('click', recordLap);

    
    updateButtons();
    renderLaps();
}) ();