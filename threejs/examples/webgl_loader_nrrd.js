/*
 * :file description: 
 * :name: /threejs/examples/webgl_loader_nrrd.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-02-20 22:54:11
 * :last editor: 张德志
 * :date last edited: 2024-02-20 23:23:36
 */

import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { NRRDLoader } from 'three/addons/loaders/NRRDLoader.js';
import { VTKLoader } from 'three/addons/loaders/VTKLoader.js';

let stats,
  camera,
  controls,
  scene,
  renderer;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,0.01, 1e10);
    camera.position.z = 300;

    scene = new THREE.Scene();
    scene.add(camera);

    // light
    const hemiLight = new THREE.HemisphereLight(0xffffff,0x000000,3);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff,1.5);
    dirLight.position.set(200,200,200);
    scene.add(dirLight);
    
    const loader = new NRRDLoader();
    loader.load('https://threejs.org/examples/models/nrrd/I.nrrd',function(volume) {
        const geometry = new THREE.BoxGeometry(volume.xLength,volume.yLength,volume.zLength);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00
        });
        const cube = new THREE.Mesh(geometry,material);
        cube.visible = false;
        const box = new THREE.BoxHelper(cube);
        scene.add(box);
        box.applyMatrix4(volume.matrix);
        scene.add(cube);

        const sliceZ = volume.extractSlice('z',Math.floor(volume.RASDimensions[2] / 4));
        scene.add(sliceZ.mesh);

        const sliceY = volume.extractSlice('y',Math.floor(volume.RASDimensions[1] / 2));
        scene.add(sliceY.mesh);

        const sliceX = volume.extractSlice('x',Math.floor(volume.RASDimensions[0] / 2));
        scene.add(sliceX.mesh);
        
    });

    const vtkmaterial = new THREE.MeshLambertMaterial({
        wireframe:false,
        side:THREE.DoubleSide,
        color:0xff0000
    });

    const vtkloader = new VTKLoader();
    vtkloader.load('https://threejs.org/examples/models/vtk/liver.vtk',function(geometry) {
        geometry.computeVertexNormals();
        const mesh = new THREE.Mesh(geometry,vtkmaterial);
        scene.add(mesh);
    
    });

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    controls = new TrackballControls(camera,renderer.domElement);
    controls.minDistance = 100;
    controls.maxDistance = 500;
    controls.rotateSpeed = 5.0;
    controls.zoomSpeed = 5;
    controls.panSpeed = 2;

    window.addEventListener( 'resize', onWindowResize );
    
}



function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  controls.handleResize();

}

function animate() {

  requestAnimationFrame( animate );

//   controls.update();

  renderer.render( scene, camera );

  // stats.update();

}
