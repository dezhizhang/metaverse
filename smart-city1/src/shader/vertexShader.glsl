attribute float aSize;
varying float  vSize;

void main() {

    vec4 viewPosition = viewMatrix * modelMatrix * vec4(position,1.0);
    gl_Position = projectionMatrix *  viewPosition;

    float vSize =  (aSize - 500.0) * 0.01;

    gl_PointSize = vSize;

}