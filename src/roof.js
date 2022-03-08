class Roof {
  constructor({ container, width, height, color, position, rotation }) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.color = color;
    this.position = position;
    this.rotation = rotation;
    this.roof = new THREE.Group();
  }

  build() {
    this.roof.position.set(this.position.x, this.position.y, this.position.z);
    this.roof.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.container.add(this.roof);
    const mesh = new THREE.Mesh(
      new THREE.ConeBufferGeometry(this.width, this.height, 4),
      new THREE.MeshStandardMaterial({ color: this.color })
    );
    mesh.position.y = this.height / 2;
    this.roof.add(mesh);
  }
}

export default Roof;
