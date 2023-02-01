// 引入three.js
import * as THREE from 'three';
var geometry = new THREE.CircleBufferGeometry(1,30);//一个圆形几何体
// 
function cirMesh(x,y,size,color) {//参数:x,y坐标 size大小 color颜色
  var material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.6,//半透明效果，和背景相融合
  }); 
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象
  mesh.position.set(x,y,0);//圆圈位置设置
  mesh.scale.set(size,size,size);//圆圈大小设置
  return mesh;
}
export { cirMesh };