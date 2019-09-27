class Target {
	constructor(x, y, z) {
		this.object = new THREE.Object3D();
		let material = new THREE.MeshBasicMaterial({color: 0x00678a});

    // Create Cylinder
    var addTarget = (function(obj, mat, x = 0, y = 0, z = 0) {
      let geometry = new THREE.TorusGeometry(6, 2, 10, 10);
      let mesh = new THREE.Mesh(geometry, mat);

      mesh.position.set(x, y, z);
      obj.add(mesh);
    });
    addTarget(this.object, material);
    this.object.position.set(x, y, z);
  }

	getObject3D() {
		return this.object;
	}
}
