const THREE = require('three');
const OrbitControls = require('three/examples/jsm/controls/OrbitControls');

let scene, camera, renderer, controls, cube, ambientLight, floor, directionalLight, lightHolder;

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  controls = new OrbitControls.OrbitControls(camera, renderer.domElement);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  directionalLight = new THREE.DirectionalLight(0xffffff, 0.7, 100);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true; 
  lightHolder = new THREE.Group();
  lightHolder.add(directionalLight);
  scene.add(lightHolder);

  const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x71c990 });
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  cube.receiveShadow = false;
  cube.position.set(0, 0, 0);
  scene.add(cube);

  const floorGeometry = new THREE.PlaneBufferGeometry(20, 20, 32, 32);
  const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.set(0, -2, 2);
  floor.rotation.x = Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  camera.position.z = 5;
  controls.update();

  document.body.appendChild(renderer.domElement);
}

function update() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;
}

function animate() {
  requestAnimationFrame(animate);
  update();
	renderer.render(scene, camera);
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

export default {
  init,
  animate,
  resize,
};