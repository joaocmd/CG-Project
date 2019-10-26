class MeshMaterials {
	constructor(meshes, materials) {
		this.meshes = meshes
		this.materials = materials
	}
}

function AddMeshMaterialsToObject(meshesMaterials, object) {
    meshesMaterials.forEach(meshMaterial => {
      meshMaterial.meshes.forEach(mesh => object.add(mesh))
    });
}

function UpdateMeshMaterials(meshesMaterials) {
	meshesMaterials.forEach(pair => {
		pair.meshes.forEach(mesh => mesh.material = pair.materials[useMaterial])
	});
}