/*
 * :file description: 
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-27 16:29:41
 * :last editor: 张德志
 * :date last edited: 2022-09-10 21:31:09
 */
import * as Cesium from 'cesium';
import './index.css';


const atLayer = new Cesium.UrlTemplateImageryProvider({
    url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    minimumLevel: 3,
    maximumLevel: 18
})


const viewer = new Cesium.Viewer('root',{
    baseLayerPicker:false,
});
viewer.imageryLayers.addImageryProvider(atLayer);


// viewer.scene.globe.show = true;
// viewer.scene.camera.setView({
//     destination:Cesium.Cartesian3.fromDegrees(116.39,39.9,1500)
// })
