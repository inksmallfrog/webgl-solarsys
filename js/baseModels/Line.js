/*
* @Author: inksmallfrog
* @Date:   2017-05-05 12:55:41
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-11 10:29:35
*/

'use strict';
import Model from './Model2d.js';

let line = Object.create(Model);
line.mvMatrix = glMatrix.mat4.create();
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
    glMatrix.mat4.identity(this.mvMatrix);
}

export default line;