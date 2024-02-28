/*
 * :file description: 
 * :name: /threejs/examples/webgl_clipping_intersection.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-28 16:28:44
 * :last editor: 张德志
 * :date last edited: 2024-02-28 16:28:51
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera,scene,renderer;

const params = {
  clipIntersection: true,
  planeConstant: 0,
  showHelpers: false,
  alphaToCoverage: true,
}

const clipPlanes = [
  new THREE.Plane(new THREE.Vector3(1,0,0),0),
  new THREE.Plane(new THREE.Vector3(0,-1,0),0),
  new THREE.Plane(new THREE.Vector3(0,0,-1),0),
];

init();

render();



function init() {
  renderer = new THREE.WebGLRenderer({
    antialias:true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.localClippingEnabled = true;
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40,window.innerHeight / window.innerHeight,0.1,10000);
  camera.position.set(-1.5,2.5,3.0);

  const controls = new OrbitControls(camera,renderer.domElement);
  controls.addEventListener('change',render);
  controls.minDistance = 1;
  controls.maxDistance = 10;
  controls.enablePan = false;

  const light = new THREE.HemisphereLight(0xffffff,0x080808,4.5);
  light.position.set(-1.25,1,1.25);
  scene.add(light);

  const group = new THREE.Group();

  for(let i=0;i <=30;i+= 2) {
    const geometry = new THREE.SphereGeometry(i / 30,48,24);
    const material = new THREE.MeshPhongMaterial({
      color:new THREE.Color().setHSL(Math.random(),0.5,0.5,THREE.SRGBColorSpace),
      side:THREE.DoubleSide,
      clippingPlanes:clipPlanes,
      clipIntersection:params.clipIntersection,
      alphaToCoverage:true
    });
    group.add(new THREE.Mesh(geometry,material));
  }
  scene.add(group);

  const helpers = new THREE.Group();
  helpers.add(new THREE.PlaneHelper(clipPlanes[0],2,0xff0000));
  helpers.add(new THREE.PlaneHelper(clipPlanes[1],2,0x00ff00));
  helpers.add(new THREE.PlaneHelper(clipPlanes[2],2,0x0000ff));
  helpers.visible = false;
  scene.add(helpers);

  window.addEventListener('resize',onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth,window.innerHeight);
  render();

}

function render() {
  renderer.render(scene,camera);
}
