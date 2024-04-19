
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