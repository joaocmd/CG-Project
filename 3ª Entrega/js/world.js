var renderCamera, scene, renderer, inputManager;

var useMaterial = 0;

var objects, lights;

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
	sceneCamera = new THREE.PerspectiveCamera(70, 0, near, far);
	sceneCamera.position.x = -1400;
	sceneCamera.position.y = 1400;
	sceneCamera.position.z = 1400;
	sceneCamera.lookAt(scene.position);

	artCamera = new THREE.OrthographicCamera(0, 0 , 0, 0, near, far);
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
	lights = [];

	let floor = new Floor(0, 0, 0);
	scene.add(floor.getObject3D());
	objects.push(floor);

	let painting = new Painting(-800, 150, -730);
	scene.add(painting.getObject3D());
	objects.push(painting);

	window.addEventListener("resize", updateProjMatrix);
    window.requestAnimationFrame(world_cycle);
}
