class Eagle{
  constructor(){
    this.type = 'eagle';
    this.head = [0.0, 1.0, 0.7, 0.0, -2.0, 0.0];
    this.body = [0.0, 0.0, 1.0, -2.0, -1.0, -2.0, 1.5, -4.0, -1.5, -4.0, 0.0, -6.0];
    this.sidetail = [0.5, -5.5, 3.0, -7.0, 2.0, -8.0];
    this.tail = [0.0, -6.0, 1.0, -9.0, -1.0, -9.0];
    this.wingpart1 = [1.5, -4.0, 1.0, -2.0, 4.0, -5.0];
    this.wingpart2 = [5.5, 0.0, 10.0, 2.0, 10.0, 0.0, 12.0, 3.0];
    this.wingpart3 = [8.0, 0.0, 10.0, 0.0, 8.0, -1.0];
    this.wingpart4 = [6.0, -3.0, 5.5, 0.0, 8.0, -2.0, 8.0, 0.0];
    this.wingpart5 = [1.0, -2.0, 4.0, -5.0, 5.5, 0.0, 6.0, -3.0];
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0,1.0,1.0,1.0];
    this.size = 5.0;
  }

  render(){
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    let red = [1.0, 0.0, 0.0, 1.0];
    let green = [0.0, 1.0, 0.0, 1.0];
    let yellow = [1.0, 1.0, 0.0, 1.0];
    let blue = [0.0, 0.0, 1.0, 1.0];
    let lightblue = [0.0, 0.0, 0.9, 1.0];
    let purple = [1.0, 0.0, 1.0, 1.0];
    let teal = [0.0, 1.0, 1.0, 1.0];

    // Draw
    drawTriangles(this.head, teal);
    drawTriangles(this.body, red);
    drawTriangles(this.tail, green);
    drawTriangles(this.sidetail, yellow);
    drawTriangles(flip(this.sidetail), yellow);
    drawTriangles(this.wingpart1, blue);
    drawTriangles(this.wingpart2, yellow,);
    drawTriangles(this.wingpart3, green);
    drawTriangles(this.wingpart4, red);
    drawTriangles(this.wingpart5, lightblue);
    drawTriangles(flip(this.wingpart1), blue);
    drawTriangles(flip(this.wingpart2), yellow);
    drawTriangles(flip(this.wingpart3), green);
    drawTriangles(flip(this.wingpart4), red);
    drawTriangles(flip(this.wingpart5), lightblue);

  }

}

function flip(points){
  let flippedPoints = [];
  var len = points.length;
  for (var i = 0 ; i < len ; i += 2) {
    flippedPoints.push(-points[i]);
    flippedPoints.push(points[i+1]);
  }
  return flippedPoints;
}

function drawTriangles(vertices, rgba) {
  gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
  let n = vertices.length;
  for (var i = 0 ; i < n-4 ; i += 2) {
      drawTriangle([vertices[i]/12, vertices[i+1]/12, vertices[i+2]/12, vertices[i+3]/12, vertices[i+4]/12, vertices[i+5]/12]);
  }
}
