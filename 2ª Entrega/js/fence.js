const FENCE_HEIGHT = 80
const FENCE_WIDTH = 60
const FENCE_LENGTH = 1200

class Fence {
  constructor(x, y, z) {
    this.object = new THREE.Object3D();
    let geometry = new THREE.BoxGeometry(FENCE_LENGTH, FENCE_HEIGHT, FENCE_WIDTH);
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
