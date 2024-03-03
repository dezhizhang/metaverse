precision mediump float;

uniform float uWaresFrequency;
uniform float uScale;

// 计算出的高度传给片元着钯器
varying float vElevation;



void main() {
	vec4 modelPosition = modelMatrix * vec4(position,1.0);

	float elevation = sin(modelPosition.x * 10.0 * uWaresFrequency) * sin(modelPosition.z * uWaresFrequency);

	elevation *= uScale;

	vElevation = elevation;

	modelPosition.y += elevation;

	gl_Position = projectionMatrix * viewMatrix * modelPosition;
}