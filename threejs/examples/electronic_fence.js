/*
 * :file description: 电子围栏
 * :name: /threejs/examples/electronic_fence.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-09 17:09:32
 * :last editor: 张德志
 * :date last edited: 2025-02-09 17:09:33
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
let scene, camera, renderer, fence;

// 围栏尺寸配置
const config = {
    width: 100,   // 考场宽度
    height: 80,   // 考场高度
    depth: 100      // 围栏高度
};

function init() {
    // // 初始化场景

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
    renderer = new THREE.WebGLRenderer({
        antialias:true
    });
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(120, 80, 120);
    camera.lookAt(0, 0, 0);

    // 添加地面
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(200,200),
        new THREE.MeshBasicMaterial({
            color:0x228B22
        }),
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    createElectricFence();

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera,renderer.domElement);

    animate();
    
}

function createElectricFence() {

    const geometry = new THREE.BoxGeometry(
        config.width,
        config.depth,
        config.height
    );

    const material = new THREE.ShaderMaterial({
        uniforms:{
            time:{value: 0 },
            glowColor: { value: new THREE.Color(0x00ff00) }
        },
        vertexShader:`
           varying vec3 vPosition;
                    varying vec2 vUv;

                    void main() {
                        vPosition = position;
                        vUv = uv;
                        gl_Position = projectionMatrix * modelMatrix * viewMatrix * vec4(position, 1.0);
                    }
        `,
        fragmentShader:`
           uniform float time;
                    uniform vec3 glowColor;
                    varying vec3 vPosition;
                    varying vec2 vUv;

                    void main() {
                        // 流动光效
                        float glow = sin(vPosition.x * 0.5 + time * 2.0) * 0.5 + 0.5;
                        glow += sin(vPosition.z * 0.3 + time * 3.0) * 0.5;
                        
                        // 边界警示效果
                        float edge = step(0.95, vUv.y) + step(0.95, 1.0 - vUv.y);
                        edge += step(0.95, vUv.x) + step(0.95, 1.0 - vUv.x);
                        
                        vec3 finalColor = glowColor * glow * 0.8;
                        finalColor += vec3(1.0, 0.2, 0.2) * edge * 0.6;
                        
                        gl_FragColor = vec4(finalColor, 0.8 - edge * 0.5);
                    }
           
        `,
        transparent: true,
        side: THREE.DoubleSide

    })



    // const geometry = new THREE.BoxGeometry(
    //     config.width, 
    //     config.depth, 
    //     config.height
    // );

    // // 自定义Shader材质
    // const material = new THREE.ShaderMaterial({
    //     uniforms: {
    //         time: { value: 0 },
    //         glowColor: { value: new THREE.Color(0x00ff00) }
    //     },
    //     vertexShader: `
    
    //     `,
    //     fragmentShader: `
          
    //     `,
    //     transparent: true,
    //     side: THREE.DoubleSide
    // });

    fence = new THREE.Mesh(geometry, material);
    scene.add(fence);
}



function animate() {
    requestAnimationFrame(animate);
    
    // 更新Shader时间变量
    // if (fence) {
    //     fence.material.uniforms.time.value = performance.now() / 1000;
    // }

    renderer.render(scene, camera);
}

// 窗口尺寸变化处理
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();