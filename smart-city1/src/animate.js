/*
 * :file description:
 * :name: /smart-city/src/animate.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-17 11:52:03
 * :last editor: 张德志
 * :date last edited: 2024-03-17 11:53:35
 */

import scene from './scene';
import camera from './camera';
import renderer from './renderer';

function animate(t) {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

export { animate };
