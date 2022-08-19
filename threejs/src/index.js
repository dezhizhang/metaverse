/*
 * :file description: 
 * :name: /threejs/src/index.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:44:44
 * :last editor: 张德志
 * :date last edited: 2022-08-19 23:23:27
 */
// import * as THREE from 'three';




// import * as THREE from 'three';

// const scene = new THREE.Scene();

// // 创建相机
// const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);
// camera.position.x = -30;
// camera.position.y = 40;
// camera.position.z = 40;
// camera.lookAt(scene.position);


// const renderer = new THREE.WebGL1Renderer();
// renderer.setClearColor(new THREE.Color(0xEEEEEEE));
// renderer.setSize(window.innerWidth,window.innerHeight);
// renderer.shadowMap.enabled = true;


// // 创建平面
// const planeGeometry = new THREE.PlaneGeometry(70,50,1,1);
// const planeMaterial = new THREE.MeshLambertMaterial({Color:new THREE.Color(0xEEEEEE)});
// const plane = new THREE.Mesh(planeGeometry,planeMaterial);
// plane.rotation.x = -0.5 * Math.PI;
// plane.position.y = 0;
// plane.position.x = 0;
// plane.position.z = 0;

// scene.add(plane);


// // 创建平行光
// const ambientLight = new THREE.AmbientLight(0x0c0c0c0c);
// scene.add(ambientLight);

// // 创建点光源
// const spotLight = new THREE.SpotLight(0xffffff);
// spotLight.position.set(-40,60,-10);
// spotLight.castShadow = true;
// scene.add(spotLight);

// document.body.appendChild(renderer.domElement);

// function addCube() {
	
// 	const cubeGeometry = new THREE.BoxGeometry(4,4,4);
// 	const cubeMaterial = new THREE.MeshLambertMaterial({color:new THREE.Color(0Xff0000)});
// 	const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
// 	cube.position.x = -50 +  Math.round(Math.random() * planeGeometry.parameters.width);
// 	cube.position.y = Math.round(Math.random() * 5);
// 	cube.position.z = -20 +  Math.round(Math.random() * planeGeometry.parameters.height);
// 	cube.castShado = true;
// 	scene.add(cube);

// }



// function render() {
// 	addCube();
// 	requestAnimationFrame(render);
// 	renderer.render(scene,camera);
// }

// render();








