/*
 * :file description: 
 * :name: /babylon/src/main.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-05-04 05:38:45
 * :last editor: 张德志
 * :date last edited: 2023-07-02 17:35:08
 */
import './style.css'

import * as BABYLON from 'babylonjs';

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

// 创建引擎
const engine = new BABYLON.Engine(canvas,true);

// 创建场景
const scene = new BABYLON.Scene(engine);

// 创建相机
const camera = new BABYLON.ArcRotateCamera('camera',0,0,10,BABYLON.Vector3.Zero(),scene);
camera.setPosition(new BABYLON.Vector3(0,5,-10));

camera.attachControl(canvas,true);

// // 创建网格
// const sphere = BABYLON.MeshBuilder.CreateSphere(
//   'sphere',
//   {diameter:2},
//   scene
// );

// 创建灯光
const light = new BABYLON.DirectionalLight(
  'light',
  new BABYLON.Vector3(0,-1,0),
  scene
);

// 创建地面
// const ground = new BABYLON.MeshBuilder.CreateGround(
//   'ground',
//   {width:6,height:6},
//   scene
// )

// const plan = new BABYLON.MeshBuilder.CreatePlane('plan',{size:6},scene)

// const box = BABYLON.MeshBuilder.CreateBox(
//   'box',
//   {size:2},
//   scene
// )

// 圆柱体
// const cylinder = BABYLON.MeshBuilder.CreateCylinder(
//   'cylinder',
//   {height:2,diameter:2},
//   scene
// );

// const cone = BABYLON.MeshBuilder.CreateCylinder(
//   'cone',
//   {
//     height:2,
//     diameterTop:0.25,
//     diameterBottom:3,
//     tessellation:3
//   },
//   scene
// );

const pointLight = new BABYLON.PointLight(
  'pointLight',
  new BABYLON.Vector3(-2,0,0),
  scene
);

pointLight.diffuse = new BABYLON.Color3(1,0,0);
pointLight.specular = new BABYLON.Color3(1,1,0);
pointLight.intensity = 0.5;




const torus = BABYLON.MeshBuilder.CreateTorus(
  'torus',
  {
    diameter:3,
    thickness:1,
    tessellation:32
  },
  scene
);

torus.position.set(-4,-1,0);
torus.scaling.set(0.5,0.5,0.5);








engine.runRenderLoop(() =>{
  scene.render();
});

window.addEventListener('resize',() => {
  engine.resize();
})

