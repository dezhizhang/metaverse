# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

### tiles3d 模型数据加载
```ts
const tileset = new Cesium.Cesium3DTileset({
    url:'/tileset.json'
});
viewer.scene.primitives.add(tileset);

tileset.readyPromise.then((title) => {å
    viewer.zoomTo(title);
})
```
### tiles3d 条件渲染
```ts
tiles3d.style = new Cesium.Cesium3DTileStyle({
    color:{
        conditions:[
          ["${feature['name']} === '广州塔'","color('yellow')"]
        ]
    }
});

```
### 鼠标事件
```ts

const tileset = new Cesium.Cesium3DTileset({
  url: '/tileset.json',
});

tileset.readyPromise.then((tile) => {
  viewer.zoomTo(tile);
});

viewer.scene.primitives.add(tileset);

   
let selectedFeature: any;

const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

handler.setInputAction((movement) => {
  if (selectedFeature) {
    selectedFeature.color = Cesium.Color.WHITE;
  }

  selectedFeature = viewer.scene.pick(movement.position);
  if (!selectedFeature) return;

  selectedFeature.color = Cesium.Color.AQUA;
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```
### 加载面数据
```ts

const polygon = turf.polygon(
  [
    [
        [108,34],
            [108,34.5],
            [109,34.5],
            [109,34],
            [108,34],
          ]
        ],
        {
          name:'polygon'
        }
      );

const point:any = turf.point([109,34],{name:'point'});

const collection = turf.featureCollection([
  point,
  polygon
]);

const dataSource = Cesium.GeoJsonDataSource.load(collection);

dataSource.then((data) => {
  viewer.dataSources.add(data);
  viewer.zoomTo(data);
})
```

### 绘制圆
```ts
const center = [108.5,34.5];
const radis = 5;

const options = {steps:100,unit:'kilometers'};
const circle = turf.circle(center,radis,options);


const collection = turf.featureCollection([
  circle
]);

const dataSource = Cesium.GeoJsonDataSource.load(collection);

dataSource.then((data) => {
  viewer.dataSources.add(data);
  viewer.zoomTo(data);
})
```
### 计算包围盒
```ts
const line = turf.lineString([
  [108, 34],
  [108, 34.2],
  [108.2, 34.1],
]);

const polygon:any = turf.polygon([
  [
    [108,34],
    [108,34.2],
    [108.2,34.1],
    [108,34],

  ]
]);

const box = turf.bbox(polygon);
console.log('box',box)
    

const collection = turf.featureCollection([line,polygon]);

const datasource = Cesium.GeoJsonDataSource.load(collection,{
  stroke: Cesium.Color.BLUE,
  fill: Cesium.Color.RED,
  strokeWidth: 3,
});

datasource.then((data) => {
  viewer.dataSources.add(data);
  viewer.zoomTo(data);
})

```

### 设置tilset样式
```ts
const tilset = await new Cesium.Cesium3DTileset({
  url: '/tileset.json',
}).readyPromise;

viewer.scene.primitives.add(tilset);

viewer.zoomTo(tilset);


const styleArr = [
      {
        color:{
          conditions:[
            ["${building_name} === 'build0","color(purple)"],
            ["${building_name} === 'build1","color(red)"],
            ["${building_name} === 'build1","color(orange)"],
            ["true","color(orange)"],
          ]
        }
      }
    ];

tilset.style = new Cesium.Cesium3DTileStyle(styleArr[0]);
```

###  
```ts
  // 光照效果
    viewer.scene.globe.enableLighting = true;

    // 雾
    // viewer.scene.fog.enabled = true;
    // viewer.scene.fog.minimumBrightness = 0.1;
    // viewer.scene.fog.density = 0.03;


    // viewer.scene.globe.showGroundAtmosphere = true;
    // viewer.scene.globe.lightingFadeInDistance = 10;
    
    
    // 天空大气效果
    // viewer.scene.skyAtmosphere.show = true;
    // viewer.scene.skyAtmosphere.brightnessShift = 20;

    // HDR效果
    viewer.scene.highDynamicRange = true;

```

### 光照效果
```ts
const bloom = viewer.scene.postProcessStages.bloom;
bloom.enabled = true;
bloom.uniforms.glowOnly = false;
bloom.uniforms.contrast = 128;
bloom.uniforms.brightness = -0.3;
```
### box盒子
```ts
const box= viewer.entities.add({
  name: 'blue box',
  position: Cesium.Cartesian3.fromDegrees(0.0, 40.0, 0.0),
  box: {
    show: true,
    heightReference: Cesium.HeightReference.NONE,
    dimensions: new Cesium.Cartesian3(100, 100, 100),
    fill: true,
    material: Cesium.Color.BLUE,
    outline: true,
    outlineColor: Cesium.Color.YELLOW,
    outlineWidth: 10,
    shadows: Cesium.ShadowMode.RECEIVE_ONLY,
    },
});
```
### 平行光
```ts
viewer.scene.light = new Cesium.DirectionalLight({
  direction:Cesium.Cartesian3.fromElements(-0.2,-0.5,-0.8),
  intensity:1,
});
```

### 
```ts
  const polygon = new Cesium.PolygonGeometry({
      polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray([
          -72.0,40.0,
          -70.0,35.0,
          -75.0,30.0,
          -70.0,30.0,
          -68.0,40.0
        ])
      )
    });

    const geometry = Cesium.PolygonGeometry.createGeometry(polygon);

    const instance = new Cesium.GeometryInstance({
      geometry:geometry as Cesium.GeometryFactory
    });

    const primitive = viewer.scene.primitives.add(
      new Cesium.Primitive({
        asynchronous:false,
        geometryInstances:instance,
        appearance: new Cesium.MaterialAppearance({
          material: new Cesium.Material({
            fabric:{
              type:"Color",
              uniforms:{
                color: new Cesium.Color(1.0,0.0,0.0,1.0)
              }
            }
          })
        })
      })
    )
```

### 动态水面
```ts
// 创建 geometry
    const polygon = new Cesium.PolygonGeometry({
      polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray([
          90, 40,
          120, 40,
          120, 30,
          90, 30
        ])
      )
    });

    const geometry = Cesium.PolygonGeometry.createGeometry(polygon);

    // 创建geometryInstance
    const instance = new Cesium.GeometryInstance({
      geometry: geometry as Cesium.GeometryFactory,
    });

    // 创建 material
    const material = new Cesium.Material({
      fabric:{
        type:'Water',
        uniforms:{
          baseWaterColor: new Cesium.Color(
            64 / 255.0,
            157 / 255.0,
            253 / 255.0,
            0.7,
          ),
          normalMap:'/waterNormals.jpg',
          frequency: 20000,
          animationSpeed: 0.1,
          amplitude: 50,
          specularIntensity: 0.5,
        }
      }
    });

    // 创建Appearance
    const appearance = new Cesium.EllipsoidSurfaceAppearance({
      material: material,
    });

    // 创建primitive
    viewer.scene.primitives.add(
      new Cesium.Primitive({
        geometryInstances:instance,
        asynchronous: false,
        appearance: appearance,
      })
    );
```

### 等高线
```ts
viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
  url: "./data/sjzTerrain/",
});

const elevationConterMaterial = new Cesium.Material({
  fabric:{
    type:'ElevationContour',
    uniforms:{
      // 等高线的颜色
      color: new Cesium.Color(1.0,0.0,0.0,1.0),
      // 等高线的间隔
      spacing: 50,
      width:2,
      }
    }
});

viewer.scene.globe.material = elevationConterMaterial;

viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(
    114.22250152791344, 38.10180147534585, 40000
    )
});
```

### 定义等高线
```ts
  viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
      url: "./data/sjzTerrain/",
    });

    const data = [
    [114.44829726914871, 38.132655549577066],
    [114.39125413452091, 38.150414102535983],
    [114.33539939853108, 38.148544984717915],
    [114.31044302713137, 38.162562200857607],
    [114.27479106798899, 38.156021168611844],
    [114.25339989250355, 38.151348643484098],
    [114.21893633199923, 38.139198677216605],
    [114.21893633199923, 38.12237230662749],
    [114.22250152791344, 38.106477172992363],
    [114.22250152791344, 38.101801475345852],
    [114.24864629795121, 38.093384465543451],
    [114.26171868297003, 38.090578580179503],
    [114.28073306117933, 38.083095692631112],
    [114.29737064211243, 38.079353961643996],
    [114.30925462849331, 38.077483024350038],
    [114.3282690067026, 38.07467652866049],
    [114.33302260125487, 38.07467652866049],
    [114.35084858082611, 38.073741006164738],
    [114.37699335086387, 38.06906321419649],
    [114.37699335086387, 38.072805471702921],
    [114.42452929638715, 38.076547537753235]
  ];

  viewer.scene.globe.depthTestAgainstTerrain = true;
  viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;
  viewer.scene.globe.translucency.enabled = true;
  viewer.scene.globe.baseColor = new Cesium.Color(1,1,1,0.8);


  viewer.entities.add({
    name:'test',
    polyline:{
      positions:Cesium.Cartesian3.fromDegreesArray(data.flat()),
      material:Cesium.Color.RED,
      width:5,
    }
  });

  viewer.camera.setView({
    orientation:Cesium.Cartesian3.fromDegrees(114.22,38.101,4000)
  });
```
### 加载白模数据
```ts
 const xhr = new XMLHttpRequest();
    xhr.open('GET','/chaoyangbaimo1.json');
    xhr.send(null);

    xhr.onload = function() {
      const data = JSON.parse(xhr.responseText);
      const { features } = data || {};

      features.forEach((feature:any) => {
        const { coordinates } = feature.geometry || {};
        coordinates.forEach((coordinate:any) => {
          viewer.entities.add({
            wall:{
              positions:Cesium.Cartesian3.fromDegreesArray(coordinate.flat()),
              minimumHeights: new Array(coordinate.length).fill(0),
              maximumHeights: new Array(coordinate.length).fill(feature.properties.height * 3),
              material:new Cesium.Color(1.0,0.0,0.0,1),
            },
            polygon:{
              hierarchy: Cesium.Cartesian3.fromDegreesArray(coordinate.flat()),
              material:new Cesium.ImageMaterialProperty({
                image: '/wuding.png',
                repeat: new Cesium.Cartesian2(10, 1)
              }),
              height:feature.properties.height * 3,
            }
          });

        })
      });

    }

viewer.camera.setView({
  destination:Cesium.Cartesian3.fromDegrees(116.45,39.932,3000)
})

```