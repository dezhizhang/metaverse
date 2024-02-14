/*
 * :file description: 
 * :name: /threejs/src/HotNews.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-14 10:25:42
 * :last editor: 张德志
 * :date last edited: 2024-02-14 16:27:21
 */
import * as THREE from 'three';
import { createPointMesh } from './pointMesh.js';
import { createLightPillar } from './LightPillar.js';
import  {createWaveMesh}  from './WaveMesh.js';
import  HotNewsData  from './HotNewsData.js';

import config from './config.js';
var R = config.R;//地球半径

var HotNews = new THREE.Group();//声明一个组对象包含所有光柱、光柱底座、波动光圈

var WaveMeshArr = [];
HotNewsData.forEach(function(obj){
  var lon = obj.E;//经度
  var lat = obj.N//纬度

  var LightPillar = createLightPillar(R, lon, lat);//光柱
  HotNews.add(LightPillar);

  var mesh = createPointMesh(R, lon, lat);//光柱底座矩形平面
  // HotNews.add(mesh);
  LightPillar.add(mesh);//mesh位置和角度受父对象LightPillar影响

  var WaveMesh = createWaveMesh(R, lon, lat);//波动光圈
  // HotNews.add(WaveMesh);
  LightPillar.add(WaveMesh);//WaveMesh位置和角度受父对象LightPillar影响
  WaveMeshArr.push(WaveMesh);
})

export {HotNews,WaveMeshArr};