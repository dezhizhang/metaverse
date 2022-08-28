/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-13 21:36:57
 * :last editor: 张德志
 * :date last edited: 2022-08-28 16:32:21
 */
import * as THREE from 'three';

const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

document.body.appendChild(canvas);

const gl = canvas.getContext('webgl');

const color = new THREE.Color(`rgba(255,0,0,1)`);

gl.clearColor(color.r,color.g,color.b,1);
gl.clear(gl.COLOR_BUFFER_BIT);




