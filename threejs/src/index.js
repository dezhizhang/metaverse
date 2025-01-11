import * as THREE from 'three';

// Vertex shader (basic for a full-screen quad)
const vertexShader = `
  void main() {
    gl_Position = vec4( position, 1.0 );
  }
`;

// Fragment shader (converted GLSL code)
const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;
  
  void mainImage( out vec4 fragColor, in vec2 fragCoord ){
    vec2 uv =  (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
   
    for(float i = 1.0; i < 8.0; i++){
      uv.y += i * 0.1 / i * 
        sin(uv.x * i * i + iTime * 0.5) * sin(uv.y * i * i + iTime * 0.5);
    }
    
    vec3 col;
    col.r  = uv.y - 0.1;
    col.g = uv.y + 0.3;
    col.b = uv.y + 0.95;
    
    fragColor = vec4(col,1.0);
  }

  void main() {
    vec4 fragColor;
    mainImage(fragColor, gl_FragCoord.xy);
    gl_FragColor = fragColor;
  }
`;

// Setup the Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometry (a fullscreen quad)
const geometry = new THREE.PlaneGeometry(2, 2);

// Material using the custom shader
const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  },
});

// Fullscreen plane mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera setup (pointing at the center of the scene)
camera.position.z = 1;

// Animation loop
function animate(time) {
  material.uniforms.iTime.value = time * 0.001; // time in seconds
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
