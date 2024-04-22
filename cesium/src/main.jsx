/*
 * :file description:
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-27 16:29:41
 * :last editor: 张德志
 * :date last edited: 2024-04-23 06:47:42
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

const position = Cesium.Cartesian3.fromDegrees(
  // 经度
  113.3191,
  23.109,
  // 高度
  1000,
);

viewer.camera.flyTo({
  destination: position,
  orientation: {
    heading: Cesium.Math.toRadians(20),
    pitch: Cesium.Math.toRadians(-20),
    roll: 0,
  },
});

const point = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 610),
  billboard: {
    image: '/vite.svg',
    width: 30,
    height: 30,
  },
});

// const label = viewer.entities.add({
//   position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 610),
//   label: {
//     text: '广州塔',
//     font: '24px sans-serif',
//     fillColor: Cesium.Color.WHITE,
//     outlineWidth: Cesium.Color.BLACK,
//     outlineWidth: 4,
//     style: Cesium.LabelStyle.FILL_AND_OUTLINE,
//     pixelOffset: new Cesium.Cartesian2(0, -24),
//     horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
//     verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
//   },
// });

const label = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 610),
  label: {
    text: '广州塔',
    font: '24px sans-serif',
    fillColor: Cesium.Color.WHITE,
    outlineWidth: Cesium.Color.BLACK,
    outlineWidth: 4,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    pixelOffset: new Cesium.Cartesian2(0, -24),
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  },
});

const osmBuildingsTileset = Cesium.createOsmBuildings();
viewer.scene.primitives.add(osmBuildingsTileset);

function loadGaodeMap() {
  // 添加高德影像图
  let imgLayer = new Cesium.UrlTemplateImageryProvider({
    url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    layer: 'imgLayer',
    minimumLevel: 3,
    maximumLevel: 18,
  });
  viewer.imageryLayers.addImageryProvider(imgLayer);

  // 影像注记
  let annoLayer = new Cesium.UrlTemplateImageryProvider({
    url: 'http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
    layer: 'annoLayer',
    style: 'default',
    //format: "image/jpeg",
    //tileMatrixSetID: "GoogleMapsCompatible"
  });
  viewer.imageryLayers.addImageryProvider(annoLayer);
}

loadGaodeMap();

const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction((movement) => {
  const cartesian = viewer.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
  if (cartesian) {
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
    const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);

    const heightString = cartographic.height;

    console.log({ longitudeString, latitudeString, heightString });

    document.getElementById(
      'mouse-position',
    ).innerHTML = `经度：${longitudeString} 纬度：${latitudeString} 高度：${heightString}`;
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

// 创建几何体
const rectangle = viewer.entities.add({
  rectangle: {
    coordinates: Cesium.Rectangle.fromDegrees(90, 20, 110, 30),
    material: Cesium.Color.RED.withAlpha(0.5),
  },
});
