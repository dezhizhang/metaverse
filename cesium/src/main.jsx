/*
 * :file description:
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-27 16:29:41
 * :last editor: 张德志
 * :date last edited: 2024-04-22 20:41:32
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

  // 自定义地形
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
});


viewer.cesiumWidget.creditContainer.style.display = 'none';

