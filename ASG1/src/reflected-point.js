class ReflectedPoints {
    constructor(){
	this.type='point';
	this.position = [0.0, 0.0, 0.0];
	this.color = [1.0,1.0,1.0,1.0];
	this.size = 5.0;
    }

    render(){
	let point1 = new Point();
	point1.position = this.position;
	point1.color = this.color;
	point1.size = this.size;
	point1.render();
	let point2 = new Point();
	point2.position = [-this.position[0], this.position[1]];
	point2.color = [1.0 - this.color[0], this.color[1], this.color[2], this.color[3]];
	point2.size = this.size;
	point2.render();
	let point3 = new Point();
	point3.position = [-this.position[0], -this.position[1]];
	point3.color = [this.color[0], 1.0 - this.color[1], this.color[2], this.color[3]];
	point3.size = this.size;
	point3.render();
	let point4 = new Point();
	point4.position = [this.position[0], -this.position[1]];
	point4.color = [this.color[0], this.color[1], 1.0 - this.color[2], this.color[3]];
	point4.size = this.size;
	point4.render();
	let point5 = new Point();
	point5.position = [this.position[1], this.position[0]];
	point5.color = this.color;
	point5.size = this.size;
	point5.render();
	let point6 = new Point();
	point6.position = [-this.position[1], this.position[0]];
	point6.color = [1.0 - this.color[0], this.color[1], this.color[2], this.color[3]];
	point6.size = this.size;
	point6.render();
	let point7 = new Point();
	point7.position = [-this.position[1], -this.position[0]];
	point7.color = [this.color[0], 1.0 - this.color[1], this.color[2], this.color[3]];
	point7.size = this.size;
	point7.render();
	let point8 = new Point();
	point8.position = [this.position[1], -this.position[0]];
	point8.color = [this.color[0], this.color[1], 1.0 - this.color[2], this.color[3]];
	point8.size = this.size;
	point8.render();
    }
}
