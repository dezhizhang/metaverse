/*
 * :file description: 
 * :name: /things/src/controls/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-31 16:55:00
 * :last editor: 张德志
 * :date last edited: 2024-03-31 17:22:48
 */
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import camera from '../camera';
import renderer from '../renderer';

const controls = new OrbitControls(camera,renderer.domElement);

export default controls;