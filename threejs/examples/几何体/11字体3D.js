import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

let camera, scene, renderer;

init();

function init() {
	camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,1,10000);

	camera.position.set(0,-400,500);

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xf0f0f0);

	const loader = new FontLoader();
	loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',function(font) {
		const color = new THREE.Color(0x006699);
		const matDark = new THREE.MeshBasicMaterial({
			color:color,
			side:THREE.DoubleSide
		});

		const matLite = new THREE.MeshBasicMaterial({
			color:color,
			transparent:true,
			opacity: 0.4,
			side: THREE.DoubleSide,
		});

		const message = 'Three.js\nStroke text.';

		const shapes = font.generateShapes(message, 100);

		const geometry = new THREE.ShapeGeometry(shapes);

		geometry.computeBoundingBox();
		const xMid =
		-0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
  
	  geometry.translate(xMid, 0, 0);

	  const holeShapes = [];

	  for(let i=0;i < shapes.length;i++) {
		const shape = shapes[i];

		if(shape.holes && shape.holes.length > 0) {
			for(let j=0;j < shape.holes.length;j++) {
				const hole = shape.holes[j];
				holeShapes.push(hole);
			}
		}
	  }

	  shapes.push.apply(shapes, holeShapes);

    const style = SVGLoader.getStrokeStyle(5, color.getStyle());

    const strokeText = new THREE.Group();

    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];

      const points = shape.getPoints();

      const geometry = SVGLoader.pointsToStroke(points, style);

      geometry.translate(xMid, 0, 0);

      const strokeMesh = new THREE.Mesh(geometry, matDark);
      strokeText.add(strokeMesh);
    }

    scene.add(strokeText);

    render();



	});

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth,window.innerHeight);

	document.body.appendChild(renderer.domElement);

	const controls = new OrbitControls(camera,renderer.domElement);
	controls.target.set(0,0,0);
	controls.update();

	controls.addEventListener('change',render);

	window.addEventListener('resize',onWindowResize);

}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function render() {
  renderer.render(scene, camera);
}
