/*
 * :file description: 
 * :name: /smart-city/config-overrides.js
 * :author: 张德志
 * :copyright: (c) 2024, Tungee
 * :date created: 2024-03-17 09:49:59
 * :last editor: 张德志
 * :date last edited: 2024-03-17 09:57:53
 */
const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
  // 添加自定义的 webpack 配置
  addWebpackModuleRule({
    test: /\.(glsl|vs|fs)$/,
    use: ['webpack-glsl-loader'],
  })
);