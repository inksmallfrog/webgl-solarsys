/*
* @Author: inksmallfrog
* @Date:   2017-05-04 13:22:19
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-05 15:02:55
*/

'use strict';
import Planet from './Planet';
let saturn = Object.create(Planet);

saturn.name = 'saturn';
saturn.textureSrc = '../../images/solar/saturn.jpg';

saturn.selfR = 0;
saturn.obitalR = Math.floor(Math.random() * 360);

saturn.mvMatrix = mat4.create();

saturn.dist = 6 * baseDist;
saturn.radius = 4 * baseRadius;
saturn.selfRSpeed = baseSelfRSpeed / 0.44;
saturn.obitalRSpeed = baseSelfRSpeed / (29.45 * 365);
saturn.obitalInclination = 2.49;

export default saturn;