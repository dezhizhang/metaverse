/*
 * :file description: 
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-27 16:29:41
 * :last editor: 张德志
 * :date last edited: 2022-11-17 07:12:33
 */
import * as Cesium from 'cesium';
import './index.css';


// const atLayer = new Cesium.UrlTemplateImageryProvider({
//     url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
//     minimumLevel: 3,
//     maximumLevel: 18
// })

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NWVlNTI2MC00YTViLTQzZjYtOGMxNy1lYTAxMDVkMTMwNTQiLCJpZCI6MTA3NjIxLCJpYXQiOjE2NjI3OTY2ODR9.9Amu-saGmeaPMMt9LE5MjF0FQcoC3toDrxCo_J4ItAg';

// 设置默认视角
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    89.5,
    20.4,
    110.4,
    61.2
)

const viewer = new Cesium.Viewer('root',{
    baseLayerPicker:false,
});
// viewer.imageryLayers.addImageryProvider(atLayer);

// viewer.camera.setView({
//     destination:Cesium.Cartesian3.fromDegrees(116.39,39.9,150),
//     orientation:{
//         heading:Cesium.Math.toRadians(0.0),
//         pitch:Cesium.Math.toRadians(0),
//         roll:0
//     }
// })


// viewer.scene.globe.show = true;
// viewer.scene.camera.setView({
//     destination:Cesium.Cartesian3.fromDegrees(116.39,39.9,1500)
// })
