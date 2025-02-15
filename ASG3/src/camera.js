class Camera {
  constructor() {
    this.viewMatrix = new Matrix4();
    this.projectionMatrix = new Matrix4();
    this.reset();
  }

  reset() {
    this.speed = 0.1;  // move speed
    this.panAlpha = 5; // pan increment angle in degrees
    this.fov = 60.0;                  // field of view (angle width)
    this.eye = new Vector3([0,1,-5]); // eye positioned at
    this.at = new Vector3([0,1,0]);   // eye looking at
    this.up = new Vector3([0,1,0]);   // direction of up
    this.updateMatrices();
  }

  updateMatrices() {
    this.viewMatrix.setLookAt(this.eye.elements[0],this.eye.elements[1],this.eye.elements[2],
                              this.at.elements[0],this.at.elements[1],this.at.elements[2],
                              this.up.elements[0],this.up.elements[1],this.up.elements[2]);

    // IMP: Right after setting the view matrix, the near and far things start
    // to cause issues with things clipping off of showiping up as transparent
    // Setting the perspective fixes this problem.
    this.projectionMatrix.setPerspective(this.fov,  // angle width
                                         canvas.width/canvas.height, // aspect ratio
                                         0.1,   // near
                                         1000); // far
  }

  moveForward() {
    let f = new Vector3(); // forward vector
    f.set(this.at);
    f.sub(this.eye);
    f.normalize();
    f.mul(this.speed);
    this.eye.add(f);
    this.at.add(f);
    this.updateMatrices();
  }
  moveBackwards() {
    let b = new Vector3(); // backward vector
    b.set(this.eye);
    b.sub(this.at);
    b.normalize();
    b.mul(this.speed);
    this.eye.add(b);
    this.at.add(b);
    this.updateMatrices();
  }
  moveLeft() {
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    let s = Vector3.cross(this.up, f);
    s.normalize();
    s.mul(this.speed);
    this.eye.add(s);
    this.at.add(s);
    this.updateMatrices();
  }
  moveRight() {
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    let s = Vector3.cross(this.up, f).mul(-1);
    s.normalize();
    s.mul(this.speed);
    this.eye.add(s);
    this.at.add(s);
    this.updateMatrices();
  }
  rotate(xAlpha, yAlpha, zAlpha) {
    let rotationMatrix = new Matrix4();
    rotationMatrix.rotate(zAlpha, 0, 0, 1);
    rotationMatrix.rotate(yAlpha, 0, 1, 0);
    rotationMatrix.rotate(xAlpha, 1, 0, 0);

    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    let f_prime = rotationMatrix.multiplyVector3(f);
    f_prime.normalize();
    this.at.set(this.eye);
    this.at.add(f_prime);
    this.updateMatrices();
  }

  panLeft(angle) {
    let alpha = angle ? angle : this.panAlpha;
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    let rotationMatrix = new Matrix4();
    rotationMatrix.setRotate(alpha,
                             this.up.elements[0], this.up.elements[1], this.up.elements[2]);
    let f_prime = rotationMatrix.multiplyVector3(f);
    f_prime.normalize();
    this.at.set(this.eye);
    this.at.add(f_prime);
    this.updateMatrices();
  }
  panRight(angle) {
    let alpha = angle ? angle : this.panAlpha;
    this.panLeft(-alpha);
  }
  panUp(angle) {
    let alpha = angle ? angle : this.panAlpha;
    let f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    let axis = Vector3.cross(f, this.up);
    let rotationMatrix = new Matrix4();
    rotationMatrix.setRotate(alpha,
                             axis.elements[0], axis.elements[1], axis.elements[2]);
    let f_prime = rotationMatrix.multiplyVector3(f);
    f_prime.normalize();
    this.at.set(this.eye);
    this.at.add(f_prime);
    this.updateMatrices();
  }
  panDown(angle) {
    let alpha = angle ? angle : this.panAlpha;
    this.panUp(-alpha);
  }

  changeFov(fov) {
    this.fov = fov;
    this.updateMatrices();
  }
}
