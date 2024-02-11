

// 引入three.js
import * as THREE from 'three';
// 引入lon2xyz,经纬度转球面坐标
import { lon2xyz } from './math.js'
// R:球面半径
function countryLine(R) {
  var loader = new THREE.FileLoader();//three.js文件加载类FileLoader：封装了XMLHttpRequest
  loader.setResponseType('json');
  var group = new THREE.Group();// 组对象mapGroup是所有国家边界父对象
  // 所有边界线顶点坐标合并在一起，适合使用LineSegments渲染
  var allPointArr = [];
  // 异步加载包含世界各个国家边界坐标的GeoJSON文件：world.json
  loader.load('https://tugua.oss-cn-hangzhou.aliyuncs.com/world.json', function (data) {
    // 访问所有国家边界坐标数据：data.features
    data.features.forEach(function (country) {
      // "Polygon"：国家country有一个封闭轮廓
      //"MultiPolygon"：国家country有多个封闭轮廓
      if (country.geometry.type === "Polygon") {
        // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
        country.geometry.coordinates = [country.geometry.coordinates];
      }
      // 解析所有封闭轮廓边界坐标country.geometry.coordinates
      // 批量渲染一个国家的多个轮廓线(>=1个)
      country.geometry.coordinates.forEach(polygon => {
        var pointArr = [];//边界线顶点坐标
        polygon[0].forEach(elem => {
          // 经纬度转球面坐标
          var coord = lon2xyz(R, elem[0], elem[1])
          pointArr.push(coord.x, coord.y, coord.z);
        });
        // 处理顶点数据适合LineSegments连续渲染所有独立不相连轨迹线
        allPointArr.push(pointArr[0], pointArr[1], pointArr[2]);
        for (let i = 3; i < pointArr.length; i += 3) {
          // 如果使用LineSegments连线，需要把顶点多复制一份
          allPointArr.push(pointArr[i], pointArr[i + 1], pointArr[i + 2], pointArr[i], pointArr[i + 1], pointArr[i + 2]);
        }
        allPointArr.push(pointArr[0], pointArr[1], pointArr[2]);
      });
    });
    group.add(line(allPointArr));
  })
  return group;
}


// pointArr：一组几何体顶点坐标
// function line(pointArr) {
//   /**
//    * 通过BufferGeometry构建一个几何体，传入顶点数据
//    * 通过LineSegments模型渲染几何体，连点成线
//    */
//   var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
//   //类型数组创建顶点数据
//   var vertices = new Float32Array(pointArr);
//   // 创建属性缓冲区对象
//   var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
//   // 设置几何体attributes属性的位置属性
//   geometry.attributes.position = attribue;
//   // 线条渲染几何体顶点数据
//   var material = new THREE.LineBasicMaterial({
//     color: 0x009999 //线条颜色
//   });//材质对象
//   // var line = new THREE.Line(geometry, material);//线条模型对象
//   // var line = new THREE.LineLoop(geometry, material);//首尾顶点连线，轮廓闭合
//   var line = new THREE.LineSegments(geometry, material);//间隔绘制直线
//   return line;
// }



export { countryLine };

