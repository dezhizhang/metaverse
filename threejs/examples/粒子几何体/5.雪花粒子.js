/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-01 07:09:03
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';
import snowflake1 from '../assets/textures/particles/snowflake1.png'
import snowflake2 from '../assets/textures/particles/snowflake2.png'
import snowflake3 from '../assets/textures/particles/snowflake3.png'
import snowflake5 from '../assets/textures/particles/snowflake5.png'

// 创建场景
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x000000));
renderer.setSize(window.innerWidth,window.innerHeight);

// 设置相机的位置
camera.position.x = 20;
camera.position.y = 40;
camera.position.z = 110;
camera.lookAt(new THREE.Vector3(20,30,0));

document.body.append(renderer.domElement);

function createPointCloud(name, texture, size, transparent, opacity, sizeAttenuation, color) {
    var geom = new THREE.Geometry();

    var color = new THREE.Color(color);
    color.setHSL(color.getHSL().h,
            color.getHSL().s,
            (Math.random()) * color.getHSL().l);

    var material = new THREE.PointCloudMaterial({
        size: size,
        transparent: transparent,
        opacity: opacity,
        map: texture,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: sizeAttenuation,
        color: color
    });

    var range = 40;
    for (var i = 0; i < 50; i++) {
        var particle = new THREE.Vector3(
                Math.random() * range - range / 2,
                Math.random() * range * 1.5,
                Math.random() * range - range / 2);
        particle.velocityY = 0.1 + Math.random() / 5;
        particle.velocityX = (Math.random() - 0.5) / 3;
        particle.velocityZ = (Math.random() - 0.5) / 3;
        geom.vertices.push(particle);
    }

    var system = new THREE.PointCloud(geom, material);
    system.name = name;
    system.sortParticles = true;
    return system;
}

function createPointClouds(size, transparent, opacity, sizeAttenuation, color) {

    var texture1 = THREE.ImageUtils.loadTexture(snowflake1);
    var texture2 = THREE.ImageUtils.loadTexture(snowflake2);
    var texture3 = THREE.ImageUtils.loadTexture(snowflake3);
    var texture4 = THREE.ImageUtils.loadTexture(snowflake5);

    scene.add(createPointCloud("system1", texture1, size, transparent, opacity, sizeAttenuation, color));
    scene.add(createPointCloud("system2", texture2, size, transparent, opacity, sizeAttenuation, color));
    scene.add(createPointCloud("system3", texture3, size, transparent, opacity, sizeAttenuation, color));
    scene.add(createPointCloud("system4", texture4, size, transparent, opacity, sizeAttenuation, color));
}


let controls = new function() {
    this.size = 10;
    this.transparent = true;
    this.opacity = 0.6;
    this.color = 0xffffff;
    this.sizeAttenuation = true;
    
    this.redraw = function() {
        let toRemove = [];
        scene.children.forEach(function(child){
            if(child instanceof THREE.PointCloud) {
                toRemove.push(child);
            }
        });
        toRemove.forEach(function(child){
            scene.remove(child);
        });
        createPointClouds(controls.size, controls.transparent, controls.opacity, controls.sizeAttenuation, controls.color);
    }
}

let gui = new dat.GUI();
gui.add(controls,'size',0,20).onChange(controls.redraw);
gui.add(controls,'transparent').onChange(controls.redraw);
gui.add(controls,'opacity',0,1).onChange(controls.redraw);
gui.add(controls,'color').onChange(controls.redraw);
gui.add(controls,'sizeAttenuation').onChange(controls.redraw);

controls.redraw();






function render() {
    scene.children.forEach((child) => {
        if(child instanceof THREE.PointCloud) {
            let vertices = child.geometry.vertices;
            vertices.forEach(function(v) {
                v.y = v.y - (v.velocityY);
                v.x = v.x - (v.velocityX);
                v.z = v.z - (v.velocityZ);

                if (v.y <= 0) v.y = 60;
                if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
                if (v.z <= -20 || v.z >= 20) v.velocityZ = v.velocityZ * -1;
            })
        }
    })
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();




