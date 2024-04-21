/*
 * :file description: 
 * :name: /cesium/src/RadarLight.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-21 20:16:47
 * :last editor: 张德志
 * :date last edited: 2024-04-21 20:16:48
 */
import * as Cesium from "cesium";
import RadarMaterialProperty from "./material/RadarMaterialProperty";

export default class RadarLight {
  constructor(viewer) {
    // 113.3191,23.109,
    // 设置雷达材质
    this.radarMaterial = new RadarMaterialProperty("radarMaterial");
    this.entity = viewer.entities.add({
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
          113.3291,
          23.119,
          113.3341,
          23.124
        ),
        material: this.radarMaterial,
      },
    });
  }
}
