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
      // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
      //   url: "http://t{s}.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=你的token",
      //   subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'],
      //   layer: "tdtImgLayer",
      //   style: "default",
      //   format: "image/jpeg",
      // })
        
    });

    const xhr = new XMLHttpRequest();
    xhr.open('GET','/chaoyangbaimo1.json');
    xhr.send(null);

    xhr.onload = function() {
      const data = JSON.parse(xhr.responseText);
      const { features } = data || {};

      features.forEach((feature:any) => {
        const { coordinates } = feature.geometry || {};
        coordinates.forEach((coordinate:any) => {
          viewer.entities.add({
            wall:{
              positions:Cesium.Cartesian3.fromDegreesArray(coordinate.flat()),
              minimumHeights: new Array(coordinate.length).fill(0),
              maximumHeights: new Array(coordinate.length).fill(feature.properties.height * 3),
              material:new Cesium.Color(1.0,0.0,0.0,1),
            },
            polygon:{
              hierarchy: Cesium.Cartesian3.fromDegreesArray(coordinate.flat()),
              material:new Cesium.ImageMaterialProperty({
                image: '/wuding.png',
                repeat: new Cesium.Cartesian2(10, 1)
              }),
              height:feature.properties.height * 3,
            }
          });

        })
      });

    }

    viewer.camera.setView({
      destination:Cesium.Cartesian3.fromDegrees(116.45,39.932,3000)
    })

    

   
  


 


   



  };
  useEffect(() => {
    load3dModel();
  }, []);

  return <div id="container" />;
}



