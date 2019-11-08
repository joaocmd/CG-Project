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
							  new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("chess.jpg"))})];
		let boardGeometry = new THREE.PlaneGeometry(this.size, this.size);
		let boardMesh = new THREE.Mesh(boardGeometry);
		boardMesh.receiveShadow = true;
		boardMesh.rotation.x = -Math.PI/2;
		this.meshMaterials.push(new MeshMaterials(boardMesh, boardMaterials));


		// Frames
		let tileFactor = 0.1;
		let woodMap = textureLoader.load(getTexture("wood_diffuse.jpg"));
		let aspect = (this.size + 2*this.frameWidth)/this.frameWidth;
		woodMap.wrapS = woodMap.wrapT = THREE.RepeatWrapping;
		woodMap.repeat.set(aspect * tileFactor, tileFactor);
		let frameMaterials = [new THREE.MeshPhongMaterial({map: woodMap,
														   bumpMap: textureLoader.load(getTexture("wood_bump.png"))}),
							  	  new THREE.MeshBasicMaterial({map: woodMap})];
		this.meshMaterials.push(new MeshMaterials([], frameMaterials));
		this.createLongFrame(0, 0, this.size/2 + this.frameWidth/2);
		this.createLongFrame(0, 0, -(this.size/2 + this.frameWidth/2));

		woodMap = textureLoader.load(getTexture("wood_diffuse.jpg"));
		aspect = this.frameWidth/this.size;
		woodMap.wrapS = woodMap.wrapT = THREE.RepeatWrapping;
		woodMap.repeat.set(tileFactor, tileFactor/aspect);
		frameMaterials = [new THREE.MeshPhongMaterial({map: woodMap,
														   bumpMap: textureLoader.load(getTexture("wood_bump.png"))}),
							  	  new THREE.MeshBasicMaterial({map: woodMap})];
		this.meshMaterials.push(new MeshMaterials([], frameMaterials));
		this.createLongFrame(0, 0, this.size/2 + this.frameWidth/2);
		
		this.createShortFrame(this.size/2 + this.frameWidth/2, 0, 0);
		this.createShortFrame(-(this.size/2 + this.frameWidth/2), 0, 0);

		this.object.position.set(x, y, z);

		let object = this.object;
		this.meshMaterials.forEach(mesh => mesh.addToObject(object));
		this.updateMeshMaterials(useMaterial);
	}

	createLongFrame(x, y, z) {
		let frameGeometry = new THREE.BoxGeometry(this.size + 2*this.frameWidth, this.frameHeight, this.frameWidth);
		let mesh = new THREE.Mesh(frameGeometry);
		mesh.receiveShadow = true;
		mesh.position.set(x, y, z);
		this.meshMaterials[1].addMesh(mesh);
	}

	createShortFrame(x, y, z) {
		let frameGeometry = new THREE.BoxGeometry(this.frameWidth, this.frameHeight, this.size);
		let mesh = new THREE.Mesh(frameGeometry);
		mesh.receiveShadow = true;
		mesh.position.set(x, y, z);
		this.meshMaterials[2].addMesh(mesh);
	}

	updateMeshMaterials(materialIndex){
		this.meshMaterials.forEach(meshMaterial => meshMaterial.update(materialIndex));
	}

	toggleWireframe() {
		this.meshMaterials.forEach(meshMaterial => meshMaterial.toggleWireFrame());
	}

	getObject3D() {
		return this.object;
	}
}
