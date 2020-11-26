const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('.skip');
const ranges = player.querySelectorAll('.player__slider');


function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    console.log(method);
    video[method]();
};

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


skipButtons.forEach((button) => button.addEventListener('click', skip));
ranges.forEach(function (range) { range.addEventListener('change', rangeUpdate) });
ranges.forEach(function (range) { range.addEventListener('mousemove', rangeUpdate) });

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', function (e) { mousedown && scrub(e) });
progress.addEventListener('mousedown', function () { mousedown = true });
progress.addEventListener('mouseup', function () { mousedown = false });