// 引入three.js
import * as THREE from 'three';

// var geometry = new THREE.BoxBufferGeometry(1, 1, 1);//长方体，四棱柱
var geometry = new THREE.CylinderGeometry(1, 1, 1, 6);//正六棱柱
// geometry.computeFlatVertexNormals();//一种计算顶点法线方式，非光滑渲染
geometry.rotateX(Math.PI/2);
geometry.translate(0, 0, 0.5);
function prismMesh(x,y,size,height,color) {//参数:x,y坐标 size粗细大小 height柱子高度 color颜色
  // MeshBasicMaterial:不受光照影响
  // MeshLambertMaterial：几何体表面和光线角度不同，明暗不同
  var material = new THREE.MeshLambertMaterial({
      color: color,
  }); 
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象
  mesh.position.set(x,y,0);//圆圈位置设置
  mesh.scale.set(size,size,height);//柱子粗细和宽高设置
  return mesh;
}
export { prismMesh };