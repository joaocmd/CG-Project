var controls;

const textureLoader = new THREE.TextureLoader();

var renderCamera, scene, renderer, inputManager;
var timeScale = 1;

const MATERIAL_INDEXES = {
	SHADED: 0,
	BASIC: 1,
}

var useMaterial = MATERIAL_INDEXES.SHADED;

var dynamicObjects = [];
var materialObjects = [];
var sun;
var pointlight;

var sceneCamera, msgCamera;

var time_lastFrame = time_deltaTime = 0;

function render() {
	renderer.render(scene, renderCamera);
}

function updateProjMatrix() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	let aspect = window.innerWidth/window.innerHeight;
	if (window.innerHeight > 0 && window.innerWidth > 0) {
		if (renderCamera instanceof THREE.OrthographicCamera) {
			//Look for correct resizing
			let length = 750;
			let dy = length*2/aspect;
			renderCamera.left = -length;
			renderCamera.right = length;
			renderCamera.top = 0.5 * dy;
			renderCamera.bottom = -0.5 * dy;
			renderCamera.updateProjectionMatrix();
		} else {
			renderCamera.aspect = aspect;
		}
		renderCamera.updateProjectionMatrix();
	}
}

function selectCamera(newCamera) {
    renderCamera = newCamera;
    updateProjMatrix();
}

function createCameras() {
	let near = 1;
	let far = 5000;

	sceneCamera = new THREE.PerspectiveCamera(70, 0, near, far);
	sceneCamera.position.y = 2000;
	sceneCamera.position.z = 2500;
	sceneCamera.lookAt(scene.position);

	artCamera = new THREE.OrthographicCamera(0, 0 , 0, 0, near, far);
	artCamera.position.x = -300;
	artCamera.position.y = 500;
	artCamera.position.z = -700;

	selectCamera(sceneCamera);
}

function createScene() {
	scene = new THREE.Scene();
}

function createRenderer() {
	renderer = new THREE.WebGLRenderer({antialias: true});
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

	// Ponto 3

	// Ponto 4
	if (input_getKeyDown("S")) {
		timeScale = (timeScale == 0)? 1 : 0;
	}
	if (input_getKeyDown("R")) {
		restart();
	}
	if (input_getKeyDown("B")){
		dynamicObjects[1].toggleMove();
	}

    //Display
    render();
	controls.update();
    window.requestAnimationFrame(world_cycle);
}

function restart() {
	dynamicObjects.forEach(obj => obj.restart());
}

function createLights() {
	sun = new THREE.DirectionalLight();
	sun.position.set(-500, 1000, 500);
	sun.castShadow = true;
	sun.shadow.camera.far = 5000;
	sun.intensity = 0.5;
	scene.add(sun);
	sun.target = materialObjects[0].getObject3D();

	pointlight = new THREE.PointLight(0xffffff);
	pointlight.position.set(0, 500, 30);
	pointlight.castShadow = true;
	pointlight.shadow.camera.far = 10000;
	scene.add(pointlight);
}

function world_init() {
	createRenderer();
	createScene();
	createCameras();
	input_init();

	controls = new THREE.OrbitControls(renderCamera, renderer.domElement);

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

	createLights();
	window.addEventListener("resize", updateProjMatrix);
    window.requestAnimationFrame(world_cycle);
}

function getTexture(name) {
	return "http://localhost:8000/textures/" + name;
}
