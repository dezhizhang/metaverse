// 引入three.js
import * as THREE from 'three';

// features：包含多条轨迹的经纬度坐标数据
function GeoLine(features) {
  var group = new THREE.Group();//所有高速路轨迹的父对象
  // 批量渲染features的多条轨迹线
  features.forEach(obj => {
    // "LineString"：obj对象包含一条轨迹曲线
    //"MultiLineString"：obj对象包含多条轨迹曲线
    if (obj.geometry.type === "LineString") {
      // 把"LineString"和"MultiLineString"的geometry.coordinates数据结构处理为一致
      obj.geometry.coordinates = [obj.geometry.coordinates];
    }
    obj.geometry.coordinates.forEach(arr => {
      var pointArr = [];//一条曲线顶点坐标
      arr.forEach(elem => {
        pointArr.push(elem[0], elem[1], 0);
      })
      //Line绘制曲线轨迹
      group.add(line(pointArr));
    });

  });
  return group;
}



var material = new THREE.LineBasicMaterial({
  color: 0x00ffff //线条颜色
});//材质对象
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
  // 线条渲染几何体顶点数据
  var line = new THREE.Line(geometry, material);//线条模型对象
  return line;
}

export { GeoLine };