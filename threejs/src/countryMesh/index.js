/*
 * :file description: 
 * :name: /threejs/src/countryMesh/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-17 20:39:51
 * :last editor: 张德志
 * :date last edited: 2024-02-17 20:40:09
 */
// 引入three.js
import * as THREE from 'three';
// 几何体辅助合并工具
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
// 引入lon2xyz,经纬度转球面坐标
import { lon2xyz } from '../math.js'
import { gridPoint } from './gridPoint.js'
import { delaunay } from './delaunay.js'

// 渲染一个国家的球面轮廓Mesh(一个国家多边形轮廓数量 >= 1)
// R:球面半径
// polygonArr：一个数组，包含多个元素，每个元素是一个多边形轮廓
// polygonArr：是一个国家的数据geometry.coordinates(geometry.type === "MultiPolygon")
function countryMesh(R,polygonArr) {
  var geometryArr = [];//一个国家多个轮廓，每个轮廓对应的所有几何体
  polygonArr.forEach(obj => {
    var polygon = obj[0];//获取多边形轮廓数据polygon
    //gridPoint(polygon):多边形轮廓polygon内填充等间距点
    // pointsArr表示polygon边界上顶点坐标和polygon内填充的顶点坐标
    var pointsArr = gridPoint(polygon);
    // 三角剖分生成顶点坐标对应三角形索引
    var trianglesIndexArr = delaunay(pointsArr, polygon)
    //三角形顶点经纬度坐标转化为球面坐标
    var spherePointsArr = [];//所有三角形球面坐标
    pointsArr.forEach((item, i) => {
      // 经纬度坐标转球面坐标
      var pos = lon2xyz(R, item[0], item[1])
      spherePointsArr.push(pos.x, pos.y, pos.z)
    });
    var geometry = new THREE.BufferGeometry();//创建一个几何体
    // 设置几何体顶点索引
    geometry.index = new THREE.BufferAttribute(new Uint16Array(trianglesIndexArr), 1)
    // 设置几何体顶点位置坐标
    geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(spherePointsArr), 3)
    geometryArr.push(geometry);//geometryArr：一个国家多个轮廓，每个轮廓对应的所有几何体
  });
  // 合并几何体
  var newGeometry = null;
  if (geometryArr.length == 1) {
    newGeometry = geometryArr[0];//如果一个国家只有一个多边形轮廓，不用进行几何体合并操作
  } else {// 所有几何体合并为一个几何体
    newGeometry = mergeBufferGeometries(geometryArr);
  }
  newGeometry.computeVertexNormals ();//如果使用受光照影响材质，需要计算生成法线
  // MeshLambertMaterial   MeshBasicMaterial
  var material = new THREE.MeshLambertMaterial({
    color: 0x002222,
    // side: THREE.BackSide, //背面可见，默认正面可见   THREE.DoubleSide：双面可见
  })
  var mesh = new THREE.Mesh(newGeometry, material)
  return mesh
}
export { countryMesh };