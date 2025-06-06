/*
 * :file description: 
 * :name: /threejs/examples/129自定义合期合成.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-06-10 11:33:48
 * :last editor: 张德志
 * :date last edited: 2023-06-10 11:38:33
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';

import Stats from 'stats.js';
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

let container, stats;
let camera, scene, renderer;
let composer;
let group;

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(65,window.innerWidth / window.innerHeight,0.1,1000);
    camera.position.z = 500;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaaaa);

    scene.add(new THREE.DirectionalLight());
    scene.add(new THREE.HemisphereLight());

    group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.BoxGeometry(10,10,10);
    
    for(let i=0;i < 100;i++) {
        const material = new THREE.MeshLambertMaterial({
            color:Math.random() * 0xffffff
        });

        const mesh = new THREE.Mesh(geometry,material);
        mesh.position.x = Math.random() * 400 - 200;
        mesh.position.y = Math.random() * 400 - 200;
        mesh.position.z = Math.random() * 400 - 200;

        mesh.rotation.x = Math.random();
        mesh.rotation.y = Math.random();
        mesh.rotation.z = Math.random();

        mesh.scale.setScalar(Math.random() * 10 + 2);
        group.add(mesh);

    }

    stats = new Stats();
    container.appendChild(stats.dom);

    const width = window.innerWidth;
    const height = window.innerHeight;

    composer = new EffectComposer(renderer);
    const ssaoPass = new SSAOPass(scene,camera,width,height);
    ssaoPass.kernelRadius = 16;
    composer.addPass(ssaoPass);

    const outputPass = new ShaderPass(GammaCorrectionShader);
    composer.addPass(outputPass);

    // Init gui
    const gui = new dat.GUI();

    gui.add(ssaoPass, 'output', {
        'Default': SSAOPass.OUTPUT.Default,
        'SSAO Only': SSAOPass.OUTPUT.SSAO,
        'SSAO Only + Blur': SSAOPass.OUTPUT.Blur,
        'Beauty': SSAOPass.OUTPUT.Beauty,
        'Depth': SSAOPass.OUTPUT.Depth,
        'Normal': SSAOPass.OUTPUT.Normal
    }).onChange(function (value) {

        ssaoPass.output = parseInt(value);

    });
    gui.add(ssaoPass, 'kernelRadius').min(0).max(32);
    gui.add(ssaoPass, 'minDistance').min(0.001).max(0.02);
    gui.add(ssaoPass, 'maxDistance').min(0.01).max(0.3);

    // 差色器写渲染通道
    const shaderPass = new ShaderPass({
        uniforms:{
            tDiffuse:{
                value:null,
            },
            uColor:{
                value:new THREE.Color(1.0,0.0,0.0)
            }
        },
        vertexShader:`
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
            }
        `,
        fragmentShader:`
            varying vec2 vUv;
            uniform sampler2D tDiffuse;
            uniform vec3 uColor;
            void main() {
                vec4 color = texture2D(tDiffuse,vUv);
                // gl_FragColor =vec4(vUv,0.0,1.0);
                color.xyz += uColor;
                gl_FragColor = color;
            }
        `

    });
    composer.addPass(shaderPass);


    window.addEventListener('resize', onWindowResize);

}


function onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    composer.setSize(width, height);

}

function animate() {

    requestAnimationFrame(animate);

    stats.begin();
    render();
    stats.end();

}

function render() {

    const timer = performance.now();
    group.rotation.x = timer * 0.0002;
    group.rotation.y = timer * 0.0001;

    composer.render();

}