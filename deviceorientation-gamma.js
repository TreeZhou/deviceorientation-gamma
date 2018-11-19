function DeviceOrientationGamma() {
    this.options = arguments[0]
    this.text = ""; //开发显示文本
    this.gamma = null; //y轴数值
    this.requestAnimationFrameName = null; //requestAnimationFrameName名字
    window.moveDom = document.getElementById(options.moveDomId);
    this.borderWidth = this.options.borderWide;
    this.moveDomWidth = this.options.moveDomWidth;
    this._callbackFun = this.options._callbackFun;

}

DeviceOrientationGamma.prototype = {
    init: function () {
        window.OrientationCallback = this.callback.bind(this);
        this.onOrientation();
        this.onRequestAnimationFrame();
    },
    onOrientation: function () {
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', this.deviceOrientationHandler.bind(this), false);
        } else {
            alert("您的浏览器不支持DeviceOrientation");
        }
    },
    deviceOrientationHandler: function (event) {
        this.gamma = event.gamma;
    },
    destroyOrientation: function () {
        window.removeEventListener('deviceorientation', this.deviceOrientationHandler, false);
    },
    onRequestAnimationFrame: function () {
        this.requestAnimationFrameName = window.requestAnimationFrame(window.OrientationCallback);
    },
    destroyRequestAnimationFrame: function () {
        window.cancelAnimationFrame(this.requestAnimationFrameName)
    },
    callback: function () {
        this.requestAnimationFrameName = window.requestAnimationFrame(window.OrientationCallback);

        //and y to [0,180]
        var y = Math.round(this.gamma);
        y += 90;
        var left = (this.borderWidth * (y / 180) - this.moveDomWidth / 2); //(y/180):Y轴旋转的角度占总体的百分数。换算成盒子的宽度。减去移动物体的半宽。left数值使移动物居中。

        //控制飞机在游戏边框范围内
        left = left < 0 ? 0 : left > (this.borderWidth - this.moveDomWidth) ? this.borderWidth - this.moveDomWidth : left;

        window.moveDom.style.left = left + "px";

        this._callbackFun && this._callbackFun();



    }
}


module.exports = DeviceOrientationGamma;



/**
 * 手机竖屏时左右倾斜手机控制元素左右移动
  */

/*
//demo
var deviceOrientationGamma = new DeviceOrientationGamma({
    moveDomId: 'moveDom', //移动元素的ID
    moveDomWidth: 30, //移动元素的宽度
    borderWide: document.getElementById(borderId).clientWidth, //包裹框的宽度
    _callbackFun: fun, //回调函数
})

function fun() {
    var text = "";
    var body = document.getElementsByTagName('body')[0];
    text += "y轴转动角度:" + deviceOrientationGamma.gamma + "deg<p>";
    text += "边框宽度:" + deviceOrientationGamma.borderWidth + "px<p>";
    text += "移动物宽度:" + deviceOrientationGamma.moveDomWidth + "px<p>";
    text += "移动物Left:" + deviceOrientationGamma.left + "px<p>";
    body.innerHTML = text;
} 

*/