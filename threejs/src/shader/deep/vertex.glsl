
varying vec2 vuv;

void main() {
	vuv = uv;
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0);
}