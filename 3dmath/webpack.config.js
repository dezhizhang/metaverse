/*
 * :file description: 
 * :name: /3dmath/webpack.config.js
 * :author:张德志
 * :copyright: (c) 2025, Xiaozhi
 * :date created: 2025-03-02 10:32:07
 * :last editor: 张德志
 * :date last edited: 2025-04-10 06:36:28
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "build.js"
    },
    devServer: {
        port: 8082,
        open: true
    },
    module: {
        rules: [{
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.glsl$/,
                use: ['webpack-glsl-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body'
        })
    ]
}