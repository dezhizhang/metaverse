import { scene, renderer } from './scene.js';
import Delaunator from './delaunator.js'; //开源三角剖分库
import * as THREE from 'three';
import polygonData from './polygonData.js';
import { gridPoint } from './gridPoint.js'; //轮廓内均匀填充点
import polygonGroup from './polygon.js'; //通过线和点展示多边形外轮廓

scene.add(polygonGroup);

// 多边形边界线坐标 + 多边形内填充点阵坐标
const polygonPointsArr = gridPoint(polygonData); // 轮廓内均匀填充点

// 作为几何体顶点坐标
const posArr = [];
polygonPointsArr.forEach((elem) => {
    posArr.push(elem[0],elem[1],0);
});

const indexArr = Delaunator.from(polygonPointsArr).triangles;

const geometry = new THREE.BufferGeometry();
geometry.index = new THREE.BufferAttribute(new Uint16Array(indexArr),1);
geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(posArr),3);

const material = new THREE.MeshBasicMaterial({
    color:0x004444,
    side:THREE.BackSide,
});

const mesh = new THREE.Mesh(geometry,material);
mesh.position.z = -0.01;
scene.add(mesh);

const mesh2 = mesh.clone();
mesh2.material = new THREE.MeshBasicMaterial({
    color: 0x009999,
    wireframe: true,
});
mesh.position.z = -0.02;
scene.add(mesh2);


document.body.appendChild(renderer.domElement);

