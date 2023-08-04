const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');
const mapWidth = canvas.width;
const mapHeight = canvas.height;

let x = mapWidth / 2;
let y = mapHeight / 2;
let prevX = x;
let prevY = y;
let totalDistance = 0;
let currentDistance = 0;
let direction = 'North';
let angle = 0;

ctx.strokeRect(0, 0, mapWidth, mapHeight);
const forward = document.getElementById('forward');
const left = document.getElementById('left');
const stop = document.getElementById('stop');
const right = document.getElementById('right');
const backward = document.getElementById('backward');

    forward.addEventListener('click', e => {
      e.preventDefault();
      prevX = x;
      prevY = y;
      y -= 20;
      updateDistanceAndDirection();
      drawLine();
      saveDirectionToDatabase();
    });

    left.addEventListener('click', e => {
      e.preventDefault();
      prevX = x;
      prevY = y;
      x -= 20;
      updateDistanceAndDirection();
      drawLine();
      saveDirectionToDatabase();
    });

    stop.addEventListener('click', e => {
      e.preventDefault();
    });

    right.addEventListener('click', e => {
      e.preventDefault();
      prevX = x;
      prevY = y;
      x += 20;
      updateDistanceAndDirection();
      drawLine();
      saveDirectionToDatabase();
    });

    backward.addEventListener('click', e => {
      e.preventDefault();
      prevX = x;
      prevY = y;
      y += 20;
      updateDistanceAndDirection();
      drawLine();
      saveDirectionToDatabase();
    });

function updateDistanceAndDirection() {
  currentDistance = Math.sqrt(Math.pow(x - prevX, 2) + Math.pow(y - prevY, 2));
  totalDistance += currentDistance;

  angle = Math.atan2(y - prevY, x - prevX) * 180 / Math.PI;
    if (angle >= -45 && angle < 45) {
     direction = 'Right';
    } else if (angle >= 45 && angle < 135) {
        direction = 'Backward';
    }else if (angle >= -135 && angle < -45) {
        direction = 'Forward';
    } else {
        direction = 'Left';
  }
}

function drawLine() {
  if (x >= 0 && x <= mapWidth && y >= 0 && y <= mapHeight) {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(x, y);
    ctx.stroke();
    const distanceDisplay = document.getElementById('distance');
    distanceDisplay.innerText = `Total distance: ${totalDistance.toFixed(2)} pixels\nCurrent distance: ${currentDistance.toFixed(2)} pixels`;
    const directionDisplay = document.getElementById('direction');
    directionDisplay.innerText = `Direction: ${direction}\nAngle: ${angle.toFixed(2)} degrees`;
} else {
    x = mapWidth / 2;
    y = mapHeight / 2;
    ctx.clearRect(0, 0, mapWidth, mapHeight);
    ctx.strokeRect(0, 0, mapWidth, mapHeight);
  }
}

function saveDirectionToDatabase() {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'mdata.php');
  xhr.setRequestHeader('Content-Type', 'application/json');
  const data = {
    direction: document.getElementById('direction').innerText,
    button: event.target.name,
  };
  xhr.send(JSON.stringify(data));
}