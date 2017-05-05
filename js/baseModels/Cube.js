/*
* @Author: inksmallfrog
* @Date:   2017-05-05 18:05:20
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-05 18:09:33
*/

'use strict';
import Model from './Model3d.js';

let Cube = Object.create(Model);

Cube.prepareData = function(){
    if(!this.size){
        alert('盒体尺寸未定义');
    }
    let size = this.size;
    this.vertexPositionData = [

    ];
    this.textureCoordData = [];
    this.indexData = [];
}

export default sphere;