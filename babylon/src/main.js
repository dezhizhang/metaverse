/*
 * :file description: 
 * :name: /babylon/src/main.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-04 05:38:45
 * :last editor: 张德志
 * :date last edited: 2023-05-04 06:05:32
 */
import './style.css'

import * as BABYLON from 'babylonjs';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

// 创建引擎
const engine = new BABYLON.Engine(canvas,true);

// 创建相机
const scene = new BABYLON.Scene(engine);

//创建相机
const camera = new BABYLON.ArcRotateCamera('camera',0,0,10,BABYLON.Vector3.Zero(),scene);

camera.attachControl(canvas,true);

const sphere = BABYLON.MeshBuilder.CreateSphere(
  'sphere',
  {diameter:2},
  scene
)

const light = new BABYLON.DirectionalLight(
  'light',
  new BABYLON.Vector3(0,-1,0),
  scene
)

engine.runRenderLoop(() =>{
  scene.render();
});

window.addEventListener('resize',() => {
  engine.resize();
})





