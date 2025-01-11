import * as THREE from 'three';

// 创建场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a); // 设置背景颜色

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 创建 WebGL 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建平面几何体
const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);

// 顶点着色器
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// 修复后的片段着色器
const fragmentShader = `
  #define PI 3.1415926535
  uniform float iTime;
  uniform vec2 iResolution;

  varying vec2 vUv;

  float TK = 1.0;

  vec2 rot(vec2 p,float r){
    mat2 m = mat2(cos(r), sin(r), -sin(r), cos(r));
    return m * p;
  }

  vec2 pmod(vec2 p, float n){
    float np = 2.0 * PI / n;
    float r = atan(p.x, p.y) - 0.5 * np;
    r = mod(r, np) - 0.5 * np;
    return length(p) * vec2(cos(r), sin(r));
  }

  float cube(vec3 p, vec3 s){
    vec3 q = abs(p);
    vec3 m = max(s - q, 0.0);
    return length(max(q - s, 0.0)) - min(min(m.x, m.y), m.z);
  }

  float dist(vec3 p){
    p.z -= 1.0 * TK * iTime;
    p.xy = rot(p.xy, 1.0 * p.z);
    p.xy = pmod(p.xy, 6.0);
    float k = 0.7;
    float zid = floor(p.z * k);
    p = mod(p, k) - 0.5 * k;

    for(int i = 0; i < 4; i++){
      p = abs(p) - 0.3;
      p.xy = rot(p.xy, 1.0 + zid + 0.1 * TK * iTime);
      p.xz = rot(p.xz, 1.0 + 4.7 * zid + 0.3 * TK * iTime);
    }
    return min(cube(p, vec3(0.3)), length(p) - 0.4);
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.y *= iResolution.y / iResolution.x;
    uv = rot(uv, TK * iTime);

    vec3 ro = vec3(0.0, 0.0, 0.1);
    vec3 rd = normalize(vec3(uv, 0.0) - ro);
    float t = 2.0;
    float d = 0.0;
    float ac = 0.0;

    for(int i = 0; i < 66; i++) {
      d = dist(ro + rd * t) * 0.2;
      d = max(0.0000, abs(d));
      t += d;
      if(d < 0.001) ac += 0.1;
    }

    vec3 col = vec3(0.0);
    col = vec3(0.1, 0.7, 0.7) * 0.2 * vec3(ac);

    vec3 pn = ro + rd * t;
    float kn = 0.5;
    pn.z += -1.5 * iTime * TK;
    pn.z = mod(pn.z, kn) - 0.5 * kn;
    float em = clamp(0.01 / pn.z, 0.0, 100.0);
    col += 3.0 * em * vec3(0.1, 1.0, 0.1);
    col = clamp(col, 0.0, 1.0);

    gl_FragColor = vec4(col, 1.0);
  }
`;

// 创建 ShaderMaterial
const material = new THREE.ShaderMaterial({
  uniforms: {
    iTime: { value: 0.0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true, // 确保透明度正确处理
  depthWrite: false, // 禁用深度写入，避免 Z-fighting
  depthTest: true     // 启用深度测试
});

// 创建网格并添加到场景
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// 创建动画循环
function animate() {
  requestAnimationFrame(animate);

  // 更新时间
  material.uniforms.iTime.value += 0.01;

  // 渲染场景
  renderer.render(scene, camera);
}

// 调整渲染器大小
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  material.uniforms.iResolution.value.x = window.innerWidth;
  material.uniforms.iResolution.value.y = window.innerHeight;
});

// 启动动画循环
animate();
