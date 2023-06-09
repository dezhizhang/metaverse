varying vec2 vUv;

uniform sampler2D uTexture;


void main() {
    //gl_FragColor = vec4(gl_PointCoord,0.0,1.0);

    // 设置圆
    // float strength = distance(gl_PointCoord,vec2(0.5));
    // gl_FragColor = vec4(strength);

    // float strength = distance(gl_PointCoord,vec2(0.5));
    // gl_FragColor = vec4(strength);
    

    // 根据纹理设置图案
    vec4 textureColor = texture2D(uTexture,gl_PointCoord);
    // gl_FragColor =vec4(textureColor.rgb,textureColor.r);

    // 设置采样

    gl_FragColor = vec4(gl_PointCoord,1.0,textureColor.r);







}