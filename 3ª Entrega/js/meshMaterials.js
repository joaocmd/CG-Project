class MeshMaterials {
	constructor(meshes, materials) {
		this.meshes = meshes
		this.materials = materials
	}

	addToObject(object) {
		this.meshesMaterials.forEach(mesh => object.add(mesh));
	}

	updateMeshMaterials(){
		this.meshes.forEach(mesh => mesh.material = pair.materials[useMaterial]);
	}
}
