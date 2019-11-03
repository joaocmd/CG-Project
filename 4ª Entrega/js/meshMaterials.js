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

	toggleWireFrame() {
		this.materials.forEach(mat => {
			// Check for multi materials
			if (Array.isArray(mat)) {
				mat.forEach(singleMat => {
					singleMat.wireframe = !singleMat.wireframe
				})
			} else {
				mat.wireframe = !mat.wireframe
			}
		});
	}

	update(materialIndex){
		this.meshes.forEach(mesh => mesh.material = this.materials[materialIndex]);
	}
}
