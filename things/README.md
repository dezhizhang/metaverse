# 物联网项目

### 批量修改材质
```js
gltfLoader.load(`${baseUrl}/model/factory.glb`, (gltf) => {
  gltf.scene.traverse(function(object) {
    if(object.type === 'Mesh') {
      object.material = new THREE.MeshLambertMaterial({
        map:object.material.map,
        color:object.material.color,
        // side:THREE.DoubleSide,
        depthTest:true
      })
    }
  })
  scene.add(gltf.scene);
});
```
### 设置雾化
```js
scene.fog = new THREE.Fog(0x005577,-100,1000);
renderer.setClearColor(0x005577,1);
```
