class Robot {
	constructor(x, y, z) {
		this.object = new THREE.Object3D();
		this.material = new THREE.MeshBasicMaterial({color: 0x777777, wireframe: true});
		this.rotSpeed = 0.02;
		this.walkSpeed = 0.6;

		// Create Wheel
		var addWheel = (function(obj, mat, x = 0, y = 0, z = 0) {
			let geometry = new THREE.SphereGeometry(4, 10, 10);
			let mesh = new THREE.Mesh(geometry, mat);

			mesh.position.set(x, y, z);
			obj.add(mesh);
		});

		// Create Base
		var addBase = (function(obj, mat, x = 0, y = 0, z = 0) {
			let base = new THREE.Group();
			let baseGeometry = new THREE.BoxGeometry(50, 4, 50);
			let baseMesh = new THREE.Mesh(baseGeometry, mat);
			baseMesh.position.set(0, 10, 0);
			base.add(baseMesh);

			let capGeometry = new THREE.SphereGeometry(12.5, 10, 10, 0, Math.PI * 2, 0, Math.PI/2);
			let capMesh = new THREE.Mesh(capGeometry, mat);
			capMesh.position.set(0, 12, 0);
			base.add(capMesh);

			base.position.set(x,y,z);

			obj.add(base);

			// Add wheels to base
			addWheel(obj, mat, -21, 4, -21);
			addWheel(obj, mat, -21, 4, 21);
			addWheel(obj, mat, 21, 4, -21);
			addWheel(obj, mat, 21, 4, 21);
		});

		var addFinger = (function(parent, mat, x, y, z) {
			let fingerLength = 10;
			let geometry = new THREE.BoxGeometry(4, fingerLength, 2.5);
			let mesh = new THREE.Mesh(geometry, mat);

			mesh.position.set(x, y + fingerLength/2, z);
			parent.add(mesh);
		});

		// Create Arm
		var addArm = (function(obj, mat, x = 0, y = 0, z = 0) {
			let armGroup = new THREE.Group();
			let armObject = new THREE.Group();

			// Vertical arm
			let armGeometry = new THREE.BoxGeometry(5, 50, 5);
			let armMesh = new THREE.Mesh(armGeometry, mat);
			armMesh.position.set(0, 25, 0);
			armObject.add(armMesh);

			let artGeometry = new THREE.SphereGeometry(5.5, 10, 10);
			let artMesh = new THREE.Mesh(artGeometry, mat);
			artMesh.position.set(0, 50, 0);
			armObject.add(artMesh);

			// Horizontal arm
			let	forearm = new THREE.Object3D();
			armGeometry = new THREE.BoxGeometry(5, 50, 5);//Isto assusta-me mas faz sentido
			armMesh = new THREE.Mesh(armGeometry, mat);
			armMesh.position.set(0, 25, 0);
			forearm.add(armMesh);

			artGeometry = new THREE.SphereGeometry(5.5, 10, 10);
			artMesh = new THREE.Mesh(artGeometry, mat);
			artMesh.position.set(0, 50, 0);
			forearm.add(artMesh);

			// Rotate and position
			forearm.rotation.x = -Math.PI/2;
			forearm.position.set(0, 50, 0);

			armObject.add(forearm);

			// Hand
			let hand = new THREE.Object3D();
			let wristGeometry = new THREE.CylinderGeometry(5, 5, 1, 10);
			let wristMesh = new THREE.Mesh(wristGeometry, mat);
			wristMesh.position.set(0, 0.5, 0);
			hand.add(wristMesh);

			// Fingers
			addFinger(hand, mat, 0, 1, 3.7);
			addFinger(hand, mat, 0, 1, -3.7);

			hand.position.set(0, 54, 0);
			forearm.add(hand);

			armObject.position.set(x, y, z);
			armGroup.add(armObject);
			obj.add(armGroup);
			return [armGroup, armObject];
		});

		addBase(this.object, this.material);
		let armParts = addArm(this.object, this.material, 0, 12, 0);
		this.armBase = armParts[0];
		this.arm = armParts[1];//addArm(this.object, this.material, 0, 12, 0);

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
