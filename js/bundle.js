/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = WebGLInstance;
/*
* @Author: inksmallfrog
* @Date:   2017-05-04 10:08:13
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-04 12:39:36
*/


/*
 * WebGL实例构造函数
 * @param canvasId canvas组件id
 *        vshaderId 包含vertex shader的script标签id
 *        fshaderId 包含fragment shader的script标签id
 */

function WebGLInstance(canvasId, vshaderId, fshaderId) {
    this.gl;
    this.shaderProgram;
    this.models = [];
    this.vMatrix;
    this.pMatrix;
    this.init = function () {
        const canvas = document.getElementById(canvasId),
              vshaderSrc = getNodeText(document.getElementById(vshaderId)),
              fshaderSrc = getNodeText(document.getElementById(fshaderId));
        this.initGL(canvas);
        this.initShaders(vshaderSrc, fshaderSrc);
    };
    this.bindShaderVariable = function () {
        let shaderProgram = this.shaderProgram;
        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, 'aVertexPosition');
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, 'aVertexNormal');
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);
        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, 'aTextureCoord');
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, 'uPMatrix');
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, 'uMVMatrix');
        shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, 'uNMatrix');

        shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, 'uAmbientColor');
        shaderProgram.lightingDirectionUniform = gl.getUniformLocation(shaderProgram, 'uLightingDirection');
        shaderProgram.directionalColorUniform = gl.getUniformLocation(shaderProgram, 'uDirectionalColor');
        shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, 'uUseLighting');
        shaderProgram.alphaUniform = gl.getUniformLocation(shaderProgram, 'uAlpha');
    };
    this.addModel = function (model) {
        this.models.push(model);
    };
    this.run = function () {
        debugger;
        this.init();
        this.animate();
    };
    this.animate = function () {
        this.draw();
        models.forEach(model => {
            model.animate();
        });
        requestAnimationFrame(this.animate.bind(this));
    };
    this.draw = function () {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        models.forEach(model => {
            model.render(this.shaderProgram);
        });
    };
}
/*
 * 初始化this.gl
 * @param canvas<DOMElement> 用于显示3d的canvas组件
 */
WebGLInstance.prototype.initGL = function (canvas) {
    let gl = this.gl;
    gl = canvas.getContext('experimental-webgl');
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;
    if (!gl) {
        alert('您的浏览器不支持WebGL,请更换浏览器～');
    }
};
/*
 * 初始化this.shaderProgram
 * @param vshaderSrc<String> vertex shader源代码
 *        fshaderSrc<String> fragment shader源代码
 */
WebGLInstance.prototype.initShaders = function (vshaderSrc, fshaderSrc) {
    this.shaderProgram = gl.createProgram();

    let gl = this.gl,
        shaderProgram = this.shaderProgram,
        vs = gl.createShader(gl.VERTEX_SHADER),
        fs = gl.createShader(gl.FRAGMENT_SHADER),

    //用于绑定源代码与shader
    bindShader = (shader, src) => {
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alter(gl.getShaderInfoLog(shader));
            return null;
        }
    };

    bindShader(vs, vshaderSrc);
    bindShader(fs, fshaderSrc);
    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Could not initialize shaders');
    }
    gl.useProgram(shaderProgram);

    this.bindShaderVariable();
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sphere_js__ = __webpack_require__(3);
/*
* @Author: inksmallfrog
* @Date:   2017-05-04 11:03:18
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-04 12:12:40
*/




let sun = Object.create(__WEBPACK_IMPORTED_MODULE_0__Sphere_js__["a" /* default */]);
sun.radius = 20;
sun.textureSrc = '../../images/solar/sun.jpg';
mat4.identity(sun.mvMatrix);
mat4.translate(sun.mvMatrix, [0.0, 0.0, -5.0]);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
* @Author: inksmallfrog
* @Date:   2017-05-04 10:48:52
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-04 12:32:47
*/



/* harmony default export */ __webpack_exports__["a"] = ({
    vertexBuffer: null,
    indicesBuffer: null,
    normalBuffer: null,
    textureCoordBuffer: null,
    texture: null,
    renderable: false,
    mvMatrix: mat4.create(),
    initBuffers() {
        this.vertexBuffer = gl.createBuffer();
        this.normalBuffer = gl.createBuffer();
        this.textureCoordBuffer = gl.createBuffer();

        if (!this.prepareData) {
            alert('模型没有定义数据初始化函数！');
        } else {
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
        this.normalBuffer.numSize = this.normalData / 3;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordData), gl.STATIC_DRAW);
        this.textureCoordBuffer.itemNum = 2;
        this.textureCoordBuffer.numSize = this.textureCoordData / 2;
    },
    initTexture() {
        if (!this.textureSrc) {
            alert('模型纹理未定义');
        }
        this.texture = gl.createTexture();
        this.texture.image = new Image();

        this.texture.image.onload = () => {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.bindTexture(gl.TEXTURE_2D, null);
            this.renderable = true;
        };
        this.texture.image.src = this.textureSrc;
    },
    init() {
        this.initBuffers();
        this.initTexture();
    },
    animate() {
        if (!this.animateModel) return;else this.animateModel();
    },
    render(shaderProgram) {
        if (renderable) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.textureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            gl.uniform1i(shaderProgram.samplerUniform, 0);

            gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, this.mvMatrix);
            let normalMatrix = mat3.create();
            mat4.toInverseMat3(this.mvMatrix, normalMatrix);
            mat3.transpose(normalMatrix);
            gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);

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
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Model_js__ = __webpack_require__(2);
/*
* @Author: inksmallfrog
* @Date:   2017-05-04 10:56:41
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-04 12:13:10
*/





let sphere = Object.create(__WEBPACK_IMPORTED_MODULE_0__Model_js__["a" /* default */]);

sphere.prepareData = function () {
    let latitudeBands = 30;
    let longitudeBands = 30;
    if (!this.radius) {
        alert('球体半径未定义');
    }
    let radius = this.radius;
    this.vertexPositionData = [];
    this.normalData = [];
    this.textureCoordData = [];
    this.indexData = [];
    for (let latNumber = 0; latNumber <= latitudeBands; ++latNumber) {
        let theta = latNumber * Math.PI / latitudeBands;
        let sinTheta = Math.sin(theta);
        let cosTheta = Math.cos(theta);
        for (let longNumber = 0; longNumber <= longitudeBands; ++longNumber) {
            let phi = longNumber * 2 * Math.PI / longitudeBands;
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);
            let x = cosPhi * sinTheta;
            let y = cosTheta;
            let z = sinPhi * sinTheta;
            let u = 1 - longNumber / longitudeBands;
            let v = 1 - latNumber / latitudeBands;

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
    for (let latNumber = 0; latNumber < latitudeBands; latNumber++) {
        for (let longNumber = 0; longNumber < longitudeBands; longNumber++) {
            let first = latNumber * (longitudeBands + 1) + longNumber;
            let second = first + longitudeBands + 1;
            this.indexData.push(first);
            this.indexData.push(second);
            this.indexData.push(first + 1);

            this.indexData.push(second);
            this.indexData.push(second + 1);
            this.indexData.push(first + 1);
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (sphere);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WebglInterface__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_Sun__ = __webpack_require__(1);
/*
* @Author: inksmallfrog
* @Date:   2017-05-04 10:06:18
* @Last Modified by:   inksmallfrog
* @Last Modified time: 2017-05-04 12:41:28
*/





/*import mercury from '';
import venus from '';
import earth from '';
import mars from '';
import jupiter from '';
import saturn from '';
import uranus from '';
import neptune from '';*/

let solarSystem = new __WEBPACK_IMPORTED_MODULE_0__WebglInterface__["a" /* default */]('solorSys', 'vsShader', 'fsShader');
solarSystem.addModel(__WEBPACK_IMPORTED_MODULE_1__models_Sun__["default"]);
/*solarSystem.addModel(mercury);
solarSystem.addModel(venus);
solarSystem.addModel(earth);
solarSystem.addModel(mars);
solarSystem.addModel(jupiter);
solarSystem.addModel(saturn);
solarSystem.addModel(uranus);
solarSystem.addModel(neptune);*/

debugger;
window.onload = solarSystem.run();

/***/ })
/******/ ]);