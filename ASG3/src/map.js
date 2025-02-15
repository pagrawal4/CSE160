
class Map {
    constructor() {
        this.size = [10, 4, 10]; // map is size[0]x[size[2] and height is size[1]
        this.objectsInPosition = [];
        this.map = [
            [1,0,1,0,1,1,1,1,1,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,0],
            [1,1,1,0,1,1,1,0,1,1],
        ]
        this.positionObjects();
    }

    // Do as much work upfront as possible to speed up rendering
    positionObjects() {
        let nx = this.size[0];
        let nz = this.size[2];
        for (let x = 0; x < nx; x++) {
            let row = [];
            for (let z = 0; z < nz; z++) {
                if (this.map[x][z]==1) {
                    let c = new Cube();
                    c.textureNum = 0;
                    c.matrix.translate(x-nx/2,0.5,z-nz/2);
                    row.push(c);
                }
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
                let c = row[z];
                if (c != null) {
                    c.render();
                }
            }
        }
    }

}
