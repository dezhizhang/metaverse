const FRAG_SHADER = `
    precision mediump float;
    varying vec2 v_uv;
    void main() {
        gl_FragColor = vec4(v_uv,0.0,1.0);
    }
`;

export default FRAG_SHADER;

