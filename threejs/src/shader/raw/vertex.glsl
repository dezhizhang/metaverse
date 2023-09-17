
attribute vec3 position;

attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;


varying vec2 vuv;

void main() {
	vuv = uv;
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0);
}