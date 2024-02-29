precision mediump float;
varying vec2 vUv;

void main() {
	// gl_FragColor = vec4(vUv,0.0,1.0);

	// gl_FragColor = vec4(vUv,1.0,1.0);

	// 利用uv实现渐变 从左到右
	// gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);

	// 利用uv实现渐变 从下到上
	// float strength = 1.0 - vUv.y;
	// gl_FragColor = vec4(strength, strength, strength, 1.0);

	// float strength = 1.0 - vUv.y;
	// gl_FragColor = vec4(strength,strength,strength,1.0);

	// 短范围内渐变
	// float strength = vUv.y * 2.0;
	// gl_FragColor = vec4(strength,strength,strength,1.0);

	// 反复渐变
	// float strength = mod(vUv.y * 10.0,1.0);
	// gl_FragColor = vec4(strength,strength,strength,1.0);

	// 斑码条斑
	// float strength = mod(vUv.y * 10.0,1.0);
	// strength = step(0.8,strength);
	// gl_FragColor = vec4(strength,strength,strength,1.0);

	// float strength = mod(vUv.x * 10.0,1.0);
	// strength = step(0.8,strength);

	// gl_FragColor = vec4(strength,strength,strength,1.0);

	// 利用绝对值境像渐变
	// float strength = abs(vUv.x - 0.5);
	// gl_FragColor = vec4(strength, strength, strength, 1.0);

	// float strength = abs(vUv.y - 0.5);
	// gl_FragColor = vec4(strength,strength,strength,1.0);

	// 利于最小值
	// float strength = min(abs(vUv.x - 0.5),abs(vUv.y - 0.5));
	// gl_FragColor = vec4(strength,strength,strength,1.0);

	// 利用最大值
	// float strength = max(abs(vUv.x - 0.5),abs(vUv.y - 0.5));
	// gl_FragColor = vec4(strength,strength,strength,1.0);

	// float strength = 1.0 - step(0.2,max(abs(vUv.x - 0.5),abs(vUv.y - 0.5)));
	// gl_FragColor = vec4(strength,strength,strength,1.0);

	// 利用向下取整
	// float strength = floor(vUv.y * 10.0) / 10.0;
	// gl_FragColor = vec4(strength,strength,strength,1.0);

	// float strength = (floor(vUv.x * 10.0) / 10.0) * (floor(vUv.y * 10.0) / 10.0);
	// gl_FragColor = vec4(strength,strength,strength,1.0);


	// float strength = length(vUv);
	// gl_FragColor = vec4(strength,strength,strength,1.0);


	// float strength = 1.0 -  distance(vUv,vec2(0.5,0.5));
	// gl_FragColor = vec4(strength,strength,strength,1.0);

	// float strength = 0.15 / distance(vUv,vec2(0.5,0.5)) - 1.0;
	// gl_FragColor = vec4(strength,strength,strength,strength);

	// float strength = 0.15 / distance(vec2(vUv.x,(vUv.y - 0.5) * 0.5),vec2(0.5,0.5)) - 1.0;
	
	// gl_FragColor = vec4(strength,strength,strength,1.0);

	// float strength = 0.15 / distance(vec2(vUv.x,vUv.y),vec2(0.5,0.5)) - 1.0;
	// gl_FragColor = vec4(strength,strength,strength,strength);


	// float strength = distance(vUv,vec2(0.5,0.5));
	// gl_FragColor = vec4(strength,strength,strength,1.0);





}