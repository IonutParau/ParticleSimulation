const p_count = 1000;
var particles = new Array(p_count);
const friction = 0.9;
const gravity = (0.00006 / p_count);

var camPos;

const colors = [
  '#559955', 'red', 'white', 'gray', 'blue', 'lime', 'yellow', 'cyan', '#403100', 'purple', 'rebeccapurple', 'orange'
];

class Particle {
  constructor(pos, mass, color) {
    this.pos = pos;
    this.mass = mass;
    this.color = color;
    this.vel = makeVector(0, 0);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.multiply(friction);
  }

  draw() {
    drawFilledCircle(this.pos.x + camPos.x, this.pos.y + camPos.y, this.mass, this.color);
  }

  attract(other) {
    var dir = other.pos.copy();
    dir.sub(this.pos);
    dir.multiply((gravity * other.mass));

    this.vel.add(dir);
  }

  collide(other) {
    var dist = distance(this.pos, other.pos);

    if(dist <= (this.mass + other.mass) / 2) {
      var dir = other.pos.copy();
      dir.sub(this.pos);
      dir.multiply(((gravity * -2) * p_count) * (this.mass * other.mass));

      this.vel.add(dir);
    }
  }
}

Setup();
setInterval(Update, 10);

function Setup() {
  camPos = makeVector(window.innerWidth/2, window.innerHeight/2);
  for(let i = 0; i < p_count; i++) {
    var roomSize = 10 * p_count;
    var x = random(-roomSize, roomSize);
    var y = random(-roomSize, roomSize);
    var mass = random(10, 35);
    var color = randomObjectFrom(colors);
    particles[i] = new Particle(makeVector(x, y), mass, color);
  }
}

function Update() {
  clearCanvas();
  canvasFullScreen();

  var camSpeed = 17;

  if(isKey(87)) {
    camPos.y += camSpeed;
  }
  if(isKey(83)) {
    camPos.y -= camSpeed;
  }
  if(isKey(65)) {
    camPos.x += camSpeed;
  }
  if(isKey(68)) {
    camPos.x -= camSpeed;
  }

  for(let i = 0; i < p_count; i++) {
    particles[i].update();
    particles[i].draw();

    for(let j = 0; j < p_count; j++) {
      if(particles[i].color === particles[j].color) {
        particles[i].attract(particles[j]);
      }
      particles[i].collide(particles[j]);
    }
  }
}

function countAllWithColor(color) {
  var result = 0;

  for(let i = 0; i < p_count; i++) {
    if(particles[i].color === color) {
      result++;
    }
  }

  console.log(result);
}
