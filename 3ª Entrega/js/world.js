var renderCamera, scene, renderer, inputManager;

var useBasicMaterial = false;
var useMaterial = 0;

var objects, lights;

var sceneCamera, artCamera;

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
			let length = 690;
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
	sceneCamera.position.x = -1500;
	sceneCamera.position.y = 1000;
	sceneCamera.position.z = 1500;
	sceneCamera.lookAt(scene.position);

	artCamera = new THREE.OrthographicCamera(0, 0 , 0, 0, near, far);
	artCamera.position.x = -370;
	artCamera.position.y = 515;
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

function world_cycle(timestamp) {
	time_deltaTime = (timestamp - time_lastFrame) / 1000;
	time_lastFrame = timestamp;

	if (input_getKeyDown("W")) {
		useBasicMaterial = !useBasicMaterial;
		let matIndex = useBasicMaterial ? 2 : useMaterial;
		objects.forEach(obj => obj.update(matIndex));
	}
	if (input_getKeyDown("E")) {
		useMaterial = (useMaterial + 1)%2;
		if (!useBasicMaterial) {
			objects.forEach(obj => obj.update(useMaterial));
		}
	}

	// Select Cameras
    if (input_getKeyDown("5")) {
        selectCamera(sceneCamera);
    } else if (input_getKeyDown("6")) {
        selectCamera(artCamera);
    }

	// Toggle Lights
	if (input_getKeyDown("Q")) {
		lights[0].visible = !lights[0].visible;
	}
	for (let i = 1; i <= 4; i++) {
		if (input_getKeyDown(i.toString())) {
			lights[i].toggle();
		}
	}

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
	sun.castShadow = true;
	sun.shadow.camera.far = 5000;
	sun.intensity = 0.5;
	scene.add(sun);
	lights.push(sun);
	sun.target = objects[0].getObject3D();

	let spotlight = new Spotlight(500, 1000, 1000, 3*Math.PI/4, -Math.PI/32, 0, 0xff4444);
	scene.add(spotlight.getObject3D());
	objects.push(spotlight);
	lights.push(spotlight);


	spotlight = new Spotlight(-500, 1000, 1000, 3*Math.PI/4, Math.PI/8, 0, 0x44ff44);
	scene.add(spotlight.getObject3D());
	objects.push(spotlight);
	lights.push(spotlight);


	spotlight = new Spotlight(700, 1000, 0, 3*Math.PI/4, -0.5, 0, 0xffff44);
	scene.add(spotlight.getObject3D());
	objects.push(spotlight);
	lights.push(spotlight);


	spotlight = new Spotlight(-1000, 50, 300, 4.4*Math.PI/4, 0.4, 0, 0x4444ff);
	scene.add(spotlight.getObject3D());
	objects.push(spotlight);
	lights.push(spotlight);
}

function world_init() {
	createRenderer();
	createScene();
	createCameras();
	input_init();

	objects = [];

	let floor = new Floor(0, 0, 0);
	scene.add(floor.getObject3D());
	objects.push(floor);

	let painting = new Painting(-1000, 120, -730);
	scene.add(painting.getObject3D());
	objects.push(painting);

	let sculpture = new Icosahedron(700, 305, 0, 150);
	scene.add(sculpture.getObject3D());
	objects.push(sculpture);

	createLights();
	window.addEventListener("resize", updateProjMatrix);
    window.requestAnimationFrame(world_cycle);
}
