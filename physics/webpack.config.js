/*
 * :file description: 
 * :name: /metaverse/physics/webpack.config.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-11-26 05:55:02
 * :last editor: 张德志
 * :date last edited: 2024-11-26 05:55:03
 */
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'build.js'
    },
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif|jpeg)$/,
            use: ['file-loader']
        }]
    },

    plugins: [
        new htmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body'
        })
    ]
}