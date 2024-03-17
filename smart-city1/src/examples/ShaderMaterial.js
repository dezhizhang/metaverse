/*
 * :file description:
 * :name: /smart-city/src/page/Home/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-17 09:37:43
 * :last editor: 张德志
 * :date last edited: 2024-03-17 10:15:34
 */
import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import vertexShader from '../../shader/vertexShader.glsl';
import fragmentShader from '../../shader/fragmentShader.glsl';
import './index.css';

function Home() {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
    });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    });

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="home" />;
}

export default Home;
