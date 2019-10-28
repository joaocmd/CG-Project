var SPOT_COLOR = 0x6D6D6D;

class Spotlight {
  constructor(x, y, z, rot_x, rot_y, rot_z, target) {

    this.object = new THREE.Group();
    let geometry = new THREE.ConeGeometry(93.75, 200, 32);
    let material = new THREE.MeshBasicMaterial({color: SPOT_COLOR});
    this.mesh = new THREE.Mesh(geometry, material);

    this.object.add(this.mesh);

		this.object.position.set(x, y, z);
    this.object.rotation.set(rot_x, rot_y, rot_z)

    geometry = new THREE.SphereGeometry(93.75, 600, 32);
    material = new THREE.MeshBasicMaterial({color: 0xE0E06A});
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -100, 0);
    this.object.add(mesh);

    var spot_l = new THREE.SpotLight(0xffffff);
    spot_l.target = target;
    spot_l.angle = 0;
    this.object.add(spot_l);
  }

  turn_on() {
    this.object.children[2].angle = 0.2;
  }

  turn_off() {
    this.object.children[2].angle = 0;
  }

  getObject3D(){
		return this.object;
	}

  update(){
	}
}
