class Circle {
    constructor() {
        this.type = "circle";
        this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.size = 5.0;
        this.segments = 10;
    }

    render() {
        var xy = this.position;
        var rgba = this.color;
        var size = this.size;
    

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

	
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
    }
}
