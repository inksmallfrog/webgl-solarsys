/*
* @Author: inksmallfrog
* @Date:   2017-05-04 13:22:19
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-11 10:46:55
*/

'use strict';
import Planet from './Planet';
let jupiter = Object.create(Planet);

jupiter.name = '木星';
jupiter.textureSrc = require('../../images/solar/jupiter.jpg');

jupiter.selfR = 0;
jupiter.obitalR = Math.floor(Math.random() * 360);

jupiter.mvMatrix = glMatrix.mat4.create();

jupiter.dist = 5 * baseDist;
jupiter.radius = 10 * baseRadius;
jupiter.selfRSpeed = baseSelfRSpeed / 0.41;
jupiter.obitalRSpeed = baseSelfRSpeed / (11.85 * 365);
jupiter.obitalInclination = 1.3;

export default jupiter;