import * as Cesium from "cesium";
import gsap from "gsap";
export default class LightSpreadMaterialProperty {
  constructor(name) {
    this.name = name;
    this.definitionChanged = new Cesium.Event();
    Cesium.Material._materialCache.addMaterial("LightSpreadMaterial", {
      fabric: {
        type: "LightSpreadMaterial",
        uniforms: {
          uTime: 0,
          image: "./texture/hexagon.png",
        },
        source: `
          czm_material czm_getMaterial(czm_materialInput materialInput)
          {
            // 生成默认的基础材质
            czm_material material = czm_getDefaultMaterial(materialInput);
            vec2 st = materialInput.st;
            // 根据uv采样颜色
            vec4 color = texture2D(image, st);
            material.diffuse = color.rgb;
            material.alpha = color.a;
            return material;
          }

          `,
      },
    });

    this.params = {
      uTime: 0,
    };
    gsap.to(this.params, {
      uTime: 6.28,
      duration: 1,
      repeat: -1,
      ease: "linear",
    });
  }
  getType() {
    // 返回材质类型
    return "LightSpreadMaterial";
  }
  getValue(time, result) {
    result.uTime = this.params.uTime;
    // 返回材质值
    return result;
  }
  equals(other) {
    // 判断两个材质是否相等
    return (
      other instanceof LightSpreadMaterialProperty && this.name === other.name
    );
  }
}
