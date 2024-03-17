/*
 * :file description:
 * :name: /smart-city/src/mesh/city/modifyMaterial.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-17 15:45:01
 * :last editor: 张德志
 * :date last edited: 2024-03-17 18:17:38
 */
import * as THREE from 'three';
import gsap from 'gsap';

export default function modifyMaterial(mesh) {
  mesh.material.onBeforeCompile = (shader) => {
    gradColor(mesh,shader);
    addCircleSpread(shader);
    // addLineSpread(shader);
  };
}

// 渐变效果
export function gradColor(mesh,shader) {
  mesh.geometry.computeBoundingBox();

  const { min, max } = mesh.geometry.boundingBox;
  const uHeight = max.y - min.y;
  shader.uniforms.uTopColor = {
    value: new THREE.Color('#08f'),
  };
  shader.uniforms.uHeight = {
    value: uHeight,
  };
  shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `
      #include <common>
      varying vec3 vPosition;
      `
  );
  shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      vPosition = position;
      `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `
      #include <common>
      uniform vec3 uTopColor;
      uniform float uHeight;
      varying vec3 vPosition;
      `
  )

  shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
      #include <dithering_fragment>
      vec4 distGradColor = gl_FragColor;
      // 设置混合百分比
      float gradMax = (vPosition.y + uHeight / 2.0) /  uHeight;
      // 计算混合颜色
      vec3 gradMixColor = mix(distGradColor.xyz, uTopColor,gradMax);
      gl_FragColor = vec4(gradMixColor,1.0);
      // #end#
      `
  );
 

}

// 圆形扩散效果
export function addCircleSpread(shader) {
  shader.uniforms.uSpreadCenter = {
    value:new THREE.Vector2(0,0)
  }
  shader.uniforms.uSpreadTime = {
    value:0
  }
  shader.uniforms.uSpreadWidth = {
    value:40
  }
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
    #include <common>
    uniform vec2 uSpreadCenter;
    uniform float uSpreadTime;
    uniform float uSpreadWidth;
  
    `
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    '// #end#',
    `
    // #end#
    float spreadRadius = distance(vPosition.xz,uSpreadCenter);
    // 扩展范围函数
    float spreadIndex = -(spreadRadius - uSpreadTime) * (spreadRadius - uSpreadTime) + uSpreadWidth;
    if(spreadIndex > 0.0) {
      gl_FragColor = mix(gl_FragColor,vec4(1,1,1,1),spreadIndex / uSpreadWidth);
    }
    // #end#
    `
  );

  gsap.to(shader.uniforms.uSpreadTime,{
    value:800,
    ease:'none',
    direction:2,
    repeat:-1,
  })  
}

export function addLineSpread(shader) {

  shader.uniforms.uLightLineTime = {
    value:800
  }
  shader.uniforms.uLightLineWidth = {
    value:10
  }
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
    #include <common>
    uniform float uLightLineTime;
    uniform float uLightLineWidth;
  
    `
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    '// #end#',
    `
    // #end#
    float lightLineMix = -(vPosition.x - uLightLineTime) * (vPosition.x - uLightLineTime) + uLightLineWidth;
    if(lightLineMix > 0.0) {
      gl_FragColor = mix(gl_FragColor,vec4(1,1,1,1), lightLineMix / uLightLineWidth);
    }
    // #end#
    `
    )
    gsap.to(shader.uniforms.uLightLineTime,{
      value:800,
      ease:'none',
      direction:10,
      repeat:-1,
    });
    console.log(shader.fragmentShader);

}