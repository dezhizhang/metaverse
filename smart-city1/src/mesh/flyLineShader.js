/*
 * :file description:
 * :name: /smart-city1/src/mesh/flyLineShader.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-17 20:10:22
 * :last editor: 张德志
 * :date last edited: 2024-03-17 20:20:43
 */
import * as THREE from 'three';
import vertexShader from '../shader/vertexShader.glsl';
import fragmentShader from '../shader/fragmentShader.glsl';

class FlyLineShader {
  constructor() {
    this.linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-5, 4, 0),
      new THREE.Vector3(-10, 0, 0),
    ];

    this.lineCurve = new THREE.CatmullRomCurve3(this.linePoints);

    const points = this.lineCurve.getPoints(1000);

    this.geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
    });

    this.mesh = new THREE.Points(this.geometry,this.material);
    
  }
}

export default FlyLineShader;
