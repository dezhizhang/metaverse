 import { scene, renderer, camera } from './scene.js'
 import { createSphereMesh } from './earth.js'//绘制地球
 import { countryLine } from './line.js';//绘制地球国家边界线
 import { createPointMesh } from './pointMesh.js';//标注某地点


 const R = 100; // 地球半径
 
scene.add(createPointMesh(R,113.4668, 33.8818));

const earthMesh = createSphereMesh(R);
scene.add(earthMesh);

scene.add(countryLine(R * 1.001));


function render() {
	renderer.render(scene,camera);
	requestAnimationFrame(render);
}

render();

document.body.appendChild(renderer.domElement);
