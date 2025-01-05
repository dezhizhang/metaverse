/*
 * :file description: 
 * :name: /threejs/examples/动画/变形动画.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-01-05 12:33:28
 * :last editor: 张德志
 * :date last edited: 2025-01-05 12:33:29
 */
import * as THREE from 'three';


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



const geometry = new THREE.BoxGeometry(50,50,50);
const target1 = new THREE.BoxGeometry(50,200,50).attributes.position;
const target2 = new THREE.BoxGeometry(10,50,10).attributes.position;

geometry.morphAttributes.position = [target1,target2];

const material = new THREE.MeshBasicMaterial({
  color:0x00ffff
});
const mesh = new THREE.Mesh(geometry,material);
mesh.name = 'Box';
scene.add(mesh);

const KF1 = new THREE.KeyframeTrack('Box.morphTargetInfluences[0]',[0,5],[0,1]);
const KF2 = new THREE.KeyframeTrack('Box.morphTargetInfluences[1]',[5,10],[0,1]);
const clip = new THREE.AnimationClip('box',10,[KF1,KF2]);
const mixer = new THREE.AnimationMixer(mesh);
const clipAction = mixer.clipAction(clip);

clipAction.play();


scene.add(mesh);

const clock = new THREE.Clock();

function render() {
  mixer.update(clock.getDelta());

  renderer.render(scene,camera);
  requestAnimationFrame(render);
}
render();
