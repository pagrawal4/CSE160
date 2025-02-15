
class Map {
    constructor() {
        this.size = [10, 4, 10]; // map is size[0]x[size[2] and height is size[1]
        this.objectsInPosition = [];
        this.map = [
            [1,0,1,0,2,1,1,1,1,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,3],
            [0,0,0,0,0,0,0,0,0,4],
            [0,0,0,0,0,0,0,0,0,5],
            [0,0,0,0,0,0,0,0,0,5],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,0],
            [1,1,1,0,1,1,1,0,1,1],
        ]
        this.positionObjects();
    }

    // Do as much work upfront as possible to speed up rendering
    positionObjects() {
        let nx = this.size[0];
        let ny = this.size[1];
        let nz = this.size[2];
        for (let x = 0; x < nx; x++) {
            let row = [];
            for (let z = 0; z < nz; z++) {
                let vert = [];
                let nc = this.map[x][z] < ny ? this.map[x][z]: ny;
                for (let y = 0; y < nc; y++) {
                    let c = new Cube();
                    c.textureNum = 0;
                    c.matrix.translate(x-nx/2,0.5+1*y,z-nz/2);
                    vert.push(c);
                }
                row.push(vert);
            }
            this.objectsInPosition.push(row);
        }
    }

    render() {
        let nx = this.size[0];
        let nz = this.size[2];
        for (let x = 0; x < nx; x++) {
            let row = this.objectsInPosition[x];
            for (let z = 0; z < nz; z++) {
                let vert = row[z]
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
