// 引入three.js
import * as THREE from 'three';

// pointsArrs：一个行政区包含一个或多个轮廓，一个轮廓对应pointsArrs的一个元素
function line(pointsArrs) {
  var group = new THREE.Group();//一个国家多个轮廓线条line的父对象
  pointsArrs.forEach(polygon => {
    var pointArr = [];//边界线顶点坐标
    polygon[0].forEach(elem => {
      pointArr.push(elem[0], elem[1], 0);
    });
    group.add(pointLine(pointArr));
  });
  return group;
}

function pointLine(pointArr) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);

  const attribue = new THREE.BufferAttribute(vertices,3);
  geometry.attributes.position = attribue;

  const material = new THREE.LineBasicMaterial({
    color: 0x00cccc //线条颜色
  });

  const line = new THREE.LineLoop(geometry,material);
  return line;

}

export { line };
