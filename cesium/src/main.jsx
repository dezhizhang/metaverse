/*
 * :file description:
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-22 20:18:01
 * :last editor: 张德志
 * :date last edited: 2024-05-28 19:53:27
 */
/*
 * :file description:
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-27 16:29:41
 * :last editor: 张德志
 * :date last edited: 2024-04-22 17:20:19
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

const viewer = new Cesium.Viewer('root', {
  infoBox: false,
  selectionIndicator: false,
  terrainProvider: Cesium.createWorldTerrain({
    requestWaterMask: true,
  }),
});

const cartesian3 = Cesium.Cartesian3.fromDegrees(110, 20, 30);

const cartographic = Cesium.Cartographic.fromCartesian(cartesian3);

const lon = Cesium.Math.toDegrees(cartographic.longitude);
const lat = Cesium.Math.toDegrees(cartographic.latitude);

// 设置相机

const billboard = viewer.entities.add({
  position: new Cesium.Cartesian3.fromDegrees(120, 30, 100),
  billboard: {
    image: '/LaserStation.png',
    scale: 0.3,
    color: Cesium.Color.RED,
  },
});


const line = viewer.entities.add({
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArrayHeights([120, 30, 0, 120, 30, 100]),
    material: Cesium.Color.RED,
  },
});

const label = viewer.entities.add({
  position:new Cesium.Cartesian3.fromDegrees(120,30,100),
  label:{
    text:'某某小区',
    font:'12px',
    fillColor:Cesium.Color.WHEAT,
    pixelOffset:new Cesium.Cartesian2(0,-40),
  }
});

viewer.zoomTo(billboard);


