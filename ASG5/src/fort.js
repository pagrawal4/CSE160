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

function createInsideWall() {
  const wall = new THREE.Group();

  const baseGeometry = new THREE.BoxGeometry(8*x, 3*x, 0.5*x);
  const baseMaterial = new THREE.MeshStandardMaterial({color: 0xff00ff});
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
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
  const baseMaterial = new THREE.MeshStandardMaterial({color: 0xff00ff});
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  wall.add(base);

  for (let i =-9; i <= 9; i++) {
    const hideout = createHideout();
    hideout.position.x = i*x;
    hideout.position.y = 1.3*x;
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

  const gndsize = 20*x;
  const gndGeometry = new THREE.BoxGeometry(gndsize, x/10, gndsize);
  const gndMaterial = new THREE.MeshStandardMaterial({color: 0x555555});
  const gnd = new THREE.Mesh(gndGeometry, gndMaterial);
  fort.add(gnd);

  const tower1 = createCornerTower();
  tower1.position.set(-(5*x), 2.05*x, -(5*x));
  fort.add(tower1);

  const insideWall1 = createInsideWall();
  insideWall1.position.set(0, 1.55*x, 5*x);
  fort.add(insideWall1);

  const tower2 = createCornerTower();
  tower2.position.set(-(5*x), 2.05*x, (5*x));
  fort.add(tower2);

  const insideWall2 = createInsideWall();
  insideWall2.rotation.y = Math.PI/2;
  insideWall2.position.set(5*x, 1.55*x, 0);
  fort.add(insideWall2);

  const tower3 = createCornerTower();
  tower3.position.set(5*x, 2.05*x, -(5*x));
  fort.add(tower3);

  const insideWall3 = createInsideWall();
  insideWall3.position.set(0, 1.55*x, -(5*x));
  fort.add(insideWall3);

  const tower4 = createCornerTower();
  tower4.position.set(5*x, 2.05*x, 5*x);
  fort.add(tower4);

  const insideWall4 = createInsideWall();
  insideWall4.rotation.y = Math.PI/2;
  insideWall4.position.set(-(5*x), 1.55*x, 0);
  fort.add(insideWall4);

  const centerTower = createCenterTower();
  centerTower.position.set(0, 3.55*x, 0);
  fort.add( centerTower);
  
  const outsideWall1 = createOutsideWall();
  outsideWall1.position.set(-0.25*x, 1.3*x, 9.75*x);
  fort.add(outsideWall1);

  const outsideWall2 = createOutsideWall();
  outsideWall2.rotation.y = Math.PI/2;
  outsideWall2.position.set(9.75*x, 1.3*x, 0.25*x);
  fort.add(outsideWall2);

  const outsideWall3 = createOutsideWall();
  outsideWall3.position.set(0.25*x, 1.3*x, -9.75*x);
  fort.add(outsideWall3);

  const outsideWall4 = createOutsideWall();
  outsideWall4.rotation.y = Math.PI/2;
  outsideWall4.position.set(-9.75*x, 1.3*x, -0.25*x);
  fort.add(outsideWall4);

  return fort;

}

export { createFort };


