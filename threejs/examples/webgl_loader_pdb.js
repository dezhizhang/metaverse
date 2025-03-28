import * as THREE from 'three';

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { PDBLoader } from 'three/addons/loaders/PDBLoader.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

let camera, scene, renderer, labelRenderer;
let controls;

let root;

const params = {
  molecule: 'caffeine.pdb',
};

const loader = new PDBLoader();
const offset = new THREE.Vector3();

init();
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    camera = new THREE.PerspectiveCamera(70,window.innerWidth / window.innerHeight,0.1,5000);
    camera.position.z = 1000;
    scene.add(camera);

    const light1 = new THREE.DirectionalLight(0xffffff,2.5);
    light1.position.set(1, 1, 1);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff,1.5);
    light2.position.set(1,1,1);
    scene.add(light2);

    root = new THREE.Group();
    scene.add(root);

    renderer = new THREE.WebGLRenderer({
        antialias:true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);

    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth,window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(labelRenderer.domElement);

    controls = new TrackballControls(camera,renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 2000;

    loadMolecule(params.molecule);
    window.addEventListener('resize',onWindowResize);

}


function loadMolecule(model) {
  const url = 'https://threejs.org/examples/models/pdb/' + model;

  while (root.children.length > 0) {
    const object = root.children[0];
    object.parent.remove(object);
  }

  loader.load(url, function (pdb) {
    const geometryAtoms = pdb.geometryAtoms;
    const geometryBonds = pdb.geometryBonds;
    const json = pdb.json;

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const sphereGeometry = new THREE.IcosahedronGeometry(1, 3);

    geometryAtoms.computeBoundingBox();
    geometryAtoms.boundingBox.getCenter(offset).negate();

    geometryAtoms.translate(offset.x, offset.y, offset.z);
    geometryBonds.translate(offset.x, offset.y, offset.z);

    let positions = geometryAtoms.getAttribute('position');
    const colors = geometryAtoms.getAttribute('color');

    const position = new THREE.Vector3();
    const color = new THREE.Color();

    for (let i = 0; i < positions.count; i++) {
      position.x = positions.getX(i);
      position.y = positions.getY(i);
      position.z = positions.getZ(i);

      color.r = colors.getX(i);
      color.g = colors.getY(i);
      color.b = colors.getZ(i);

      const material = new THREE.MeshPhongMaterial({ color: color });

      const object = new THREE.Mesh(sphereGeometry, material);
      object.position.copy(position);
      object.position.multiplyScalar(75);
      object.scale.multiplyScalar(25);
      root.add(object);

      const atom = json.atoms[i];

      const text = document.createElement('div');
      text.className = 'label';
      text.style.color = 'rgb(' + atom[3][0] + ',' + atom[3][1] + ',' + atom[3][2] + ')';
      text.textContent = atom[4];

      const label = new CSS2DObject(text);
      label.position.copy(object.position);
      root.add(label);
    }

    positions = geometryBonds.getAttribute('position');

    const start = new THREE.Vector3();
    const end = new THREE.Vector3();

    for (let i = 0; i < positions.count; i += 2) {
      start.x = positions.getX(i);
      start.y = positions.getY(i);
      start.z = positions.getZ(i);

      end.x = positions.getX(i + 1);
      end.y = positions.getY(i + 1);
      end.z = positions.getZ(i + 1);

      start.multiplyScalar(75);
      end.multiplyScalar(75);

      const object = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial({ color: 0xffffff }));
      object.position.copy(start);
      object.position.lerp(end, 0.5);
      object.scale.set(5, 5, start.distanceTo(end));
      object.lookAt(end);
      root.add(object);
    }

    render();
  });
}

//

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  const time = Date.now() * 0.0004;

  root.rotation.x = time;
  root.rotation.y = time * 0.7;

  render();
}

function render() {
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}
