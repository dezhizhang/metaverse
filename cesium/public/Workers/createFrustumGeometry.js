/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-f31b6bd1', './FrustumGeometry-6a0f9fd2', './Transforms-baa7a7e7', './Cartesian2-29c15ffd', './Check-ed9ffed2', './Math-03750a0b', './combine-2f6226b9', './RuntimeError-c7c236f3', './ComponentDatatype-6fe28ef7', './WebGLConstants-0664004c', './GeometryAttribute-1004876c', './GeometryAttributes-e973821e', './Plane-f1000363', './VertexFormat-44d61ac9'], function (when, FrustumGeometry, Transforms, Cartesian2, Check, _Math, combine, RuntimeError, ComponentDatatype, WebGLConstants, GeometryAttribute, GeometryAttributes, Plane, VertexFormat) { 'use strict';

  function createFrustumGeometry(frustumGeometry, offset) {
    if (when.defined(offset)) {
      frustumGeometry = FrustumGeometry.FrustumGeometry.unpack(frustumGeometry, offset);
    }
    return FrustumGeometry.FrustumGeometry.createGeometry(frustumGeometry);
  }

  return createFrustumGeometry;

});
