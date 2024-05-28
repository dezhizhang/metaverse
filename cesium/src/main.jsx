/*
 * :file description:
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-22 20:18:01
 * :last editor: 张德志
 * :date last edited: 2024-05-29 06:19:48
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
  selectionIndicator: false,
  baseLayerPicker: false,
  imageryProvider: new Cesium.UrlTemplateImageryProvider({
    url: 'http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    minimumLevel: 1,
    maximumLevel: 18,
  }),
  terrainProvider: Cesium.createWorldTerrain({
    requestWaterMask: true,
  }),
});


viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({  //调用矢量地图中文注记服务
  url: "http://t{s}.tianditu.gov.cn/mapservice/swdx?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=d53ca517a1b035796b7b6cc4f527f845",
  subdomains:['0','1','2','3','4','5','6','7'],
  layer: "tdtAnnoLayer",
  style: "default",
  format: "image/jpeg",
   tileMatrixSetID: "GoogleMapsCompatible",
 }));


const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction((click) => {
  const ray = viewer.camera.getPickRay(click.position);

  const position = viewer.scene.globe.pick(ray,viewer.scene);

  if(position) {
    const wgs84 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
    console.log(wgs84);
  }

},Cesium.ScreenSpaceEventType.LEFT_CLICK);


// const tileset = new Cesium.Cesium3DTileset({
//   url:'/tileset.json',
// });

// viewer.zoomTo(tileset)




// const point = viewer.entities.add({
//   position:Cesium.Cartesian3.fromDegrees(109,0),
//   point:{
//     pixelSize:50,
//     color:new Cesium.Color(102,121,0)
//   }
// });

// viewer.zoomTo(point);

// zhang701XTAY





