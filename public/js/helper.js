let playBtn = document.querySelector('.play');
let prevBtn = document.querySelector('.prev');
let nextBtn = document.querySelector('.next');
let playerSongs = document.querySelector('.player').dataset.songs;
let songList = JSON.parse(playerSongs);
let progressWrapper = document.querySelector('.progress');
let progressBar = document.querySelector('.progress-bar');
let image = document.querySelector('.cover');
let title = document.querySelector('.title');
let artist = document.querySelector('.artist');
let cDur = document.querySelector('.cDur');
let mDur = document.querySelector('.mDur');
let volume = document.querySelector('.form-range');
let songParent = document.querySelector('.songParent');
let audio = document.getElementById('audio');
let mute = document.querySelector('.playerVolume');
let trackName = document.querySelector('.trackName');

// Keep track of song index
let songIndex = 0;

// Sets the audio source, cover art source, player info and starts the audio;
function playSong() {
  audio.src = songList[songIndex].songURL;
  image.src =
    songList[songIndex]?.imageURL ||
    'https://res.cloudinary.com/drfh0vi5h/image/upload/v1676690365/musicIcon_zjv3ss.jpg';
  progressBar.setAttribute('aria-valuemax', songList[songIndex].duration);
  title.innerHTML = songList[songIndex]?.title || 'Unknown';
  artist.innerHTML = songList[songIndex]?.artist || 'Unknown';
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}

// Pause song
function pauseSong() {
  audio.pause();
}

function playPause() {
  if (playBtn.querySelector('i.fas').classList.contains('fa-play')) {
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
  } else {
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    pauseSong();
  }
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songList.length - 1;
  }
  progressBar.setAttribute('aria-valuemax', songList[songIndex].duration);
  audio.src = songList[songIndex].songURL;
  image.src =
    songList[songIndex]?.imageURL ||
    'https://res.cloudinary.com/drfh0vi5h/image/upload/v1676690365/musicIcon_zjv3ss.jpg';
  title.innerHTML = songList[songIndex]?.title || 'Unknown';
  artist.innerHTML = songList[songIndex]?.artist || 'Unknown';
  playSong();
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songList.length - 1) {
    songIndex = 0;
  }
  progressBar.setAttribute('aria-valuemax', songList[songIndex].duration);
  audio.src = songList[songIndex].songURL;
  image.src =
    songList[songIndex]?.imageURL ||
    'https://res.cloudinary.com/drfh0vi5h/image/upload/v1676690365/musicIcon_zjv3ss.jpg';
  title.innerHTML = songList[songIndex]?.title || 'Unknown';
  artist.innerHTML = songList[songIndex]?.artist || 'Unknown';
  playSong();
}

function timeUpdate() {
  let minutes = Math.floor(audio.currentTime / 60);
  let seconds = (audio.currentTime - minutes * 60).toFixed();
  let timeOutput = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  let dMins = Math.floor(songList[songIndex].duration / 60);
  let dSecs = (songList[songIndex].duration - dMins * 60).toFixed();
  let dTimeOuput = `${dMins}:${dSecs < 10 ? '0' + dSecs : dSecs}`;

  cDur.innerHTML = timeOutput;
  mDur.innerHTML = dTimeOuput;

  progressBar.style.width = `${(
    (audio.currentTime / audio.duration) *
    100
  ).toFixed(2)}%`;
  progressBar.setAttribute('aria-valuenow', timeOutput);
}

function progressUpdate(e) {
  let x = e.offsetX;
  let clickedValue =
    (x * progressBar.getAttribute('aria-valuemax')) / this.offsetWidth;
  audio.currentTime = clickedValue;
}

function songDivIndex(div) {
  const songParent = document.querySelector('.songParent');
  const collection = Array.from(songParent.querySelectorAll('.songDiv'));
  const index = collection.indexOf(div);
  songIndex = index;
  playSong();
}

function volumeUpdate(e) {
  audio.volume = e.currentTarget.value / 100;

  if (e.target.value === '0') {
    mute.classList.remove('fa-volume-high');
    mute.classList.add('fa-volume-xmark');
  } else if (e.target.value > '0') {
    mute.classList.remove('fa-volume-xmark');
    mute.classList.add('fa-volume-high');
  }
}

let volumeValue;
function toggleMute() {
  audio.muted = !audio.muted;

  if (audio.muted) {
    volumeValue = volume.value;
    mute.classList.remove('fa-volume-high');
    mute.classList.add('fa-volume-xmark');
    volume.value = '0';
  } else {
    mute.classList.remove('fa-volume-xmark');
    mute.classList.add('fa-volume-high');
    volume.value = volumeValue;
  }
}

playBtn.addEventListener('click', playPause);
audio.addEventListener('ended', nextSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', timeUpdate);
progressWrapper.addEventListener('click', progressUpdate);
volume.addEventListener('input', volumeUpdate);
mute.addEventListener('click', toggleMute);
