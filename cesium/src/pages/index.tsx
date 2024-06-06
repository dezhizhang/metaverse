/*
 * :file description:
 * :name: /cesium/src/pages/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-06-02 21:15:48
 * :last editor: 张德志
 * :date last edited: 2024-06-06 22:37:30
 */
import * as Cesium from 'cesium';
import * as turf from '@turf/turf'
import '/public/Widgets/widgets.css';
import { useEffect } from 'react';
import './index.less';

export const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NWVlNTI2MC00YTViLTQzZjYtOGMxNy1lYTAxMDVkMTMwNTQiLCJpZCI6MTA3NjIxLCJpYXQiOjE2NjI3OTY2ODR9.9Amu-saGmeaPMMt9LE5MjF0FQcoC3toDrxCo_J4ItAg';
// (window as any).CESIUM_BASE_URL = '/';

(window as any).CESIUM_BASE_URL = '/';

export default function IndexPage() {
  useEffect(() => {
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
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url:
          'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=18&x={x}&y={y}&z={z}',
        // layer: "tdtVecBasicLayer",
        // style: "default",
        // format: "image/png",
        // tileMatrixSetID: "GoogleMapsCompatible",
      }),
      // 添加天空盒子
      // terrainProvider:new Cesium.CesiumTerrainProvider({
      //   url:'',
      // })
    });

    // const tiles3d = Cesium.createOsmBuildings();
    // const osmBuildings = viewer.scene.primitives.add(tiles3d);

    // viewer.camera.setView({
    //   destination: Cesium.Cartesian3.fromDegrees(113.3919, 23.109, 1000),
    //   orientation: {
    //     // heading:Cesium.Cartesian3.fromRadians(-30)
    //   },
    // });


    // viewer.camera.setView({
    //   destination:Cesium.Cartesian3.fromDegrees(109,34,10000)
    // })
    // var polygons = turf.randomPolygon(25, {bbox: [-180, -90, 180, 90]})




    // const polygon = turf.polygon(
    //   [
    //     [
    //       [108,34],
    //       [108,34.5],
    //       [109,34.5],
    //       [109,34],
    //       [108,34],
    //     ]
    //   ],
    //   {
    //     name:'polygon'
    //   }
    // );

    // const point:any = turf.point([109,34],{name:'point'});

    // const collection = turf.featureCollection([
    //   point,
    //   polygon
    // ]);

  

    const center = [108.5,34.5];
    const radis = 5;

    const options = {steps:100,unit:'kilometers'};
    const circle = turf.circle(center,radis,options);


    const collection = turf.featureCollection([
      circle
    ]);

    const dataSource = Cesium.GeoJsonDataSource.load(collection);

    dataSource.then((data) => {
      viewer.dataSources.add(data);
      viewer.zoomTo(data);
    })


    



  }, []);

  return <div id="container" />;
}
