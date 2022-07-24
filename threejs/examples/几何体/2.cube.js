/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-07-24 20:33:26
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';

let step = 0;
//创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap = {
    enabled:true
}

const cube = createMesh(new THREE.BoxGeometry(10,10,10,1,1,1));
scene.add(cube);

// 设置相机位置
camera.position.x = - 20;
camera.position.y = 30;
camera.position.z = 40;
camera.lookAt(new THREE.Vector3(10,0,0));

//  添加类光
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,-10);
scene.add(spotLight);


document.body.append(renderer.domElement);


var controls = new function () {

    this.width = cube.children[0].geometry.parameters.width;
    this.height = cube.children[0].geometry.parameters.height;
    this.depth = cube.children[0].geometry.parameters.depth;

    this.widthSegments = cube.children[0].geometry.parameters.widthSegments;
    this.heightSegments = cube.children[0].geometry.parameters.heightSegments;
    this.depthSegments = cube.children[0].geometry.parameters.depthSegments;


    this.redraw = function () {
        // remove the old plane
        scene.remove(cube);
        // create a new one
        cube = createMesh(new THREE.BoxGeometry(this.width, this.height, this.depth, Math.round(this.widthSegments), Math.round(this.heightSegments), Math.round(this.depthSegments)));
        // add it to the scene.
        scene.add(cube);
    };
};


var gui = new dat.GUI();
gui.add(controls, 'width', 0, 40).onChange(controls.redraw);
gui.add(controls, 'height', 0, 40).onChange(controls.redraw);
gui.add(controls, 'depth', 0, 40).onChange(controls.redraw);
gui.add(controls, 'widthSegments', 0, 10).onChange(controls.redraw);
gui.add(controls, 'heightSegments', 0, 10).onChange(controls.redraw);
gui.add(controls, 'depthSegments', 0, 10).onChange(controls.redraw);

function createMesh(geom) {

    const meshMaterial = new THREE.MeshLambertMaterial();
    meshMaterial.side = THREE.DoubleSide;
    const wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    const mesh = SceneUtils.createMultiMaterialObject(geom,[meshMaterial,wireFrameMat]);
    return mesh;
}



function render() {
    cube.rotation.y = step += 0.01;
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();




