class Map {
    constructor() {
        this.size = [32, 4, 32]; // map is size[2]x[size[0] and height is size[1]
        this.objectmap = null;
        this.selected = null;

        this.map = [
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],

            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,2,2,2,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,2,2,2,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,2,2,2,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],

            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],

            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1],
        ];

        this.positionObjects();
    }

    xPosition(x) {
        let nx = this.size[0];
        x = Math.round(x);
        return (x < 0) ? 0 : (x >= nx) ? nx-1 : x;
    }

    zPosition(z) {
        let nz = this.size[2];
        z = Math.round(z);
        return (z < 0) ? 0 : (z >= nz) ? nz-1 : z;
    }

    addObject(x, z, textureNum) {
        x = this.xPosition(x);
        z = this.zPosition(z);
        //console.log("Adding cube at location x=" + x + " z=" + z);
        let cubesAtPos = this.objectmap[z][x];
        let y = cubesAtPos.length;
        let nx = this.size[0];
        let nz = this.size[2];
        let c = new Cube();
        c.textureNum = textureNum;
        c.matrix.translate(x-nx/2,0.5+1*y,z-nz/2);
        cubesAtPos.push(c);
    }

    removeObject(x, z) {
        x = this.xPosition(x);
        z = this.zPosition(z);
        //console.log("Removing cube at location x=" + x + " z=" + z);
        let c = this.objectmap[z][x].pop();
        if (c == this.selected) {
            this.selected = null;
        }
    }

    selectObject(x, z) {
        if (this.selected) {
            this.selected.textureNum = 0;
            this.selected = null;
        }
        x = this.xPosition(x);
        z = this.zPosition(z);
        let cubesAtPos = this.objectmap[z][x];
        let y = cubesAtPos.length;
        if (y > 0) {
            //console.log("Selecting cube at location x=" + x + " z=" + z);
            let c = cubesAtPos[y-1];
            c.textureNum = 1;
            c.color = [0.7,0.3,0,1];
            this.selected = c;
        }
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
