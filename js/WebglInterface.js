/*
* @Author: inksmallfrog
* @Date:   2017-05-04 10:08:13
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-05 17:55:39
*/

'use strict';
import Line from './baseModels/Line'
/*
 * WebGL实例构造函数
 * @param canvasId canvas组件id
 *        vshaderId 包含vertex shader的script标签id
 *        fshaderId 包含fragment shader的script标签id
 */
export default function WebGLInstance(canvasId, vshaderId, fshaderId){
    this.shaderProgram;
    this.models = [];
    this.camera = {
        pos: [0, 0, -50],
        lookAt: [0, 0, 0],
        up: [0, 1, 0]
    }
    this.vMatrix = mat4.create();
    this.pMatrix = mat4.create();
    this.lastTime = 0;
    this.init = function(){
        const canvas = document.getElementById(canvasId),
              vshaderSrc = getNodeText(document.getElementById(vshaderId)),
              fshaderSrc = getNodeText(document.getElementById(fshaderId));
        this.initGL(canvas);
        this.initShaders(vshaderSrc, fshaderSrc);
    }
    this.bindEvent = function(){
        document.body.addEventListener('keydown', (e)=>{
            let degree = 0;
            let targetVec = vec3.create();
            vec3.subtract(targetVec, this.camera.lookAt, this.camera.pos);
            vec3.normalize(targetVec, targetVec);
            switch(e.keyCode){
                case 87:
                    vec3.add(this.camera.pos, this.camera.pos, targetVec);
                    break;
                case 83:
                    vec3.subtract(this.camera.pos, this.camera.pos, targetVec);
                    break;
                case 38:
                    degree = 3;
                    vec3.rotateX(this.camera.pos, this.camera.pos, [1, 0, 0], degToRad(degree));
                    break;
                case 40:
                    degree = -3;
                    vec3.rotateX(this.camera.pos, this.camera.pos, [1, 0, 0], degToRad(degree));
                    break;
                case 37:
                case 65:
                    degree = -3;
                    vec3.rotateY(this.camera.pos, this.camera.pos, [0, 1, 0], degToRad(degree));
                    break;
                case 39:
                case 68:
                    degree = 3;
                    vec3.rotateY(this.camera.pos, this.camera.pos, [0, 1, 0], degToRad(degree));
                    break;
                default:
                    break;
            }
        });
        window.addEventListener('wheel', (e)=>{
            let targetVec = vec3.create();
            vec3.subtract(targetVec, this.camera.lookAt, this.camera.pos);
            vec3.normalize(targetVec, targetVec);
            if(e.deltaY > 0){
                vec3.subtract(this.camera.pos, this.camera.pos, targetVec);
            }
            else if(e.deltaY < 0){
                vec3.add(this.camera.pos, this.camera.pos, targetVec);
            }
        })
        window.addEventListener('mousedown', (e)=>{
            let boundingBox = e.target.getBoundingClientRect(),
                stageX = e.pageX - boundingBox.left,
                stageY = e.pageY - boundingBox.top,
                glX = (stageX * 2 / gl.viewportWidth - 1),
                glY = (1 - stageY * 2 / gl.viewportHeight);
            let ray = vec3.fromValues(glX, glY, -1);
            vec3.transformMat4(ray, ray, mat4.invert(mat4.create(), this.pMatrix));
            vec3.transformMat4(ray, ray, mat4.invert(mat4.create(), this.vMatrix));
            vec3.subtract(ray, ray, this.camera.pos);
            vec3.normalize(ray, ray);
            this.checkModelSelected(ray);
        });
        window.addEventListener('mousemove', (e)=>{

        });
        window.addEventListener('mouseup', (e)=>{

        });
    }
    this.checkModelSelected = function(ray){
        let line = Object.create(Line);
        line.p0 = this.camera.pos;
        line.p1 = vec3.add(vec3.create(), this.camera.pos, vec3.scale(vec3.create(), ray, 1000));
        this.addModel(line);
        let nearestModel = null;
        let nearestPos = 10000;
        this.models.forEach((model)=>{
            if(model.checkInterSection){
                let crossDist = model.checkInterSection(this.camera.pos, ray);
                if(crossDist >= 0){
                    nearestModel = crossDist < nearestPos ? model : nearestModel;
                }
            }
        });
        if(nearestModel){
            alert(nearestModel.name);
        }
    }
    this.bindShaderVariable = function(){
        let shaderProgram = this.shaderProgram;
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, 'aVertexNormal');
        console.log(shaderProgram.vertexNormalAttribute);
        shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, 'aVertexColor');
        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, 'uPMatrix');
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, 'uMVMatrix');
        shaderProgram.vMatrixUniform = gl.getUniformLocation(shaderProgram, 'uVMatrix');
        shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, 'uNMatrix');

        shaderProgram.lightColorUniform = gl.getUniformLocation(shaderProgram, 'uLightColor');
        shaderProgram.lightPosUniform = gl.getUniformLocation(shaderProgram, 'uLightPos');
        shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, 'uAmbientColor');
        shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, 'uUseLighting');
        shaderProgram.useTexture = gl.getUniformLocation(shaderProgram, 'uUseTexture');
    }
    this.addModel = function(model){
        model.init();
        this.models.push(model);
    }
    this.run = function(){
        this.init();
        this.bindEvent();
        this.animate();
    }
    this.animate = function(){
        this.draw();
        let time = new Date().getTime();
        if(this.lastTime != 0){
            let elapsed = time - this.lastTime;
            this.models.forEach((model)=>{
                if(model.animate){
                    model.animate(elapsed);
                }
            });
        }
        this.lastTime = time;
        requestAnimationFrame(this.animate.bind(this));
    }
    this.draw = function(){
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        mat4.lookAt(this.vMatrix, this.camera.pos, this.camera.lookAt, this.camera.up);
        gl.uniformMatrix4fv(this.shaderProgram.vMatrixUniform, false, this.vMatrix);
        mat4.perspective(this.pMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
        gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
        this.models.forEach((model)=>{
            model.render(this.shaderProgram);
        });
    }
}
/*
 * 初始化this.gl
 * @param canvas<DOMElement> 用于显示3d的canvas组件
 */
WebGLInstance.prototype.initGL = function(canvas){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl = canvas.getContext('experimental-webgl');
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    if(!gl){
        alert('您的浏览器不支持WebGL,请更换浏览器～');
    }
    gl.enable(gl.DEPTH_TEST);
}
/*
 * 初始化this.shaderProgram
 * @param vshaderSrc<String> vertex shader源代码
 *        fshaderSrc<String> fragment shader源代码
 */
WebGLInstance.prototype.initShaders = function(vshaderSrc, fshaderSrc){
    this.shaderProgram = gl.createProgram();

    let shaderProgram = this.shaderProgram,
        vs = gl.createShader(gl.VERTEX_SHADER),
        fs = gl.createShader(gl.FRAGMENT_SHADER),
        //用于绑定源代码与shader
        bindShader = (shader, src) => {
            gl.shaderSource(shader, src);
            gl.compileShader(shader);
            if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
                alert(gl.getShaderInfoLog(shader));
                return null;
            }
        };

    bindShader(vs, vshaderSrc);
    bindShader(fs, fshaderSrc);
    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);
    if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
        alert('Could not initialize shaders');
    }
    gl.useProgram(shaderProgram);

    this.bindShaderVariable();
}