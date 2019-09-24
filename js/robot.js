
class Robot {
    constructor(x, y, z) {
        this.object = new THREE.Object3D();
        this.material = new THREE.MeshBasicMaterial({color: 0x777777, wireframe: true});

        var addWheel = (function(obj, mat, x, y, z) {
            'use strict';
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

            let baseGeometry = new THREE.CubeGeometry(50, 4, 50);
            let baseMesh = new THREE.Mesh(baseGeometry, mat);
            baseMesh.position.set(0, 10, 0);
            obj.add(baseMesh);

            let capGeometry = new THREE.SphereGeometry(12.5, 10, 10, 0, Math.PI * 2, 0, Math.PI/2);
            let capMesh = new THREE.Mesh(capGeometry, mat);
            capMesh.position.set(0, 12, 0);
            obj.add(capMesh);
        });

        var newArm = (function(mat, x, y, z) {
            let armObject = new THREE.Object3D();

            let armGeometry = new THREE.CubeGeometry(5, 50, 5);
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
        addBase(this.object, this.material);
        this.arm = newArm(this.object, this.material, 0, 12, 0);
        this.object.add(this.arm);
        // let forearm = newArm(this.object, this.material, 0, 62, 0);
        // forearm.rotation.z = -Math.PI/2;
        this.object.position.set(x, y, z);
    }

    update() {

    }

    display() {

    }

    getObject3D() {return this.object};
} 