class Floor {
  constructor(x, y, z) {
    this.object = new THREE.Object3D();
    let geometry = new THREE.BoxGeometry(1150, 5, 1180);
    let material = new THREE.MeshBasicMaterial({color: 0x202020});
    let mesh = new THREE.Mesh(geometry, material);
    this.object.add(mesh);
 
    this.object.position.set(x, y - 30 - 2.5, z);
  }

  getObject3D() {
    return this.object;
  }
}
