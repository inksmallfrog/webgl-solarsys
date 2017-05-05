/*
* @Author: inksmallfrog
* @Date:   2017-05-04 12:08:16
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-04 12:11:40
*/

'use strict';
const path = require('path');
module.exports = {
    entry: './js/main.js',
    output: {
        path: path.join(__dirname, 'js'),
        filename: 'bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    }
}