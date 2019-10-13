var SEL_COLOR = 0x0E6606;
var CAN_COLOR = 0x780000;

class Cannon {
	constructor(x, y, z){
		this.selected = false;

		this.object = new THREE.Group();
		let geometry = new THREE.CylinderGeometry(25, 25, 175);
		let material = new THREE.MeshBasicMaterial({color: CAN_COLOR});
		this.mesh = new THREE.Mesh(geometry, material);

		this.object.add(this.mesh);

		this.object.position.set(x, y, z);

	//	mesh.position.set(0, 40, 40);
		this.mesh.rotation.x = Math.PI / 2;
		this.mesh.translateY(50);

		this.addWheel(36, 0, 0);
		this.addWheel(-36, 0, 0);

		let axis = new THREE.CylinderGeometry(10, 10, 72, 8, 1);
		let material2 =  new THREE.MeshBasicMaterial();
		let mesh = new THREE.Mesh(axis, material2);

		mesh.rotation.z = Math.PI / 2;
		this.object.add(mesh);
	}

	addWheel(x, y, z){
		let geometry = new THREE.CylinderGeometry(45, 45, 7, 16, 1);
		let material = new THREE.MeshBasicMaterial({color: 0x0F0});
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

	update(){

	}

	getObject3D(){
		return this.object;
	}
}
