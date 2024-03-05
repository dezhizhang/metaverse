import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import vertexShader from './shader/point/vertex.glsl';
import fragmentShader from './shader/point/fragment.glsl';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);
scene.add(camera);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/snowflake4.png');
const texture1 = textureLoader.load('/snowflake1.png');
const texture2 = textureLoader.load('/snowflake3.png');

let points = null;
let geometry = null;
let material = null;

let params = {
  count:1000,
  size:0.1,
  radius:5,
  branches:4,
  spin:0.5,
  color:'#ff6030',
  outColor:'#1b3984',
}


let galaxyColor = new THREE.Color(params.color);
let outGalaxyColor = new THREE.Color(params.color);



function generateGalaxy() {
  // if(points !== null && geometry != null) {
  //   geometry.dispose();
  //   material.dispose();
  //   scene.remove(points);
  // }

  geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(params.count * 3);
  const colors = new Float32Array(params.count * 3);
  const scales = new Float32Array(params.count);

  // 图案属性
  const imgIndex = new Float32Array(params.count);



  for(let i=0;i < params.count;i++) {
    const current = i * 3;
    const branchAngle = (i % params.branches) * ((2 * Math.PI) / params.branches);
    const radius = Math.random() * params.radius;

    const randomX = Math.pow(Math.random() * 2 - 1,3) * 0.5 * (params.radius - radius) * 0.3;
    const randomY = Math.pow(Math.random() * 2 - 1,3) * 0.5 * (params.radius - radius) * 0.3;
    const randomZ = Math.pow(Math.random() * 2 - 1,3) * 0.5 * (params.radius - radius) * 0.3;

    positions[current] = Math.cos(branchAngle) * radius + randomX;
    positions[current + 1] = randomY;
    positions[current + 2] = Math.sin(branchAngle) * radius + randomZ;

    const maxColor = galaxyColor.clone();
    maxColor.lerp(outGalaxyColor,radius / params.radius);

    colors[current] = maxColor.r;
    colors[current + 1] = maxColor.g;
    colors[current + 2] = maxColor.b;


    scales[current] = Math.random();

    imgIndex[current] = current % 3;

  }

  geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
  geometry.setAttribute('color',new THREE.BufferAttribute(colors,3));
  geometry.setAttribute('aScale',new THREE.BufferAttribute(scales,1));
  geometry.setAttribute('imgIndex',new THREE.BufferAttribute(imgIndex,1));



  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent:true,
    vertexColors:true,
    blending:THREE.AdditiveBlending,
    depthWrite:false,
    uniforms: {
      uTexture: {
        value: texture,
      },
      uTexture1: {
        value: texture1,
      },
      uTexture2: {
        value: texture2,
      },
    },
  });

  console.log(geometry);


  points = new THREE.Points(geometry,material);
  scene.add(points);


}

generateGalaxy();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);


window.addEventListener('resize',() =>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})

const controls = new OrbitControls(camera,renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}

render();

