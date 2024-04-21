/*
 * :file description: 
 * :name: /cesium/src/PolylineTrailMaterialProperty.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-21 19:42:24
 * :last editor: 张德志
 * :date last edited: 2024-04-21 19:42:25
 */
import * as Cesium from "cesium";
import gsap from "gsap";
let typeNum = 0;
export default class PolylineTrailMaterialProperty {
  constructor(color = new Cesium.Color(0.7, 0.6, 1.0, 1.0)) {
    this.color = color;
    typeNum++;
    this.num = typeNum;
    this.definitionChanged = new Cesium.Event();
    Cesium.Material._materialCache.addMaterial(
      "PolylineTrailMaterial" + this.num,
      {
        fabric: {
          type: "PolylineTrailMaterial" + typeNum,
          uniforms: {
            uTime: 0,
            color: this.color,
          },
          source: `
          czm_material czm_getMaterial(czm_materialInput materialInput)
          {
            // 生成默认的基础材质
            czm_material material = czm_getDefaultMaterial(materialInput);
            // 获取st
            vec2 st = materialInput.st;
            // 获取当前帧数,10秒内变化从0-1；
            float time = fract(czm_frameNumber / (60.0*10.0));
            time = time * (1.0 + 0.1);
            // 平滑过渡函数
            // smoothstep(edge0, edge1, value);
            // 参数1：边缘0,==8,
            // 参数2：边缘1,==10,
            // 参数3：当前值,==7 , result = 0
            // 参数3：当前值,==9 , result = 0.5
            // 参数3：当前值,==10 , result = 1
            float alpha = smoothstep(time-0.1,time, st.s) * step(-time,-st.s);
            alpha += 0.05;
            // 设置材质的透明度
            material.alpha = alpha;
            material.diffuse = color.rgb;
            
            return material;
          }

          `,
        },
      }
    );

    this.params = {
      uTime: 0,
    };
    gsap.to(this.params, {
      uTime: 1,
      duration: 2,
      repeat: -1,
      yoyo: true,
    });
  }
  getType() {
    // 返回材质类型
    return "PolylineTrailMaterial" + this.num;
  }
  getValue(time, result) {
    // // console.log(result, time);
    // let t = performance.now() / 1000;
    // t = t % 1;
    // console.log(t);
    // result.uTime = t;
    result.uTime = this.params.uTime;
    // 返回材质值
    return result;
  }
  equals(other) {
    // 判断两个材质是否相等
    return (
      other instanceof PolylineTrailMaterialProperty &&
      this.color === other.color
    );
  }
}
