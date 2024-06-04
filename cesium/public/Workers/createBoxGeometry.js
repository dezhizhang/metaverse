/* This file is automatically rebuilt by the Cesium build process. */
define(['./BoxGeometry-9ed2bec4', './when-f31b6bd1', './GeometryOffsetAttribute-f6456e72', './Check-ed9ffed2', './Transforms-baa7a7e7', './Cartesian2-29c15ffd', './Math-03750a0b', './combine-2f6226b9', './RuntimeError-c7c236f3', './ComponentDatatype-6fe28ef7', './WebGLConstants-0664004c', './GeometryAttribute-1004876c', './GeometryAttributes-e973821e', './VertexFormat-44d61ac9'], function (BoxGeometry, when, GeometryOffsetAttribute, Check, Transforms, Cartesian2, _Math, combine, RuntimeError, ComponentDatatype, WebGLConstants, GeometryAttribute, GeometryAttributes, VertexFormat) { 'use strict';

  function createBoxGeometry(boxGeometry, offset) {
    if (when.defined(offset)) {
      boxGeometry = BoxGeometry.BoxGeometry.unpack(boxGeometry, offset);
    }
    return BoxGeometry.BoxGeometry.createGeometry(boxGeometry);
  }

  return createBoxGeometry;

});
