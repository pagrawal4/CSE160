class Map {
    constructor() {
        this.size = [32, 4, 32]; // map is size[2]x[size[0] and height is size[1]
        this.objectmap = null;
        this.selected = null;
        this.homes = Array();

        this.map = [
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1], // z = 0, x = 0-31
            [1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1, 1,1], // z = 1, x = 0-31
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

        this.homemap = [
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],

            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],

            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],

            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
            [0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0,0,0,0,0,0,0,0,0, 0,0],
        ];

        this.positionObjects();
        this.addHome(25, 15, 1);
        this.addHome(25, 20, 3);
        //this.addHome(27, 20, 3);
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

    isEmpty(x, z) {
        x = this.xPosition(x);
        z = this.zPosition(z);
        return (this.objectmap[z][x].length <= 1) && (this.homemap[z][x] == 0);
    }

    isEmptySquare(x, z, len) {
        x = this.xPosition(x);
        z = this.zPosition(z);
        for (let i = 0 ; i < len ; i++) {
            for (let j = 0 ; j < len ; j++) {
                if (!this.isEmpty(x+i, z+j)) {
                    return false;
                }
            }
        }
        return true;
    }

    addHome(x, z, textureNum) {
        x = this.xPosition(x);
        z = this.zPosition(z);
        let len = 5;
        let cornerX = x - Math.floor(len/2);
        let cornerZ = z - Math.floor(len/2);
        if (this.isEmptySquare(cornerX, cornerZ, len)) {
            //console.log("Adding home at location x=" + x + " z=" + z);
            let homeNum = this.homes.length + 1;
            for (let i = 0 ; i < len ; i++) {
                for (let j = 0 ; j < len ; j++) {
                    this.homemap[cornerZ + j][cornerX + i] = homeNum;
                    let cubesAtPos = this.objectmap[cornerZ + j][cornerX + i];
                    let c = cubesAtPos[cubesAtPos.length - 1];
                    //c.textureNum = 10;
                    //c.hasShinySurface = false;
                    //c.color = [0.7,0.3,0.7,1];
                }
            }
            let nx = this.size[0];
            let nz = this.size[2];
            let home = new Home();
            home.textureNum = textureNum;
            home.matrix.translate(x-nx/2,2.1,z-nz/2).rotate(-90, 0,1,0).scale(3,2,3);
            this.homes.push(home);
            return home;
        }
    return null;
    }

    removeHome(x, z) {
        x = this.xPosition(x);
        z = this.zPosition(z);
        let homeNum = this.homemap[z][x];
        if (homeNum > 0) {
            while (x > 0 && this.homemap[z][x-1] == homeNum) {
                x--;
            }
            while (z > 0 && this.homemap[z-1][x] == homeNum) {
                z--;
            }
            let len = 5;
            for (let i = 0 ; i < len ; i++) {
                for (let j = 0 ; j < len ; j++) {
                    this.homemap[z+j][x+i] = 0;
                    let cubesAtPos = this.objectmap[z+j][x+i];
                    let c = cubesAtPos[cubesAtPos.length - 1];
                    c.textureNum = 0;
                }
            }
            this.homes[homeNum-1] = null;
        }
    }

    addObject(x, z, textureNum, hasShinySurface = false) {
        x = this.xPosition(x);
        z = this.zPosition(z);
        if (this.homemap[z][x] == 0) {
            //console.log("Adding cube at location x=" + x + " z=" + z);
            let cubesAtPos = this.objectmap[z][x];
            let y = cubesAtPos.length;
            let nx = this.size[0];
            let nz = this.size[2];
            let c = new Cube();
            c.textureNum = textureNum;
            c.hasShinySurface = hasShinySurface;
            c.matrix.translate(x-nx/2,0.5+1*y,z-nz/2);
            cubesAtPos.push(c);
        }
    }

    removeObject(x, z) {
        x = this.xPosition(x);
        z = this.zPosition(z);
        //console.log("Removing cube at location x=" + x + " z=" + z);
        let cubesAtPos = this.objectmap[z][x];
        if (cubesAtPos.length > 1) {
            let c = cubesAtPos.pop();
            if (c == this.selected) {
                this.selected = null;
            }
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
            //c.textureNum = 10;
            //c.hasShinySurface = false;
            //c.texColorWeight = 0.5;
            //c.color = [0.7,0.3,0,1];
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
                    c.hasShinySurface = false;
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
        for (let i = 0 ; i < this.homes.length ; i++) {
            if (this.homes[i]) {
                //console.log("Rendering home " + i);
                this.homes[i].render();
            }
        }
    }
}
