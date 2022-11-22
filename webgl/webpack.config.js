/*
 * :file description: 
 * :name: /webgl/webpack.config.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-10 11:13:32
 * :last editor: 张德志
 * :date last edited: 2022-11-23 06:20:42
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'build.js'
    },
    devServer:{
        port:8000
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            inject:'body'
        })
    ],
    module:{
        rules:[
            {
                test:/\.js/,
                use:['babel-loader']
            },
            {
                test:/\.glsl$/,
                use: ['webpack-glsl-loader']
            }
        ]
    }
}