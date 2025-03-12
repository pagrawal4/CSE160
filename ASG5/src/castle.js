import * as THREE from 'three';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';

const x = 10
let wallMaterial = null;

function createGround() {
  let gndsize = 200*x;
  const textureLoader = new THREE.TextureLoader();
  const baseColor = textureLoader.load('../textures/1K-snow_4_Base_Color.jpg');
  const height = textureLoader.load('../textures/1K-snow_4_Height.jpg');
  const metalness = textureLoader.load('../textures/1K-snow_4_Metallic.jpg');
  const normal = textureLoader.load('../textures/1K-snow_4_Normal.jpg');
  const roughness = textureLoader.load('../textures/1K-snow_4_Roughness.jpg');

  //const geometry = new THREE.PlaneGeometry(500, 500, 256, 256);
  // const geometry = new THREE.CylinderGeometry(250, 250, 1, 64)
  const geometry = new THREE.BoxGeometry(gndsize, x/10, gndsize);
  //geometry.rotateX(-Math.PI/2);

  const texture = new THREE.MeshPhysicalMaterial({
    map: baseColor,
    displacementMap: height,
    metalnessMap: metalness,
    metalness: 0.0,
    normalMap: normal,
    roughnessMap: roughness,
    roughness: 1.0,
  })

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(100, 100);
  const gnd = new THREE.Mesh(geometry, texture);
  return gnd;
}



function createFlag() {
  const flag = new THREE.Group();

  const poleGeometry = new THREE.CylinderGeometry(x/10, x/10, x, 16);
  const pole = new THREE.Mesh(poleGeometry, wallMaterial);
  flag.add(pole);

  const flagTopGeometry = new THREE.ConeGeometry(x/8, x, 4);
  const flagTopMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
  const flagTop = new THREE.Mesh(flagTopGeometry, flagTopMaterial);
  flagTop.position.set(x/2, x/2.5, 0);
  flagTop.rotation.set(0,0,-Math.PI/2);
  flag.add(flagTop);

  return flag;
}

function createCornerTower() {

  const tower = new THREE.Group();

  const roomGeometry = new THREE.BoxGeometry(2*x, 4*x, 2*x);
  const roomMaterial = new THREE.MeshStandardMaterial({color: 0x8280f5});
  const room = new THREE.Mesh(roomGeometry, roomMaterial);
  tower.add(room);

  const roofGeometry = new THREE.ConeGeometry(1.5*x, 2*x, 32);
  const roofMaterial = new THREE.MeshStandardMaterial({color: 0xFF13F0});
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.y = 3*x;
  tower.add(roof);

  const flag = createFlag();
  flag.position.y = 4*x;
  tower.add(flag)
  /*
  const windowGeometry = new THREE.BoxGeometry(x+10, x+10, 2*x);
  const loader = new THREE.TextureLoader();
  const texture = loader.load( '../textures/wood.jpg' );
  texture.colorSpace = THREE.SRGBColorSpace;
  const windowMaterial = new THREE.MeshPhongMaterial({map: texture});
  const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
  const window2 = window1.clone();
  window2.rotation.set(0, 0, Math.PI/2);
  tower.add(window1);
  tower.add(window2);
  */

  return tower;
}

function createHideout(){
  const geometry = new THREE.BoxGeometry(0.5*x, 0.5*x, 0.5*x);
  //const material = new THREE.MeshStandardMaterial({color: 0xff00ff});
  const hideout = new THREE.Mesh(geometry, wallMaterial);
  return hideout;
}

function createInsideWall() {
  const wall = new THREE.Group();

  const baseGeometry = new THREE.BoxGeometry(8*x, 3*x, 0.5*x);
  //const baseMaterial = new THREE.MeshStandardMaterial({color: 0xff00ff});
  const base = new THREE.Mesh(baseGeometry, wallMaterial);
  wall.add(base);

  for (let i =-3; i <= 3; i++) {
    const hideout = createHideout();
    hideout.position.x = i*x;
    hideout.position.y = 1.75*x;
    wall.add(hideout);
  }

  return wall;
}

function createOutsideWall() {
  const wall = new THREE.Group();

  const baseGeometry = new THREE.BoxGeometry(19.5*x, 2.5*x, 0.5*x);
  const baseMaterial = new THREE.MeshStandardMaterial({color: 0xf4b8b8});
  const base = new THREE.Mesh(baseGeometry, wallMaterial);
  wall.add(base);

  for (let i =-9; i <= 9; i++) {
    const hideout = createHideout();
    hideout.position.x = 0.9*i*x + 0.2*x; // Fix the positioning for lion space
    hideout.position.y = 1.5*x;
    wall.add(hideout);
  }

  return wall;
}

function createCenterTower() {
  const tower = new THREE.Group();

  const roomGeometry = new THREE.CylinderGeometry(1.5*x, 1.5*x, 7*x, 32);
  const roomMaterial = new THREE.MeshStandardMaterial({color: 0x8280f5});
  const room = new THREE.Mesh(roomGeometry, roomMaterial);
  tower.add(room);

  const roofGeometry = new THREE.ConeGeometry(1.5*x, 2*x, 32);
  const roofMaterial = new THREE.MeshStandardMaterial({color: 0xFF13F0});
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.y = 4.5*x;
  tower.add(roof);

  const flag = createFlag();
  flag.position.y = 5.5*x;
  tower.add(flag)

  return tower;
}

function createCastle() {
  const castle = new THREE.Group();

  const loader = new THREE.TextureLoader();
  const texture = loader.load( '../textures/stonewall.jpg' );
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  //texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 1);
  wallMaterial = new THREE.MeshPhongMaterial({color: 0xfdeded, map: texture});

  const gndsize = 200*x;
  const gndGeometry = new THREE.BoxGeometry(gndsize, x/10, gndsize);
  const gndMaterial = new THREE.MeshStandardMaterial({color: 0x555555});
  const gnd = new THREE.Mesh(gndGeometry, gndMaterial);
  //const gnd = createGround();
  castle.add(gnd);

  const tower1 = createCornerTower();
  tower1.position.set(-(5*x), 2.05*x, -(5*x));
  castle.add(tower1);

  const insideWall1 = createInsideWall();
  insideWall1.position.set(0, 1.55*x, 5*x);
  castle.add(insideWall1);

  const tower2 = createCornerTower();
  tower2.position.set(-(5*x), 2.05*x, (5*x));
  castle.add(tower2);

  const insideWall2 = createInsideWall();
  insideWall2.rotation.y = Math.PI/2;
  insideWall2.position.set(5*x, 1.55*x, 0);
  castle.add(insideWall2);

  const tower3 = createCornerTower();
  tower3.position.set(5*x, 2.05*x, -(5*x));
  castle.add(tower3);

  const insideWall3 = createInsideWall();
  insideWall3.position.set(0, 1.55*x, -(5*x));
  castle.add(insideWall3);

  const tower4 = createCornerTower();
  tower4.position.set(5*x, 2.05*x, 5*x);
  castle.add(tower4);

  const insideWall4 = createInsideWall();
  insideWall4.rotation.y = Math.PI/2;
  insideWall4.position.set(-(5*x), 1.55*x, 0);
  castle.add(insideWall4);

  const centerTower = createCenterTower();
  centerTower.position.set(0, 3.55*x, 0);
  castle.add( centerTower);
  
  const outsideWall1 = createOutsideWall();
  outsideWall1.position.set(-0.25*x, 1.3*x, 9.75*x);
  castle.add(outsideWall1);

  const outsideWall2 = createOutsideWall();
  outsideWall2.rotation.y = Math.PI/2;
  outsideWall2.position.set(9.75*x, 1.3*x, 0.25*x);
  castle.add(outsideWall2);

  const outsideWall3 = createOutsideWall();
  outsideWall3.position.set(0.25*x, 1.3*x, -9.75*x);
  castle.add(outsideWall3);

  const outsideWall4 = createOutsideWall();
  outsideWall4.rotation.y = Math.PI/2;
  outsideWall4.position.set(-9.75*x, 1.3*x, -0.25*x);
  castle.add(outsideWall4);

  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();
  mtlLoader.load('../models/lion_head_1k.mtl', (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
    objLoader.load('../models/lion_head_1k.obj', (obj) => {
      obj.scale.set(40, 40, 40);
      const obj2 = obj.clone();
      const obj3 = obj.clone();
      const obj4 = obj.clone();
      castle.add(obj);
      castle.add(obj2);
      castle.add(obj3);
      castle.add(obj4);
      obj.position.set(95, 25, 95);
      obj2.position.set(-95, 25, 95);
      obj3.position.set(95, 25, -95);
      obj4.position.set(-95, 25, -95);
      obj3.rotation.set(0,Math.PI,0);
      obj4.rotation.set(0,Math.PI,0);
    });
  });

  return castle;

}

export { createCastle };


