/*
* @Author: inksmallfrog
* @Date:   2017-05-04 10:48:52
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-05 18:00:10
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
        this.indicesBuffer = gl.createBuffer();
        this.normalBuffer = gl.createBuffer();
        this.textureCoordBuffer = gl.createBuffer();

        if(!this.prepareData){
            alert('模型没有定义数据初始化函数！');
        }else{
            this.prepareData();
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexPositionData), gl.STATIC_DRAW);
        this.vertexBuffer.itemNum = 3;
        this.vertexBuffer.numSize = this.vertexPositionData.length / 3;

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexData), gl.STATIC_DRAW);
        this.indicesBuffer.itemSize = 1;
        this.indicesBuffer.numItems = this.indexData.length;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalData), gl.STATIC_DRAW);
        this.normalBuffer.itemNum = 3;
        this.normalBuffer.numSize = this.normalData.length / 3;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordData), gl.STATIC_DRAW);
        this.textureCoordBuffer.itemNum = 2;
        this.textureCoordBuffer.numSize = this.textureCoordData.length / 2;
    },
    initTexture(){
        if(!this.textureSrc){
            alert('模型纹理未定义');
        }
        this.texture = gl.createTexture();
        this.texture.image = new Image();

        this.texture.image.onload = ()=>{
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.texture.image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.bindTexture(gl.TEXTURE_2D, null);
            this.renderable = true;
        }
        this.texture.image.src = this.textureSrc;
    },
    init(){
        this.initBuffers();
        this.initTexture();
    },
    checkInterSection(ray, webglStage){
        if(this.intersectionCheck){
            return this.intersectionCheck(ray, webglStage);
        }
        else{
            return false;
        }
    },
    animate(elapsed){
        if(!this.animateModel) return;
        else this.animateModel(elapsed);
    },
    render(shaderProgram){
        if(this.renderable){
            gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
            gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
            gl.disableVertexAttribArray(shaderProgram.vertexColorAttribute);
            gl.uniform1i(shaderProgram.useTexture, true);
            gl.uniform1i(shaderProgram.useLightingUniform, true);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexBuffer.itemNum, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.normalBuffer.itemNum, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.textureCoordBuffer.itemNum, gl.FLOAT, false, 0, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(shaderProgram.samplerUniform, 0);

            gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, this.mvMatrix);
            let normalMatrix = mat3.create();
            mat3.fromMat4(normalMatrix, this.mvMatrix);
            mat3.invert(normalMatrix);
            mat3.transpose(normalMatrix);
            gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);

            gl.uniform3f(shaderProgram.lightPosUniform, 0, 0, 0);
            gl.uniform3f(shaderProgram.lightColorUniform, 1.0, 1.0, 1.0);
            gl.uniform3f(shaderProgram.ambientColorUniform, 0.25, 0.25, 0.25);

            if(this.controlShaderProgram){
                this.controlShaderProgram(shaderProgram);
            }

            /*let lighting = document.getElementById("lighting").checked;
            gl.uniform1i(shaderProgram.useLightingUniform, lighting);
            if(lighting){
                gl.uniform3f(
                    shaderProgram.ambientColorUniform,
                    parseFloat(document.getElementById("ambientR").value),
                    parseFloat(document.getElementById("ambientG").value),
                    parseFloat(document.getElementById("ambientB").value)
                );
                let lightingDirection = [
                    parseFloat(document.getElementById("lightDirectionX").value),
                    parseFloat(document.getElementById("lightDirectionY").value),
                    parseFloat(document.getElementById("lightDirectionZ").value)
                ];
                let adjustedLD = vec3.create();
                vec3.normalize(lightingDirection, adjustedLD);
                vec3.scale(adjustedLD, -1);
                gl.uniform3fv(shaderProgram.lightingDirectionUniform, adjustedLD);
                gl.uniform3f(
                    shaderProgram.directionalColorUniform,
                    parseFloat(document.getElementById("directionalR").value),
                    parseFloat(document.getElementById("directionalG").value),
                    parseFloat(document.getElementById("directionalB").value)
                );
            }
            let blending = document.getElementById('blending').checked;
            if(blending){
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
                gl.enable(gl.BLEND);
                gl.disable(gl.DEPTH_TEST);
                gl.uniform1f(shaderProgram.alphaUniform, parseFloat(document.getElementById("alpha").value));
            }else{
                gl.disable(gl.BLEND);
                gl.enable(gl.DEPTH_TEST);
            }*/
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
            gl.drawElements(gl.TRIANGLES, this.indicesBuffer.numItems, gl.UNSIGNED_SHORT, 0);
        }
    }
}
