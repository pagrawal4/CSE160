// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`

// Global Variables
// Canvas items
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;

// HTML Controls
let g_selectedColor=[1.0, 1.0, 1.0, 1.0];
let g_selectedSize=5;

function setupWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  // gl = getWebGLContext(canvas);
  // Get context with preserve buffer flag set to true to handle
  // performance issue. Tells GL which buffer to preserve
  // rather than reallocating and clearing them    
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
}

function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_Size
  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
}

function registerActionsForUIControls() {

  // Register actions for selecting color buttons
  document.getElementById("green").onclick = function() { g_selectedColor = [0.0, 1.0, 0.0, 1.0]; };
  document.getElementById("red").onclick = function() { g_selectedColor = [1.0, 0.0, 0.0, 1.0]; };
  document.getElementById("clear").onclick = function() { g_shapesList = []; renderAllShapes();};

  // Register actions for red, green, and blue sliders
  document.getElementById("redValue").addEventListener("mouseup", function() { g_selectedColor[0] = this.value/100; });
  document.getElementById("greenValue").addEventListener("mouseup", function() { g_selectedColor[1] = this.value/100; });
  document.getElementById("blueValue").addEventListener("mouseup", function() { g_selectedColor[2] = this.value/100; });

  // Register action for the shape size slider
  document.getElementById("shapeSize").addEventListener("mouseup", function() { g_selectedSize = this.value; });
}

function main() {

  // Set up canvas and gl variables
  setupWebGL();

  // Set up GLSL shader programs and connect
  connectVariablesToGLSL();

  // Register the actions for the controls in HTML
  registerActionsForUIControls();
    
  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  // canvas.onmousemove = click;
  canvas.onmousemove = function(ev) { if(ev.buttons == 1) {click(ev)}}

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}


// Represents the state that gets rendered
var g_shapesList = [];
//var g_points = [];  // The array for the position of a mouse press
//var g_colors = [];  // The array to store the color of a point
//var g_sizes = [];  // The array to store the size of a point
function click(ev) {

  // Convert the click event coordinates to WebGL coordinates
  let [x, y] = convertEventCoordinatesToGL(ev);

  // Store the new point with its position, color, and size
  let point = new Point();
  point.position = [x, y];
  point.color = g_selectedColor.slice();
  point.size = g_selectedSize;
  g_shapesList.push(point);  
    
  // Store the coordinates to g_points array
  // g_points.push([x, y]);

  // Store the selected color to g_colors array
  // Here, slice used to make a copy to prevent all points from
  // changing to new color as g_selectedColor is passed as a pointer
  // g_colors.push(g_selectedColor.slice());

  // Store the size to the g_sizes array
  // g_sizes.push(g_selectedSize);
    
  renderAllShapes();
}

// Convert event coordinates [0,0] to [400, 400] scale to
// normalized GL coordinates [-1, 1] to [1, -1] scale
function convertEventCoordinatesToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x,y]);
}

function renderAllShapes() {
  // Record the start time
  var startTime = performance.now()

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_shapesList.length;

  for(var i = 0; i < len; i++) {
    g_shapesList[i].render();
  }

  // Use the start and current time to record duration (in ms)
  var duration = performance.now() - startTime;
  sendTextToUI("Points = " + len + ", time = " + Math.floor(duration*1000) + " us" /*+ ", fps: " + Math.floor(10000/duration)/10*/, "numdot");

}

// Set the text of a HTML element
function sendTextToUI(text, htmlID) {
  var UIElem = document.getElementById(htmlID);
  if (!UIElem) {
    console.log("Failed to get " + htmlID + " from UI");
    return;
  }
  UIElem.innerHTML = text;
}
