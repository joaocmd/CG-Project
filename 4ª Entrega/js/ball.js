const ROTATION_BALL = Math.PI / 2;

class Ball{
	constructor(x, y, z){
		this.object = new THREE.Object3D();
		this.geometry = new THREE.SphereGeometry(250, 30, 30);
		this.materials = [new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("lenna.png")),
												  bumpMap: textureLoader.load(getTexture("wood_bump.png"))}),
					 new THREE.MeshBasicMaterial({map: textureLoader.load(getTexture("lenna.png"))})]

		this.ball = new THREE.Mesh(this.geometry);
		this.ball.position.set(0, 250, 800);
		this.ball.rotateX(-Math.PI / 4);
		this.meshMaterials = new MeshMaterials(this.ball, this.materials);
		this.ball.castShadow = true;

		this.meshMaterials.addToObject(this.object);
		this.updateMeshMaterials(useMaterial);


		this.object.position.set(x, y, z);
	}

	getObject3D(){
		return this.object;
	}

	update(){
		this.object.rotateY(ROTATION_BALL * time_deltaTime);
		this.ball.rotateY(ROTATION_BALL * time_deltaTime);
	}

	updateMeshMaterials(materialIndex){
		this.meshMaterials.update(materialIndex);
	}

}
