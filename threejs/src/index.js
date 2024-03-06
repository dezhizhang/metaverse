import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const clock = new THREE.Clock();

const textureLoader = new THREE.TextureLoader();


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,200);
camera.position.set(0,0,10);
scene.add(camera);

const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-10,0,10),
  new THREE.Vector3(-5,5,5),
  new THREE.Vector3(0,0,0),
  new THREE.Vector3(5,-5,5),
  new THREE.Vector3(10,0,10)
]);

scene.add(new THREE.AmbientLight(0xffffff,3));

const points = curve.getPoints(50);
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.LineBasicMaterial({color:0xff0000});
const curveObject = new THREE.LineLoop(geometry,material);
scene.add(curveObject);


const moonGeometry = new THREE.SphereGeometry(0.75, 16, 16);
const moonMaterial = new THREE.MeshPhongMaterial({
  shininess: 5,
  map: textureLoader.load('https://threejs.org/examples/textures/planets/moon_1024.jpg'),
});
moonMaterial.map.colorSpace = THREE.SRGBColorSpace;
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera,renderer.domElement);

renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

function render() {
  requestAnimationFrame(render);
  const elapsed = clock.getElapsedTime();

  const time = elapsed % 1 * 0.1;
  const point = curve.getPoint(time);
  moon.position.copy(point);
  renderer.render(scene,camera);
}

render();





