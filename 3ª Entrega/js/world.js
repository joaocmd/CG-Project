var renderCamera, scene, renderer, inputManager;

var wireframe = axes = false

var objects, balls;

var sceneCamera, artCamera;

var time_lastFrame = time_deltaTime = 0;

function render() {
	renderer.render(scene, renderCamera);
}

function updateProjMatrix() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerHeight > 0 && window.innerWidth > 0) {
		if (renderCamera.type == "OrthographicCamera") {
			//Look for correct resizing
			renderCamera.left = window.innerWidth / -1;
			renderCamera.right = window.innerWidth / 1;
			renderCamera.top = window.innerHeight / 1;
			renderCamera.bottom = window.innerHeight / -1;
			renderCamera.updateProjectionMatrix();
		} else {
			renderCamera.aspect = window.innerWidth/window.innerHeight;
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
	sceneCamera = new THREE.OrthographicCamera(0, 0 , 0, 0, near, far);
	sceneCamera.position.x = 0;
	sceneCamera.position.y = 2000;
	sceneCamera.position.z = 100;
	sceneCamera.lookAt(new THREE.Vector3(0, 0, 100));

	artCamera = new THREE.PerspectiveCamera(70, 0, near, far);
	artCamera.position.x = -600;
	artCamera.position.y = 600;
	artCamera.position.z = 1200;
	artCamera.lookAt(scene.position);

	selectCamera(sceneCamera);
}

function createScene() {
	scene = new THREE.Scene();
}

function createRenderer() {
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
}

function world_cycle(timestamp) {
	time_deltaTime = (timestamp - time_lastFrame) / 1000;
	time_lastFrame = timestamp;

	// Select Cameras
    if(input_getKeyDown("5")){
        selectCamera(sceneCamera);
    }else if(input_getKeyDown("6")){
        selectCamera(artCamera);
    }

	// Select Cannons
	if(input_getKeyDown("Q")){
		selectCannon(leftCannon);
	}else if(input_getKeyDown("W")){
		selectCannon(middleCannon);
	}else if(input_getKeyDown("E")){
		selectCannon(rightCannon);
	}

    //Display
    render();
    window.requestAnimationFrame(world_cycle);
}

function randFloat(min, max) {
	return Math.random() * (max-min) + min
}

function world_init() {
	createRenderer();
	createScene();
	createCameras();
	input_init();

	objects = [];

	window.addEventListener("resize", updateProjMatrix);

    window.requestAnimationFrame(world_cycle);
}
