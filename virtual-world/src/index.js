/*
 * :file description:
 * :name: /virtual-world/src/index.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-04-26 06:15:04
 * :last editor: 张德志
 * :date last edited: 2025-02-17 05:28:27
 */
import * as THREE from "three";
import delaunator from "delaunator";
import pointInPolygon from "point-in-polygon";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import polygon from "/public/polygon.json";
import { lon2xyz, minMax } from "./utils";

const R = 100;
const CDN_URL = "https://cdn.shuqin.cc";

const scene = new THREE.Scene();

// 添加光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

// 环境光
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

const width = window.innerWidth;
const height = window.innerHeight;

const k = width / height;
const s = 120;

const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200);
camera.lookAt(0, 0, 0);

const geometry = new THREE.SphereGeometry(R, 40, 40);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 生成国家边界线
function createLine(pointArr) {
  const geometry = new THREE.BufferGeometry();
  const attribue = new THREE.BufferAttribute(new Float32Array(pointArr));
  geometry.attributes.position = attribue;

  const material = new THREE.LineBasicMaterial({
    color: 0x00aaaa,
  });
  return new THREE.LineLoop(geometry, material);
}

// 加载世界地图
const fileLoader = new THREE.FileLoader();
fileLoader.setResponseType("json");
fileLoader.load(`${CDN_URL}/world.json`, function (data) {
  data.features.forEach((country) => {
    console.log("country", country);
    if (country.geometry.type === "Polygon") {
      country.geometry.coordinates = [country.geometry.coordinates];
    }

    country.geometry.coordinates.forEach((polygon) => {
      const pointArr = [];
      polygon[0].forEach((elem) => {
        const coord = lon2xyz(R, elem[0], elem[1]);
        pointArr.push(coord.x, coord.y, coord.z);
      });

      scene.add(createLine(pointArr));
    });
  });
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(1000);
scene.add(axesHelper);

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
