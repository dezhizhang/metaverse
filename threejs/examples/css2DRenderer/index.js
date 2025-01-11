import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer,CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';





const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(10,10,10);
camera.lookAt(scene.position);



const geometry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshBasicMaterial({
  color:0x00ff00
});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);


const renderer = new THREE.WebGLRenderer({
  
});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// cssRender
const cssrender = new CSS2DRenderer();
cssrender.setSize(window.innerWidth,window.innerHeight);


const controls = new OrbitControls(camera,renderer.domElement);



const tag = document.createElement('div');
tag.style.padding = '10px';
tag.style.color = '#fff';
tag.style.position = 'absolute';
tag.style.top = '0px';

tag.style.background = 'rgba(25,25,25,0.5)';
tag.style.borderRadius = '5px';
tag.innerText = '标签'
tag.style.width = '64px';
tag.style.display = 'block';

tag.style.zIndex = 10;

document.body.appendChild(tag);


const pos1 = new THREE.Vector3(); 
mesh.getWorldPosition(pos1);


const tagObj = new CSS2DObject(tag);
tagObj.position.copy(pos1);

scene.add(tagObj);



function render() {
  controls.update();
  renderer.render(scene,camera);
  cssrender.render(scene,camera);

  requestAnimationFrame(render)
}

document.body.appendChild(renderer.domElement);
document.body.appendChild(cssrender.domElement);



render();


