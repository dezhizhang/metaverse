
# cesium
### 视图展示
```ts
const viewer = new Cesium.Viewer("root",{
  // 是否显示信息窗口
  infoBox:false,
  // 是否显示查询按钮
  geocoder:false,
  // 不显示home按钮
  homeButton:false,
  // 控制查看器显示模式
  sceneModePicker:false,
  // 是否显示图层按钮
  baseLayerPicker:false,
  // 是否显不帮助
  navigationHelpButton:false,
  // 是否显示动画
  animation:false,
  // 是否显示全屏按钮
  timeline:false,
});

```

### skyBox 查看天空盒
```js
import * as Cesium from 'cesium';


// const atLayer = new Cesium.UrlTemplateImageryProvider({
//     url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
//     minimumLevel: 3,
//     maximumLevel: 18
// })

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NWVlNTI2MC00YTViLTQzZjYtOGMxNy1lYTAxMDVkMTMwNTQiLCJpZCI6MTA3NjIxLCJpYXQiOjE2NjI3OTY2ODR9.9Amu-saGmeaPMMt9LE5MjF0FQcoC3toDrxCo_J4ItAg';
// An example of using a b3dm tileset to classify another b3dm tileset.
const viewer = new Cesium.Viewer("root",{
  // 是否显示信息窗口
  infoBox:false,
  // 是否显示查询按钮
  geocoder:false,
  // 不显示home按钮
  homeButton:false,
  // 控制查看器显示模式
  sceneModePicker:false,
  // 是否显示图层按钮
  baseLayerPicker:false,
  // 是否显不帮助
  navigationHelpButton:false,
  // 是否显示动画
  animation:false,
  // 是否显示全屏按钮
  timeline:false,
  skyBox:new Cesium.SkyBox({
    sources:{
      positiveX:'/texture/sky/px.jpg',
      negativeX:'/texture/sky/nx.jpg',
      positiveY:'/texture/sky/ny.jpg',
      negativeY:'/texture/sky/py.jpg',
      positiveZ:'/texture/sky/pz.jpg',
      negativeZ:'/texture/sky/nz.jpg',
    }
  }),
});

Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  89.5,
  20.4,
  110.4,
  61.2,
)

```

### 相机的设置
```ts
viewer.camera.setView({
  // 指定相机位置
  destination: position,
  orientation: {
    heading: Cesium.Math.toRadians(90),
    pitch: Cesium.Math.toRadians(-90),
    roll: 0,
  },
});

```
### flyTo 相机飞向某个地方
```ts
viewer.camera.flyTo({
  // 指定相机位置
  destination: position,
  orientation: {
    heading: Cesium.Math.toRadians(90),
    pitch: Cesium.Math.toRadians(-90),
    roll: 0,
  },
});
```

### 交互相机
```ts
document.addEventListener('keydown', (ev) => {
  const height = viewer.camera.positionCartographic.height;
  const moveRate = height / 100;
  console.log('ev',ev)
  if (ev.key === 'w') {
    viewer.camera.moveForward(moveRate);
  } else if (ev.key == 's') {
    viewer.camera.moveBackward(moveRate);
  } else if (ev.key == 'a') {
    viewer.camera.moveLeft(moveRate);
  } else if (ev.key == 'd') {
    viewer.camera.moveRight(moveRate);
  }
});
```
### 添加点
```ts
const point = viewer.entities.add({
  position:  Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 20),
  point: {
    pixelSize:10,
    color:Cesium.Color.RED,
    outlineColor:Cesium.Color.WHEAT,
    outlineWidth:4,
  },
});

```
### 添加3d建筑物
```ts
const osmBuildings = viewer.scene.primitives.add(
  new Cesium.createOsmBuildings()
)

```
### 添加标签
```ts

const label = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 700),
  label: {
    text: '广州塔',
    font: '24px 微软雅黑',
    fillColor: Cesium.Color.WHEAT,
    outlineColor: Cesium.Color.BLACK,
    outlineWidth: 2,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    pixelOffset: new Cesium.Cartesian2(0, -24),
    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  },
});

```