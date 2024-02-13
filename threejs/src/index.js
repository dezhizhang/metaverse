import * as THREE from 'three';
    import { scene, renderer, camera } from './scene.js'
    //Three.js渲染结果Canvas画布插入到body元素中
    document.body.appendChild(renderer.domElement);
    import { createSphereMesh } from './earth.js'//绘制地球
    import { countryLine } from './line.js';//绘制地球国家边界线
    import { createPointMesh } from './pointMesh.js';//标注某地点

    var R = 100;//地球半径
    // 郑州经纬度坐标：113.4668, 33.8818
    scene.add(createPointMesh(R, 113.4668, 33.8818));

    var earthMesh = createSphereMesh(R);// 创建地球mesh
    scene.add(earthMesh);//地球Mesh插入场景中

    // R * 1.001比地球R稍大，以免深度冲突
    scene.add(countryLine(R * 1.001));//国家边界集合插入场景中

    // 渲染循环
    function render() {
      renderer.render(scene, camera); //执行渲染操作
      requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
      // console.log(camera.position);
    }
    render();