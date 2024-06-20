
import * as Cesium from 'cesium';

function PolylineTrailLinkMaterialProperty(color, trailImage, duration) {
  this._definitionChanged = new Cesium.Event();
  this._color = undefined;
  this._colorSubscription = undefined;
  this.color = color;
  this.duration = duration;
  this.trailImage = trailImage;
  this._time = new Date().getTime();
}

/**
 * �Զ������
 */
function _getPolylineShader() {
  var materail =
    'czm_material czm_getMaterial(czm_materialInput materialInput)\n\
          {\n\
                czm_material material = czm_getDefaultMaterial(materialInput);\n\
                vec2 st = materialInput.st;\n\
                vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                material.alpha = colorImage.a * color.a;\n\
                material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                return material;\n\
          }';

  return materail;
}

Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
  isConstant: {
    get: function () {
      return false;
    },
  },
  definitionChanged: {
    get: function () {
      return this._definitionChanged;
    },
  },
  color: Cesium.createPropertyDescriptor('color'),
});

var MaterialType = 'polylineType' + parseInt(Math.random() * 1000);
PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
  return MaterialType;
};

PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
  if (!Cesium.defined(result)) {
    result = {};
  }
  result.color = Cesium.Property.getValueOrClonedDefault(
    this._color,
    time,
    Cesium.Color.WHITE,
    result.color,
  );
  result.image = this.trailImage;
  result.time =
    ((new Date().getTime() - this._time) % this.duration) / this.duration;
  return result;
};

PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
  return (
    this === other ||
    (other instanceof PolylineTrailLinkMaterialProperty &&
      Cesium.Property.equals(this._color, other._color) &&
      Cesium.Property.equals(this._image, other._image))
  );
};

Cesium.Material._materialCache.addMaterial(MaterialType, {
  fabric: {
    type: MaterialType,
    uniforms: {
      color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
      image: Cesium.Material.DefaultImageId,
      time: -20,
    },
    source: _getPolylineShader(),
  },
  translucent: function (material) {
    return true;
  },
});

export default PolylineTrailLinkMaterialProperty;
