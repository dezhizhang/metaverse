/*
 * :file description:
 * :name: /cesium/src/main.jsx
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-27 16:29:41
 * :last editor: 张德志
 * :date last edited: 2024-04-21 17:45:45
 */
import * as Cesium from 'cesium';
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
  // 是否显示全屏按钮
  timeline: false,
  terrainProvider: Cesium.createWorldTerrain({
    requestVertexNormals: true,
    requestWaterMask: true,
  }),
  fullscreenButton: false,
  shouldAnimate: true,
});

viewer.cesiumWidget.creditContainer.style.display = "none";

viewer.scene.globe.enableLighting = true;
// 取消天空盒显示
viewer.scene.skyBox.show = false;
// 设置背景为黑色
viewer.scene.backgroundColor = Cesium.Color.BLACK;
// 设置抗锯齿
viewer.scene.postProcessStages.fxaa.enabled = true;

// 广州塔------------------------------------
var postion = Cesium.Cartesian3.fromDegrees(
  // 经度
  113.3301,
  // 纬度
  23.0991,
  // 高度
  1500
);
viewer.camera.flyTo({
  destination: postion,
  orientation: {
    heading: Cesium.Math.toRadians(-45),
    pitch: Cesium.Math.toRadians(-30),
    roll: 0,
  },
  duration: 2,
});
// 广州塔------------------------------------



// 根据鼠标位置生成经纬度
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction((movement) => {
  const cartesian = viewer.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
  if (cartesian) {
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
    const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);

    const heightString = cartographic.height;

    // console.log({ longitudeString, latitudeString, heightString });

    document.getElementById(
      'mouse-position',
    ).innerHTML = `经度：${longitudeString} 纬度：${latitudeString} 高度：${heightString}`;
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

// 初始化导航罗盘
const navigation = new CesiumNavigation(viewer, {
  // 是否启用罗盘
  enableCompass: true,
  // 是否启用缩放
  enableZoomControls: true,
  // 是否启用指南针外环
  enableCompassOuterRing: true,
  // 是否启用图例
  enableDistanceLegend: false,
});

// 修改地图颜色--------------------------------
const baseLayer = viewer.imageryLayers.get(0);
baseLayer.invertColor = true;
baseLayer.filterRGB = [0, 50, 100]; //[255,255,255] = > [0,50,100]

const baseFragmentShader = viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources;
// 循环修改着色器
for (let i = 0; i < baseFragmentShader.length; i++) {
  // console.log(baseFragmentShader[i]);
  const strS = 'color = czm_saturation(color, textureSaturation);\n#endif\n';
  let strT = 'color = czm_saturation(color, textureSaturation);\n#endif\n';
  if (baseLayer.invertColor) {
    strT += `
        color.r = 1.0 - color.r;
        color.g = 1.0 - color.g;
        color.b = 1.0 - color.b;
      `;
  }
  if (baseLayer.filterRGB) {
    strT += `
        color.r = color.r*${baseLayer.filterRGB[0]}.0/255.0;
        color.g = color.g*${baseLayer.filterRGB[1]}.0/255.0;
        color.b = color.b*${baseLayer.filterRGB[2]}.0/255.0;
      `;
  }

  baseFragmentShader[i] = baseFragmentShader[i].replace(strS, strT);
}
// 修改地图颜色--------------------------------


// 添加建筑物颜色----------------------------------
const tiles3d = new Cesium.createOsmBuildings();
const osmBuildings = viewer.scene.primitives.add(tiles3d);

// tiles3d.style = new Cesium.Cesium3DTileStyle({
//   show: "${feature['name']} !== '广州塔'",
// });

tiles3d.tileVisible.addEventListener(function (tile) {
  // console.log(tile);
  const cesium3DTileCon = tile.content;
  const featuresLength = cesium3DTileCon.featuresLength;
  // console.log(cesium3DTileCon);
  for (let i = 0; i < featuresLength; i++) {
    const model = cesium3DTileCon.getFeature(i).content._model;

    // 修改模型的片元着色器
    const fragmentShaderSource =
      (model._rendererResources.sourceShaders[1] = `
            varying vec3 v_positionEC;

            void main()
            {
                czm_materialInput materialInput;
                // 获取模型position信息
                vec4 position = czm_inverseModelView * vec4(v_positionEC, 1.0);
                //   根据高度来设置渐变颜色
                float  strength = position.z/200.0;
                gl_FragColor = vec4(strength,0.3*strength,strength, 1.0);

                //   动态光环
                //   czm_frameNumber获取当前帧数
                //   fract(x),返回x的小数部分
                float time  = fract(czm_frameNumber/(60.0*10.0));
              //   float time  = fract(czm_frameNumber/60.0)*6.28 ;
              //   实现往返的操作
                 time = abs(time-0.5)*2.0;
              // time = sin(time);
              // clamp(x, min, max)，返回x在min和max之间的最小值
              float diff = abs(clamp(position.z/500.0, 0.0, 1.0) - time) ;
              // step(edge, x)，如果x大于等于edge，返回1，否则返回0
              diff = step(0.01, diff);
              gl_FragColor.rgb += vec3(0.5)*(1.0-diff);

            }

        `);

    // 片元着色器已经修改，需要更新
    model._shouldRegenerateShaders = true;
  }
});

//添加建筑物颜色-------------------------------------------
