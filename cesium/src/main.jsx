/*
 * :file description:
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-22 20:18:01
 * :last editor: 张德志
 * :date last edited: 2024-05-28 06:50:43
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
  terrainProvider: Cesium.createWorldTerrain({
    requestWaterMask: true,
  }),
});

const cartesian3 = Cesium.Cartesian3.fromDegrees(110, 20, 30);

const cartographic = Cesium.Cartographic.fromCartesian(cartesian3);

const lon = Cesium.Math.toDegrees(cartographic.longitude);
const lat = Cesium.Math.toDegrees(cartographic.latitude);

// 设置相机
// const position = Cesium.Cartesian3.fromDegrees(110,20,2000);
// viewer.camera.setView({
//   destination:position,
//   orientation:{
//     heading:Cesium.Math.toRadians(-90),
//     pitch:Cesium.Math.toRadians(-90)
//   }
// })

// const position = Cesium.Cartesian3.fromDegrees(110, 20, 2000);
// viewer.camera.setView({
//   destination: position,
//   orientation: {
//     heading: Cesium.Math.toRadians(-90),
//     pitch: Cesium.Math.toRadians(90),
//     roll: Cesium.Math.toRadians(0),
//   },
// });

// const position = Cesium.Cartesian3.fromDegrees(110,20,2000);
// viewer.camera.flyTo({
//   destination:position,
//   orientation:{
//     heading: Cesium.Math.toRadians(0),
//     pitch: Cesium.Math.toRadians(0),
//     roll: Cesium.Math.toRadians(0),
//   },
//   duration:3
// })

// const position = Cesium.cartesian3.fromDegrees(110, 20, 20000);
// viewer.camera.flyTo({
//   destination: position,
//   orientation: {
//     heading: Cesium.Math.toRadians(0),
//     pitch: Cesium.Math.toRadians(0),
//     roll: Cesium.Math.toRadians(0),
//   },
//   duration: 3,
// });

// const position = Cesium.Cartesian3.fromDegrees(110,20);
// viewer.camera.lookAt(
//   position,
//   new Cesium.HeadingPitchRange(
//     Cesium.Math.toRadians(0),
//     Cesium.Math.toRadians(-90),
//     20000
//   )
// )

// const point = new Cesium.Entity({
//   position:Cesium.Cartesian3.fromDegrees(120,30),
//   point:{
//     pixelSize:30,
//     color:Cesium.Color.BLUE,
//   }
// });
// viewer.entities.add(point);

// viewer.zoomTo(point);

// const point = viewer.entities.add({
//   id:'point',
//   position:Cesium.Cartesian3.fromDegrees(121,30),
//   point:{
//     pixelSize:20,
//     color:Cesium.Color.YELLOW,
//   }
// });

// viewer.zoomTo(point);

// const point = viewer.entities.add({

// })


// const billboard = viewer.entities.add({
//   position:Cesium.Cartesian3.fromDegrees(116,30,30),
//   billboard:{
//     image:'/LaserStation.png',
//     color:Cesium.Color.YELLOW
//   }
// });

// viewer.zoomTo(billboard);



// const polyline = viewer.entities.add({
//   polyline:{
//     positions:Cesium.Cartesian3.fromDegreesArray([
//       120,20,
//       121,20,
//       121,20.5
//     ]),
//     width:10,
//     material:Cesium.Color.YELLOW
//   }
// });

// viewer.zoomTo(polyline);


// const polyline = viewer.entities.add({
//   polyline:{
//     positions:Cesium.Cartesian3.fromDegreesArray([
//       120,200,
//       121,20,
//       121,20.5
//     ]),
//     width:10,
//     material:Cesium.Color.YELLOW
//   }
// });

// viewer.zoomTo(polyline);

// const polyline = viewer.entities.add({
//   polyline:{
//     positions:Cesium.Cartesian3.fromDegreesArray([
//       120,200,
//       121,20,
//       121,20.5
//     ]),
//     width:10,
//     material:Cesium.Color.YELLOW
//   }
// });

// viewer.zoomTo(polyline);

const polygon = viewer.entities.add({
  polygon:{
    hierarchy:{
      positions:Cesium.Cartesian3.fromDegreesArray([
        120,25,
        121,25,
        121,25.5
      ]),
    
    },
    material:Cesium.Color.RED,
    height:1000,
    extrudedHeight:20000,
  }
});

viewer.zoomTo(polygon);











