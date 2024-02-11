/*
 * :file description:
 * :name: /threejs/src/help.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-11 10:42:56
 * :last editor: 张德志
 * :date last edited: 2024-02-11 10:43:16
 */
// 引入three.js
import * as THREE from 'three';
// 创建一个小球用于可视化某个位置点
function sphereMesh(position, color) {
  var geometry = new THREE.SphereGeometry(2, 25, 25); //创建一个球体几何对象
  var material = new THREE.MeshLambertMaterial({
    color: color,
  });
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
  mesh.position.copy(position);
  return mesh;
}
/*为了方便你观察和学习，下面通过球和箭头对一些几何数据进行标注*/
function helpView(startPoint, endPoint, flyArcCenter, arcTopCoord) {
  var group = new THREE.Group(); //小球和箭头的父对象
  /*轨迹线起点、结束点标注*/
  group.add(sphereMesh(startPoint, 0xff0000)); //圆弧飞线起点——红色小球
  group.add(sphereMesh(endPoint, 0x00ff00)); //圆弧飞线结束点——绿色小球
  group.add(sphereMesh(flyArcCenter, 0xffff00)); //飞线圆弧轨迹的圆心——黄色小球
  group.add(sphereMesh(arcTopCoord, 0x00ffff)); //圆弧飞线轨迹顶点——青色小球

  /*用一个箭头连接飞线圆弧的起点和圆心、连接结束点和圆心*/
  var dir1 = startPoint.clone().sub(flyArcCenter).normalize();
  var L = startPoint.clone().sub(flyArcCenter).length(); //箭头长度
  var arrow1 = new THREE.ArrowHelper(dir1, flyArcCenter, L, 0xff0000);
  var dir2 = dir1.clone();
  dir2.x = -dir2.x;
  var arrow2 = new THREE.ArrowHelper(dir2, flyArcCenter, L, 0x00ff00);
  group.add(arrow1, arrow2);

  return group;
}

export { helpView };
