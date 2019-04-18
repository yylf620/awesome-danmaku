/*!
 * awesome-danmaku v1.3.4
 * (c) 2019 August-Z
 * https://github.com/August-Z/awesome-danmaku
 */
(function t(e,n){if(typeof exports==="object"&&typeof module==="object")module.exports=n();else if(typeof define==="function"&&define.amd)define([],n);else{var r=n();for(var i in r)(typeof exports==="object"?exports:e)[i]=r[i]}})(window,function(){return function(n){var r={};function i(t){if(r[t]){return r[t].exports}var e=r[t]={i:t,l:false,exports:{}};n[t].call(e.exports,e,e.exports,i);e.l=true;return e.exports}i.m=n;i.c=r;i.d=function(t,e,n){if(!i.o(t,e)){Object.defineProperty(t,e,{enumerable:true,get:n})}};i.r=function(t){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(t,Symbol.toStringTag,{value:"Module"})}Object.defineProperty(t,"__esModule",{value:true})};i.t=function(e,t){if(t&1)e=i(e);if(t&8)return e;if(t&4&&typeof e==="object"&&e&&e.__esModule)return e;var n=Object.create(null);i.r(n);Object.defineProperty(n,"default",{enumerable:true,value:e});if(t&2&&typeof e!="string")for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n};i.n=function(e){var t=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};i.d(t,"a",t);return t};i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)};i.p="/";return i(i.s=12)}([function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:true});var r=e(4);Object.keys(r).forEach(function(e){if(e==="default"||e==="__esModule")return;Object.defineProperty(n,e,{enumerable:true,get:function t(){return r[e]}})});var i=e(5);Object.keys(i).forEach(function(e){if(e==="default"||e==="__esModule")return;Object.defineProperty(n,e,{enumerable:true,get:function t(){return i[e]}})});var o=n.TICK_TIME=16},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.DanmakuPlayer=undefined;var f=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n){if(Object.prototype.hasOwnProperty.call(n,r)){t[r]=n[r]}}}return t};var r=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(t,r.key,r)}}return function(t,e,n){if(e)r(t.prototype,e);if(n)r(t,n);return t}}();var i=n(0);var c=y(i);var o=n(2);var a=y(o);var u=n(3);var h=n(7);var s=n(10);var l=n(11);function y(t){if(t&&t.__esModule){return t}else{var e={};if(t!=null){for(var n in t){if(Object.prototype.hasOwnProperty.call(t,n))e[n]=t[n]}}e.default=t;return e}}function d(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++){n[e]=t[e]}return n}else{return Array.from(t)}}function p(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var v=e.DanmakuPlayer=function(){function n(t){p(this,n);this.trackList=[];this.nodeList=[];this.list=[];if(!window){throw new Error("Please run in browser support.")}else if(n.__lock__!==true){throw new Error('Please use the "getPlayer" function instead of creating objects.')}this.playStatus=i.DanmakuControlPlayStatus.EMPTY;this._handleOptions(t);this._init()}r(n,[{key:"insert",value:function t(e){var n=this;var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(r){var i=this.nodeTag.toLowerCase();var o=document.createElement(i);var a=this._handleDanmakuOps(e).shift();var u=new h.Dnode(f({control:self},c.DnodeDefaultConfig.getDefault,a)).init(o);console.log(a);var s="";if("nodeClass"in a&&a.nodeClass){if(Array.isArray(a.nodeClass)&&a.nodeClass.every(function(t){return typeof t==="string"})){s=a.nodeClass.join(" ")}else if(typeof a.nodeClass==="string"){s=a.nodeClass}}o.setAttribute("class",this.nodeClass+" "+s);this.el.appendChild(o);u.patch(a).run(function(t){n.el.removeChild(o)})}else{var l;(l=this.list).push.apply(l,d(this._handleDanmakuOps(e)))}return this.list}},{key:"play",value:function t(){if(!Array.isArray(this.list)){throw new TypeError("list must instanceof Array")}else if(["static","static !important",""].includes(getComputedStyle(this.el).position)){throw new Error("Play error! el (wrap dom) position can't is static or empty, \n"+'Please set "relative"、"absolute" or "fixed".')}var e=this;var n=0;function r(){requestAnimationFrame(r);if(++n%e._overlap===0){n=0;e.playTick()}}requestAnimationFrame(r);this.playStatus=i.DanmakuControlPlayStatus.PLAY;this._controlHook(i.DanmakuControlEventName.PLAY);return this}},{key:"playTick",value:function t(){if(this.hasTasks&&this.playStatus===i.DanmakuControlPlayStatus.PLAY){var e=this.list.shift();var n=this.getUnObstructedNode();n.patch(e).run(function(t){})}}},{key:"pause",value:function t(){var e=this;setTimeout(function(){e.playStatus=i.DanmakuControlPlayStatus.PAUSED;e._controlHook(i.DanmakuControlEventName.PAUSE)},this._loopTime);return this}},{key:"stop",value:function t(){var e=this;setTimeout(function(){clearInterval(e.playTimer);e.clearList();e.playStatus=i.DanmakuControlPlayStatus.STOP;e._controlHook(i.DanmakuControlEventName.STOP)},this._loopTime);return this}},{key:"clearList",value:function t(){if(Array.isArray(this.list)&&this.list.length){this.list=[]}return this}},{key:"change",value:function t(e,n){switch(e){case"opacity":this._changeOpacity(Number(n));break;case"speed":this._changeSpeed(Number(n));break;case"overlap":this._changeOverlap(Number(n));break;default:console.warn("[Change WARN]: The player not has '"+e+"' param! Or this property is readonly.\n")}}},{key:"getUnObstructedTrack",value:function t(e){var n=this.trackList.filter(function(t){return t.unObstructed});var r=typeof e==="number"?e:Math.floor(Math.random()*n.length);return n[r]}},{key:"getUnObstructedNode",value:function t(e){var n=this.nodeList.filter(function(t){return t.unObstructed});var r=typeof e==="number"?e:Math.floor(Math.random()*n.length);return n[r]}},{key:"_handleOptions",value:function t(e){var n=c.DanmakuPlayDefaultConfig.getDefault;if(typeof e==="string"||e instanceof HTMLElement){(0,s.initMergeDefaultParams)({},f({el:e},n),this)}else if(e instanceof Object||Object.prototype.toString.call(e)==="[object Object]"){(0,s.initMergeDefaultParams)(e,f({el:document.body},n),this);if(e.hasOwnProperty("list")){this.insert(e.list)}}else{throw new Error("Control error, bad param(options) !")}return this}},{key:"_init",value:function t(){this._initSelfConfig();this._checkElement();this._bindControlStyle();this._initTrackList();this._initNodeList();this.playStatus=i.DanmakuControlPlayStatus.INIT;this._controlHook(i.DanmakuControlEventName.INIT);return this}},{key:"_initSelfConfig",value:function t(){this._loopTime=Number(Math.round(this.rollingTime/this.nodeMaxCount)+c.TICK_TIME);this._overlap=15;return this}},{key:"_checkElement",value:function t(){if(typeof this.el==="string"){var e=document.querySelector(this.el);if(e===null){throw new Error("Control dom(el) query for no result")}else{this.el=e}}else if(!(this.el instanceof HTMLElement)){throw new Error("Control[el] not is HTMLElement, check code !")}return this}},{key:"_bindControlStyle",value:function t(){if(["","static"].includes(getComputedStyle(this.el).position)){this.el.style.position="relative"}this.el.style.overflow="hidden";this.el.style.cursor="none";this.el.style.pointerEvents="none";this.el.style.verticalAlign="baseline";return this}},{key:"_initTrackList",value:function t(){for(var e=0;e<this.trackCount;e++){this.trackList.push(new u.Dtrack({index:e,width:this.playerWidth,height:this.trackHeight}))}return this}},{key:"_initNodeList",value:function t(){var e=this;var n="";var r=this.nodeTag.toLowerCase();for(var i=0;i<this.nodeMaxCount;i++){n+="<"+r+' class="'+this.nodeClass+'"></'+r+">"}this.el.innerHTML=n;setTimeout(function(){var t=e.el.getElementsByClassName(e.nodeClass);e.nodeList=Array.prototype.slice.call(t).map(function(t){return new h.Dnode(f({control:e,text:""},c.DnodeDefaultConfig.getDefault)).init(t)})},c.TICK_TIME);return this}},{key:"_handleDanmakuOps",value:function t(e){var n=this;var r=[];if(Array.isArray(e)||Object.prototype.toString.call(e)==="[object Array]"){r.push.apply(r,d(e.map(function(t){return n._transformDnodeOps(t)})))}else{r.push(this._transformDnodeOps(e))}return r}},{key:"_transformDnodeOps",value:function t(e){if(typeof e==="string"){return f({control:this,text:e},c.DnodeDefaultConfig.getDefault)}else if(e instanceof Object){return(0,s.initMergeDefaultParams)(e,f({control:this,text:e.hasOwnProperty(this.nodeValueKey)?e[this.nodeValueKey]:""},c.DnodeDefaultConfig.getDefault))}else{throw new TypeError("TransformDnodeOps error, Bad param!")}}},{key:"_changeDensity",value:function t(){}},{key:"_changeSpeed",value:function t(e){if(Number.isNaN(e)){throw new Error("Change Error, speed type must be number, not NaN !\n"+"Please check speed param !")}else if(e<0){throw new Error("Change Error, opacity value must be greater than 0.\n")}this.nodeList.forEach(function(t){t.speed=e});this.list.forEach(function(t){t.speed=e})}},{key:"_changeOpacity",value:function t(e){if(Number.isNaN(e)){throw new Error("Change Error, opacity type must be number, not NaN !\n"+"Please check opacity param !")}else if(e<0||e>1){throw new Error("Change Error, opacity value must between 0 and 1.\n")}this.nodeList.map(function(t){return t.dom}).forEach(function(t){t.style.opacity=e+""});this.list.forEach(function(t){t.opacity=e})}},{key:"_changeOverlap",value:function t(e){var n=Math.round((1-e)*20)+5;this._overlap=Math.min(25,Math.max(5,n))}},{key:"_controlHook",value:function t(n){var r=this;if(this.on.hasOwnProperty(n)&&typeof this.on[n]==="function"){a.controlEmitter.hook(n,function(t,e){r.on[n](r,t,e)})}}},{key:"playerWidth",get:function t(){return this.el.clientWidth||0}},{key:"hasTasks",get:function t(){return!!this.list.length&&this.trackList.some(function(t){return t.unObstructed})&&this.nodeList.some(function(t){return t.unObstructed})}}],[{key:"getPlayer",value:function t(e){if(!n.instanceControl){n.__lock__=true;n.instanceControl=new n(e)}return n.instanceControl}}]);return n}()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.controlEmitter=e.DanmakuControlEvent=undefined;var r=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(t,r.key,r)}}return function(t,e,n){if(e)r(t.prototype,e);if(n)r(t,n);return t}}();var i=n(0);var o=n(6);function a(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}function u(t,e){if(!t){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return e&&(typeof e==="object"||typeof e==="function")?e:t}function s(t,e){if(typeof e!=="function"&&e!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof e)}t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:false,writable:true,configurable:true}});if(e)Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e}var l=function(t){s(e,t);function e(t){a(this,e);return u(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t))}r(e,[{key:"hook",value:function t(e,n){if(this.hooks.has(e)){n(this,e);return}throw new Error("[Event Error]: Hook error, Not has "+e+" event !")}}]);return e}(o.DanmakuEvent);e.DanmakuControlEvent=l;var f=e.controlEmitter=new l(i.DanmakuControlEventName)},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});var r=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(t,r.key,r)}}return function(t,e,n){if(e)r(t.prototype,e);if(n)r(t,n);return t}}();function o(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var i=e.Dtrack=function(){function i(t){o(this,i);this.status=i.UN_ROLLING;this.index=t.index;this.height=t.height;this.offsetTop=t.height*t.index}r(i,[{key:"rolling",value:function t(e){var n=this;var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:20;setTimeout(function(){n.status=i.ROLLING;typeof e==="function"&&e(n)},r)}},{key:"stopRolling",value:function t(){this.status=i.UN_ROLLING}},{key:"getTopByMiddleDnode",value:function t(e){return this.offsetTop+(this.height-e)/2}},{key:"obstructed",get:function t(){return this.status===i.ROLLING}},{key:"unObstructed",get:function t(){return this.status===i.UN_ROLLING}}]);return i}();i.ROLLING=1;i.UN_ROLLING=0},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});var r=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(t,r.key,r)}}return function(t,e,n){if(e)r(t.prototype,e);if(n)r(t,n);return t}}();function i(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var o=e.DnodeDefaultConfig=function(){function e(){i(this,e)}r(e,null,[{key:"getDefault",get:function t(){return{fontSize:e.FONT_SIZE,fontFamily:e.FONT_FAMILY,color:e.COLOR,speed:e.SPEED,fontWeight:e.FONT_WEIGHT,opacity:e.OPACITY,nodeClass:""}}}]);return e}();o.FONT_SIZE=22;o.FONT_FAMILY="SimHei";o.COLOR="#FFFFFF";o.SPEED=1;o.FONT_WEIGHT="normal";o.OPACITY="1";var a=e.DanmakuPlayDefaultConfig=function(){function e(){i(this,e)}r(e,null,[{key:"getDefault",get:function t(){return{rollingTime:e.ROLLING_TIME,nodeTag:e.NODE_TAG,nodeClass:e.NODE_CLASS,nodeMaxCount:e.NODE_MAX_COUNT,nodeValueKey:e.NODE_VALUE_KEY,trackCount:e.TRACK_COUNT,trackHeight:e.TRACK_HEIGHT,on:e.EVENT}}}]);return e}();a.ROLLING_TIME=6e3;a.NODE_TAG="p";a.NODE_CLASS="awesome-danmaku-item";a.NODE_MAX_COUNT=25;a.NODE_VALUE_KEY="value";a.TRACK_COUNT=5;a.TRACK_HEIGHT=40;a.EVENT={}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});function r(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var i=e.DanmakuControlPlayStatus=function t(){r(this,t)};i.EMPTY=-1;i.INIT=100;i.STOP=110;i.PLAY=200;i.PAUSED=210;var o=e.DanmakuControlEventName={INIT:"init",PLAY:"play",PAUSE:"pause",STOP:"stop"}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});var o=function(){function n(t,e){var n=[];var r=true;var i=false;var o=undefined;try{for(var a=t[Symbol.iterator](),u;!(r=(u=a.next()).done);r=true){n.push(u.value);if(e&&n.length===e)break}}catch(t){i=true;o=t}finally{try{if(!r&&a["return"])a["return"]()}finally{if(i)throw o}}return n}return function(t,e){if(Array.isArray(t)){return t}else if(Symbol.iterator in Object(t)){return n(t,e)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}}();var r=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(t,r.key,r)}}return function(t,e,n){if(e)r(t.prototype,e);if(n)r(t,n);return t}}();function a(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var i=function(){function e(t){var i=this;a(this,e);this.hooks=new Set;Object.entries(t).forEach(function(t){var e=o(t,2),n=e[0],r=e[1];i.hooks.add(r)})}r(e,[{key:"hook",value:function t(e,n){}}]);return e}();e.DanmakuEvent=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.Dnode=undefined;var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n){if(Object.prototype.hasOwnProperty.call(n,r)){t[r]=n[r]}}}return t};var a=function(){function n(t,e){var n=[];var r=true;var i=false;var o=undefined;try{for(var a=t[Symbol.iterator](),u;!(r=(u=a.next()).done);r=true){n.push(u.value);if(e&&n.length===e)break}}catch(t){i=true;o=t}finally{try{if(!r&&a["return"])a["return"]()}finally{if(i)throw o}}return n}return function(t,e){if(Array.isArray(t)){return t}else if(Symbol.iterator in Object(t)){return n(t,e)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}}();var i=function(){function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(t,r.key,r)}}return function(t,e,n){if(e)r(t.prototype,e);if(n)r(t,n);return t}}();var o=n(0);var u=h(o);var s=n(8);var l=n(3);var f=n(1);var c=n(9);function h(t){if(t&&t.__esModule){return t}else{var e={};if(t!=null){for(var n in t){if(Object.prototype.hasOwnProperty.call(t,n))e[n]=t[n]}}e.default=t;return e}}function y(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var d=e.Dnode=function(){function o(t){y(this,o);this.runStatus=c.DnodeRunStatus.EMPTY;this._init(t)}i(o,[{key:"init",value:function t(e){this.dom=e;this.runStatus=c.DnodeRunStatus.INIT;return this}},{key:"patch",value:function t(e){this._init(e);this._computedTextSize();this._computedTotalDistance();this._joinTrack();this._editText();return this}},{key:"run",value:function t(e){var n=this;this._draw();this.runStatus=c.DnodeRunStatus.READY;this.track.rolling(function(t){n.launch();n.runStatus=c.DnodeRunStatus.RUNNING;setTimeout(function(){t.stopRolling();n.runStatus=c.DnodeRunStatus.LAUNCHED},n.launchTime);setTimeout(function(){n.flyBack();n.runStatus=c.DnodeRunStatus.RUN_END;typeof e==="function"&&e(n)},n.totalTime)})}},{key:"launch",value:function t(){this.dom.style.transform="translate3d("+this.translateX+"px, 0, 0)";return this}},{key:"flyBack",value:function t(){this.dom.innerText="";this.dom.style.display="none";this.dom.style.transform="translate3d(0, 0, 0)";this.dom.style.transition="transform 0ms linear 0s";return this}},{key:"_init",value:function t(e){if(e instanceof Object){this.text=e.text;this.control=e.control;this.fontSize=e.fontSize;this.fontFamily=e.fontFamily;this.fontWeight=e.fontWeight;this.opacity=e.opacity;this.color=e.color;this.speed=e.speed}else{throw new Error("Init error: Dnode ops bad !")}}},{key:"_computedTextSize",value:function t(){var e=(0,s.translateTextToSize)(this.text,o.getInstanceTemplateDom({fontSize:this.fontSize+"px",fontFamily:this.fontFamily,fontWeight:this.fontWeight})),n=e.width,r=e.height;this.width=n;this.height=this.control.trackHeight||r}},{key:"_computedTotalDistance",value:function t(){var e=this.control.playerWidth+this.width;this.translateX=-1*e;this.launchTime=Math.round(this.control.rollingTime*(this.width/e));this.totalTime=Math.round(this.control.rollingTime/this.speed)}},{key:"_joinTrack",value:function t(){this.track=this.control.getUnObstructedTrack();return this}},{key:"_editText",value:function t(){this.dom.innerText=this.text;return this}},{key:"_draw",value:function t(){if(!(this.dom instanceof HTMLElement)){throw new Error("Draw error: dom not instanceof HTMLElement !")}var i=this.dom.style;Object.entries(this.drawStyle).forEach(function(t){var e=a(t,2),n=e[0],r=e[1];i[n]=r});return this}},{key:"unObstructed",get:function t(){return[c.DnodeRunStatus.INIT,c.DnodeRunStatus.RUN_END].includes(this.runStatus)}},{key:"drawStyle",get:function t(){return{display:"inline-block",width:this.width+"px",height:this.height+"px",lineHeight:this.height+"px",fontSize:this.fontSize+"px",fontFamily:this.fontFamily,fontWeight:this.fontWeight,color:this.color,top:this.track.getTopByMiddleDnode(this.height)+"px",left:this.control.playerWidth+"px",opacity:this.opacity+"",transform:"translate3d(0, 0, 0)",transition:"transform "+this.totalTime+"ms linear 0s",position:"absolute",userSelect:"none",whiteSpace:"pre",perspective:"500px",cursor:"none",pointerEvents:"none"}}}],[{key:"getInstanceTemplateDom",value:function t(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{fontSize:u.DnodeDefaultConfig.FONT_SIZE+"px",fontFamily:u.DnodeDefaultConfig.FONT_FAMILY,fontWeight:u.DnodeDefaultConfig.FONT_WEIGHT};if(!o.instanceTextSizeDom){var i=document.createElement("div");var n=r({position:"fixed",visibility:"hidden",display:"inline-block",zIndex:"-1",whiteSpace:"pre"},e);i.className="awesome-danmaku-template";Object.entries(n).forEach(function(t){var e=a(t,2),n=e[0],r=e[1];i.style[n]=r});if(document.body){document.body.appendChild(i)}else if(f.DanmakuPlayer.getPlayer().el instanceof HTMLElement){f.DanmakuPlayer.getPlayer().el.appendChild(i)}else{throw new Error("Template DOM Error! [document.body] missing or Not control wrap Dom!!")}o.instanceTextSizeDom=i}else{Object.entries(e).forEach(function(t){var e=a(t,2),n=e[0],r=e[1];o.instanceTextSizeDom.style[n]=r})}return o.instanceTextSizeDom}}]);return o}()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.translateTextToSize=r;function r(t,e){e.textContent=t;return{width:parseFloat(window.getComputedStyle(e).width),height:parseFloat(window.getComputedStyle(e).height)}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});function r(t,e){if(!(t instanceof e)){throw new TypeError("Cannot call a class as a function")}}var i=e.DnodeRunStatus=function t(){r(this,t)};i.EMPTY=-1;i.INIT=100;i.READY=110;i.RUNNING=200;i.LAUNCHED=210;i.RUN_END=220},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});var o=function(){function n(t,e){var n=[];var r=true;var i=false;var o=undefined;try{for(var a=t[Symbol.iterator](),u;!(r=(u=a.next()).done);r=true){n.push(u.value);if(e&&n.length===e)break}}catch(t){i=true;o=t}finally{try{if(!r&&a["return"])a["return"]()}finally{if(i)throw o}}return n}return function(t,e){if(Array.isArray(t)){return t}else if(Symbol.iterator in Object(t)){return n(t,e)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}}();e.initMergeDefaultParams=r;function r(t,i,e){if(!(t instanceof Object)||!(i instanceof Object)){throw new TypeError("params must instanceof Object !")}Object.entries(t).forEach(function(t){var e=o(t,2),n=e[0],r=e[1];if(i.hasOwnProperty(n)){i[n]=r}});var n=Object.entries(i);return e&&e instanceof Object?a(e,n):u(n)}function a(i,t){t.forEach(function(t){var e=o(t,2),n=e[0],r=e[1];i[n]=r});return i}function u(t){var i={};t.forEach(function(t){var e=o(t,2),n=e[0],r=e[1];i[n]=r});return i}},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:true});var r=e(2);Object.keys(r).forEach(function(e){if(e==="default"||e==="__esModule")return;Object.defineProperty(n,e,{enumerable:true,get:function t(){return r[e]}})})},function(t,e,n){"use strict";var r=n(1);t.exports=r.DanmakuPlayer}])});