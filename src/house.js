import * as THREE from "three";
import Wall from "./wall";
import Door from "./door";
import Roof from "./roof";

class House {
  constructor(scene) {
    this.scene = scene;
    this.walls = new THREE.Group();
    this.scene.add(this.walls);

    this.wallWidth = 4;
    this.wallHeight = 1.6;
    this.wallDepth = 0.1;
    this.wallColor = 0xffffff;
    this.wallMaskColor = 0xff0000;

    this.frontWall = new Wall({
      container: this.walls,
      width: this.wallWidth,
      height: this.wallHeight,
      depth: this.wallDepth,
      blocks: [
        [
          [0.4, 0.25],
          [0.2, 0.25],
          [0.4, 0.25],
        ],
        [
          [0.4, 0.75],
          [0.2, 0.75],
          [0.4, 0.75],
        ],
      ],
      colors: [0xffffff, 0xffffff, 0xffffff, 0xffffff, undefined, 0xffffff],
      position: new THREE.Vector3(0, 0, this.wallWidth / 2),
      rotation: new THREE.Vector3(0, 0, 0),
    });

    this.leftWall = new Wall({
      container: this.walls,
      width: this.wallWidth,
      height: this.wallHeight,
      depth: this.wallDepth,
      blocks: [
        [
          [0.2, 0.25],
          [0.2, 0.25],
          [0.2, 0.25],
          [0.2, 0.25],
          [0.2, 0.25],
        ],
        [
          [0.2, 0.5],
          [0.2, 0.5],
          [0.2, 0.5],
          [0.2, 0.5],
          [0.2, 0.5],
        ],
        [
          [0.2, 0.25],
          [0.2, 0.25],
          [0.2, 0.25],
          [0.2, 0.25],
          [0.2, 0.25],
        ],
      ],
      colors: [
        0xffffff,
        0xffffff,
        0xffffff,
        0xffffff,
        0xffffff,

        0xffffff,
        undefined,
        0xffffff,
        undefined,
        0xffffff,

        0xffffff,
        0xffffff,
        0xffffff,
        0xffffff,
        0xffffff,
      ],
      position: new THREE.Vector3(
        -(this.wallWidth / 2) + this.wallDepth / 2,
        0,
        0
      ),
      rotation: new THREE.Vector3(0, -Math.PI / 2, 0),
    });

    this.rightWall = new Wall({
      container: this.walls,
      width: this.wallWidth,
      height: this.wallHeight,
      depth: this.wallDepth,
      blocks: [
        [
          [0.2, 0.25],
          [0.2, 0.25],
          [0.2, 0.25],
          [0.2, 0.25],
          [0.2, 0.25],
        ],
        [
          [0.2, 0.5],
          [0.2, 0.5],
          [0.2, 0.5],
          [0.2, 0.5],
          [0.2, 0.5],
        ],
        [
          [0.2, 0.25],
          [0.2, 0.25],
          [0.2, 0.25],
          [0.2, 0.25],
          [0.2, 0.25],
        ],
      ],
      colors: [
        0xffffff,
        0xffffff,
        0xffffff,
        0xffffff,
        0xffffff,

        0xffffff,
        undefined,
        0xffffff,
        undefined,
        0xffffff,

        0xffffff,
        0xffffff,
        0xffffff,
        0xffffff,
        0xffffff,
      ],
      position: new THREE.Vector3(
        this.wallWidth / 2 - this.wallDepth / 2,
        0,
        0
      ),
      rotation: new THREE.Vector3(0, Math.PI / 2, 0),
    });
    this.bottomWall = new Wall({
      container: this.walls,
      width: this.wallWidth,
      height: this.wallHeight,
      depth: this.wallDepth,
      blocks: [
        [
          [0.15, 0.2],
          [0.3, 0.2],
          [0.1, 0.2],
          [0.3, 0.2],
          [0.15, 0.2],
        ],
        [
          [0.15, 0.6],
          [0.3, 0.6],
          [0.1, 0.6],
          [0.3, 0.6],
          [0.15, 0.6],
        ],
        [
          [0.15, 0.2],
          [0.3, 0.2],
          [0.1, 0.2],
          [0.3, 0.2],
          [0.15, 0.2],
        ],
      ],
      colors: [
        0xffffff,
        0xffffff,
        0xffffff,
        0xffffff,
        0xffffff,

        0xffffff,
        undefined,
        0xffffff,
        undefined,
        0xffffff,

        0xffffff,
        0xffffff,
        0xffffff,
        0xffffff,
        0xffffff,
      ],
      position: new THREE.Vector3(0, 0, -this.wallWidth / 2),
      rotation: new THREE.Vector3(0, 0, 0),
    });

    this.frontDoor = new Door({
      container: this.frontWall,
      width: this.wallWidth * 0.2,
      height: this.wallHeight * 0.75,
      depth: 0.02,
      color: 0x0000ff,
      position: new THREE.Vector3(-(this.wallWidth * 0.2) / 2, 0, 0),
      rotation: new THREE.Vector3(0, 0, 0),
    });

    this.roof = new Roof({
      container: this.walls,
      width: 3.1,
      height: 1,
      color: 0xff0000,
      position: new THREE.Vector3(0, 1.6, 0),
      rotation: new THREE.Vector3(0, Math.PI * 0.25, 0),
    });
  }

  build() {
    this.frontWall.build();
    this.leftWall.build();
    this.rightWall.build();
    this.bottomWall.build();
    this.frontDoor.build();
    this.roof.build();
  }

  animate() {
    this.frontDoor.animate();
  }
}

export default House;
