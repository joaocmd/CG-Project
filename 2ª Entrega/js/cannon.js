var SEL_COLOR = 0xAAAAAA;
var CAN_COLOR = 0x333333;

const CAN_REL_TIME = 0.5
const CAN_ROT_SPEED = Math.PI / 4

class Cannon {
	constructor(x, y, z){
		this.currReloadTime = CAN_REL_TIME;

		this.selected = false;

		this.object = new THREE.Group();
		let geometry = new THREE.CylinderGeometry(35, 35, 175);
		let material = new THREE.MeshBasicMaterial({color: CAN_COLOR});
		this.mesh = new THREE.Mesh(geometry, material);

		this.object.add(this.mesh);

		this.object.position.set(x, y, z);

	//	mesh.position.set(0, 40, 40);
		this.mesh.rotation.x = -(Math.PI / 2);
		this.mesh.translateY(50);

		this.addWheel(48, 0, 0);
		this.addWheel(-48, 0, 0);

		let axis = new THREE.CylinderGeometry(10, 10, 96, 8, 1);
		let material2 =  new THREE.MeshBasicMaterial();
		let mesh = new THREE.Mesh(axis, material2);

		mesh.rotation.z = Math.PI / 2;
		this.object.add(mesh);
	}

	addWheel(x, y, z){
		let geometry = new THREE.CylinderGeometry(45, 45, 10, 16, 1);
		let material = new THREE.MeshBasicMaterial({color: 0x613A1F});
		let mesh = new THREE.Mesh(geometry, material);

		mesh.rotation.z = Math.PI / 2;

		mesh.position.set(x, y, z);
		this.object.add(mesh);
	}

	setColor(color){
		this.mesh.material.color.setHex(color);
	}

	select(){
		this.selected = true;
		this.setColor(SEL_COLOR);
	}

	unselect(){
		this.selected = false;
		this.setColor(CAN_COLOR);
	}

	shoot() {
		let direction = this.object.getWorldDirection().negate();

		let ball = new Ball(0, 0, 0, time_lastFrame);
		ball.getObject3D().position.copy(this.object.position).add(direction.clone().multiplyScalar(180));
		ball.getObject3D().rotation.copy(this.object.rotation);

		ball.setVelocityVector(direction.multiplyScalar(randFloat(600, 1500)));
		scene.add(ball.object);
		balls.push(ball);
		objects.push(ball);
		this.currReloadTime = CAN_REL_TIME;
	}

	update(){
		this.currReloadTime -= time_deltaTime;
		if(this.selected){
			if(input_getKey(37)){
				this.object.rotation.y += CAN_ROT_SPEED * time_deltaTime;
			}
			if(input_getKey(39)){
				this.object.rotation.y -= CAN_ROT_SPEED * time_deltaTime;
			}

			if(input_getKey(32)) {
				if (this.currReloadTime <= 0) {
					this.shoot();
				}
			}
		}
	}

	getObject3D(){
		return this.object;
	}
}
