
import * as THREE from 'three';
import { lon2xyz } from './math.js';

function countryLine(R) {
  const loader = new THREE.FileLoader();
  loader.setResponseType('json');
  const group = new THREE.Group();
  loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/world.json',function(data) {
    data.features.forEach(function(country) {
      if(country.geometry.type === 'Polygon') {
        country.geometry.coordinates = [country.geometry.coordinates];
      }
      country.geometry.coordinates.forEach((polygon) => {
        const pointArr = [];
        polygon[0].forEach((elem) => {
          const coord = lon2xyz(R, elem[0], elem[1]);
          pointArr.push(coord.x, coord.y, coord.z);
        });
        group.add(line(pointArr));
      })
    })
  })
  return group;
}

function line(pointArr) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);
  // 设置几何体attributes属性的位置属性
  const attribue = new THREE.BufferAttribute(vertices,3);
  // 线条渲染几何体顶点数据
  const material = new THREE.LineBasicMaterial({
    color: 0x00aaaa
  });
  const line = new THREE.LineLoop(geometry,material);
  return line;

}

export {countryLine}





