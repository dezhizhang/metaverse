/*
 * :file description:
 * :name: /showings/src/App.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-14 22:25:31
 * :last editor: 张德志
 * :date last edited: 2024-03-15 05:41:09
 */
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



function App() {

  function init() {
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xff00ff);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0,0,0);
    scene.add(camera);

  
    const boxGeometry = new THREE.BoxGeometry(10,10,10);
  
    boxGeometry.scale(1,1,-1);
    const textureLoader = new THREE.TextureLoader();

    const textureUrl = ' https://tugua.oss-cn-hangzhou.aliyuncs.com/'

    const textureIndex = 0;

    const textureArr = [
      `${textureIndex}_l`,
      `${textureIndex}_r`,
      `${textureIndex}_u`,
      `${textureIndex}_d`,
      `${textureIndex}_b`,
      `${textureIndex}_f`,
    ];

    const boxMaterial = [];


     textureArr.forEach((item) => {
      const texture = textureLoader.load(textureUrl + item + '.jpg');
      console.log('texture',texture);

      boxMaterial.push(new THREE.MeshBasicMaterial({
        map:texture
      }))
    
     });

     const box = new THREE.Mesh(boxGeometry,boxMaterial)
     scene.add(box);









    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const controls = new OrbitControls(camera, renderer.domElement);


    document.getElementById('container').appendChild(renderer.domElement)

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    function render() {
      controls.update();

      requestAnimationFrame(render);
      renderer.render(scene,camera);
    }

    window.addEventListener('resize',() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth,window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    })

    render();
  }


  useEffect(() => {
    init();
  }, []);

  return <div id='container'/>;
}

export default App;
