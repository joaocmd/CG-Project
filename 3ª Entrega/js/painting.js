class  Painting{
	constructor(x, y, z) {
		const squaresY = 10;
		const squaresX = 18;
		const squareSize = 60;
		const squareSep =  15;
		const dotRadius = 17;
		const frameWidth = 20;

		let totalWidth = ((squareSize+squareSep) * squaresX) - squareSep;
		let totalHeight = ((squareSize+squareSep) * squaresY) - squareSep;

		this.object = new THREE.Group();
		this.meshMaterials = [];

		let bgGeometry = new THREE.BoxGeometry(totalWidth, totalHeight, 3);
		let bgMesh = new THREE.Mesh(bgGeometry);
		bgMesh.position.x = totalWidth/2 - squareSize/2;
		bgMesh.position.y = totalHeight/2 - squareSize/2;
		// Add background
		this.meshMaterials.push(new MeshMaterials(bgMesh,
			[new THREE.MeshBasicMaterial({color: 0x777777}),
			 new THREE.MeshPhongMaterial({color: 0x777777}),
			 new THREE.MeshLambertMaterial({color: 0x777777})]));

		let squareMaterials =  [new THREE.MeshBasicMaterial({color: 0x000}),
								new THREE.MeshPhongMaterial({color: 0x000}),
								new THREE.MeshLambertMaterial({color: 0x000})];

		// Add square mesh
		this.meshMaterials.push(new MeshMaterials([], squareMaterials));

		let squareGeometry = new THREE.BoxGeometry(squareSize, squareSize, 5);
		for (let x = 0; x < squaresX; x++) {
			for (let y = 0; y < squaresY; y++) {
				let squareMesh = new THREE.Mesh(squareGeometry);
				squareMesh.position.x = (squareSize+squareSep) * x;
				squareMesh.position.y = (squareSize+squareSep) * y;
				this.meshMaterials[1].addMesh(squareMesh);
			}
		}

		let dotMaterials = [new THREE.MeshBasicMaterial({color: 0xc6c6c6}),
							new THREE.MeshPhongMaterial({color: 0xc6c6c6}),
							new THREE.MeshLambertMaterial({color: 0xc6c6c6})];

		// Add dot mesh
		this.meshMaterials.push(new MeshMaterials([], dotMaterials));

		let dotGeometry = new THREE.CylinderGeometry(dotRadius, dotRadius, 8, 24);
		for (let x = 0; x < squaresX-1; x++) {
			for (let y = 0; y < squaresY-1; y++) {
				let dotMesh = new THREE.Mesh(dotGeometry);
				dotMesh.position.x = ((squareSize+squareSep) * x) + squareSize/2 + dotRadius/2;
				dotMesh.position.y = ((squareSize+squareSep) * y) + squareSize/2 + dotRadius/2;
				dotMesh.rotation.x = Math.PI/2;
				this.meshMaterials[2].addMesh(dotMesh);
			}
		}

		let frameMaterials = [new THREE.MeshBasicMaterial({color: 0x613a1f}),
							  new THREE.MeshPhongMaterial({color: 0x613a1f}),
							  new THREE.MeshLambertMaterial({color: 0x613a1f})];

		// Add frameMesh
		this.meshMaterials.push(new MeshMaterials([], frameMaterials));

		this.meshMaterials[3].addMesh(this.createFrame(totalWidth/2 - squareSize/2, totalHeight - squareSize/2, totalWidth + (2*frameWidth), frameWidth));
		this.meshMaterials[3].addMesh(this.createFrame(totalWidth/2 - squareSize/2, -squareSize/2, totalWidth + (2*frameWidth), frameWidth));
		this.meshMaterials[3].addMesh(this.createFrame(-squareSize/2, totalHeight/2 - squareSize/2, frameWidth, totalHeight + (2*frameWidth)));
		this.meshMaterials[3].addMesh(this.createFrame(totalWidth - squareSize/2, totalHeight/2 - squareSize/2, frameWidth, totalHeight + (2*frameWidth)));

		this.object.position.set(x, y, z);

		let object = this.object;

		this.meshMaterials.forEach(function(mesh){
										mesh.addToObject(object);
										mesh.update();
									});
	}

	createFrame(x, y, width, height) {
		let frameGeometry = new THREE.BoxGeometry(width, height, 8);
		let frameMesh = new THREE.Mesh(frameGeometry);
		frameMesh.position.x = x;
		frameMesh.position.y = y;

		return frameMesh;
	}

	update(){
		this.meshMaterials.forEach(mesh => mesh.update());
	}

	getObject3D() {
		return this.object;
	}
}
