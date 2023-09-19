
uniform sampler2D uTexture;
void main() {

	//渐变圆
	// float strength = distance(gl_PointCoord,vec2(0.5));
	// strength *= 2.0;
	// strength = 1.0 - strength;
	// // strength = step(0.5,strength);
	// gl_FragColor = vec4(strength);

	// 根据纹理设置图案
	vec4 textureColor = texture2D(uTexture,gl_PointCoord);
	gl_FragColor = textureColor;

}