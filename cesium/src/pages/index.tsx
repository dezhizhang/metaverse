/*
 * :file description:
 * :name: /cesium/src/pages/index.tsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-06-02 21:15:48
 * :last editor: 张德志
 * :date last edited: 2024-06-04 07:53:42
 */
import * as Cesium from 'cesium';
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
      infoBox: false,
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
          'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
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

    const tiles3d = Cesium.createOsmBuildings();

    const osmBuildings = viewer.scene.primitives.add(tiles3d);

    // const dataGeo = Cesium.GeoJsonDataSource.load(
    //   'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
    //   {
    //     stroke: Cesium.Color.YELLOW,
    //     fill: Cesium.Color.BLUE.withAlpha(0.5),
    //     strokeWidth: 10,
    //   },
    // );

    // viewer.dataSources.add(dataGeo);

    // const dataGeo = Cesium.GeoJsonDataSource.load(
    //   'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
    //   {
    //     stroke:Cesium.Color.YELLOW,
    //     fill:Cesium.Color.BLUE.withAlpha(0.9),
    //     strokeWidth:10
    //   }
    // )


    // const dataGeo = Cesium.GeoJsonDataSource.load('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');

    // dataGeo.then((dataSources) => {
    //   viewer.dataSources.add(dataSources);
    //   const entities = dataSources.entities.values;
    //   entities.forEach((entity:any) => {
    //     entity.polygon.material = new Cesium.ColorMaterialProperty(
    //       Cesium.Color.fromRandom({
    //         alpha:0.8
    //       })
    //     )
    //   })
    // })



    const czml = [
      {
        id: "document",
        name: "box",
        version: "1.0",
      },
      {
        id: "shape1",
        name: "Blue box",
        position: {
          cartographicDegrees: [-114.0, 40.0, 300000.0],
        },
        box: {
          dimensions: {
            cartesian: [400000.0, 300000.0, 500000.0],
          },
          material: {
            solidColor: {
              color: {
                rgba: [0, 0, 255, 255],
              },
            },
          },
        },
      },
    ];

  //   let promiseData = Cesium.CzmlDataSource.load(czml);
  // promiseData.then((dataSource) => {
  //   console.log(dataSource);
  //   viewer.dataSources.add(dataSource);
  //   viewer.flyTo(dataSource);
  // });


  // const promiseData = Cesium.CzmlDataSource.load(czml);

  // promiseData.then((dataSource) => {
  //   viewer.dataSources.add(dataSource);
  //   viewer.zoomTo(dataSource);
  // })


  // const promiseData = Cesium.CzmlDataSource.load(czml);


 

  const promiseData = Cesium.CzmlDataSource.load(czml);

  promiseData.then((dataSource) => {
    viewer.dataSources.add(dataSource);
    viewer.zoomTo(dataSource);
  })




  



   

  }, []);

  return <div id="container" />;
}
