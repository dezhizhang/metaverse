
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(300, 200, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(150,150,150);
scene.add(pointLight);

const group = new THREE.Group();

const geometry = new THREE.BoxGeometry(40,6,6);
const material = new THREE.MeshLambertMaterial({
  color:0x0000ff
});
const cube = new THREE.Mesh(geometry,material);
cube.name = 'Box';
group.add(cube);


const geometry1 = new THREE.SphereGeometry(10,25,25);
const material2 = new THREE.MeshLambertMaterial({
  color:0xff00ff
});
const mesh2 = new THREE.Mesh(geometry1,material2);
mesh2.name = 'Sphere';
group.add(mesh2);
scene.add(group);


const times = [0,10];
const values = [0,0,0,150,0,0];

const posTrack = new THREE.KeyframeTrack('Box.position',times,values);
const scaleTrack = new THREE.KeyframeTrack('Sphere.scale',[0,20],[1,1,1,3,3,3]);

const duration = 20;
const clip = new THREE.AnimationClip('default',duration,[posTrack,scaleTrack]);

const mixer = new THREE.AnimationMixer(group);
const AnimationAction = mixer.clipAction(clip);

AnimationAction.timeScale = 20;
AnimationAction.play();



const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


const clock = new THREE.Clock();

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
  mixer.update(clock.getDelta());
}

render();