/*
 * :file description: 
 * :name: /cesium/src/RoadLightLine.jsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-21 20:05:23
 * :last editor: 张德志
 * :date last edited: 2024-04-21 20:07:00
 */
import * as Cesium from "cesium";
import PolylineTrailMaterialProperty from "./material/PolylineTrailMaterialProperty";
import SpritelineMaterialProperty from "./material/SpritelineMaterialProperty";


export default class RoadLightLine {
  constructor(viewer) {
    let geoJsonPromise = Cesium.GeoJsonDataSource.load(
      "./geojson/roadline.geojson"
    );
    geoJsonPromise.then((dataSource) => {
      viewer.dataSources.add(dataSource);
      let entities = dataSource.entities.values;
      let color = new Cesium.Color(0.7, 1.0, 0.7, 1.0);
      let polylineTrailMaterialProperty = new PolylineTrailMaterialProperty(
        color
      );
      let spritelineMaterialProperty = new SpritelineMaterialProperty();
      entities.forEach((item) => {
        let polyline = item.polyline;
        polyline.material = spritelineMaterialProperty;
      });
    });
  }
}
