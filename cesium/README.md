
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
### 添加Cesium3DTileset

```ts
const osmBuildings = viewer.scene.primitives.add(
  new Cesium.createOsmBuildings()
);

const tileset = new Cesium.Cesium3DTileset({
  url:'/public/tileset.json'
});

tileset.readyPromise.then(function(tileset) {
  viewer.zoomTo(tileset)
})

viewer.scene.primitives.add(tileset);

```
### CesiumNavigation的使用

```bash
npm install cesium-navigation-es6 --save
```

```ts
import CesiumNavigation from 'cesium-navigation-es6';

// 初始化导航罗盘
const navigation = new CesiumNavigation(viewer, {
  // 是否启用罗盘
  enableCompass: true,
  // 是否启用缩放
  enableZoomControls: true,
  // 是否启用指南针外环
  enableCompassOuterRing: true,
  // 是否启用图例
  enableDistanceLegend: false,
});

```
### 坐标转换
```ts
// 角度与孤度的转换
const radians = Cesium.Math.toRadians(90);
console.log(radians);

// 孤度转角度
const degrees = Cesium.Math.toDegrees(Math.PI * 2);
console.log(degrees);

// 将经纬度转换成卡尔坐标
const cartesian3 = Cesium.Cartesian3.fromDegrees(
  // 经度
  89.5, 
  // 纬度
  20.4,
  // 高度
  100,
);


const cartographic = Cesium.Cartographic.fromCartesian(cartesian3);

console.log('cartographic',cartographic);
```
### 加载高德地图数据
```ts
function loadGaodeMap(){
  // 添加高德影像图
  let imgLayer = new Cesium.UrlTemplateImageryProvider({
     url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
     layer: "imgLayer",
     minimumLevel: 3,
     maximumLevel: 18
  });
  viewer.imageryLayers.addImageryProvider(imgLayer);
  
  
  // 影像注记
  let annoLayer = new Cesium.UrlTemplateImageryProvider({
    url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
    layer: "annoLayer",
    style: "default",
    //format: "image/jpeg",
    //tileMatrixSetID: "GoogleMapsCompatible"
  });
  viewer.imageryLayers.addImageryProvider(annoLayer);
}

```
### 设置相机
```ts
viewer.camera.setView({
  destination:Cesium.Cartesian3.fromDegrees(
    116.397428, 39.90923, 100
  ),
  orientation:{
    heading:Cesium.Math.toRadians(0),
    pitch:Cesium.Math.toRadians(-90),
    roll:0 
  }
})

```

### 加载天地图
```ts

function loadTdtMap(){
  //天地图token
  var tk = "d53ca517a1b035796b7b6cc4f527f845";
  //天地图影像
  var imgUrl = "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk="+tk;

  //中文标注
  var ciaUrl = "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk="+tk;
  //调用影响中文注记服务
  let imgLayer = new Cesium.WebMapTileServiceImageryProvider({
    url: imgUrl,
    layer: "imgLayer",
    minimumLevel: 0,
    maximumLevel: 18,
  });
  
  viewer.imageryLayers.addImageryProvider(imgLayer);
  
  //中文注记服务
  let annoLayer = new Cesium.WebMapTileServiceImageryProvider({ 
    url: ciaUrl,
    layer: "annoLayer",
    minimumLevel: 0,
    maximumLevel: 18,
  });
  viewer.imageryLayers.addImageryProvider(annoLayer);
}
```
### 添加标签
```ts
const label = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(113.3191, 23.109, 610),
  label: {
    text: '广州塔',
    font: '24px sans-serif',
    fillColor: Cesium.Color.WHITE,
    outlineWidth: Cesium.Color.BLACK,
    outlineWidth: 4,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    pixelOffset: new Cesium.Cartesian2(0, -24),
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  },
});

```
### 创建几何体
```ts
// 创建几何体
const rectangle = viewer.entities.add({
  rectangle: {
    coordinates: Cesium.Rectangle.fromDegrees(90, 20, 110, 30),
    material: Cesium.Color.RED.withAlpha(0.5),
  },
});

```


### 自定义几何体
```ts
const rectGeometry = new Cesium.RectangleGeometry({
  rectangle:Cesium.Rectangle.fromDegrees(
    115,
    20,
    135,
    30
  ),
  height:20000,
  vertexFormat:Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
});

// 创建几何体实例
const instance = new Cesium.GeometryInstance({
  geometry:rectGeometry,
  attributes:{
    color:Cesium.ColorGeometryInstanceAttribute.fromColor(
      Cesium.Color.RED.withAlpha(0.5)
    )
  }
});

// 图元
const primitives = new Cesium.Primitive({
  geometryInstances:instance,
  appearance:new Cesium.PerInstanceColorAppearance({
    flat:true
  })
});

viewer.scene.primitives.add(primitives);

```
### cesium添加材质
```ts
const material =new Cesium.ColorMaterialProperty(
  new Cesium.Color(1.0,1.0,1.0,1.0)
)
```
### 设置线和线的颜色
```ts
const material = new Cesium.PolylineDashMaterialProperty({
  dashLength: 16,
  color: Cesium.Color.RED,
});

const redLine = viewer.entities.add({
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
    width: 5,
    material,
  },
});
```

### 剪头材质
```ts
const material = new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED);

const redLine = viewer.entities.add({
  polyline:{
    positions:Cesium.Cartesian3.fromDegreesArray([
      -75,35,-125,35
    ]),
    width:5,
    material,
  }
});
```

### 发光材质
```ts
const material = new Cesium.PolylineGlowMaterialProperty({
  glowPower:0.1,
  taperPower:0.7,
  color:Cesium.Color.RED
});

const redLine = viewer.entities.add({
  polyline:{
    positions:Cesium.Cartesian3.fromDegreesArray([
      -75,35,-125,35,
    ]),
    material,
    width:20,
  }
})
```

### 图片材质
```ts
const material = new Cesium.Material.fromType('Image',{
  image:'/public/LaunchPad.png',
  repeat:new Cesium.Cartesian3(1.0,1.0)
});

const appearance = new Cesium.MaterialAppearance({
  material
});

const rectGeometry = new Cesium.RectangleGeometry({
  rectangle:Cesium.Rectangle.fromDegrees(
    115,
    20,
    135,
    30
  ),
  height:20000,
  vertexFormat:Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
});

// 创建几何体实例
const instance = new Cesium.GeometryInstance({
  geometry:rectGeometry,
  attributes:{
    color:Cesium.ColorGeometryInstanceAttribute.fromColor(
      Cesium.Color.RED.withAlpha(0.5)
    )
  }
});

// 图元
const primitives = new Cesium.Primitive({
  geometryInstances:instance,
  appearance,
});

viewer.scene.primitives.add(primitives);
```

### fabric
```ts
const material = new Cesium.Material({
  fabric:{
    type:'Color',
    uniforms:{
      color:new Cesium.Color(1.0,0.0,0.0,1.0)
    }
  }
})

```
### 自定义cesium差色器
```ts
const material = new Cesium.Material({
  fabric:{
    uniforms:{
      // color:new Cesium.Color(1.0,0.0,0.0,1.0)
    },
    source:`
    czm_material czm_getMaterial(czm_materialInput materialInput)
      {
        czm_material material = czm_getDefaultMaterial(materialInput);
        material.diffuse = vec3(1.0,0.0,0.0); 
        return material;
      }
    `
  }
});
```
### 加载geoJson数据
```ts
const jsonData = await Cesium.GeoJsonDataSource.load('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',{
  stroke:Cesium.Color.RED,
  fill:Cesium.Color.BLUE,
  strokeWidth:2,
});
viewer.dataSources.add(jsonData);

```

### 修改geoJson样式
```ts

const url = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json';

const jsonData = await Cesium.GeoJsonDataSource.load(url, {
  stroke: Cesium.Color.RED,
  fill: Cesium.Color.BLUE,
  strokeWidth: 4,
});



const entities = jsonData.entities.values;

entities.forEach((entity) => {
  entity.polygon.material = new Cesium.ColorMaterialProperty(
    Cesium.Color.fromRandom({
      alpha:0.9
    })
  ),
  entity.polygon.outline = false;
  entity.polygon.extrudedHeight = 100000;
})

```
### 添加水流动
```ts
const viewer = new Cesium.Viewer('root', {
  terrainProvider: Cesium.createWorldTerrain({
    requestWaterMask: true,
  }),
});

```
### 坐标转换
```js

const viewer = new Cesium.Viewer('root', {
  terrainProvider: Cesium.createWorldTerrain({
    requestWaterMask: true,
  }),
});

// const cartesian3 = Cesium.Cartesian3.fromDegrees(110,20,20);
// console.log('cartesian3',cartesian3);

// 经纬度转笛卡尔坐标
const cartesian3 = Cesium.Cartesian3.fromDegrees(110,20,30);
// 笛卡尔坐标转经纬度
const cartographic = Cesium.Cartographic.fromCartesian(cartesian3);

const lon = Cesium.Math.toDegrees(cartographic.longitude);
const lat = Cesium.Math.toDegrees(cartographic.latitude);


console.log({lon,lat});

```
### lookAt坐标看像
```ts
const position = Cesium.Cartesian3.fromDegrees(110,20);
viewer.camera.lookAt(
  position,
  new Cesium.HeadingPitchRange(
    Cesium.Math.toRadians(0),
    Cesium.Math.toRadians(-90),
    20000
  )
)

```
### 绘制点
```js
const point = viewer.entities.add({
  id:'point',
  position:Cesium.Cartesian3.fromDegrees(121,30),
  point:{
    pixelSize:20,
    color:Cesium.Color.YELLOW,
  }
});

viewer.zoomTo(point);
```
### 添加标注
```ts
const billboard = viewer.entities.add({
  position:Cesium.Cartesian3.fromDegrees(116,30,30),
  billboard:{
    image:'/LaserStation.png',
    color:Cesium.Color.YELLOW
  }
});

viewer.zoomTo(billboard);


```
### 添加文字
```ts
const label = viewer.entities.add({
  position:Cesium.Cartesian3.fromDegrees(120,30,30),
  label:{
    text:'hello world',
    fillColor:Cesium.Color.YELLOW,
    showBackground:true,
    backgroundColor:Cesium.Color.RED,
  }
});

viewer.zoomTo(label)

```