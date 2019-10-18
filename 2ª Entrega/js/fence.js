class Fence {
  constructor(x, y, z) {
    this.object = new THREE.Object3D();
    this.height = 80;
    this.width = 60;
    this.length = 1200;
    let geometry = new THREE.BoxGeometry(this.length, this.height, this.width);
    let material = new THREE.MeshBasicMaterial({color: 0x5F381C});
    //0x613A1F
    let mesh = new THREE.Mesh(geometry, material);
    this.object.add(mesh);
 
    mesh.position.set(x, y, z);
  }

  getObject3D() {
    return this.object;
  }
}
