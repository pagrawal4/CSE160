
class Map {
    constructor() {
        this.size = 2; // map is size x size
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
            [1,1,1,1,1,1,1,1,1,1],
        ]
        this.positionObjects();
    }

    // Do as much work upfront as possible to speed up rendering
    positionObjects() {
        for (let x = 0; x < this.size; x++) {
            let row = [];
            for (let y = 0; y < this.size; y++) {
                if (this.map[x][y]==1) {
                    let c = new Cube();
                    c.textureNum = -1;
                    c.matrix.translate(x,y+0.5,0);
                    row.push(c);
                }
            }
            this.objectsInPosition.push(row);
        }
    }

    render() {
        for (let x = 0; x < this.size; x++) {
            let row = this.objectsInPosition[x];
            for (let y = 0; y < this.size; y++) {
                let c = row[y];
                if (c != null) {
                    c.render();
                }
            }
        }
    }

}
