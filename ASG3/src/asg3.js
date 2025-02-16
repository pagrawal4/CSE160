// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
// Need v_UV else the compiler will remove a_UV as it is not used
// and nothing will show up. @6.32 min Prof. Davis Video 3.1
// v_UV is used to pass information from the vertex to the fragment shader
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  varying vec2 v_UV;

  uniform mat4 u_ModelMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_UV;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler0;
  uniform int u_TextureSelect;
  uniform float u_texColorWeight;
  void main() {
    if (u_TextureSelect == -2) {
      gl_FragColor = u_FragColor;
    }
    else if (u_TextureSelect == -1) {
      // Passing R and G values through v_UV and B and alpha set to 1
      gl_FragColor = vec4(v_UV,1.0,1.0);
    }
    else if (u_TextureSelect == 0) {
      // look up color from the sample
      gl_FragColor = texture2D(u_Sampler0, v_UV);
    }
    else {
      //gl_FragColor = vec4(1,0.2,0.2,1);
      gl_FragColor = (1.0 - u_texColorWeight) * u_FragColor + u_texColorWeight * texture2D(u_Sampler0, v_UV);
    }
  }`

// Global Variables
let g_camera;
let map;

// Canvas items
let canvas;
let gl;
let a_Position;
let a_UV;
let u_FragColor;
let u_Sampler0;
let u_TextureSelect;
let u_texColorWeight;
let u_ModelMatrix;
let u_ViewMatrix;
let u_ProjectionMatrix;

// Constants
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

// HTML Controls
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

  // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of a_UV
  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if (a_UV < 0) {
    console.log('Failed to get the storage location of a_UV');
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

  // Get the storage location of u_Sampler0
  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if (!u_Sampler0) {
    console.log('Failed to get the storage location of u_Sampler0');
    return false;
  }

  // Get the storage location of u_TextureSelect
  u_TextureSelect = gl.getUniformLocation(gl.program, 'u_TextureSelect');
  if (!u_TextureSelect) {
    console.log('Failed to get the storage location of u_TextureSelect');
    return false;
  }

  // Get the storage location of u_texColorWeight
  u_texColorWeight = gl.getUniformLocation(gl.program, 'u_texColorWeight');
  if (!u_texColorWeight) {
    console.log('Failed to get the storage location of u_texColorWeight');
    return false;
  }

  // Get the storage location of u_ViewMatrix
  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if (!u_ViewMatrix) {
    console.log('Failed to get the storage location of u_ViewMatrix');
    return;
  }

  // Get the storage location of u_ProjectionMatrix
  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if (!u_ProjectionMatrix) {
    console.log('Failed to get the storage location of u_ProjectionMatrix');
    return;
  }

  // Pass the Identity matrix to u_ModelMatrix attribute
  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
  
}

function addActionsForHtmlUI() {

  // Field of view element
  document.getElementById("fov").addEventListener("mousemove", function() { g_camera.fov = this.value; renderScene();});
  document.getElementById("animationOnOff").onclick = function() {g_animationOn = !g_animationOn; if (g_animationOn) {g_altAnimationOn = false}};
  document.getElementById("altAnimationOnOff").onclick = function() {g_altAnimationOn = !g_altAnimationOn; if (g_altAnimationOn) {g_animationOn = false;}};

  // Handle moving camera mouse event
  var lastX = 0;
  var lastY = 0;
  canvas.onmousemove = function(ev) {
    let [x, y] = convertEventCoordinatesToGL(ev);

    if(ev.buttons == 1) {
      // Moving parallel to x-axis should rotate along y-aix
      // and vice versa to look natural
      g_camera.rotate((y - lastY) * 135, (x - lastX) * 135, 0);
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

// Following 2 functions for texture are from TexturedQuad.js
function initTextures(n) {
  var image = new Image();  // Create the image object
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }
  // Register the event handler to be called on loading an image
  image.onload = function(){ sendImageToTexture0(image); };
  // Tell the browser to load an image
  image.src = '../textures/block.jpg';

  // Add more texture loading here if needed
  return true;
}

function sendImageToTexture0(image) {
  var texture = gl.createTexture();   // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit0. Can have 8 texture units
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler0, 0);
  
  //gl.clear(gl.COLOR_BUFFER_BIT);   // Clear <canvas>

  //gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
  console.log("Finished loadTexture");
}

function addActionsForCameraMoveKeys() {
  // Move the camera based on the key pressed
  document.onkeydown = moveCamera;
}

function moveCamera(ev) {
  if (ev.code === "KeyW") {
    g_camera.moveForward();
  } else if (ev.code === "KeyS") {
    g_camera.moveBackwards();
  } else if (ev.code === "KeyA") {
    g_camera.moveLeft();
  } else if (ev.code === "KeyD") {
    g_camera.moveRight();
  } else if (ev.code == "KeyQ") {
    g_camera.panLeft();
  } else if (ev.code == "KeyE") {
    g_camera.panRight();
  } else if (ev.code == "KeyR") {
    g_camera.reset();
  } else if (ev.code == "Equal") {
    map.addObject(3, 0, 0);
  } else if (ev.code == "Minus") {
    map.removeObject(3, 0);
  }

  renderScene();
}

function main() {
  // Set up canvas and gl variables
  setupWebGL();

  // Create the camera
  g_camera = new Camera();

  // Create the map
  map = new Map();

  // Set up GLSL shader programs and connect
  connectVariablesToGLSL();

  // Register the actions for the controls in HTML
  addActionsForHtmlUI();
  addActionsForCameraMoveKeys();

  // Register function (event handler) to be called on a mouse press
  //canvas.onmousedown = tick;
  // canvas.onmousemove = click;
  //canvas.onmousemove = function(ev) { if(ev.buttons == 1) {}

  initTextures(gl, 0);

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
    g_moveYPosition += 2; // *Math.sin(g_time);
  }
  g_upperRightLegAngle = 20*Math.sin(g_time)-5;
  g_upperLeftLegAngle = -20*Math.sin(g_time)-5;
  g_lowerRightLegAngle = -Math.abs((20*Math.sin(g_time)));
  g_lowerLeftLegAngle = -Math.abs((20*Math.sin(g_time)));

  g_upperRightArmAngle=-45;
  g_lowerRightArmAngle=90;
  g_upperLeftArmAngle = 90;
  g_lowerLeftArmAngle=90;

  g_rightFeetAngle = (g_upperRightLegAngle + g_lowerRightLegAngle);
  g_leftFeetAngle = (g_upperLeftLegAngle + g_lowerLeftLegAngle);

  g_moveXPosition -= 0.5;
  if (g_moveXPosition < -85) g_moveXPosition = 60;
  g_tickNum++;
}

function renderScene() {
  // Record the start time
  var startTime = performance.now()

  g_camera.updateMatrices();

  gl.uniformMatrix4fv(u_ProjectionMatrix, false, g_camera.projectionMatrix.elements);
  gl.uniformMatrix4fv(u_ViewMatrix, false, g_camera.viewMatrix.elements);

  // Clear canvas
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // V IMP: The transformation that is specified first is the last transformation 
  // on the points!!!


  // SKY
  let sky = new Cube();
  sky.color = [0.5,0.85,1,1];
  sky.texColorWeight = 0.0;
  sky.textureNum = 1;
  sky.matrix.scale(100,100,100);
  sky.render();

  // FLOOR
  let floor = new Cube();
  floor.color = [1,0,0,1];
  floor.textureNum = -2;
  floor.matrix.scale(32,0,32);
  floor.render();

  // Draw the floor
  //  let floorM = new Matrix4().scale(0.5,0.5,0.5);
  // drawCube(floorM, [1, 0, 1, 1]);

  map.render();
/*
  let cube1 = new Cube();
  cube1.color = [1.0,0.0,0.0,1.0];
  cube1.matrix.scale(0.5,0.5,0.5).translate(0,1.5,0);
  cube1.textureNum = -1;
  cube1.render();

  let cube2 = new Cube();
  cube2.color = [1.0,0.0,0.0,1.0];
  cube2.matrix.scale(0.5,0.5,0.5).translate(0,0.5,0);
  cube2.textureNum = 1;
  cube2.render();
*/

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
