/*
 * :file description: 
 * :name: /webgl/src/shader/frag.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-03-13 05:58:33
 * :last editor: 张德志
 * :date last edited: 2023-06-18 20:29:36
 */
const FRAG_SHADER = /* glsl */ `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
`;


export default FRAG_SHADER;
