import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import output_fragment from './output_fragment.glsl.js';

const scene = new THREE.Scene();

function lon2xy(longitude, latitude) {
  var E = longitude;
  var N = latitude;
  var x = (E * 20037508.34) / 180;
  var y = Math.log(Math.tan(((90 + N) * Math.PI) / 360)) / (Math.PI / 180);
  y = (y * 20037508.34) / 180;
  return {
    x: x, //墨卡托x坐标——对应经度
    y: y, //墨卡托y坐标——对应维度
  };
}

// 设置光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(200, 400, 300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-200, -400, 300);
scene.add(directionalLight2);

// 设置环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);

// 设置从示系
const axesHelper = new THREE.AxesHelper(3000);
const E = 121.49526536464691;
const N = 31.24189350905988;
const xy = lon2xy(E, N);
const x = xy.x;
const y = xy.y;
axesHelper.position.set(x, y, 0);
scene.add(axesHelper);

//多个多边形轮廓
function ShapeMesh(pointsArrs) {
  const shapeArr = [];
  pointsArrs.forEach((pointsArr) => {
    const vector2Arr = [];
    pointsArr[0].forEach((elem) => {
      const xy = lon2xy(elem[0], elem[1]); //经纬度转墨卡托坐标
      vector2Arr.push(new THREE.Vector2(xy.x, xy.y));
    });
    const shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });
  const geometry = new THREE.ShapeGeometry(shapeArr);
  const material = new THREE.MeshLambertMaterial({
    color: 0x001c1a,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
material.onBeforeCompile = function (shader) {
  shader.vertexShader = shader.vertexShader.replace(
    'void main() {',
    ['varying vec3 vPosition;', 'void main() {', 'vPosition = position;'].join(
      '\n',
    ), // .join()把数组元素合成字符串
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    'void main() {',
    ['varying vec3 vPosition;', 'void main() {'].join('\n'),
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <output_fragment>',
    output_fragment,
  );
};

function ExtrudeMesh(pointsArrs, height) {
  let shapeArr = [];
  pointsArrs.forEach((pointsArr) => {
    let vector2Arr = [];
    pointsArr[0].forEach((elem) => {
      const xy = lon2xy(elem[0], elem[1]);
      vector2Arr.push(new THREE.Vector2(xy.x, xy.y));
    });
    const shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });

  const geometry = new THREE.ExtrudeGeometry(shapeArr, {
    depth: height,
    bevelEnabled: false,
  });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

const model = new THREE.Group();
const loader = new THREE.FileLoader();
loader.setResponseType('json');
loader.load(
  ' /shanghai.json',
  function (data) {
    let buildGroup = new THREE.Group();
    data.features.forEach((build) => {
      if (build.geometry) {
        if (build.geometry.type === 'Polygon') {
          build.geometry.coordinates = [build.geometry.coordinates];
        }
        const height = build.properties.Floor * 3;
        buildGroup.add(ExtrudeMesh(build.geometry.coordinates, height));
      }
    });
    model.add(buildGroup);
  },
);

// 黄浦江
loader.load(
  ' /huangpu-river.json',
  function (data) {
    let buildGroup = new THREE.Group();
    data.features.forEach((build) => {
      if (build.geometry) {
        if (build.geometry.type === 'Polygon') {
          build.geometry.coordinates = [build.geometry.coordinates];
        }
        buildGroup.add(ShapeMesh(build.geometry.coordinates));
      }
    });
    model.add(buildGroup);
    scene.add(model);
  },
);

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(30, width / height, 1, 30000);
camera.position.set(13524889, 3657486, 5465);
camera.lookAt(x, y, 0);

// 创建沉浸器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(x, y, 0);
controls.update();

window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
};

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
