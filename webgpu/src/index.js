/*
 * :file description: 
 * :name: /webgpu/src/index.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-06-27 05:54:49
 * :last editor: 张德志
 * :date last edited: 2023-07-11 07:39:25
 */


const canvas = document.createElement('canvas');
canvas.width = 500;
canvas.height = 500;
canvas.background = "#000000";

const gpu = canvas.getContext('webgpu');

async function run() {

    const adapter = await navigator.gpu.requestAdapter();

    const device = await adapter.requestDevice();
    const format = await navigator.gpu.getPreferredCanvasFormat();

    gpu.configure({
        device,
        format:format,
    });

    // 创建顶点数据
    const vertexArray = new Float32Array([
        0.0,0.0,0.0,
        1.0,0.0,0.0,
        0.0,1.0,0.0
    ]);

    console.log({device});
    
    const vertexBuffer = device.createBuffer({
        size:vertexArray.byteLength,
        usage:GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(vertexBuffer,0,vertexArray);

    const pipeline = device.createRenderPipeline({
        vertex:{
            buffers:[
                {
                    arrayStride:3 * 4,
                    attributres:[
                        {
                            shaderLocation:0,
                            offset:0
                        }
                    ]
                }
            ]
        }
    });

    console.log('pipeline',pipeline)

}

run();

document.body.appendChild(canvas);






