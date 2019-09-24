var camera, scene, renderer, inputManager;

function render() {
    renderer.render(scene, camera);
}

function onResize() {
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = renderer.getSize().width/renderer.getSize().height;
        camera.updateProjectionMatrix();
    }
}

function createCamera() {
    'use strict';
    camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight,
                                         1, 1000);
    camera.position.x = 150;
    camera.position.y = 50;
    camera.position.z = 0;
    camera.lookAt(scene.position);
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

function updateObject(obj) {
   obj.update(); 
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function world_init() {
    createRenderer();
    createScene();
    createCamera();
    input_init();

    window.addEventListener("resize", onResize);

    let objects = [];

    let robot = new Robot(0, 0, 0);
    scene.add(robot.getObject3D());
    objects.push(robot);

    while (1) {
        objects.forEach(updateObject);
        render();
        await sleep(1/6);
    }
}