var renderCamera, scene, renderer, inputManager;

var sideCamera, aboveCamera, frontCamera;

function render() {
    renderer.render(scene, renderCamera);
}

function onResize() {
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0 && renderCamera.isPerspectiveCamera == true) {
        renderCamera.aspect = renderer.getSize().width/renderer.getSize().height;
        renderCamera.updateProjectionMatrix();
    }
}

function createCameras() {
    'use strict';
	renderCamera = aboveCamera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2,
										 window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
	aboveCamera.position.x = 0;
	aboveCamera.position.y = 50;
	aboveCamera.position.z = 0;
	aboveCamera.lookAt(scene.position);

    sideCamera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight,
                                         1, 1000);
    sideCamera.position.x = 150;
    sideCamera.position.y = 50;
    sideCamera.position.z = 0;
    sideCamera.lookAt(scene.position);

	frontCamera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight,
										 1, 1000);
	frontCamera.position.x = 0;
	frontCamera.position.y = 50;
	frontCamera.position.z = 150;
}

function createScene() {
    'use strict';
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(10));
}

function createRenderer() {
    'use strict';
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function world_init() {
    createRenderer();
    createScene();
    createCameras();
    input_init();

    window.addEventListener("resize", onResize);

    let objects = [];

    let robot = new Robot(0, 0, 0);
    scene.add(robot.getObject3D());
    objects.push(robot);

    while (1) {
		if(input_getKey("1")){
			renderCamera = aboveCamera;
		}else if(input_getKey("2")){
			renderCamera = sideCamera;
		}else if(input_getKey("3")){
			renderCamera = frontCamera;
		}

        objects.forEach(obj => obj.update());
        render();
        await sleep(1/6);
    }
}
