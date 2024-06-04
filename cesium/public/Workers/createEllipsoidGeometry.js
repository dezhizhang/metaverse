/* This file is automatically rebuilt by the Cesium build process. */
define(['./when-f31b6bd1', './EllipsoidGeometry-620e46f8', './GeometryOffsetAttribute-f6456e72', './Check-ed9ffed2', './Transforms-baa7a7e7', './Cartesian2-29c15ffd', './Math-03750a0b', './combine-2f6226b9', './RuntimeError-c7c236f3', './ComponentDatatype-6fe28ef7', './WebGLConstants-0664004c', './GeometryAttribute-1004876c', './GeometryAttributes-e973821e', './IndexDatatype-8e4fb082', './VertexFormat-44d61ac9'], function (when, EllipsoidGeometry, GeometryOffsetAttribute, Check, Transforms, Cartesian2, _Math, combine, RuntimeError, ComponentDatatype, WebGLConstants, GeometryAttribute, GeometryAttributes, IndexDatatype, VertexFormat) { 'use strict';

  function createEllipsoidGeometry(ellipsoidGeometry, offset) {
    if (when.defined(offset)) {
      ellipsoidGeometry = EllipsoidGeometry.EllipsoidGeometry.unpack(ellipsoidGeometry, offset);
    }
    return EllipsoidGeometry.EllipsoidGeometry.createGeometry(ellipsoidGeometry);
  }

  return createEllipsoidGeometry;

});
