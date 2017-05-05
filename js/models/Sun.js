/*
* @Author: inksmallfrog
* @Date:   2017-05-04 11:03:18
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-05 17:53:14
*/

'use strict';
import sphere from '../baseModels/Sphere.js';
let sun = Object.create(sphere);
sun.radius = 28 * baseRadius;
sun.textureSrc = '../../images/solar/sun.jpg';
sun.mvMatrix = mat4.create();
sun.name = 'sun';
sun.animateModel = function(elapsed){
    mat4.identity(this.mvMatrix);
}
sun.controlShaderProgram = function(shaderProgram){
    gl.uniform1i(shaderProgram.useLightingUniform, false);
}
export default sun;