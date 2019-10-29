const GOLDEN = (1 + Math.sqrt(5)) / 2;
const RANDOM_FACTOR = 0.2;

class Icosahedron{
	constructor(x, y, z, scaleFactor){
		this.object = new THREE.Object3D();
		this.materials = [new THREE.MeshPhongMaterial({color: 0x00b5e4}),
						  new THREE.MeshLambertMaterial({color: 0xf6d443}),
						  new THREE.MeshBasicMaterial({color: 0xfb3c19})];

		this.geometry = new THREE.Geometry();

		// Vertice definition
		this.vertices = [new THREE.Vector3(-1, GOLDEN, 0),  new THREE.Vector3(1, GOLDEN, 0),
						 new THREE.Vector3(-1, -GOLDEN, 0), new THREE.Vector3(1, -GOLDEN, 0),
						 new THREE.Vector3(0, -1, GOLDEN),  new THREE.Vector3(0, 1, GOLDEN),
						 new THREE.Vector3(0, -1, -GOLDEN), new THREE.Vector3(0, 1, -GOLDEN),
						 new THREE.Vector3(GOLDEN, 0, -1),  new THREE.Vector3(GOLDEN, 0, 1),
						 new THREE.Vector3(-GOLDEN, 0, -1), new THREE.Vector3(-GOLDEN, 0, 1)];

		this.randomizeVertices(RANDOM_FACTOR);
		this.vertices.forEach(vertex => this.geometry.vertices.push(vertex));

		this.generateFaces();
		this.geometry.computeFaceNormals();
		this.geometry.computeFlatVertexNormals();

		this.object.position.set(x, y, z);
		this.object.scale.multiplyScalar(scaleFactor);

		let pedestalGeometry = new THREE.CylinderGeometry(2.2, 2.3, 0.5, 22, 5);
		let pedestalMesh = new THREE.Mesh(pedestalGeometry);
		pedestalMesh.position.y = -1.8;

		this.meshMaterials = new MeshMaterials([new THREE.Mesh(this.geometry), pedestalMesh], this.materials);

		this.meshMaterials.addToObject(this.object);
		this.meshMaterials.update(0);
	}

	getObject3D(){
		return this.object;
	}

	randomizeVertices(value){
		let val1 = -Math.abs(value);
		let val2 = Math.abs(value);

		this.vertices.forEach(function(vertex) {
									vertex.x += random(val1, val2);
									vertex.y += random(val1, val2);
									vertex.z += random(val1, val2);
								});
	}

	generateFaces(){
		this.geometry.faces.push(new THREE.Face3(0, 11, 5));
		this.geometry.faces.push(new THREE.Face3(0, 5, 1));
		this.geometry.faces.push(new THREE.Face3(0, 1, 7));
		this.geometry.faces.push(new THREE.Face3(0, 7, 10));
		this.geometry.faces.push(new THREE.Face3(0, 10, 11));
		this.geometry.faces.push(new THREE.Face3(1, 5, 9));
		this.geometry.faces.push(new THREE.Face3(5, 11, 4));
		this.geometry.faces.push(new THREE.Face3(11, 10, 2));
		this.geometry.faces.push(new THREE.Face3(10, 7, 6));
		this.geometry.faces.push(new THREE.Face3(7, 1, 8));
		this.geometry.faces.push(new THREE.Face3(3, 9, 4));
		this.geometry.faces.push(new THREE.Face3(3, 4, 2));
		this.geometry.faces.push(new THREE.Face3(3, 2, 6));
		this.geometry.faces.push(new THREE.Face3(3, 6, 8));
		this.geometry.faces.push(new THREE.Face3(3, 8, 9));
		this.geometry.faces.push(new THREE.Face3(4, 9, 5));
		this.geometry.faces.push(new THREE.Face3(2, 4, 11));
		this.geometry.faces.push(new THREE.Face3(6, 2, 10));
		this.geometry.faces.push(new THREE.Face3(8, 6, 7));
		this.geometry.faces.push(new THREE.Face3(9, 8, 1));
	}

	update(materialIndex){
		this.meshMaterials.update(materialIndex);
	}
}

function random(val1, val2){
	return Math.random() * (val2 - val1) + val1;
}
