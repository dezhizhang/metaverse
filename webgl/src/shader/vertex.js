const VERTEX_SHADER =  /* glsl */`
    precision mediump float;
    attribute vec3 a_position;
    attribute vec2 a_uv;
    varying vec2 v_uv;
    void main() {
        v_uv = a_uv;
        gl_Position = vec4(a_position,1.0);
        gl_PointSize = 10.0;
    }
`;

export default VERTEX_SHADER;


