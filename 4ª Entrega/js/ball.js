const MAX_TRANSLATE_BALL = Math.PI / 2
const MAX_ROTATION_BALL = MAX_TRANSLATE_BALL * 1.5;
const STEP_TRANSLATE_BALL = Math.PI / 10;
const STEP_ROTATION_BALL = STEP_TRANSLATE_BALL * 1.5;

class Ball{
	constructor(x, y, z){
		this.object = new THREE.Object3D();
		this.geometry = new THREE.SphereGeometry(250, 16, 16);
		this.materials = [new THREE.MeshPhongMaterial({map: textureLoader.load(getTexture("lenna.png")),
												  bumpMap: textureLoader.load(getTexture("wood_bump.png"))}),
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
		this.ball.position.set(0, 250, 800);
		this.rotation = 0;
		this.ball.rotation.set(0, 0, 0);
		this.ball.rotateX(-Math.PI / 4);
		this.translate = 0;
		this.accelerate = -1;
	}

	updateMeshMaterials(materialIndex){
		this.meshMaterials.update(materialIndex);
	}
}
