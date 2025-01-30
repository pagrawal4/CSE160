class Cube {
    constructor() {
        this.type = "cube";
        // this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        // this.size = 5.0;
        // this.segments = 10;
        this.matrix = new Matrix4();
    }

    render() {
        // var xy = this.position;
        var rgba = this.color;
        // var size = this.size;
    

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // Pass the matrix to u_ModelMatrix attribute
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
	
        /*
        var scaledSize = this.size/200.0;

        let center = [xy[0], xy[1]];
        let thetaStep=360/this.segments;
        for (var theta1 = 0; theta1 < 360; theta1 += thetaStep) {
            let theta2 = theta1 + thetaStep;

            let vec1 = [Math.cos(theta1 * Math.PI / 180) * scaledSize,
			Math.sin(theta1 * Math.PI / 180) * scaledSize];
            let vec2 = [Math.cos(theta2 * Math.PI / 180) * scaledSize,
			Math.sin(theta2 * Math.PI / 180) * scaledSize];

            let vertex1 = [center[0] + vec1[0], center[1] + vec1[1]];
            let vertex2 = [center[0] + vec2[0], center[1] + vec2[1]];

            drawTriangle ( [center[0], center[1],
			    vertex1[0], vertex1[1],
			    vertex2[0], vertex2[1]] );
        }
        */
       
        // Front of cube
        drawTriangle3D( [0,0,0,   1,1,0,  1,0,0 ]);
        drawTriangle3D( [0,0,0,   0,1,0,  1,1,0 ]);

        // Pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0]*.9,  rgba[1]*.9, rgba[2]*.9, rgba[3]);
        //gl.uniform4f(u_FragColor, 1*.9,  0*.9, 0*.9, 1);

        // Right side  of code
        drawTriangle3D( [1,0,0,   1,1,0,   1,0,1 ]);
        drawTriangle3D( [1,0,1,   1,1,0,   1,1,1 ]);
     
        //gl.uniform4f(u_FragColor, 0*.9,  0*.9, 1*.9, 1);

        // Top  of cube
        drawTriangle3D( [0,1,0,   0,1,1,   1,1,1 ]);
        drawTriangle3D( [0,1,0,   1,1,1,   1,1,0 ]);    

        // Other sides of cube
        // <fill this in yourself>
    }
}
