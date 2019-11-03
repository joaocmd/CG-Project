const OFF_MATERIAL = new THREE.MeshBasicMaterial({color: 0x333333});

class Spotlight {
  constructor(x, y, z, rot_x, rot_y, rot_z, color) {

    this.object = new THREE.Group();
    let geometry = new THREE.ConeGeometry(85, 200, 32, 32);
		let materials = [new THREE.MeshPhongMaterial({color: 0x222222}),
							       new THREE.MeshLambertMaterial({color: 0x222222}),
							       new THREE.MeshBasicMaterial({color: 0x222222})];
    let mesh = new THREE.Mesh(geometry);
    mesh.rotation.x = -Math.PI/2;

	this.meshMaterials = new MeshMaterials([mesh], materials);
    this.object.add(mesh);
	this.meshMaterials.update(0);


	this.object.position.set(x, y, z);
    this.object.rotation.set(rot_x, rot_y, rot_z)

    let lampGeometry = new THREE.SphereGeometry(90, 32, 32);
    this.lampMaterial = new THREE.MeshBasicMaterial({color: color});
    this.lamp = new THREE.Mesh(lampGeometry, this.lampMaterial);
    this.lamp.position.set(0, 0, 100);
    this.object.add(this.lamp);

    this.light = new THREE.SpotLight(color);
	this.light.castShadow = true;
	this.light.shadow.camera.near = 0.1;
	this.light.shadow.camera.far = 5000
    let targetPos = this.object.position.clone().add(this.object.getWorldDirection().multiplyScalar(500));
    let target = new THREE.Object3D();
    target.position.copy(targetPos);
    scene.add(target);
    this.light.target = target;
    
    this.light.angle = Math.PI/8;
    this.light.penumbra = 0.2;
    this.object.add(this.light);
  }

  toggle() {
    this.light.visible = !this.light.visible;
    if (this.light.visible) {
      this.lamp.material = this.lampMaterial;
    } else {
      this.lamp.material = OFF_MATERIAL;
    }
  }

  getObject3D() {
		return this.object;
  }
  
	update(materialIndex){
		this.meshMaterials.update(materialIndex);
	}
}
