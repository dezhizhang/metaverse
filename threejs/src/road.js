/*
 * :file description: 
 * :name: /threejs/src/road.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-09 12:02:42
 * :last editor: 张德志
 * :date last edited: 2024-02-09 12:02:43
 */
// 引入three.js
import * as THREE from 'three';
// 引入lon2xyz,经纬度转球面坐标
import { lon2xyz } from './math.js'
import config from './config.js'
var R = config.R;//地球半径


var loader = new THREE.FileLoader();//three.js文件加载类FileLoader：封装了XMLHttpRequest
loader.setResponseType('json');
var group = new THREE.Group();//所有轨迹线的父对象
// 所有边界线顶点坐标合并在一起，适合使用LineSegments渲染
var allPointArr = [];
// 解析GeoJSON格式的线条数据
loader.load('./铁路线.json', function (data) {
  // data.features:包含多条轨迹线坐标数据
  data.features.forEach(obj => {
    // "LineString"：obj对象包含一条轨迹曲线
    //"MultiLineString"：obj对象包含多条轨迹曲线
    if (obj.geometry.type === "LineString") {
      // 把"LineString"和"MultiLineString"的geometry.coordinates数据结构处理为一致
      obj.geometry.coordinates = [obj.geometry.coordinates];
    }
    obj.geometry.coordinates.forEach(arr => {
      var pointArr = [];//一条曲线顶点坐标
      arr.forEach(elem => {
        // 经纬度转球面坐标
        var coord = lon2xyz(R, elem[0], elem[1])
        pointArr.push(coord.x, coord.y, coord.z);
      })
      group.add(line(pointArr));
    });
  });
})



// pointArr：已知直线顶点坐标，创建直线THREE.Line
function line(pointArr) {
  /**
   * 通过BufferGeometry构建一个几何体，传入顶点数据
   * 通过Line模型渲染几何体，连点成线
   */
  var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
  //类型数组创建顶点数据
  var vertices = new Float32Array(pointArr);
  // 创建属性缓冲区对象
  var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
  // 设置几何体attributes属性的位置属性
  geometry.attributes.position = attribue;
  var material = new THREE.LineBasicMaterial({
    // color: 0x33ff99//线条颜色
    color: 0xffff00
  });//材质对象
  // 线条渲染几何体顶点数据
  var line = new THREE.Line(geometry, material);//线条模型对象  使用非闭合
  // var line = new THREE.LineLoop(geometry, material);//首尾顶点连线，轮廓闭合
  return line;
}

export default group;