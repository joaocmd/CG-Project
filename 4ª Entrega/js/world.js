const textureLoader = new THREE.TextureLoader();

var renderCamera, scene, renderer, inputManager;

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

var pausePosition = 1000000;

var sceneCamera, msgCamera;

var time_lastFrame = time_deltaTime = 0, timeScale = 1;

function selectCamera(camera) {
	renderCamera = camera;
}

function render() {
	renderer.clear();
	// Render Main Camera
	renderer.setClearColor(0x000000, 1);
	renderer.render(scene, sceneCamera);

	// Render Msg Camera
	if (paused) {
		renderer.setClearColor(0x000000, 1);
		renderer.render(scene, msgCamera);
	}
}

function updateProjMatrix() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	let aspect = window.innerWidth/window.innerHeight;
	if (window.innerHeight > 0 && window.innerWidth > 0) {
			// Msg Camera
			if (aspect >= 1) {
				let length = 5000;
				let dy = length*2/aspect;
				msgCamera.left = -length;
				msgCamera.right = length;
				msgCamera.top = 0.5 * dy;
				msgCamera.bottom = -0.5 * dy;
				msgCamera.updateProjectionMatrix();
			} else {
				//TODO
			}
		
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
	msgCamera.position.set(pausePosition, 0, 1000);
	msgCamera.lookAt(pause.getObject3D().position);

	updateProjMatrix();
}

function createScene() {
	scene = new THREE.Scene();
}

function createRenderer() {
	renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
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

	// Ponto 2
	// Isto está a demorar muito a fazer toggle
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

	pause = new Pause(pausePosition, 0, 0);
	scene.add(pause.getObject3D());
	materialObjects.push(pause);

	createCameras();
	createLights();
	window.addEventListener("resize", updateProjMatrix);
    window.requestAnimationFrame(world_cycle);
}

function getTexture(name) {
	return "http://localhost:8000/textures/" + name;
}
