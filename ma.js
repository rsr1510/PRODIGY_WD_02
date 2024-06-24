document.addEventListener("DOMContentLoaded", () => {
    const hrs = document.getElementById('hrs');
    const min = document.getElementById('min');
    const sec = document.getElementById('sec');
    const misec = document.getElementById('misec');
    const lapsContainer = document.getElementById('laps');

    let startTime, updatedTime, tInterval;
    let running = false;
    let hours = 0, minutes = 0, seconds = 0, milliseconds = 0, difference = 0;

    const playBtn = document.querySelector('.play-btn');
    const stopBtn = document.querySelector('.stop-btn');
    const resetBtn = document.querySelector('.bx-reset');
    const lapBtn = document.querySelector('.bx-flag');

    function startTimer() {
        if (!running) {
            startTime = new Date().getTime() - difference;
            tInterval = setInterval(updateTime, 10);
            running = true;
            playBtn.classList.add('hidden');
            stopBtn.classList.remove('hidden');
            lapBtn.classList.remove('hidden');
            resetBtn.classList.remove('hidden');
        }
    }

    function stopTimer() {
        if (running) {
            clearInterval(tInterval);
            running = false;
            playBtn.classList.remove('hidden');
            stopBtn.classList.add('hidden');
            lapBtn.classList.add('hidden');
            resetBtn.classList.remove('hidden');
        }
    }

    function resetTimer() {
        clearInterval(tInterval);
        running = false;
        difference = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        hrs.textContent = '00';
        min.textContent = '00';
        sec.textContent = '00';
        misec.textContent = '00';
        lapsContainer.innerHTML = '';
        playBtn.classList.remove('hidden');
        stopBtn.classList.add('hidden');
        lapBtn.classList.add('hidden');
        resetBtn.classList.add('hidden');
    }

    function updateTime() {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;

        hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((difference % (1000 * 60)) / 1000);
        milliseconds = Math.floor((difference % 1000) / 10);

        hrs.textContent = String(hours).padStart(2, '0');
        min.textContent = String(minutes).padStart(2, '0');
        sec.textContent = String(seconds).padStart(2, '0');
        misec.textContent = String(milliseconds).padStart(2, '0');
    }

    function recordLap() {
        const lapTime = document.createElement('li');
        lapTime.innerHTML = `${hrs.textContent}:${min.textContent}:${sec.textContent}  <span class="lap-misec">${misec.textContent}</span>`;
        lapsContainer.appendChild(lapTime);
        lapsContainer.scrollTop = lapsContainer.scrollHeight;  
    };

    playBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);
    lapBtn.addEventListener('click', recordLap);
});
