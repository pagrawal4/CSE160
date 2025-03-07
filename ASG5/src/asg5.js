import * as THREE from 'three';

class Globals {
  constructor() {
      this.canvas = document.querySelector('#canvas');
      this.renderer = new THREE.WebGLRenderer({antialias: true, canvas});

      let fov = 75;
      let aspect = 2;  // the canvas default
      let near = 0.1;
      let far = 5;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.z = 2;

      this.scene = new THREE.Scene();
      this.cube = null;
  }
}

// Global variables
let gs = new Globals();

function renderCallback(time) {
  time *= 0.001;  // convert time to seconds
 
  gs.cube.rotation.x = time;
  gs.cube.rotation.y = time;
 
  gs.renderer.render(gs.scene, gs.camera);
 
  requestAnimationFrame(renderCallback);
}

function main() {
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  const material = new THREE.MeshBasicMaterial({color: 0xccaa88});
  gs.cube = new THREE.Mesh(geometry, material);
  gs.scene.add(gs.cube);

  requestAnimationFrame(renderCallback);
}

main();

