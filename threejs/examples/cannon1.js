/*
 * :file description: 
 * :name: /threejs/examples/cannon1.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 11:02:58
 * :last editor: 张德志
 * :date last edited: 2024-03-31 11:02:59
 */
import * as CANNON from 'cannon-es';

// 创建物理世界
const world = new CANNON.World();
world.gravity.set(0,-9.8,0);

const sphereBody = new CANNON.Body({
  mass:5,
  shape:new CANNON.Sphere(1)
});
sphereBody.position.set(0,10,0);
world.addBody(sphereBody);

function render() {
  world.step(1 / 60);
  console.log(sphereBody.position)
  requestAnimationFrame(render);
}

render();

