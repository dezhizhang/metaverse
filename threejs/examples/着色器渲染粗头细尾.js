import { scene, renderer, camera } from './scene.js';
//Three.js渲染结果Canvas画布插入到body元素中
document.body.appendChild(renderer.domElement);

// 引入Three.js
import * as THREE from 'three';
/**
 * 创建线条模型
 */
var geometry = new THREE.BufferGeometry(); //创建一个缓冲类型几何体
// 三维样条曲线
var curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(100, 0, -100),
  new THREE.Vector3(0, 80, 0),
  new THREE.Vector3(-100, 0, 100),
]);
//曲线上等间距返回多个顶点坐标
var points = curve.getSpacedPoints(100); //分段数100，返回101个顶点
// setFromPoints方法从points中提取数据赋值给attributes.position
geometry.setFromPoints(points);
var material = new THREE.LineBasicMaterial({
  color: 0x006666, //轨迹颜色
});
//线条模型对象
var line = new THREE.Line(geometry, material);
scene.add(line);

var index = 20; //取点索引位置
var num = 10; //从曲线上获取点数量
var points2 = points.slice(index, index + num); //从曲线上获取一段
var geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(points2);
// 每个顶点对应一个百分比数据attributes.percent 用于控制点的渲染大小
var percentArr = []; //attributes.percent的数据
for (var i = 0; i < points2.length; i++) {
  percentArr.push(i / points2.length);
}
var percentAttribue = new THREE.BufferAttribute(new Float32Array(percentArr), 1);
geometry2.attributes.percent = percentAttribue;
// 点模型渲染几何体每个顶点
var PointsMaterial = new THREE.PointsMaterial({
  color: 0xffff00,
  size: 10.0, //点大小
});
var flyPoints = new THREE.Points(geometry2, PointsMaterial);
scene.add(flyPoints);
// 修改点材质的着色器源码(注意：不同版本细节可能会稍微会有区别，不过整体思路是一样的)
PointsMaterial.onBeforeCompile = function (shader) {
  // 顶点着色器中声明一个attribute变量:百分比
  shader.vertexShader = shader.vertexShader.replace(
    'void main() {',
    [
      'attribute float percent;', //顶点大小百分比变量，控制点渲染大小
      'void main() {',
    ].join('\n'), // .join()把数组元素合成字符串
  );
  // 调整点渲染大小计算方式
  shader.vertexShader = shader.vertexShader.replace(
    'gl_PointSize = size;',
    ['gl_PointSize = percent * size;'].join('\n'), // .join()把数组元素合成字符串
  );
};
// 渲染循环
function render() {
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}
render();
