var renderCamera, scene, renderer, objects, inputManager;

var sideCamera, aboveCamera, frontCamera;

var time_lastFrame = time_deltaTime = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function render() {
	renderer.render(scene, renderCamera);
}

function updateProjMatrix() {
	'use strict';
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerHeight > 0 && window.innerWidth > 0) {
		renderCamera.left = window.innerWidth / -3.5;
		renderCamera.right = window.innerWidth / 3.5;
		renderCamera.top = window.innerHeight / 3.5;
		renderCamera.bottom = window.innerHeight / -3.5;
		renderCamera.updateProjectionMatrix();
	}
}

function selectCamera(newCamera) {
    renderCamera = newCamera;
    updateProjMatrix();
}

function createCameras() {
	'use strict';
	let near = 1;
	let far = 5000;
	aboveCamera = new THREE.OrthographicCamera(0, 0 , 0, 0, near, far);
	aboveCamera.position.x = 0;
	aboveCamera.position.y = 500;
	aboveCamera.position.z = 0;
	aboveCamera.lookAt(scene.position);

	sideCamera = new THREE.OrthographicCamera(0, 0 , 0, 0, near, far);
	sideCamera.position.x = 500;
	sideCamera.position.y = 0;
	sideCamera.position.z = 0;
	sideCamera.lookAt(scene.position);

	frontCamera = new THREE.OrthographicCamera(0, 0 , 0, 0, near, far);
	frontCamera.position.x = 0;
	frontCamera.position.y = 0;
	frontCamera.position.z = -500; //Frente do robo ou frente do eixo?
	frontCamera.lookAt(scene.position);

	selectCamera(aboveCamera);
}

function createScene() {
	'use strict';
	scene = new THREE.Scene();
	let axes = new THREE.AxesHelper(100);
	axes.position.set(0, 1, 0);
	scene.add(axes);
}

function createRenderer() {
	'use strict';
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
}

function world_cycle(timestamp) {
	time_deltaTime = (timestamp - time_lastFrame) / 1000;
	time_lastFrame = timestamp;

    //Update
	objects.forEach(obj => obj.update());
    if(input_getKeyDown("1")){
        selectCamera(aboveCamera);
    } else if(input_getKeyDown("2")){
        selectCamera(sideCamera);
    } else if(input_getKeyDown("3")){
        selectCamera(frontCamera);
    }

    if(input_getKeyDown("4")){
        //Add all used materials to avoid double switching a material shared by two objects
        materialSet = new Set();
        scene.traverse(function(node){
            if(node instanceof THREE.Mesh){
                materialSet.add(node.material);
            }
        });
        for (let mat of materialSet) {
            mat.wireframe = !mat.wireframe;
        }
    }
	objects.forEach(obj => obj.update());

    //Display
    render();
    window.requestAnimationFrame(world_cycle);
}

async function world_init() {
	createRenderer();
	createScene();
	createCameras();
	input_init();

	objects = [];

	let pillar = new Pillar(0, 0, -200);
  	scene.add(pillar.getObject3D()); 

  	let target = new Target(0, 48, -200);
	scene.add(target.getObject3D());

	let floor = new Floor(0, 0, 0);
	scene.add(floor.getObject3D());

	let robot = new Robot(0, 0, 0);
	scene.add(robot.getObject3D());
    objects.push(robot);

    window.addEventListener("resize", updateProjMatrix);
    window.requestAnimationFrame(world_cycle);
}
