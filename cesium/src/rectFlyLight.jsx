/*
 * :file description: 
 * :name: /cesium/src/rectFlyLight.jsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-21 19:43:10
 * :last editor: 张德志
 * :date last edited: 2024-04-21 20:03:42
 */
import * as Cesium from "cesium";
import * as turf from "@turf/turf";
import PolylineTrailMaterialProperty from "./PolylineTrailMaterialProperty";

export default class RectFlyLight {
  constructor(viewer) {
    // 设置矩形区域
    this.bbox = [113.2691, 23.014, 113.3691, 23.159];
    // 创建随机点
    let points = turf.randomPoint(300, {
      bbox: this.bbox,
    });
    // console.log(points);
    // 通过生成的随机点生成线
    let features = points.features;
    features.forEach((item) => {
      // 获取点的经纬度
      let point = item.geometry.coordinates;
      // 根据点设置起始位置
      let start = Cesium.Cartesian3.fromDegrees(point[0], point[1], 0);
      // 根据点设置结束位置
      let end = Cesium.Cartesian3.fromDegrees(
        point[0],
        point[1],
        200 + Math.random() * 3000
      );
      //   创建自定义线材质
      let polylineTrailMaterialProperty = new PolylineTrailMaterialProperty();
      //   创建线
      let flyLine = viewer.entities.add({
        polyline: {
          positions: [start, end],
          width: 2,
          material: polylineTrailMaterialProperty,
        },
      });
    });
  }
}
