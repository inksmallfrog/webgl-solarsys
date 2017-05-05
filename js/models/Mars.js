/*
* @Author: inksmallfrog
* @Date:   2017-05-04 13:22:19
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-05 14:55:28
*/

'use strict';
import Planet from './Planet';
let mars = Object.create(Planet);

mars.name = 'mars';
mars.textureSrc = '../../images/solar/mars.jpg';

mars.selfR = 0;
mars.obitalR = Math.floor(Math.random() * 360);

mars.mvMatrix = mat4.create();

mars.dist = 2.5 * baseDist;
mars.radius = 1.3 * baseRadius;
mars.selfRSpeed = baseSelfRSpeed;
mars.obitalRSpeed = baseSelfRSpeed / 687;
mars.obitalInclination = 1.85;

export default mars;