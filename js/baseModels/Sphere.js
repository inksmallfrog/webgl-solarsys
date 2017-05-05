/*
* @Author: inksmallfrog
* @Date:   2017-05-04 10:56:41
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-05 18:05:41
*/

'use strict';
import Model from './Model3d.js';

let sphere = Object.create(Model);

sphere.intersectionCheck = function(O, ray){
    let center = vec4.fromValues(0, 0, 0, 1);
    vec3.transformMat4(center, center, this.mvMatrix);
    let centerToO = vec3.subtract(vec3.create(), O, center);
    let b = vec3.dot(ray, centerToO);
    let c = vec3.squaredDistance(O, center) - this.radius * this.radius;
    let dirta = b * b - c;
    if(dirta < 0){
        return -1;
    }
    else{
        return -b - Math.sqrt(dirta);
    }
}

sphere.prepareData = function(){
    let latitudeBands = 30;
    let longitudeBands = 30;
    if(!this.radius){
        alert('球体半径未定义');
    }
    let radius = this.radius;
    this.vertexPositionData = [];
    this.normalData = [];
    this.textureCoordData = [];
    this.indexData = [];
    for(let latNumber = 0; latNumber <= latitudeBands; ++latNumber)
    {
        let theta = latNumber * Math.PI / latitudeBands;
        let sinTheta = Math.sin(theta);
        let cosTheta = Math.cos(theta);
        for(let longNumber = 0; longNumber <= longitudeBands; ++longNumber)
        {
            let phi = longNumber * 2 * Math.PI / longitudeBands;
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);
            let x = cosPhi * sinTheta;
            let y = cosTheta;
            let z = sinPhi * sinTheta;
            let u = 1 - (longNumber / longitudeBands);
            let v = 1 - (latNumber / latitudeBands);

            this.normalData.push(x);
            this.normalData.push(y);
            this.normalData.push(z);
            this.textureCoordData.push(u);
            this.textureCoordData.push(v);
            this.vertexPositionData.push(radius * x);
            this.vertexPositionData.push(radius * y);
            this.vertexPositionData.push(radius * z);
        }
    }
    for (let latNumber=0; latNumber < latitudeBands; latNumber++) {
        for (let longNumber=0; longNumber < longitudeBands; longNumber++) {
            let first = (latNumber * (longitudeBands + 1)) + longNumber;
            let second = first + longitudeBands + 1;
            this.indexData.push(first);
            this.indexData.push(second);
            this.indexData.push(first + 1);

            this.indexData.push(second);
            this.indexData.push(second + 1);
            this.indexData.push(first + 1);
        }
    }
}

export default sphere;
