# 3d 数学
[3d数学](https://www.bilibili.com/video/BV1B4411c7Vi?p=6&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8)


### 向量的运算
```ts
class Vector3 {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  model() {
    const value = this.x * this.x + this.y * this.y + this.z * this.z;
    return Math.sqrt(value);
  }

  opeator(a:number) {
    return [this.x * a,this.y * a, this.z * a]
  }

  division(a:number) {
    return [this.x / a,this.y / a,this.z / a];
  }

  spotCos(a:Vector3,b:Vector3) {
    return a.x * b.x + a.y * b.y + a.z * b.z
  }
  // 向量的占乘
  spot$(a:Vector3,b:Vector3) {
    const value = a.x * b.x + a.y * b.y + a.z * b.z;
    const modelA = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
    const modelB = Math.sqrt(b.x * b.x + b.y * b.y + b.z * b.z);

    return (Math.acos(value / (modelA * modelB)) * 180) / Math.PI;
  }
  // 向量的叉乘
  cross(a:Vector3,b:Vector3) {
    return [
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x
    ];
  }
}


// test
const vector3 = new Vector3(1,2,3);
const value = vector3.spotCos(new Vector3(3,-2,7),new Vector3(0,4,-1));
const theth = vector3.spot$(new Vector3(3,-2,7),new Vector3(0,4,-1));
const cross = vector3.cross(new Vector3(1,3,4),new Vector3(2,-5,8))

```