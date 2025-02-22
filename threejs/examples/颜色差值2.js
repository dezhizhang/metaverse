/*
 * :file description: 
 * :name: /threejs/examples/颜色差值2.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-22 20:19:56
 * :last editor: 张德志
 * :date last edited: 2025-02-22 20:19:57
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,width / height,0.1,10000);
camera.position.set(500,500,500);
camera.lookAt(scene.position);


scene.add(new THREE.AmbientLight(0xffffff,1));



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


const loader = new GLTFLoader();
loader.load('/地形.glb',(gltf) => {
  const group = gltf.scene;
  scene.add(group);
  const mesh = group.children[0];
  mesh.material = new THREE.MeshLambertMaterial({
    vertexColors:true,
    side:THREE.DoubleSide
  });

  const position = mesh.geometry.attributes.position;
  const yArr =[];
  const count = position.count;
  for(let i=0;i < count;i++) {
    yArr.push(position.getY(i))
  }

  yArr.sort();
  const minY = yArr[0];
  const maxY = yArr[yArr.length - 1];
  const height = maxY - minY;

  const colorArr = [];
  for(let i=0;i < count;i++) {
    const color1 = new THREE.Color(0x00ff00);
    const color2 = new THREE.Color(0xff0000);

    const pix = (position.getY(i) - minY) / height;

    const co = color1.lerp(color2,pix);
    colorArr.push(co.r,co.g,co.b);
  }

  mesh.geometry.attributes.color = new THREE.BufferAttribute(new Float32Array(colorArr),3);

  console.log('yArr',yArr);
  
 
});


scene.add(new THREE.AxesHelper(200));

new OrbitControls(camera,renderer.domElement)





function render() {
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}

render();

