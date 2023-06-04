
// uniform float uWaresFrequency;
// uniform float uScale;

varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    vec4 viewPosition = viewMatrix * modelPosition;


    // float elevation = sin(modelPosition.x * uWaresFrequency) * uScale;
    // modelPosition.y += elevation;

    gl_Position = viewMatrix * modelPosition;
    gl_PointSize = 80.0;

    vUv = uv;
    
}