import * as THREE from 'three';

class Cube {
    constructor() {
        this.type = "cube";
    }

}

function makeCube(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({color});
   
    const cube = new THREE.Mesh(geometry, material);   
    cube.position.x = x;
   
    return cube;
}

function makeTexturedCube(geometry, x) {
    const loader = new THREE.TextureLoader();
    const texture = loader.load( '../textures/steel.jpg' );
    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshPhongMaterial({map: texture});
   
    const cube = new THREE.Mesh(geometry, material);   
    cube.position.x = x;
   
    return cube;
}

export { makeCube, makeTexturedCube};
