import * as THREE from 'three';

function createGem(position) {
  const radius = 5;
  const geometry = new THREE.IcosahedronGeometry( radius );
  const material = new THREE.MeshPhysicalMaterial({
    roughness: 0.0,
    reflectivity: 1.0,
    clearcoat: 1.0,
    ior: 2.42,
    metalness: 0.0,
  });
  const gem = new THREE.Mesh(geometry, material);
  gem.position.set(position[0], position[1], position[2]);
  return gem;
}

export { createGem };