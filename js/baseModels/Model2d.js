/*
* @Author: inksmallfrog
* @Date:   2017-05-05 12:41:12
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-05 17:17:37
*/

'use strict';
export default {
    vertexBuffer: null,
    indicesBuffer: null,
    normalBuffer: null,
    textureCoordBuffer: null,
    texture:null,
    renderable: false,
    mvMatrix: mat4.create(),
    initBuffers(){
        this.vertexBuffer = gl.createBuffer();
        this.colorBuffer = gl.createBuffer();

        if(!this.prepareData){
            alert('模型没有定义数据初始化函数！');
        }else{
            this.prepareData();
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexPositionData), gl.STATIC_DRAW);
        this.vertexBuffer.itemNum = 3;
        this.vertexBuffer.numSize = this.vertexPositionData.length / 3;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexColorData), gl.STATIC_DRAW);
        this.colorBuffer.itemNum = 3;
        this.colorBuffer.numSize = this.vertexColorData.length / 3;
    },
    init(){
        this.initBuffers();
    },
    render(shaderProgram){
        gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
        gl.disableVertexAttribArray(shaderProgram.textureCoordAttribute);
        gl.disableVertexAttribArray(shaderProgram.vertexNormalAttribute);
        gl.uniform1i(shaderProgram.useTexture, false);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexBuffer.itemNum, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.colorBuffer.itemNum, gl.FLOAT, false, 0, 0);

        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, this.mvMatrix);

        gl.drawArrays(gl.LINES, 0, this.vertexBuffer.numSize);
    }
}