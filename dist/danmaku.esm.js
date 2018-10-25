/*!
 * awesome-danmaku v1.1.7
 * (c) 2018 August-Z
 * https://github.com/August-Z/awesome-danmaku
 */
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=13)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(4);Object.keys(r).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return r[t]}})});var o=n(5);Object.keys(o).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return o[t]}})});e.TICK_TIME=20},function(t,e,n){"use strict";function r(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function o(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.DanmakuPlayer=void 0;var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),s=n(0),l=r(s),c=n(2),f=r(c),h=n(3),y=n(7),p=n(10);n(11),e.DanmakuPlayer=function(){function t(e){if(i(this,t),this.trackList=[],this.nodeList=[],this.list=[],!window)throw new Error("Please run in browser support.");if(!0!==t.__lock__)throw new Error('Please use the "getPlayer" function instead of creating objects.');this.playStatus=s.DanmakuControlPlayStatus.EMPTY,this._handleOptions(e),this._init()}return u(t,[{key:"insert",value:function(t){var e;return(e=this.list).push.apply(e,o(this._handleDanmakuOps(t))),this.list}},{key:"play",value:function(){var t=this;if(!Array.isArray(this.list))throw new TypeError("list must instanceof Array");if(["static","static !important",""].includes(getComputedStyle(this.el).position))throw new Error('Play error! el (wrap dom) position can\'t is static or empty, \nPlease set "relative"、"absolute" or "fixed".');return clearInterval(this.playTimer),this.playTimer=setInterval(function(){t.playTick()},this._loopTime),this.playStatus=s.DanmakuControlPlayStatus.PLAY,this._controlHook(s.DanmakuControlEventName.PLAY),this}},{key:"playTick",value:function(){if(this.hasTasks&&this.playStatus===s.DanmakuControlPlayStatus.PLAY){var t=this.list.shift();this.getUnObstructedNode().patch(t).run(function(t){})}}},{key:"pause",value:function(){var t=this;return setTimeout(function(){t.playStatus=s.DanmakuControlPlayStatus.PAUSED,t._controlHook(s.DanmakuControlEventName.PAUSE)},this._loopTime),this}},{key:"stop",value:function(){var t=this;return setTimeout(function(){clearInterval(t.playTimer),t.clearList(),t.playStatus=s.DanmakuControlPlayStatus.STOP,t._controlHook(s.DanmakuControlEventName.STOP)},this._loopTime),this}},{key:"clearList",value:function(){return Array.isArray(this.list)&&this.list.length&&(this.list=[]),this}},{key:"change",value:function(t,e){switch(t){case"opacity":this._changeOpacity(Number(e));break;case"speed":this._changeSpeed(Number(e));break;default:console.warn("[Change WARN]: The player not has '"+t+"' param! Or this property is readonly.\n")}}},{key:"changeTrack",value:function(t,e){switch(t){case"overlap":this._changeTrackOverlap(Number(e));break;default:console.warn("[Change WARN]: The track not has '"+t+"' param! Or this property is readonly.\n")}}},{key:"getUnObstructedTrack",value:function(t){var e=this.trackList.filter(function(t){return t.unObstructed});return e["number"==typeof t?t:Math.floor(Math.random()*e.length)]}},{key:"getUnObstructedNode",value:function(t){var e=this.nodeList.filter(function(t){return t.unObstructed});return e["number"==typeof t?t:Math.floor(Math.random()*e.length)]}},{key:"_handleOptions",value:function(t){var e=l.DanmakuPlayDefaultConfig.getDefault;if("string"==typeof t||t instanceof HTMLElement)(0,p.initMergeDefaultParams)({},a({el:t},e),this);else{if(!(t instanceof Object||"[object Object]"===Object.prototype.toString.call(t)))throw new Error("Control error, bad param(options) !");(0,p.initMergeDefaultParams)(t,a({el:document.body},e),this),t.hasOwnProperty("list")&&this.insert(t.list)}return this}},{key:"_init",value:function(){return this._initSelfConfig(),this._checkElement(),this._bindControlStyle(),this._initTrackList(),this._initNodeList(),this.playStatus=s.DanmakuControlPlayStatus.INIT,this._controlHook(s.DanmakuControlEventName.INIT),this}},{key:"_initSelfConfig",value:function(){return this._loopTime=Number(Math.round(this.rollingTime/this.nodeMaxCount)+l.TICK_TIME),this}},{key:"_checkElement",value:function(){if("string"==typeof this.el){var t=document.querySelector(this.el);if(null===t)throw new Error("Control dom(el) query for no result");this.el=t}else if(!(this.el instanceof HTMLElement))throw new Error("Control[el] not is HTMLElement, check code !");return this}},{key:"_bindControlStyle",value:function(){return["","static"].includes(getComputedStyle(this.el).position)&&(this.el.style.position="relative"),this.el.style.overflow="hidden",this.el.style.cursor="none",this.el.style.pointerEvents="none",this.el.style.verticalAlign="baseline",this}},{key:"_initTrackList",value:function(){for(var t=0;t<this.trackCount;t++)this.trackList.push(new h.Dtrack({index:t,width:this.playerWidth,height:this.trackHeight,overlap:0}));return this}},{key:"_initNodeList",value:function(){for(var t=this,e="",n=this.nodeTag.toLowerCase(),r=0;r<this.nodeMaxCount;r++)e+="<"+n+' class="'+this.nodeClass+'"></'+n+">";return this.el.innerHTML=e,setTimeout(function(){var e=t.el.getElementsByClassName(t.nodeClass);t.nodeList=Array.prototype.slice.call(e).map(function(e){return new y.Dnode(a({control:t,text:""},l.DnodeDefaultConfig.getDefault)).init(e)})},l.TICK_TIME),this}},{key:"_handleDanmakuOps",value:function(t){var e=this,n=[];return Array.isArray(t)||"[object Array]"===Object.prototype.toString.call(t)?n.push.apply(n,o(t.map(function(t){return e._transformDnodeOps(t)}))):n.push(this._transformDnodeOps(t)),n}},{key:"_transformDnodeOps",value:function(t){if("string"==typeof t)return a({control:this,text:t},l.DnodeDefaultConfig.getDefault);if(t instanceof Object)return(0,p.initMergeDefaultParams)(t,a({control:this,text:t.hasOwnProperty(this.nodeValueKey)?t[this.nodeValueKey]:""},l.DnodeDefaultConfig.getDefault));throw new TypeError("TransformDnodeOps error, Bad param!")}},{key:"_changeDensity",value:function(){}},{key:"_changeSpeed",value:function(t){if(Number.isNaN(t))throw new Error("Change Error, speed type must be number, not NaN !\nPlease check speed param !");if(t<0)throw new Error("Change Error, opacity value must be greater than 0.\n");this.nodeList.forEach(function(e){e.speed=t}),this.list.forEach(function(e){e.speed=t})}},{key:"_changeOpacity",value:function(t){if(Number.isNaN(t))throw new Error("Change Error, opacity type must be number, not NaN !\nPlease check opacity param !");if(t<0||t>1)throw new Error("Change Error, opacity value must between 0 and 1.\n");this.nodeList.map(function(t){return t.dom}).forEach(function(e){e.style.opacity=t+""}),this.list.forEach(function(e){e.opacity=t})}},{key:"_changeTrackOverlap",value:function(t){this.trackList.forEach(function(e){e.setOverlap(t)})}},{key:"_controlHook",value:function(t){var e=this;this.on.hasOwnProperty(t)&&"function"==typeof this.on[t]&&f.controlEmitter.hook(t,function(n,r){e.on[t](e,n,r)})}},{key:"playerWidth",get:function(){return this.el.clientWidth||0}},{key:"hasTasks",get:function(){return!!this.list.length&&this.trackList.some(function(t){return t.unObstructed})&&this.nodeList.some(function(t){return t.unObstructed})}}],[{key:"getPlayer",value:function(e){return t.instanceControl||(t.__lock__=!0,t.instanceControl=new t(e)),t.instanceControl}}]),t}()},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.controlEmitter=e.DanmakuControlEvent=void 0;var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(0),s=n(6),l=function(t){function e(t){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t))}return i(e,t),a(e,[{key:"hook",value:function(t,e){if(this.hooks.has(t))return void e(this,t);throw new Error("[Event Error]: Hook error, Not has "+t+" event !")}}]),e}(s.DanmakuEvent);e.DanmakuControlEvent=l;e.controlEmitter=new l(u.DanmakuControlEventName)},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=e.Dtrack=function(){function t(e){r(this,t),this.status=t.UN_ROLLING,this.index=e.index,this.height=e.height,this.offsetTop=e.height*e.index,this.setOverlap(e.overlap)}return o(t,[{key:"setOverlap",value:function(t){this.overlap=1-t/2>.5?1-t/2:.5}},{key:"rolling",value:function(e){var n=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20;setTimeout(function(){n.status=t.ROLLING,"function"==typeof e&&e(n)},r)}},{key:"stopRolling",value:function(){this.status=t.UN_ROLLING}},{key:"getTopByMiddleDnode",value:function(t){return this.offsetTop+(this.height-t)/2}},{key:"obstructed",get:function(){return this.status===t.ROLLING}},{key:"unObstructed",get:function(){return this.status===t.UN_ROLLING}}]),t}();i.ROLLING=1,i.UN_ROLLING=0},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=e.DnodeDefaultConfig=function(){function t(){r(this,t)}return o(t,null,[{key:"getDefault",get:function(){return{fontSize:t.FONT_SIZE,fontFamily:t.FONT_FAMILY,color:t.COLOR,speed:t.SPEED,fontWeight:t.FONT_WEIGHT,opacity:t.OPACITY}}}]),t}();i.FONT_SIZE=22,i.FONT_FAMILY="SimHei",i.COLOR="#FFFFFF",i.SPEED=1,i.FONT_WEIGHT="normal",i.OPACITY="1";var a=e.DanmakuPlayDefaultConfig=function(){function t(){r(this,t)}return o(t,null,[{key:"getDefault",get:function(){return{rollingTime:t.ROLLING_TIME,nodeTag:t.NODE_TAG,nodeClass:t.NODE_CLASS,nodeMaxCount:t.NODE_MAX_COUNT,nodeValueKey:t.NODE_VALUE_KEY,trackCount:t.TRACK_COUNT,trackHeight:t.TRACK_HEIGHT,on:t.EVENT}}}]),t}();a.ROLLING_TIME=6e3,a.NODE_TAG="p",a.NODE_CLASS="awesome-danmaku-item",a.NODE_MAX_COUNT=25,a.NODE_VALUE_KEY="value",a.TRACK_COUNT=5,a.TRACK_HEIGHT=40,a.EVENT={}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=e.DanmakuControlPlayStatus=function t(){r(this,t)};o.EMPTY=-1,o.INIT=100,o.STOP=110,o.PLAY=200,o.PAUSED=210;e.DanmakuControlEventName={INIT:"init",PLAY:"play",PAUSE:"pause",STOP:"stop"}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&u.return&&u.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=function(){function t(e){var n=this;r(this,t),this.hooks=new Set,Object.entries(e).forEach(function(t){var e=o(t,2),r=(e[0],e[1]);n.hooks.add(r)})}return i(t,[{key:"hook",value:function(t,e){}}]),t}();e.DanmakuEvent=a},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0}),e.Dnode=void 0;var o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&u.return&&u.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=n(0),s=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(u),l=n(8),c=(n(3),n(1)),f=n(9);e.Dnode=function(){function t(e){r(this,t),this.runStatus=f.DnodeRunStatus.EMPTY,this._init(e)}return a(t,[{key:"init",value:function(t){return this.dom=t,this.runStatus=f.DnodeRunStatus.INIT,this}},{key:"patch",value:function(t){return this._init(t),this._computedTextSize(),this._computedTotalDistance(),this._joinTrack(),this._editText(),this}},{key:"run",value:function(t){var e=this;this._draw(),this.runStatus=f.DnodeRunStatus.READY,this.track.rolling(function(n){e.launch(),e.runStatus=f.DnodeRunStatus.RUNNING,setTimeout(function(){n.stopRolling(),e.runStatus=f.DnodeRunStatus.LAUNCHED},e.launchTime*e.track.overlap),setTimeout(function(){e.flyBack(),e.runStatus=f.DnodeRunStatus.RUN_END,"function"==typeof t&&t(e)},e.totalTime)})}},{key:"launch",value:function(){return this.dom.style.transform="translate3d("+this.translateX+"px, 0, 0)",this}},{key:"flyBack",value:function(){return this.dom.innerText="",this.dom.style.display="none",this.dom.style.transform="translate3d(0, 0, 0)",this.dom.style.transition="transform 0ms linear 0s",this}},{key:"_init",value:function(t){if(!(t instanceof Object))throw new Error("Init error: Dnode ops bad !");this.text=t.text,this.control=t.control,this.fontSize=t.fontSize,this.fontFamily=t.fontFamily,this.fontWeight=t.fontWeight,this.opacity=t.opacity,this.color=t.color,this.speed=t.speed}},{key:"_computedTextSize",value:function(){var e=(0,l.translateTextToSize)(this.text,t.getInstanceTemplateDom({fontSize:this.fontSize+"px",fontFamily:this.fontFamily,fontWeight:this.fontWeight})),n=e.width,r=e.height;this.width=n,this.height=this.control.trackHeight||r}},{key:"_computedTotalDistance",value:function(){var t=this.control.playerWidth+this.width;this.translateX=-1*t,this.launchTime=Math.round(this.control.rollingTime*(this.width/t)),this.totalTime=Math.round(this.control.rollingTime/this.speed)}},{key:"_joinTrack",value:function(){return this.track=this.control.getUnObstructedTrack(),this}},{key:"_editText",value:function(){return this.dom.innerText=this.text,this}},{key:"_draw",value:function(){if(!(this.dom instanceof HTMLElement))throw new Error("Draw error: dom not instanceof HTMLElement !");var t=this.dom.style;return Object.entries(this.drawStyle).forEach(function(e){var n=i(e,2),r=n[0],o=n[1];t[r]=o}),this}},{key:"unObstructed",get:function(){return[f.DnodeRunStatus.INIT,f.DnodeRunStatus.RUN_END].includes(this.runStatus)}},{key:"drawStyle",get:function(){return{display:"inline-block",width:this.width+"px",height:this.height+"px",lineHeight:"1.125",fontSize:this.fontSize+"px",fontFamily:this.fontFamily,fontWeight:this.fontWeight,color:this.color,top:this.track.getTopByMiddleDnode(this.height)+"px",left:this.control.playerWidth+"px",opacity:this.opacity+"",transform:"translate3d(0, 0, 0)",transition:"transform "+this.totalTime+"ms linear 0s",position:"absolute",userSelect:"none",whiteSpace:"pre",perspective:"500px",cursor:"none",pointerEvents:"none"}}}],[{key:"getInstanceTemplateDom",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{fontSize:s.DnodeDefaultConfig.FONT_SIZE+"px",fontFamily:s.DnodeDefaultConfig.FONT_FAMILY,fontWeight:s.DnodeDefaultConfig.FONT_WEIGHT};if(t.instanceTextSizeDom)Object.entries(e).forEach(function(e){var n=i(e,2),r=n[0],o=n[1];t.instanceTextSizeDom.style[r]=o});else{var n=document.createElement("div"),r=o({position:"fixed",visibility:"hidden",display:"inline-block",zIndex:"-1",whiteSpace:"pre"},e);if(n.className="awesome-danmaku-template",Object.entries(r).forEach(function(t){var e=i(t,2),r=e[0],o=e[1];n.style[r]=o}),document.body)document.body.appendChild(n);else{if(!(c.DanmakuPlayer.getPlayer().el instanceof HTMLElement))throw new Error("Template DOM Error! [document.body] missing or Not control wrap Dom!!");c.DanmakuPlayer.getPlayer().el.appendChild(n)}t.instanceTextSizeDom=n}return t.instanceTextSizeDom}}]),t}()},function(t,e,n){"use strict";function r(t,e){return e.textContent=t,{width:parseFloat(window.getComputedStyle(e).width),height:parseFloat(window.getComputedStyle(e).height)}}Object.defineProperty(e,"__esModule",{value:!0}),e.translateTextToSize=r},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=e.DnodeRunStatus=function t(){r(this,t)};o.EMPTY=-1,o.INIT=100,o.READY=110,o.RUNNING=200,o.LAUNCHED=210,o.RUN_END=220},function(t,e,n){"use strict";function r(t,e,n){if(!(t instanceof Object&&e instanceof Object))throw new TypeError("params must instanceof Object !");Object.entries(t).forEach(function(t){var n=a(t,2),r=n[0],o=n[1];e.hasOwnProperty(r)&&(e[r]=o)});var r=Object.entries(e);return n&&n instanceof Object?o(n,r):i(r)}function o(t,e){return e.forEach(function(e){var n=a(e,2),r=n[0],o=n[1];t[r]=o}),t}function i(t){var e={};return t.forEach(function(t){var n=a(t,2),r=n[0],o=n[1];e[r]=o}),e}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,u=t[Symbol.iterator]();!(r=(a=u.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&u.return&&u.return()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e.initMergeDefaultParams=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(2);Object.keys(r).forEach(function(t){"default"!==t&&"__esModule"!==t&&Object.defineProperty(e,t,{enumerable:!0,get:function(){return r[t]}})})},,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(1);e.default={control:r.DanmakuPlayer}}])});