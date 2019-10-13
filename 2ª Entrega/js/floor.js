class Floor {
  constructor(x, y, z) {
    this.object = new THREE.Object3D();
    let geometry = new THREE.BoxGeometry(500, 10, 500);
    let material = new THREE.MeshBasicMaterial({color: 0x780000});
    let mesh = new THREE.Mesh(geometry, material);
    this.object.add(mesh);
 
    this.object.position.set(x, y - 5, z);
  }

  getObject3D() {
    return this.object;
  }
}
