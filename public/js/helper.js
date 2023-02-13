let playBtn = document.querySelector('.play');
let prevBtn = document.querySelector('.prev');
let nextBtn = document.querySelector('.next');

// Keep track of song index
let songIndex = 0;

// Play song
function playSong() {
  // musicContainer.classList.add('play');
  // playBtn.querySelector('i.fas').classList.remove('fa-play');
  // playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  // musicContainer.classList.remove('play');
  // playBtn.querySelector('i.fas').classList.add('fa-play');
  // playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  // if (songIndex < 0) {
  //   songIndex = songs.length - 1;
  // }

  // loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  // if (songIndex > songs.length - 1) {
  //   songIndex = 0;
  // }

  // loadSong(songs[songIndex]);

  playSong();
}

function test() {
  console.log('This works');
}

play.addEventListener('click', test);
prev.addEventListener('click', test);
next.addEventListener('click', test);
