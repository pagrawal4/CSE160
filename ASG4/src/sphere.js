class Sphere {
    constructor() {
        this.type = "sphere";
        // this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0]; // default white
        // this.size = 5.0;
        // this.segments = 10;
        this.matrix = new Matrix4(); // default identity
        this.textureNum = -2;
        this.texColorWeight = 0.8;

        this.vertexBuffer = null;
        this.uvBuffer = null;
        this.normalBuffer = null;
    }

    render() {
        //drawTriangle([-0.5,0,0, 0.5,0,0, 0,5,1]);
        
        var rgba = this.color;

        // Set the u_TextureSelect to textureNum
        if (g_normalsOn) {
            gl.uniform1i(u_TextureSelect, -3);
        } else {
            gl.uniform1i(u_TextureSelect, this.textureNum);
        }

        // Set the u_texColorWeight to texColorWeight
        gl.uniform1f(u_texColorWeight, this.texColorWeight);

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        //drawTriangle([-0.5,0,0, 0.5,0,0, 0,5,1]);

        var d=Math.PI/10;
        var dd=Math.PI/10;

        for (var t=0;t<Math.PI;t+=d) {
            for (var r=0; r<(2*Math.PI); r+=d) {
                var p1 = [Math.sin(t)*Math.cos(r), Math.sin(t)*Math.sin(r), Math.cos(t)];
                var p2 = [Math.sin(t+dd)*Math.cos(r), Math.sin(t+dd)*Math.sin(r), Math.cos(t+dd)];
                var p3 = [Math.sin(t)*Math.cos(r+dd), Math.sin(t)*Math.sin(r+dd), Math.cos(t)];
                var p4 = [Math.sin(t+dd)*Math.cos(r+dd), Math.sin(t+dd)*Math.sin(r+dd), Math.cos(t+dd)];

                var v = [];
                var uv = [];
                v = v.concat(p1); uv=uv.concat([0,0]);
                v = v.concat(p2); uv=uv.concat([0,0]);
                v = v.concat(p4); uv=uv.concat([0,0]);

                gl.uniform4f(u_FragColor, 1, 1, 1, 1);
                this.drawTriangle(v, uv, v);

                v=[];
                uv=[];
                v = v.concat(p1); uv=uv.concat([0,0]);
                v = v.concat(p4); uv=uv.concat([0,0]);
                v = v.concat(p3); uv=uv.concat([0,0]);

                gl.uniform4f(u_FragColor, 1, 0, 0, 1);
                this.drawTriangle(v, uv, v); 
            }
        }
    }

    drawTriangle(vertices) {
        var n = 3; // The number of vertices
      
        // Create a buffer object
        if (!this.vertexBuffer) {
            this.vertexBuffer = gl.createBuffer();
            if (!this.vertexBuffer) {
                console.log('Failed to create the buffer object');
                return -1;
            }
        }
      
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Position);
      
        // Create a buffer object
        if (!this.uvBuffer){
            this.uvBuffer = gl.createBuffer();
            if (!this.uvBuffer) {
                console.log('Failed to create the buffer object');
                return -1;
            }
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_UV);
    
        // Create a buffer object
        if (!this.normalBuffer){
            this.normalBuffer = gl.createBuffer();
            if (!this.normalBuffer) {
                console.log('Failed to create the buffer object');
                return -1;
            }
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(a_Normal);
    
        gl.drawArrays(gl.TRIANGLES, 0, n);
        return n;
    }
}

function drawSphere(matrix, color) {
    var sphere = new Sphere();
    if (matrix) {
        sphere.matrix = matrix;
    }
    if (color) {
        sphere.color = color;
    }
    sphere.render();
}
