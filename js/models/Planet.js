/*
* @Author: inksmallfrog
* @Date:   2017-05-05 14:23:54
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-05 14:54:59
*/

'use strict';
import Sphere from '../baseModels/Sphere.js';
let Planet = Object.create(Sphere);
Planet.animateModel = function(elapsed){
    this.selfR += elapsed * 60 / 1000 * this.selfRSpeed;
    this.obitalR += elapsed * 60 / 1000 * this.obitalRSpeed;
    mat4.identity(this.mvMatrix);
    mat4.rotate(this.mvMatrix, degToRad(this.obitalInclination), [0.0, 0.0, 1.0]);
    mat4.rotate(this.mvMatrix, degToRad(this.obitalR), [0.0, 1.0, 0.0]);
    mat4.translate(this.mvMatrix, [this.dist, 0.0, 0.0]);
    if(this.name == 'uranus'){
        mat4.rotate(this.mvMatrix, degToRad(this.selfR), [1.0, 0.0, 0.0]);
    }else{
        mat4.rotate(this.mvMatrix, degToRad(this.selfR), [0.0, 1.0, 0.0]);
    }
}
export default Planet;
