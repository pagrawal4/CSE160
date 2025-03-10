import * as THREE from 'three';

class Cube {
    constructor(options = {}) {
        this.type = "cube";

        this.size = options.size || [1,1,1];
        this.color = options.color || 0xffffff;
        this.textureFile = options.textureFile || null;
        this.metalness = options.metalness || 0.0;
        this.position = options.position || [0,0,0];

        this.geometry = new THREE.BoxGeometry(this.size[0], this.size[1], this.size[2]);

        if (this.textureFile){
            const loader = new THREE.TextureLoader();
            const texture = loader.load( this.textureFile );
            texture.colorSpace = THREE.SRGBColorSpace;
            this.material = new THREE.MeshPhongMaterial({color: this.color, map: texture});
        } else if (this.metalness > 0.0) {
            this.material = new THREE.MeshPhysicalMaterial({
                color: 0xffffff, // White color
                metalness: this.metalness,
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
        this.cube.position.x = this.position[0];
        this.cube.position.y = this.position[1];
        this.cube.position.z = this.position[2];
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
