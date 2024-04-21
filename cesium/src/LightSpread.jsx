/*
 * :file description: 
 * :name: /cesium/src/LightSpread.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-21 20:19:22
 * :last editor: 张德志
 * :date last edited: 2024-04-21 20:19:24
 */
import * as Cesium from "cesium";
import LightSpreadMaterialProperty from "./material/LightSpreadMaterialProperty";
import gsap from "gsap";

export default class LightSpread {
  constructor(viewer) {
    // 113.3191,23.109,
    // 设置雷达材质
    this.LightSpreadMaterial = new LightSpreadMaterialProperty(
      "LightSpreadMaterial"
    );
    this.params = {
      minlot: 113.3091,
      minLat: 23.119,
      maxlot: 113.3141,
      maxLat: 23.124,
    };
    this.entity = viewer.entities.add({
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
          113.3091,
          23.119,
          113.3141,
          23.124
        ),
        material: this.LightSpreadMaterial,
      },
    });
    gsap.to(this.params, {
      minlot: 113.1991,
      minLat: 23.009,
      maxlot: 113.4241,
      maxLat: 23.234,
      duration: 5,
      repeat: -1,
      // yoyo: true,
      ease: "linear",
      onUpdate: () => {
        this.entity.rectangle.coordinates = Cesium.Rectangle.fromDegrees(
          this.params.minlot,
          this.params.minLat,
          this.params.maxlot,
          this.params.maxLat
        );
      },
    });
  }
}
