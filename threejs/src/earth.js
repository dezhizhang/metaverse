// 引入three.js
import * as THREE from 'three';
import { countryLine } from './line.js';//绘制地球国家边界线
// import { countryMesh } from './countryMesh.js';//每个国家对应球面Mesh
import { countryMesh } from './countryMesh/index.js';//每个国家对应球面Mesh



var R = 100;//地球半径
var earth = createEarth(R);// 创建地球



// R：地球半径
function createSphereMesh(R) {
  var geometry = new THREE.SphereGeometry(R, 40, 40); //创建一个球体几何对象
  //材质对象Material
  var material = new THREE.MeshLambertMaterial({
    color: 0x000909,
  });
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  return mesh
}

// 创建一个地球总对象earthGroup
function createEarth(R) {
  var earthGroup = new THREE.Group();//地球组对象
  earthGroup.add(createSphereMesh(R));//球体Mesh插入earthGroup中

  earthGroup.meshArr = [];//自顶一个属性包含所有国家mesh，用于鼠标射线拾取

  var loader = new THREE.FileLoader();//three.js文件加载类FileLoader：封装了XMLHttpRequest
  loader.setResponseType('json');
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
      // R * 1.001比地球R稍大，以免深度冲突
      var line = countryLine(R * 1.002,country.geometry.coordinates);//国家边界
      var mesh = countryMesh(R * 1.001,country.geometry.coordinates);//国家轮廓mesh
      earthGroup.add(line);//国家边界集合插入earthGroup中
      earthGroup.add(mesh);//国家Mesh集合插入earthGroup中
      earthGroup.meshArr.push(mesh);
      mesh.name = country.properties.name;//设置每个国家mesh对应的国家名称
    });
  })

  return earthGroup;
}

export { earth }