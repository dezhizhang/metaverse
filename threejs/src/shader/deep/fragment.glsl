precision lowp float;
varying vec2 vuv;

void main() {
	// float strength = min(abs(vuv.x - 0.5),abs(vuv.y - 0.5));

	// 最大值
	// float strength = max(abs(vuv.x - 0.5),abs(vuv.y - 0.5));

	// 中间值
	// float strength = step(0.2,max(abs(vuv.x - 0.5),abs(vuv.y - 0.5)));

	// 利用取整，实现条纹渐变
	// float strength = floor(vuv.x * 10.0) / 10.0;

	// // 条纹相乖实现渐变格子
	// float strength = floor(vuv.x * 10.0) / 10.0 * floor(vuv.y * 10.0) / 10.0;

	// gl_FragColor = vec4(strength,strength,strength,1.0);

	// length 返回向量的长度
	float strength = length(vuv);
	gl_FragColor = vec4(strength,strength,strength,1.0);
}