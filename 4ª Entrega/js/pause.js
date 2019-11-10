class Pause {
	constructor(x, y, z) {
		let width = 2000;
		let height = 2000;

		let geometry = new THREE.PlaneGeometry(width, height);
		let material = new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("pause.png")), transparent: true});
		this.object = new THREE.Mesh(geometry, material);

		this.object.position.set(x, y, z);
	}

	toggleWireframe() {
		this.object.material.wireframe = !this.object.material.wireframe;
	}

	updateMeshMaterials() {
		// Only has 1 material
	}

	getObject3D() {
		return this.object;
	}
}
