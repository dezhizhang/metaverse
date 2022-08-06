/*
 * :file description: 
 * :name: /webgl/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:12:55
 * :last editor: 张德志
 * :date last edited: 2022-08-06 09:20:20
 */

function init() {
    const canvas = document.getElementById('canvas');
    const webgl = canvas.getContext('webgl');
    webgl.viewport(0,0,canvas.clientWidth,canvas.clientHeight);
    webgl.clearColor(0,0,0,1)
    webgl.clear(webgl.COLOR_BUFFER_BIT)
}
init();
