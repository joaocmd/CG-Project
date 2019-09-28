class Pillar {
	constructor(x, y, z) {
		this.object = new THREE.Object3D();
		let material = new THREE.MeshBasicMaterial({color: 0x04290c});

    // Create Cylinder
    var addCylinder = (function(obj, mat, x = 0, y = 0, z = 0) {
      let geometry = new THREE.CylinderGeometry(6, 6, 40, 8);
      let mesh = new THREE.Mesh(geometry, mat);

      mesh.position.set(x, y, z);
      obj.add(mesh);
    });
    addCylinder(this.object, material);
    this.object.position.set(x, y, z);
  }

	getObject3D() {
		return this.object;
	}
}
