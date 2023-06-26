/*
 * :file description: 
 * :name: /webgpu/webpack.config.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-06-27 05:45:33
 * :last editor: 张德志
 * :date last edited: 2023-06-27 06:03:20
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
        port: 8002,
        open: true
    },
    module: {
        rules: [{
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test:/\.(js)$/,
                use:['babel-loader']
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