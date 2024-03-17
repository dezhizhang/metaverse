/*
 * :file description:
 * :name: /smart-city1/src/App.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-17 09:37:43
 * :last editor: 张德志
 * :date last edited: 2024-03-17 20:07:47
 */
import * as THREE from 'three';
import scene from './scene';
import renderer from './renderer';
import './controls';
import { resize } from './resize';
import { animate } from './animate';
import createMesh from './mesh';
import React, { useRef, useEffect } from 'react';


function App() {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    container.appendChild(renderer.domElement);
    createMesh();


    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    scene.add(new THREE.AmbientLight(0xffffff,3));

    // 初始化屏目变化
    resize();
    // 初始化动画
    animate();
  }, []);

  return <div ref={containerRef} />;
}

export default App;
