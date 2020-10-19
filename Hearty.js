// Copyright Ionut Alexandru Parau. 2020. All Rights Reserved.
// Library Module: Hearty.js
// This file is licensed under the GPL-3 License.
// License text available at LICENSE

var canvas = document.getElementById("hearty-canvas");
var keys = Array(256).fill(false);
var mouseButtons = Array(6).fill(false);
var mouseX = 0;
var mouseY = 0;
var ctx;

BootHearty();

function BootHearty() {
    canvas = document.getElementById("hearty-canvas");
    if(canvas == null) {
      canvas = document.getElementById('hearty-canvas');
      if(canvas == null) {
        canvas = document.querySelector('canvas')
      }
    }

    ctx = canvas.getContext("2d");

    document.body.addEventListener('keydown', (keyEvent) => {

        keys[keyEvent.keyCode] = true;

    });

    document.body.addEventListener('keyup', (keyEvent) => {

        keys[keyEvent.keyCode] = false;

    });

    document.body.addEventListener('mouseout', (mouse) => {
        mouseX = mouse.clientX;
        mouseY = mouse.clientY;
    });

    document.body.addEventListener('mouseover', (mouse) => {
        mouseX = mouse.clientX;
        mouseY = mouse.clientY;
    });

    document.body.addEventListener('mouseleave', (mouse) => {
        mouseX = mouse.clientX;
        mouseY = mouse.clientY;
    });

    document.body.addEventListener('mouseenter', (mouse) => {
        mouseX = mouse.clientX;
        mouseY = mouse.clientY;
    });

    document.body.addEventListener('mouseup', (mouse) => {
        mouseButtons[mouse.button] = true;
    });

    document.body.addEventListener('mousedown', (mouse) => {
        mouseButtons[mouse.button] = false;
    });

    document.body.addEventListener('mousemove', (mouse) => {
        mouseX = mouse.clientX;
        mouseY = mouse.clientY;
    });
}

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(pos) {
    this.x += pos.x;
    this.y += pos.y;
  }
  sub(pos) {
    this.x -= pos.x;
    this.y -= pos.y;
  }
  multiply(num) {
    this.x *= num;
    this.y *= num;
  }
  devide(num) {
    this.x /= num;
    this.y /= num;
  }
  mag() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  unit() {
    var mag = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    var newX = this.x / mag;
    var newY = this.y / mag;
    this.x = newX;
    this.y = newY;
  }
  copy() {
    return new Vector(this.x, this.y);
  }
}

function makeVector(x, y) {
  return new Vector(x, y);
}

function distance(pos1, pos2) {
    var distVector = pos1.copy();
    distVector.sub(pos2);
    var distance = distVector.mag();
    return distance;
}

function clearConsole() {
  console.clear();
}

function random(min, max) {
  max++;
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomObjectFrom(arr) {
  var index = random(0, arr.length - 1);
  return arr[index];
}

function atan2(y, x) {
  return Math.atan2(y, x);
}

function sin(r) {
  return Math.sin(r);
}

function cos(r) {
  return Math.cos(r);
}

function round(num) {
  return Math.round(num);
}

function sqrt(num) {
  return Math.sqrt(num);
}

function pow(num, expo) {
  return Math.pow(num, expo);
}

function abs(num) {
  if(num < 0) {
    num *= -1;
  }
  return num;
}

function lineThiccnes(value) {
  ctx.lineWidth = value;
}

function canvasFullScreen() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

function getMouseX() {
  return mouseX;
}

function getMouseY() {
  return mouseY;
}

function getMousePos() {
  return makeVector(mouseX, mouseY);
}

function isKey(keyCode) {
    return keys[keyCode];
}

function isMouseButton(button) {
    return mouseButtons[button];
}

function getCanvas() {
    return canvas;
}

function getCanvasContext() {
  return ctx;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#000000";
}

function drawLine(startX, startY, endX, endY, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function drawCircle(startX, startY, size, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(startX, startY, abs(size / 2), 0, 2 * Math.PI);
    ctx.stroke();
}

function drawRect(startX, startY, endX, endY, color) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.rect(startX, startY, endX, endY);
    ctx.stroke();
}

function drawFilledCircle(startX, startY, size, color) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(startX, startY, abs(size / 2), 0, 2 * Math.PI);
    ctx.fill();
}

function drawFilledRect(startX, startY, endX, endY, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(startX * scale, startY * scale, endX * scale, endY * scale);
    ctx.fill();
}

function drawText(text, x, y, font, color) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
}

function drawImage(img, x, y) {
    ctx.drawImage(img, x, y);
}

function drawImage(img, x, y, width, height) {
    ctx.drawImage(img, x, y, width, height);
}

function drawImage(img, x, y, width, height, sx, sy, sw, sh) {
    ctx.drawImage(img, sx, sy, sw, sh, x, y, width, height);
}
