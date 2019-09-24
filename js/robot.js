class Robot {
    constructor(x, y, z) {
        this.object = new THREE.Object3D();
        this.material = new THREE.MeshBasicMaterial({color: 0x777777, wireframe: true});

        var addWheel = (function(obj, mat, x, y, z) {
            let geometry = new THREE.SphereGeometry(4, 10, 10);
            let mesh = new THREE.Mesh(geometry, mat);

            mesh.position.set(x, y, z);
            obj.add(mesh);
        });

        var addBase = (function(obj, mat) {
            addWheel(obj, mat, -21, 4, -21);
            addWheel(obj, mat, -21, 4, 21);
            addWheel(obj, mat, 21, 4, -21);
            addWheel(obj, mat, 21, 4, 21);

            let baseGeometry = new THREE.BoxGeometry(50, 4, 50);
            let baseMesh = new THREE.Mesh(baseGeometry, mat);
            baseMesh.position.set(0, 10, 0);
            obj.add(baseMesh);

            let capGeometry = new THREE.SphereGeometry(12.5, 10, 10, 0, Math.PI * 2, 0, Math.PI/2);
            let capMesh = new THREE.Mesh(capGeometry, mat);
            capMesh.position.set(0, 12, 0);
            obj.add(capMesh);
        });

        var newArm = (function(mat, x, y, z) {
            let armObject = new THREE.Group();

            let armGeometry = new THREE.BoxGeometry(5, 50, 5);
            let armMesh = new THREE.Mesh(armGeometry, mat);
            armMesh.position.set(0, 25, 0);
            armObject.add(armMesh);

            let artGeometry = new THREE.SphereGeometry(5.5, 10, 10);
            let artMesh = new THREE.Mesh(artGeometry, mat);
            artMesh.position.set(0, 50, 0);
            armObject.add(artMesh);

            armObject.position.set(x, y, z);
            return armObject;
        });

        var addFinger = (function(parent, mat, x, y, z) {
            let geometry = new THREE.BoxGeometry(2.5, 10, 2.5);
            let mesh = new THREE.Mesh(geometry, mat);

            mesh.position.set(x, y, z);
            parent.add(mesh);
        });

        var newHand = (function(mat, x, y, z) {
            let handObject = new THREE.Group();

            addFinger(handObject, 3.75, 2, 0);
            addFinger(handObject, -3.75, 2, 0);

            let geometry = new THREE.CylinderGeometry(5, 5, 2, 10);
            let mesh = new THREE.Mesh(geometry, mat);

            handObject.add(mesh);
        });

        addBase(this.object, this.material);

        this.arm = newArm(this.object, this.material, 0, 12, 0);
        let forearm = newArm(this.object, this.material, 0, 50, 0);
        this.object.add(this.arm);
        this.arm.add(forearm);
        forearm.rotation.z = -Math.PI/2; //Set 90º fixed angle

        newHand(forearm, 0, 54, 0);

        this.object.position.set(x, y, z);
    }

    update() {

    }

    display() {

    }

    getObject3D() {return this.object};
} 