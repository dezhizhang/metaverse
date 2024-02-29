precision mediump float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;

varying vec2 vUv;

// 获取时间
uniform float uTime;

void main() {
	vUv = uv;
	vec4 modelPosition = modelMatrix * vec4(position,1.0);
	modelPosition.z = sin((modelPosition.x + uTime) * 10.0) * 0.1;
	modelPosition.y += sin((modelPosition.x + uTime) * 10.0)* 0.1;

	gl_Position =  projectionMatrix * viewMatrix * modelPosition;
}