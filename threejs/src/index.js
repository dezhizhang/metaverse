   // 引入Three.js
   import * as THREE from 'three';
   import { scene, renderer, camera } from './scene.js'
   //Three.js渲染结果Canvas画布插入到body元素中
   document.body.appendChild(renderer.domElement);



   import { line } from './line.js';
   import { shapeMesh } from './shapeMesh.js';

   //three.js文件加载类FileLoader：封装了XMLHttpRequest
   var loader = new THREE.FileLoader();
   loader.setResponseType('json');
   // 组对象mapGroup是所有国家边界Line模型的父对象
   var mapGroup = new THREE.Group();
   scene.add(mapGroup);
   var lineGroup = new THREE.Group();//边界线组
   mapGroup.add(lineGroup);
   var meshGroup = new THREE.Group();//轮廓Mesh组
   mapGroup.add(meshGroup);
   lineGroup.position.z += 1;//适当偏移解决深度冲突
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
       lineGroup.add(line(country.geometry.coordinates));//国家边界轮廓插入组对象mapGroup
       meshGroup.add(shapeMesh(country.geometry.coordinates));//国家轮廓Mesh插入组对象mapGroup
     });
   })
   // 渲染循环
   function render() {
     renderer.render(scene, camera); //执行渲染操作
     requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
   }
   render();

   //保存webgl内容
   function saveFile() {
     // 创建一个超链接元素，用来下载保存数据的文件
     var link = document.createElement('a');
     // 通过超链接herf属性，设置要保存到文件中的数据
     var canvas = renderer.domElement;//获取canvas对象
     link.href = canvas.toDataURL("image/png");
     link.download = 'earth.png'; //下载文件名
     link.click(); //js代码触发超链接元素a的鼠标点击事件，开始下载文件到本地
   }
   var button = document.createElement('button');
   button.style.position = 'absolute';
   button.style.top = '0px'
   button.style.left = '0px'
   button.innerHTML = '下载';
   button.onclick = saveFile;
   document.body.appendChild(button);