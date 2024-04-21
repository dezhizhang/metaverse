
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
### 添加模型
```ts
const airplane = viewer.entities.add({
  name:'Airplane',
  position:Cesium.Cartesian3.fromDegrees(
    113.3191, 23.109, 1500
  ),
  model:{
    uri:'/public/Air.glb',
    minimumPixelSize:128,
  }
}) 

```
### 自定义几何体
```ts
const rectGeometry = new Cesium.RectangleGeometry({
  rectangle: Cesium.Rectangle.fromDegrees(115, 20, 135, 30),
  height: 0,
  extrudedHeight:10,
  vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
});

const instance = new Cesium.GeometryInstance({
  geometry: rectGeometry,
  attributes: {
    color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED.withAlpha(0.5)),
  },
});

const primitive = new Cesium.Primitive({
  geometryInstances:instance,
  appearance:new Cesium.PerInstanceColorAppearance({
    flat:true
  })
});

viewer.scene.primitives.add(primitive);
```
### 添加鼠标点击事件

```ts
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function(movement) {
  console.log(movement);
  const pickedObject = viewer.scene.pick(movement.position);
  if(Cesium.defined(pickedObject)) {
    console.log(pickedObject.id);
  }
},Cesium.ScreenSpaceEventType.LEFT_CLICK)

```

### 加载geojson数据
```ts
const url = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'

const dataJson = await Cesium.GeoJsonDataSource.load(url,{
  stroke:Cesium.Color.RED,
  fill:Cesium.Color.SKYBLUE.withAlpha(0.5),
  strokeWidth:4,
});


viewer.dataSources.add(dataJson);


const entities = dataJson.entities.values;

entities.forEach((entity) => {
  entity.polygon.material = new Cesium.ColorMaterialProperty(
    Cesium.Color.fromRandom({
      alpha:0.9,
    }),
    entity.polygon.extrudedHeight = 200000
  )
});


```
### 飞机线
```ts
const positionProperty = new Cesium.SampledPositionProperty();

// 时间间隔
const timeStepInSeconds = 30;

// 整个飞行时间
const totalSecond = (planeJson.length - 1) * timeStepInSeconds;

const time = new Date();

// 起点时间
const startJulianData = Cesium.JulianDate.fromDate(time);
// 终点时间
const endJullianData = Cesium.JulianDate.fromDate(
  startJulianData,
  totalSecond,
  new Cesium.JulianDate(),
);

viewer.clock.startTime = startJulianData.clone();
viewer.clock.startTime = endJullianData.clone();
viewer.clock.currentTime = startJulianData.clone();

viewer.timeline.zoomTo(startJulianData, endJullianData);

planeJson.forEach((data, index) => {
  const time = Cesium.JulianDate.addSeconds(
    startJulianData,
    index * timeStepInSeconds,
    new Cesium.JulianDate(),
  );

  const position = Cesium.Cartesian3.fromDegrees(data.longitude, data.latitude, data.height);

  positionProperty.addSample(time, position);

  viewer.entities.add({
    position,
    point: {
      pixelSize: 10,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2,
    },
  });

  const planeEntity = viewer.entities.add({
    name: '飞机',
    position: positionProperty,
    orientation: new Cesium.VelocityOrientationProperty(positionProperty),
    model: {
      uri: '/public/Air.glb',
      minimumPixelSize: 128,
      maximumScale: 20000,
    },
    path: new Cesium.PathGraphics({
      width: 5,
    }),
  });
});

const osmBuildings = viewer.scene.primitives.add(new Cesium.createOsmBuildings());
```

