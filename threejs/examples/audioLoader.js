import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, clock;

const objects = [];
const speed = 2.5;
const height = 3;
const offset = 0.5;
const count = 5;
const radius = 3;

init();

function init() {
  scene = new THREE.Scene();

  clock = new THREE.Clock();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(7, 3, 7);

  // light
  const ambientLight = new THREE.AmbientLight(0xcccccc);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
  directionalLight.position.set(0, 5, 5);
  scene.add(directionalLight);

  const d = 5;
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.left = -d;
  directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.top = d;
  directionalLight.shadow.camera.bottom = -d;

  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 20;

  directionalLight.shadow.mapSize.x = 1024;
  directionalLight.shadow.mapSize.y = 1024;

  const audioLoader = new THREE.AudioLoader();
  const listener = new THREE.AudioListener();
  camera.add(listener);

  // floor
  const floorGeometry = new THREE.PlaneGeometry(10, 10);
  const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x4676b6 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = Math.PI * -0.5;
  floor.receiveShadow = true;
  scene.add(floor);

  const ballGeometry = new THREE.SphereGeometry(0.3, 32, 16);
  ballGeometry.translate(0, 0.3, 0);
  const ballMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });

  audioLoader.load('https://threejs.org/examples/sounds/ping_pong.mp3', function (buffer) {
    for (let i = 0; i < count; i++) {
      const s = (i / count) * Math.PI * 2;
      const ball = new THREE.Mesh(ballGeometry, ballMaterial);
      ball.castShadow = true;
      ball.userData.down = false;

      ball.position.x = radius * Math.cos(s);
      ball.position.z = radius * Math.sin(s);

      const audio = new THREE.PositionalAudio(listener);
      audio.setBuffer(buffer);
      ball.add(audio);

      scene.add(ball);
      objects.push(ball);
    }
    animate();
  });

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 1;
  controls.maxDistance = 25;
}

function animate() {
  requestAnimationFrame(animate);

  render();
}


function render() {
    const time = clock.getElapsedTime();

    for(let i=0;i < objects.length;i++) {
        const ball = objects[i];

        const previousHeight = ball.position.y;
        ball.position.y = Math.abs(Math.sin(i * offset + time * speed) * height);

        if(ball.position.y < previousHeight) {
            ball.userData.down = true;
        }else {
            if(ball.userData.down == true) {
                const audio = ball.children[0];
                audio.play();
                ball.userData.down = false;
            }
        }
    }

    renderer.render(scene,camera);


}



render();
