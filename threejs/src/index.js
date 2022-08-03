/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-03 08:24:24
 */
import * as THREE from 'three';
import * as dat from 'dat.gui';


let step = 0;
let rotation = 0;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x00000));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMapEnabled = true;

camera.position.x = 0;
camera.position.y = 40;
camera.position.z = 50;
camera.lookAt(scene.position);

let cubeMaterial = new THREE.MeshNormalMaterial({color: 0x00ff00, transparent: true, opacity: 0.5});

let controls = new function() {
    this.cameraNear = camera.near;
    this.cameraFar = camera.far;
    this.rotationSpeed = 0.02;
    this.combined = false;
    
    this.numberOfObjects = 500;

    this.redraw = function () {
        var toRemove = [];
        scene.traverse(function (e) {
            if (e instanceof THREE.Mesh) toRemove.push(e);
        });
        toRemove.forEach(function (e) {
            scene.remove(e)
        });

        // add a large number of cubes
        if (controls.combined) {
            var geometry = new THREE.Geometry();
            for (var i = 0; i < controls.numberOfObjects; i++) {
                var cubeMesh = addcube();
                cubeMesh.updateMatrix();
                geometry.merge(cubeMesh.geometry, cubeMesh.matrix);
            }
            scene.add(new THREE.Mesh(geometry, cubeMaterial));

        } else {
            for (var i = 0; i < controls.numberOfObjects; i++) {
                scene.add(controls.addCube());
            }
        }
    };


    this.addCube = addcube;

    this.outputObjects = function () {
        console.log(scene.children);
    }
}

function addcube() {

    var cubeSize = 1.0;
    var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    // position the cube randomly in the scene
    cube.position.x = -60 + Math.round((Math.random() * 100));
    cube.position.y = Math.round((Math.random() * 10));
    cube.position.z = -150 + Math.round((Math.random() * 175));

    // add the cube to the scene
    return cube;
}

document.body.append(renderer.domElement);


function render() {
    rotation +=  0.005;
    camera.position.x = Math.sin(rotation) * 50;
    camera.position.z = Math.sin(rotation) * 40;
    camera.lookAt(scene.position);

    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();
controls.redraw();