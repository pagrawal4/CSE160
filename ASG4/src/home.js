class Home {
  constructor() {
      this.type = "home";
      // this.position = [0.0, 0.0, 0.0];
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.matrix = new Matrix4(); // default identity
      this.normalMatrix = new Matrix4();
      this.textureNum = 1;
      this.texColorWeight = 1.0;
      this.hasShinySurface = false;

      this.vertexBuffer = null;
      this.uvBuffer = null;
      this.normalBuffer = null;

      this.vertices = new Float32Array([
          //FRONT
          -0.5,0.3,0.5,  -0.5,-0.5,0.5,   0.5,-0.5,0.5,
          -0.5,0.3,0.5,   0.5,-0.5,0.5,   0.5,0.3,0.5,
          //LEFT
          -0.5,0.3,-0.5, -0.5,-0.5,-0.5, -0.5,-0.5,0.5,
          -0.5,0.3,-0.5, -0.5,-0.5,0.5,  -0.5,0.3,0.5,
          //RIGHT
           0.5,0.3,0.5,   0.5,-0.5,0.5,   0.5,-0.5,-0.5,
           0.5,0.3,0.5,   0.5,-0.5,-0.5,  0.5,0.3,-0.5,
          //BACK
           0.5,0.3,-0.5,  0.5,-0.5,-0.5, -0.5,0.3,-0.5,
          -0.5,0.3,-0.5,  0.5,-0.5,-0.5, -0.5,-0.5,-0.5,
          //BOTTOM
          -0.5,-0.5,0.5, -0.5,-0.5,-0.5,  0.5,-0.5,-0.5,
          -0.5,-0.5,0.5,  0.5,-0.5,-0.5,  0.5,-0.5,0.5,
          // FRONT ROOF
          0.0,1.0,0.5, -0.5,0.3,0.5, 0.5,0.3,0.5,
          // BACK ROOF
          0.0,1.0,-0.5, 0.5,0.3,-0.5, -0.5,0.3,-0.5,
          // RIGHT ROOF
          0.0, 1.0,0.5, 0.5,0.3,0.5, 0.5,0.3,-0.5,
          0.0, 1.0,0.5, 0.5,0.3,-0.5, 0,1.0,-0.5,
          // LEFT ROOF
          0.0,1.0,-0.5, -0.5,0.3,-0.5, -0.5,0.3,0.5,
          0.0,1.0,-0.5, -0.5,0.3,0.5, 0.0,1.0,0.5,
        ]);

      this.uv = new Float32Array([
          // FRONT
          0.00,1.00,  0.00,0.50,  0.50,0.50,  
          0.00,1.00,  0.50,0.50,  0.50,1.00,
          // LEFT
          0.50,0.50,  0.50,0.00,  1.00,0.00,
          0.50,0.50,  1.00,0.00,  1.00,0.50,
          // RIGHT
          0.50,1.00,  0.50,0.50,  1.00,0.50,
          0.50,1.00,  1.00,0.50,  1.00,1.00,
          // BACK
          0.50,0.50,  0.50,0.00,  1.00,0.50,
          1.00,0.50,  0.50,0.00,  1.00,0.00,
          // BOTTOM
          0.50,0.50,  0.50,0.00,  1.00,0.00,
          0.50,0.50,  1.00,0.00,  1.00,0.50,
          // FRONT ROOF
          0.0,0.0, 0.5,0.0, 0.0,0.5,
          // BACK ROOF
          0.0,0.0, 0.5,0.0, 0.0,0.5,
          // RIGHT ROOF
          0.50,0.50,  0.50,0.00,  1.00,0.00,
          0.50,0.50,  1.00,0.00,  1.00,0.50,
          // LEFT ROOF
          0.50,0.50,  0.50,0.00,  1.00,0.00,
          0.50,0.50,  1.00,0.00,  1.00,0.50,
        ]);

        this.normals = new Float32Array([
            //FRONT
            0,0,1,  0,0,1,  0,0,1,
            0,0,1,  0,0,1,  0,0,1,
            //LEFT
            -1,0,0,  -1,0,0,  -1,0,0,
            -1,0,0,  -1,0,0,  -1,0,0,
            //RIGHT
            1,0,0,  1,0,0,  1,0,0,
            1,0,0,  1,0,0,  1,0,0,
            //BACK
            0,0,-1,  0,0,-1,  0,0,-1,
            0,0,-1,  0,0,-1,  0,0,-1,
            //BOTTOM
            0,-1,0,  0,-1,0,  0,-1,0,
            0,-1,0,  0,-1,0,  0,-1,0,
            // FRONT ROOF
            0,0,1,  0,0,1,  0,0,1,
            // BACK ROOF
            0,0,-1,  0,0,-1,  0,0,-1,
            // RIGHT ROOF
            0.81373,0.58123,0,   0.81373,0.58123,0,   0.81373,0.58123,0,
            0.81373,0.58123,0,   0.81373,0.58123,0,   0.81373,0.58123,0,
            // LEFT ROOF
            -0.81373,0.58123,0,  -0.81373,0.58123,0,  -0.81373,0.58123,0,
            -0.81373,0.58123,0,  -0.81373,0.58123,0,  -0.81373,0.58123,0,
          ]);
  }

  render() {
      var rgba = this.color;

      this.normalMatrix.setInverseOf(this.matrix).transpose();

      // Set the u_TextureSelect to textureNum
      if (g_normalsOn) {
        gl.uniform1i(u_TextureSelect, -3);
      } else {
        gl.uniform1i(u_TextureSelect, this.textureNum);
      }
      gl.uniform1i(u_hasShinySurface, this.hasShinySurface);

      // Set the u_texColorWeight to texColorWeight
      gl.uniform1f(u_texColorWeight, this.texColorWeight);

      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      // Pass the matrix to u_ModelMatrix attribute
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);

     // Create a buffer object
      if (this.vertexBuffer == null) {
          this.vertexBuffer = gl.createBuffer();
          if (!this.vertexBuffer) {
              console.log('Failed to create the buffer object');
              return -1;
          }
      }
      // Bind the buffer object to target
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
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
      if (this.uvBuffer == null) {
          this.uvBuffer = gl.createBuffer();
          if (!this.uvBuffer) {
              console.log('Failed to create the buffer object');
              return -1;
          }
      }
      gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.uv, gl.DYNAMIC_DRAW);
      gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(a_UV);

      // Create a buffer object
      if (this.normalBuffer == null) {
        this.normalBuffer = gl.createBuffer();
        if (!this.normalBuffer) {
            console.log('Failed to create the buffer object');
            return -1;
        }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Normal);

    gl.drawArrays(gl.TRIANGLES, 0, 48);
  }
}

function drawHome(matrix, color) {
  var home = new Home();
  if (matrix) {
      home.matrix = matrix;
  }
  if (color) {
      home.color = color;
  }
  home.render();
}
