void main() {
	gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position,1.0);
	gl_PointSize = 40.0;
}