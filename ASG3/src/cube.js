class Cube {
    constructor() {
        this.type = "cube";
        // this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0]; // default white
        // this.size = 5.0;
        // this.segments = 10;
        this.matrix = new Matrix4(); // default identity
        this.textureNum = -2;
        this.texColorWeight = 0.8;

        this.vertexBuffer = null;

        this.vertices = new Float32Array([
            //FRONT
            -0.5,0.5,0.5,  -0.5,-0.5,0.5,   0.5,-0.5,0.5,
            -0.5,0.5,0.5,   0.5,-0.5,0.5,   0.5,0.5,0.5,
            //LEFT
            -0.5,0.5,-0.5, -0.5,-0.5,-0.5, -0.5,-0.5,0.5,
            -0.5,0.5,-0.5, -0.5,-0.5,0.5,  -0.5,0.5,0.5,
            //RIGHT
             0.5,0.5,0.5,   0.5,-0.5,0.5,   0.5,-0.5,-0.5,
             0.5,0.5,0.5,   0.5,-0.5,-0.5,  0.5,0.5,-0.5,
            //TOP
            -0.5,0.5,-0.5, -0.5,0.5,0.5,    0.5,0.5,0.5,
            -0.5,0.5,-0.5,  0.5,0.5,0.5,    0.5,0.5,-0.5,
            //BACK
             0.5,0.5,-0.5,  0.5,-0.5,-0.5, -0.5,0.5,-0.5,
            -0.5,0.5,-0.5,  0.5,-0.5,-0.5, -0.5,-0.5,-0.5,
            //BOTTOM
            -0.5,-0.5,0.5, -0.5,-0.5,-0.5,  0.5,-0.5,-0.5,
            -0.5,-0.5,0.5,  0.5,-0.5,-0.5,  0.5,-0.5,0.5
          ]);

        this.uv = new Float32Array([
            // FRONT
            0.25,0.50, 0.25,0.25, 0.05,0.25,
            0.25,0.50, 0.50,0.25, 0.50,0.50,
            // LEFT
            0.00,0.50, 0.00,0.25, 0.25,0.25,
            0.00,0.50, 0.25,0.25, 0.25,0.50,
            // RIGHT
            0.50,0.50, 0.50,0.25, 0.75,0.25,
            0.50,0.50, 0.75,0.25, 0.75,0.50,
            // TOP
            0.25,0.75, 0.25,0.50, 0.50,0.50,
            0.25,0.75, 0.50,0.50, 0.50,0.75,
            // BACK
            0.75,0.50, 0.75,0.25, 1.00,0.50,
            1.00,0.50, 0.75,0.25, 1.00,0.25,
            // BOTTOM
            0.25,0.25, 0.25,0.00, 0.50,0.00,
            0.25,0.25, 0.50,0.00, 0.50,0.25,
          ]);
        /*
        this.vertices_last = new Float32Array([
            // Right face
            0.5,-0.5, 0.5,   0.5,-0.5,-0.5,   0.5, 0.5,-0.5, 
            0.5,-0.5, 0.5,   0.5, 0.5,-0.5,   0.5, 0.5, 0.5,
            // Left face
            -0.5,-0.5, 0.5,  -0.5,-0.5,-0.5,  -0.5, 0.5,-0.5,
            -0.5,-0.5, 0.5,  -0.5, 0.5,-0.5,  -0.5, 0.5, 0.5,
            // Top face
            0.5, 0.5,-0.5,  -0.5, 0.5,-0.5,  -0.5, 0.5, 0.5,
            0.5, 0.5,-0.5,   0.5, 0.5, 0.5,  -0.5, 0.5, 0.5,
            // Bottom face
            0.5,-0.5,-0.5,  -0.5,-0.5,-0.5,  -0.5,-0.5, 0.5,
            0.5,-0.5,-0.5,   0.5,-0.5, 0.5,  -0.5,-0.5, 0.5,
            // Front face
            0.5,-0.5,-0.5,  -0.5,-0.5,-0.5,  -0.5, 0.5,-0.5,
            0.5,-0.5,-0.5,  -0.5, 0.5,-0.5,   0.5, 0.5,-0.5,
            // Back face
            0.5,-0.5, 0.5,  -0.5,-0.5, 0.5,  -0.5, 0.5, 0.5,
            0.5,-0.5, 0.5,  -0.5, 0.5, 0.5,   0.5, 0.5, 0.5
        ]);
        this.uv_last = new Float32Array([
            // Right face
            1,0,  0,0,  0,1,
            1,0,  0,1,  1,1,  
            // Left face
            0,0,  1,0,  1,1,
            0,0,  1,1,  0,1, 
            // Top face
            1,0,  0,0,  0,1,
            1,0,  1,1,  0,1,
            // Bottom face
            1,1,  0,1,  0,0,
            1,1,  1,0,  0,0,
            // Front face
            1,0,  0,0,  0,1,
            1,0,  0,1,  1,1,
            // Back face
            0,0,  1,0,  1,1,
            0,0,  1,1,  0,1,
        ]);
        */

    }

    render() {
        var rgba = this.color;

        // Set the u_TextureSelect to textureNum
        gl.uniform1i(u_TextureSelect, this.textureNum);

        // Set the u_texColorWeight to texColorWeight
        gl.uniform1f(u_texColorWeight, this.texColorWeight);

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

       // Create a buffer object
        if (this.buffer == null) {
            this.buffer = gl.createBuffer();
            if (!this.buffer) {
                console.log('Failed to create the buffer object');
                return -1;
            }
        }
        // Bind the buffer object to target
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        // Write date into the buffer object
        // DYNAMIC gives better performance, but changing back to STATIC
        // because getting "Vertex buffer is not big enough for the draw call"
        // error after changiing code to put all vertices in the buffer.
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);

        // Assign the buffer object to a_Position variable
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

        // Enable the assignment to a_Position variable
        gl.enableVertexAttribArray(a_Position);
 
        // Create a buffer object
        if (this.uvbuffer == null) {
            this.uvbuffer = gl.createBuffer();
            if (!this.uvbuffer) {
                console.log('Failed to create the buffer object');
                return -1;
            }
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvbuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.uv, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_UV);

        gl.drawArrays(gl.TRIANGLES, 0, 36);
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
