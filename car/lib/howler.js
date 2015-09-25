/*! howler.js v2.0.0-beta | (c) 2013-2014, James Simpson of GoldFire Studios | MIT License | howlerjs.com */
!function(){"use strict";function e(){try{"undefined"!=typeof AudioContext?t=new AudioContext:"undefined"!=typeof webkitAudioContext?t=new webkitAudioContext:n=!1}catch(e){n=!1}if(!n)if("undefined"!=typeof Audio)try{new Audio}catch(e){r=!0}else r=!0}var t=null,n=!0,r=!1;if(e(),n){var i=void 0===t.createGain?t.createGainNode():t.createGain();i.gain.value=1,i.connect(t.destination)}var s=function(){this.init()};s.prototype={init:function(){var e=this;return e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e.iOSAutoEnable=!0,e.noAudio=r,e.usingWebAudio=n,e.ctx=t,r||e._setupCodecs(),e},volume:function(e){var t=this;if(e=parseFloat(e),void 0!==e&&e>=0&&1>=e){t._volume=e,n&&(i.gain.value=e);for(var r=0;r<t._howls.length;r++)if(!t._howls[r]._webAudio)for(var s=t._howls[r]._getSoundIds(),o=0;o<s.length;o++){var u=t._howls[r]._soundById(s[r]);u&&(u._node.volume=u._volume*e)}return t}return t._volume},mute:function(e){var t=this;t._muted=e,n&&(i.gain.value=e?0:t._volume);for(var r=0;r<t._howls.length;r++)if(!t._howls[r]._webAudio)for(var s=t._howls[r]._getSoundIds(),o=0;o<s.length;o++){var u=t._howls[r]._soundById(s[r]);u&&(u._node.muted=e)}return t},codecs:function(e){return this._codecs[e]},_setupCodecs:function(){var e=this,t=new Audio;return e._codecs={mp3:!!t.canPlayType("audio/mpeg;").replace(/^no$/,""),opus:!!t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!t.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),aac:!!t.canPlayType("audio/aac;").replace(/^no$/,""),m4a:!!(t.canPlayType("audio/x-m4a;")||t.canPlayType("audio/m4a;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(t.canPlayType("audio/x-mp4;")||t.canPlayType("audio/mp4;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,""),webm:!!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")},e},_enableiOSAudio:function(){var e=this;if(!t||!e._iOSEnabled&&/iPhone|iPad|iPod/i.test(navigator.userAgent)){e._iOSEnabled=!1;var n=function(){var r=t.createBuffer(1,1,22050),i=t.createBufferSource();i.buffer=r,i.connect(t.destination),void 0===i.start?i.noteOn(0):i.start(0),setTimeout(function(){(i.playbackState===i.PLAYING_STATE||i.playbackState===i.FINISHED_STATE)&&(e._iOSEnabled=!0,e.iOSAutoEnable=!1,window.removeEventListener("touchstart",n,!1))},0)};return window.addEventListener("touchstart",n,!1),e}}};var o=new s,u=function(e){var t=this;return e.src?void t.init(e):void console.error("An array of source files must be passed with any new Howl.")};u.prototype={init:function(e){var r=this;return r._autoplay=e.autoplay||!1,r._ext=e.ext||null,r._html5=e.html5||!1,r._loop=e.loop||!1,r._pool=e.pool||5,r._preload="boolean"==typeof e.preload?e.preload:!0,r._rate=e.rate||1,r._sprite=e.sprite||{},r._src="string"!=typeof e.src?e.src:[e.src],r._volume=void 0!==e.volume?e.volume:1,r._duration=0,r._muted=!1,r._loaded=!1,r._sounds=[],r._endTimers={},r._onend=e.onend?[e.onend]:[],r._onfaded=e.onfaded?[e.onfaded]:[],r._onload=e.onload?[e.onload]:[],r._onloaderror=e.onloaderror?[e.onloaderror]:[],r._onpause=e.onpause?[e.onpause]:[],r._onplay=e.onplay?[e.onplay]:[],r._webAudio=n&&!r._html5,void 0!==t&&t&&o.iOSAutoEnable&&o._enableiOSAudio(),o._howls.push(r),r._preload&&r.load(),r},load:function(){var e=this,t=null;if(r)return void e._emit("loaderror");for(var n=0;n<e._src.length;n++){var i,s;if(e._ext&&e._ext[n]?i=e._ext[n]:(s=e._src[n],i=/^data:audio\/([^;,]+);/i.exec(s),i||(i=/\.([^.]+)$/.exec(s.split("?",1)[0])),i&&(i=i[1].toLowerCase())),o.codecs(i)){t=e._src[n];break}}return t?(e._src=t,new a(e),e._webAudio&&l(e),e):void e._emit("loaderror")},play:function(e){var n=this,r=null;if("number"==typeof e)r=e,e=null;else if(void 0===e){e="__default";for(var i=0,s=0;s<n._sounds.length;s++)n._sounds[s]._paused&&!n._sounds[s]._ended&&(i++,r=n._sounds[s]._id);1===i?e=null:r=null}var u=r?n._soundById(r):n._inactiveSound();if(r&&!e&&(e=u._sprite||"__default"),!u)return null;if(!n._loaded&&!n._sprite[e])return n.once("load",function(){n.play(u._id)}),u._id;if(r&&!u._paused)return u._id;var a=u._seek>0?u._seek:n._sprite[e][0]/1e3,f=(n._sprite[e][0]+n._sprite[e][1])/1e3-a,l=!(!n._loop&&!n._sprite[e][2]),c=function(){n._emit("end",u._id),!n._webAudio&&l&&n.stop(u._id).play(u._id),n._webAudio&&l&&(n._emit("play",u._id),n._endTimers[u._id]=setTimeout(c,1e3*f/Math.abs(n._rate))),n._webAudio&&!l&&(u._paused=!0,u._ended=!0,u._seek=u._start||0,n._clearTimer(u._id),u._node.bufferSource=null),n._webAudio||l||n.stop(u._id)};n._endTimers[u._id]=setTimeout(c,1e3*f/Math.abs(n._rate)),u._paused=!1,u._ended=!1,u._sprite=e,u._seek=a,u._start=n._sprite[e][0]/1e3,u._stop=(n._sprite[e][0]+n._sprite[e][1])/1e3,u._loop=l;var h=u._node;if(n._webAudio){var p=function(){n._refreshBuffer(u);var e=u._muted||n._muted?0:u._volume*o.volume();h.gain.setValueAtTime(e,t.currentTime),u._playStart=t.currentTime,void 0===h.bufferSource.start?h.bufferSource.noteGrainOn(0,a,f):h.bufferSource.start(0,a,f),n._endTimers[u._id]||(n._endTimers[u._id]=setTimeout(c,1e3*f/Math.abs(n._rate)))};n._loaded?p():(n.once("load",p),n._clearTimer(u._id))}else{var v=function(){h.currentTime=a,h.muted=u._muted||n._muted||o._muted||h.muted,h.volume=u._volume*o.volume(),h.playbackRate=n._rate,setTimeout(function(){h.play()},0)};if(4===h.readyState||!h.readyState&&navigator.isCocoonJS)v();else{var m=function(){n._endTimers[u._id]=setTimeout(c,1e3*f/Math.abs(n._rate)),v(),h.removeEventListener("canplaythrough",m,!1)};h.addEventListener("canplaythrough",m,!1),n._clearTimer(u._id)}}return n._emit("play",u._id),u._id},pause:function(e){var t=this;if(!t._loaded)return t.once("play",function(){t.pause(e)}),t;for(var n=t._getSoundIds(e),r=0;r<n.length;r++){t._clearTimer(n[r]);var i=t._soundById(n[r]);if(i&&!i._paused)if(i._seek=t.seek(n[r]),i._paused=!0,t._webAudio){if(!i._node.bufferSource)return t;void 0===i._node.bufferSource.stop?i._node.bufferSource.noteOff(0):i._node.bufferSource.stop(0),i._node.bufferSource=null}else isNaN(i._node.duration)||i._node.pause()}return t},stop:function(e){var t=this;if(!t._loaded)return t.once("play",function(){t.stop(e)}),t;for(var n=t._getSoundIds(e),r=0;r<n.length;r++){t._clearTimer(n[r]);var i=t._soundById(n[r]);if(i&&!i._paused)if(i._seek=i._start||0,i._paused=!0,i._ended=!0,t._webAudio){if(!i._node.bufferSource)return t;void 0===i._node.bufferSource.stop?i._node.bufferSource.noteOff(0):i._node.bufferSource.stop(0),i._node.bufferSource=null}else isNaN(i._node.duration)||(i._node.pause(),i._node.currentTime=i._start||0)}return t},mute:function(e,n){var r=this;if(!r._loaded)return r.once("play",function(){r.mute(e,n)}),r;void 0===n&&(r._muted=e);for(var i=r._getSoundIds(n),s=0;s<i.length;s++){var u=r._soundById(i[s]);u&&(u._muted=e,r._webAudio?u._node.gain.setValueAtTime(e?0:u._volume*o.volume(),t.currentTime):u._node.muted=e)}return r},volume:function(){var e,n,r=this,i=arguments;if(0===i.length)return r._volume;if(1===i.length){var s=r._getSoundIds(),u=s.indexOf(i[0]);u>=0?n=parseInt(i[0],10):e=parseFloat(i[0])}else 2===i.length&&(e=parseFloat(i[0]),n=parseInt(i[1],10));var a;if(!(void 0!==e&&e>=0&&1>=e))return a=n?r._soundById(n):r._sounds[0],a?a._volume:0;if(!r._loaded)return r.once("play",function(){r.volume.apply(r,i)}),r;void 0===n&&(r._volume=e),n=r._getSoundIds(n);for(var f=0;f<n.length;f++)a=r._soundById(n[f]),a&&(a._volume=e,r._webAudio?a._node.gain.setValueAtTime(e*o.volume(),t.currentTime):a._node.volume=e*o.volume());return r},fade:function(e,n,r,i){var s=this;if(!s._loaded)return s.once("play",function(){s.fade(e,n,r,i)}),s;s.volume(e,i);for(var o=s._getSoundIds(i),u=0;u<o.length;u++){var a=s._soundById(o[u]);if(a)if(s._webAudio){var f=t.currentTime,l=f+r/1e3;a._volume=e,a._node.gain.setValueAtTime(e,f),a._node.gain.linearRampToValueAtTime(n,l),setTimeout(function(e,r){setTimeout(function(){r._volume=n,s._emit("faded",e)},l-t.currentTime>0?Math.ceil(1e3*(l-t.currentTime)):0)}.bind(s,o[u],a),r)}else{var c=Math.abs(e-n),h=e>n?"out":"in",p=c/.01,d=r/p;!function(){var t=e,r=setInterval(function(e){t+="in"===h?.01:-.01,t=Math.max(0,t),t=Math.min(1,t),s.volume(t,e),t===n&&(clearInterval(r),s._emit("faded",e))}.bind(s,o[u]),d)}()}}return s},loop:function(){var e,t,n,r=this,i=arguments;if(0===i.length)return r._loop;if(1===i.length){if("boolean"!=typeof i[0])return n=r._soundById(parseInt(i[0],10)),n?n._loop:!1;e=i[0]}else 2===i.length&&(e=i[0],t=parseInt(i[1],10));for(var s=r._getSoundIds(t),o=0;o<s.length;o++)n=r._soundById(s[o]),n&&(n._loop=e);return r},seek:function(){var e,n,r=this,i=arguments;if(0===i.length)n=r._sounds[0]._id;else if(1===i.length){var s=r._getSoundIds(),o=s.indexOf(i[0]);o>=0?n=parseInt(i[0],10):(n=r._sounds[0]._id,e=parseFloat(i[0]))}else 2===i.length&&(e=parseFloat(i[0]),n=parseInt(i[1],10));if(void 0===n)return r;if(!r._loaded)return r.once("load",function(){r.seek.apply(r,i)}),r;var u=r._soundById(n);if(u){if(!(e>=0))return r._webAudio?u._seek+(t.currentTime-u._playStart):u._node.currentTime;r.pause(n),u._seek=e,r._clearTimer(n),r.play(n)}return r},playing:function(e){var t=this,n=t._soundById(e);return n?!!n._paused:!1},unload:function(){for(var e=this,t=e._sounds,n=0;n<t.length;n++){t[n]._paused||(e.stop(t[n]._id),e._emit("end",t[n]._id)),e._webAudio?t[n]._node.disconnect(0):t[n]._node.src="",delete t[n]._node,e._clearTimer(t[n]._id);var r=o._howls.indexOf(e);r>=0&&o._howls.splice(r,1),f&&delete f[e._src],e=null}return null},on:function(e,t){var n=this,r=n["_on"+e];return"function"==typeof t&&r.push(t),n},off:function(e,t){var n=this,r=n["_on"+e];if(t){for(var i=0;i<r.length;i++)if(t===r[i]){r.splice(i,1);break}}else r=[];return n},once:function(e,t){var n=this,r=function(){t(),n.off(e,r)};return n.on(e,r),n},_emit:function(e,t,n){for(var r=this,i=r["_on"+e],s=0;s<i.length;s++)i[s].call(r,t,n);return r},_clearTimer:function(e){var t=this;return t._endTimers[e]&&(clearTimeout(t._endTimers[e]),delete t._endTimers[e]),t},_soundById:function(e){for(var t=this,n=0;n<t._sounds.length;n++)if(e===t._sounds[n]._id)return t._sounds[n];return null},_inactiveSound:function(){var e=this;e._drain();for(var t=0;t<e._sounds.length;t++)if(e._sounds[t]._ended)return e._sounds[t].reset();return new a(e)},_drain:function(){var e=this,t=e._pool,n=0,r=0;if(!(e._sounds.length<t)){for(r=0;r<e._sounds.length;r++)e._sounds[r]._ended&&n++;for(r=e._sounds.length-1;r>=0;r--){if(t>=n)return;e._sounds[r]._ended&&(e._webAudio&&e._sounds[r]._node&&e._sounds[r]._node.disconnect(0),e._sounds.splice(r,1),n--)}}},_getSoundIds:function(e){var t=this;if(void 0===e){for(var n=[],r=0;r<t._sounds.length;r++)n.push(t._sounds[r]._id);return n}return[e]},_refreshBuffer:function(e){var n=this;return e._node.bufferSource=t.createBufferSource(),e._node.bufferSource.buffer=f[n._src],e._node.bufferSource.connect(e._panner?e._panner:e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._seek,e._node.bufferSource.loopEnd=e._stop),e._node.bufferSource.playbackRate.value=n._rate,n}};var a=function(e){this._parent=e,this.init()};if(a.prototype={init:function(){var e=this,t=e._parent;return e._muted=t._muted,e._loop=t._loop,e._volume=t._volume,e._muted=t._muted,e._seek=0,e._paused=!0,e._ended=!1,e._id=Math.round(Date.now()*Math.random()),t._sounds.push(e),e.create(),e},create:function(){var e=this,n=e._parent,r=o._muted||e._muted||e._parent._muted?0:e._volume*o.volume();if(n._webAudio)e._node=void 0===t.createGain?t.createGainNode():t.createGain(),e._node.gain.setValueAtTime(r,t.currentTime),e._node.paused=!0,e._node.connect(i);else{e._node=new Audio;var s=function(){e._node.error&&4===e._node.error.code&&(o.noAudio=!0),n._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",s,!1)};e._node.addEventListener("error",s,!1);var u=function(){n._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(n._sprite).length&&(n._sprite={__default:[0,1e3*n._duration]}),n._loaded||(n._loaded=!0,n._emit("load")),n._autoplay&&n.play(),e._node.removeEventListener("canplaythrough",u,!1)};e._node.addEventListener("canplaythrough",u,!1),e._node.src=n._src,e._node.preload="auto",e._node.volume=r,e._node.load()}return e},reset:function(){var e=this,t=e._parent;return e._muted=t._muted,e._loop=t._loop,e._volume=t._volume,e._muted=t._muted,e._seek=0,e._paused=!0,e._ended=!1,e._sprite=null,e._id=Math.round(Date.now()*Math.random()),e}},n)var f={},l=function(e){var t=e._src;if(f[t])return e._duration=f[t].duration,void p(e);if(/^data:[^;]+;base64,/.test(t)){for(var n=atob(t.split(",")[1]),r=new Uint8Array(n.length),i=0;i<n.length;++i)r[i]=n.charCodeAt(i);h(r.buffer,e)}else{var s=new XMLHttpRequest;s.open("GET",t,!0),s.responseType="arraybuffer",s.onload=function(){h(s.response,e)},s.onerror=function(){e._webAudio&&(e._buffer=!0,e._webAudio=!1,e._sounds=[],delete f[t],e.load())},c(s)}},c=function(e){try{e.send()}catch(t){e.onerror()}},h=function(e,n){t.decodeAudioData(e,function(e){e&&(f[n._src]=e,p(n,e))},function(){n._emit("loaderror")})},p=function(e,t){t&&!e._duration&&(e._duration=t.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),e._loaded||(e._loaded=!0,e._emit("load")),e._autoplay&&e.play()};"function"==typeof define&&define.amd&&define("howler",function(){return{Howler:o,Howl:u}}),"undefined"!=typeof exports&&(exports.Howler=o,exports.Howl=u),"undefined"!=typeof window&&(window.HowlerGlobal=s,window.Howler=o,window.Howl=u,window.Sound=a)}();