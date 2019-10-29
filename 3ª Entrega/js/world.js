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
	sceneCamera.position.x = -1500;
	sceneCamera.position.y = 1000;
	sceneCamera.position.z = 1500;
	sceneCamera.lookAt(scene.position);

	artCamera = new THREE.OrthographicCamera(0, 0 , 0, 0, near, far);
	artCamera.position.x = 0;
	artCamera.position.y = 500;
	artCamera.position.z = 0;

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

<<<<<<< HEAD
function selectSpotlight(new_spotlight) {
	selected.turn_off();
	selected = new_spotlight;
	selected.turn_on();
}

=======
>>>>>>> master
function world_cycle(timestamp) {
	time_deltaTime = (timestamp - time_lastFrame) / 1000;
	time_lastFrame = timestamp;

	if (input_getKeyDown("E")) {
		useMaterial = (useMaterial + 1)%2;
		objects.forEach(obj => obj.update());
	}

	// Select Cameras
    if (input_getKeyDown("5")) {
        selectCamera(sceneCamera);
    } else if (input_getKeyDown("6")) {
        selectCamera(artCamera);
    }

<<<<<<< HEAD
		if (input_getKeyDown("1")) {
			selectSpotlight(spotligth_1);
	} else if (input_getKeyDown("2")){
			selectSpotlight(spotligth_2);
	} else if (input_getKeyDown("3")){
			selectSpotlight(spotligth_3);
	} else if (input_getKeyDown("4")) {
			selectSpotlight(spotligth_4)
	}
=======
>>>>>>> master
    //Display
    render();
    window.requestAnimationFrame(world_cycle);
}

function randFloat(min, max) {
	return Math.random() * (max-min) + min
}

function createLights() {
	lights = []

	let sun = new THREE.DirectionalLight();
	sun.position.set(-500, 1000, 500);
	scene.add(sun);
<<<<<<< HEAD
	lights.push(sun)
	sun.target = objects[0].getObject3D();
}

function createSpotligths() {

	let painting = objects[objects.length - 2];
	let sculpture = objects[objects.length - 1];

	spotligth_1 = new Spotlight(500, 1000, 1000, Math.PI / 4, 0, 0, painting.getObject3D());
	scene.add(spotligth_1.getObject3D());
	objects.push(spotligth_1);


	spotligth_2 = new Spotlight(-500, 1000, 1000, Math.PI / 4, 0, 0, sculpture.getObject3D());
	scene.add(spotligth_2.getObject3D());
	objects.push(spotligth_2);


	spotligth_3 = new Spotlight(700, 1000, 0, Math.PI / 4, 0, -(Math.PI / 4), sculpture.getObject3D());
	scene.add(spotligth_3.getObject3D());
	objects.push(spotligth_3);


	spotligth_4 = new Spotlight(-1100, 1000, -300, 0, 0, Math.PI / 4, painting.getObject3D());
	scene.add(spotligth_4.getObject3D());
	objects.push(spotligth_4);

	selected = spotligth_1;
	selectSpotlight(spotligth_1);
}

=======
	lights.push(sun) 
	sun.target = objects[0].getObject3D();
}

>>>>>>> master
function world_init() {
	createRenderer();
	createScene();
	createCameras();
	input_init();

	objects = [];

	let floor = new Floor(0, 0, 0);
	scene.add(floor.getObject3D());
	objects.push(floor);

	let painting = new Painting(-800, 150, -730);
	scene.add(painting.getObject3D());
	objects.push(painting);

	let sculpture = new Icosahedron(0, 500, 0, 200);
	scene.add(sculpture.getObject3D());
	objects.push(sculpture);

<<<<<<< HEAD
	createSpotligths();

=======
>>>>>>> master
	createLights();
	window.addEventListener("resize", updateProjMatrix);
    window.requestAnimationFrame(world_cycle);
}
