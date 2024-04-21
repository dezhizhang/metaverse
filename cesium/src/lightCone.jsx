/*
 * :file description: 
 * :name: /cesium/src/lightCone.jsx
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-21 19:39:29
 * :last editor: 张德志
 * :date last edited: 2024-04-21 19:39:30
 */
import * as Cesium from "cesium";
import gsap from "gsap";

export default class LightCone {
  constructor(viewer) {
    this.params = {
      height: 700,
      degress: 0,
    };
    //   设置模型位置矩阵
    this.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
      // 位置
      Cesium.Cartesian3.fromDegrees(113.3191, 23.109, this.params.height),
      // 模型旋转情况
      new Cesium.HeadingPitchRoll(this.params.degress, 0, 0)
    );
    //   添加模型
    this.model = viewer.scene.primitives.add(
      new Cesium.Model.fromGltf({
        url: "./model/pyramid.glb",
        show: true,
        // 设置模型的缩放比例
        scale: 200,
        minimumPixelSize: 12,
        maximumScale: 20000,
        debugShowBoundingVolume: false,
        debugWireframe: false,
        color: Cesium.Color.YELLOW.withAlpha(0.5),
        // 设置颜色的混合模式
        colorBlendMode: Cesium.ColorBlendMode.MIX,
        // 设置模型的位置矩阵
        modelMatrix: this.modelMatrix,
      })
    );
    this.animate();
  }
  animate() {
    gsap.to(this.params, {
      height: 800,
      degress: Math.PI,
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "power1.inOut",
      onUpdate: () => {
        this.model.modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
          // 位置
          Cesium.Cartesian3.fromDegrees(113.3191, 23.109, this.params.height),
          // 模型旋转情况
          new Cesium.HeadingPitchRoll(this.params.degress, 0, 0)
        );
      },
    });
  }
}
