const video = document.getElementById('video')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progress = document.getElementById('progress')
const timestamp = document.getElementById('timestamp')

// play and pause video
const toggleVideoStatus = () => {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

// update play/pause icon
const updatePlayIcon = () => {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
  }
}

// update timestamp slider
const updateProgress = () => {
  progress.value = (video.currentTime / video.duration) * 100

  // get minutes
  let mins = Math.floor(video.currentTime / 60)
  if (mins < 10) {
    mins = '0' + String(mins)
  }
  // get seconds
  let sec = Math.floor(video.currentTime % 60)
  if (sec < 10) {
    sec = '0' + String(sec)
  }

  timestamp.innerHTML = `${mins}:${sec}`
}

// set video time progress
const setVideoProgress = () => {
  video.currentTime = (+progress.value * video.duration) / 100
}

// stop video
const stopVideo = () => {
  if (video.pause) {
    video.currentTime = 0
    video.pause()
  }
}

// "read more" funtion
function readmore () {
  var dots = document.getElementById('dots')
  var moreText = document.getElementById('more')
  var btnText = document.getElementById('readmore-btn')

  if (dots.style.display === 'none') {
    dots.style.display = 'inline'
    btnText.innerHTML = 'Read more'
    moreText.style.display = 'none'
  } else {
    dots.style.display = 'none'
    btnText.innerHTML = 'Read less'
    moreText.style.display = 'inline'
  }
}

/// /// EVENT LISTENERS
video.addEventListener('click', toggleVideoStatus)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('timeupdate', updateProgress)
play.addEventListener('click', toggleVideoStatus)
stop.addEventListener('click', stopVideo)
progress.addEventListener('click', setVideoProgress)
