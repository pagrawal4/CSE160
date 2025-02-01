// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotation;
  void main() {
    gl_Position = u_GlobalRotation * u_ModelMatrix * a_Position;
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
let u_ModelMatrix;
let u_GlobalRotation; // For camera action

// Constants
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

// HTML Controls
let g_selectedColor=[1.0, 1.0, 1.0, 1.0];
let g_selectedSize=5;
let g_selectedType=POINT;
let g_segments=10;
let g_cameraAngle=5;
let g_upperLegAngle=0;
let g_lowerLegAngle=0;
let g_feetAngle=0;
let g_magentaAngle=0;
let g_yellowAnimation=false;
let g_magentaAnimation=false;

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
  gl.enable(gl.DEPTH_TEST);
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

  // Get the storage location of u_ModelMatrix
  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  // Get the storage location of u_GlobalRotation
  u_GlobalRotation = gl.getUniformLocation(gl.program, 'u_GlobalRotation');
  if (!u_GlobalRotation) {
    console.log('Failed to get the storage location of u_GlobalRotation');
    return;
  }

  // Pass the Identity matrix to u_ModelMatrix attribute
  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
  
}

function addActionsForHtmlUI() {

  // Register actions for selecting color buttons
  document.getElementById("clear").onclick = function() { g_shapesList = []; renderScene();};

  // Register actions for point, triangle, and circle buttons
  document.getElementById("point").onclick = function() { g_selectedType = POINT};
  document.getElementById("triangle").onclick = function() { g_selectedType = TRIANGLE};
  document.getElementById("circle").onclick = function() {g_selectedType = CIRCLE};

  // Register actions for red, green, and blue sliders
  document.getElementById("redValue").addEventListener("mouseup", function() { g_selectedColor[0] = this.value/100; });
  document.getElementById("greenValue").addEventListener("mouseup", function() { g_selectedColor[1] = this.value/100; });
  document.getElementById("blueValue").addEventListener("mouseup", function() { g_selectedColor[2] = this.value/100; });

  // Register action for the shape size slider
  document.getElementById("shapeSize").addEventListener("mouseup", function() { g_selectedSize = this.value; });

  // Camera angle slider events
  document.getElementById("cameraAngle").addEventListener("mousemove", function() { g_cameraAngle = this.value; renderScene();});

  // Upper leg slider events
  document.getElementById("upperLegSlide").addEventListener("mousemove", function() { g_upperLegAngle = this.value; renderScene();});

  // Lower leg slider events
  document.getElementById("lowerLegSlide").addEventListener("mousemove", function() { g_lowerLegAngle = this.value; renderScene();});

  // Feet slider events
  document.getElementById("feetSlide").addEventListener("mousemove", function() { g_feetAngle = this.value; renderScene();});

  // Camera magenta slider events
  document.getElementById("magentaSlide").addEventListener("mousemove", function() { g_magentaAngle = this.value; renderScene();});

  // Register action for the segment number of circle
  document.getElementById("segments").addEventListener("mouseup", function() { g_segments = this.value; });

  document.getElementById("animationYellowOnButton").onclick = function() {g_yellowAnimation = true};
  document.getElementById("animationYellowOffButton").onclick = function() {g_yellowAnimation = false};

  document.getElementById("animationMagentaOnButton").onclick = function() {g_magentaAnimation = true};
  document.getElementById("animationMagentaOffButton").onclick = function() {g_magentaAnimation = false};
}

function main() {

  // Set up canvas and gl variables
  setupWebGL();

  // Set up GLSL shader programs and connect
  connectVariablesToGLSL();

  // Register the actions for the controls in HTML
  addActionsForHtmlUI();
    
  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  // canvas.onmousemove = click;
  canvas.onmousemove = function(ev) { if(ev.buttons == 1) {click(ev)}}

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  // gl.clear(gl.COLOR_BUFFER_BIT);
  requestAnimationFrame(tick);
}

// Represents the state that gets rendered
//var g_shapesList = [];
//var g_points = [];  // The array for the position of a mouse press
//var g_colors = [];  // The array to store the color of a point
//var g_sizes = [];  // The array to store the size of a point
function click(ev) {

  // Convert the click event coordinates to WebGL coordinates
  let [x, y] = convertEventCoordinatesToGL(ev);

  // Store the new point with its position, color, and size
  let point;
  if (g_selectedType==POINT) {
    point = new Point();
  }
  else if (g_selectedType==TRIANGLE) {
    point = new Triangle();
  }
  else if (g_selectedType==CIRCLE) {
    point = new Circle();
    point.segments = g_segments;
  }

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
    
  renderScene();
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

var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_startTime;

function tick() {
  // Save the current time
  g_seconds = performance.now()/1000.0 - g_startTime;
  // Print some debug information so we know that it is being called
  console.log(g_seconds);

  // Update Animation Angles
  updateAnimationAngles();

  // Draw everything
  renderScene();

  // Tell the browser to call me again
  requestAnimationFrame(tick);
}

function updateAnimationAngles() {
  if (g_yellowAnimation) {
    g_upperLegAngle = (45*Math.sin(g_seconds));
  }
  if (g_magentaAnimation) {
    g_magentaAngle = (45*Math.sin(3*g_seconds));
  }
}

function renderScene() {
  // Record the start time
  var startTime = performance.now()

  // Connect the matrix to u_ModelMatrix attribute
  var globalRotMat = new Matrix4().rotate(g_cameraAngle, 0, 1, 0);
  gl.uniformMatrix4fv(u_GlobalRotation, false, globalRotMat.elements);

  // Clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //drawCube(new Matrix4().translate(-0.5, -0.5, 0.7));

  // Find coordinate frame for body to be used by leg
  // V V IMP: The transformation that is specified first is the last transformation on the points!!!
  let bodyM = new Matrix4();
  //bodyM.translate(/*g_magentaAngle/100*/ -0.1, -0.25, -0.15);

  // Set reference for upper left and right legs
  let rightUpperLegM = new Matrix4(bodyM).translate(0, -0.2, -0.1);
  let leftUpperLegM = new Matrix4(bodyM).translate(0, -0.2, 0.1);

  // Scale and draw body
  bodyM.scale(0.3, 0.5, 0.3);
  bodyC = [1, 0, 0, 1];
  drawCube(bodyM, bodyC);

  // Rotate and translate right leg
  let rightUpperLegC = [1, 1, 0, 1];
  rightUpperLegM.rotate( g_upperLegAngle, 0, 0, 1);
  rightUpperLegM.translate(0.0, -0.1, 0.01);

  // Rotate and translate left leg
  let leftUpperLegC = [1, 1, 0, 1];
  leftUpperLegM.rotate( -g_upperLegAngle, 0, 0, 1);
  leftUpperLegM.translate(0.0, -0.1, -0.01);

  // Set reference for lower left and right legs
  let rightLowerLegM = new Matrix4(rightUpperLegM).translate(0.06, -0.25, 0);
  let leftLowerLegM = new Matrix4(leftUpperLegM).translate(0.06, -0.25, 0);

  rightUpperLegM.scale(0.12, 0.5, 0.11);
  leftUpperLegM.scale(0.12, 0.5, 0.11);

  // Scale and translate left leg
  let rightLowerLegC = [1, 1, 0, 1];
  rightLowerLegM.rotate( g_lowerLegAngle, 0, 0, 1);
  rightLowerLegM.translate(-0.06, -0.2, 0);

  // Scale and translate right leg
  let leftLowerLegC = [1, 1, 0, 1];
  leftLowerLegM.rotate( g_lowerLegAngle, 0, 0, 1);
  leftLowerLegM.translate(-0.06, -0.2, 0);

  drawCube(leftUpperLegM, leftUpperLegC);
  drawCube(rightUpperLegM, rightUpperLegC);

  // Set reference for lower left and right legs
  let rightFeetM = new Matrix4(rightLowerLegM).translate(-0.06, -0.2, 0);
  let leftFeetM = new Matrix4(leftLowerLegM).translate(-0.06, -0.2, 0);

  rightLowerLegM.scale(0.12, 0.4, 0.10);
  leftLowerLegM.scale(0.12, 0.4, 0.10);

  drawCube(leftLowerLegM);
  drawCube(rightLowerLegM);

  // Scale and translate left feet
  let rightFeetC = [0, 0, 1, 1];
  rightFeetM.rotate( g_feetAngle, 0, 0, 1);
  rightFeetM.translate(0.1, 0.05, 0);

  // Scale and translate right feet
  let leftFeetC = [0, 0, 1, 1];
  leftFeetM.rotate( g_feetAngle, 0, 0, 1);
  leftFeetM.translate(0.1, 0.05, 0);

  rightFeetM.scale(0.25, 0.11, 0.101);
  leftFeetM.scale(0.25, 0.11, 0.101);

  drawCube(leftFeetM, leftFeetC);
  drawCube(rightFeetM, rightFeetC);

  /***
  // Draw left arm lower
  leftArmLowerM.translate(0.0, 0.65, 0.0);
  leftArmLowerM.rotate(g_magentaAngle, 0, 0, 1);
  leftArmLowerM.scale(0.3, 0.3, 0.3);
  leftArmLowerM.translate(-0.5, 0, -0.001); // Last value is to remove z-fight flicker
  leftArmLowerC = [1, 0, 1, 1];
  drawCube(leftArmLowerM, leftArmLowerC);
***/

  // Use the start and current time to record duration (in ms)
  var duration = performance.now() - startTime;
  //sendTextToUI("Points = " + len + ", time = " + Math.floor(duration*1000) + " us" /*+ ", fps: " + Math.floor(10000/duration)/10*/, "numdot");
  sendTextToUI("time = " + Math.floor(duration*1000) + " us" + ", fps: " + Math.floor(10000/duration)/10, "numdot");

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
