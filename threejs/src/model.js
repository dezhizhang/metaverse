// 引入Three.js
import * as THREE from 'three';

// 引入gltf模型加载库GLTFLoader.js
import {
  GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js';
var model = new THREE.Group(); //声明一个组对象，用来添加城市三场场景的模型对象

var loader = new GLTFLoader(); //创建一个GLTF加载器
loader.load("https://tugua.oss-cn-hangzhou.aliyuncs.com/model/%E4%B8%8A%E6%B5%B7%E5%A4%96%E6%BB%A9.glb", function (gltf) { //gltf加载成功后返回一个对象
  console.log('控制台查看gltf对象结构', gltf);
  // 设置地面材质
  var Floor = gltf.scene.getObjectByName('地面');
  Floor.material = new THREE.MeshLambertMaterial({
    color: 0x444433,
  });
  // 设置河面材质
  var River = gltf.scene.getObjectByName('河面');
  River.material = new THREE.MeshLambertMaterial({
    color: 0x336633,
  });


  // 所有建筑物递归遍历批量设置材质
  gltf.scene.getObjectByName('楼房').traverse(function (object) {
    if (object.type === 'Mesh') {
      // console.log(object.material);//控制台查看mesh材质
      // MeshLambertMaterial：受光照影响   MeshBasicMaterial：不受光照影响  
      object.material = new THREE.MeshLambertMaterial({
        // color: object.material.color, //读取原来材质的颜色
        color: 0xffffff,
      })
    }
  })

  // 单独设置东方明珠材质
  var dongfang= gltf.scene.getObjectByName('东方明珠');
  dongfang.material = new THREE.MeshLambertMaterial({
    color: 0x996633,
  });




  //把gltf.scene中的所有模型添加到model组对象中
  model.add(gltf.scene);
})
export {
  model
}