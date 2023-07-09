const VERTEX_SHADER =  /* glsl */`
    precision mediump float;
    attribute vec3 a_position;
    attribute vec3 a_color;
    varying vec3 v_color;
    void main() {
        v_color = a_color;
        gl_Position = vec4(a_position,1.0);
        gl_PointSize = 10.0;
    }
`;

export default VERTEX_SHADER;


