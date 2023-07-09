/*
 * :file description: 
 * :name: /webgl/src/shader/frag.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-18 21:30:10
 */
const FRAG_SHADER = /* glsl */ `
    precision mediump float;
    varying vec3 v_color;
    void main() {
        gl_FragColor = vec4(v_color,1.0);
    }
`;


export default FRAG_SHADER;
