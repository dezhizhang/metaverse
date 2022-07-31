/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-31 20:06:19
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';

let cloud;
let step = 0;
// 创建场影
const scene = new THREE.Scene();
// 创建相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

//创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x000000, 1.0));
renderer.setSize(window.innerWidth, window.innerHeight);

// 设置相像的位置
camera.position.x = 20;
camera.position.y = 0;
camera.position.z = 150;


document.body.append(renderer.domElement);



function createParticles(size, transparent, opacity, vertexColors, sizeAttenuation, color) {
    let geom = new THREE.Geometry();
    let material = new THREE.PointCloudMaterial({
        size,
        transparent,
        opacity,
        vertexColors,
        sizeAttenuation,
        color,
    });
    let range = 500;
    for (let i = 0; i < 1500; i++) {
        let particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
        geom.vertices.push(particle);
        let color = new THREE.Color(0x00ff00);
        color.setHSL(color.getHSL().h, color.getHSL().s, Math.random() * color.getHSL().l);
        geom.colors.push(color);
    }
    cloud = new THREE.PointCloud(geom, material);
    cloud.name = "particles";
    scene.add(cloud);
}

const controls = new function () {
    this.size = 4;
    this.transparent = true;
    this.opacity = 0.6;
    this.vertexColors = true;
    this.color = 0xffffff;
    this.sizeAttenuation = true;
    this.rotateSystem = true;

    this.redraw = function () {
        if (scene.getObjectByName('particles')) {
            scene.remove(scene.getObjectByName('particles'));
        }
        createParticles(controls.size, controls.transparent, controls.opacity, controls.vertexColors, controls.sizeAttenuation, controls.color);
    }
}

var gui = new dat.GUI();
gui.add(controls, 'size', 0, 10).onChange(controls.redraw);
gui.add(controls, 'transparent').onChange(controls.redraw);
gui.add(controls, 'opacity', 0, 1).onChange(controls.redraw);
gui.add(controls, 'vertexColors').onChange(controls.redraw);
gui.addColor(controls, 'color').onChange(controls.redraw);
gui.add(controls, 'sizeAttenuation').onChange(controls.redraw);
gui.add(controls, 'rotateSystem');

controls.redraw();

function render() {
    if (controls.rotateSystem) {
        step += 0.01;
        cloud.rotation.x = step;
        cloud.rotation.y = step;
    }
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();


