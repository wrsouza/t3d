class Door {
  constructor({ container, width, height, depth, color, position, rotation }) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
    this.position = position;
    this.rotation = rotation;
    this.door = new THREE.Group();
    this.animateDoor = -0.01;
  }

  build() {
    this.container.add(this.door);
    this.door.position.set(this.position.x, this.position.y, this.position.z);
    this.door.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    const mesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry(this.width, this.height, this.depth),
      new THREE.MeshStandardMaterial({ color: this.color })
    );
    mesh.position.x = this.width / 2;
    mesh.position.y = this.height / 2;
    this.door.add(mesh);
  }

  animate() {
    this.door.rotation.y += this.animateDoor;
    if (this.door.rotation.y <= -Math.PI / 2) {
      this.animateDoor = 0.01;
    }
    if (this.door.rotation.y >= 0) {
      this.animateDoor = -0.01;
    }
  }
}

export default Door;
