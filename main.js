import * as THREE from "three";

import { OrbitControls } from "OrbitControls";
import { MTLLoader } from "MTLLoader";
import { OBJLoader } from "OBJLoader";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5));

const light = new THREE.AmbientLight(0xffffff, 3);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

camera.position.z = 20;

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();

const mtlLoader = new MTLLoader();
mtlLoader.load(
  "https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.mtl",
  (materials) => {
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load(
      "https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj",
      (object) => {
        scene.add(object);
      }
    );
  }
);
