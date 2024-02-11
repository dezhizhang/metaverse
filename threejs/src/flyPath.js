/*
 * :file description: 
 * :name: /threejs/src/flyPath.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-11 09:09:24
 * :last editor: 张德志
 * :date last edited: 2024-02-11 10:19:06
 */

import * as THREE from 'three';
import { lon2xyz } from './math.js';
import config from './config.js';

const R = config.R;

const help = new THREE.Group();

// 经纬度转球面坐标

const sphereCoord1 = lon2xyz(R,112.45, 34.62);
const sphereCoord2 = lon2xyz(R, 12.6, 41.9);

const startPoint = new THREE.Vector3(sphereCoord1.x,sphereCoord1.y,sphereCoord1.z);
const endPoint = new THREE.Vector3(sphereCoord2.x,sphereCoord2.y,sphereCoord2.z);

const O = new THREE.Vector3(0,0,0); //  球心坐标
const startDir = startPoint.clone().sub(0).normalize(); // 飞线起点与球心构成方向向量
const endDir = endPoint.clone().sub(0).normalize(); // 飞线结束点与球心构成方向向量

const arrow1 = new THREE.ArrowHelper(startDir,0,R,0xffff00);
help.add(arrow1);

// 箭头2
help.add(new THREE.ArrowHelper(endDir,0,R,0xffff00));

help.add(sphereMesh(startPoint));
help.add(sphereMesh(endPoint));
help.add(sphereMesh(0));

// 创建一个小球用于可视化一些位置点
function sphereMesh(position) {
    const geometry = new THREE.SphereGeometry(5,25,25);
    const material = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });
    const mesh = new THREE.Mesh(geometry,material);
    mesh.position.copy(position);
    return mesh;
}

// 叉乘计算AOB三角形的法线
const normal = startDir.clone().cross(endDir).normalize();
help.add(new THREE.ArrowHelper(normal,0,R,0x00ffff));


// 切线计算
const tangentA = normal.clone().cross(startDir).normalize();
const tangentB = normal.clone().cross(endDir).normalize();
tangentB.negate(); // 向量tangentB取反

// 标注切线
help.add(new THREE.ArrowHelper(tangentA,startPoint,150,0x00ffff));
help.add(new THREE.ArrowHelper(tangentB,endPoint,150,0x00ffff));


 // 轨迹线起始点和球心构成的夹角(弧度值)
 const angle = Math.acos(startDir.clone().dot(endDir));
 const AC = R * Math.tan(angle / 2);

 help.add(new THREE.ArrowHelper(tangentA,startPoint,AC,0x00ffff));
 help.add(new THREE.ArrowHelper(tangentB,endPoint,AC,0x00ffff));
 
 const C = startPoint.clone().add(tangentA.clone().multiplyScalar(AC));
 help.add(sphereMesh(C));


// 切线上选择的贝赛尔曲线距离切点A或B的距离
const L = AC*0.8;
const p2 = startPoint.clone().add(tangentA.clone().multiplyScalar(L));
const p3 = endPoint.clone().add(tangentB.clone().multiplyScalar(L));


const curve = new THREE.CubicBezierCurve3(startPoint,p2,p3,endPoint);
const pointsArr = curve.getSpacedPoints(100);
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr);
const material = new THREE.LineBasicMaterial({
    color: 0x00ffff,//线条颜色
});
//绘制轨迹线
const flyPath = new THREE.Line(geometry,material);

export {help,flyPath} 