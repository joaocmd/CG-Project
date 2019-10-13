class Fence {
  constructor(x, y, z) {
    this.object = new THREE.Object3D();
    let geometry = new THREE.BoxGeometry(1200, 80, 60);
    let material = new THREE.MeshBasicMaterial({color: 0x0ff});
    let mesh = new THREE.Mesh(geometry, material);
    this.object.add(mesh);
 
    mesh.position.set(x, y, z);
  }

  getObject3D() {
    return this.object;
  }
}
