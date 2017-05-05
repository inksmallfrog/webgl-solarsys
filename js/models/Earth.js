/*
* @Author: inksmallfrog
* @Date:   2017-05-04 13:22:19
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-05 14:55:07
*/

'use strict';
import Planet from './Planet';
let earth = Object.create(Planet);

earth.name = 'earth';
earth.textureSrc = '../../images/solar/earth.jpg';

earth.selfR = 0;
earth.obitalR = Math.floor(Math.random() * 360);

earth.mvMatrix = mat4.create();

earth.dist = 2 * baseDist;
earth.radius = 1.5 * baseRadius;
earth.selfRSpeed = baseSelfRSpeed;
earth.obitalRSpeed = baseSelfRSpeed / 365;
earth.obitalInclination = 0;

export default earth;