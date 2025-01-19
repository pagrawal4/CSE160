// Pranjal Agrawal
// pagrawa4@ucsc.edu
// Assignment 0: asg0.js

// The main function
function main() {
    // Retrieve <canvas> element <- (1)
    let canvas = document.getElementById('asg0canvas');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    
    // Get the rendering context for 2DCG <- (2)
    let ctx = canvas.getContext('2d');

    // Part 1: Draw a blue rectangle
    // ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // Set color to blue
    // ctx.fillRect(120, 10, 150, 150);        // Fill a rectangle with the color

    // Part 2: Draw a red vector v1 on a black canvas
    // Fill the canvas with black color <- (3)
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with the color

    let v1 = new Vector3([2.25, 2.25, 0])
    drawVector(v1, "red");

}

// Draw the vector with the specified color
function drawVector(v, color) {
    // Retrieing canvas and ctx again to avoid the
    // introduction of global variables for them
    let canvas = document.getElementById('asg0canvas');
    let ctx = canvas.getContext('2d');
    
    let vx = v.elements[0]
    let vy = v.elements[1]
    
    ctx.strokeStyle = color;
    let cx = canvas.width/2;
    let cy = canvas.height/2;

    ctx.beginPath();
    ctx.moveTo(cx, cy);     // Move to origin
    ctx.lineTo(cx+(vx*20), cy-(vy*20)); // Line to vector tip
    ctx.stroke();
}

// Calculate the angle between the 2 given vectors
function angleBetween(v1, v2) {
    let normalizedDot = Vector3.dot(v1, v2)/(v1.magnitude()*v2.magnitude());
    if (normalizedDot < -1.0) { // Take care of floating point error (value < -1.0)
        normalizedDot = -1.0;
    } else if (normalizedDot > 1.0) { // floating point error (value > 1.0)
        normalizedDot = 1.0;
    }
    let angle = (Math.acos(normalizedDot) * 180)/Math.PI;
    return angle;
}

// Calculate the area of the triangle formed by the given two vectors
function areaTriangle(v1, v2) {
    let v3 = Vector3.cross(v1, v2)
    let area = v3.magnitude()/2;
    return area;
}

// Handle the drawing of vectors v1 and v2
function handleDrawEvent() {
    // Retrieing canvas and ctx again to avoid the
    // introduction of global variables for them
    let canvas = document.getElementById('asg0canvas');
    let ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Fill canvas with black color
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let v1x = document.getElementById("v1x").value;
    let v1y = document.getElementById("v1y").value;

    let v1 = new Vector3([v1x, v1y, 0]);
    drawVector(v1, "red");

    let v2x = document.getElementById("v2x").value;
    let v2y = document.getElementById("v2y").value;

    let v2 = new Vector3([v2x, v2y, 0]);
    drawVector(v2, "blue");
}

// Handle the operation between the two vectors v1 and v2
function handleDrawOperationEvent() {
    // Retrieing canvas and ctx again to avoid the
    // introduction of global variables for them
    let canvas = document.getElementById('asg0canvas');
    let ctx = canvas.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Fill canvas with black color
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let v1x = document.getElementById("v1x").value;
    let v1y = document.getElementById("v1y").value;

    let v1 = new Vector3([v1x, v1y, 0]);
    drawVector(v1, "red");

    let v2x = document.getElementById("v2x").value;
    let v2y = document.getElementById("v2y").value;

    let v2 = new Vector3([v2x, v2y, 0]);
    drawVector(v2, "blue");

    let operation = document.getElementById("operation").value;
    let scalar = document.getElementById("scalar").value;

    if (operation == "add") {
        let v3 = v2.add(v1);
        drawVector(v3, "green");
    }
    else if (operation == "sub") {
        let v3 = v1.sub(v2);
        drawVector(v3, "green");
    }
    else if (operation == "mult") {
        let v3 = v1.mul(scalar);
        let v4 = v2.mul(scalar);
        drawVector(v3, "green");
        drawVector(v4, "green");
    }
    else if (operation == "div") {
        let v3 = v1.div(scalar);
        let v4 = v2.div(scalar);
        drawVector(v3, "green");
        drawVector(v4, "green");
    }
    else if (operation == "magnitude") {
        console.log("Magnitude v1: " + v1.magnitude());
        console.log("Magnitude v2: " + v2.magnitude());
    }
    else if (operation == "normalize") {
        let v1normalize = v1.normalize();
        let v2normalize = v2.normalize();
        drawVector(v1normalize, "green");
        drawVector(v2normalize, "green");
    }
    else if (operation == "angle") {
        let angle = angleBetween(v1, v2);
        console.log("Angle: " + angle);
    }
    else if (operation == "area") {
        let area = areaTriangle(v1, v2);
        console.log("Area: " + area);
    }

}
