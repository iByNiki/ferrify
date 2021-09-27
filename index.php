<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - Music app</title>
  <link rel="stylesheet" href="./style.css">

</head>
<body>
<!-- partial:index.partial.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css">

<script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

<div class="footer">
  <div class="track-playing">
    <a id="playing-title" class="playing-title">None</a>
    <a id="playing-author" class="playing-author">None</a>
  </div>
  <div class="controls">
    
    <div class="controls-top">
      
      <a class="c back"><i class="fas fa-backward"></i></a>
      <a onclick="playAction();" class="c play"><i id="play-i" class="fas fa-play"></i></a>
      <a class="c forw"><i class="fas fa-forward"></i></a>
      
    </div>
  
    <div class="controls-bottom">
      
      <div id="t-passed" class="time-passed">0:00</div>
      
      <div class="timeline">
        
        <input id="t-input" class="t-input" min="0" max="400" type="range" value="0" />
        
      </div>
      
      <div id="t-total" class="time-total">0:00</div>
      
    </div>
    
  </div>
  
  <div class="audio-controls">
    
    <i class="fas fa-volume-down"></i>
    
    <div class="audio-slider">
      
      <input id="a-input" class="t-input" min="0" max="200" type="range" value="0" />
      
    </div>
    
  </div>
  
</div>

<div class="topcontainer">
  <div class="menu">
    <a class="m button"><i class="fas fa-home"></i>Home</a>
    <a class="m button"><i class="fas fa-search"></i>Search</a>
    <a class="m button"><i class="fas fa-book"></i>Your library</a>
    
    <div style="width: 100%; height: 2em"></div>
    
    <div class="m playlist-container">
      
      <a class="m playlist first"><i></i>Chill</a>
      <a class="m playlist"><i></i>Rap</a>
      <a class="m playlist"><i></i>Classic</a>
      <a class="m playlist"><i></i>Pop</a>
      
    </div>

  </div>
  
  <div class="rightwrap">
    
    <div class="header">
      <a class="window-title">Ferrify</a>
    </div>
  
    <div id="track-wrap" class="songs">
      
      
      
    </div>
    
  </div>
  
</div>
<!-- partial -->
  <script  src="./script.js"></script>

</body>
</html>
