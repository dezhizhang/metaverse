/*
 * :file description:
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-27 16:29:41
 * :last editor: 张德志
 * :date last edited: 2024-04-21 16:26:08
 */
import * as Cesium from 'cesium';

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
  fullscreenButton:false,
  shouldAnimate: true,
});

const osmBuildings = viewer.scene.primitives.add(new Cesium.createOsmBuildings());

// 根据鼠标位置生成经纬度
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction((movement) => {
  const cartesian = viewer.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
  if (cartesian) {
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
    const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
    
    const heightString = cartographic.height;

    console.log({longitudeString,latitudeString,heightString})

    document.getElementById('mouse-position').innerHTML = `经度：${longitudeString} 纬度：${latitudeString} 高度：${heightString}`
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
