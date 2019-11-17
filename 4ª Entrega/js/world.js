const textureLoader = new THREE.TextureLoader();

const wideScreenVerticalFov = 70;
// Calculate horizontal fov for 16:9 ratio
const wideScreenHorizontalFov = 2 * rad2deg(Math.atan((16/9) * Math.tan(deg2rad(wideScreenVerticalFov/2))));

var renderer, inputManager;
var scene;
var pauseScene;

const MATERIAL_INDEXES = {
	SHADED: 0,
	BASIC: 1,
}

var useMaterial = MATERIAL_INDEXES.SHADED;

var dynamicObjects = [];
var materialObjects = [];
var pause;
var sun;
var pointlight;
var paused = false;

var sceneCamera, msgCamera;

var time_lastFrame = time_deltaTime = 0, timeScale = 1;

function render() {
	renderer.clear();
	// Render Main Camera
	renderer.render(scene, sceneCamera);

	// Render Msg Camera
	if (paused) {
		renderer.clearDepth();
		renderer.render(pauseScene, msgCamera);
	}
}

function rad2deg(rad) {
	return rad * 180/Math.PI;
}

function deg2rad(deg) {
	return deg * Math.PI/180;
}

function updateProjMatrix() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	let aspect = window.innerWidth/window.innerHeight;
	if (window.innerHeight > 0 && window.innerWidth > 0) {
		// Msg Camera
		let halfSize = 2000;
		if (aspect >= 1) {
			let dy = aspect * halfSize;
			// Fix vertical limits
			msgCamera.top = halfSize;
			msgCamera.bottom = -halfSize;

			msgCamera.left = -dy;
			msgCamera.right = dy;

			// O FOV da camara de perspetiva mantém-se
			sceneCamera.fov = wideScreenVerticalFov;
		} else {
			let dx = halfSize/aspect;
			// Fix horizontal limits
			msgCamera.left = -halfSize;
			msgCamera.right = halfSize;

			msgCamera.top = dx;
			msgCamera.bottom = -dx;

			// O FOV da camara de perspetiva tem de ser alterado
			sceneCamera.fov = THREE.Math.clamp(rad2deg((1/aspect) * Math.tan(deg2rad(wideScreenHorizontalFov/2))), wideScreenVerticalFov, 140);
		}
		msgCamera.updateProjectionMatrix();
	
		// Scene Camera
		sceneCamera.aspect = aspect;
		sceneCamera.updateProjectionMatrix();
	}
}

function createCameras() {
	let near = 1;
	let far = 5000;

	sceneCamera = new THREE.PerspectiveCamera(70, 0, near, far);
	sceneCamera.position.set(0, 2000, 2500);
	sceneCamera.lookAt(scene.position);

	msgCamera = new THREE.OrthographicCamera(0, 0 , 0, 0, near, far);
	msgCamera.position.set(0, 0, 1000);

	updateProjMatrix();
}

function createScene() {
	scene = new THREE.Scene();
	pauseScene = new THREE.Scene();
}

function createRenderer() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.autoClear = false;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	document.body.appendChild(renderer.domElement);
}

function restart() {
	timeScale = 1;
}

function world_cycle(timestamp) {
	time_deltaTime = (timestamp - time_lastFrame) * timeScale/ 1000;
	time_lastFrame = timestamp;

	dynamicObjects.forEach(obj => obj.update());

	if (!paused) {
		// Ponto 2
		if (input_getKeyDown("D")) {
			sun.visible = !sun.visible;
		}
		if (input_getKeyDown("P")) {
			pointlight.visible = !pointlight.visible;
		}
		if (input_getKeyDown("W")) {
			materialObjects.forEach(obj => obj.toggleWireframe());
		}
		if (input_getKeyDown("L")) {
			useMaterial = (useMaterial + 1)%2;
			materialObjects.forEach(obj => obj.updateMeshMaterials(useMaterial));
		}

		// Ponto 3
		if (input_getKeyDown("B")){
			dynamicObjects[1].toggleMove();
		}
	}

	// Ponto 4
	if (input_getKeyDown("S")) {
		setPause(!paused)
	}
	if (input_getKeyDown("R")) {
		restart();
	}

    //Display
    render();
    window.requestAnimationFrame(world_cycle);
}

function setPause(val) {
	paused = val;
	timeScale = paused? 0 : 1;
}

function restart() {
	setPause(false);
	sun.visible = true;
	pointlight.visible = true;
	dynamicObjects.forEach(obj => obj.restart());
}

function createLights() {
	sun = new THREE.DirectionalLight();
	sun.position.set(-500, 1000, 500);
	sun.castShadow = true;
	sun.shadow.camera.far = 5000;
	sun.shadow.camera.left = -10000
	sun.shadow.camera.right = 10000
	sun.shadow.camera.bottom = -10000
	sun.shadow.camera.top = 10000
	sun.shadow.mapSize.height = 10000
	sun.shadow.mapSize.width = 10000
	sun.distance = 0

	sun.intensity = 0.75;
	scene.add(sun);

	pointlight = new THREE.PointLight(0xff0000);
	pointlight.position.set(0, 500, 30);
	pointlight.distance = 4000;
	pointlight.castShadow = true;
	pointlight.shadow.camera.far = 10000;
	scene.add(pointlight);
}

function world_init() {
	createRenderer();
	createScene();
	input_init();

	let board = new Board(0, 0, 0);
	scene.add(board.getObject3D());
	materialObjects.push(board);

	let dice = new Dice(0, 173.205, 0);
	scene.add(dice.getObject3D());
	materialObjects.push(dice);
	dynamicObjects.push(dice);

	let ball = new Ball(0,0,0);
	scene.add(ball.getObject3D());
	materialObjects.push(ball);
	dynamicObjects.push(ball);

	pause = new Pause(0, 0, 0);
	pauseScene.add(pause.getObject3D());
	materialObjects.push(pause);

	createCameras();
	createLights();
	window.addEventListener("resize", updateProjMatrix);
    window.requestAnimationFrame(world_cycle);
}

function getTexture(name) {
	return "http://localhost:8000/textures/" + name;
}
