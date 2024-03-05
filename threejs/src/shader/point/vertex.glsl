precision mediump float;
attribute float imgIndex;
attribute float uTime;
attribute float aScale;

varying float vImgIndex;
void main() {
	vImgIndex = imgIndex;

	vec4 modelPosition = modelMatrix * vec4(position,1.0);
	
	float angle = atan(modelPosition.x,modelPosition.z);

	// 获取顶点到中心的距离
	float distanceToCenter = length(modelPosition.xz);
	
	float angleOffset = 1.0 / distanceToCenter * uTime;

	angle += angleOffset;

	modelPosition.x = cos(angle) * distanceToCenter;
	modelPosition.z = sin(angle) * distanceToCenter;


	vec4 viewPosition = viewMatrix * modelPosition;
	gl_Position = projectionMatrix * viewPosition;

	gl_PointSize = 200.0 / -viewPosition.z * aScale;


}