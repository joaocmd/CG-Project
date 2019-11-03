class Board {
	constructor(x, y, z) {
		this.size = 3000;
		this.frameHeight = 30;
		this.frameWidth =  300;

		this.meshMaterials = []
		this.object = new THREE.Group();

		// Board
		let boardMaterials = [new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("chess.jpg")),
														   bumpMap: textureLoader.load(getTexture("wood_grain.jpg"))}),
							  new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("chess.jpg")),
														   bumpMap: textureLoader.load(getTexture("wood_grain.jpg"))})];
		let boardGeometry = new THREE.PlaneGeometry(this.size, this.size, 100, 100);
		let boardMesh = new THREE.Mesh(boardGeometry, boardMaterials);
		boardMesh.receiveShadow = true;
		boardMesh.rotation.x = -Math.PI/2;
		this.meshMaterials.push(new MeshMaterials(boardMesh, boardMaterials));


		// Frames
		let frameMaterials = [new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("wood_diffuse.jpg")),
														   bumpMap: textureLoader.load(getTexture("wood_bump.png"))}),
							  new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("wood_diffuse.jpg")),
														   bumpMap: textureLoader.load(getTexture("wood_bump.png"))})];
		this.meshMaterials.push(new MeshMaterials([], frameMaterials));

		this.createLongFrame(0, 0, this.size/2 + this.frameWidth/2);
		this.createLongFrame(0, 0, -(this.size/2 + this.frameWidth/2));
		this.createShortFrame(this.size/2 + this.frameWidth/2, 0, 0);
		this.createShortFrame(-(this.size/2 + this.frameWidth/2), 0, 0);

		this.object.position.set(x, y, z);

		let object = this.object;
		this.meshMaterials.forEach(function(mesh){
										mesh.addToObject(object);
										mesh.update(useMaterial);
									});
	}

	createLongFrame(x, y, z) {
		let frameGeometry = new THREE.BoxGeometry(this.size + 2*this.frameWidth, this.frameHeight, this.frameWidth, 10, 10);
		let mesh = new THREE.Mesh(frameGeometry);
		mesh.position.set(x, y, z);
		this.meshMaterials[1].addMesh(mesh);
	}

	createShortFrame(x, y, z) {
		let frameGeometry = new THREE.BoxGeometry(this.frameWidth, this.frameHeight, this.size, 10, 10);
		let mesh = new THREE.Mesh(frameGeometry);
		mesh.position.set(x, y, z);
		this.meshMaterials[1].addMesh(mesh);
	}

	updateMeshMaterials(materialIndex){
		this.meshMaterials.forEach(meshMaterial => meshMaterial.update(materialIndex));
	}

	getObject3D() {
		return this.object;
	}
}
