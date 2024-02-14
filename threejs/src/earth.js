/*
 * :file description: 
 * :name: /threejs/src/earth.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-08 15:34:42
 * :last editor: 张德志
 * :date last edited: 2024-02-14 16:39:11
 */
// 引入three.js
import * as THREE from 'three';
import {countryLine} from './line.js'
import {HotNews} from './HotNews.js'
import Sprite from './Sprite.js'
import config from './config.js'


var R = config.R;//地球半径
var earth = new THREE.Group();//地球组对象
earth.add(createSphereMesh(R));//球体Mesh插入earthGroup中
// R * 1.001比地球R稍大，以免深度冲突
earth.add(countryLine(R * 1.001));//国家边界集合插入earthGroup中

earth.add(HotNews);//所有新闻热点Mesh作为earth子对象

earth.add(Sprite);//地球光圈

// r：地球半径
function createSphereMesh(r) {
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为纹理贴图
  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load('/earth.png');//加载纹理贴图
  var geometry = new THREE.SphereGeometry(R, 40, 40); //创建一个球体几何对象
  //材质对象Material
  // MeshLambertMaterial  MeshBasicMaterial
  var material = new THREE.MeshLambertMaterial({
    // color: 0x00ffff,
    map:texture,//设置地球颜色贴图map
    // transparent:true,
    // opacity:0.5,//半透明效果
  }); 
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  return mesh
}

export { earth }