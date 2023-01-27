  // 现在浏览器支持ES6语法，自然包括import方式引入js文件
  import * as THREE from 'three';

  const scene = new THREE.Scene();
  const box = new THREE.BoxGeometry(30,30,30);
  const material = new THREE.MeshLambertMaterial({
    color:0x0000ff
  });
  const boxMesh = new THREE.Mesh(box,material);
  boxMesh.position.set(80,0,0);
  scene.add(boxMesh);

  const axesHelper = new THREE.AxesHelper(300);
  scene.add(axesHelper);

  // 光源设置
  const point = new THREE.PointLight(0xffffff);
  point.position.set(400,200,300);
  scene.add(point);

  const ambient = new THREE.AmbientLight(0xffffff,0.4);
  scene.add(ambient);

  const width = window.innerWidth;
  const height = window.innerHeight;
  const k = width / height;
  const s = 150;
  const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
  camera.position.set(200,300,200);
  camera.lookAt(scene.position);


  // 创建渲染对像
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width,height);
  renderer.setClearColor(0x888888,1);
  document.body.appendChild(renderer.domElement);

  function render() {
    renderer.render(scene,camera);
    requestAnimationFrame(render);
  }

  render();

  // 立方体世界坐标转屏幕坐标
  const worldVector = new THREE.Vector3();
  boxMesh.getWorldPosition(worldVector);

  //网格模型在threejs三维空间的世界坐标
  const worldVector1 = boxMesh.position.clone();
  const standardVector = worldVector1.project(camera);

  const a = window.innerWidth / 2;
  const b = window.innerHeight / 2;
  const x = Math.round(standardVector.x * a + a);
  const y = Math.round(-standardVector.y * b + b);


// 创建div
const div = document.createElement('div');
div.innerHTML = '立方体';
div.style.padding = '10px';
div.style.color = '#fff';
div.style.position = 'absolute';
div.style.backgroundColor = 'rgba(25,25,25,0.5)';
div.style.borderRadius = '5px';
document.body.appendChild(div);

div.style.left = x + 'px';
div.style.top = y - 130 + 'px';



