/*
* @Author: inksmallfrog
* @Date:   2017-05-05 14:23:54
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-11 10:36:53
*/

'use strict';
import Sphere from '../baseModels/Sphere.js';
let Planet = Object.create(Sphere);
Planet.animateModel = function(elapsed){
    this.selfR += elapsed * 60 / 1000 * this.selfRSpeed;
    this.obitalR += elapsed * 60 / 1000 * this.obitalRSpeed;
    glMatrix.mat4.identity(this.mvMatrix);
    glMatrix.mat4.rotate(this.mvMatrix, this.mvMatrix, util.degToRad(this.obitalInclination), [0.0, 0.0, 1.0]);
    glMatrix.mat4.rotate(this.mvMatrix, this.mvMatrix, util.degToRad(this.obitalR), [0.0, 1.0, 0.0]);
    glMatrix.mat4.translate(this.mvMatrix, this.mvMatrix, [this.dist, 0.0, 0.0]);
    if(this.name == 'uranus'){
        glMatrix.mat4.rotate(this.mvMatrix, this.mvMatrix, util.degToRad(this.selfR), [1.0, 0.0, 0.0]);
    }else{
        glMatrix.mat4.rotate(this.mvMatrix, this.mvMatrix, util.degToRad(this.selfR), [0.0, 1.0, 0.0]);
    }
}
export default Planet;
