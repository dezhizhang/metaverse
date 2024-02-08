// 引入three.js
import * as THREE from 'three';
// 引入lon2xyz,经纬度转球面坐标
import { lon2xyz } from './math.js'


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
          const coord = lon2xyz(R,elem[0],elem[1]);
          pointArr.push(coord.x,coord.y,coord.z);
        });
        group.add(line(pointArr));
      })
    })
  });
  return group;

}


function line(pointArr) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);

  const attribue = new THREE.BufferAttribute(vertices,3);
  geometry.attributes.position = attribue;
  const material = new THREE.LineBasicMaterial({
    color:0x00aaaa //线条颜色
  });
  const line = new THREE.LineLoop(geometry,material);
  return line;

} 


export { countryLine };