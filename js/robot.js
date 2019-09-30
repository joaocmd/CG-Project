// FIXME MEASURES IN METERS
class Robot {
	constructor(x, y, z) {
		this.object = new THREE.Group();
		this.rotSpeed = 0.01
		this.walkSpeed = 0.6;

		let darkMat = new THREE.MeshBasicMaterial({color: 0x777777});
		let lightMat = new THREE.MeshBasicMaterial({color: 0xbbbbbb});

		// Create Wheel
		var addWheel = (function(obj, mat, x = 0, y = 0, z = 0) {
			let geometry = new THREE.SphereGeometry(4, 5, 5);
			let mesh = new THREE.Mesh(geometry, mat);

			mesh.position.set(x, y, z);
			obj.add(mesh);
		});

		// Create Base
		var addBase = (function(obj, baseMat, wheelsMat, x = 0, y = 0, z = 0) {
			let base = new THREE.Group();
			let baseGeometry = new THREE.BoxGeometry(50, 4, 50);
			let baseMesh = new THREE.Mesh(baseGeometry, baseMat);
			baseMesh.position.set(0, 10, 0);
			base.add(baseMesh);

			let capGeometry = new THREE.SphereGeometry(12.5, 8, 4, 0, Math.PI * 2, 0, Math.PI/2);
			let capMesh = new THREE.Mesh(capGeometry, wheelsMat);
			capMesh.position.set(0, 12, 0);
			base.add(capMesh);

			base.position.set(x,y,z);

			obj.add(base);

			// Add wheels to base
			addWheel(obj, wheelsMat, -21, 4, -21);
			addWheel(obj, wheelsMat, -21, 4, 21);
			addWheel(obj, wheelsMat, 21, 4, -21);
			addWheel(obj, wheelsMat, 21, 4, 21);
		});

		var addFinger = (function(parent, mat, x, y, z) {
			let fingerLength = 10;
			let geometry = new THREE.BoxGeometry(4, fingerLength, 2.5);
			let mesh = new THREE.Mesh(geometry, mat);

			mesh.position.set(x, y + fingerLength/2, z);
			parent.add(mesh);
		});

		// Create Arm
		var addArm = (function(obj, armMat, mat2, x = 0, y = 0, z = 0) {
			let armGroup = new THREE.Group();
			let armObject = new THREE.Group();

			// Vertical arm
			let armGeometry = new THREE.BoxGeometry(5, 35, 5);
			let armMesh = new THREE.Mesh(armGeometry, armMat);
			armMesh.position.set(0, 20, 0);
			armObject.add(armMesh);

			let artGeometry = new THREE.SphereGeometry(5.5, 5, 5);
			let artMesh = new THREE.Mesh(artGeometry, mat2);
			artMesh.position.set(0, 40, 0);
			armObject.add(artMesh);

			// Forearm
			let forearm = new THREE.Object3D();
			armGeometry = new THREE.BoxGeometry(5, 40, 5);
			armMesh = new THREE.Mesh(armGeometry, armMat);
			armMesh.position.set(0, 20, 0);
			forearm.add(armMesh);

			artGeometry = new THREE.SphereGeometry(5.5, 5, 5);
			artMesh = new THREE.Mesh(artGeometry, mat2);
			artMesh.position.set(0, 40, 0);
			forearm.add(artMesh);

			// Rotate and position
			forearm.rotation.x = -Math.PI/2;
			forearm.position.set(0, 40, 0);

			armObject.add(forearm);

			// Hand
			let hand = new THREE.Group();

			let wristGeometry = new THREE.CylinderGeometry(5, 5, 1.5, 5);
			let wristMesh = new THREE.Mesh(wristGeometry, armMat);
			wristMesh.position.set(0, 0.5, 0);
			hand.add(wristMesh);

			// Fingers
			addFinger(hand, armMat, 0, 1, 3.7);
			addFinger(hand, armMat, 0, 1, -3.7);

			hand.position.set(0, 44, 0);
			forearm.add(hand);

			armGroup.position.set(x, y, z);
			armGroup.add(armObject);
			obj.add(armGroup);
			return [armGroup, armObject];
		});

		addBase(this.object, darkMat, lightMat);
		let armParts = addArm(this.object, darkMat, lightMat, 0, 12, 0);
		this.armBase = armParts[0];
		this.arm = armParts[1];

		this.object.position.set(x, y, z);
	}

	update() {
		let armRot = new THREE.Vector3(this.arm.rotation.x, this.armBase.rotation.y, 0);
		if (input_getKey("Q"))  {
			armRot.x += this.rotSpeed;
		}
		if (input_getKey("W")) {
			armRot.x -= this.rotSpeed;
		}
		armRot.x = Math.min(Math.max(armRot.x, -Math.PI/5), Math.PI/3);

		if (input_getKey("A")) {
			armRot.y += this.rotSpeed;
		}
		if (input_getKey("S")) {
			armRot.y -= this.rotSpeed;
		}
		this.arm.rotation.x = armRot.x;
		this.armBase.rotation.y = armRot.y;

		let velocity = new THREE.Vector3(0, 0, 0);
		if (input_getKey(38)) { //Up
			velocity.z -= 1;
		}
		if (input_getKey(40)) { //Down
			velocity.z += 1;
		}
		if (input_getKey(39)) { //Right
			velocity.x += 1;
		}
		if (input_getKey(37)) { //Left
			velocity.x -= 1;
		}
		//Normalize vector magnitude for constant velocity and apply speed
		if(velocity.length() !== 0){
			velocity.multiplyScalar(1/velocity.length() * this.walkSpeed);	
			velocity.multiplyScalar(1/velocity.length() * this.walkSpeed);	
		}	

		this.object.position.z += velocity.z;	
		this.object.position.x += velocity.x;	
	}

	getObject3D() {
		return this.object;
	}
}
