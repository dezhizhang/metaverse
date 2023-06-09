void main() {
    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    vec4 viewPosition = viewMatrix * modelPosition;

    gl_Position = projectionMatrix  * viewPosition;

    // 设置点的大小
    gl_PointSize = 20.0;

}