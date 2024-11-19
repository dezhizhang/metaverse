/*
 * :file description: 
 * :name: /linear/webpack.config.js
 * :author:张德志
 * :copyright: (c) 2024, Xiaozhi
 * :date created: 2024-11-19 08:03:34
 * :last editor: 张德志
 * :date last edited: 2024-11-19 08:08:40
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
            },
            {
                test:/\.(jpg|png|svg)$/,
                use:['file-loader']
            }
        ]
    }
}