/*
* @Author: inksmallfrog
* @Date:   2017-05-04 10:06:18
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-05 13:48:51
*/

'use strict';
let gl=null;
import WebGLInstance from './WebglInterface';
import sun from './models/Sun';
import mercury from './models/Mercury';
import venus from './models/Venus';
import earth from './models/Earth';
import mars from './models/Mars';
import jupiter from './models/Jupiter';
import saturn from './models/Saturn';
import uranus from './models/Uranus';
import neptune from './models/Neptune';

import Line from './baseModels/Line';
let line1 = Object.create(Line);
line1.p0 = {
    x: 0,
    y: 0,
    z: 0
}
line1.p1 = {
    x:-10,
    y:0,
    z:0
}
let line2 = Object.create(Line);
line2.p0 = {
    x: 0,
    y: 0,
    z: -50
}
line2.p1 = {
    x:-20,
    y:0,
    z:100
}
window.onload=()=>{
    let solarSystem = new WebGLInstance('solorSys', 'vsShader', 'fsShader');
    solarSystem.init();
    solarSystem.addModel(sun);
    solarSystem.addModel(mercury);
    solarSystem.addModel(venus);
    solarSystem.addModel(earth);
    solarSystem.addModel(mars);
    solarSystem.addModel(jupiter);
    solarSystem.addModel(saturn);
    solarSystem.addModel(uranus);
    solarSystem.addModel(neptune);
    //solarSystem.addModel(line1);
    //solarSystem.addModel(line2);
    solarSystem.run();
};