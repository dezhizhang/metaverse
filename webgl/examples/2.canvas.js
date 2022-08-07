/*
 * :file description: 
 * :name: /webgl/examples/2.canvas.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-08-06 21:03:29
 * :last editor: 张德志
 * :date last edited: 2022-08-06 21:03:29
 */
function main() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle='rgba(0,0,255,1.0)';
    ctx.fillRect(120,10,150,150);
}

main();