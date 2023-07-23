/*
 * :file description: 
 * :name: /webgpu/src/main.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-13 05:31:18
 * :last editor: 张德志
 * :date last edited: 2023-07-23 15:59:40
 */
import './style.css';

import vertx from './shader/triangle.vert.wgsl?raw'
import frag from './shader/fragment.frag.wgsl?raw'




async function initGPU() {
  if(!navigator.gpu) throw('浏览器不支持')

  const  adapter= await navigator.gpu.requestAdapter();
  const device = await adapter?.requestDevice();
  const canvas = document.querySelector('canvas');
  const context = canvas?.getContext('webgpu');

  context?.configure({
    device:device as GPUDevice,
    format:'bgra8unorm',
  
  })

  return {adapter,device,context}
}

async function initPipeline(device: GPUDevice) {
  const vertexShader = device.createShaderModule({
    code:vertx
  });
  const fregSharder = device.createShaderModule({
    code:frag
  });

  const vertex = new Float32Array([
    0,0.5,0,
    -0.5,0.5,0,
    0.5,-0.5,0,
  ]);

  const vertexBuffer = device.createBuffer({
    size:vertex.byteLength,
    usage:GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
  });

  device.queue.writeBuffer(vertexBuffer,0,vertex);

  const pipeline = await device.createRenderPipelineAsync({
    vertex: {
      module: vertexShader,
      entryPoint: 'main',
      buffers:[{
        arrayStride: 3 * 4,
        attributes:[
          {
            shaderLocation:0,
            offset:0,
            format:"float32x3"
          }
        ]
      }]
    },
    fragment: {
      module: fregSharder,
      entryPoint: 'main',
      targets: [
        {
          format: 'bgra8unorm',
        }
      ],
    },
    primitive: {
      topology: 'triangle-list'
    },
    layout: 'auto'
  })
  return {pipeline}
}

function draw(device:GPUDevice,pipeline:GPURenderPipeline,context:GPUCanvasContext) {
  const encoder = device.createCommandEncoder();

  const renderPaas = encoder.beginRenderPass({
    colorAttachments:[{
      view:context.getCurrentTexture().createView(),
      loadOp:'clear',
      clearValue:{r:0,g:0,b:0,a:1},
      storeOp:'store'
    }]
  });

  renderPaas.setPipeline(pipeline);
  renderPaas.draw(3);

  renderPaas.end();

  const buffer = encoder.finish();
  device.queue.submit([buffer]);
  
  
}



async function run() {
  const {device,context} = await initGPU();
  const {pipeline} = await initPipeline(device as GPUDevice);
  draw(device as GPUDevice,pipeline,context as GPUCanvasContext)
}

run();
