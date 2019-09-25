// FIXME MEASURES IN METERS
class Robot {
	constructor(x, y, z) {
		this.object = new THREE.Object3D();
		this.rotSpeed = 0.02;
		this.walkSpeed = 0.6;

		var darkMat = new THREE.MeshBasicMaterial({color: 0x777777});
		var lightMat = new THREE.MeshBasicMaterial({color: 0xbbbbbb});

		// Create Wheel
		var addWheel = (function(obj, mat, x = 0, y = 0, z = 0) {
			let geometry = new THREE.SphereGeometry(4, 5, 5);
			let mesh = new THREE.Mesh(geometry, mat);
			mesh.name = "wheel";

			mesh.position.set(x, y, z);
			obj.add(mesh);
		});

		// Create Base
		var addBase = (function(obj, baseMat, wheelsMat, x = 0, y = 0, z = 0) {
			let base = new THREE.Group();
			let baseGeometry = new THREE.BoxGeometry(50, 4, 50);
			let baseMesh = new THREE.Mesh(baseGeometry, baseMat);
			base.name = "base";
			baseMesh.name = "plank";
			baseMesh.position.set(0, 10, 0);
			base.add(baseMesh);

			let capGeometry = new THREE.SphereGeometry(12.5, 8, 4, 0, Math.PI * 2, 0, Math.PI/2);
			let capMesh = new THREE.Mesh(capGeometry, wheelsMat);
			capMesh.name = "cap";
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
			mesh.name = "finger";

			mesh.position.set(x, y + fingerLength/2, z);
			parent.add(mesh);
		});

		// Create Arm
		var addArm = (function(obj, armMat, mat2, x = 0, y = 0, z = 0) {
			let armGroup = new THREE.Group();
			let armObject = new THREE.Group();
			armGroup.name = "armGroup";
			armObject.name = "armObject";

			// Vertical arm
			let armGeometry = new THREE.BoxGeometry(5, 40, 5);
			let armMesh = new THREE.Mesh(armGeometry, armMat);
			armMesh.name = "armMesh";
			armMesh.position.set(0, 25, 0);
			armObject.add(armMesh);

			let artGeometry = new THREE.SphereGeometry(5.5, 5, 5);
			let artMesh = new THREE.Mesh(artGeometry, mat2);
			artMesh.name = "elbow";
			artMesh.position.set(0, 40, 0);
			armObject.add(artMesh);

			// Forearm
			let forearm = new THREE.Object3D();
			armGeometry = new THREE.BoxGeometry(5, 40, 5);//Isto assusta-me mas faz sentido
			armMesh = new THREE.Mesh(armGeometry, armMat);
			armMesh.position.set(0, 20, 0);
			armMesh.name = "forearm";
			forearm.add(armMesh);

			artGeometry = new THREE.SphereGeometry(5.5, 5, 5);
			artMesh = new THREE.Mesh(artGeometry, mat2);
			artMesh.position.set(0, 40, 0);
			artMesh.name = "wrist";
			forearm.add(artMesh);

			// Rotate and position
			forearm.rotation.x = -Math.PI/2;
			forearm.position.set(0, 40, 0);

			armObject.add(forearm);

			// Hand
			let hand = new THREE.Group();
			hand.name = "hand";
			let wristGeometry = new THREE.CylinderGeometry(5, 5, 1,5);
			let wristMesh = new THREE.Mesh(wristGeometry, armMat);
			wristMesh.name = "wrist cylinder";
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
		let newRot = new THREE.Vector3(this.arm.rotation.x, this.armBase.rotation.y, 0);
		if (input_getKey("Q"))  {
			newRot.x += this.rotSpeed;
		}
		if (input_getKey("W")) {
			newRot.x -= this.rotSpeed;
		}
		//TODO: find pretty way to clamp values
		if (newRot.x <= -Math.PI/5) newRot.x = -Math.PI/5;
		else if (newRot.x >= Math.PI/3) newRot.x = Math.PI/3;

		if (input_getKey("A")) {
			newRot.y += this.rotSpeed;
		}
		if (input_getKey("S")) {
			newRot.y -= this.rotSpeed;
		}
		this.arm.rotation.x = newRot.x;
		this.armBase.rotation.y = newRot.y;

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
		// Normalize vector magnitude for constant velocity and apply speed
		if (velocity.length() != 0) {
			velocity.multiplyScalar(1/velocity.length() * this.walkSpeed);
			velocity.multiplyScalar(1/velocity.length() * this.walkSpeed);
		}

		this.object.position.z += velocity.z;
		this.object.position.x += velocity.x;
	}

	display() {

	}

	// Get object to render
	getObject3D() {
		return this.object;
	}
}
