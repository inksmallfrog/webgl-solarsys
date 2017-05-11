/*
* @Author: inksmallfrog
* @Date:   2017-05-04 13:22:19
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-11 10:47:20
*/

'use strict';
import Planet from './Planet';
let saturn = Object.create(Planet);

saturn.name = '土星';
saturn.textureSrc = require('../../images/solar/saturn.jpg');

saturn.selfR = 0;
saturn.obitalR = Math.floor(Math.random() * 360);

saturn.mvMatrix = glMatrix.mat4.create();

saturn.dist = 6 * baseDist;
saturn.radius = 4 * baseRadius;
saturn.selfRSpeed = baseSelfRSpeed / 0.44;
saturn.obitalRSpeed = baseSelfRSpeed / (29.45 * 365);
saturn.obitalInclination = 2.49;

export default saturn;