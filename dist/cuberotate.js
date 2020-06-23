!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CubeRotate=e():t.CubeRotate=e()}(window,(function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);i(1);function n(t,e){if(!this instanceof n)return new n(t,e);this._target,this._option,this._imgList,this._index,this._timer,this._timeName,this._rotio,this._index,this._canOption,this._transitionEndNum;var i=this;if("string"!=typeof t)throw new Error("selector must be a String");function r(){for(var t=0,e=i._imgList.length,n=0;n<e;n++){var r=i._imgList[n];if(0==r.naturalWidth||0==r.naturalHeight)break;++t==e&&(clearInterval(i._timer),i._timer=null,o())}}function o(){!function(){for(var t=i._imgList,e=t[0].offsetHeight,n=0;n<t.length;n++)e>t[n].offsetHeight&&(e=t[n].offsetHeight);i._target.style.height=e+"px",i._rotio=i._target.offsetWidth/e}();for(var t=i._imgList.length,e=i._target.querySelector("ul").querySelectorAll("li"),n=0;n<e.length;n++)e[n].style.visibility="visible",n!=i._index&&(e[n].style.display="none");window.onresize=function(t){var e=i._target.offsetWidth/i._rotio;i._target.style.height=e+"px"},t>1&&(i._canOption=!0,1==i._option.autoPlay&&(i._timeName=setInterval(a,i._option.playTime)),i._option.onReady&&"function"==typeof i._option.onReady&&i._option.onReady())}function a(){i.next()}!function(){if(i._index=0,i._timer=null,i._canOption=!1,i._target=document.querySelector(t),null===i._target)throw new Error("Specified dom not found");if(null===i._target.querySelector("ul")||null===i._target.querySelector("li"))throw new Error("The html content does not conform with the specifications");i._target.className.match(/^box_rotate$|^box_rotate\s|\sbox_rotate$|\sbox_rotate\s/)||(i._target.className+=" box_rotate");var n={cubeNum:4,autoPlay:!1,playTime:4e3,direct:"v",cubeRandom:!1,lowLevel:!1,onReady:null,transitionComplete:null};if(void 0!==e&&"[object Object]"===Object.prototype.toString.call(e))for(var a in n)null!=e[a]&&("direct"==a&&"v"!=e[a]&&"h"!=e[a]&&(e[a]="v"),n[a]=e[a]);i._option=n,(!!window.ActiveXObject||"ActiveXObject"in window)&&(i._option.lowLevel=!0);i._target.querySelector("ul").style.listStyle="none";for(var s=0;s<i._target.querySelectorAll("li").length;s++)i._target.querySelectorAll("li")[s].style.listStyle="none";if(i._imgList=i._target.querySelectorAll("img"),!(i._imgList.length>0))throw new Error("not find images");!function(){for(var t=0,e=i._imgList.length,n=0;n<e;n++){i._imgList[n].onload=function(n){++t==e&&(null!=i._timer&&(clearInterval(i._timer),i._timer=null),o())}}}(),i._timer=setInterval(r,500)}()}n.prototype.constructor=n,n.prototype.onEndTransitionFn=function(t,e){if(e.stopPropagation(),e.currentTarget.removeEventListener("transitionend",this.onEndTransitionFn),t._transitionEndNum++,t._option,t._transitionEndNum==t._option.cubeNum){t._target.querySelector(".cubeContainer").parentNode.removeChild(t._target.querySelector(".cubeContainer"));var i=t._target.querySelector("ul").querySelectorAll("li");if(t._option.lowLevel)for(var n=0;n<i.length;n++)if("block"===i[n].style.display){i[n].style.display="none";break}i[t._index].style.display="block",1==t._option.autoPlay&&(t._timeName=setInterval((function(){t.next()}),t._option.playTime)),t._canOption=!0,t._option.transitionComplete&&"function"==typeof t._option.transitionComplete&&t._option.transitionComplete(t._index)}},n.prototype.rotateVerticalCube=function(){var t=this._option.cubeNum,e=this._target.querySelector(".cubeContainer"),i=e.querySelectorAll(".cube"),n=e.offsetHeight,r=(e.offsetWidth,n/2);this._transitionEndNum=0;for(var o=0;o<t;o++){i[o].style.transition="transform 0.3s ease "+o/6+"s",i[o].style.transform="translate3d(0,0,-"+r+"px) rotateX("+"-90deg)"}},n.prototype.rotateHorizontalCube=function(){var t=this._option.cubeNum,e=this._target.querySelector(".cubeContainer"),i=e.querySelectorAll(".cube"),n=(e.offsetHeight,e.offsetWidth),r=n/2;this._transitionEndNum=0;for(var o=0;o<t;o++){i[o].style.transition="transform 0.3s ease "+o/6+"s",i[o].style.transform="translate3d(0,0,-"+r+"px) rotateY(90deg)"}},n.prototype.moveCube=function(){var t=this._option.cubeNum,e=this._target.querySelector(".cubeContainer").querySelectorAll(".cube");this._transitionEndNum=0;for(var i=0;i<t;i++)e[i].style.transition="all 0.3s ease "+i/6+"s","v"===this._option.direct?e[i].style.transform="translateY(0)":"h"===this._option.direct&&(e[i].style.transform="translateX(0)")},n.prototype.createVerticalCube=function(t){var e=this._imgList[t].getAttribute("src"),i=this._imgList[this._index].getAttribute("src");this._target.querySelector("ul").querySelectorAll("li")[t].style.display="none";var n=this._option.cubeNum,r=document.createElement("div");r.className="cubeContainer",this._target.appendChild(r);for(var o=r.offsetHeight,a=r.offsetWidth/n,s=o/2,c=-o/2,l=a-o+o/2,u=this._target.offsetWidth,d="",p=0;p<n;p++){var f=p*a,h=100+p,v="-"+f+"px 0",b=u+"px auto";p>n/2&&(h=-h);var m='<div class="cube" style="width:'+a+"px;height:"+o+"px;left:"+f+"px;transform:translate3d(0,0,-"+s+"px);z-index:"+h+';">';m+='<div class="cubeFont cubeDiv" style="transform:translate3d(0px,0px,'+s+"px);background-image:url("+e+");background-size:"+b+";background-position:"+v+'"></div>',m+='<div class="cubeTop cubeDiv" style="transform:translate3d(0px,-'+s+"px,0px) rotateX(90deg);background-image:url("+i+");background-size:"+b+";background-position:"+v+'"></div>',m+='<div class="cubeBack cubeDiv" style="transform:translate3d(0px,0px,-'+s+'px) rotateX(180deg);"></div>',m+='<div class="cubeBottom cubeDiv" style="transform:translate3d(0px,'+s+'px,0px) rotateX(-90deg);"></div>',m+='<div class="cubeLeft cubeDiv" style="width:'+o+"px;height:"+o+"px;transform:translate3d("+c+'px,0px,0px) rotateY(-90deg);"></div>',m+='<div class="cubeRight cubeDiv" style="width:'+o+"px;height:"+o+"px;transform:translate3d("+l+'px,0px,0px) rotateY(90deg);"></div>',d+=m+="</div>"}r.innerHTML=d;for(var g=r.querySelectorAll(".cube"),_=0;_<g.length;_++)g[_].addEventListener("transitionend",this.onEndTransitionFn.bind(this,this),!1);this.rotateVerticalCube()},n.prototype.createHorizontalCube=function(t){var e=this._imgList[t].getAttribute("src"),i=this._imgList[this._index].getAttribute("src");this._target.querySelector("ul").querySelectorAll("li")[t].style.display="none";var n=this._option.cubeNum,r=document.createElement("div");r.className="cubeContainer",this._target.appendChild(r);for(var o=r.offsetHeight/n,a=r.offsetWidth,s=a/2,c=-a/2,l=a/2,u=this._target.offsetWidth,d="",p=0;p<n;p++){var f=p*o,h=100+p,v="0 -"+f+"px",b=u+"px auto";p>n/2&&(h=-h);var m='<div class="cube" style="width:'+a+"px;height:"+o+"px;top:"+f+"px;transform:translate3d(0,0,-"+s+"px);z-index:"+h+';">';m+='<div class="cubeFont cubeDiv" style="transform:translate3d(0px,0px,'+s+"px);background-image:url("+e+");background-size:"+b+";background-position:"+v+'"></div>',m+='<div class="cubeTop cubeDiv" style="transform:translate3d(0px,-'+s+"px,0px) rotateX(90deg);width:"+a+"px;height:"+o+'px;"></div>',m+='<div class="cubeBack cubeDiv" style="transform:translate3d(0px,0px,-'+s+'px) rotateX(180deg);"></div>',m+='<div class="cubeBottom cubeDiv" style="transform:translate3d(0px,'+s+"px,0px) rotateX(-90deg);width:"+a+"px;height:"+a+'px;"></div>',m+='<div class="cubeLeft cubeDiv" style="transform:translate3d('+c+"px,0px,0px) rotateY(-90deg);background-image:url("+i+");background-size:"+b+";background-position:"+v+'"></div>',m+='<div class="cubeRight cubeDiv" style="transform:translate3d('+l+'px,0px,0px) rotateY(90deg);"></div>',d+=m+="</div>"}r.innerHTML=d;for(var g=r.querySelectorAll(".cube"),_=0;_<g.length;_++)g[_].addEventListener("transitionend",this.onEndTransitionFn.bind(this,this),!1);this.rotateHorizontalCube()},n.prototype.createLowLevelEffect=function(t){this._imgList[t].getAttribute("src");var e,i,n,r=this._imgList[this._index].getAttribute("src"),o=this._option.cubeNum,a=document.createElement("div");a.className="cubeContainer",this._target.appendChild(a),"v"===this._option.direct?(e=a.offsetHeight,i=a.offsetWidth/o):"h"===this._option.direct&&(e=a.offsetHeight/o,i=a.offsetWidth);for(var s="",c=this._target.offsetWidth,l=0;l<o;l++){var u="";"v"===this._option.direct?u='<div class="cube" style="width:'+i+"px;height:"+e+"px;left:"+(n=l*i)+"px;transform:translateY(-"+e+"px);background-image:url("+r+");background-size:"+(c+"px auto")+";background-position:"+("-"+n+"px 0")+'"></div>':"h"===this._option.direct&&(u='<div class="cube" style="width:'+i+"px;height:"+e+"px;top:"+(n=l*e)+"px;transform:translateX(-"+i+"px);background-image:url("+r+");background-size:"+(c+"px auto")+";background-position:"+("0 -"+n+"px")+'"></div>'),s+=u}a.innerHTML=s;for(var d=a.querySelectorAll(".cube"),p=this,f=0;f<d.length;f++)d[f].addEventListener("transitionend",this.onEndTransitionFn.bind(this,p),!1);setTimeout((function(){p.moveCube()}),50)},n.prototype.rotateBefore=function(t){if(null!=this._timeName&&null!=this._timeName&&clearInterval(this._timeName),1==this._option.cubeRandom){var e=parseInt(7*Math.random());0==e?this._option.path="h":6==e?this._option.path="v":this._option.cubeNum=e}this._option.lowLevel?this.createLowLevelEffect(t):"h"==this._option.direct?this.createHorizontalCube(t):this.createVerticalCube(t)},n.prototype.next=function(){if(this._canOption){this._canOption=!1;var t=this._index;this._index++,this._index>=this._imgList.length&&(this._index=0),this.rotateBefore(t)}},n.prototype.prev=function(){if(this._canOption){this._canOption=!1;var t=this._index;this._index--,this._index<0&&(this._index=this._imgList.length-1),this.rotateBefore(t)}},n.prototype.setIndex=function(t){if(this._canOption&&t!==this._index){this._canOption=!1;var e=this._index;this._index=t,this.rotateBefore(e)}},n.prototype.setCubeNum=function(t){this._option.cubeNum=t},n.prototype.setCubeDirect=function(t){if("h"!=t&&"v"!=t)throw new Error("direct need h or v");this._option.direct=t},n.prototype.getIndex=function(){return this._index},e.default=n},function(t,e,i){var n=i(2),r=i(3);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var o={insert:"head",singleton:!1};n(r,o);t.exports=r.locals||{}},function(t,e,i){"use strict";var n,r=function(){return void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n},o=function(){var t={};return function(e){if(void 0===t[e]){var i=document.querySelector(e);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}t[e]=i}return t[e]}}(),a=[];function s(t){for(var e=-1,i=0;i<a.length;i++)if(a[i].identifier===t){e=i;break}return e}function c(t,e){for(var i={},n=[],r=0;r<t.length;r++){var o=t[r],c=e.base?o[0]+e.base:o[0],l=i[c]||0,u="".concat(c," ").concat(l);i[c]=l+1;var d=s(u),p={css:o[1],media:o[2],sourceMap:o[3]};-1!==d?(a[d].references++,a[d].updater(p)):a.push({identifier:u,updater:b(p,e),references:1}),n.push(u)}return n}function l(t){var e=document.createElement("style"),n=t.attributes||{};if(void 0===n.nonce){var r=i.nc;r&&(n.nonce=r)}if(Object.keys(n).forEach((function(t){e.setAttribute(t,n[t])})),"function"==typeof t.insert)t.insert(e);else{var a=o(t.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var u,d=(u=[],function(t,e){return u[t]=e,u.filter(Boolean).join("\n")});function p(t,e,i,n){var r=i?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;if(t.styleSheet)t.styleSheet.cssText=d(e,r);else{var o=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function f(t,e,i){var n=i.css,r=i.media,o=i.sourceMap;if(r?t.setAttribute("media",r):t.removeAttribute("media"),o&&btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var h=null,v=0;function b(t,e){var i,n,r;if(e.singleton){var o=v++;i=h||(h=l(e)),n=p.bind(null,i,o,!1),r=p.bind(null,i,o,!0)}else i=l(e),n=f.bind(null,i,e),r=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(i)};return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else r()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=r());var i=c(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var n=0;n<i.length;n++){var r=s(i[n]);a[r].references--}for(var o=c(t,e),l=0;l<i.length;l++){var u=s(i[l]);0===a[u].references&&(a[u].updater(),a.splice(u,1))}i=o}}}},function(t,e,i){(e=i(4)(!1)).push([t.i,'@charset "utf-8";\r\n/* CSS Document */\r\n.box_rotate {overflow: hidden;position: relative;height:300px;}\r\n.box_rotate a{display:block;}\r\n.box_rotate img{width:100%;}\r\n.box_rotate>ul{width:100%;height:100%;}\r\n.box_rotate>ul>li{position:absolute;top:0;left:0;visibility:hidden;width:100%;}\r\n.box_rotate>ul>li:nth-child(1){visibility:visible;};\r\n.box_rotate>ul>li>a{display:block;width:100%;}\r\n.cubeContainer{\r\n\twidth: 100%;\r\n\theight:100%;\r\n\tposition:absolute;\r\n\ttop:0;\r\n\tleft:0;\r\n\t-moz-perspective: 1400px;\r\n\t-webkit-perspective: 1400px;\r\n\t-o-perspective: 1400px;\r\n\t-ms-perspective: 1400px;\r\n\t\r\n}\r\n.cube{\r\n\tposition: absolute;\r\n\t-webkit-transform-style: preserve-3d;\r\n\t-moz-transform-style: preserve-3d;\r\n\ttransform-style: preserve-3d;\r\n\t-o-transform-style: preserve-3d;\r\n}\r\n.cubeDiv{\r\n\twidth:100%;\r\n\theight:100%;\r\n\tbackground-repeat:no-repeat;\r\n\tposition:absolute;\r\n\tbackground-color:#222;\r\n\t-webkit-backface-visibility:hidden;\r\n}\r\n',""]),t.exports=e},function(t,e,i){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i=function(t,e){var i=t[1]||"",n=t[3];if(!n)return i;if(e&&"function"==typeof btoa){var r=(a=n,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),o=n.sources.map((function(t){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(t," */")}));return[i].concat(o).concat([r]).join("\n")}var a,s,c;return[i].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(i,"}"):i})).join("")},e.i=function(t,i,n){"string"==typeof t&&(t=[[null,t,""]]);var r={};if(n)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(r[a]=!0)}for(var s=0;s<t.length;s++){var c=[].concat(t[s]);n&&r[c[0]]||(i&&(c[2]?c[2]="".concat(i," and ").concat(c[2]):c[2]=i),e.push(c))}},e}}]).default}));
//# sourceMappingURL=cuberotate.js.map