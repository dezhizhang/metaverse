/*
 * :file description:
 * :name: /smart-city/src/resize.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-17 11:47:09
 * :last editor: 张德志
 * :date last edited: 2024-03-17 11:48:33
 */
import camera from "./camera";
import renderer from "./renderer";

function resize() {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  });
}


export {
    resize 
}