class MeshMaterials {
	constructor(meshes, materials) {
		this.meshes = meshes
		this.materials = materials
	}

	addToObject(object) {
		this.meshes.forEach(mesh => object.add(mesh));
	}

	update(){
		this.meshes.forEach(mesh => mesh.material = this.materials[useMaterial]);
	}
}
