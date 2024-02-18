import * as THREE from 'three';
import Stats from 'stats.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let stats;

let camera, scene, renderer;




init();

function init() {
 
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 10000);
  camera.position.set(0, 50, 500);

  // scene

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // light

  scene.add(new THREE.AmbientLight(0xffffff));

  const light = new THREE.DirectionalLight(0xffffff, 1.5);
  light.position.set(0, 0, 1);
  scene.add(light);



  const curve = new THREE.CatmullRomCurve3( [
    new THREE.Vector3( -10, 0, 10 ),
    new THREE.Vector3( -5, 5, 5 ),
    new THREE.Vector3( 0, 0, 0 ),
    new THREE.Vector3( 5, -5, 5 ),
    new THREE.Vector3( 10, 0, 10 )
  ] );
  
  const points = curve.getPoints( 50 );
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  
  const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
  
  // Create the final object to add to the scene
  const curveObject = new THREE.Line( geometry, material );
  scene.add(curveObject);

  // renderer

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // stats

  stats = new Stats();
  document.body.appendChild(stats.dom);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 100;
  controls.maxDistance = 2000;

  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}




function render() {
  // animate camera along spline
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

