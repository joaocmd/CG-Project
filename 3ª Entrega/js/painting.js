class  Painting{
  constructor(x, y, z) {
    const squaresY = 7;
    const squaresX = 11;
    const squareSize = 100;
    const squareSep =  20;
    const dotRadius = 22;
    const frameWidth = 20;

    let totalWidth = ((squareSize+squareSep) * squaresX) - squareSep;
    let totalHeight = ((squareSize+squareSep) * squaresY) - squareSep;

    this.object = new THREE.Group();
    this.meshes =  []

    let mat = new THREE.MeshBasicMaterial({color: 0x777777});
    this.bgMaterials = [
      new THREE.MeshPhongMaterial({color: 0x777777}),
      new THREE.MeshLambertMaterial({color: 0x777777})
    ];
    let bgGeometry = new THREE.BoxGeometry(totalWidth, totalHeight, 3);
    let bgMesh = new THREE.Mesh(bgGeometry, mat);
    bgMesh.position.x = totalWidth/2 - squareSize/2;
    bgMesh.position.y = totalHeight/2 - squareSize/2;
    this.meshes.push(bgMesh);

    mat = new THREE.MeshBasicMaterial({color: 0x000});
    this.squareMaterials = [
      new THREE.MeshPhongMaterial({color: 0x000}),
      new THREE.MeshLambertMaterial({color: 0x000})
    ];
    let squareGeometry = new THREE.BoxGeometry(squareSize, squareSize, 5);
    for (let x = 0; x < squaresX; x++) {
      for (let y = 0; y < squaresY; y++) {
        let squareMesh = new THREE.Mesh(squareGeometry, mat);
        this.meshes.push(squareMesh);
        squareMesh.position.x = (squareSize+squareSep) * x;
        squareMesh.position.y = (squareSize+squareSep) * y;
      }
    }

    mat = new THREE.MeshBasicMaterial({color: 0xc6c6c6});
    this.dotMaterials = [
      new THREE.MeshPhongMaterial({color: 0xc6c6c6}),
      new THREE.MeshLambertMaterial({color: 0xc6c6c6})
    ];
    let dotGeometry = new THREE.CylinderGeometry(dotRadius, dotRadius, 8, 10);
    for (let x = 0; x < squaresX-1; x++) {
      for (let y = 0; y < squaresY-1; y++) {
        let dotMesh = new THREE.Mesh(dotGeometry, mat);
        this.meshes.push(dotMesh);
        dotMesh.position.x = ((squareSize+squareSep) * x) + squareSize/2 + dotRadius/2;
        dotMesh.position.y = ((squareSize+squareSep) * y) + squareSize/2 + dotRadius/2;
        dotMesh.rotation.x = Math.PI/2;
      }
    }

		mat = new THREE.MeshBasicMaterial({color: 0x613a1f});
    this.frameMaterials = [
      new THREE.MeshPhongMaterial({color: 0x613a1f}),
      new THREE.MeshLambertMaterial({color: 0x613a1f})
    ];
    this.addFrame(totalWidth/2 - squareSize/2, totalHeight - squareSize/2, totalWidth + (2*frameWidth), frameWidth, mat);
    this.addFrame(totalWidth/2 - squareSize/2, -squareSize/2, totalWidth + (2*frameWidth), frameWidth, mat);
    this.addFrame(-squareSize/2, totalHeight/2 - squareSize/2, frameWidth, totalHeight + (2*frameWidth), mat);
    this.addFrame(totalWidth - squareSize/2, totalHeight/2 - squareSize/2, frameWidth, totalHeight + (2*frameWidth), mat);

    this.meshes.forEach(mesh => this.object.add(mesh));
    this.object.position.set(x, y, z);
    //this.updateMaterial();
  }

  addFrame(x, y, width, height, mat) {
    let frameGeometry = new THREE.BoxGeometry(width, height, 8);
    let frameMesh = new THREE.Mesh(frameGeometry, mat);
    frameMesh.position.x = x;
    frameMesh.position.y = y;
    this.meshes.push(frameMesh);
  }

  updateMaterial () {
    this.meshes.forEach(mesh => {
      mesh.geometry.groups[0].materialIndex = useMaterial;
    });
  }

  getObject3D() {
    return this.object;
  }
}
