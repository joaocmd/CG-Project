var selectedCannon, renderCamera, scene, renderer, inputManager;

var wireframe = 0, axes = 0;

var objects, balls;

var sideCamera, aboveCamera, frontCamera;
var leftCannon, middleCanon, rigthCannon;

var time_lastFrame = time_deltaTime = 0;

var leftLimit, rightLimit, backLimit;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function render() {
	renderer.render(scene, renderCamera);
}

function updateProjMatrix() {
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerHeight > 0 && window.innerWidth > 0) {
		renderCamera.left = window.innerWidth / -1;
		renderCamera.right = window.innerWidth / 1;
		renderCamera.top = window.innerHeight / 1;
		renderCamera.bottom = window.innerHeight / -1;
		renderCamera.updateProjectionMatrix();
	}
}

function selectCamera(newCamera) {
    renderCamera = newCamera;
    updateProjMatrix();
}

function createCameras() {
	// TODO create 2 perspective cameras

	let near = 1;
	let far = 5000;
	aboveCamera = new THREE.OrthographicCamera(0, 0 , 0, 0, near, far);
	aboveCamera.position.x = 0;
	aboveCamera.position.y = 2000;
	aboveCamera.position.z = 100;
	aboveCamera.lookAt(new THREE.Vector3(0, 0, 100));

	sideCamera = new THREE.OrthographicCamera(0, 0 , 0, 0, near, far);
	sideCamera.position.x = 2000;
	sideCamera.position.y = 0;
	sideCamera.position.z = 0;
	sideCamera.lookAt(scene.position);

	frontCamera = new THREE.OrthographicCamera(0, 0 , 0, 0, near, far);
	frontCamera.position.x = 0;
	frontCamera.position.y = 0;
	frontCamera.position.z = -2000;
	frontCamera.lookAt(scene.position);

	selectCamera(aboveCamera);
}

function selectCannon(newCannon){
	selectedCannon.unselect();
	selectedCannon = newCannon;
	selectedCannon.select();
}

function createCannons(){
	leftCannon = new Cannon(-300, 0, 800);
	scene.add(leftCannon.getObject3D());
    objects.push(leftCannon);

	middleCannon = new Cannon(0, 0, 800);
	scene.add(middleCannon.getObject3D());
    objects.push(middleCannon);

	rightCannon = new Cannon(300, 0, 800);
	scene.add(rightCannon.getObject3D());
    objects.push(rightCannon);

	selectedCannon = middleCannon;

	selectCannon(middleCannon);
}

function createFences() {
	backLimit = -600;
	let fence = new Fence(0, 0, backLimit);
	scene.add(fence.getObject3D());
	backLimit += fence.width/2;

	leftLimit = -570;
	fence = new Fence(0, 0, leftLimit);
	scene.add(fence.getObject3D());
	fence.getObject3D().rotation.y = Math.PI / 2;
	leftLimit += fence.width/2;

	rightLimit = 570;
	fence = new Fence(0, 0, rightLimit);
	scene.add(fence.getObject3D());
	fence.getObject3D().rotation.y = Math.PI / 2;
	rightLimit -= fence.width/2;
}

function createBalls() {
	for (let i = 0; i < 30; i++) {
		let ball = new Ball(randFloat(leftLimit, rightLimit), 0, randFloat(backLimit, -backLimit));
		scene.add(ball.object);
		ball.setVelocity(randFloat(50, 200), 0 , randFloat(10, 200));
		balls.push(ball);
		objects.push(ball);
	}
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

    //Update
	objects.forEach(obj => obj.update());

	// Select Cameras
    if(input_getKeyDown("1")){
        selectCamera(aboveCamera);
    }else if(input_getKeyDown("2")){
        selectCamera(sideCamera);
    }else if(input_getKeyDown("3")){
        selectCamera(frontCamera);
    }

	// Select Cannons
	if(input_getKeyDown("Q")){
		selectCannon(leftCannon);
	}else if(input_getKeyDown("W")){
		selectCannon(middleCannon);
	}else if(input_getKeyDown("E")){
		selectCannon(rightCannon);
	}

    if(input_getKeyDown("4")){
		wireframe = (wireframe + 1) % 2;
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

    if(input_getKeyDown("R")){
		axes = (axes + 1) % 2;
		balls.forEach(ball => ball.toggleAxes());
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

	balls = [];
	objects = [];

	createCannons();
	createFences();
	createBalls();

    window.addEventListener("resize", updateProjMatrix);
    window.requestAnimationFrame(world_cycle);
}
