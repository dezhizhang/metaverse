/*
 * :file description: 
 * :name: /threejs/src/chooseCountry.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-18 06:17:08
 * :last editor: 张德志
 * :date last edited: 2024-02-18 06:46:46
 */
// 引入three.js
import * as THREE from 'three';
import { camera } from './index.js';
import { earth } from './earth.js'


const chooseMesh = null;

function chooseCountry(event) {
  if(chooseMesh) {
    chooseMesh.material.color.set(0x002222);
  }

  const sx = event.clientX; //鼠标单击位置横坐标
  const sy = event.clientY; //鼠标单击位置纵坐标

  const x = (sx / window.innerWidth) * 2 - 1;
  const y = (sy / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x, y),camera);
  const intersects = raycaster.intersectObjects(earth.meshArr);
  if(intersects.length) {
    chooseMesh = intersects[0].object;
    chooseMesh.material.color.set(0x00cccc);//选中改变颜色
  }

}



export default {chooseCountry};

