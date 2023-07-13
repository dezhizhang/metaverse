


async function initGPU() {
  if(!navigator.gpu) throw('浏览器不支持')

  const  adapter= await navigator.gpu.requestAdapter();
  const device = await adapter?.requestDevice();

  console.log(adapter,device)
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



async function run() {
  const {device} = await initGPU();
  const {pipeline} = await initPipeline(device as GPUDevice)
}

initGPU()