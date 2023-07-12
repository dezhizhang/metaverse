import './style.css'

const canvas = document.getElementById('canvas');
const adapter = await navigator.gpu.requesterAdapter();
const device = await adapter.requesterAdapter();

console.log(device);

