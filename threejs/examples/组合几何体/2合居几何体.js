/*
 * :file description: 
 * :name: /threejs/examples/组合几何体/2合居几何体.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-03 12:32:11
 * :last editor: 张德志
 * :date last edited: 2022-08-03 12:32:12
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

    this.redraw = function() {
        let toRemove = [];
        scene.traverse(function(e) {
            if(e instanceof THREE.Mesh) toRemove.push(e);
        })
        toRemove.forEach(function(e) {
            scene.remove(e);
        });

        if(controls.combined) {
            let geometry = new THREE.Geometry();
            for(let i=0;i < controls.numberOfObjects;i++) {
                let cubeMesh = addCube();
                cubeMesh.updateMatrix();
                geometry.merge(cubeMesh.geometry,cubeMesh.material);
            }
            scene.add(new THREE.Mesh(geometry,cubeMaterial))
        }else {
            for(let i=0;i < controls.numberOfObjects;i++) {
                scene.add(controls.addCube())
            }
        }
    }


    this.addCube = addCube;

    this.outputObjects = function () {
        console.log(scene.children);
    }
}

function addCube() {
    let cubeSize = 1.0;
    let cubeGeometry = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize);
    let cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.castShadow = true;

    cube.position.x = -60 + Math.round((Math.random() * 100));
    cube.position.y = Math.round((Math.random() * 10));
    cube.position.z = -150 + Math.round((Math.random() * 175));

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