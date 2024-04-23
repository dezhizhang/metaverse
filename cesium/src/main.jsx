/*
 * :file description: 
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-22 20:18:01
 * :last editor: 张德志
 * :date last edited: 2024-04-23 22:32:04
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
import modifyMap from './modifyMap';
import modifyBuild from './modifyBuild';
import LightCone from './lightCone';
import RectFlyLight from './rectFlyLight'
import RoadLightLine from './RoadLightLine';
import RadarLight from './RadarLight';
import LightSpread from './LightSpread';
import LightWall from './LightWall';
import ParticleLight from './ParticleLight';
import CesiumNavigation from 'cesium-navigation-es6';

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
  // 是否显示全屏按钮
  timeline: false,
  terrainProvider: Cesium.createWorldTerrain({
    requestVertexNormals: true,
    requestWaterMask: true,
  }),
  fullscreenButton: false,
  shouldAnimate: true,
});

const material =new Cesium.ColorMaterialProperty(
  new Cesium.Color(1.0,1.0,1.0,1.0)
)


// const rectGeometry = new Cesium.RectangleGeometry({
//   rectangle:Cesium.Rectangle.fromDegrees(
//     115,
//     20,
//     135,
//     30
//   ),
//   extrudedHeight:2000000,
//   material,
//   vertexFormat:Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
// });

// 创建几何体实例
const instance = new Cesium.GeometryInstance({
  geometry:rectGeometry,
  attributes:{
    color:Cesium.ColorGeometryInstanceAttribute.fromColor(
      Cesium.Color.RED.withAlpha(0.5)
    )
  }
});

// 图元
const primitives = new Cesium.Primitive({
  geometryInstances:instance,
  appearance:new Cesium.PerInstanceColorAppearance({
    flat:true
  })
});

viewer.scene.primitives.add(primitives);


