/*
 * :file description:
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-27 16:29:41
 * :last editor: 张德志
 * :date last edited: 2024-04-21 20:06:05
 */
import * as Cesium from 'cesium';
import modifyMap from './modifyMap';
import modifyBuild from './modifyBuild';
import LightCone from './lightCone';
import RectFlyLight from './rectFlyLight'
import RoadLightLine from './RoadLightLine';
import CesiumNavigation from 'cesium-navigation-es6';

// const atLayer = new Cesium.UrlTemplateImageryProvider({
//     url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
//     minimumLevel: 3,
//     maximumLevel: 18
// })

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NWVlNTI2MC00YTViLTQzZjYtOGMxNy1lYTAxMDVkMTMwNTQiLCJpZCI6MTA3NjIxLCJpYXQiOjE2NjI3OTY2ODR9.9Amu-saGmeaPMMt9LE5MjF0FQcoC3toDrxCo_J4ItAg';

Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  //西边的经度
  89.5,
  //南边的纬度
  20.4,
  //东边的经度
  110.4,
  //北边的维度
  61.2,
);
// An example of using a b3dm tileset to classify another b3dm tileset.
const viewer = new Cesium.Viewer('root', {
  // 是否显示信息窗口
  infoBox: false,
  // 是否显示查询按钮
  geocoder: false,
  // 不显示home按钮
  homeButton: false,
  // 控制查看器显示模式
  sceneModePicker: false,
  // 是否显示图层按钮
  baseLayerPicker: false,
  // 是否显不帮助
  navigationHelpButton: false,
  // 是否显示动画
  animation: false,
  // 是否显示全屏按钮
  timeline: false,
  terrainProvider: Cesium.createWorldTerrain({
    requestVertexNormals: true,
    requestWaterMask: true,
  }),
  fullscreenButton: false,
  shouldAnimate: true,
});

viewer.cesiumWidget.creditContainer.style.display = 'none';

viewer.scene.globe.enableLighting = true;
// 取消天空盒显示
viewer.scene.skyBox.show = false;
// 设置背景为黑色
viewer.scene.backgroundColor = Cesium.Color.BLACK;
// 设置抗锯齿
viewer.scene.postProcessStages.fxaa.enabled = true;

// 广州塔------------------------------------
var postion = Cesium.Cartesian3.fromDegrees(
  // 经度
  113.3301,
  // 纬度
  23.0991,
  // 高度
  1500,
);
viewer.camera.flyTo({
  destination: postion,
  orientation: {
    heading: Cesium.Math.toRadians(-45),
    pitch: Cesium.Math.toRadians(-30),
    roll: 0,
  },
  duration: 2,
});
// 广州塔------------------------------------

// 根据鼠标位置生成经纬度
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction((movement) => {
  const cartesian = viewer.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
  if (cartesian) {
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
    const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);

    const heightString = cartographic.height;

    // console.log({ longitudeString, latitudeString, heightString });

    document.getElementById(
      'mouse-position',
    ).innerHTML = `经度：${longitudeString} 纬度：${latitudeString} 高度：${heightString}`;
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

// 初始化导航罗盘
const navigation = new CesiumNavigation(viewer, {
  // 是否启用罗盘
  enableCompass: true,
  // 是否启用缩放
  enableZoomControls: true,
  // 是否启用指南针外环
  enableCompassOuterRing: true,
  // 是否启用图例
  enableDistanceLegend: false,
});

// 修改地图颜色--------------------------------

modifyMap(viewer);

modifyBuild(viewer);


// //添加建筑物颜色-------------------------------------------
// //添加模型
new LightCone(viewer);


new RectFlyLight(viewer);

new RoadLightLine(viewer);


