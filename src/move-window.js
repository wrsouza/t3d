import { Group, BoxBufferGeometry, MeshStandardMaterial } from "three";

class MoveWindow {
  constructor({ container, width, height, depth, color, position, rotation }) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
    this.position = position;
    this.rotation = rotation;
    this.window = new Group();
    this.animateWindow = -0.01;
  }

  build() {
    this.window.position.set(this.position.x, this.position.y, this.position.z);
    this.window.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.container.add(this.window)
    this.makeLeft()
    this.makeRight()
  }

  makeLeft() {
    const width = this.width / 2
    const mesh = new THREE.Mesh(
      new BoxBufferGeometry(width, this.height, this.depth),
      new MeshStandardMaterial({ color: this.color, transparent: true, opacity: 0.5 })
    )
    mesh.position.x = - (width/2)
    mesh.position.z = -(this.depth/2)
    mesh.position.y = this.height / 2;
    this.window.add(mesh)
  }

  makeRight() {
    const width = this.width / 2
    const mesh = new THREE.Mesh(
      new BoxBufferGeometry(width, this.height, this.depth),
      new MeshStandardMaterial({ color: this.color, transparent: true, opacity: 0.5 })
    )
    mesh.position.x = (width/2)
    mesh.position.z = this.depth/2;
    mesh.position.y = this.height / 2;
    this.window.add(mesh)
  }
}

export default MoveWindow
