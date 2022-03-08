import "./scss/main.scss";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import House from "./house";

const init = () => {
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const gui = new dat.GUI();

  // Scene
  const scene = new THREE.Scene();

  // TextureLoader
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onStart = () => {
    console.log("on Start");
  };
  loadingManager.onProgress = (url, loaded, total) => {
    console.log("on Progress", (loaded / total) * 100);
  };
  loadingManager.onLoad = () => {
    console.log("on Load");
  };
  loadingManager.onError = (url) => {
    console.log("on Error");
  };
  const textureLoader = new THREE.TextureLoader(loadingManager);

  // Object
  const floor = new THREE.Mesh(
    new THREE.BoxBufferGeometry(20, 0.1, 20),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
  );
  floor.position.y = -0.05;
  scene.add(floor);

  const axesWalls = new THREE.AxesHelper();
  scene.add(axesWalls);

  const house = new House(scene);
  house.build();

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.x = 2;
  pointLight.position.y = 3;
  pointLight.position.z = 5;
  scene.add(pointLight);

  // Camera
  const fieldOfView = 75; // degrees
  const winWidth = window.innerWidth;
  const winHeight = window.innerHeight;
  const ratio = winWidth / winHeight;
  const camera = new THREE.PerspectiveCamera(fieldOfView, ratio, 0.01, 100);
  camera.position.y = 3;
  camera.position.z = 5;
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(winWidth, winHeight);
  renderer.render(scene, camera);

  // Resize Window
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  });

  window.addEventListener("dblclick", () => {
    const fullScreenElement =
      document.fullscreenElement || document.webkitFullscreenElement;
    if (!fullScreenElement) {
      if (canvas.webkitFullscreen) {
        canvas.webkitRequestFullscreen();
        return;
      }
      canvas.requestFullscreen();
      return;
    }
    if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      return;
    }
    document.exitFullscreen();
  });

  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    house.animate();
    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
};

document.body.onload = init;
