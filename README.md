### 设备左右倾斜控制元素左右移动插件



```js
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

```