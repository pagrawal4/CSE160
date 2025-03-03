class Robot {
    constructor(){
        this.type = 'robot';
        this.upperRightLegAngle=0;
        this.upperLeftLegAngle=0;
        this.lowerRightLegAngle=0;
        this.lowerLeftLegAngle=0;
        this.upperRightArmAngle=-45;
        this.upperLeftArmAngle=-45;
        this.lowerRightArmAngle=90;
        this.lowerLeftArmAngle=90;
        this.rightFeetAngle=0;
        this.leftFeetAngle=0;
        this.rightHandAngle=0;
        this.leftHandAngle=0;
        this.moveXPosition=0;
        this.moveYPosition=1;
    }

    updateAnimationAngles() {
        if (g_tickNum == -1) {
            this.moveXPosition += -50;
            this.moveYPosition += 1*Math.sin(3*g_time);
        }
        this.upperRightLegAngle = 35*Math.sin(3*g_time) + 5;
        this.upperLeftLegAngle = -35*Math.sin(3*g_time) + 5;
        this.lowerRightLegAngle = -Math.abs((20*Math.sin(3*g_time)));
        this.lowerLeftLegAngle = -Math.abs((20*Math.sin(3*g_time)));
      
        this.upperRightArmAngle = -45*Math.sin(3*g_time);
        this.upperLeftArmAngle = 45*Math.sin(3*g_time);
        this.lowerRightArmAngle = Math.abs((20*Math.sin(3*g_time)));
        this.lowerLeftArmAngle = Math.abs((20*Math.sin(3*g_time)));
      
        this.moveXPosition += 0.5;
        if (this.moveXPosition > 350) this.moveXPosition = -50 ;
        g_tickNum++;
    }

  
    updateAnimationAnglesMoonWalk() {
        if (g_tickNum == -1) {
            this.moveXPosition += 350;
            this.moveYPosition += 2; // *Math.sin(3*g_time);
        }
        this.upperRightLegAngle = 20*Math.sin(3*g_time)-5;
        this.upperLeftLegAngle = -20*Math.sin(3*g_time)-5;
        this.lowerRightLegAngle = -Math.abs((20*Math.sin(3*g_time)));
        this.lowerLeftLegAngle = -Math.abs((20*Math.sin(3*g_time)));

        this.upperRightArmAngle=-45;
        this.lowerRightArmAngle=90;
        this.upperLeftArmAngle = 90;
        this.lowerLeftArmAngle=90;

        this.rightFeetAngle = (this.upperRightLegAngle + this.lowerRightLegAngle);
        this.leftFeetAngle = (this.upperLeftLegAngle + this.lowerLeftLegAngle);

        this.moveXPosition -= 0.5;
        if (this.moveXPosition < -350) this.moveXPosition = 350;
        g_tickNum++;
    }


    render() {

        // V IMP: The transformation that is specified first is the last transformation 
        // on the points!!!

        // BODY

        let baseBodyM = new Matrix4();
        baseBodyM.translate(-6,2.3,0).scale(1.2,1.2,1.2);
        baseBodyM.translate(this.moveXPosition/100, this.moveYPosition/100, 0);// -0.1, -0.25, -0.15);
        //baseBodyM.rotate(g_time*10, 0, 1, 0);

        // Scale and draw body
        let bodyM = new Matrix4(baseBodyM).scale(0.35, 0.5, 0.3);
        let bodyC = [1, 0, 0, 1];
        drawCube(bodyM, bodyC);

        // HEAD and HAT

        // Set reference for head
        let baseHeadM = new Matrix4(baseBodyM).translate(0, 0.425, 0);

        // Scale and draw head
        let headM = new Matrix4(baseHeadM);
        headM.scale(0.3, 0.25, 0.27);
        let headC = [0.9, 0.9, 0.9, 1];
        drawCube(headM, headC);

        // Set reference for neck
        let neckM = new Matrix4(baseBodyM).translate(0, 0.375, 0);
        // Scale and draw neck
        neckM.scale(0.18, 0.35, 0.18);
        let neckC = [0.6, 0.6, 0.6, 1];
        drawCube(neckM, neckC);

        // Set reference for right ear
        let rightEarM = new Matrix4(baseHeadM).translate(0, 0, -0.15);
        // Scale and draw rightEar
        rightEarM.scale(0.045, 0.125, 0.06);
        let rightEarC = [1, 0.9, 0.1, 1];
        drawCube(rightEarM, rightEarC);

        // Set reference for left ear
        let leftEarM = new Matrix4(baseHeadM).translate(0, 0, 0.15);
        // Scale and draw leftEar
        leftEarM.scale(0.045, 0.125, 0.06);
        let leftEarC = [1, 0.9, 0.1, 1];
        drawCube(leftEarM, leftEarC);

        // Set reference for nose
        /*
        let noseM = new Matrix4(baseHeadM).translate(0.18, 0.04, 0);
        //noseM.rotate(25, 0, 0, 1);
        noseM.rotate(-90, 0, 1, 0);
        // Scale and draw nose
        noseM.scale(0.05, 0.125, 0.075);
        let noseC = [1, 0.8, 0, 1];
        drawTriangularPrism(noseM, noseC);
        */

        // Set reference for right eye
        let rightEyeM = new Matrix4(baseHeadM).translate(0.15, 0.04, -0.08);
        // Scale and draw rightEye
        rightEyeM.scale(0.02, 0.08, 0.06);
        let rightEyeC = [0, 0, 0, 1];
        drawCube(rightEyeM, rightEyeC);

        // Set reference for left eye
        let leftEyeM = new Matrix4(baseHeadM).translate(0.15, 0.04, 0.08);
        // Scale and draw leftEye
        leftEyeM.scale(0.02, 0.08, 0.06);
        let leftEyeC = [0, 0, 0, 1];
        drawCube(leftEyeM, leftEyeC);

        // Set reference for mouth
        let mouthM = new Matrix4(baseHeadM).translate(0.15, -0.05, 0.00);
        // Scale and draw mouth
        mouthM.scale(0.08, 0.02, 0.15);
        let mouthC = [0, 0, 0, 1];
        drawCube(mouthM, mouthC);

        // HAT

        // Set reference for brim of hat
        let brimM = new Matrix4(baseHeadM).translate(0, 0.15, 0);
        // Scale and draw brim
        brimM.scale(0.54, 0.05, 0.54);
        let brimC = [1, 0, 0, 1];
        drawCube(brimM, brimC);

        // Set reference for hat
        let hatM = new Matrix4(baseHeadM).translate(0, 0.275, 0);
        // Scale and draw hat
        hatM.scale(0.3, 0.20, 0.3);
        let hatC = [1, 0, 0, 1];
        drawCube(hatM, hatC);

        // RIGHT LEG

        // Set reference for upper right leg
        let rightUpperLegM = new Matrix4(baseBodyM).translate(0, -0.2, -0.1);
        // Rotate and translate right leg
        let rightUpperLegC = [0, 1, 1, 1];
        rightUpperLegM.rotate( this.upperRightLegAngle, 0, 0, 1);
        rightUpperLegM.translate(0.0, -0.1, 0.01);

        // Set reference for lower right leg
        let rightLowerLegM = new Matrix4(rightUpperLegM).translate(0.06, -0.25, 0);
        rightUpperLegM.scale(0.12, 0.5, 0.11);

        // Scale and translate left leg
        let rightLowerLegC = [0, 1, 1, 1];
        rightLowerLegM.rotate( this.lowerRightLegAngle, 0, 0, 1);
        rightLowerLegM.translate(-0.06, -0.2, 0);

        drawCube(rightUpperLegM, rightUpperLegC);

        // Set reference for right feet
        let rightFeetM = new Matrix4(rightLowerLegM).translate(-0.06, -0.2, 0);
        rightLowerLegM.scale(0.12, 0.4, 0.10);
        drawCube(rightLowerLegM, rightLowerLegC);

        // Scale and translate left feet
        let rightFeetC = [0, 0, 1, 1];
        rightFeetM.rotate( this.rightFeetAngle, 0, 0, 1);
        rightFeetM.translate(0.1, 0.0, 0);

        rightFeetM.scale(0.25, 0.11, 0.101);
        drawCube(rightFeetM, rightFeetC);

        // LEFT LEG

        let leftUpperLegM = new Matrix4(baseBodyM).translate(0, -0.2, 0.1);
        // Rotate and translate left leg
        let leftUpperLegC = [0, 1, 1, 1];
        leftUpperLegM.rotate( this.upperLeftLegAngle, 0, 0, 1);
        leftUpperLegM.translate(0.0, -0.1, -0.01);

        let leftLowerLegM = new Matrix4(leftUpperLegM).translate(0.06, -0.25, 0);
        leftUpperLegM.scale(0.12, 0.5, 0.11);

        // Scale and translate right leg
        let leftLowerLegC = [0, 1, 1, 1];
        leftLowerLegM.rotate( this.lowerLeftLegAngle, 0, 0, 1);
        leftLowerLegM.translate(-0.06, -0.2, 0);

        drawCube(leftUpperLegM, leftUpperLegC);

        let leftFeetM = new Matrix4(leftLowerLegM).translate(-0.06, -0.2, 0);

        leftLowerLegM.scale(0.12, 0.4, 0.10);
        drawCube(leftLowerLegM, leftLowerLegC);

        // Scale and translate right feet
        let leftFeetC = [0, 0, 1, 1];
        leftFeetM.rotate( this.leftFeetAngle, 0, 0, 1);
        leftFeetM.translate(0.1, 0.0, 0);

        leftFeetM.scale(0.25, 0.11, 0.101);
        drawCube(leftFeetM, leftFeetC);

        // ARMS

        // RIGHT ARM

        // Set reference for upper right arm
        let rightUpperArmM = new Matrix4(baseBodyM).translate(0, 0.2, -0.21);
        // Rotate and translate right arm
        let rightUpperArmC = [0, 0, 1, 1];
        rightUpperArmM.rotate( this.upperRightArmAngle, 0, 0, 1);
        rightUpperArmM.translate(0.0, -0.16, 0.01);

        // Set reference for lower right arms
        let rightLowerArmM = new Matrix4(rightUpperArmM).translate(-0.06, -0.16, 0);
        rightUpperArmM.scale(0.12, 0.32, 0.11);

        // Scale and translate left arm
        let rightLowerArmC = [0, 0, 1, 1];
        rightLowerArmM.rotate( this.lowerRightArmAngle, 0, 0, 1);
        rightLowerArmM.translate(0.06, -0.16, 0);

        drawCube(rightUpperArmM, rightUpperArmC);

        let rightHandM = new Matrix4(rightLowerArmM).translate(0, -0.16, 0);

        rightLowerArmM.scale(0.12, 0.32, 0.10);
        drawCube(rightLowerArmM, rightLowerArmC);

        // Scale and translate right hand
        let rightHandC = [0.9, 0.9, 0.9, 1];
        rightHandM.rotate(this.rightHandAngle, 0, 0, 1);
        //rightHandM.translate(0.1, 0.05, 0);

        rightHandM.scale(0.09, 0.09, 0.09);
        drawCube(rightHandM, rightHandC);

        // LEFT ARM

        // Set reference for upper left and left arms
        let leftUpperArmM = new Matrix4(baseBodyM).translate(0, 0.2, 0.21);
        // Rotate and translate left arm
        let leftUpperArmC = [0, 0, 1, 1];
        leftUpperArmM.rotate( this.upperLeftArmAngle, 0, 0, 1);
        leftUpperArmM.translate(0.0, -0.16, -0.01);

        // Set reference for lower left and left arms
        let leftLowerArmM = new Matrix4(leftUpperArmM).translate(-0.06, -0.16, 0);
        leftUpperArmM.scale(0.12, 0.32, 0.11);

        // Scale and translate left arm
        let leftLowerArmC = [0, 0, 1, 1];
        leftLowerArmM.rotate( this.lowerLeftArmAngle, 0, 0, 1);
        leftLowerArmM.translate(0.06, -0.16, 0);

        drawCube(leftUpperArmM, leftUpperArmC);

        let leftHandM = new Matrix4(leftLowerArmM).translate(0, -0.16, 0);

        leftLowerArmM.scale(0.12, 0.32, 0.10);
        drawCube(leftLowerArmM, leftLowerArmC);

        // Scale and translate left hand
        let leftHandC = [0.9, 0.9, 0.9, 1];
        leftHandM.rotate(this.leftHandAngle, 0, 0, 1);
        //leftHandM.translate(0.1, 0.05, 0);
        leftHandM.scale(0.09, 0.09, 0.09);
        drawCube(leftHandM, leftHandC);

    }

}

