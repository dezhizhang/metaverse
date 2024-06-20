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
import PolylineTrailLinkMaterialProperty from './PolylineTrailLinkMaterialProperty';
import './index.less';

export const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NWVlNTI2MC00YTViLTQzZjYtOGMxNy1lYTAxMDVkMTMwNTQiLCJpZCI6MTA3NjIxLCJpYXQiOjE2NjI3OTY2ODR9.9Amu-saGmeaPMMt9LE5MjF0FQcoC3toDrxCo_J4ItAg';
// (window as any).CESIUM_BASE_URL = '/';

(window as any).CESIUM_BASE_URL = '/';

export default function IndexPage() {
  const load3dModel = async () => {
    Cesium.Ion.defaultAccessToken = ACCESS_TOKEN;

    // 设置默认视角
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
      89.5,
      20.4,
      110.4,
      61.2,
    );

    const viewer = new Cesium.Viewer('container', {
      // 是否显示信息框
      infoBox: false,
      // 是否显示查询按钮
      geocoder: false,
      // 是否显示home
      homeButton: false,
      // 查看器显示模式
      sceneModePicker: false,
      // 是否显示图层显示器
      baseLayerPicker: false,
      // 是否显示帮助按钮
      navigationHelpButton: false,
      // 是否播放动画
      animation: false,
      // 是否显示时间轴
      timeline: false,
      // 是不显示全屏
      fullscreenButton: false,
      // skyBox: new Cesium.SkyBox({
      //   // sources:{
      //   //   positiveX:'/texture/sky/px.jpg',
      //   //   negativeX:'/textuer/sky/nx.jpg',
      //   //   positiveY:'/texture/sky/py.jpg',
      //   //   negativeY:'/texture/sky/ny.jpg',
      //   //   positivez:'/texture/sky/nz.jpg',
      //   // }
      //   sources : {
      //     positiveX : '/texture/sky/px.jpg',
      //     negativeX : '/texture/sky/nx.jpg',
      //     positiveY : '/texture/sky/py.jpg',
      //     negativeY :'/texture/sky/ny.jpg',
      //     positiveZ :'/texture/sky/pz.jpg',
      //     negativeZ :'/texture/sky/nz.jpg'
      //   }
      // }),

      // 添加高德地图
      // imageryProvider: new Cesium.UrlTemplateImageryProvider({
      //   url:'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=18&x={x}&y={y}&z={z}',
      //   layer:'tdtVecBasicLayer',
      //   style:'default',
      //   format:'image/png',
      //   tileMatrixSetID:'GoogleMapsCompatible',
      // }),

      // 设置地形
      terrainProvider: Cesium.createWorldTerrain({
        requestVertexNormals: true,
        requestWaterMask: true,
      }),
    });

    // const material = new Cesium.CheckerboardMaterialProperty({
    //   evenColor:Cesium.Color.WHITE,
    //   oddColor: Cesium.Color.BLACK,
    //   repeat: new Cesium.Cartesian2(4,4),
    // });

    // const rectangle = viewer.entities.add({
    //   id:'rectangle',
    //   rectangle:{
    //     material,
    //     coordinates: Cesium.Rectangle.fromDegrees(
    //       115,
    //       20,
    //       135,
    //       30
    //     )
    //   }
    // });

    // viewer.zoomTo(rectangle);

    // const material = new Cesium.PolylineDashMaterialProperty({
    //   dashLength: 30,
    //   color: Cesium.Color.RED,
    // });

    // const material = new Cesium.PolylineArrowMaterialProperty(Cesium.Color.YELLOW);



    // const material = new Cesium.PolylineArrowMaterialProperty(Cesium.Color.YELLOW);

    // const redline = viewer.entities.add({
    //   polyline:{
    //     positions:Cesium.Cartesian3.fromDegreesArray([
    //       -75, 35,
    //       -125, 35
    //     ]),
    //     width:5,
    //     material
    //   }
    // });
    // viewer.zoomTo(redline);

    // 发光飞线效果
    const material = new Cesium.PolylineGlowMaterialProperty({
      glowPower:0.8,
      taperPower:0.7,
      color:Cesium.Color.YELLOW
    });

    const redline = viewer.entities.add({
      polyline:{
        positions:Cesium.Cartesian3.fromDegreesArray([
          -75, 35,
          -125, 35
        ]),
        width:5,
        material
      }
    });
    viewer.zoomTo(redline);







    // const rectGeometry = new Cesium.RectangleGeometry({

    //   rectangle:{
    //     coordinates:Cesium.Rectangle.fromDegrees(
    //       115,
    //       20,
    //       135,
    //       30
    //     ),
    //     material:material,
    //   },

    //   extrudedHeight:10000,
    //   vertexFormat:Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    // });

    // const instance = new Cesium.GeometryInstance({
    //   id:'rectGeometry',
    //   geometry:rectGeometry,
    //   attributes:{
    //     color:Cesium.ColorGeometryInstanceAttribute.fromColor(
    //       Cesium.Color.RED.withAlpha(0.9)
    //     )
    //   }
    // })

    // const primitive = new Cesium.Primitive({
    //   geometryInstances:instance,
    //   appearance: new Cesium.PerInstanceColorAppearance({
    //     flat:true
    //   })
    // });

    // viewer.scene.primitives.add(primitive);

    // // 添加交互
    // const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    // handler.setInputAction((event) => {
    //   const pickedObject = viewer.scene.pick(event.position);
    //   if(Cesium.defined(pickedObject)) {
    //     const attributes = primitive.getGeometryInstanceAttributes(pickedObject.id);
    //     attributes.color = Cesium.ColorGeometryInstanceAttribute.toValue(
    //       Cesium.Color.YELLOW.withAlpha(0.5)
    //     )
    //   }
    // },Cesium.ScreenSpaceEventType.LEFT_CLICK)
  };
  useEffect(() => {
    load3dModel();
  }, []);

  return <div id="container" />;
}
