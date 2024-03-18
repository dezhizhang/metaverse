/*
 * :file description:
 * :name: /smart-park/src/App.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-19 04:38:30
 * :last editor: 张德志
 * :date last edited: 2024-03-19 05:29:38
 */
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import React, { useEffect, useRef } from 'react';
function App() {
  const containerRef = useRef();

  useEffect(() => {
    const clock = new THREE.Clock();
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000,
    );
    camera.position.set(1000, 1000, 1000);

    const renderer = new THREE.WebGL1Renderer({
      antialias: true,
      logarithmicDepthBuffer: true,
      physicallCorrectLights: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;

    container.appendChild(renderer.domElement);

    // 加载环境贴图
    const hdrLoader = new RGBELoader();
    hdrLoader.load('/textures/023.hdr', (envMap) => {
      scene.background = envMap;
      scene.environment = envMap;
      scene.environment.mapping = THREE.EquirectangularReflectionMapping;
    });

    // 设置环境贴图
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(directionalLight);

    const controls = new OrbitControls(camera, renderer.domElement);

    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    gltfLoader.setDRACOLoader(dracoLoader);

    let mixer = null;

    gltfLoader.load('/model/city3.glb', (gltf) => {
      scene.add(gltf.scene);

      gltf.scene.traverse((child) => {
        if(child.name === '热气球') {
          mixer = new THREE.AnimationAction(child);
          const clip = gltf.antialias[0];
          const action = mixer.clipAction(clip);
          action.play();
          
          console.log(child);
        }
      })
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    });

    function animate() {
      requestAnimationFrame(animate);
      if(mixer) {
        mixer.update(clock.getDelta());
      }
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return <div ref={containerRef} />;
}

export default App;
