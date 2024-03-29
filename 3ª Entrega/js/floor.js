class Floor {
	constructor(x, y, z) {
		const depth = 1500;
		const length = 2200;
		const wallHeight = 1000;

		this.meshMaterials = []
		this.object = new THREE.Group();

		let floorMaterials = [new THREE.MeshPhongMaterial({color: 0x991717}),
							  new THREE.MeshLambertMaterial({color: 0x991717}),
							  new THREE.MeshBasicMaterial({color: 0x991717})];
		let floorGeometry = new THREE.PlaneGeometry(length, depth, 100, 100);
		let floorMesh = new THREE.Mesh(floorGeometry);
		floorMesh.receiveShadow = true;
		floorMesh.rotation.x = -Math.PI/2;

		// Add floor mesh
		this.meshMaterials.push(new MeshMaterials(floorMesh, floorMaterials));

		let wallMaterials = [new THREE.MeshPhongMaterial({color: 0xe3e3e3}),
							 new THREE.MeshLambertMaterial({color: 0xe3e3e3}),
							 new THREE.MeshBasicMaterial({color: 0xe3e3e3})];

		let wallGeometry = new THREE.PlaneGeometry(length, wallHeight, 100, 100);
		let wallMesh = new THREE.Mesh(wallGeometry);
		wallMesh.receiveShadow = true;
		wallMesh.position.z = -depth/2;
		wallMesh.position.y = wallHeight/2;

		// Add 1 wall
		this.meshMaterials.push(new MeshMaterials(wallMesh, wallMaterials));

		wallGeometry = new THREE.PlaneGeometry(wallHeight, depth, 100, 100);
		wallMesh = new THREE.Mesh(wallGeometry);
		wallMesh.receiveShadow = true;
		wallMesh.rotation.z = Math.PI/2;
		wallMesh.rotation.y = -Math.PI/2;
		wallMesh.position.x = length/2;
		wallMesh.position.y = wallHeight/2;

		// Add the other wall to the first instance
		this.meshMaterials.push(new MeshMaterials(wallMesh, wallMaterials));
		this.meshMaterials[1].addMesh(wallMesh);

		this.object.position.set(x, y - 2.5, z);

		let object = this.object;

		this.meshMaterials.forEach(function(mesh){
										mesh.addToObject(object);
										mesh.update(0);
									});
	}

	update(materialIndex){
		this.meshMaterials.forEach(mesh => mesh.update(materialIndex));
	}

	getObject3D() {
		return this.object;
	}
}
