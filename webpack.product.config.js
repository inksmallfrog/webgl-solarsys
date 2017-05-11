/*
* @Author: inksmallfrog
* @Date:   2017-05-11 10:48:21
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-11 11:01:08
*/

'use strict';
'use strict';
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['./js/main.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'glMatrix': path.resolve(__dirname, 'js/glMatrix-min.js'),
            'util': path.resolve(__dirname, 'js/util')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': "production"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new webpack.ProvidePlugin({
          'glMatrix': 'glMatrix',
          'util': 'util'
        })
    ],
    module:{
        rules:[
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
               test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }
}