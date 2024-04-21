/*
 * :file description:
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-27 16:29:41
 * :last editor: 张德志
 * :date last edited: 2024-04-21 15:20:04
 */
import * as Cesium from 'cesium';
import planeJson from './plane.json';

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
  // // 是否显示查询按钮
  // geocoder: false,
  // // 不显示home按钮
  // homeButton: false,
  // // 控制查看器显示模式
  // sceneModePicker: false,
  // // 是否显示图层按钮
  // baseLayerPicker: false,
  // // 是否显不帮助
  // navigationHelpButton: false,
  // // 是否显示动画
  // animation: false,
  // 是否显示全屏按钮
  // timeline: false,
  terrainProvider: Cesium.createWorldTerrain({
    requestVertexNormals: true,
    requestWaterMask: true,
  }),
  shouldAnimate: true,
});

const positionProperty = new Cesium.SampledPositionProperty();

// 时间间隔
const timeStepInSeconds = 30;

// 整个飞行时间
const totalSecond = (planeJson.length - 1) * timeStepInSeconds;

const time = new Date();

// 起点时间
const startJulianData = Cesium.JulianDate.fromDate(time);
// 终点时间
const endJullianData = Cesium.JulianDate.fromDate(
  startJulianData,
  totalSecond,
  new Cesium.JulianDate(),
);

viewer.clock.startTime = startJulianData.clone();
viewer.clock.startTime = endJullianData.clone();
viewer.clock.currentTime = startJulianData.clone();

viewer.timeline.zoomTo(startJulianData, endJullianData);

planeJson.forEach((data, index) => {
  const time = Cesium.JulianDate.addSeconds(
    startJulianData,
    index * timeStepInSeconds,
    new Cesium.JulianDate(),
  );

  const position = Cesium.Cartesian3.fromDegrees(data.longitude, data.latitude, data.height);

  positionProperty.addSample(time, position);

  viewer.entities.add({
    position,
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2,
    },
  });

  const planeEntity = viewer.entities.add({
    name: '飞机',
    position: positionProperty,
    orientation: new Cesium.VelocityOrientationProperty(positionProperty),
    model: {
      uri: '/public/Air.glb',
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
    path: new Cesium.PathGraphics({
      width: 5,
    }),
  });
});

const osmBuildings = viewer.scene.primitives.add(new Cesium.createOsmBuildings());
