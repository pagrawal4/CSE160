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
let g_animalGlobalRotationX=0;
let g_animalGlobalRotationY=30;
let g_animalGlobalRotationZ=0;
let g_upperRightLegAngle=0;
let g_upperLeftLegAngle=0;
let g_lowerRightLegAngle=0;
let g_lowerLeftLegAngle=0;
let g_upperRightArmAngle=-45;
let g_upperLeftArmAngle=-45;
let g_lowerRightArmAngle=90;
let g_lowerLeftArmAngle=90;
let g_rightFeetAngle=0;
let g_leftFeetAngle=0;
let g_rightHandAngle=0;
let g_leftHandAngle=0;
let g_moveXPosition=0;
let g_moveYPosition=8;
let g_animationOn=false;
let g_altAnimationOn=false;

// Performance
var g_startTime = performance.now()/1000.0;
var g_time = performance.now()/1000.0 - g_startTime;
var g_tickNum = -1;

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

  // Camera angle slider events
  document.getElementById("cameraAngleX").addEventListener("mousemove", function() { g_animalGlobalRotationX = this.value; renderScene();});
  document.getElementById("cameraAngleY").addEventListener("mousemove", function() { g_animalGlobalRotationY = this.value; renderScene();});
  document.getElementById("cameraAngleZ").addEventListener("mousemove", function() { g_animalGlobalRotationZ = this.value; renderScene();});

  // Upper leg slider events
  document.getElementById("upperRightLegSlide").addEventListener("mousemove", function() { g_upperRightLegAngle = this.value; renderScene();});
  // Upper leg slider events
  document.getElementById("upperLeftLegSlide").addEventListener("mousemove", function() { g_upperLeftLegAngle = this.value; renderScene();});

  // Lower leg slider events
  document.getElementById("lowerRightLegSlide").addEventListener("mousemove", function() { g_lowerRightLegAngle = this.value; renderScene();});
  // Lower leg slider events
  document.getElementById("lowerLeftLegSlide").addEventListener("mousemove", function() { g_lowerLeftLegAngle = this.value; renderScene();});

  // Feet slider events
  document.getElementById("rightFeetSlide").addEventListener("mousemove", function() { g_rightFeetAngle = this.value; renderScene();});
  // Feet slider events
  document.getElementById("leftFeetSlide").addEventListener("mousemove", function() { g_leftFeetAngle = this.value; renderScene();});

  // Upper arm slider events
  document.getElementById("upperRightArmSlide").addEventListener("mousemove", function() { g_upperRightArmAngle = this.value; renderScene();});
  // Upper arm slider events
  document.getElementById("upperLeftArmSlide").addEventListener("mousemove", function() { g_upperLeftArmAngle = this.value; renderScene();});

  // Lower arm slider events
  document.getElementById("lowerRightArmSlide").addEventListener("mousemove", function() { g_lowerRightArmAngle = this.value; renderScene();});
  // Lower arm slider events
  document.getElementById("lowerLeftArmSlide").addEventListener("mousemove", function() { g_lowerLeftArmAngle = this.value; renderScene();});

  // Hand slider events
  document.getElementById("rightHandSlide").addEventListener("mousemove", function() { g_rightHandAngle = this.value; renderScene();});
  // Hand slider events
  document.getElementById("leftHandSlide").addEventListener("mousemove", function() { g_leftHandAngle = this.value; renderScene();});

  document.getElementById("animationOnOff").onclick = function() {g_animationOn = !g_animationOn; if (g_animationOn) {g_altAnimationOn = false}};
  document.getElementById("altAnimationOnOff").onclick = function() {g_altAnimationOn = !g_altAnimationOn; if (g_altAnimationOn) {g_animationOn = false;}
  };

  // Handle moving camera mouse event
  var lastX = 0;
  var lastY = 0;
  canvas.onmousemove = function(ev) {
    let [x, y] = convertEventCoordinatesToGL(ev);

    if(ev.buttons == 1) {
      // Moving parallel to x-axis should rotate along y-aix
      // and vice versa to look natural
      g_animalGlobalRotationY -= (x - lastX) * 180;
      g_animalGlobalRotationX -= (y - lastY) * 180;
    }
    lastX = x;
    lastY = y;
  }

  // Handle shift click alt animation
  canvas.onmousedown = function(ev) {
    if (ev.shiftKey) {
      g_altAnimationOn = !g_altAnimationOn;
    }
  }

}

function main() {

  // Set up canvas and gl variables
  setupWebGL();

  // Set up GLSL shader programs and connect
  connectVariablesToGLSL();

  // Register the actions for the controls in HTML
  addActionsForHtmlUI();
    
  // Register function (event handler) to be called on a mouse press
  //canvas.onmousedown = tick;
  // canvas.onmousemove = click;
  //canvas.onmousemove = function(ev) { if(ev.buttons == 1) {}

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  // gl.clear(gl.COLOR_BUFFER_BIT);
  requestAnimationFrame(tick);
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

function tick() {
  // Save the current time
  g_time = performance.now()/1000.0 - g_startTime;
  // Print some debug information so we know that it is being called
  //console.log(g_time);

  // Update Animation Angles
  if (g_animationOn) {
    updateAnimationAngles();
  } 
  else if (g_altAnimationOn) {
    updateAnimationAnglesMoonWalk();
  }

  // Draw everything
  renderScene();

  // Tell the browser to call me again
  requestAnimationFrame(tick);
}

function updateAnimationAngles() {
  if (g_tickNum == -1) {
    g_moveXPosition += -60;
    g_moveYPosition += 1*Math.sin(g_time);
  }
  g_upperRightLegAngle = 35*Math.sin(g_time) + 5;
  g_upperLeftLegAngle = -35*Math.sin(g_time) + 5;
  g_lowerRightLegAngle = -Math.abs((20*Math.sin(g_time)));
  g_lowerLeftLegAngle = -Math.abs((20*Math.sin(g_time)));

  g_upperRightArmAngle = -45*Math.sin(g_time);
  g_upperLeftArmAngle = 45*Math.sin(g_time);
  g_lowerRightArmAngle = Math.abs((20*Math.sin(g_time)));
  g_lowerLeftArmAngle = Math.abs((20*Math.sin(g_time)));

  g_moveXPosition += 0.5;
  if (g_moveXPosition > 85) g_moveXPosition = -60;
  g_tickNum++;
}

function updateAnimationAnglesMoonWalk() {
  if (g_tickNum == -1) {
    g_moveXPosition += 60;
    g_moveYPosition += 2*Math.sin(g_time);
  }
  g_upperRightLegAngle = 20*Math.sin(g_time)-5;
  g_upperLeftLegAngle = -20*Math.sin(g_time)-5;
  g_lowerRightLegAngle = -Math.abs((20*Math.sin(g_time)));
  g_lowerLeftLegAngle = -Math.abs((20*Math.sin(g_time)));

  g_upperRightArmAngle=-45;
  g_lowerRightArmAngle=90;
  g_upperLeftArmAngle = 90;
  g_lowerLeftArmAngle=90;

  g_rightFeetAngle = -15*Math.sin(g_time);
  g_leftFeetAngle = 15*Math.sin(g_time);

  g_moveXPosition -= 0.5;
  if (g_moveXPosition < -85) g_moveXPosition = 60;
  g_tickNum++;
}

function renderScene() {
  // Record the start time
  var startTime = performance.now()

  // Connect the matrix to u_ModelMatrix attribute
  var globalRotMat = new Matrix4();
  globalRotMat.rotate(g_animalGlobalRotationZ, 0, 0, 1);
  globalRotMat.rotate(g_animalGlobalRotationY, 0, 1, 0);
  globalRotMat.rotate(g_animalGlobalRotationX, 1, 0, 0);

  gl.uniformMatrix4fv(u_GlobalRotation, false, globalRotMat.elements);

  // Clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // V IMP: The transformation that is specified first is the last transformation 
  // on the points!!!

  // FLOOR

  // Draw the floor
  let floorM = new Matrix4().translate(0, -0.95, 0).scale(1.5, 0.05, 1.5);
  drawCube(floorM, [1, 0, 1, 1]);

  // BODY

  let baseBodyM = new Matrix4();
  baseBodyM.translate(g_moveXPosition/100, g_moveYPosition/100, 0);// -0.1, -0.25, -0.15);
  //baseBodyM.rotate(g_time*10, 0, 1, 0);

  // Scale and draw body
  let bodyM = new Matrix4(baseBodyM).scale(0.35, 0.5, 0.3);
  let bodyC = [1, 0, 0, 1];
  drawCube(bodyM, bodyC);

  // HEAD and HAT

  // Set reference for head
  let baseHeadM = new Matrix4(baseBodyM).translate(0, 0.425, 0);

  // Scale and draw head
  let headM = new Matrix4(baseHeadM);
  headM.scale(0.3, 0.25, 0.27);
  let headC = [1, 1, 1, 1];
  drawCube(headM, headC);

  // Set reference for neck
  let neckM = new Matrix4(baseBodyM).translate(0, 0.375, 0);
  // Scale and draw neck
  neckM.scale(0.18, 0.35, 0.18);
  let neckC = [1, 1, 0, 1];
  drawCube(neckM, neckC);

  // Set reference for right ear
  let rightEarM = new Matrix4(baseHeadM).translate(0, 0, -0.15);
  // Scale and draw rightEar
  rightEarM.scale(0.045, 0.125, 0.06);
  let rightEarC = [1, 0.9, 0.1, 1];
  drawCube(rightEarM, rightEarC);

  // Set reference for left ear
  let leftEarM = new Matrix4(baseHeadM).translate(0, 0, 0.15);
  // Scale and draw leftEar
  leftEarM.scale(0.045, 0.125, 0.06);
  let leftEarC = [1, 0.9, 0.1, 1];
  drawCube(leftEarM, leftEarC);

  // Set reference for nose
  let noseM = new Matrix4(baseHeadM).translate(0.18, 0.04, 0);
  //noseM.rotate(25, 0, 0, 1);
  noseM.rotate(-90, 0, 1, 0);
  // Scale and draw nose
  noseM.scale(0.05, 0.125, 0.075);
  let noseC = [1, 0.8, 0, 1];
  drawTriangularPrism(noseM, noseC);

  // Set reference for right eye
  let rightEyeM = new Matrix4(baseHeadM).translate(0.15, 0.04, -0.08);
  // Scale and draw rightEye
  rightEyeM.scale(0.02, 0.08, 0.06);
  let rightEyeC = [0, 0, 0, 1];
  drawCube(rightEyeM, rightEyeC);

  // Set reference for left eye
  let leftEyeM = new Matrix4(baseHeadM).translate(0.15, 0.04, 0.08);
  // Scale and draw leftEye
  leftEyeM.scale(0.02, 0.08, 0.06);
  let leftEyeC = [0, 0, 0, 1];
  drawCube(leftEyeM, leftEyeC);

  // Set reference for mouth
  let mouthM = new Matrix4(baseHeadM).translate(0.15, -0.05, 0.00);
  // Scale and draw mouth
  mouthM.scale(0.08, 0.02, 0.15);
  let mouthC = [0, 0, 0, 1];
  drawCube(mouthM, mouthC);

  // HAT

  // Set reference for brim of hat
  let brimM = new Matrix4(baseHeadM).translate(0, 0.15, 0);
  // Scale and draw brim
  brimM.scale(0.54, 0.05, 0.54);
  let brimC = [1, 0, 0, 1];
  drawCube(brimM, brimC);

  // Set reference for hat
  let hatM = new Matrix4(baseHeadM).translate(0, 0.275, 0);
  // Scale and draw hat
  hatM.scale(0.3, 0.20, 0.3);
  let hatC = [1, 0, 0, 1];
  drawCube(hatM, hatC);

  // RIGHT LEG

  // Set reference for upper right leg
  let rightUpperLegM = new Matrix4(baseBodyM).translate(0, -0.2, -0.1);
  // Rotate and translate right leg
  let rightUpperLegC = [0, 1, 1, 1];
  rightUpperLegM.rotate( g_upperRightLegAngle, 0, 0, 1);
  rightUpperLegM.translate(0.0, -0.1, 0.01);

  // Set reference for lower right leg
  let rightLowerLegM = new Matrix4(rightUpperLegM).translate(0.06, -0.25, 0);
  rightUpperLegM.scale(0.12, 0.5, 0.11);

  // Scale and translate left leg
  let rightLowerLegC = [0, 1, 1, 1];
  rightLowerLegM.rotate( g_lowerRightLegAngle, 0, 0, 1);
  rightLowerLegM.translate(-0.06, -0.2, 0);

  drawCube(rightUpperLegM, rightUpperLegC);

  // Set reference for right feet
  let rightFeetM = new Matrix4(rightLowerLegM).translate(-0.06, -0.2, 0);
  rightLowerLegM.scale(0.12, 0.4, 0.10);
  drawCube(rightLowerLegM, rightLowerLegC);

  // Scale and translate left feet
  let rightFeetC = [0, 0, 1, 1];
  rightFeetM.rotate( g_rightFeetAngle, 0, 0, 1);
  rightFeetM.translate(0.1, 0.0, 0);

  rightFeetM.scale(0.25, 0.11, 0.101);
  drawCube(rightFeetM, rightFeetC);

  // LEFT LEG

  let leftUpperLegM = new Matrix4(baseBodyM).translate(0, -0.2, 0.1);
  // Rotate and translate left leg
  let leftUpperLegC = [0, 1*0.9, 1*0.9, 1];
  leftUpperLegM.rotate( g_upperLeftLegAngle, 0, 0, 1);
  leftUpperLegM.translate(0.0, -0.1, -0.01);

  let leftLowerLegM = new Matrix4(leftUpperLegM).translate(0.06, -0.25, 0);
  leftUpperLegM.scale(0.12, 0.5, 0.11);

  // Scale and translate right leg
  let leftLowerLegC = [0, 1, 1, 1];
  leftLowerLegM.rotate( g_lowerLeftLegAngle, 0, 0, 1);
  leftLowerLegM.translate(-0.06, -0.2, 0);

  drawCube(leftUpperLegM, leftUpperLegC);

  let leftFeetM = new Matrix4(leftLowerLegM).translate(-0.06, -0.2, 0);

  leftLowerLegM.scale(0.12, 0.4, 0.10);
  drawCube(leftLowerLegM, leftLowerLegC);

  // Scale and translate right feet
  let leftFeetC = [0, 0, 1, 1];
  leftFeetM.rotate( g_leftFeetAngle, 0, 0, 1);
  leftFeetM.translate(0.1, 0.0, 0);

  leftFeetM.scale(0.25, 0.11, 0.101);
  drawCube(leftFeetM, leftFeetC);

  // ARMS

  // RIGHT ARM

  // Set reference for upper right arm
  let rightUpperArmM = new Matrix4(baseBodyM).translate(0, 0.2, -0.21);
  // Rotate and translate right arm
  let rightUpperArmC = [0, 0, 1, 1];
  rightUpperArmM.rotate( g_upperRightArmAngle, 0, 0, 1);
  rightUpperArmM.translate(0.0, -0.16, 0.01);

  // Set reference for lower right arms
  let rightLowerArmM = new Matrix4(rightUpperArmM).translate(-0.06, -0.16, 0);
  rightUpperArmM.scale(0.12, 0.32, 0.11);

  // Scale and translate left arm
  let rightLowerArmC = [0, 0, 1, 1];
  rightLowerArmM.rotate( g_lowerRightArmAngle, 0, 0, 1);
  rightLowerArmM.translate(0.06, -0.16, 0);

  drawCube(rightUpperArmM, rightUpperArmC);

  let rightHandM = new Matrix4(rightLowerArmM).translate(0, -0.16, 0);

  rightLowerArmM.scale(0.12, 0.32, 0.10);
  drawCube(rightLowerArmM, rightLowerArmC);

  // Scale and translate right hand
  let rightHandC = [1, 1, 1, 1];
  rightHandM.rotate(g_rightHandAngle, 0, 0, 1);
  //rightHandM.translate(0.1, 0.05, 0);

  rightHandM.scale(0.09, 0.09, 0.09);
  drawCube(rightHandM, rightHandC);

  // LEFT ARM

  // Set reference for upper left and left arms
  let leftUpperArmM = new Matrix4(baseBodyM).translate(0, 0.2, 0.21);
  // Rotate and translate left arm
  let leftUpperArmC = [0, 0, 1, 1];
  leftUpperArmM.rotate( g_upperLeftArmAngle, 0, 0, 1);
  leftUpperArmM.translate(0.0, -0.16, -0.01);

  // Set reference for lower left and left arms
  let leftLowerArmM = new Matrix4(leftUpperArmM).translate(-0.06, -0.16, 0);
  leftUpperArmM.scale(0.12, 0.32, 0.11);

  // Scale and translate left arm
  let leftLowerArmC = [0, 0, 1, 1];
  leftLowerArmM.rotate( g_lowerLeftArmAngle, 0, 0, 1);
  leftLowerArmM.translate(0.06, -0.16, 0);

  drawCube(leftUpperArmM, leftUpperArmC);

  let leftHandM = new Matrix4(leftLowerArmM).translate(0, -0.16, 0);

  leftLowerArmM.scale(0.12, 0.32, 0.10);
  drawCube(leftLowerArmM, leftLowerArmC);

  // Scale and translate left hand
  let leftHandC = [1, 1, 1, 1];
  leftHandM.rotate(g_leftHandAngle, 0, 0, 1);
  //leftHandM.translate(0.1, 0.05, 0);
  leftHandM.scale(0.09, 0.09, 0.09);
  drawCube(leftHandM, leftHandC);

  // Use the start and current time to record duration (in ms)
  var duration = performance.now() - startTime;
  sendTextToUI("ms: " + Math.floor(duration) + ", fps: " + Math.floor(10000/duration)/10, "performance");


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
