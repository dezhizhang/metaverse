/*
 * :file description: 
 * :name: /threejs/examples/组合几何体/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-03 08:13:21
 * :last editor: 张德志
 * :date last edited: 2022-08-03 08:13:21
 */
/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-03 08:12:50
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';

let step = 0;
let sphere;
let cube;
let group;
let bboxMesh;



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMapEnabled = true;

// 设置相机的位置
camera.position.x = 30;
camera.position.y = 30;
camera.position.z = 30;
camera.lookAt(new THREE.Vector3(0,0,0));


// 创建组
let ground = new THREE.PlaneGeometry(100,100,50,50);
function createMultiMaterialObject(geometry,materials) {
    let group = new THREE.Object3D();
    for(let i=0; i <  materials.length;i++) {
        group.add(new THREE.Mesh(geometry,materials[i]))
    }
    return group;
}

let material1 = new THREE.MeshBasicMaterial({wireframe: true, overdraw: true, color: 0x000000});
let material2 =  new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.5})
let groundMesh = createMultiMaterialObject(ground,[material1,material2]);
groundMesh.rotation.x = -0.5 * Math.PI;
scene.add(groundMesh);


function createMesh(geom) {
    let meshMaterial = new THREE.MeshNormalMaterial();
    meshMaterial.side = THREE.DoubleSide;
    let wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    let plane  = createMultiMaterialObject(geom,[meshMaterial,wireFrameMat]);
    return plane;
}


let controls = new function() {
    this.cubePosX = 0;
    this.cubePosY = 3;
    this.cubePosZ = 10;

    this.spherePosX = 10;
    this.spherePosY = 5;
    this.spherePosZ = 0;

    this.groupPosX = 10;
    this.groupPosY = 5;
    this.groupPosZ = 0;

    this.grouping = false;
    this.rotate = false;
    
    this.groupScale = 1;
    this.cubeScale = 1;
    this.sphereScale = 1;

    this.redraw = function() {
        scene.remove(group);
        sphere = createMesh(new THREE.SphereGeometry(5,10,10));
        cube = createMesh(new THREE.BoxGeometry(6,6,6));

        sphere.position.set(controls.spherePosX,controls.spherePosY,controls.cubePosZ);
        cube.position.set(controls.cubePosX,controls.cubePosY,controls.cubePosZ);

        group = new THREE.Group();
        group.add(sphere);
        group.add(cube);
        
        scene.add(group);
        controls.positionBoundingBox();

        // 创建箭头
        let arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), group.position, 10, 0x0000ff);
        scene.add(arrow);

    }

    function setFromObject(object) {
        var box = new THREE.Box3();
        var v1 = new THREE.Vector3();
        object.updateMatrixWorld(true);
        box.makeEmpty();
        object.traverse(function (node) {
            if (node.geometry !== undefined && node.geometry.vertices !== undefined) {
                var vertices = node.geometry.vertices;
                for (var i = 0, il = vertices.length; i < il; i++) {
                    v1.copy(vertices[i]);
                    v1.applyMatrix4(node.matrixWorld);
                    box.expandByPoint(v1);
                }
            }
        });
        return box;
    }

    this.positionBoundingBox = function() {
        scene.remove(bboxMesh);

        let box  = setFromObject(group);
        let width = box.max.x - box.min.x;
        let height = box.max.y - box.min.y;
        let depth = box.max.z - box.min.z;

        var bbox = new THREE.BoxGeometry(width, height, depth);
        bboxMesh = new THREE.Mesh(bbox, new THREE.MeshBasicMaterial({
            color: 0x000000,
            vertexColors: THREE.VertexColors,
            wireframeLinewidth: 2,
            wireframe: true
        }));
        scene.add(bboxMesh);

        bboxMesh.position.x = ((box.min.x + box.max.x) / 2);
        bboxMesh.position.y = ((box.min.y + box.max.y) / 2);
        bboxMesh.position.z = ((box.min.z + box.max.z) / 2);

    }

}

    var gui = new dat.GUI();
    var sphereFolder = gui.addFolder("sphere");
    sphereFolder.add(controls, "spherePosX", -20, 20).onChange(function (e) {
        sphere.position.x = e;
        controls.positionBoundingBox()
    });
    sphereFolder.add(controls, "spherePosZ", -20, 20).onChange(function (e) {
        sphere.position.z = e;
        controls.positionBoundingBox()
    });
    sphereFolder.add(controls, "spherePosY", -20, 20).onChange(function (e) {
        sphere.position.y = e;
        controls.positionBoundingBox()
    });
    sphereFolder.add(controls, "sphereScale", 0, 3).onChange(function (e) {
        sphere.scale.set(e, e, e);
        controls.positionBoundingBox()
    });

    var cubeFolder = gui.addFolder("cube");
    cubeFolder.add(controls, "cubePosX", -20, 20).onChange(function (e) {
        cube.position.x = e;
        controls.positionBoundingBox()
    });
    cubeFolder.add(controls, "cubePosZ", -20, 20).onChange(function (e) {
        cube.position.z = e;
        controls.positionBoundingBox()
    });
    cubeFolder.add(controls, "cubePosY", -20, 20).onChange(function (e) {
        cube.position.y = e;
        controls.positionBoundingBox()
    });
    cubeFolder.add(controls, "cubeScale", 0, 3).onChange(function (e) {
        cube.scale.set(e, e, e);
        controls.positionBoundingBox()
    });

    var cubeFolder = gui.addFolder("group");
    cubeFolder.add(controls, "groupPosX", -20, 20).onChange(function (e) {
        group.position.x = e;
        controls.positionBoundingBox()
    });
    cubeFolder.add(controls, "groupPosZ", -20, 20).onChange(function (e) {
        group.position.z = e;
        controls.positionBoundingBox()
    });
    cubeFolder.add(controls, "groupPosY", -20, 20).onChange(function (e) {
        group.position.y = e;
        controls.positionBoundingBox()
    });
    cubeFolder.add(controls, "groupScale", 0, 3).onChange(function (e) {
        group.scale.set(e, e, e);
        controls.positionBoundingBox()
    });

    gui.add(controls, "grouping");
    gui.add(controls, "rotate");


controls.redraw();


document.body.append(renderer.domElement);

function render() {

    if (controls.grouping && controls.rotate) {
        group.rotation.y += step;
    }

    if (controls.rotate && !controls.grouping) {
        sphere.rotation.y += step;
        cube.rotation.y += step;
    }
    requestAnimationFrame(render);
    renderer.render(scene,camera)
}

render();
