import * as THREE from 'three';

const x = 10

function createCornerTower() {

  const tower = new THREE.Group();

  const roomGeometry = new THREE.BoxGeometry(2*x, 4*x, 2*x);
  const roomMaterial = new THREE.MeshStandardMaterial({color: 0xff00ff});
  const room = new THREE.Mesh(roomGeometry, roomMaterial);
  tower.add(room);

  const roofGeometry = new THREE.ConeGeometry(1.5*x, 2*x, 32);
  const roofMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.y = 3*x;
  tower.add(roof);

  return tower;
}

function createHideout(){
  const geometry = new THREE.BoxGeometry(0.5*x, 0.5*x, 0.5*x);
  const material = new THREE.MeshStandardMaterial({color: 0xff00ff});
  const hideout = new THREE.Mesh(geometry, material);
  return hideout;
}

function createWall() {
  const wall = new THREE.Group();

  const baseGeometry = new THREE.BoxGeometry(4*x, 3*x, 0.5*x);
  const baseMaterial = new THREE.MeshStandardMaterial({color: 0xff00ff});
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  wall.add(base);

  for (let i =-1; i <= 2; i++) {
    const hideout = createHideout();
    hideout.position.x = i*x;
    hideout.position.y = 1.75*x;
    wall.add(hideout);
  }

  return wall;
}

function createCenterTower() {
  const tower = new THREE.Group();

  const roomGeometry = new THREE.CylinderGeometry(1.5*x, 1.5*x, 7*x, 32);
  const roomMaterial = new THREE.MeshStandardMaterial({color: 0xff00ff});
  const room = new THREE.Mesh(roomGeometry, roomMaterial);
  tower.add(room);

  const roofGeometry = new THREE.ConeGeometry(1.5*x, 2*x, 32);
  const roofMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
  const roof = new THREE.Mesh(roofGeometry, roofMaterial);
  roof.position.y = 4.5*x;
  tower.add(roof);

  return tower;
}

function createFort() {
  const fort = new THREE.Group();

  const gndsize = 8*x;
  const gndGeometry = new THREE.BoxGeometry(gndsize, x/10, gndsize);
  const gndMaterial = new THREE.MeshStandardMaterial({color: 0x555555});
  const gnd = new THREE.Mesh(gndGeometry, gndMaterial);
  fort.add(gnd);

  const tower1 = createCornerTower();
  tower1.position.set(-(3*x), 2.05*x, -(3*x));
  fort.add(tower1);

  const wall1 = createWall();
  wall1.position.set(0, 1.55*x, 3*x);
  fort.add(wall1);

  const tower2 = createCornerTower();
  tower2.position.set(-(3*x), 2.05*x, (3*x));
  fort.add(tower2);

  const wall2 = createWall();
  wall2.rotation.y = Math.PI/2;
  wall2.position.set(3*x, 1.55*x, 0);
  fort.add(wall2);

  const tower3 = createCornerTower();
  tower3.position.set(3*x, 2.05*x, -(3*x));
  fort.add(tower3);

  const wall3 = createWall();
  wall3.position.set(0, 1.55*x, -(3*x));
  fort.add(wall3);

  const tower4 = createCornerTower();
  tower4.position.set(3*x, 2.05*x, 3*x);
  fort.add(tower4);

  const wall4 = createWall();
  wall4.rotation.y = Math.PI/2;
  wall4.position.set(-(3*x), 1.55*x, 0);
  fort.add(wall4);

  const centerTower = createCenterTower();
  centerTower.position.set(0, 3.55*x, 0);
  fort.add( centerTower);
  
  return fort;

}

export { createFort };


