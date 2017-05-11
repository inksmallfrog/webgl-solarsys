/*
* @Author: inksmallfrog
* @Date:   2017-05-04 13:22:19
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-11 10:47:36
*/

'use strict';
import Planet from './Planet';
let venus = Object.create(Planet);

venus.name = '金星';
venus.textureSrc = require('../../images/solar/venus.jpg');

venus.selfR = 0;
venus.obitalR = Math.floor(Math.random() * 360);

venus.mvMatrix = glMatrix.mat4.create();

venus.dist = 1.5 * baseDist;
venus.radius = 2.5 * baseRadius;
venus.selfRSpeed = baseSelfRSpeed / 243;
venus.obitalRSpeed = -baseSelfRSpeed / 224.65;
venus.obitalInclination = 3.39;

export default venus;