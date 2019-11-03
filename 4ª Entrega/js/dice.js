const UP_VECTOR = new THREE.Vector3(0, 1, 0);

class Dice {
	constructor(x, y, z) {
		const size = 200;
		this.spinSpeed = Math.PI;

		this.object = new THREE.Group();

		// Board
		let materials = 
		[
			[
				new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("dice1.png")),
											bumpMap: textureLoader.load(getTexture("dice1.png"))}),
				new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("dice2.png")),
											bumpMap: textureLoader.load(getTexture("dice2.png"))}),
				new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("dice3.png")),
											bumpMap: textureLoader.load(getTexture("dice3.png"))}),
				new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("dice4.png")),
											bumpMap: textureLoader.load(getTexture("dice4.png"))}),
				new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("dice5.png")),
											bumpMap: textureLoader.load(getTexture("dice5.png"))}),
				new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("dice6.png")),
											bumpMap: textureLoader.load(getTexture("dice6.png"))}),
			],
			[
				new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("dice1.png"))}),
				new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("dice2.png"))}),
				new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("dice3.png"))}),
				new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("dice4.png"))}),
				new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("dice5.png"))}),
				new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("dice6.png"))}),
			],
		]


		let geometry = new THREE.BoxGeometry(size, size, size, 4, 4, 4);
		let mesh = new THREE.Mesh(geometry);
		mesh.receiveShadow = true;
		mesh.rotation.x = -Math.PI/2;

		this.meshMaterials = new MeshMaterials(mesh, materials);
		this.meshMaterials.addToObject(this.object);
		this.updateMeshMaterials(useMaterial);

		this.object.position.set(x, y, z);
		this.object.rotation.set(35*Math.PI/180, 0, Math.PI/4);
	}

	updateMeshMaterials(materialIndex){
		this.meshMaterials.update(materialIndex);
	}

	toggleWireframe() {
		this.meshMaterials.toggleWireFrame();
	}

	update() {
		this.object.rotateOnWorldAxis(UP_VECTOR, this.spinSpeed * time_deltaTime);
	}

	getObject3D() {
		return this.object;
	}
}
