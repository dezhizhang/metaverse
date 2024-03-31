/*
 * :file description:
 * :name: /things/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-24 20:16:05
 * :last editor: 张德志
 * :date last edited: 2024-03-31 17:13:09
 */
import { lightGroup } from './light';
import scene from './scene';
import camera from './camera';
import renderer from './renderer';


scene.add(lightGroup);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene,camera)
}

render();





