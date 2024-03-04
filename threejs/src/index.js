import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import vertexShader from './shader/point/vertex.glsl';
import fragmentShader from './shader/point/fragment.glsl';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);


// 导入纹理
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/snowflake4.png');

const geometry = new THREE.BufferGeometry();
const position = new Float32Array([0,0,0]);

geometry.setAttribute('position',new THREE.BufferAttribute(position,3));
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  transparent:true,
  uniforms:{
    uTexture:{
      value:texture
    }
  }
});
const points = new THREE.Points(geometry,material);
scene.add(points);



const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();
