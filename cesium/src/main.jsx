/*
 * :file description:
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-22 20:18:01
 * :last editor: 张德志
 * :date last edited: 2024-05-30 22:35:46
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
  geocoder: false,
  // 动画控件
  animation: false,
  homeButton: false,
  timeline: false,
  fullscreenButton: false,
  selectionIndicator: false,
  navigationHelpButton: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  shouldAnimate: true,
  shadows: true,
  imageryProvider: new Cesium.UrlTemplateImageryProvider({
    url: 'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    minimumLevel: 1,
    maximumLevel: 18,
  }),
  terrainProvider: Cesium.createWorldTerrain({
    requestWaterMask: true,
  }),
});

// viewer.imageryLayers.addImageryProvider(
//   new Cesium.WebMapTileServiceImageryProvider({
//     //调用矢量地图中文注记服务
//     url: 'http://t{s}.tianditu.gov.cn/mapservice/swdx?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=d53ca517a1b035796b7b6cc4f527f845',
//     subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
//     layer: 'tdtAnnoLayer',
//     style: 'default',
//     format: 'image/jpeg',
//     tileMatrixSetID: 'GoogleMapsCompatible',
//   }),
// );

const polygon = new Cesium.PolygonGeometry({
  polygonHierarchy: new Cesium.PolygonHierarchy(
    Cesium.Cartesian3.fromDegreesArray([
      90,40,
      120,40,
      120,30,
      90,30
    ])
  )
});
const geometry = Cesium.PolygonGeometry.createGeometry(polygon);

// 2，创建geometryInstance
const instance = new Cesium.GeometryInstance({
  geometry:geometry,
});

// 3,创建 material
const material = new Cesium.Material({
  fabric:{
    type:'Water',
    uniforms:{
      baseWaterColor:new Cesium.Color(64 / 255.0, 157 / 255.0, 253 / 255.0, 0.7),
      normalMap:'/waterNormals.jpg',
      frequency:20000,
      animationSpeed:0.1,
      amplitude:50,
      specularIntensity:0.5
    }
  }
});

// 4 创建Appearance
const appearance = new Cesium.EllipsoidSurfaceAppearance({
  material,
});

// 5创建primitive
viewer.scene.primitives.add(new Cesium.Primitive({
  geometryInstances:instance,
  appearance:appearance,
  asynchronous:false,
}));


