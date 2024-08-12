// 顶点着色器
const vertex = /*wgsl*/ `

struct Out{
    @builtin(position) position:vec4<f32>,
    @location(0) vColor:vec3<f32>
}
@vertex
fn main(@location(0) pos:vec3<f32>,@location(1) color:vec3<f32>) -> Out {
    var out:Out;
    out.position = vec4<f32>(pos,1.0);
    // 插值计算生成每个片元对应的xyz坐标
    out.vColor = pos;
    return out;
}
`


const fragment = /*wgsl*/`
@fragment
fn main(@location(0) vColor:vec3<f32>) -> @location(0) vec4<f32>{
    return vec4<f32>(vColor,1.0);
}
`


export { vertex, fragment };
