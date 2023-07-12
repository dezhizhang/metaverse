



// async function init() {
//  const adapter = await navigator.gpu.requestAdapter();
//  const device = await adapter?.requestDevice();

// //  console.log(device);

// }

// init();

async function initGPU() {
  if(!navigator.gpu) throw('浏览器不支持')

  const  adapter= await navigator.gpu.requestAdapter();
  const device = await adapter?.requestDevice();
  const canvas = document.querySelector('canvas');

  const context = canvas?.getContext('webgpu');
  // const format = (context as any)?.getPrefeeredFormat(adapter);

  // const context = canvas?.getContext('webgpu')

  context?.configure({
    device:device as GPUDevice,
    format:'bgra8unorm',
  })

  // console.log(format)
}

initGPU()