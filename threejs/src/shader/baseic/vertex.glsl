precision mediump float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;

varying vec2 vUv;

void main() {
	vUv = uv;
	gl_Position = modelMatrix * projectionMatrix * viewMatrix * vec4(position,1.0);
}
