// 可视化多边形和多边形内填充的点
import * as THREE from 'three';
import polygonData from './polygonData.js'; //多边形外轮廓坐标
import { gridPoint } from './gridPoint.js'; //填充点计算

var polygonPointsArr = gridPoint(polygonData); //轮廓内均匀填充点

//渲染多边形填充点
function points() {
  var posArr = []; //作为几何体顶点位置坐标
  polygonPointsArr.forEach(function (elem) {
    posArr.push(elem[0], elem[1], 0);
  });
  var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
  // 设置几何体attributes属性的位置属性
  geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(posArr), 3); //3个为一组，表示一个顶点的xyz坐标
  var pointsMaterial = new THREE.PointsMaterial({
    color: 0xff0000,
    size: 5,
  }); //点材质
  var points = new THREE.Points(geometry, pointsMaterial); // 点模型
  return points;
}

// 渲染多边形轮廓外边界
function polygon() {
  var pointArr = [];
  polygonData.forEach(function (elem) {
    pointArr.push(elem[0], elem[1], 0);
  });
  /**
   * 通过BufferGeometry构建一个几何体，传入顶点数据
   * 通过Line模型渲染几何体，连点成线
   * LineLoop和Line功能一样，区别在于首尾顶点相连，轮廓闭合
   */
  var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
  //类型数组创建顶点数据
  var vertices = new Float32Array(pointArr);
  // 创建属性缓冲区对象
  var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
  // 设置几何体attributes属性的位置属性
  geometry.attributes.position = attribue;
  // 线条渲染几何体顶点数据
  var material = new THREE.LineBasicMaterial({
    color: 0xcccc00, //线条颜色
  }); //材质对象
  var line = new THREE.LineLoop(geometry, material); //首尾顶点连线，轮廓闭合

  //点材质
  var pointsMaterial = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 5,
  });
  // 点模型
  var points = new THREE.Points(geometry, pointsMaterial);

  var group = new THREE.Group();
  group.add(line);
  group.add(points);

  return group;
}

var polygonGroup = new THREE.Group(); // 多边形边界和填充点可视化
polygonGroup.add(points());
polygonGroup.add(polygon());
export default polygonGroup;
