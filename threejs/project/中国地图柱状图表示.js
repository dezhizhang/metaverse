/*
 * :file description:
 * :name: /threejs/project/中国地图柱状图表示.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-04 15:59:32
 * :last editor: 张德志
 * :date last edited: 2024-04-04 20:25:52
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ExtrudeMesh } from './ExtrudeMesh';


const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(300, 300, 200);
// camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff,1);
directionalLight.position.set(400,200,300);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff,1);
directionalLight2.position.set(-400,-200,-300);
scene.add(directionalLight2);



const geometry = new THREE.CylinderGeometry(1, 1, 1, 6);
geometry.computeVertexNormals();
geometry.rotateX(Math.PI / 2);
geometry.translate(0, 0, 0.5);

function CylinderMesh(x, y, size, height, color) {
  const material = new THREE.MeshLambertMaterial({
    color,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, 0);
  mesh.scale.set(size, size, height);
  return mesh;
}


const loader = new THREE.FileLoader();
loader.setResponseType('json');

const meshGroup = new THREE.Group();
const lineGroup = new THREE.Group();
const cylinderGroup = new THREE.Group();
const mapGroup = new THREE.Group();

lineGroup.position.z = 2.1;

loader.load('/gdp.json',(data) => {
  const gdpObj = {};
  const color1 = new THREE.Color(0xffffff);
  const color2 = new THREE.Color(0xff0000);

  const gdpMax = 120000;
  data.arr.forEach((obj) => {
    const gdp = obj.value;
    gdpObj[obj.name] = gdp;
  });

  loader.load('/china.json',(data) => {
    data.features.forEach((area) => {
      if(area.geometry.type === 'Polygon') {
        area.geometry.coordinates = [area.geometry.coordinates];
      }

      const mesh = ExtrudeMesh(area.geometry.coordinates,2);
      const name = area.properties.name;
      const gdp = gdpObj[name];

      const center = area.properties.center;
      if(center) {
        const color = color1.clone().lerp(color2.clone(),gdp / gdpMax);
        const height = (gdp / gdpMax) * 10;
        const cylinder = CylinderMesh(center[0],center[1],0.5,height,color.getHex());
        cylinderGroup.add(cylinder);
      }
      lineGroup.add(lineLoop(area.geometry.coordinates));
      meshGroup.add(mesh);
      mapGroup.add(lineGroup,cylinderGroup,meshGroup);
    })
  })

})




const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 35;

const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(104, 35, 200);
camera.lookAt(104, 35, 0);

scene.add(mapGroup);

function lineLoop(pointArr) {
  const group = new THREE.Group();
  pointArr.forEach((polygon) => {
    const pointArr = [];
    polygon[0].forEach((elem) => {
      pointArr.push(elem[0], elem[1], 0);
    });
    group.add(line(pointArr));
  });
  return group;
}

function line(pointArr) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(pointArr);
  const attribue = new THREE.BufferAttribute(vertices, 3);
  geometry.attributes.position = attribue;
  const material = new THREE.LineBasicMaterial({
    color: 0x00cccc,
  });
  // const line = new THREE.Line(geometry,material);
  return new THREE.LineLoop(geometry, material);
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(104, 35, 0);
controls.update();

let chooseMesh = null;

window.addEventListener('click', (event) => {
  if (chooseMesh) {
    chooseMesh.material.color.set(0x004444);
  }
  const sx = event.clientX;
  const sy = event.clientY;

  const x = (sx / window.innerWidth) * 2 - 1;
  const y = -(sy / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

  const intersect = raycaster.intersectObjects(meshGroup.children);

  if (intersect.length > 0) {
    intersect[0].object.material.color.set(0x009999);
    chooseMesh = intersect[0].object;
  }
});

const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
});

function render() {
  renderer.render(scene, camera);
  // effectComposer.render();
  requestAnimationFrame(render);
}

render();
