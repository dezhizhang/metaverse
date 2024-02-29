/*
 * :file description: 
 * :name: /threejs/examples/unform传递时间变量打造动画与通过uv采样纹理..js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-29 22:07:03
 * :last editor: 张德志
 * :date last edited: 2024-02-29 22:07:04
 */
import * as THREE from 'three';
import vertexShader from './shader/baseic/vertex.glsl';
import fragmentShader from './shader/baseic/fragment.glsl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const clock = new THREE.Clock();


//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

const textureLoader = new THREE.TextureLoader();
const textMap  = textureLoader.load('./01.jpg');


const geometry = new THREE.PlaneGeometry(1,1,64,64);


const shaderMaterial = new THREE.RawShaderMaterial({
  vertexShader:`
    precision mediump float;

    attribute vec3 position;
    attribute vec2 uv;
    
    uniform mat4 modelMatrix;
    uniform mat4 projectionMatrix;
    uniform mat4 viewMatrix;
    
    varying vec2 vUv;
    
    // 获取时间
    uniform float uTime;
    
    void main() {
        vUv = uv;
        vec4 modelPosition = modelMatrix * vec4(position,1.0);
        modelPosition.z = sin((modelPosition.x + uTime) * 10.0) * 0.1;
        modelPosition.y += sin((modelPosition.x + uTime) * 10.0)* 0.1;
    
        gl_Position =  projectionMatrix * viewMatrix * modelPosition;
    }
  `,
  fragmentShader:`
  precision mediump float;
  varying vec2 vUv;
  
  uniform sampler2D uTexture;
  
  void main() {
      // gl_FragColor = vec4(vUv, 0.0, 1.0);
      // 根据uv取出对应的颜色
      vec4 textureColor = texture2D(uTexture,vUv);
      textureColor.rgb*= 1.0;
      gl_FragColor = textureColor;
  }
  `,
  side:THREE.DoubleSide,
  wireframe:true,
  uniforms:{
    uTime:{
      value:0
    },
    uTexture:{
      value:textMap
    }
  }
});


const floor = new THREE.Mesh(geometry, shaderMaterial);
scene.add(floor);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


const controls = new OrbitControls(camera, renderer.domElement);


window.addEventListener('resize',() => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
})

function render() {
  requestAnimationFrame(render);
  const elapsedTime = clock.getElapsedTime();
  shaderMaterial.uniforms.uTime.value = elapsedTime;
  renderer.render(scene, camera);
}

render();
