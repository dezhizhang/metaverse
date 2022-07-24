/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-24 09:50:18
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';


// 创建场影
const scene = new THREE.Scene();

scene.overrideMaterial = new THREE.MeshDepthMaterial();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0x00000));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap = {
    enabled:true
}


// 设置相机的位置
camera.position.x = -50;
camera.position.y = 40;
camera.position.z = 50;
camera.lookAt(scene.position);



document.body.append(renderer.domElement);


let controls = new function() {
    this.cameraNear = camera.near;
    this.cameraFar = camera.far;
    this.rotationSpeed = 0.02;
    this.numberOfObjects = scene.children.length;

    this.removeCube = function() {
        let allChildren = scene.children;
        let lastObject = allChildren[allChildren.length - 1];
        if(lastObject instanceof THREE.Mesh) {
            scene.remove(lastObject);
            this.numberOfObjects = scene.children.length;
        }
    }

    this.addCube = function() {
        let cubeSize = Math.ceil(3 + (Math.random() *3));
        let cubeGeometry = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize);
        let cubeMaterial = new THREE.MeshLambertMaterial({color:Math.random() * 0xffffff});
        let cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
        cube.castShadow = true;
        
        // 设置位置
        cube.position.x = -60 + Math.random(Math.random() * 100);
        cube.position.y = Math.round((Math.random() * 10));
        cube.position.z = - 100 + Math.round((Math.random() *150));

        scene.add(cube);
        this.numberOfObjects = scene.children.length;
    }
}


const gui = new dat.GUI();
gui.add(controls,'rotationSpeed',0,0.5);
gui.add(controls,'addCube');
gui.add(controls,'removeCube');
gui.add(controls,'cameraNear',0,50).onChange(function(e) {
    camera.near = e;
});
gui.add(controls,'cameraFar',50,200).onChange(function(e){
    camera.far = e;
});

let i=0;
while(i < 10) {
    controls.addCube();
    i++;
}

function render() {
    scene.traverse(function (e) {
        if (e instanceof THREE.Mesh) {

            e.rotation.x += controls.rotationSpeed;
            e.rotation.y += controls.rotationSpeed;
            e.rotation.z += controls.rotationSpeed;
        }
    });
    requestAnimationFrame(render);
    
    renderer.render(scene,camera);
}

render();
