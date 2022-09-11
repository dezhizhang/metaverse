/*
 * :file description: 
 * :name: /canvas/webpack.config.js
 * :author: 张德志
 * :copyright: (c) 2022, Tungee
 * :date created: 2022-09-10 22:11:32
 * :last editor: 张德志
 * :date last edited: 2022-09-11 19:59:03
 */

const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'build.js'
    },
    module:{
        rules:[
            {
                test:/\.(png|svg|jpg|gif|jpeg)$/,
                use:['file-loader']
            }
        ]
    },

    plugins:[
        new htmlWebpackPlugin({
            template:'./public/index.html',
            inject:'body'
        })
    ]
}
