/*
 * :file description: 
 * :name: /threejs/examples/skinningBlending.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-12-31 15:36:52
 * :last editor: 张德志
 * :date last edited: 2022-12-31 17:04:43
 */
import * as THREE from 'three';
import Stats from 'stats.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 

let scene, renderer, camera, stats;
let model, skeleton, mixer, clock;


let singleStepMode = false;
let sizeOfNextStep = 0;

init();

function init() {
  camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,1000);
  camera.position.set(1,2,-3);
  camera.lookAt(0,1,0);

  clock = new THREE.Clock();

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0a0a0);
  scene.fog = new THREE.Fog(0xa0a0a0,10,50);

  const hemiLight = new THREE.HemisphereLight(0xffffff,0x444444);
  hemiLight.position.set(0,20,0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(-3,10,-10);
  dirLight.castShadow = true;
  dirLight.shadow.camera.top = 2;
  dirLight.shadow.camera.bottom = -2;
  dirLight.shadow.camera.left = -2;
  dirLight.shadow.camera.right = 2;
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 40;
  scene.add(dirLight);

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(100,100),
    new THREE.MeshPhongMaterial({color:0x00000,depthWrite:false})
  )
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);

  const loader = new GLTFLoader();
  loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/model/china.glb', function (gltf) {
    model = gltf.scene;
    console.log('model',model);

    scene.add(model);

    model.traverse(function (object) {
      if (object.isMesh) object.castShadow = true;
    });

    model.position.set( 0, 0, 0 );
		model.scale.set( 0.01, 0.01, 0.01 );

    skeleton = new THREE.SkeletonHelper(model);
    skeleton.visible = false;
    scene.add(skeleton);

    const animations = gltf.animations;

    mixer = new THREE.AnimationMixer(model);

    //mixer.clipAction(animations[0]).play();
 


    animate();
  });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.background =  new THREE.Color(0x000000)
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.shadowMap.enabled = true;

  const controls = new OrbitControls(camera,renderer.domElement);
  controls.target.y = 0.5;
  controls.update();

  document.body.appendChild(renderer.domElement);

  stats = new Stats();
  document.body.appendChild(stats.dom);

  window.addEventListener('resize', onWindowResize);

}



function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  // Render loop

  requestAnimationFrame(animate);



  // Get the time elapsed since the last frame, used for mixer update (if not in single step mode)

  let mixerUpdateDelta = clock.getDelta();

  // If in single step mode, make one step and then do nothing (until the user clicks again)

  if (singleStepMode) {
    mixerUpdateDelta = sizeOfNextStep;
    sizeOfNextStep = 0;
  }

  // Update the animation mixer, the stats panel, and render this frame

  mixer.update(mixerUpdateDelta);

  stats.update();

  renderer.render(scene, camera);
}
