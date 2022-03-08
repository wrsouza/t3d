import gsap from 'gsap'
import { Group, Mesh, BoxBufferGeometry, MeshStandardMaterial } from "three";

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
    this.isAnimate = false;
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
    this.meshLeft = new Mesh(
      new BoxBufferGeometry(width, this.height, this.depth),
      new MeshStandardMaterial({ color: this.color, transparent: true, opacity: 0.5 })
    )
    this.meshLeft.position.x = - (width/2)
    this.meshLeft.position.z = -(this.depth/2)
    this.meshLeft.position.y = this.height / 2;
    this.window.add(this.meshLeft)
  }

  makeRight() {
    const width = this.width / 2
    this.meshRight = new THREE.Mesh(
      new BoxBufferGeometry(width, this.height, this.depth),
      new MeshStandardMaterial({ color: this.color, transparent: true, opacity: 0.5 })
    )
    this.meshRight.position.x = (width/2)
    this.meshRight.position.z = this.depth/2;
    this.meshRight.position.y = this.height / 2;
    this.window.add(this.meshRight)
  }

  animate() {
    if (!this.isAnimate) {
      this.isAnimate = true
      const width = this.width / 2
      gsap.to(this.meshLeft.position, { x: width/2, duration: 1, ease: "none", onComplete: () => {
        gsap.to(this.meshLeft.position, { x: -width/2, duration: 1, delay: 1, ease: "none", onComplete: () => {
          gsap.to(this.meshRight.position, { x: -width/2, duration: 1, delay: 1, ease: "none", onComplete: () => {
            gsap.to(this.meshRight.position, { x: width/2, duration: 1, delay: 1, ease: "none", onComplete: () => {
              this.isAnimate = false
            }})
          }})
        }})
      }})
    }
  }
}

export default MoveWindow
