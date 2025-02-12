/*
 * :file description: 
 * :name: /threejs/examples/svg_lines2.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-02-11 07:27:49
 * :last editor: 张德志
 * :date last edited: 2025-02-11 07:27:50
 */
import * as THREE from "three";
import { SVGRenderer } from "three/examples/jsm/renderers/SVGRenderer.js";

THREE.ColorManagement.enabled = false;

let camera, scene, renderer;
init();
onWindowResize();



function init() {
  camera = new THREE.PerspectiveCamera(
    33,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 10;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0, 0, 0);

  renderer = new SVGRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const vertices = [];
  const divisions = 50;

  for (let i = 0; i <= divisions; i++) {
    const v = (i / divisions) * (Math.PI * 2);
    const x = Math.sin( v );
    const z = Math.cos( v );

    vertices.push(x, 0, z);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  for (let i = 1; i <= 3; i++) {
    const material = new THREE.LineBasicMaterial({
      color: Math.random() * 0xffffff,
      linewidth: 10,
    });
    const line = new THREE.Line(geometry, material);
    line.scale.setScalar(i / 3);
    scene.add(line);
  }

  const material = new THREE.LineDashedMaterial({
    color: "blue",
    linewidth: 1,
    dashSize: 10,
    gapSize: 10,
  });
  const line = new THREE.Line(geometry, material);
  line.scale.setScalar(2);
  scene.add(line);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  let count = 0;
  const time = performance.now() / 1000;

  scene.traverse(function (child) {
    child.rotation.x = count + time / 3;
    child.rotation.z = count + time / 4;

    count++;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

