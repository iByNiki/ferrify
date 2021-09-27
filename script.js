var githubUrl = "https://raw.githubusercontent.com/iByNiki/MusicApp/main/";

var trackElement = `<div id="t%id%-div" class="track">
        
        <i id="t%id%-action" class="far fa-play-circle" onclick="trackPlay(this);"></i>
        
        <div class="track-info">
          
          <a id="t%id%-title" class="track-title">Despacito</a>
          <a id="t%id%-author" class="track-author">Luis Fonsi</a>
          
        </div>
        
        <!--<div class="track-filler"></div>
        <a id="t%id%-length" class="track-length">2:30</a>-->
          
      </div>
`;

var playingTrackId = 9999999999;
var playing = false;

var loadedTracks = [];
var lastTrackId = 0;

var currentSecond = 0;
var songLength = 1;
var currentVolume = 1;

var trackWrap = document.getElementById("track-wrap");
var timePassed = document.getElementById("t-passed");
var timeTotal = document.getElementById("t-total");
var tInput = document.getElementById("t-input");
var aInput = document.getElementById("a-input");

var audioPlayer = new Audio();
audioPlayer.volume = 0.5;

function secondsToString(seconds) {
  
  var mins = 0;
  var secs = 0;
  
  mins = Math.floor(seconds / 60);
  secs = Math.floor(seconds - (mins * 60));
  
  if (secs < 10) {
    
    return mins.toString() + ":0" + secs.toString();
    
  } else {
    
    return mins.toString() + ":" + secs.toString();
    
  }
  
}

function setSecond(seconds, setTime) {
  
  var value = seconds * (100 / songLength);
  
  tInput.style.background = "linear-gradient(to right, var(--color-secondary) 0%, var(--color-secondary) " + value + "%, var(--color-pressed) " + value + "%, var(--color-pressed) 100%)";
  
  currentSecond = seconds;
  timePassed.innerHTML = secondsToString(currentSecond);
  timeTotal.innerHTML = secondsToString(songLength);
  
  if (setTime) {
    audioPlayer.currentTime = seconds;
  }
  
}

tInput.oninput = function() {
  
  var selectedSecond = songLength * ((this.value - this.min) / (this.max - this.min));
  
  setSecond(selectedSecond, true);
  
}

aInput.oninput = function() {
  
  var value = (this.value - this.min) / (this.max - this.min) * 100;
  
  aInput.style.background = "linear-gradient(to right, var(--color-secondary) 0%, var(--color-secondary) " + value + "%, var(--color-pressed) " + value + "%, var(--color-pressed) 100%)";
  
  audioPlayer.volume = value / 100;;
  currentVolume = value / 100;
  
}

function updateTime() {
  
  setSecond(audioPlayer.currentTime, false);
  
  if (currentSecond >= songLength) {
    
    if (playingTrackId + 1 > loadedTracks.length - 1) {
      
      playingTrackId = 0;
      
    } else {
      
      playingTrackId += 1;
      
    }
    
    loadedTracks.forEach(function(track) {
        
      if (track.id == playingTrackId) {
          
        playTrack(track);
          
      }  
        
    });
    
  }
  
}

function loadTracks() {
  
  var xhr = new XMLHttpRequest();
  xhr.open("GET", githubUrl + "/tracks/tracks.json");

  xhr.onload = function () {
    
    var trackData = JSON.parse(this.responseText);
    var tracks = trackData.tracks;
    
    tracks.forEach(function(ctrack) {

      loadedTracks.push({
        
        "id": lastTrackId,
        "name": ctrack.split(" - ")[0],
        "author": ctrack.split(" - ")[1].split(".")[0],
        "url": githubUrl + "/tracks/" + ctrack
        
      });
        
      lastTrackId += 1;
      
    });
    
    insertTracks();
    
  };

  xhr.send();
  
}

function insertTracks() {
  
  trackWrap.innerHTML = "";
  
  loadedTracks.forEach(function(track) {
    
    var toAdd = trackElement.replaceAll("%id%", track.id.toString());
    
    if (playingTrackId == track.id) {
      
      toAdd = toAdd.replace('"track"', '"track playing"');
      toAdd = toAdd.replace('"far', '"fas');
      
    }
    
    trackWrap.innerHTML += toAdd;
    
    document.getElementById("t" + track.id.toString() + "-title").innerHTML = track.name;
    
    document.getElementById("t" + track.id.toString() + "-author").innerHTML = track.author;
    
  });
  
}

function trackPlay(playButton) {
  
  var id = parseInt(playButton.id.replace("-action", "").replace("t", ""));
  
  loadedTracks.forEach(function(track) {
    
    if (track.id == id) {
      
      playTrack(track);
      
    }
    
  });
  
}

function playTrack(track) {
  
  document.getElementById("playing-title").innerHTML = track.name;
  document.getElementById("playing-author").innerHTML = track.author;
      
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
  audioPlayer = new Audio(track.url);
      
  audioPlayer.oncanplay = function() {
        
    songLength = this.duration;
        
  }
  
  audioPlayer.volume = currentVolume;
      
  audioPlayer.play();
      
  playingTrackId = track.id;
  insertTracks();
  document.getElementById("play-i").className = "fas fa-pause";
  playing = true;
  
}

function playAction() {
  
  if (playing) {
    
    document.getElementById("play-i").className = "fas fa-play";
    audioPlayer.pause();
    playing = false;
    
  } else {
    
    document.getElementById("play-i").className = "fas fa-pause";
    audioPlayer.play();
    playing = true;
    
  }
  
}

loadTracks();
setSecond(currentSecond, true);

setInterval(updateTime, 500);