/*
 * :file description:
 * :name: /metaverse-game/src/main.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-13 16:11:31
 * :last editor: 张德志
 * :date last edited: 2022-11-13 19:05:40
 */
import '../js/libs/weapp-adapter';
import * as THREE from '../js/libs/three';

class Mian {
  constructor() {
    this.width = 400;
    this.height = 400;
  }
  init() {
    const renderer = new THREE.WebGL1Renderer({
      canvas: canvas,
    });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -this.width / 2,
      this.width / 2,
      this.height / 2,
      -this.height / 2,
      -1000,
      1000,
    );

    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(this.width, this.height);

    const triangulateShape = new THREE.Shape();
    triangulateShape.moveTo(0, 100);
    triangulateShape.lineTo(-100, -100);
    triangulateShape.lineTo(100, -100);
    triangulateShape.lineTo(0, 100);

    const geometry = new THREE.ShapeGeometry(triangulateShape);

    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      side: THREE.DoubleSide,
    });

    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 0;
    mesh.position.y = 0;
    mesh.position.z = 0;

    scene.add(mesh);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 0;

    camera.lookAt(new THREE.Vector3(0, 0, 1));

    let currentAngle = 0;
    let lastTimestamp = Date.now();

    let animate = function () {
      let now = Date.now();
      let duration = now - lastTimestamp;
      lastTimestamp = now;
      currentAngle = currentAngle + duration / 1000;
    };

    let render = function () {
      animate();
      mesh.rotation.set(0, 0, currentAngle);
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    render();
  }
}

export default new Mian();

