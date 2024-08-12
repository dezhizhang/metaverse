// 顶点着色器
const vertex = /*wgsl*/ `
@group(0) @binding(0) var<uniform> S:mat4x4<f32>;
@vertex
fn main(@location(0) pos:vec3<f32>) -> @builtin(position) vec4<f32> {
    // var s = mat4x4<f32>(
    //     0.5,0.0,0.0,0.0,
    //     0.0,0.5,0.0,0.0, 
    //     0.0,0.0,1.0,0.0,
    //     0.0,0.0,0.0,1.0
    // );

    return vec4<f32>(pos,1.0) * S;
}
`

const fragment = /*wgsl*/`
@fragment
fn main(@builtin(position) fragCoord:vec4<f32>) ->@location(0) vec4<f32>{
    var x = fragCoord.x;
    var y = fragCoord.y;
    return vec4<f32>(x,y,0.0,1.0);
}
`


export { vertex, fragment };
