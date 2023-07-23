/*
 * :file description: 
 * :name: /webgpu/src/main.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-07-13 05:31:18
 * :last editor: 张德志
 * :date last edited: 2023-07-14 05:22:30
 */
import './style.css';



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
    code:`
    @vertex
    fn main(@builtin(vertex_index) VertexIndex : u32) -> @builtin(position) vec4<f32> {
        var pos = array<vec2<f32>, 3>(
          vec2<f32>(0.0, 0.5),
          vec2<f32>(-0.5, -0.5),
          vec2<f32>(0.5, -0.5)
        );
        return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
    }
    `
  });
  const fregSharder = device.createShaderModule({
    code:`
    @fragment
    fn main() -> @location(0) vec4<f32> {
        return vec4<f32>(1.0, 0.0, 0.0, 1.0);
    }
    `
  });

  const pipeline = await device.createRenderPipelineAsync({
    vertex: {
      module: vertexShader,
      entryPoint: 'main'
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
      storeOp:'store',
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
