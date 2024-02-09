
import * as THREE from 'three';
import { lon2xyz } from './math.js';

function countryLine(R) {
  const loader = new THREE.FileLoader();
  loader.setResponseType('json');
  const group = new THREE.Group();
  const allPointArr = [];
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

        allPointArr.push(pointArr[0],pointArr[1],pointArr[2]);
        for(let i=3;i <pointArr.length;i+= 3) {
          allPointArr.push(pointArr[i],pointArr[i+1],pointArr[i],pointArr[i+1],pointArr[i+2]);
        }
        allPointArr.push(pointArr[0],pointArr[1],pointArr[2]);
      })
    });
    group.add(line(allPointArr));
  });
  return group;
}




// 
function line(pointArr) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);

  const attribue = new THREE.BufferAttribute(vertices,3);
  geometry.attributes.position = attribue;

  const material = new THREE.LineBasicMaterial({
    color: 0x009999 //线条颜色
  });

  const line = new THREE.LineSegments(geometry,material);
  return line;
}



export { countryLine };


