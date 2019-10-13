let _upVector = new THREE.Vector3(0, 1, 0);
let _zeroVector = new THREE.Vector3(0, 0, 0);

let _normal = new THREE.Vector3();
let _overlap = new THREE.Vector3();

let _currentVelocity = new THREE.Vector3();
let _axis = new THREE.Vector3();
let _frictionVector =  new THREE.Vector3();
let _relativeVelocity = new THREE.Vector3();

class Ball {
	constructor(x, y, z) {
		this.object = new THREE.Group();

		this.velocity = THREE.Vector3(0, 0, 0);
		this.friction = 25;
		this.gravity = -9.8;

		this.radius = 10;

		this.axesHelper = new THREE.AxesHelper(50);
		this.object.add(this.axesHelper);
		this.axesHelper.visible = false;

		let geometry = new THREE.SphereGeometry(this.radius, 12, 8);

		let color = new THREE.Color(0xffffff);
		color.setHex(Math.random() * 0xffffff)
		let material = new THREE.MeshBasicMaterial({color: color});

		let mesh = new THREE.Mesh(geometry, material);
		this.object.add(mesh);
		this.object.position.set(x, y, z);
	}

	setVelocity(velocity) {
		this.velocity =  velocity;
	}

	update() {
		if (this.velocity.equals(_zeroVector)) {
			return;
		}

		// Basic movement
		_currentVelocity.copy(this.velocity).multiplyScalar(time_deltaTime);
		this.object.position.add(_currentVelocity);

		_axis.crossVectors(_upVector, _currentVelocity);
		_axis.normalize();
		this.object.rotateOnWorldAxis(_axis, _currentVelocity.length()/this.radius);

		_frictionVector.copy(_currentVelocity);
		_frictionVector.normalize();
		_frictionVector.negate();
		_frictionVector.multiplyScalar(this.friction*time_deltaTime);
		this.velocity.add(_frictionVector);
		
		//Set velocity to zero if came to a full stop (deny acceleration)
		if (Math.abs(this.velocity.angleTo(_frictionVector)) <= 0.3) {
			this.velocity.set(0, 0, 0);
		}

		if (this.object.position.x - this.radius <= -260) {
			this.object.position.x = -260 + this.radius;
			this.velocity.x = -this.velocity.x; //faster than using Vector3.reflect since the colliders are parallel
		}
		if (this.object.position.x + this.radius >= 260) {
			this.object.position.x = 260 - this.radius;
			this.velocity.x = -this.velocity.x;
		}
		if (this.object.position.z - this.radius <= -260) {
			this.object.position.z = -260 + this.radius;
			this.velocity.z = -this.velocity.z;
		}

		// Collision detection
		balls.forEach(other => {
			if (other != this) {
				_normal.copy(other.object.position).sub(this.object.position)
				if (_normal.lengthSq() <= Math.pow(this.radius * 2, 2)) {
					let distance = _normal.length();
					let overlapLength = this.radius*2 - distance;
					_overlap.copy(_normal).normalize().multiplyScalar(overlapLength/2);

					this.object.position.sub(_overlap);
					other.object.position.add(_overlap);

					_normal.normalize();
					_relativeVelocity.copy(this.velocity).sub(other.velocity);

					_normal.multiplyScalar(_relativeVelocity.dot(_normal));

					this.velocity.sub(_normal);
					other.velocity.add(_normal);
				}
			}	
		});
	}

	toggleAxes() {
		this.axesHelper.visible = !this.axesHelper.visible
	}

	getObject3D() {
		return this.object;
	}
}
