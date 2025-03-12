import * as THREE from 'three';
import { createFort } from "./fort.js";
import { createGem } from "./gem.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ShadowMesh } from 'three/addons/objects/ShadowMesh.js';

class Globals {
  constructor() {
      this.canvas = document.querySelector('#canvas');
      this.renderer = new THREE.WebGLRenderer({antialias: true, canvas});
      this.gui = new GUI();

      // Used for picking objects in scene
      this.raycaster = new THREE.Raycaster();

      ///// Camera
      let fov = 75;
      let aspect = 2;  // the canvas default
      let near = 0.1;
      let far = 1000;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.set(0, 5, 50);
      this.camera.lookAt(0, 0, 0);

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

      const loader = new THREE.CubeTextureLoader();
      const texture = loader.load([
        '../textures/px.png',
        '../textures/nx.png',
        '../textures/py.png',
        '../textures/ny.png',
        '../textures/pz.png',
        '../textures/nz.png',
      ]);
      this.scene.background = texture;

     /*
      // Use HDRI
      new RGBELoader()
      .load('../textures/birchwood_1k.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        gs.scene.background = texture;
        gs.scene.environment = texture; // important to also set environment.
      });
    */

      this.gems = [
        createGem([0,-15,2]),
        createGem([-20,-15,2]),
        createGem([0,-15,-15]),
        createGem([0,-15,-40]),
        createGem([-40,-15,2]),
        createGem([-40,-15,-15]),
        createGem([-40,-15,-40]),
      ];

      this.gemShadows = [];
      this.gems.forEach((gem) => {
        this.scene.add(gem);
        let gemShadow = new ShadowMesh(gem);
        this.gemShadows.push(gemShadow);
        this.scene.add(gemShadow);
      });

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

      // Ambient light
      let color = 0xFFFFFF;
      let intensity = 0.5;
      const light1 = new THREE.AmbientLight(color, intensity);
      this.scene.add(light1);
      this.gui.addColor(new ColorGUIHelper(light1, 'color'), 'value').name('ambient color');
      this.gui.add(light1, 'intensity', 0, 5, 0.01).name('ambient intensity');

      // Directional Light - like parallel rays of sun
      color = 0xFFFFFF;
      intensity = 1.5;
      const light2 = new THREE.DirectionalLight(color, intensity);
      light2.position.set(0, 0, 5);
      // light2.target.position.set(0, 0, 0); // This is default target position
      this.scene.add(light2);
      this.gui.addColor(new ColorGUIHelper(light2, 'color'), 'value').name('directional color');
      this.gui.add(light2, 'intensity', 0, 5, 0.01).name('directional intensity');
      this.gui.add(light2.position, 'x', -10, 10);
      this.gui.add(light2.position, 'y', -10, 10);
      this.gui.add(light2.position, 'z', -10, 10);

      // Point Light - like light bulb
      color = 0xFFFFFF;
      intensity = 0.5;
      this.light3 = new THREE.PointLight(color, intensity);
      this.light3.position.set(0, 10, 0);
      //this.light3.lookAt(this.scene.position);
      this.scene.add(this.light3);
      this.gui.addColor(new ColorGUIHelper(this.light3, 'color'), 'value').name('point color');
      this.gui.add(this.light3, 'intensity', 0, 5, 0.01).name('point intensity');
      this.gui.add(this.light3.position, 'x', -20, 20);
      this.gui.add(this.light3.position, 'y', 5, 20);
      this.gui.add(this.light3.position, 'z', -20, 20);

      lightPosition4D.x = this.light3.position.x;
      lightPosition4D.y = this.light3.position.y;
      lightPosition4D.z = this.light3.position.z;
      // amount of light-ray divergence. Ranging from:
      // 0.001 = this.light3(min divergence) to 1.0 = pointlight(max divergence)
      lightPosition4D.w = 0.9; // must be slightly greater than 0, due to 0 causing matrixInverse errors

      // Spot Light - like light bulb
      class DegRadHelper {
        constructor(obj, prop) {
          this.obj = obj;
          this.prop = prop;
        }
        get value() {
          return THREE.MathUtils.radToDeg(this.obj[this.prop]);
        }
        set value(v) {
          this.obj[this.prop] = THREE.MathUtils.degToRad(v);
        }
      }
      color = 0x18dc1c;
      intensity = 100;
      const light4 = new THREE.SpotLight(color, intensity);
      light4.position.set(-7, -10, 0);
      light4.target.position.set(0,-15,0);
      light4.angle = THREE.MathUtils.degToRad(70.0);
      this.scene.add(light4);
      this.scene.add(light4.target);
      this.gui.addColor(new ColorGUIHelper(light4, 'color'), 'value').name('spotlight color');
      this.gui.add(light4, 'intensity', 0, 100, 5.0).name('spolightt intensity');
      this.gui.add(light4.position, 'x', -10, 10);
      this.gui.add(light4.position, 'y', -10, 10);
      this.gui.add(light4.position, 'z', -10, 10);
      this.gui.add(new DegRadHelper(light4, 'angle'), 'value', 0, 90).name('spotlight angle').onChange(() => {light4.target.updateMatrixWorld();});

      const fort = createFort();
      fort.position.set(-20, -20, -20);
      fort.scale.set(0.8,0.8,0.8);
      //fort.rotation.y = Math.PI/4;
      this.scene.add(fort);

      const fogcolor = 0xD8E3E9;
      const fognear = 80;
      const fogfar = 130;
      this.scene.fog = new THREE.Fog(fogcolor, fognear, fogfar);

      //const objLoader = new OBJLoader();
      /*
      objLoader.load('../models/lion_head_4k.obj', function(obj) {
        gs.scene.add(obj);
        obj.scale.set(50, 50, 50);
      });
      */

  }
}

function getCanvasRelativePosition(event) {
  const rect = gs.canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * gs.canvas.width / rect.width;
  const y = (event.clientY - rect.top) * gs.canvas.height / rect.height;
  return {x, y};
}

function pickGem(event) {
  const pos = getCanvasRelativePosition(event);
  pickPosition.x = ( pos.x / canvas.width ) * 2 - 1;
  pickPosition.y = ( pos.y / canvas.height ) * (- 2) + 1;

  gs.raycaster.setFromCamera(pickPosition, gs.camera);
  const intersectedObjs = gs.raycaster.intersectObjects(gs.gems);
  if (intersectedObjs.length) {
    let pickedGem = intersectedObjs[0].object;
    if (pickedGem.material.emissive.getHex() == 0xff0000) {
      pickedGem.material.emissive.setHex(0x000000);
    } else {
      pickedGem.material.emissive.setHex(0xff0000);
    }
  }
}

// Global variables
const normalVector = new THREE.Vector3( 0, 1, 0 );
const planeConstant = -19.0; // this value must be slightly higher than the groundMesh's y position of 0.0
const groundPlane = new THREE.Plane( normalVector, planeConstant );
const lightPosition4D = new THREE.Vector4();
const pickPosition = { x: 0, y: 0 };
let gs = new Globals();

function renderCallback(time) {
  time *= 0.001;  // convert time to seconds
 
  gs.gems.forEach((gem, index) => {
    const speed = 1 + index * 0.1;
    const rot = time * speed;
    gem.rotation.x = rot/4;
    gem.rotation.y = rot/4;
  });
 
  gs.orbitControls.update();

  gs.gemShadows.forEach((gemShadow) => {
    gemShadow.update(groundPlane, lightPosition4D);
  });
  lightPosition4D.x = gs.light3.position.x;
  lightPosition4D.y = gs.light3.position.y;
  lightPosition4D.z = gs.light3.position.z;

  gs.renderer.render(gs.scene, gs.camera);
 
  requestAnimationFrame(renderCallback);
}

function main() {
  window.addEventListener( 'mousedown', pickGem );
  requestAnimationFrame(renderCallback);
}

main();

