/*
 * :file description: 
 * :name: /threejs/src/chooseCountry.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-12 22:09:03
 * :last editor: 张德志
 * :date last edited: 2024-02-12 22:09:23
 */
// 引入three.js
import * as THREE from 'three';
import { scene,camera } from './scene.js'
import { earth } from './earth.js'
import { tag } from './tag.js';//HTML标签相关代码
var label = tag();
scene.add(label);//标签插入场景中

// 鼠标单击射线拾取meshArr中的某个国家Mesh
var chooseMesh = null
function chooseCountry(event) {
  if (chooseMesh) {    
    chooseMesh.material.color.copy(chooseMesh.color);// 把上次选中的mesh设置为原来的颜色
    label.element.style.visibility = 'hidden';//隐藏标签
  }
  var Sx = event.clientX; //鼠标单击位置横坐标
  var Sy = event.clientY; //鼠标单击位置纵坐标
  //屏幕坐标转WebGL标准设备坐标
  var x = (Sx / window.innerWidth) * 2 - 1; //WebGL标准设备横坐标
  var y = -(Sy / window.innerHeight) * 2 + 1; //WebGL标准设备纵坐标
  //创建一个射线投射器`Raycaster`
  var raycaster = new THREE.Raycaster();
  //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  //返回.intersectObjects()参数中射线选中的网格模型对象
  // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
  var intersects = raycaster.intersectObjects(earth.meshArr);
  // console.log("射线器返回的对象", intersects);
  // console.log("射线投射器返回的对象 点point", intersects[0].point);
  // console.log("射线投射器的对象 几何体",intersects[0].object.geometry.vertices)
  // intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    chooseMesh = intersects[0].object;
    chooseMesh.material.color.set(0x00cccc);//选中改变颜色
    label.position.copy(intersects[0].point);
    if (chooseMesh.gdp) {
      label.element.innerHTML = chooseMesh.name + 'GDP：' + (chooseMesh.gdp / 1000000000000).toFixed(3) + '万亿美元';
    } else {
      label.element.innerHTML = '缺失数据';
    }
    label.element.style.visibility = 'visible';
  }else{
    chooseMesh = null;
  }
}

export { chooseCountry,chooseMesh }