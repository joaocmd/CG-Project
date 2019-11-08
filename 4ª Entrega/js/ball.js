const ROTATION_BALL = Math.PI / 2;

class Ball{
	constructor(x, y, z){
		this.object = new THREE.Object3D();
		this.geometry = new THREE.SphereGeometry(250, 16, 16);
		this.materials = [new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("lenna.png")),
												  bumpMap: textureLoader.load(getTexture("wood_bump.png")),
												  shininesh: 10}),
					 new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("lenna.png"))})]

		this.ball = new THREE.Mesh(this.geometry);
		this.meshMaterials = new MeshMaterials(this.ball, this.materials);
		this.ball.castShadow = true;

		this.meshMaterials.addToObject(this.object);
		this.updateMeshMaterials(useMaterial);

		this.restart();
		this.object.position.set(x, y, z);
	}

	getObject3D(){
		return this.object;
	}

	update(){
		this.object.rotateY(ROTATION_BALL * time_deltaTime);
		this.ball.rotateY(ROTATION_BALL * 5 * time_deltaTime);
	}

	toggleWireframe() {
		this.meshMaterials.toggleWireFrame();
	}

	restart() {
		this.object.rotation.set(0, 0, 0);
		this.ball.position.set(0, 250, 800);
		this.ball.rotation.set(0, 0, 0);
		//this.ball.rotation.set(-Math.PI/4, 0, 0);
	}

	updateMeshMaterials(materialIndex){
		this.meshMaterials.update(materialIndex);
	}
}
