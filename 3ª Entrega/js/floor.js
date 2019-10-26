class Floor {
  constructor(x, y, z) {
    const depth = 1500;
    const length = 2000;
    const wallHeight = 1000;

    this.meshesMaterials = []
    this.object = new THREE.Group();

    let floorMaterials = [
      new THREE.MeshBasicMaterial({color: 0x991717}),
      new THREE.MeshLambertMaterial({color: 0x991717})
    ];
    let floorGeometry = new THREE.BoxGeometry(length, 5, depth);
    let floorMesh = new THREE.Mesh(floorGeometry);
    this.meshesMaterials.push(new MeshMaterials([floorMesh], floorMaterials));
    

    let wallMeshMaterials = new MeshMaterials([], [
      new THREE.MeshBasicMaterial({color: 0xe3e3e3}),
      new THREE.MeshLambertMaterial({color: 0xe3e3e3})
    ]);
    this.meshesMaterials.push(wallMeshMaterials);

    let wallGeometry = new THREE.BoxGeometry(length, 5, wallHeight);
    let wallMesh = new THREE.Mesh(wallGeometry);
    wallMesh.rotation.x = Math.PI/2;
    wallMesh.position.z = -depth/2;
    wallMesh.position.y = wallHeight/2;
    wallMeshMaterials.meshes.push(wallMesh);

    wallGeometry = new THREE.BoxGeometry(wallHeight, 5, depth);
    wallMesh = new THREE.Mesh(wallGeometry);
    wallMesh.rotation.z = Math.PI/2;
    wallMesh.position.x = length/2;
    wallMesh.position.y = wallHeight/2;
    wallMeshMaterials.meshes.push(wallMesh);

    this.object.position.set(x, y - 2.5, z);

    AddMeshMaterialsToObject(this.meshesMaterials, this.object);
    UpdateMeshMaterials(this.meshesMaterials);
  }

  getObject3D() {
    return this.object;
  }
}
