// 引入three.js
import * as THREE from 'three';
import {countryLine} from './line.js'
import config from './config.js'

import points  from './points.js';//点模型可视化经纬度坐标数据


var R = config.R;//地球半径
var earth = new THREE.Group();//地球组对象
earth.add(createSphereMesh(R));//球体Mesh插入earthGroup中
// R * 1.001比地球R稍大，以免深度冲突
earth.add(countryLine(R * 1.001));//国家边界集合插入earthGroup中

earth.add(points);//可视化点对象插入地球

// r：地球半径
function createSphereMesh(r) {
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为纹理贴图
  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load('/earth.png');//加载纹理贴图
  var geometry = new THREE.SphereGeometry(r, 40, 40); //创建一个球体几何对象
  //材质对象Material
  // MeshLambertMaterial  MeshBasicMaterial
  var material = new THREE.MeshLambertMaterial({
    // color: 0x00ffff,
    map:texture,//设置地球0颜色贴图map
    // transparent:true,
    // opacity:0.5,//半透明效果
  }); 
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  return mesh
}

export { earth }