/*
* @Author: inksmallfrog
* @Date:   2017-05-05 12:55:41
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-05 14:09:23
*/

'use strict';
import Model from './Model2d.js';

let line = Object.create(Model);
line.mvMatrix = mat4.create();
line.prepareData = function(){
    this.vertexPositionData = [];
    this.colorData = [];
    this.vertexPositionData = [
        this.p0[0], this.p0[1], this.p0[2],
        this.p1[0], this.p1[1], this.p1[2]
    ];
    this.vertexColorData = [
        1, 0, 0,
        1, 0, 0
    ]
}
line.animate = function(){
    mat4.identity(this.mvMatrix);
}

export default line;