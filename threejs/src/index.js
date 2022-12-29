import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
let scene,cube,camera,renderer;

let axesHelper;


function init() {
  scene = new THREE.Scene();
  const geometry = new THREE.BoxGeometry(1,1,1);
  const material = new THREE.MeshBasicMaterial({color:0xffff00});
  cube = new THREE.Mesh(geometry,material);

  scene.add(cube);

  axesHelper = new THREE.AxesHelper(100);

  scene.add(axesHelper);



  // 
  camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
  camera.position.z = 5;
  camera.position.x = 2;
  camera.position.y = 1;


  renderer = new THREE.WebGL1Renderer();
  renderer.setSize(window.innerWidth,window.innerHeight);
  new OrbitControls(camera,renderer.domElement);
  document.body.appendChild(renderer.domElement);
}


function render() {
  cube.rotation.y += 0.01;
  requestAnimationFrame(render);
  renderer.render(scene,camera);

}


init();
render();
