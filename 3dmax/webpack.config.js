/*
 * :file description: 
 * :name: /3dmax/public/webpack.config.js
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-04-12 07:09:15
 * :last editor: 张德志
 * :date last edited: 2023-04-12 07:10:58
 */
/*
 * :file description: 
 * :name: /threejs/webpack.config.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-07-12 07:38:33
 * :last editor: 张德志
 * :date last edited: 2022-11-15 06:25:53
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
    module:{
        rules:[
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:['file-loader']
            },
            {
                test:/\.glsl$/,
                use: ['webpack-glsl-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            inject:'body'
        })
    ]
}