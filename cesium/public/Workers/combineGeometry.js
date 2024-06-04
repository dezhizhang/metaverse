/* This file is automatically rebuilt by the Cesium build process. */
define(['./PrimitivePipeline-e61bcd36', './createTaskProcessorWorker', './Transforms-baa7a7e7', './Cartesian2-29c15ffd', './Check-ed9ffed2', './when-f31b6bd1', './Math-03750a0b', './combine-2f6226b9', './RuntimeError-c7c236f3', './ComponentDatatype-6fe28ef7', './WebGLConstants-0664004c', './GeometryAttribute-1004876c', './GeometryAttributes-e973821e', './GeometryPipeline-f0e1844a', './AttributeCompression-69f7b4c3', './EncodedCartesian3-3efd178b', './IndexDatatype-8e4fb082', './IntersectionTests-d16f4d8c', './Plane-f1000363', './WebMercatorProjection-98814ec7'], function (PrimitivePipeline, createTaskProcessorWorker, Transforms, Cartesian2, Check, when, _Math, combine, RuntimeError, ComponentDatatype, WebGLConstants, GeometryAttribute, GeometryAttributes, GeometryPipeline, AttributeCompression, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, WebMercatorProjection) { 'use strict';

  function combineGeometry(packedParameters, transferableObjects) {
    var parameters = PrimitivePipeline.PrimitivePipeline.unpackCombineGeometryParameters(
      packedParameters
    );
    var results = PrimitivePipeline.PrimitivePipeline.combineGeometry(parameters);
    return PrimitivePipeline.PrimitivePipeline.packCombineGeometryResults(
      results,
      transferableObjects
    );
  }
  var combineGeometry$1 = createTaskProcessorWorker(combineGeometry);

  return combineGeometry$1;

});
