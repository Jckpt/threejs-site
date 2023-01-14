import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Inicjalizacja

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: "rgb(243, 131, 32)" });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Swiatlo

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Tlo

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// Avatar

const avatarTexture = new THREE.TextureLoader().load("./img/awatar.png");

const avatar = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: avatarTexture })
);

scene.add(avatar);

// Ziemia

const teksturaZiemii = new THREE.TextureLoader().load("./img/earth.jpg");
const normalZiemii = new THREE.TextureLoader().load("./img/earth_normal.jpg");

const ziemia = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: teksturaZiemii,
    normalMap: normalZiemii,
  })
);

scene.add(ziemia);

// Ksiezyc
const group = new THREE.Group();
group.position.set(0, -10, 30);
const teksturaKsiezyca = new THREE.TextureLoader().load("./img/moon.jpg");
const normalKsiezyca = new THREE.TextureLoader().load("./img/moon_normal.jpg");

const ksiezyc = new THREE.Mesh(
  new THREE.SphereGeometry(0.75, 32, 32),
  new THREE.MeshStandardMaterial({
    map: teksturaKsiezyca,
    normalMap: normalKsiezyca,
  })
);
group.position.set(-10, 0, 30);
group.add(ksiezyc);
ksiezyc.position.set(0, 2, 5);
scene.add(group);
ziemia.position.z = 30;
ziemia.position.setX(-10);
ziemia.rotation.z = 0.5;

console.log(ziemia.position);
avatar.position.z = -5;
avatar.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  ziemia.rotation.y += 0.075;

  group.rotation.y += 0.015;
  group.rotation.z += 0.015;

  avatar.rotation.y += 0.01;
  avatar.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  ziemia.rotation.y += 0.005;
  //group.rotation.y += 0.00018518518;
  group.rotation.y += 0.001;
  group.rotation.z += 0.001;
  renderer.render(scene, camera);
}

animate();
