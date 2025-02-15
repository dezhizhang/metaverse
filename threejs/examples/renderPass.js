import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { TAARenderPass } from 'three/addons/postprocessing/TAARenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

let camera, scene, renderer, controls, stats, mesh, material;

let composer, renderPass, taaRenderPass, outputPass;

let needsUpdate = false;

const amount = parseInt(window.location.search.slice(1)) || 3;
const count = Math.pow(amount, 3);

const color = new THREE.Color();

const params = {
  alpha: 0.5,
  alphaHash: true,
  taa: true,
  sampleLevel: 2,
};

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,0.1,10000);
  camera.position.set(amount,amount,amount);
  camera.lookAt(0,0,0);

  scene = new THREE.Scene();
  const geometry = new THREE.IcosahedronGeometry(0.5,3);
  material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    alphaHash: params.alphaHash,
    opacity: params.alpha,
  });
  mesh = new THREE.InstancedMesh(geometry,material,count);

  let i=0;
  const offset = (amount - 1) / 2;
  const matrix = new THREE.Matrix4();

  for(let x = 0; x < amount;x++) {
    for(let y = 0;y < amount;y++) {
      for(let z =0;z < amount;z++) {
        matrix.setPosition(offset - x,offset - y,offset - z);
        mesh.setMatrixAt(i,matrix);
        mesh.setColorAt(i,color.setHex(Math.random() * 0xffffff));
        i++;
      }
    }
  }
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({
    antialias:true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const environment = new RoomEnvironment(renderer);
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  scene.environment = pmremGenerator.fromScene(environment).texture;
  environment.dispose();

  composer = new EffectComposer(renderer);
  renderPass = new RenderPass(scene,camera);
  renderPass.enabled = false;


  taaRenderPass = new TAARenderPass(scene,camera);
  outputPass = new OutputPass();

  composer.addPass(renderPass);
  composer.addPass(taaRenderPass);
  composer.addPass(outputPass);

  controls = new OrbitControls(camera,renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  
  controls.addEventListener('change',() => (needsUpdate = true));

  stats = new Stats();
  document.body.appendChild(stats.dom);

  window.addEventListener('resize',onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);

  needsUpdate = true;
}



function animate() {
  requestAnimationFrame(animate);

  render();

  stats.update();
}

function render() {
  if (needsUpdate) {
    taaRenderPass.accumulate = false;
    taaRenderPass.sampleLevel = 0;

    needsUpdate = false;
  } else {
    taaRenderPass.accumulate = true;
    taaRenderPass.sampleLevel = params.sampleLevel;
  }

  composer.render();
}
