precision lowp float;

attribute vec2 uv;
attribute vec3 position;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;


void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix *  vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}