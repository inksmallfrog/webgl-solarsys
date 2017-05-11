/*
* @Author: inksmallfrog
* @Date:   2017-05-04 12:08:16
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-11 10:49:04
*/

'use strict';
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: ['./js/main.js'],
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            'glMatrix': path.resolve(__dirname, 'js/glMatrix-min.js'),
            'util': path.resolve(__dirname, 'js/util')
        }
    },
    plugins: [
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