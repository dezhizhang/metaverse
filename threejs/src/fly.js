/*
 * :file description: 
 * :name: /threejs/src/fly.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-02-17 21:46:55
 * :last editor: 张德志
 * :date last edited: 2023-02-17 21:47:18
 */
/*当前城市所有相关飞线、柱子、波动光圈批量绘制函数
参数start：当前城市，也就是飞线发射中心的经纬度坐标Vector3
参数endArr：与当前当成所有相关城市的经纬度坐标Vector3构成的集合*/
export default function currentCityAllFlys(start, endArr) {
  // 每次重新绘制的时候要清除释放原有飞线等模型几何体和材质占用内存
  if (cityGroup.children.length) disposeGroup(cityGroup);
  if (flyGroup.children.length) disposeGroup(flyGroup);

  // 标注发射中心
  var startPoint = cityPoint(start)
  cityGroup.add(startPoint)
  //四棱锥startMesh标注起点
  startMesh = startMeshFun(start);
  cityGroup.add(startMesh);

  cityPointArr.push(startPoint)
  startPoint.position.z += 1.3
  startPoint.geometry.scale(1.2, 1.2, 1.0)
  //批量绘制飞线
  endArr.forEach((cood, i) => {
    var end = new THREE.Vector3(cood.E, cood.N, 0); //终点
    var cityPointMesh = cityPoint(end)
    cityGroup.add(cityPointMesh)
    cityPointMesh.s = _s * Math.random() + 1; //随机设置一个缩放倍数
    cityPointArr.push(cityPointMesh)
    //飞线运动轨迹绘制函数flyTrack
    var flyTrack = flyTrackFun(start, end);
    flyGroup.add(flyTrack); //线条对象添加到场景中

    // 获取飞线轨迹线上的顶点坐标，用于飞线段绘制
    var points = flyTrack.flyTrackPoints;

    var index = 20; //飞线索引起点
    var flyline = flylineFun(index, points); //绘制一段飞线
    //飞线取点索引范围：points.length - flyline.num
    flyline.index = Math.floor((points.length - flyline.num) * Math.random()); //索引位置随机
    flyTrack.add(flyline); //飞线段flyline作为飞线轨迹flyTrack子对象，可以继承飞线轨迹平移旋转等变换
    var maxH = 4; // 假设最大值
    var h = 1 + (maxH - 1) * Math.random();
    var heightMesh = cityHeight(h, h / maxH);
    // 通过经纬度坐标设置柱子在地图上位置
    heightMesh.position.set(cood.E, cood.N, 0);
    cityGroup.add(heightMesh);
  })
}

/*释放模型对象几何体和材质所占用的内存*/
function disposeGroup(group) {
  // .traverse方法递归遍历group的所有后代
  group.traverse(function(obj) {
    if (obj.type == 'Mesh' || obj.type == 'Line') {
      obj.geometry.dispose();
      obj.material.dispose();
    }
  })
  if (group.children.length) {
    group.children = []; //删除所有后代模型对象
  }
}
/*startMeshFun函数创建一个四棱锥标注飞线起点
startCoord：表示起点经纬度坐标*/
function startMeshFun(startCoord) {
  var startgeometry = new THREE.ConeBufferGeometry(0.5, 2, 4);
  startgeometry.rotateX(-Math.PI / 2);
  var startmaterial = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
  });
  var startMesh = new THREE.Mesh(startgeometry, startmaterial);
  startMesh.position.copy(startCoord);
  startMesh.position.z += 1;
  return startMesh
}
var texLoad = new THREE.TextureLoader();
/*cityHeight函数：创建一个颜色和高度随着所表示对象大小变化的柱子
h：柱子高度值，表示某个城市某种数据的大小
percent：h和最大高度数据的比值，用于柱子颜色计算*/
//geometryHeight是一个高度为1的正六棱柱
var geometryHeight = new THREE.CylinderGeometry(0.2, 0.2, 1, 6);
geometryHeight.rotateX(Math.PI / 2);
geometryHeight.translate(0, 0, 0.5);
geometryHeight.computeFlatVertexNormals();
// color1、color2表示柱子的颜色范围
// var color1 = new THREE.Color(0xffff00);
// var color2 = new THREE.Color(0xff3300);
var color1 = new THREE.Color(0x00ffff);
var color2 = new THREE.Color(0x00ff33);
function cityHeight(h, percent) {
  // MeshLambertMaterial  MeshPhongMaterial
  var material = new THREE.MeshLambertMaterial({
    // color: 0xffff00,
  });
  // 设置柱子颜色,根据percent在color1和color2之间进行颜色插值
  var color = color1.clone().lerp(color2.clone(), percent)
  material.color.copy(color);

  var mesh = new THREE.Mesh(geometryHeight, material);
  mesh.scale.z = h; //控制柱子高度
  return mesh;
}

/*通过cityPoint函数标注一个地图上上某个地点
cityCoord：表示城市经纬度坐标*/
var cityPointTexture = texLoad.load("./端点标注.png")
function cityPoint(cityCoord) {
  // MeshBasicMaterial:不受光照影响
  var mat = new THREE.MeshBasicMaterial({
    // color: 0xffff00,
    color: 0x00ffff,
    map: cityPointTexture,
    transparent: true,
    side: THREE.DoubleSide, //THREE.BackSide,
    depthWrite: false, //是否对深度缓冲区有任何的影响
  })
  // 矩形平面几何体
  // var geo = new THREE.PlaneGeometry(1.0, 1.0)
  var geo = new THREE.PlaneGeometry(1.5, 1.5)
  var cirMesh = new THREE.Mesh(geo, mat)
  cirMesh.position.copy(cityCoord)
  return cirMesh
}
// updateFlyGeo：更新飞线几何体顶点位置坐标
function updateFlyGeo(flyline, index, points) {
  var pointArr = []; //存储飞线轨迹上选择的顶点坐标，用于飞线绘制
  for (var i = 0; i < flyline.num; i++) {
    var v3 = points[i + index]
    pointArr.push(v3.x, v3.y, v3.z)
  }
  // 设置几何体顶点位置坐标
  flyline.geometry.setPositions(pointArr);
  flyline.geometry.verticesNeedUpdate = true; //通知three.js几何体顶点位置坐标数据更新
}
/*flylineFun函数：在飞线轨迹样条曲线上选取一段曲线绘制出来
飞线绘制基本思路：飞线是沿着飞线轨迹运动，所以只要获取飞线轨迹上某一段的顶点坐标，
然后通过获取的这些坐标绘制飞线段即可。
index:飞线轨迹上取点位置索引
points：飞线轨迹上一系列顶点坐标*/
function flylineFun(index, points) {
  var choosePoints = []; //存储飞线轨迹上选择的顶点坐标，用于飞线绘制
  var num = 11; //从曲线上取11个点 飞线长度占飞线轨迹长度的10%  你可通过获取的点数调节飞线长度
  for (var i = 0; i < num; i++) {
    choosePoints.push(points[i + index])
  }
  // 创建一个LineGeometry几何体
  var geometry = new THREE.LineGeometry();
  var pointArr = []
  //把样条曲线返回的顶点坐标Vector3中xyz坐标提取到pointArr数组中
  choosePoints.forEach(function(v3) {
    pointArr.push(v3.x, v3.y, v3.z)
  })
  // 设置几何体顶点位置坐标
  geometry.setPositions(pointArr);
  // 给几何体每个顶点设置对应颜色值
  var colorArr = []
  for (var i = 0; i < choosePoints.length; i++) {
    var color1 = new THREE.Color(0x006666); //飞线轨迹相近的颜色
    var color2 = new THREE.Color(0xffff00);
    var colo = null
    // posNum：插值计算的临界值  对应color2
    // var posNum = points.length/2;//飞线段，黄色居中，两侧青色
    var posNum = choosePoints.length - 2;
    if (i < posNum) {
      colo = color1.lerp(color2, i / posNum)
    } else {
      colo = color2.lerp(color1, (i - posNum) / (choosePoints.length - posNum))
    }
    colorArr.push(colo.r, colo.g, colo.b)
  }
  //设置几何体顶点颜色值，进行插值计算
  geometry.setColors(colorArr);
  //几何体LineGeometry对应的材质LineMaterial
  var material = new THREE.LineMaterial({
    // color: 0xffff00,//使用顶点颜色，材质颜色不用设置
    vertexColors: THREE.VertexColors, //使用顶点颜色插值计算
    linewidth: 2.5, // 设置线宽
  });
  //材质输入Three.js渲染canvas画布的宽高度
  material.resolution.set(window.innerWidth, window.innerHeight);
  var flyline = new THREE.Line2(geometry, material);
  // 自定义飞线属性flyline.num、flyline.index，用于飞线动画
  flyline.num = num;
  flyline.index = index;
  return flyline;
}

/*飞线运动轨迹绘制函数flyTrack
参数start,end:飞线的起点和结束点坐标Vector3*/
function flyTrackFun(start, end) {
  // var H = 3; //弧线高度全部一样
  var length = start.clone().sub(end).length();
  var H = length * 0.1; //根据两点之间距离设置弧线高度
  var middle = new THREE.Vector3(0, 0, 0);
  middle.add(start).add(end).divideScalar(2)
  // middle.y += H;
  middle.z += H; //调整高度方向为z

  var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
  // 起始点坐标和弧线高度确定一条3D样条曲线
  var curve = new THREE.CatmullRomCurve3([
    start,
    middle,
    end
  ]);
  var points = curve.getPoints(100); //分段数100，返回101个顶点，返回一个vector3对象作为元素组成的数组
  geometry.setFromPoints(points); // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
  //材质对象
  var material = new THREE.LineBasicMaterial({
    color: 0x00aaaa,
  });
  //线条模型对象
  var line = new THREE.Line(geometry, material);
  line.flyTrackPoints = points; // 自定义属性用于飞线动画
  return line;
}
