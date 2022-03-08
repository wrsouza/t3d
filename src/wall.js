class Wall {
  constructor({
    container,
    width,
    height,
    depth,
    blocks,
    colors,
    position,
    rotation,
  }) {
    this.container = container;
    this.wallWidth = width;
    this.wallHeight = height;
    this.wallDepth = depth;
    this.wallBlocks = blocks;
    this.wallColors = colors;
    this.wallMaskColor = 0xff0000;
    this.position = position;
    this.rotation = rotation;
  }

  build() {
    this.wall = new THREE.Group();
    this.wall.position.set(this.position.x, this.position.y, this.position.z);
    this.wall.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.container.add(this.wall);
    //this.makeMask();
    this.makeWalls();
  }

  makeMask() {
    const mesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry(
        this.wallWidth,
        this.wallHeight,
        this.wallDepth
      ),
      new THREE.MeshStandardMaterial({ color: this.wallMaskColor })
    );
    mesh.position.y = this.wallHeight / 2;
    this.wall.add(mesh);
  }

  makeWalls() {
    let x = this.wallWidth / 2;
    let y = this.wallHeight;
    let sel = 0;
    for (const rowBlocks of this.wallBlocks) {
      for (const block of rowBlocks) {
        const width = this.wallWidth * block[0];
        const height = this.wallHeight * block[1];

        if (this.wallColors[sel]) {
          const mesh = new THREE.Mesh(
            new THREE.BoxBufferGeometry(width, height, this.wallDepth),
            new THREE.MeshStandardMaterial({ color: this.wallColors[sel] })
          );
          mesh.position.x = x - width / 2;
          mesh.position.y = y - height / 2;
          this.wall.add(mesh);
        }
        x -= width;
        if ((sel + 1) % rowBlocks.length == 0) {
          x = this.wallWidth / 2;
          y -= height;
        }
        sel++;
      }
    }
  }

  add(obj) {
    this.wall.add(obj);
  }
}

export default Wall;
