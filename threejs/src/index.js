/*
 * :file description:
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-13 20:50:00
 * :last editor: 张德志
 * :date last edited: 2024-04-13 22:55:59
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

//创建场影
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xcccccc, 500, 1200);

//创建相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

// 设置相机位置
camera.position.set(-437, 443, 278);
camera.lookAt(scene.position);

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();

const cubeTextureLoader = new THREE.CubeTextureLoader().setPath('/environ/');
const envMapTexture = cubeTextureLoader.load([
  'px.jpg',
  'nx.jpg',
  'py.jpg',
  'ny.jpg',
  'pz.jpg',
  'nz.jpg',
]);

const tagList = [];

dracoLoader.setDecoderPath('/draco/');
gltfLoader.load('/轿车.glb', (gltf) => {
  gltf.scene.traverse(function (object) {
    if (object.type === 'Mesh') {
      if (object.name.slice(0, 3) === '后视境') {
        object.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 1.0,
          roughness: 0.0,
          envMapIntensity: 1.0,
        });
      } else if (object.name.slice(0, 4) === '高光金属') {
        object.material = new THREE.MeshStandardMaterial({
          color: object.material.color,
          metalness: 1.0,
          roughness: 0.4,
          envMap: envMapTexture,
        });
      }

      object.material.envMap = envMapTexture;
    }
  });

  const s = 10;
  // 添加标注
  const tagNameArr = ['右前光标', '右后光标', '左前光标', '左后光标', '后备箱光标'];
  tagNameArr.forEach((name) => {
    const spriteMaterial = new THREE.SpriteMaterial({
      map: new THREE.TextureLoader().load('/光点.png'),
      transparent: true,
    });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(s, s, 1);

    const tagObj = gltf.scene.getObjectByName(name);

    if (name === '右前光标' || name === '右后光标') {
      sprite.position.z -= sprite.scale.x / 2;
    } else if (name === '左前光标' || name === '左后光标') {
      sprite.position.z += sprite.scale.x / 2;
    } else {
      sprite.position.x += sprite.scale.x / 2;
    }
    tagList.push(sprite);
    tagObj.add(sprite);
  });


  // function waveAnimation() {
  //   s += 0.01;
  //   if(s < 0.5) {
  //     sprite.scale.x = 6 * (1 + s);
  //     sprite.scale.y = 6 * (1 + s);
  //   }else if(s >=0.5 && s < 1.0) {
  //     sprite.scale.x = 6 * (2 -s);
  //     sprite.scale.y = 6 * (2 -s);
  //   }else {
  //     s = 0.0;
  //   }
  //   requestAnimationFrame(waveAnimation);
  // }

  // waveAnimation();
  // gltf.scene.getObjectByName('左前门').rotateY(-Math.PI / 3);
  // gltf.scene.getObjectByName('右后门').rotateY(Math.PI / 3);

  scene.add(gltf.scene);
});

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-437, 443, 278);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(437, -443, -278);
scene.add(directionalLight2);

// 添加地面
const geometry = new THREE.PlaneGeometry(6000, 6000);
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/瓷砖.jpg');

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

texture.repeat.set(120, 120);
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  map: texture,
});

const ground = new THREE.Mesh(geometry, material);
ground.rotateX(-Math.PI / 2);
scene.add(ground);

// const texture = texture.load('/瓷砖.jpg');
// texture.

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

// 添加场音
const listener = new THREE.AudioListener();
const openSound = new THREE.Audio(listener);
const cloneSound = new THREE.Audio(listener);

const audioLoader = new THREE.AudioLoader();
audioLoader.load('/碰撞声.wav',function(buffer) {
  openSound.setBuffer(buffer);
  openSound.setVolume(0.4);
})



window.addEventListener('click',(event) => {
  const sx = event.clientX;
  const sy = event.clientY;
  const x = (sx / window.innerWidth) * 2 - 1;
  const y = -(sy / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x,y),camera);
  const intersects = raycaster.intersectObjects(tagList);

  if(intersects.length > 0) {
    openSound.play();
    
    console.log(intersects);

  }
});


// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xcccccc, 1);
// 设置渲染器大小
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.append(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
