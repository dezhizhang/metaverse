// 引入three.js
import * as THREE from 'three';
import { createPointMesh } from './pointMesh.js';
import config from './config.js';
var R = config.R;//地球半径

var loader = new THREE.FileLoader();//three.js文件加载类FileLoader
loader.setResponseType('json');
var group = new THREE.Group();//声明一个组对象包含人口密度柱子mesh，方便引入到场
loader.load('airports.json', function (data) {
  data.geometries.forEach(function(obj){
    var lon = obj.coordinates[0];//经度
    var lat = obj.coordinates[1]//纬度
    var mesh = createPointMesh(R, lon, lat);
    group.add(mesh);
  })
})

export default group;