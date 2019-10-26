const GOLDEN = (1 + Math.sqrt(5)) / 2

class Icosahedron{
	constructor(x, y, z){
		this.object = new THREE.Object3D();
		this.basic = new THREE.MeshBasicMaterial({color: 0xff00ff})

		this.geometry = new THREE.Geometry();
		this.vertices = [new THREE.Vector3(-1, GOLDEN, 0),  new THREE.Vector3(1, GOLDEN, 0),
						 new THREE.Vector3(-1, -GOLDEN, 0), new THREE.Vector3(1, -GOLDEN, 0),
						 new THREE.Vector3(0, -1, GOLDEN),  new THREE.Vector3(0, 1, GOLDEN),
						 new THREE.Vector3(0, -1, -GOLDEN), new THREE.Vector3(0, 1, -GOLDEN),
						 new THREE.Vector3(GOLDEN, 0, -1),  new THREE.Vector3(GOLDEN, 0, 1),
						 new THREE.Vector3(-GOLDEN, 0, -1), new THREE.Vector3(-GOLDEN, 0, 1)];

		this.randomizeVertices(0.2);
		this.vertices.forEach(vertex => this.geometry.vertices.push(vertex));

		this.generateFaces();
		this.geometry.computeFaceNormals();
		this.geometry.computeFlatVertexNormals();

		this.mesh = new THREE.Mesh(this.geometry, this.basic);
		this.object.add(this.mesh);

		this.object.position.set(x, y, z);
	}

	getObject3D(){
		return this.object;
	}

	randomizeVertices(value){
		let val1 = -Math.abs(value);
		let val2 = Math.abs(value);

		this.vertices.forEach(vertex => function(vertex) {
											vertex.x += this.random(val1, val2);
											vertex.y += this.random(val1, val2);
											vertex.z += this.random(val1, val2);
										});
	}

	random(val1, val2){
		return Math.random() * (val2 - val1) + val1;
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

	update(){

	}
}
