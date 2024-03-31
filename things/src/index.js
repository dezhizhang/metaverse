/*
 * :file description:
 * :name: /things/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-24 20:16:05
 * :last editor: 张德志
 * :date last edited: 2024-03-31 17:23:27
 */
import { lightGroup } from './light';
import scene from './scene';
import renderer from './renderer';
import controls from './controls';


scene.add(lightGroup);

controls.update();


document.body.appendChild(renderer.domElement);





