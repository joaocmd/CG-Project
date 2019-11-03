class MeshMaterials {
	constructor(mesh, materials) {
		if(Array.isArray(mesh)){
			this.meshes = mesh;
		}else{
			this.meshes = [mesh];
		}

		this.materials = materials;
	}

	addToObject(object) {
		this.meshes.forEach(mesh => object.add(mesh));
	}

	addMesh(mesh){
		this.meshes.push(mesh);
	}

	update(materialIndex){
		this.meshes.forEach(mesh => mesh.material = this.materials[materialIndex]);
	}
}
