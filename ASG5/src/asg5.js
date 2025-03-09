import * as THREE from 'three';
import { makeCube, makeTexturedCube } from "./cube.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
//import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

class Globals {
  constructor() {
      this.canvas = document.querySelector('#canvas');
      this.renderer = new THREE.WebGLRenderer({antialias: true, canvas});

      ///// Camera
      let fov = 75;
      let aspect = 2;  // the canvas default
      let near = 0.1;
      let far = 5;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.z = 2;

      class MinMaxGUIHelper {
        constructor( obj, minProp, maxProp, minDif ) {
          this.obj = obj;
          this.minProp = minProp;
          this.maxProp = maxProp;
          this.minDif = minDif;
        }
        get min() {
          return this.obj[ this.minProp ];
        }
        set min( v ) {
          this.obj[ this.minProp ] = v;
          this.obj[ this.maxProp ] = Math.max( this.obj[ this.maxProp ], v + this.minDif );
        }
        get max() {
          return this.obj[ this.maxProp ];
        }
        set max( v ) {
          this.obj[ this.maxProp ] = v;
          this.min = this.min; // this will call the min setter
        }
      }

      function updateCamera() {
        gs.camera.updateProjectionMatrix();
      }

      const gui = new GUI();
      gui.add( this.camera, 'fov', 1, 180 ).onChange( updateCamera );
      const minMaxGUIHelper = new MinMaxGUIHelper( this.camera, 'near', 'far', 0.1 );
      gui.add( minMaxGUIHelper, 'min', 0.1, 50, 0.1 ).name( 'near' ).onChange( updateCamera );
      gui.add( minMaxGUIHelper, 'max', 0.1, 50, 0.1 ).name( 'far' ).onChange( updateCamera );

      this.orbitControls = new OrbitControls(this.camera, this.canvas);

      ///// End Camera

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
 
  gs.orbitControls.update();
  gs.renderer.render(gs.scene, gs.camera);
 
  requestAnimationFrame(renderCallback);
}

function main() {
  requestAnimationFrame(renderCallback);
}

main();

