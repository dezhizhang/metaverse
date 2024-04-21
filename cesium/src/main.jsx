/*
 * :file description:
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-27 16:29:41
 * :last editor: 张德志
 * :date last edited: 2024-04-21 15:40:54
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


const osmBuildings = viewer.scene.primitives.add(
  new Cesium.createOsmBuildings()
);

const tileset = new Cesium.Cesium3DTileset({
  url:'/public/tileset.json'
});

tileset.readyPromise.then(function(tileset) {
  viewer.zoomTo(tileset)
})

viewer.scene.primitives.add(tileset);

