import * as THREE from 'three';
import { makeCube, makeTexturedCube } from "./cube.js";
//import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
//import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

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

      this.cubes = [
        makeCube([-2, 0, 0], 0x8844aa),
        makeCube([2, 0, 0], 0xaa8844),
        makeTexturedCube(),
      ];

      this.cubes.forEach((cube) => {
        this.scene.add(cube);
      });

      let lightColor = 0xFFFFFF;
      let lightIntensity = 3;
      this.light = new THREE.DirectionalLight(lightColor, lightIntensity);
      this.light.position.set(-1, 2, 4);
      this.scene.add(this.light);

      /*
      const objLoader = new OBJLoader();
      const mtlLoader = new MTLLoader();
      mtlLoader.load('../models/wooden_bowl_02_4k.mtl', (mtl) => {
        mtl.preload();
        objLoader.setMaterials(mtl);
        objLoader.load('../models/wooden_bowl_02_4k.obj', (root) => {
          this.scene.add(root);
        });
      });
      */
  }
}

// Global variables
let gs = new Globals();

function renderCallback(time) {
  time *= 0.001;  // convert time to seconds
 
  gs.cubes.forEach((cube, index) => {
    const speed = 1 + index * 0.1;
    const rot = time * speed;
    cube.rotation.x = rot/4;
    cube.rotation.y = rot/4;
  });
 
  gs.renderer.render(gs.scene, gs.camera);
 
  requestAnimationFrame(renderCallback);
}

function main() {
  requestAnimationFrame(renderCallback);
}

main();

