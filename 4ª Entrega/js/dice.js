const ROTATION_DICE = 1.5 * Math.PI;
const UP_VECTOR = new THREE.Vector3(0, 1, 0);

class Dice {
	constructor(x, y, z) {
		const size = 200;

		this.object = new THREE.Group();

		let materials =
		[
			[
				new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("face1.jpg")),
											bumpMap: textureLoader.load(getTexture("face1.jpg"))}),
				new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("face6.jpg")),
											bumpMap: textureLoader.load(getTexture("face6.jpg"))}),
				new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("face3.jpg")),
											bumpMap: textureLoader.load(getTexture("face3.jpg"))}),
				new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("face4.jpg")),
											bumpMap: textureLoader.load(getTexture("face4.jpg"))}),
				new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("face5.jpg")),
											bumpMap: textureLoader.load(getTexture("face5.jpg"))}),
				new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("face2.jpg")),
											bumpMap: textureLoader.load(getTexture("face2.jpg"))}),
			],
			[
				new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("face1.jpg"))}),
				new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("face6.jpg"))}),
				new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("face3.jpg"))}),
				new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("face4.jpg"))}),
				new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("face5.jpg"))}),
				new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("face2.jpg"))}),
			],
		]


		let geometry = new THREE.BoxGeometry(size, size, size);
		let mesh = new THREE.Mesh(geometry);
		mesh.castShadow = true;
		mesh.rotation.x = -Math.PI/2;

		this.meshMaterials = new MeshMaterials(mesh, materials);
		this.meshMaterials.addToObject(this.object);
		this.updateMeshMaterials(useMaterial);

		this.restart();
		this.object.position.set(x, y, z);
	}

	updateMeshMaterials(materialIndex){
		this.meshMaterials.update(materialIndex);
	}

	toggleWireframe() {
		this.meshMaterials.toggleWireFrame();
	}

	update() {
		this.object.rotateOnWorldAxis(UP_VECTOR, ROTATION_DICE * time_deltaTime);
	}

	restart() {
		this.object.rotation.set(35*Math.PI/180, 0, Math.PI/4);
	}

	getObject3D() {
		return this.object;
	}
}
