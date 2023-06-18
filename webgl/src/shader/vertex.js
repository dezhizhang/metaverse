const VERTEX_SHADER =  /* glsl */`
    precision mediump float;
    attribute vec3 a_position;
    uniform mat4 u_rotateMatrix;
    void main() {
        gl_Position = u_rotateMatrix * vec4(a_position,1.0);
        gl_PointSize = 10.0;
    }
`;

export default VERTEX_SHADER;


