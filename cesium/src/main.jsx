/*
 * :file description:
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-27 16:29:41
 * :last editor: 张德志
 * :date last edited: 2024-04-20 07:25:07
 */
import * as Cesium from 'cesium';

// const atLayer = new Cesium.UrlTemplateImageryProvider({
//     url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
//     minimumLevel: 3,
//     maximumLevel: 18
// })

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NWVlNTI2MC00YTViLTQzZjYtOGMxNy1lYTAxMDVkMTMwNTQiLCJpZCI6MTA3NjIxLCJpYXQiOjE2NjI3OTY2ODR9.9Amu-saGmeaPMMt9LE5MjF0FQcoC3toDrxCo_J4ItAg';
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
  skyBox: new Cesium.SkyBox({
    sources: {
      positiveX: '/texture/sky/px.jpg',
      negativeX: '/texture/sky/nx.jpg',
      positiveY: '/texture/sky/ny.jpg',
      negativeY: '/texture/sky/py.jpg',
      positiveZ: '/texture/sky/pz.jpg',
      negativeZ: '/texture/sky/nz.jpg',
    },
  }),

  // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
  //   url: "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
  //     layer: "tdtBasicLayer",
  //     style: "default",
  //     format: "image/jpeg",
  //     tileMatrixSetID: "GoogleMapsCompatible",
  // }),
  terrainProvider: Cesium.createWorldTerrain({
    requestVertexNormals: true,
    requestWaterMask: true,
  }),
});

const position = Cesium.Cartesian3.fromDegrees(116.38, 39.9, 100);

viewer.camera.flyTo({
  // 指定相机位置
  destination: position,
  orientation: {
    heading: Cesium.Math.toRadians(0),
    pitch: Cesium.Math.toRadians(-20),
    roll: 0,
  },
});

document.addEventListener('keydown', (ev) => {
  const height = viewer.camera.positionCartographic.height;
  const moveRate = height / 100;
  console.log('ev',ev)
  if (ev.key === 'w') {
    viewer.camera.moveForward(moveRate);
  } else if (ev.key == 's') {
    viewer.camera.moveBackward(moveRate);
  } else if (ev.key == 'a') {
    viewer.camera.moveLeft(moveRate);
  } else if (ev.key == 'd') {
    viewer.camera.moveRight(moveRate);
  }
});

Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(89.5, 20.4, 110.4, 61.2);

tungee1024Z;
