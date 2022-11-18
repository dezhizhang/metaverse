
### 相机的基础设置
```js

viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(116.39,39.9,150),
    orientation:{
        heading:Cesium.Math.toRadians(0.0),
        pitch:Cesium.Math.toRadians(0),
        roll:0
    }
})

```
### 通过按钮移动相机

```js
// 通过按钮移动相机
document.addEventListener('keydown',(ev) => {
    const height = viewer.camera.positionCartographic.height;
    if(ev.key == 'w') {
        viewer.camera.moveForward(10)
    }else if(ev.key == 's') {
        viewer.camera.moveBackward(10)
    }else if(ev.key == 'a') {
        viewer.camera.moveLeft(10)
    }else if(ev.key == 'q') {
        viewer.camera.moveUp(10)
    }
})
```