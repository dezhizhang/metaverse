import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerWidth,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/watercover/CityNewYork002_COL_VAR1_1K.png');
const aotexture = textureLoader.load('/watercover/CityNewYork002_AO_1K.jpg');
const colorTexture = textureLoader.load('/colors.png');

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const planeGeometry = new THREE.PlaneGeometry(1,1);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
    auMap: aotexture,
    aoMapIntensity:1,
    lightMap:colorTexture,
});

const plane = new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);

const rgbLoader = new RGBELoader();
rgbLoader.load('/Alex_Hart-Nature_Lab_Bones_2k.hdr',(envMap) => {
    envMap.mapping = THREE.EquirectangularReflectionMapping;

    scene.background = envMap;
    scene.environment = envMap;
    plane.environment = envMap;

})


window.addEventListener('resize',() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
});

function render() {
    requestAnimationFrame(render);
    renderer.render(scene,camera);
}

render();

