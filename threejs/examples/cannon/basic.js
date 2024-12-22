/*
 * :file description: 
 * :name: /threejs/examples/cannon/basic.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-12-22 17:30:13
 * :last editor: 张德志
 * :date last edited: 2024-12-22 17:30:14
 */


import * as CANNON from 'cannon-es';

// 创建一个body对像表示生活中的物体
const sphere = new CANNON.Sphere(1);
const body = new CANNON.Body({
  mass:0.3,
  position:new CANNON.Vec3(0,100,0),
  shape: sphere
});

// 创建物理世界
const world = new CANNON.World();
world.gravity.set(0,-9.8,0);

world.addBody(body);


function render() {
  world.step(1/60);
  console.log(body.position.y);

  requestAnimationFrame(render);
}

render();










