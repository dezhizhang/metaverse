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
### Raycaster
```js

window.addEventListener('click',(event) => {
  const sx = event.clientX;
  const sy = event.clientY;

  const x = (sx / window.innerWidth) * 2 - 1;
  const y = -(sy / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x,y),camera);

  const intersects = raycaster.intersectObjects(granaryArr);
  console.log(intersects)
  if(intersects.length) {
    intersects[0].object.material.transparent = true;
    intersects[0].object.material.opacity = 0.6;
  }
  
})


```
