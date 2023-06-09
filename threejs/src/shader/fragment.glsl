varying vec2 vUv;

void main() {
    //gl_FragColor = vec4(gl_PointCoord,0.0,1.0);

    // 设置圆
    // float strength = distance(gl_PointCoord,vec2(0.5));
    // gl_FragColor = vec4(strength);

    float strength = distance(gl_PointCoord,vec2(0.5));
    gl_FragColor = vec4(strength);
    


}