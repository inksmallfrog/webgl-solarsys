/*
* @Author: inksmallfrog
* @Date:   2017-05-04 13:22:19
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-11 10:47:06
*/

'use strict';
import Planet from './Planet';
let mercury = Object.create(Planet);

mercury.name = '水星';
mercury.textureSrc = require('../../images/solar/mercury.jpg');

mercury.selfR = 0;
mercury.obitalR = Math.floor(Math.random() * 360);

mercury.mvMatrix = glMatrix.mat4.create();

mercury.dist = baseDist;
mercury.radius = baseRadius;
mercury.selfRSpeed = baseSelfRSpeed / 58.64;
mercury.obitalRSpeed = baseSelfRSpeed / 88;
mercury.obitalInclination = 7;

export default mercury;