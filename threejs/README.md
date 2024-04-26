### 第一个示例
```js
import * as THREE from 'three';

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

//设置相机位置
camera.position.set(0,0,10);
scene.add(camera);


//创健几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

//将几何体添加到场影中
scene.add(cube);

//初始化沉浸器
const renderer = new THREE.WebGLRenderer();

//设置渲染大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);


renderer.render(scene,camera);

```
### 控制器的使用
```js

import * as THREE from 'three';
//引入控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 

//创建场影
const scene = new THREE.Scene();

//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机位置
camera.position.set(0,0,10);
scene.add(camera);

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

// 将几何体添加到场景中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.append(renderer.domElement);

//创建控制器
const controls = new OrbitControls(camera,renderer.domElement);

function render() {
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();

```
### 物体的移动cube.position.set();
```js
import * as THREE from 'three';
//引入控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机位置
camera.position.set(0,0,10);
scene.add(camera);

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

cube.position.set(1,1,-1)

// 将几何体添加场景中
scene.add(cube);

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();

// 设置渲染器大小
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

// 创建控制器
const controls = new OrbitControls(camera,renderer.domElement);

// 创建坐标系
const axesHelper = new THREE.AxesHelper(10);

scene.add(axesHelper);

function render() {
    cube.position.x += 0.1;
    if(cube.position.x > 5) {
        cube.position.x = 0;
    }
    console.log()
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();
```
### 自适应大小
```js
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 创建场影
const scene = new THREE.Scene();
//创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

// 设置相机的位置
camera.position.set(0,0,10);
scene.add(camera);

//创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);

cube.scale.set(1,2,1);
cube.rotation.set(1,1,1);
scene.add(cube);

//创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);

// 创建控制器
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;


// 创建坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

document.body.append(renderer.domElement);

window.addEventListener('resize',() => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
})

const clock = new THREE.Clock();

gsap.to(cube.position,{x:5,duration:5,repeat:-1});
gsap.to(cube.rotation,{x:2 * Math.PI,duration:5,repeat:-1})


function render() {
    controls.update();
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();
```
### 财质
```js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

// 创建gui
const gui = new dat.GUI();

// 创建场影
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xffffff, 0.015);

// 创建相机
const camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight,0.1,1000);

// 创建渲染器
const renderer = new THREE.WebGL1Renderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap = {
    enabled:true
}

// 创建平面
const planeGeometry = new THREE.PlaneGeometry(60,40,1,1);
const planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow = true;

// 设置平面的位置
plane.rotation.x = -0.5 *Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;

// 将平面添加到场景中
scene.add(plane);

// 设置相机位置
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

// 创建平行光
const ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

//创建点光源
const spotLight = new THREE.SpotLight(0xeeeeee);
spotLight.position.set(-40,60,10);
spotLight.castShadow = true;
scene.add(spotLight);




//创建控制器
var controls = new function () {
    new OrbitControls(camera,renderer.domElement);
    this.rotationSpeed = 0.02;
    this.numberOfObjects = scene.children.length;

    this.removeCube = function () {
        var allChildren = scene.children;
        var lastObject = allChildren[allChildren.length - 1];
        if (lastObject instanceof THREE.Mesh) {
            scene.remove(lastObject);
            this.numberOfObjects = scene.children.length;
        }
    };

    this.addCube = function() {
        const cubeSize = Math.ceil((Math.random() * 3));
        const cubeGeometry = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize);
        const cubeMaterial = new THREE.MeshBasicMaterial({color:Math.random() * 0xffffff});
        const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
        cube.castShadow = true;

        cube.position.x = - 30 + Math.round((Math.random() * planeGeometry.parameters.width));
        cube.position.y = Math.round((Math.random() * 5));
        cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));

        // 添加场景中
        scene.add(cube);
        this.numberOfObjects = scene.children.length;
    }

    this.outputObjects = function() {
        console.log(scene.children)
    }
};

gui.add(controls, 'rotationSpeed', 0, 0.5);
gui.add(controls, 'addCube');
gui.add(controls, 'removeCube');
gui.add(controls, 'outputObjects');
gui.add(controls, 'numberOfObjects').listen();

document.body.append(renderer.domElement);

function render() {
    scene.traverse((e) => {
        if(e instanceof THREE.Mesh && e != plane) {
            e.rotation.x += controls.rotationSpeed;
            e.rotation.y += controls.rotationSpeed;
            e.rotation.z += controls.rotationSpeed;
        }
    });
    requestAnimationFrame(render);
    renderer.render(scene,camera);

}

render();

```
### 圆环几何体
```js
const torusGeometry = new THREE.TorusGeometry(10,2,10,10);
const torusMaterial = new THREE.MeshLambertMaterial({color:0xff2288});
const torus = new THREE.Mesh(torusGeometry,torusMaterial);
torus.castShadow = true;
torus.position.x = 0;
torus.position.y = 10;
torus.position.z = -10;
scene.add(torus);

```
### 纹理贴图
```js
import * as THREE from 'three';
import gsap from "gsap";
import soil_normal from './soil_normal.jpg';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// 创建gui
const gui = new dat.GUI();

// 创建场影
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(0,0,10);
scene.add(camera);


//////////////////////////////////////////////////
const textureLoader = new THREE.TextureLoader();
const cat = textureLoader.load(soil_normal);
console.log(cat);

const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({
    color:'#ffff00',
    map:cat
});
//////////////////////////////////////////////////

const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
scene.add(cube);

// 创建渲染器 
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

// 创建控制器
const controls = new OrbitControls(camera,renderer.domElement);

// 创建坐标系
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const clock = new THREE.Clock();


function render() {
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

render();

```
### 线段中心点和距离
```js
const line3 = new THREE.Line3();
line3.start = new THREE.Vector3(0,0,0);
line3.end = new THREE.Vector3(10,10,10);


const center = new THREE.Vector3();
line3.getCenter(center);

const distance = line3.distance();

console.log('center',center);
console.log('distance',distance);

```
### 三角形面积和法线
```js
const  triangle = new THREE.Triangle();
triangle.a = new THREE.Vector3(20,0,0);
triangle.b = new THREE.Vector3(0,0,10);
triangle.c = new THREE.Vector3(0,30,0);


const s = triangle.getArea();
const normal = new THREE.Vector3();
triangle.getNormal(normal);
console.log('三角形面和',s);
console.log('三角形法线',normal);

```
### 平面
```js
const plane = new THREE.Plane();


const p1 = new THREE.Vector3(20,0,0);
const p2 = new THREE.Vector3(0,0,10);
const p3 = new THREE.Vector3(10,30,0);


plane.setFromCoplanarPoints(p1,p2,p3);

const point = new THREE.Vector3(20,100,300);

const l = plane.distanceToPoint(point);


console.log(plane.constant);

console.log('点到平面的距离',l);

```
### 计算两点间的距离
```js
const p1 = new THREE.Vector3(0,0,0);
const p2 = new THREE.Vector3(10,10,10);

const length = p1.distanceTo(p2);

console.log('两点间的距离',length);

```
### 计算三角形面积
```js
const triangle = new THREE.Triangle();

triangle.a = new THREE.Vector3(20,0,0);

triangle.b = new THREE.Vector3(0,0,10);

triangle.c = new THREE.Vector3(0,30,0);

const s = triangle.getArea();

console.log('三角形面积',s);
```

###  碰检测
```js
const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

window.addEventListener('click',(event) => {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

	raycaster.setFromCamera(mouse,camera);
	const intersects = raycaster.intersectObjects(scene.children);
	if(intersects.length) {
		intersects[0].object.material.color.set(0xff0000)
	}
})

```
### 缓冲几何体
```js
const vertices = new Float32Array([
	-1.0,-1.0,1.0,
	1.0,-1.0,1.0,
	1.0,1.0,1.0,
	1.0,1.0,1.0,
	-1.0,1.0,1.0,
	-1.0,-1.0,1.0
]);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position',new THREE.BufferAttribute(vertices,3));
const material = new THREE.MeshBasicMaterial({color:0xff0000,side:THREE.DoubleSide});
const mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);
```
### 基础材质
```js
const textureLoader = new THREE.TextureLoader();
const texure = textureLoader.load('https://t7.baidu.com/it/u=2851687453,2321283050&fm=193&f=GIF')

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
	color:0xff00ff,
	map:texure
});
const cube = new THREE.Mesh(geometry,material);
scene.add(cube);
```
### 物体投射
```js
const mouse = new THREE.Vector2();
// 创建投射对像
const raycaster = new THREE.Raycaster();

window.addEventListener('click', (ev) => {
	mouse.x = ev.clientX / window.innerWidth * 2 - 1;
	mouse.y = -ev.clientY / window.innerHeight * 2 + 1;
	raycaster.setFromCamera(mouse,camera);
	const result = raycaster.intersectObjects(cubeList);
	console.log(result);
	if(result.length) {
		result[0].object.material = new THREE.MeshBasicMaterial({
			color:'#FF0000'
		})
	}
	
});
```
### 点材质
```js

const geometry = new THREE.BufferGeometry();
const positions = new Float32Array([0,0,0]);


geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));

const material = new THREE.ShaderMaterial({
	vertexShader:vertexShader,
	fragmentShader:fragmentShader,
	
})

const points = new THREE.Points(geometry,material);

```
### 曲线
```js
const curve = new THREE.CatmullRomCurve3([
	new THREE.Vector3(-10,0,10),
	new THREE.Vector3(-5,5,5),
	new THREE.Vector3(0,0,0),
	new THREE.Vector3(5,-5,5),
	new THREE.Vector3(10,0,10)
],true

);

const points = curve.getPoints(50);
const geometry = new THREE.BufferGeometry().setFromPoints(points);

const material = new THREE.LineBasicMaterial({color:0xff0000});
const curveObject = new THREE.Line(geometry,material);
scene.add(curveObject);

```
### OBJLoader和MTLLoader的加载
```js

const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();

mtlLoader.load('/cube/box.mtl',function(material) {
  objLoader.setMaterials(material);
  objLoader.load('/cube/box.obj',function(obj) {
    obj.children[0].scale.set(10,10,10);
    obj.children[0].geometry.center();
    // obj.children[0].material.color = new THREE.Color(0x00ffff);
    scene.add(obj);  
  })
})
```
### OBJLoader和MTLLoader的加载多模型
```js
const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();

mtlLoader.load('/multiple-models/model1.mtl',function(material) {
  objLoader.setMaterials(material);
  objLoader.load('/multiple-models/model1.obj',function(obj) {
    obj.children[0].geometry.center();
    scene.add(obj);
  })
})

```

### FBXLoader加载并解析动画
```js
let mixer;

const fbxLoader = new FBXLoader();
fbxLoader.load('/sambaDancing.fbx',(obj) => {

  console.log(obj);
  obj.scale.set(0.5,0.5,0.5);
  // 解析动画
  mixer = new THREE.AnimationMixer(obj);
  const animations = mixer.clipAction(obj.animations[0]);
  animations.play();

  scene.add(obj);

})
```
### OBJLoader加载并添加贴图

```js
const objLoader = new OBJLoader();
const textureLoader = new THREE.TextureLoader();

objLoader.load('/bracelet.obj',function(obj) {
  const material = new THREE.MeshBasicMaterial({
    map:textureLoader.load('/texture1.png')
  })
  obj.children[0].material = material;
  scene.add(obj);
})
```







