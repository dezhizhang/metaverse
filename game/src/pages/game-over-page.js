/*
 * :file description:
 * :name: /game/src/pages/game-over-page.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-11-13 20:00:40
 * :last editor: 张德志
 * :date last edited: 2023-09-24 10:33:40
 */

import * as THREE from '../../libs/three';

class GameOverPage {
  constructor(callbacks) {
    this.callbacks = callbacks;
  }
  init(scene) {
    this.initGameOverCanvas(scene);
  };

  initGameOverCanvas(options) {
    this.scene = options.scene;
    const aspect = window.innerWidth / window.innerHeight;
    this.canvas = document.createElement('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.texture = new THREE.Texture(this.canvas);
    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      side:THREE.DoubleSide
    });

    this.geometry = new THREE.PlaneGeometry(
      window.innerWidth,
      window.innerHeight,
    );
    this.obj = new THREE.Mesh(this.geometry, this.material);
    this.obj.position.z = 1;
    this.obj.rotation.y = Math.PI;
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = '#333';
    this.context.fillRect(
      (window.innerWidth - 200) / 2,
      (window.innerHeight - 100) / 2,
      200,
      100,
    );


    this.context.fillStyle = '#eee';
    this.context.font = '20px 微软雅黑';
    this.context.fillText('Game Over', (window.innerWidth - 200) / 2 + 50, (window.innerHeight - 100) / 2 + 50);
    this.texture.needsUpdate = true;
    
    this.scene.add(this.obj);
  }

  show() {
    console.log('game over page show');
  }
}

export default GameOverPage;
