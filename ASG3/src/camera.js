class Camera {
  constructor(){
    this.fov = 60.0; // field of view (angle width)
    this.eye = [0,0,0];
    this.at = [0,0,-1];
    this.up = [0,1, 0];
    this.viewMatrix = new Matrix4().setLookAt(g_eye[0],g_eye[1],g_eye[2], // eye positioned at
                                              g_at[0],g_at[1],g_at[2],    // eye looking at
                                              g_up[0],g_up[1],g_up[2]);   // direction of up

  // IMP: Right after setting the view matrix, the near and far things start
  // to cause issues with things clipping off of showiping up as transparent
  // Setting the perspective fixes this problem.
    this.projectionMatrix = new Matrix4().setPerspective(this.fov,  // angle width
                                                         canvas.width/canvas.height, // aspect ratio
                                                         0.1,   // near 
                                                         1000); // far
  }

  render(){ }
}
