/*
 * :file description: 
 * :name: /webgpu/examples/2.配置webgpu配置.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-06-27 06:14:56
 * :last editor: 张德志
 * :date last edited: 2023-06-27 06:15:12
 */
const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;

const gpu = canvas.getContext('webgpu');

async function run() {

    const adapter = await navigator.gpu.requestAdapter();

    const device = await adapter.requestDevice();
    const format = await navigator.gpu.getPreferredCanvasFormat();

    gpu.configure({
        device,
        format:format,
    })

    console.log(device);

}

run();

document.body.appendChild(canvas);