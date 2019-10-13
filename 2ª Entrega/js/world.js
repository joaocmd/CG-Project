var selectedCannon, renderCamera, scene, renderer, inputManager;

var objects, balls;

var sideCamera, aboveCamera, frontCamera;
var leftCannon, middleCanon, rigthCannon;

var time_lastFrame = time_deltaTime = 0;

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
	aboveCamera.position.z = 0;
	aboveCamera.lookAt(scene.position);
	aboveCamera.rotateZ(Math.PI);

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
	leftCannon = new Cannon(300, 0, -800);
	scene.add(leftCannon.getObject3D());
    objects.push(leftCannon);

	middleCannon = new Cannon(0, 0, -800);
	scene.add(middleCannon.getObject3D());
    objects.push(middleCannon);

	rightCannon = new Cannon(-300, 0, -800);
	scene.add(rightCannon.getObject3D());
    objects.push(rightCannon);

	selectedCannon = middleCannon;

	selectCannon(middleCannon);
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
		balls.forEach(ball => ball.toggleAxes());
    }

    //Display
    render();
    window.requestAnimationFrame(world_cycle);
}

function randFloat(min, max) {

	return Math.random() * (max-min) + min
}

async function world_init() {
	createRenderer();
	createScene();
	createCameras();
	input_init();

	balls = [];
	objects = [];

	createCannons();

	let fence = new Fence(0, 0, 600);
	scene.add(fence.getObject3D());

	fence = new Fence(0, 0, 570);
	scene.add(fence.getObject3D());
	fence.getObject3D().rotation.y = Math.PI / 2;

	fence = new Fence(0, 0, 570);
	scene.add(fence.getObject3D());
	fence.getObject3D().rotation.y = - Math.PI / 2;

	for (let i = 0; i < 50; i++) {
		let ball = new Ball(randFloat(-250, 250) , 0, randFloat(-250, 250));
		ball.setVelocity(new THREE.Vector3(randFloat(-240, 240), 0, randFloat(-240, 240)));
		scene.add(ball.object);
		balls.push(ball);
		objects.push(ball);
	}

	let ball = new Ball(150, 0, 0);
	ball.setVelocity(new THREE.Vector3(-70, 0, 0));
	scene.add(ball.object);
	balls.push(ball);
	objects.push(ball);

	ball = new Ball(-150, 0, 0);
	ball.setVelocity(new THREE.Vector3(70, 0, 2));
	scene.add(ball.object);
	balls.push(ball);
	objects.push(ball);

    window.addEventListener("resize", updateProjMatrix);
    window.requestAnimationFrame(world_cycle);
}
