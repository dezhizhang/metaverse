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
}

const vector3 = new Vector3(3,4,5);


console.log(vector3.model())
