import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff,1.0));
scene.add(new THREE.AxesHelper(100));

let mixer;

const loader = new GLTFLoader();
loader.load('/工厂.glb',(gltf) => {

  mixer = new THREE.AnimationMixer(gltf.scene);

  const clipAction = mixer.clipAction(gltf.animations[0]);
  clipAction.play();


  scene.add(gltf.scene);
});


const controls = new OrbitControls(camera,renderer.domElement);

const clock = new THREE.Clock();


function render() {
  if(mixer) {
    mixer.update(clock.getDelta());
  }
 
  controls.update();
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();



