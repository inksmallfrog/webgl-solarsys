/*
* @Author: inksmallfrog
* @Date:   2017-05-04 13:22:19
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-05 15:02:41
*/

'use strict';
import Planet from './Planet';
let neptune = Object.create(Planet);

neptune.name = 'neptune';
neptune.textureSrc = '../../images/solar/neptune.jpg';

neptune.selfR = 0;
neptune.obitalR = Math.floor(Math.random() * 360);

neptune.mvMatrix = mat4.create();

neptune.dist = 8 * baseDist;
neptune.radius = 2 * baseRadius;
neptune.selfRSpeed = baseSelfRSpeed / 0.67;
neptune.obitalRSpeed = baseSelfRSpeed / (164.8 * 365);
neptune.obitalInclination = 1.77;

export default neptune;