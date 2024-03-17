/*
 * :file description:
 * :name: /smart-city/src/controls.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-17 11:35:14
 * :last editor: 张德志
 * :date last edited: 2024-03-17 11:43:39
 */
import camera from './camera';
import renderer from './renderer';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


const controls = new OrbitControls(camera,renderer.domElement);


export default controls;

