class Floor {
	constructor(x, y, z) {
		const depth = 1500;
		const length = 2000;
		const wallHeight = 1000;

		this.meshMaterials = []
		this.object = new THREE.Group();

		let floorMaterials = [new THREE.MeshBasicMaterial({color: 0x991717}),
							  new THREE.MeshPhongMaterial({color: 0x991717}),
							  new THREE.MeshLambertMaterial({color: 0x991717})];
		let floorGeometry = new THREE.BoxGeometry(length, 5, depth);
		let floorMesh = new THREE.Mesh(floorGeometry);

		// Add floor mesh
		this.meshMaterials.push(new MeshMaterials(floorMesh, floorMaterials));

		let wallMaterials = [new THREE.MeshBasicMaterial({color: 0xe3e3e3}),
							 new THREE.MeshPhongMaterial({color: 0xe3e3e3}),
							 new THREE.MeshLambertMaterial({color: 0xe3e3e3})];

		let wallGeometry = new THREE.BoxGeometry(length, 5, wallHeight);
		let wallMesh = new THREE.Mesh(wallGeometry);
		wallMesh.rotation.x = Math.PI/2;
		wallMesh.position.z = -depth/2;
		wallMesh.position.y = wallHeight/2;

		// Add 1 wall
		this.meshMaterials.push(new MeshMaterials(wallMesh, wallMaterials));

		wallGeometry = new THREE.BoxGeometry(wallHeight, 5, depth);
		wallMesh = new THREE.Mesh(wallGeometry);
		wallMesh.rotation.z = Math.PI/2;
		wallMesh.position.x = length/2;
		wallMesh.position.y = wallHeight/2;

		// Add the other wall to the first instance
		this.meshMaterials[1].addMesh(wallMesh);

		this.object.position.set(x, y - 2.5, z);

		let object = this.object;

		this.meshMaterials.forEach(function(mesh){
										mesh.addToObject(object);
										mesh.update();
									});
	}

	update(){
		this.meshMaterials.forEach(mesh => mesh.update());
	}

	getObject3D() {
		return this.object;
	}
}
