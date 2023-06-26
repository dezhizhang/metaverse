/*
 * :file description: 
 * :name: /webgpu/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-06-27 05:54:49
 * :last editor: 张德志
 * :date last edited: 2023-06-27 06:05:03
 */


async function run() {

    const adapter = await navigator.gpu.requestAdapter();

    const device = await adapter.requestDevice();

    console.log(device);

}

run();





