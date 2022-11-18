/*
 * :file description: 
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-27 16:29:41
 * :last editor: 张德志
 * :date last edited: 2022-11-19 06:15:21
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
    // 是否显示搜索
    // geocoder:false,
    // baseLayerPicker:false,
    // homeButton:false,
    // sceneModePicker:false,
    // baseLayerPicker:false,
    // // 是否显示帮助
    // navigationHelpButton:false,
    // // 是否显示动画
    // animation:false,
    // // 时否时显时间
    // timeline:false,
    // // skyBox:new Cesium.SkyBox({

    // // })
    // imageryProvider: new Cesium.UrlTemplateImageryProvider({
    //     url:'',
    //     layer:'',
    //     style:'',
    //     form:'img/png',
        
    // })
    terrainProvider:Cesium.create
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

viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(113.3191,23.109,1000),
    orientation:{
        heading:Cesium.Math.toRadians(0.0),
        pitch:Cesium.Math.toRadians(0),
        roll:0
    }
})

// 通过按钮移动相机
document.addEventListener('keydown',(ev) => {
    const height = viewer.camera.positionCartographic.height;
    if(ev.key == 'w') {
        viewer.camera.moveForward(10)
    }else if(ev.key == 's') {
        viewer.camera.moveBackward(10)
    }else if(ev.key == 'a') {
        viewer.camera.moveLeft(10)
    }else if(ev.key == 'q') {
        viewer.camera.moveUp(10)
    }
});

// 添加一个点
const point = viewer.entities.add({
    position:Cesium.Cartesian3.fromDegrees(113.3191,23.109,1000),
    point:{
        pixelSize:10,
        color:Cesium.Color.RED,
        outlineColor:Cesium.Color.WHITE,
        outlineWidth:4,
    }
})

// 添加3D建筑
const osm = viewer.scene.primitives.add(
    new Cesium.createOsmBuildings()
)





// viewer.scene.globe.show = true;
// viewer.scene.camera.setView({
//     destination:Cesium.Cartesian3.fromDegrees(116.39,39.9,1500)
// })
