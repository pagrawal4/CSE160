class TriangularPrism {

  constructor(){
    this.type = 'trianglular-prism';
    this.color = [1.0, 1.0, 1.0, 1.0]; // default white

    this.matrix = new Matrix4(); // default identity

    this.vertexBuffer = null;
    this.vertices = new Float32Array([
        // Right face
        0.5,-0.5, 0.5,   0.5,-0.5,-0.5,   0.5, 0.5, 0.5,
        0.5,-0.5, 0.5,   0.5, 0.5, 0.5,   0.5, 0.5, 0.5,
        // Left face
        -0.5,-0.5, 0.5,  -0.5,-0.5,-0.5,  -0.5, 0.5, 0.5,
        -0.5,-0.5, 0.5,  -0.5, 0.5, 0.5,  -0.5, 0.5, 0.5,
        // Bottom face
        0.5,-0.5,-0.5,  -0.5,-0.5,-0.5,  -0.5,-0.5, 0.5,
        0.5,-0.5,-0.5,   0.5,-0.5, 0.5,  -0.5,-0.5, 0.5,
        // Front face
        0.5,-0.5,-0.5,  -0.5,-0.5,-0.5,  -0.5, 0.5, 0.5,
        0.5,-0.5,-0.5,  -0.5, 0.5, 0.5,   0.5, 0.5, 0.5,
        // Back face (ok)
        0.5,-0.5, 0.5,  -0.5,-0.5, 0.5,  -0.5, 0.5, 0.5,
        0.5,-0.5, 0.5,  -0.5, 0.5, 0.5,   0.5, 0.5, 0.5
    ]);
  }

  render(){
    var rgba = this.color;

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
    gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // Pass the color of a point to u_FragColor variable
    // Draw 4 faces with actual rgb
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.drawArrays(gl.TRIANGLES, 0, 24);

    // Draw other two with reduced values of rgb to show difference
    //gl.uniform4f(u_FragColor, rgba[0]*.9,  rgba[1]*.9, rgba[2]*.9, rgba[3]);
    gl.drawArrays(gl.TRIANGLES, 24, 12);

  }
}

function drawTriangularPrism(matrix, color) {
  var prism = new TriangularPrism();
  if (matrix) {
      prism.matrix = matrix;
  }
  if (color) {
      prism.color = color;
  }
  prism.render();
}