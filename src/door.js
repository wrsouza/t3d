import gsap from 'gsap'
import { Group, Mesh, BoxBufferGeometry, MeshStandardMaterial } from "three";

class Door {
  constructor({ container, width, height, depth, color, position, rotation }) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
    this.position = position;
    this.rotation = rotation;
    this.door = new Group();
    this.isAnimate = false;
  }

  build() {
    this.container.add(this.door);
    this.door.position.set(this.position.x, this.position.y, this.position.z);
    this.door.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    const mesh = new Mesh(
      new BoxBufferGeometry(this.width, this.height, this.depth),
      new MeshStandardMaterial({ color: this.color })
    );
    mesh.position.x = this.width / 2;
    mesh.position.y = this.height / 2;
    this.door.add(mesh);
  }

  animate() {
    if (!this.isAnimate) {
      this.isAnimate = true
      gsap.to(this.door.rotation, { y: -Math.PI / 2, duration: 1, ease: "none", onComplete: () => {
        gsap.to(this.door.rotation, { y: 0, duration: 1, delay: 1, ease: "none", onComplete: () => {
          this.isAnimate = false
        }})
      }})
    }
  }
}

export default Door;
