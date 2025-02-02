class Cube {
    constructor() {
        this.type = "cube";
        // this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0]; // default white
        // this.size = 5.0;
        // this.segments = 10;
        this.matrix = new Matrix4(); // default identity
    }

    render() {
        // var xy = this.position;
        var rgba = this.color;
        // var size = this.size;
    

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
	
        // Right face (red)
        //gl.uniform4f(u_FragColor, 1,0,0,1);
        drawTriangle3D( [ 0.5,-0.5, 0.5,   0.5,-0.5,-0.5,   0.5, 0.5,-0.5 ]);
        drawTriangle3D( [ 0.5,-0.5, 0.5,   0.5, 0.5,-0.5,   0.5, 0.5, 0.5 ]);

        // Left face (cyan)
        //gl.uniform4f(u_FragColor, 0,1,1,1);
        drawTriangle3D( [-0.5,-0.5, 0.5,  -0.5,-0.5,-0.5,  -0.5, 0.5,-0.5 ]);
        drawTriangle3D( [-0.5,-0.5, 0.5,  -0.5, 0.5,-0.5,  -0.5, 0.5, 0.5 ]);

        // Top face (green)
        //gl.uniform4f(u_FragColor, 0,1,0,1);
        drawTriangle3D( [ 0.5, 0.5,-0.5,  -0.5, 0.5,-0.5,  -0.5, 0.5, 0.5 ]);
        drawTriangle3D( [ 0.5, 0.5,-0.5,   0.5, 0.5, 0.5,  -0.5, 0.5, 0.5 ]);

        // Bottom face (purple)
        //gl.uniform4f(u_FragColor, 1,0,1,1);
        drawTriangle3D( [ 0.5,-0.5,-0.5,  -0.5,-0.5,-0.5,  -0.5,-0.5, 0.5 ]);
        drawTriangle3D( [ 0.5,-0.5,-0.5,   0.5,-0.5, 0.5,  -0.5,-0.5, 0.5 ]);

        // Front face (blue)
        //gl.uniform4f(u_FragColor, 0,0,1,1);
        gl.uniform4f(u_FragColor, rgba[0]*.9,  rgba[1]*.9, rgba[2]*.9, rgba[3]);
        drawTriangle3D( [ 0.5,-0.5,-0.5,  -0.5,-0.5,-0.5,  -0.5, 0.5,-0.5 ]);
        drawTriangle3D( [ 0.5,-0.5,-0.5,  -0.5, 0.5,-0.5,   0.5, 0.5,-0.5 ]);

        // Back face (yellow)
        //gl.uniform4f(u_FragColor, 1,1,0,1);
        drawTriangle3D( [ 0.5,-0.5, 0.5,  -0.5,-0.5, 0.5,  -0.5, 0.5, 0.5 ]);
        drawTriangle3D( [ 0.5,-0.5, 0.5,  -0.5, 0.5, 0.5,   0.5, 0.5, 0.5 ]);
    }
}

function drawCube(matrix, color) {
    var cube = new Cube();
    if (matrix) {
        cube.matrix = matrix;
    }
    if (color) {
        cube.color = color;
    }
    cube.render();
}
