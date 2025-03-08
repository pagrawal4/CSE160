import * as THREE from 'three';
import { makeCube, makeTexturedCube, makeShinyCube } from "./cube.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
//import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

class Globals {
  constructor() {
      this.canvas = document.querySelector('#canvas');
      this.renderer = new THREE.WebGLRenderer({antialias: true, canvas});
      this.gui = new GUI();

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

      this.gui.add( this.camera, 'fov', 1, 180 ).onChange( updateCamera );
      const minMaxGUIHelper = new MinMaxGUIHelper( this.camera, 'near', 'far', 0.1 );
      this.gui.add( minMaxGUIHelper, 'min', 0.1, 50, 0.1 ).name( 'near' ).onChange( updateCamera );
      this.gui.add( minMaxGUIHelper, 'max', 0.1, 50, 0.1 ).name( 'far' ).onChange( updateCamera );

      this.orbitControls = new OrbitControls(this.camera, this.canvas);

      ///// End Camera

      this.scene = new THREE.Scene();

      this.cubes = [
        makeCube([-2, 0, 0], 0x8844aa),
        makeTexturedCube(),
        makeShinyCube([2, 0, 0]),
      ];

      this.cubes.forEach((cube) => {
        this.scene.add(cube);
      });

      // Ambient light
      const light1 = new THREE.AmbientLight({color: 0xFFFFFF, intensity: 1});
      this.scene.add(light1);

      class ColorGUIHelper {
        constructor(object, prop) {
          this.object = object;
          this.prop = prop;
        }
        get value() {
          return `#${this.object[this.prop].getHexString()}`;
        }
        set value(hexString) {
          this.object[this.prop].set(hexString);
        }
      }

      this.gui.addColor(new ColorGUIHelper(light1, 'color'), 'value').name('ambient color');
      this.gui.add(light1, 'intensity', 0, 5, 0.01).name('ambient intensity');

      // Directional Light - like parallel rays of sun
      const light2 = new THREE.DirectionalLight({color: 0xFFFFFF, intensity: 3});
      light2.position.set(0, 0, 5);
      // light2.target.position.set(0, 0, 0); // This is default target position
      this.scene.add(light2);
      this.gui.addColor(new ColorGUIHelper(light2, 'color'), 'value').name('directional color');
      this.gui.add(light2, 'intensity', 0, 5, 0.01).name('directional intensity');
      this.gui.add(light2.position, 'x', -10, 10);
      this.gui.add(light2.position, 'y', -10, 10);
      this.gui.add(light2.position, 'z', -10, 10);

      // Point Light - like light bulb
      const light3 = new THREE.PointLight({color: 0xFFFFFF, intensity: 4});
      light3.position.set(0, 5, 0);
      this.scene.add(light3);
      this.gui.addColor(new ColorGUIHelper(light3, 'color'), 'value').name('point color');
      this.gui.add(light3, 'intensity', 0, 5, 0.01).name('point intensity');
      this.gui.add(light3.position, 'x', -10, 10);
      this.gui.add(light3.position, 'y', -10, 10);
      this.gui.add(light3.position, 'z', -10, 10);

      /*
      // Spot Light - like light bulb
      const light4 = new THREE.SpotLight({color: 0x2222ff, intensity: 5});
      light4.position.set(0, 5, 0);
      this.scene.add(light4);
      this.gui.addColor(new ColorGUIHelper(light4, 'color'), 'value').name('spot color');
      this.gui.add(light4, 'intensity', 0, 5, 0.01).name('spot intensity');
      this.gui.add(light4.position, 'x', -10, 10);
      this.gui.add(light4.position, 'y', -10, 10);
      this.gui.add(light4.position, 'z', -10, 10);
      */

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

