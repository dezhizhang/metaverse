// 引入three.js
import * as THREE from 'three';
import {countryLine} from './line.js'
import config from './config.js'
import points  from './points.js';//点模型可视化经纬度坐标数据

const R = config.R;
const earth = new THREE.Group();
earth.add(createSphereMesh(R)); // 球体Mesh插入earthGroup中
earth.add(countryLine(R * 1.001));

earth.add(points);

function createSphereMesh(r) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('earth.png');
  const geometry = new THREE.SphereGeometry(r,40,40);

  const material = new THREE.MeshLambertMaterial({
    map:texture,//设置地球0颜色贴图map

  });
  const mesh = new THREE.Mesh(geometry,material);
  return mesh;
}


export { earth };
