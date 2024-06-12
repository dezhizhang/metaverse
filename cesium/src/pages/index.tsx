/*
 * :file description:
 * :name: /cesium/src/pages/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-06-02 21:15:48
 * :last editor: 张德志
 * :date last edited: 2024-06-13 05:52:46
 */
import * as Cesium from 'cesium';
import * as turf from '@turf/turf';
import '/public/Widgets/widgets.css';
import { useEffect } from 'react';
import './index.less';

export const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NWVlNTI2MC00YTViLTQzZjYtOGMxNy1lYTAxMDVkMTMwNTQiLCJpZCI6MTA3NjIxLCJpYXQiOjE2NjI3OTY2ODR9.9Amu-saGmeaPMMt9LE5MjF0FQcoC3toDrxCo_J4ItAg';
// (window as any).CESIUM_BASE_URL = '/';

(window as any).CESIUM_BASE_URL = '/';

export default function IndexPage() {
  const load3dModel = async () => {
    Cesium.Ion.defaultAccessToken = ACCESS_TOKEN;
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
      89.5,
      20.4,
      110.4,
      61.2,
    );
    const viewer = new Cesium.Viewer('container', {
      // infoBox: false,
      // 是否显示查询按钮
      geocoder: false,
      // 不显示home按钮
      homeButton: false,
      // 查看器模式
      sceneModePicker: false,
      // 是否显示图层按钮
      baseLayerPicker: false,
      // 是否显示帮助按钮
      navigationHelpButton: false,
      // 是否显示动画
      animation: false,
      // 时间轴
      timeline: false,
      // 是否显示全屏按钮
      fullscreenButton: false,
      // imageryProvider: new Cesium.UrlTemplateImageryProvider({
      //   url:
      //     'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=18&x={x}&y={y}&z={z}',
      //   // layer: "tdtVecBasicLayer",
      //   // style: "default",
      //   // format: "image/png",
      //   // tileMatrixSetID: "GoogleMapsCompatible",
      // }),
      // 添加天空盒子
      // terrainProvider:new Cesium.CesiumTerrainProvider({
      //   url:'',
      // })
    });

    // 光照效果
    // viewer.scene.globe.enableLighting = true;

    // 雾
    // viewer.scene.fog.enabled = true;
    // viewer.scene.fog.minimumBrightness = 0.1;
    // viewer.scene.fog.density = 0.03;

    // viewer.scene.globe.showGroundAtmosphere = true;
    // viewer.scene.globe.lightingFadeInDistance = 10;

    // 天空大气效果
    // viewer.scene.skyAtmosphere.show = true;
    // viewer.scene.skyAtmosphere.brightnessShift = 20;

    // HDR效果
    // viewer.scene.highDynamicRange = true;

    // const entity = viewer.entities.add({
    //   position:Cesium.Cartesian3.fromDegrees(86.66,28.1),
    //   billboard:{
    //     show:true,
    //     image: '/LaunchPad.png',
    //     pixelOffset: new Cesium.Cartesian2(100,100),
    //     eyeOffset: new Cesium.Cartesian3(0,0,0),
    //     scale:0.8,
    //     horizontalOrigin:Cesium.HorizontalOrigin.CENTER,
    //     verticalOrigin:Cesium.VerticalOrigin.BOTTOM,

    //   }
    // });

    // viewer.zoomTo(entity);

    // 光效果
    // const bloom = viewer.scene.postProcessStages.bloom;
    // bloom.enabled = true;
    // bloom.uniforms.glowOnly = false;
    // bloom.uniforms.contrast = 128;
    // bloom.uniforms.brightness = -0.3;

    // const box= viewer.entities.add({
    //   name: 'blue box',
    //   position: Cesium.Cartesian3.fromDegrees(0.0, 40.0, 0.0),
    //   box: {
    //     show: true,
    //     heightReference: Cesium.HeightReference.NONE,
    //     dimensions: new Cesium.Cartesian3(100, 100, 100),
    //     fill: true,
    //     material: Cesium.Color.BLUE,
    //     outline: true,
    //     outlineColor: Cesium.Color.YELLOW,
    //     outlineWidth: 10,
    //     shadows: Cesium.ShadowMode.RECEIVE_ONLY,
    //   },
    // });

    // viewer.zoomTo(box);

    // 添加平行光
    viewer.scene.light = new Cesium.DirectionalLight({
      direction:Cesium.Cartesian3.fromElements(-0.2,-0.5,-0.8),
      intensity:1,
    });




    const box = viewer.entities.add({
      name:'blue box',
      position:Cesium.Cartesian3.fromDegrees(0.0,40.0,0.0),
      box:{
        show:true,
        heightReference:Cesium.HeightReference.NONE,
        dimensions:new Cesium.Cartesian3(100,100,100),
        fill:true,
        material:Cesium.Color.YELLOW,
        outline:true,
        outlineColor:Cesium.Color.BLUE,
        outlineWidth:10,
        shadows:Cesium.ShadowMode.RECEIVE_ONLY,
      }
    });

    viewer.zoomTo(box);




  };
  useEffect(() => {
    load3dModel();
  }, []);

  return <div id="container" />;
}
