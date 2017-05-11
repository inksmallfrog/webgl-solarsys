/*
* @Author: inksmallfrog
* @Date:   2017-05-04 13:22:19
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-11 10:47:00
*/

'use strict';
import Planet from './Planet';
let mars = Object.create(Planet);

mars.name = '火星';
mars.textureSrc = require('../../images/solar/mars.jpg');

mars.selfR = 0;
mars.obitalR = Math.floor(Math.random() * 360);

mars.mvMatrix = glMatrix.mat4.create();

mars.dist = 2.5 * baseDist;
mars.radius = 1.3 * baseRadius;
mars.selfRSpeed = baseSelfRSpeed;
mars.obitalRSpeed = baseSelfRSpeed / 687;
mars.obitalInclination = 1.85;

export default mars;