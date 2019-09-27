class Cylinder {
	constructor(x, y, z) {
		this.object = new THREE.Object3D();
		this.material = new THREE.MeshBasicMaterial({color: 0x04290c});

    // Create Cylinder
    var addCylinder = (function(obj, mat, x = 0, y = 0, z = 0) {
      let geometry = new THREE.CylinderGeometry(6, 6, 42, 8);
      let mesh = new THREE.Mesh(geometry, mat);

      mesh.position.set(x, y, z);
      obj.add(mesh);
    });
    addCylinder(this.object, this.material);
    this.object.position.set(x, y, z);
  }

	getObject3D() {
		return this.object;
	}
}
