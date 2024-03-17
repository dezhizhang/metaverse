/*
 * :file description:
 * :name: /smart-city/src/mesh/city/flyLine.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-17 19:37:32
 * :last editor: 张德志
 * :date last edited: 2024-03-17 20:01:46
 */
import * as THREE from 'three';
import gsap from 'gsap';

class FlyLine {
  constructor() {
    this.points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(4, 4, 0),
      new THREE.Vector3(8, 0, 0),
    ];
    this.lineCurve = new THREE.CatmullRomCurve3(this.points);
    // 生成几何体
    this.geometry = new THREE.TubeGeometry(this.lineCurve, 100, 0.1, 2, false);
    const textureLoader = new THREE.TextureLoader();
    this.textureMap = textureLoader.load('/textures/z_11.png');
    // 设置
    this.textureMap.repeat.set(1, 2);
    this.textureMap.wrapS = THREE.RepeatWrapping;
    this.textureMap.wrapT = THREE.MirroredRepeatWrapping;

    this.material = new THREE.MeshBasicMaterial({
      color: 0xfff000,
      transparent: true,
      map: this.textureMap,
    });

    // 创建飞线物体
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    
    gsap.to(this.textureMap.offset, {
      x: 1,
      duration: 1,
      repeat: -1,
      ease: 'none',
    });
  }
}

export default FlyLine;
