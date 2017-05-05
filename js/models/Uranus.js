/*
* @Author: inksmallfrog
* @Date:   2017-05-04 13:22:19
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-05 15:02:35
*/

'use strict';
import Planet from './Planet';
let uranus = Object.create(Planet);

uranus.name = 'uranus';
uranus.textureSrc = '../../images/solar/uranus.jpg';

uranus.selfR = 0;
uranus.obitalR = Math.floor(Math.random() * 360);

uranus.mvMatrix = mat4.create();

uranus.dist = 7 * baseDist;
uranus.radius = 2 * baseRadius;
uranus.selfRSpeed = baseSelfRSpeed / 0.72;
uranus.obitalRSpeed = baseSelfRSpeed / (84 * 365);
uranus.obitalInclination = 0.77;

export default uranus;