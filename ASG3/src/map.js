
class Map {
    constructor() {
        this.size = 10; // map is size x size
        this.objectsInPosition = [];
        this.map = [
            [1,1,1,1,1,1,1,1,1,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1],
        ]
        this.positionObjects();
    }

    // Do as much work upfront as possible to speed up rendering
    positionObjects() {
        let n = this.size;
        for (let x = 0; x < n; x++) {
            let row = [];
            for (let y = 0; y < n; y++) {
                if (this.map[x][y]==1) {
                    let c = new Cube();
                    c.textureNum = -1;
                    c.matrix.translate(x-n/2,0.5,y-n/2);
                    row.push(c);
                }
            }
            this.objectsInPosition.push(row);
        }
    }

    render() {
        let n = this.size;
        for (let x = 0; x < n; x++) {
            let row = this.objectsInPosition[x];
            for (let y = 0; y < n; y++) {
                let c = row[y];
                if (c != null) {
                    c.render();
                }
            }
        }
    }

}
