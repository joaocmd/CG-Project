let _upVector = new THREE.Vector3(0, 1, 0);
let _zeroVector = new THREE.Vector3(0, 0, 0);

let _normal = new THREE.Vector3();
let _overlap = new THREE.Vector3();

const GRAVITY = -9.8 * 100; // cm/s^2

let _currentVelocity = new THREE.Vector3();
let _axis = new THREE.Vector3();
let _frictionVector =  new THREE.Vector3();
let _relativeVelocity = new THREE.Vector3();

class Ball {
	constructor(x, y, z, creation_time) {
		this.object = new THREE.Group();

		this.velocity = new THREE.Vector3(0, 0, 0);
		this.friction = 100;

		this.radius = 30;

		this.axesHelper = new THREE.AxesHelper(75);
		this.object.add(this.axesHelper);
		this.axesHelper.visible = axes;

		let geometry = new THREE.SphereGeometry(this.radius, 14, 10);

		let color = new THREE.Color(0xffffff);
		color.setHex(Math.random() * 0xffffff)
		let material = new THREE.MeshBasicMaterial({color: color, wireframe: wireframe});

		let mesh = new THREE.Mesh(geometry, material);
		this.object.add(mesh);
		this.object.position.set(x, y, z);
		this.creation_time = creation_time;
	}

	setVelocityVector(velocity) {
		this.velocity.copy(velocity);
	}

	setVelocity(x, y, z){
		this.velocity.set(x, y, z);
	}

	isInside() {
		return this.object.position.x <= rightLimit + 2*this.radius &&
			   this.object.position.x >= leftLimit - 2*this.radius &&
			   this.object.position.z <= -backLimit + this.radius &&
			   Math.abs(this.object.position.y) <= 30;
	}

	handleCollisions() {

		// Wall Collision
		if (this.isInside()) {
			this.velocity.y = 0;
			this.object.position.y = 0;
			if (this.object.position.x - this.radius <= leftLimit) {
				this.object.position.x = leftLimit + this.radius;
				this.velocity.x = -this.velocity.x; //faster than using Vector3.reflect since the colliders are alligned
			}
			if (this.object.position.x + this.radius >= rightLimit) {
				this.object.position.x = rightLimit - this.radius;
				this.velocity.x = -this.velocity.x;
			}
			if (this.object.position.z - this.radius <= backLimit) {
				this.object.position.z = backLimit + this.radius;
				this.velocity.z = -this.velocity.z;
			}
		}

		// Ball Collision
		balls.forEach(other => {
			if (other != this) {
				_normal.copy(other.object.position).sub(this.object.position);
				if (_normal.lengthSq() <= Math.pow(this.radius * 2, 2)) {
					let distance = _normal.length();
					let overlapLength = this.radius*2 - distance;

					_overlap.copy(_normal).normalize().multiplyScalar(overlapLength/2);

					// Subtract overlap
					this.object.position.sub(_overlap);
					other.object.position.add(_overlap);

					// Subtract other velocity
					_relativeVelocity = this.velocity.clone().sub(other.velocity);
					_normal.normalize().multiplyScalar(_relativeVelocity.dot(_normal));

					this.velocity.sub(_normal);
					other.velocity.add(_normal);
				}
			}
		});
	}

	update() {
		if (!this.velocity.equals(_zeroVector)) {
			// Basic movement
			_currentVelocity.copy(this.velocity).multiplyScalar(time_deltaTime);
			this.object.position.add(_currentVelocity);

			// Ball rotation
			_axis.crossVectors(_upVector, _currentVelocity.clone().projectOnPlane(_upVector));
			_axis.normalize();
			this.object.rotateOnWorldAxis(_axis, _currentVelocity.length()/this.radius);

			// Drag
			_frictionVector.copy(_currentVelocity);
			_frictionVector.normalize().multiplyScalar(this.friction*time_deltaTime);
			this.velocity.sub(_frictionVector);

			//Set velocity to zero if came to a full stop (deny acceleration)
			if (Math.abs(this.velocity.angleTo(_frictionVector)) >= 0.3) {
				this.velocity.set(0, 0, 0);
			}
		}

		if ((time_lastFrame - this.creation_time) > 450 && !this.isInside()) {
			this.velocity.y += GRAVITY * time_deltaTime;
		}

		this.handleCollisions();
	}

	toggleAxes() {
		this.axesHelper.visible = axes
	}

	getObject3D() {
		return this.object;
	}
}
