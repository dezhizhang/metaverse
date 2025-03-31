/*
 * :file description: 
 * :name: /3dmath/examples/11四元素方向.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-03-31 07:46:19
 * :last editor: 张德志
 * :date last edited: 2025-03-31 07:46:20
 */
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(200,200,200);
camera.lookAt(scene.position);


scene.add(new THREE.AmbientLight(0xffffff,100));

scene.add(new THREE.AxesHelper(100));


const loader = new GLTFLoader();
loader.load('/fly.glb',function(gltf) {
    const fly = gltf.scene;
    fly.position.set(2,0,0);
    const ax = new THREE.AxesHelper(10);
    fly.add(ax);

    const a = new THREE.Vector3(0,0,-1);
    const b = new THREE.Vector3(-1,-1,-1);

    fly.add(new THREE.ArrowHelper(a,fly.position,5,0x00ff00));
    fly.add(new THREE.ArrowHelper(b,fly.position,5,0xff00ff));


    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(a,b);
    fly.quaternion.copy(quaternion);

    scene.add(fly);
    
})


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera,renderer.domElement);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();

