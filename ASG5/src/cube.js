import * as THREE from 'three';

class Cube {
    constructor({size = [1, 1, 1], position = [0,0,0], color = 0xffffff, textureFile = null, metalness = 0.0}) {
        this.type = "cube";
        this.boxWidth = size[0];
        this.boxHeight = size[1];
        this.boxDepth = size[2];
        this.color = color;
        this.textureFile = textureFile;
        this.geometry = new THREE.BoxGeometry(this.boxWidth, this.boxHeight, this.boxDepth);

        if (this.textureFile){
            const loader = new THREE.TextureLoader();
            const texture = loader.load( this.textureFile );
            texture.colorSpace = THREE.SRGBColorSpace;
            this.material = new THREE.MeshPhongMaterial({color: this.color, map: texture});
        } else if (metalness > 0.0) {
            this.material = new THREE.MeshPhysicalMaterial({
                color: 0xffffff, // White color
                metalness: metalness,
                /*
                roughness: 0.1,
                clearcoat: 1.0,
                clearcoatRoughness: 0.03,
                transmission: 0.2,
                ior: 1.5,
                thickness: 2.0,*/
              });
        } else {
            this.material = new THREE.MeshPhongMaterial({color: this.color});
        }

        this.cube = new THREE.Mesh(this.geometry, this.material);
        this.cube.position.x = position[0];
        this.cube.position.y = position[1];
        this.cube.position.z = position[2];
    }
}

function makeCube(position, color) {
    var cube = new Cube({ position: position, color: color}); // can pass parameters by name or use undefined
    return cube.cube;
}

function makeTexturedCube() {
    var cube = new Cube({ textureFile: '../textures/wood.jpg'});
    return cube.cube;
}

function makeShinyCube(position){
    var cube = new Cube({position: position, metalness: 0.8});
    return cube.cube;
}

export { Cube, makeCube, makeTexturedCube, makeShinyCube};
