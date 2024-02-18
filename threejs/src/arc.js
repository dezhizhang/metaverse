/*
 * :file description:
 * :name: /threejs/src/arc.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-11 10:43:38
 * :last editor: 张德志
 * :date last edited: 2024-02-18 21:41:49
 */
import config from './config.js';
import * as THREE from 'three';

const R = config.R; //地球半径

function arcXOY(startPoint, endPoint) {
  const middleV3 = new THREE.Vector3().addVectors(startPoint, endPoint).multiplyScalar(0.5);
  // 弦垂线的方向dir(弦的中点和圆心构成的向量)
  const dir = middleV3.clone().normalize();
  // 计算球面飞线的起点、结束点和球心构成夹角的弧度值
  const earthRadianAngle = radianAOB(startPoint, endPoint, new THREE.Vector3(0, 0, 0));
  //起点、结束点相聚越远，构成的弧线顶部距离球面越高*/
  const arcTopCoord = dir.multiplyScalar(R + earthRadianAngle * R * 0.2);
  // 求三个点的外接圆圆心(飞线圆弧轨迹的圆心坐标)
  const flyArcCenter = threePointCenter(startPoint, endPoint, arcTopCoord);
  // 飞线圆弧轨迹半径flyArcR
  const flyArcR = Math.abs(flyArcCenter.y - arcTopCoord.y);
  // 参数分别是：飞线圆弧起点、y轴负半轴上一点、飞线圆弧圆心*/
  const flyRadianAngle = radianAOB(startPoint, new THREE.Vector3(0, -1, 0), flyArcCenter);
  const startAngle = -Math.PI / 2 + flyRadianAngle; //飞线圆弧开始角度
  const endAngle = Math.PI - startAngle; //飞线圆弧结束角度
  // 调用圆弧线模型的绘制函数
  const arcline = circleLine(flyArcCenter.x, flyArcCenter.y, flyArcR, startAngle, endAngle);
  arcline.center = flyArcCenter; //飞线圆弧自定一个属性表示飞线圆弧的圆心
  arcline.topCoord = arcTopCoord;

  return arcline;
}


/*计算球面上两点和球心构成夹角的弧度值
参数point1, point2:表示地球球面上两点坐标Vector3
计算A、B两点和顶点O构成的AOB夹角弧度值*/
function radianAOB(A, B, O) {
  // dir1、dir2：球面上两个点和球心构成的方向向量
  var dir1 = A.clone().sub(O).normalize();
  var dir2 = B.clone().sub(O).normalize();
  //点乘.dot()计算夹角余弦值
  var cosAngle = dir1.clone().dot(dir2);
  var radianAngle = Math.acos(cosAngle); //余弦值转夹角弧度值,通过余弦值可以计算夹角范围是0~180度
  // console.log('夹角度数',THREE.Math.radToDeg(radianAngle));
  return radianAngle;
}

function circleLine(x, y, r, startAngle, endAngle) {
  const geometry = new THREE.SphereGeometry();
  const arc = new THREE.ArcCurve(x, y, r, startAngle, endAngle, false);
  const points = arc.getSpacedPoints(50);
  geometry.setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0x00ffff,
  });
  const line = new THREE.Line(geometry, material);
  return line;
}

//求三个点的外接圆圆心，p1, p2, p3表示三个点的坐标Vector3。
function threePointCenter(p1, p2, p3) {
  var L1 = p1.lengthSq(); //p1到坐标原点距离的平方
  var L2 = p2.lengthSq();
  var L3 = p3.lengthSq();
  var x1 = p1.x,
    y1 = p1.y,
    x2 = p2.x,
    y2 = p2.y,
    x3 = p3.x,
    y3 = p3.y;
  var S = x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x2 * y1 - x3 * y2;
  var x = (L2 * y3 + L1 * y2 + L3 * y1 - L2 * y1 - L3 * y2 - L1 * y3) / S / 2;
  var y = (L3 * x2 + L2 * x1 + L1 * x3 - L1 * x2 - L2 * x3 - L3 * x1) / S / 2;
  // 三点外接圆圆心坐标
  var center = new THREE.Vector3(x, y, 0);
  return center;
}

export { arcXOY };
