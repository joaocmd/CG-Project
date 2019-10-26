class Floor {
  constructor(x, y, z) {
    const width = 1350;
    const length = 2000;
    const wallHeight = 1000;

    this.object = new THREE.Group();
    let floorGeometry = new THREE.BoxGeometry(length, 5, width);
    this.floorPhongMaterial = new THREE.MeshBasicMaterial({color: 0x991717});
    this.floorLambertMaterial = new THREE.MeshLambertMaterial({color: 0x991717});
    
    this.floorMesh = new THREE.Mesh(floorGeometry, this.floorPhongMaterial);
    this.object.add(this.floorMesh);

    this.wallPhongMaterial = new THREE.MeshBasicMaterial({color: 0xe3e3e3});
    this.wallLambertMaterial = new THREE.MeshLambertMaterial({color: 0xe3e3e3});


    let wallGeometry = new THREE.BoxGeometry(length, 5, wallHeight);
    this.wallMesh1 = new THREE.Mesh(wallGeometry, this.wallPhongMaterial);
    this.object.add(this.wallMesh1);
    this.wallMesh1.rotation.x = Math.PI/2;
    this.wallMesh1.position.z = -width/2;
    this.wallMesh1.position.y = wallHeight/2;

    wallGeometry = new THREE.BoxGeometry(wallHeight, 5, width);
    this.wallMesh2 = new THREE.Mesh(wallGeometry, this.wallPhongMaterial);
    this.object.add(this.wallMesh2);
    this.wallMesh2.rotation.z = Math.PI/2;
    this.wallMesh2.position.x = length/2;
    this.wallMesh2.position.y = wallHeight/2;

    this.object.position.set(x, y - 30 - 2.5, z);
    //this.updateMaterial();
  }

  updateMaterial () {
    this.floorMesh.material = usePhong ? this.floorPhongMaterial : this.floorLambertMaterial;
    this.wallMesh1.material = usePhong ? this.wallPhongMaterial : this.wallLambertMaterial;
    this.wallMesh2.material = usePhong ? this.wallPhongMaterial : this.wallLambertMaterial;
  }

  getObject3D() {
    return this.object;
  }
}
