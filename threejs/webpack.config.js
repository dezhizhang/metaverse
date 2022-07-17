/*
 * :file description: 
 * :name: /threejs/webpack.config.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:38:33
 * :last editor: 张德志
 * :date last edited: 2022-07-17 07:50:00
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'build'),
        filename:"build.js"
    },
    devServer:{
        port:8000,
        open:true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            inject:'body'
        })
    ]
}