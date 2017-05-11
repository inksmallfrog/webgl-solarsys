/*
* @Author: inksmallfrog
* @Date:   2017-05-04 11:03:18
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-11 10:47:26
*/

'use strict';
import sphere from '../baseModels/Sphere.js';
let sun = Object.create(sphere);
sun.radius = 28 * baseRadius;
sun.textureSrc = require('../../images/solar/sun.jpg');
sun.mvMatrix = glMatrix.mat4.create();
sun.name = '太阳';
sun.animateModel = function(elapsed){
    glMatrix.mat4.identity(this.mvMatrix);
}
sun.controlShaderProgram = function(shaderProgram){
    gl.uniform1i(shaderProgram.useLightingUniform, false);
}
export default sun;