class Map {
    constructor() {
        this.size = [10, 4, 10]; // map is size[2]x[size[0] and height is size[1]

        this.map = [
            [2,0,1,0,2,1,1,1,1,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,3],
            [0,0,0,0,0,0,0,0,0,4],
            [0,0,0,0,0,0,0,0,0,5],
            [0,0,0,0,0,0,0,0,0,5],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
           /*
            [0,1,0,0,0,0,0,0,0,3],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,3],
            [0,0,0,0,0,0,0,0,0,4],
            [0,0,0,0,0,0,0,0,0,5],
            [0,0,0,0,0,0,0,0,0,5],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,3],
            */
        ];
        this.objectmap = null;
        this.positionObjects();
    }

    addObject(x, z, textureNum) {
        let cubesAtPos = this.objectmap[z][x];
        let nz = this.objectmap.length;
        let nx = this.objectmap[z].length;
        let y = cubesAtPos.length;
        let c = new Cube();
        c.textureNum = textureNum;
        c.matrix.translate(x-nx/2,0.5+1*y,z-nz/2);
        cubesAtPos.push(c);
    }

    removeObject(x, z) {
        this.objectmap[z][x].pop();
    }

    // Do as much work upfront as possible to speed up rendering
    positionObjects() {
        let nx = this.size[0];
        let ny = this.size[1];
        let nz = this.size[2];
        this.objectmap = Array(nz);
        for (let z = 0; z < nz; z++) {
            this.objectmap[z] = Array(nx);
            for (let x = 0; x < nx; x++) {
                let nc = this.map[z][x] < ny ? this.map[z][x]: ny;
                this.objectmap[z][x] = Array(nc);
                for (let y = 0; y < nc; y++) {
                    let c = new Cube();
                    c.textureNum = 0;
                    //c.matrix.translate(x,y,z);
                    c.matrix.translate(x-nx/2,0.5+1*y,z-nz/2);
                    this.objectmap[z][x][y] = c;
                }
            }
        }
    }

    render() {
        let nx = this.size[0];
        let nz = this.size[2];
        for (let z = 0; z < nz; z++) {
            let row = this.objectmap[z];
            for (let x = 0; x < nx; x++) {
                let vert = row[x];
                for (let y = 0; y < vert.length; y++) {
                    let c = vert[y];
                    if (c != null) {
                        c.render();
                    }
                }
            }
        }
    }
}
