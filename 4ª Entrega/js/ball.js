const MAX_ROTATION_BALL = Math.PI / 2;
const MAX_TRANSLATE_BALL = Math.PI / 2
const STEP_ROTATION_BALL = Math.PI / 8;
const STEP_TRANSLATE_BALL = Math.PI / 10;

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
		this.rotation = 0;
		this.translate = 0;
		this.accelerate = 1;

		this.meshMaterials.addToObject(this.object);
		this.updateMeshMaterials(useMaterial);

		this.object.position.set(x, y, z);
	}

	getObject3D(){
		return this.object;
	}

	update(){
		this.rotation += STEP_ROTATION_BALL * time_deltaTime * this.accelerate;
		this.translate += STEP_TRANSLATE_BALL * time_deltaTime * this.accelerate;

		this.rotation = THREE.Math.clamp(this.rotation, 0, MAX_ROTATION_BALL);
		this.translate = THREE.Math.clamp(this.translate, 0, MAX_TRANSLATE_BALL);

		this.object.rotateY(this.translate * time_deltaTime);
		this.ball.rotateY(this.rotation * time_deltaTime);
	}

	toggleMove(){
		this.accelerate = -this.accelerate;
	}

	toggleWireframe() {
		this.meshMaterials.toggleWireFrame();
	}

	restart() {
		this.object.rotation.set(0, 0, 0);
		this.rotation = 0;
		this.translate = 0;
		this.accelerate = 1;
	}

	updateMeshMaterials(materialIndex){
		this.meshMaterials.update(materialIndex);
	}

}
