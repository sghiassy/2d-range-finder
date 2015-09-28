/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(8);
	module.exports = __webpack_require__(48);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// require the core node events module
	var EventEmitter = __webpack_require__(2).EventEmitter;
	var txt = __webpack_require__(3);

	//create a new event emitter
	var emitter = new EventEmitter;

	// set up a listener for the event
	emitter.on('pizza', function(message){
	  console.log(message);
	});

	// emit an event
	emitter.emit('pizza', 'pizza is extremely yummy');

	document.write(txt);


	__webpack_require__(4);

/***/ },
/* 2 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "It works from content.";


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./styles.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./styles.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, "body {\n    background: green;\n}", ""]);

	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9);
	mocha.setup("bdd");
	__webpack_require__(17)
	__webpack_require__(46);
	if(false) {
		module.hot.accept();
		module.hot.dispose(function() {
			mocha.suite.suites.length = 0;
			var stats = document.getElementById('mocha-stats');
			var report = document.getElementById('mocha-report');
			stats.parentNode.removeChild(stats);
			report.parentNode.removeChild(report);
		});
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	if (! document.getElementById("mocha")) { document.write("<div id=\"mocha\"></div>"); }

	__webpack_require__(10);
	__webpack_require__(14);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Volumes/SSD/Dev/2DPointFinder/node_modules/mocha-loader/node_modules/css-loader/index.js!/Volumes/SSD/Dev/2DPointFinder/node_modules/mocha/mocha.css", function() {
			var newContent = require("!!/Volumes/SSD/Dev/2DPointFinder/node_modules/mocha-loader/node_modules/css-loader/index.js!/Volumes/SSD/Dev/2DPointFinder/node_modules/mocha/mocha.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	exports.push([module.id, "@charset \"utf-8\";\n\nbody {\n  margin:0;\n}\n\n#mocha {\n  font: 20px/1.5 \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  margin: 60px 50px;\n}\n\n#mocha ul,\n#mocha li {\n  margin: 0;\n  padding: 0;\n}\n\n#mocha ul {\n  list-style: none;\n}\n\n#mocha h1,\n#mocha h2 {\n  margin: 0;\n}\n\n#mocha h1 {\n  margin-top: 15px;\n  font-size: 1em;\n  font-weight: 200;\n}\n\n#mocha h1 a {\n  text-decoration: none;\n  color: inherit;\n}\n\n#mocha h1 a:hover {\n  text-decoration: underline;\n}\n\n#mocha .suite .suite h1 {\n  margin-top: 0;\n  font-size: .8em;\n}\n\n#mocha .hidden {\n  display: none;\n}\n\n#mocha h2 {\n  font-size: 12px;\n  font-weight: normal;\n  cursor: pointer;\n}\n\n#mocha .suite {\n  margin-left: 15px;\n}\n\n#mocha .test {\n  margin-left: 15px;\n  overflow: hidden;\n}\n\n#mocha .test.pending:hover h2::after {\n  content: '(pending)';\n  font-family: arial, sans-serif;\n}\n\n#mocha .test.pass.medium .duration {\n  background: #c09853;\n}\n\n#mocha .test.pass.slow .duration {\n  background: #b94a48;\n}\n\n#mocha .test.pass::before {\n  content: '✓';\n  font-size: 12px;\n  display: block;\n  float: left;\n  margin-right: 5px;\n  color: #00d6b2;\n}\n\n#mocha .test.pass .duration {\n  font-size: 9px;\n  margin-left: 5px;\n  padding: 2px 5px;\n  color: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.2);\n  -moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.2);\n  box-shadow: inset 0 1px 1px rgba(0,0,0,.2);\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  -o-border-radius: 5px;\n  border-radius: 5px;\n}\n\n#mocha .test.pass.fast .duration {\n  display: none;\n}\n\n#mocha .test.pending {\n  color: #0b97c4;\n}\n\n#mocha .test.pending::before {\n  content: '◦';\n  color: #0b97c4;\n}\n\n#mocha .test.fail {\n  color: #c00;\n}\n\n#mocha .test.fail pre {\n  color: black;\n}\n\n#mocha .test.fail::before {\n  content: '✖';\n  font-size: 12px;\n  display: block;\n  float: left;\n  margin-right: 5px;\n  color: #c00;\n}\n\n#mocha .test pre.error {\n  color: #c00;\n  max-height: 300px;\n  overflow: auto;\n}\n\n#mocha .test .html-error {\n  overflow: auto;\n  color: black;\n  line-height: 1.5;\n  display: block;\n  float: left;\n  clear: left;\n  font: 12px/1.5 monaco, monospace;\n  margin: 5px;\n  padding: 15px;\n  border: 1px solid #eee;\n  max-width: 85%; /*(1)*/\n  max-width: calc(100% - 42px); /*(2)*/\n  max-height: 300px;\n  word-wrap: break-word;\n  border-bottom-color: #ddd;\n  -webkit-border-radius: 3px;\n  -webkit-box-shadow: 0 1px 3px #eee;\n  -moz-border-radius: 3px;\n  -moz-box-shadow: 0 1px 3px #eee;\n  border-radius: 3px;\n}\n\n#mocha .test .html-error pre.error {\n  border: none;\n  -webkit-border-radius: none;\n  -webkit-box-shadow: none;\n  -moz-border-radius: none;\n  -moz-box-shadow: none;\n  padding: 0;\n  margin: 0;\n  margin-top: 18px;\n  max-height: none;\n}\n\n/**\n * (1): approximate for browsers not supporting calc\n * (2): 42 = 2*15 + 2*10 + 2*1 (padding + margin + border)\n *      ^^ seriously\n */\n#mocha .test pre {\n  display: block;\n  float: left;\n  clear: left;\n  font: 12px/1.5 monaco, monospace;\n  margin: 5px;\n  padding: 15px;\n  border: 1px solid #eee;\n  max-width: 85%; /*(1)*/\n  max-width: calc(100% - 42px); /*(2)*/\n  word-wrap: break-word;\n  border-bottom-color: #ddd;\n  -webkit-border-radius: 3px;\n  -webkit-box-shadow: 0 1px 3px #eee;\n  -moz-border-radius: 3px;\n  -moz-box-shadow: 0 1px 3px #eee;\n  border-radius: 3px;\n}\n\n#mocha .test h2 {\n  position: relative;\n}\n\n#mocha .test a.replay {\n  position: absolute;\n  top: 3px;\n  right: 0;\n  text-decoration: none;\n  vertical-align: middle;\n  display: block;\n  width: 15px;\n  height: 15px;\n  line-height: 15px;\n  text-align: center;\n  background: #eee;\n  font-size: 15px;\n  -moz-border-radius: 15px;\n  border-radius: 15px;\n  -webkit-transition: opacity 200ms;\n  -moz-transition: opacity 200ms;\n  transition: opacity 200ms;\n  opacity: 0.3;\n  color: #888;\n}\n\n#mocha .test:hover a.replay {\n  opacity: 1;\n}\n\n#mocha-report.pass .test.fail {\n  display: none;\n}\n\n#mocha-report.fail .test.pass {\n  display: none;\n}\n\n#mocha-report.pending .test.pass,\n#mocha-report.pending .test.fail {\n  display: none;\n}\n#mocha-report.pending .test.pass.pending {\n  display: block;\n}\n\n#mocha-error {\n  color: #c00;\n  font-size: 1.5em;\n  font-weight: 100;\n  letter-spacing: 1px;\n}\n\n#mocha-stats {\n  position: fixed;\n  top: 15px;\n  right: 10px;\n  font-size: 12px;\n  margin: 0;\n  color: #888;\n  z-index: 1;\n}\n\n#mocha-stats .progress {\n  float: right;\n  padding-top: 0;\n}\n\n#mocha-stats em {\n  color: black;\n}\n\n#mocha-stats a {\n  text-decoration: none;\n  color: inherit;\n}\n\n#mocha-stats a:hover {\n  border-bottom: 1px solid #eee;\n}\n\n#mocha-stats li {\n  display: inline-block;\n  margin: 0 5px;\n  list-style: none;\n  padding-top: 11px;\n}\n\n#mocha-stats canvas {\n  width: 40px;\n  height: 40px;\n}\n\n#mocha code .comment { color: #ddd; }\n#mocha code .init { color: #2f6fad; }\n#mocha code .string { color: #5890ad; }\n#mocha code .keyword { color: #8a6343; }\n#mocha code .number { color: #2f6fad; }\n\n@media screen and (max-device-width: 480px) {\n  #mocha {\n    margin: 60px 0px;\n  }\n\n  #mocha #stats {\n    position: absolute;\n  }\n}\n", ""]);

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(15)(__webpack_require__(16))

/***/ },
/* 15 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript === "function")
			execScript(src);
		else
			eval.call(null, src);
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require==\"function\"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error(\"Cannot find module '\"+o+\"'\");throw f.code=\"MODULE_NOT_FOUND\",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require==\"function\"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){\n(function (process){\nmodule.exports = process.env.COV\n  ? require('./lib-cov/mocha')\n  : require('./lib/mocha');\n\n}).call(this,require('_process'))\n},{\"./lib-cov/mocha\":undefined,\"./lib/mocha\":14,\"_process\":51}],2:[function(require,module,exports){\n/* eslint-disable no-unused-vars */\nmodule.exports = function(type) {\n  return function() {};\n};\n\n},{}],3:[function(require,module,exports){\n/**\n * Module exports.\n */\n\nexports.EventEmitter = EventEmitter;\n\n/**\n * Object#hasOwnProperty reference.\n */\nvar objToString = Object.prototype.toString;\n\n/**\n * Check if a value is an array.\n *\n * @api private\n * @param {*} val The value to test.\n * @return {boolean} true if the value is a boolean, otherwise false.\n */\nfunction isArray(val) {\n  return objToString.call(val) === '[object Array]';\n}\n\n/**\n * Event emitter constructor.\n *\n * @api public\n */\nfunction EventEmitter() {}\n\n/**\n * Add a listener.\n *\n * @api public\n * @param {string} name Event name.\n * @param {Function} fn Event handler.\n * @return {EventEmitter} Emitter instance.\n */\nEventEmitter.prototype.on = function(name, fn) {\n  if (!this.$events) {\n    this.$events = {};\n  }\n\n  if (!this.$events[name]) {\n    this.$events[name] = fn;\n  } else if (isArray(this.$events[name])) {\n    this.$events[name].push(fn);\n  } else {\n    this.$events[name] = [this.$events[name], fn];\n  }\n\n  return this;\n};\n\nEventEmitter.prototype.addListener = EventEmitter.prototype.on;\n\n/**\n * Adds a volatile listener.\n *\n * @api public\n * @param {string} name Event name.\n * @param {Function} fn Event handler.\n * @return {EventEmitter} Emitter instance.\n */\nEventEmitter.prototype.once = function(name, fn) {\n  var self = this;\n\n  function on() {\n    self.removeListener(name, on);\n    fn.apply(this, arguments);\n  }\n\n  on.listener = fn;\n  this.on(name, on);\n\n  return this;\n};\n\n/**\n * Remove a listener.\n *\n * @api public\n * @param {string} name Event name.\n * @param {Function} fn Event handler.\n * @return {EventEmitter} Emitter instance.\n */\nEventEmitter.prototype.removeListener = function(name, fn) {\n  if (this.$events && this.$events[name]) {\n    var list = this.$events[name];\n\n    if (isArray(list)) {\n      var pos = -1;\n\n      for (var i = 0, l = list.length; i < l; i++) {\n        if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {\n          pos = i;\n          break;\n        }\n      }\n\n      if (pos < 0) {\n        return this;\n      }\n\n      list.splice(pos, 1);\n\n      if (!list.length) {\n        delete this.$events[name];\n      }\n    } else if (list === fn || (list.listener && list.listener === fn)) {\n      delete this.$events[name];\n    }\n  }\n\n  return this;\n};\n\n/**\n * Remove all listeners for an event.\n *\n * @api public\n * @param {string} name Event name.\n * @return {EventEmitter} Emitter instance.\n */\nEventEmitter.prototype.removeAllListeners = function(name) {\n  if (name === undefined) {\n    this.$events = {};\n    return this;\n  }\n\n  if (this.$events && this.$events[name]) {\n    this.$events[name] = null;\n  }\n\n  return this;\n};\n\n/**\n * Get all listeners for a given event.\n *\n * @api public\n * @param {string} name Event name.\n * @return {EventEmitter} Emitter instance.\n */\nEventEmitter.prototype.listeners = function(name) {\n  if (!this.$events) {\n    this.$events = {};\n  }\n\n  if (!this.$events[name]) {\n    this.$events[name] = [];\n  }\n\n  if (!isArray(this.$events[name])) {\n    this.$events[name] = [this.$events[name]];\n  }\n\n  return this.$events[name];\n};\n\n/**\n * Emit an event.\n *\n * @api public\n * @param {string} name Event name.\n * @return {boolean} true if at least one handler was invoked, else false.\n */\nEventEmitter.prototype.emit = function(name) {\n  if (!this.$events) {\n    return false;\n  }\n\n  var handler = this.$events[name];\n\n  if (!handler) {\n    return false;\n  }\n\n  var args = Array.prototype.slice.call(arguments, 1);\n\n  if (typeof handler === 'function') {\n    handler.apply(this, args);\n  } else if (isArray(handler)) {\n    var listeners = handler.slice();\n\n    for (var i = 0, l = listeners.length; i < l; i++) {\n      listeners[i].apply(this, args);\n    }\n  } else {\n    return false;\n  }\n\n  return true;\n};\n\n},{}],4:[function(require,module,exports){\n/**\n * Expose `Progress`.\n */\n\nmodule.exports = Progress;\n\n/**\n * Initialize a new `Progress` indicator.\n */\nfunction Progress() {\n  this.percent = 0;\n  this.size(0);\n  this.fontSize(11);\n  this.font('helvetica, arial, sans-serif');\n}\n\n/**\n * Set progress size to `size`.\n *\n * @api public\n * @param {number} size\n * @return {Progress} Progress instance.\n */\nProgress.prototype.size = function(size) {\n  this._size = size;\n  return this;\n};\n\n/**\n * Set text to `text`.\n *\n * @api public\n * @param {string} text\n * @return {Progress} Progress instance.\n */\nProgress.prototype.text = function(text) {\n  this._text = text;\n  return this;\n};\n\n/**\n * Set font size to `size`.\n *\n * @api public\n * @param {number} size\n * @return {Progress} Progress instance.\n */\nProgress.prototype.fontSize = function(size) {\n  this._fontSize = size;\n  return this;\n};\n\n/**\n * Set font to `family`.\n *\n * @param {string} family\n * @return {Progress} Progress instance.\n */\nProgress.prototype.font = function(family) {\n  this._font = family;\n  return this;\n};\n\n/**\n * Update percentage to `n`.\n *\n * @param {number} n\n * @return {Progress} Progress instance.\n */\nProgress.prototype.update = function(n) {\n  this.percent = n;\n  return this;\n};\n\n/**\n * Draw on `ctx`.\n *\n * @param {CanvasRenderingContext2d} ctx\n * @return {Progress} Progress instance.\n */\nProgress.prototype.draw = function(ctx) {\n  try {\n    var percent = Math.min(this.percent, 100);\n    var size = this._size;\n    var half = size / 2;\n    var x = half;\n    var y = half;\n    var rad = half - 1;\n    var fontSize = this._fontSize;\n\n    ctx.font = fontSize + 'px ' + this._font;\n\n    var angle = Math.PI * 2 * (percent / 100);\n    ctx.clearRect(0, 0, size, size);\n\n    // outer circle\n    ctx.strokeStyle = '#9f9f9f';\n    ctx.beginPath();\n    ctx.arc(x, y, rad, 0, angle, false);\n    ctx.stroke();\n\n    // inner circle\n    ctx.strokeStyle = '#eee';\n    ctx.beginPath();\n    ctx.arc(x, y, rad - 1, 0, angle, true);\n    ctx.stroke();\n\n    // text\n    var text = this._text || (percent | 0) + '%';\n    var w = ctx.measureText(text).width;\n\n    ctx.fillText(text, x - w / 2 + 1, y + fontSize / 2 - 1);\n  } catch (err) {\n    // don't fail if we can't render progress\n  }\n  return this;\n};\n\n},{}],5:[function(require,module,exports){\n(function (global){\nexports.isatty = function isatty() {\n  return true;\n};\n\nexports.getWindowSize = function getWindowSize() {\n  if ('innerHeight' in global) {\n    return [global.innerHeight, global.innerWidth];\n  }\n  // In a Web Worker, the DOM Window is not available.\n  return [640, 480];\n};\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{}],6:[function(require,module,exports){\n/**\n * Expose `Context`.\n */\n\nmodule.exports = Context;\n\n/**\n * Initialize a new `Context`.\n *\n * @api private\n */\nfunction Context() {}\n\n/**\n * Set or get the context `Runnable` to `runnable`.\n *\n * @api private\n * @param {Runnable} runnable\n * @return {Context}\n */\nContext.prototype.runnable = function(runnable) {\n  if (!arguments.length) {\n    return this._runnable;\n  }\n  this.test = this._runnable = runnable;\n  return this;\n};\n\n/**\n * Set test timeout `ms`.\n *\n * @api private\n * @param {number} ms\n * @return {Context} self\n */\nContext.prototype.timeout = function(ms) {\n  if (!arguments.length) {\n    return this.runnable().timeout();\n  }\n  this.runnable().timeout(ms);\n  return this;\n};\n\n/**\n * Set test timeout `enabled`.\n *\n * @api private\n * @param {boolean} enabled\n * @return {Context} self\n */\nContext.prototype.enableTimeouts = function(enabled) {\n  this.runnable().enableTimeouts(enabled);\n  return this;\n};\n\n/**\n * Set test slowness threshold `ms`.\n *\n * @api private\n * @param {number} ms\n * @return {Context} self\n */\nContext.prototype.slow = function(ms) {\n  this.runnable().slow(ms);\n  return this;\n};\n\n/**\n * Mark a test as skipped.\n *\n * @api private\n * @return {Context} self\n */\nContext.prototype.skip = function() {\n  this.runnable().skip();\n  return this;\n};\n\n/**\n * Inspect the context void of `._runnable`.\n *\n * @api private\n * @return {string}\n */\nContext.prototype.inspect = function() {\n  return JSON.stringify(this, function(key, val) {\n    return key === 'runnable' || key === 'test' ? undefined : val;\n  }, 2);\n};\n\n},{}],7:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Runnable = require('./runnable');\nvar inherits = require('./utils').inherits;\n\n/**\n * Expose `Hook`.\n */\n\nmodule.exports = Hook;\n\n/**\n * Initialize a new `Hook` with the given `title` and callback `fn`.\n *\n * @param {String} title\n * @param {Function} fn\n * @api private\n */\nfunction Hook(title, fn) {\n  Runnable.call(this, title, fn);\n  this.type = 'hook';\n}\n\n/**\n * Inherit from `Runnable.prototype`.\n */\ninherits(Hook, Runnable);\n\n/**\n * Get or set the test `err`.\n *\n * @param {Error} err\n * @return {Error}\n * @api public\n */\nHook.prototype.error = function(err) {\n  if (!arguments.length) {\n    err = this._error;\n    this._error = null;\n    return err;\n  }\n\n  this._error = err;\n};\n\n},{\"./runnable\":35,\"./utils\":39}],8:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Suite = require('../suite');\nvar Test = require('../test');\nvar escapeRe = require('escape-string-regexp');\n\n/**\n * BDD-style interface:\n *\n *      describe('Array', function() {\n *        describe('#indexOf()', function() {\n *          it('should return -1 when not present', function() {\n *            // ...\n *          });\n *\n *          it('should return the index when present', function() {\n *            // ...\n *          });\n *        });\n *      });\n *\n * @param {Suite} suite Root suite.\n */\nmodule.exports = function(suite) {\n  var suites = [suite];\n\n  suite.on('pre-require', function(context, file, mocha) {\n    var common = require('./common')(suites, context);\n\n    context.before = common.before;\n    context.after = common.after;\n    context.beforeEach = common.beforeEach;\n    context.afterEach = common.afterEach;\n    context.run = mocha.options.delay && common.runWithSuite(suite);\n    /**\n     * Describe a \"suite\" with the given `title`\n     * and callback `fn` containing nested suites\n     * and/or tests.\n     */\n\n    context.describe = context.context = function(title, fn) {\n      var suite = Suite.create(suites[0], title);\n      suite.file = file;\n      suites.unshift(suite);\n      fn.call(suite);\n      suites.shift();\n      return suite;\n    };\n\n    /**\n     * Pending describe.\n     */\n\n    context.xdescribe = context.xcontext = context.describe.skip = function(title, fn) {\n      var suite = Suite.create(suites[0], title);\n      suite.pending = true;\n      suites.unshift(suite);\n      fn.call(suite);\n      suites.shift();\n    };\n\n    /**\n     * Exclusive suite.\n     */\n\n    context.describe.only = function(title, fn) {\n      var suite = context.describe(title, fn);\n      mocha.grep(suite.fullTitle());\n      return suite;\n    };\n\n    /**\n     * Describe a specification or test-case\n     * with the given `title` and callback `fn`\n     * acting as a thunk.\n     */\n\n    context.it = context.specify = function(title, fn) {\n      var suite = suites[0];\n      if (suite.pending) {\n        fn = null;\n      }\n      var test = new Test(title, fn);\n      test.file = file;\n      suite.addTest(test);\n      return test;\n    };\n\n    /**\n     * Exclusive test-case.\n     */\n\n    context.it.only = function(title, fn) {\n      var test = context.it(title, fn);\n      var reString = '^' + escapeRe(test.fullTitle()) + '$';\n      mocha.grep(new RegExp(reString));\n      return test;\n    };\n\n    /**\n     * Pending test case.\n     */\n\n    context.xit = context.xspecify = context.it.skip = function(title) {\n      context.it(title);\n    };\n  });\n};\n\n},{\"../suite\":37,\"../test\":38,\"./common\":9,\"escape-string-regexp\":68}],9:[function(require,module,exports){\n'use strict';\n\n/**\n * Functions common to more than one interface.\n *\n * @param {Suite[]} suites\n * @param {Context} context\n * @return {Object} An object containing common functions.\n */\nmodule.exports = function(suites, context) {\n  return {\n    /**\n     * This is only present if flag --delay is passed into Mocha. It triggers\n     * root suite execution.\n     *\n     * @param {Suite} suite The root wuite.\n     * @return {Function} A function which runs the root suite\n     */\n    runWithSuite: function runWithSuite(suite) {\n      return function run() {\n        suite.run();\n      };\n    },\n\n    /**\n     * Execute before running tests.\n     *\n     * @param {string} name\n     * @param {Function} fn\n     */\n    before: function(name, fn) {\n      suites[0].beforeAll(name, fn);\n    },\n\n    /**\n     * Execute after running tests.\n     *\n     * @param {string} name\n     * @param {Function} fn\n     */\n    after: function(name, fn) {\n      suites[0].afterAll(name, fn);\n    },\n\n    /**\n     * Execute before each test case.\n     *\n     * @param {string} name\n     * @param {Function} fn\n     */\n    beforeEach: function(name, fn) {\n      suites[0].beforeEach(name, fn);\n    },\n\n    /**\n     * Execute after each test case.\n     *\n     * @param {string} name\n     * @param {Function} fn\n     */\n    afterEach: function(name, fn) {\n      suites[0].afterEach(name, fn);\n    },\n\n    test: {\n      /**\n       * Pending test case.\n       *\n       * @param {string} title\n       */\n      skip: function(title) {\n        context.test(title);\n      }\n    }\n  };\n};\n\n},{}],10:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Suite = require('../suite');\nvar Test = require('../test');\n\n/**\n * TDD-style interface:\n *\n *     exports.Array = {\n *       '#indexOf()': {\n *         'should return -1 when the value is not present': function() {\n *\n *         },\n *\n *         'should return the correct index when the value is present': function() {\n *\n *         }\n *       }\n *     };\n *\n * @param {Suite} suite Root suite.\n */\nmodule.exports = function(suite) {\n  var suites = [suite];\n\n  suite.on('require', visit);\n\n  function visit(obj, file) {\n    var suite;\n    for (var key in obj) {\n      if (typeof obj[key] === 'function') {\n        var fn = obj[key];\n        switch (key) {\n          case 'before':\n            suites[0].beforeAll(fn);\n            break;\n          case 'after':\n            suites[0].afterAll(fn);\n            break;\n          case 'beforeEach':\n            suites[0].beforeEach(fn);\n            break;\n          case 'afterEach':\n            suites[0].afterEach(fn);\n            break;\n          default:\n            var test = new Test(key, fn);\n            test.file = file;\n            suites[0].addTest(test);\n        }\n      } else {\n        suite = Suite.create(suites[0], key);\n        suites.unshift(suite);\n        visit(obj[key]);\n        suites.shift();\n      }\n    }\n  }\n};\n\n},{\"../suite\":37,\"../test\":38}],11:[function(require,module,exports){\nexports.bdd = require('./bdd');\nexports.tdd = require('./tdd');\nexports.qunit = require('./qunit');\nexports.exports = require('./exports');\n\n},{\"./bdd\":8,\"./exports\":10,\"./qunit\":12,\"./tdd\":13}],12:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Suite = require('../suite');\nvar Test = require('../test');\nvar escapeRe = require('escape-string-regexp');\n\n/**\n * QUnit-style interface:\n *\n *     suite('Array');\n *\n *     test('#length', function() {\n *       var arr = [1,2,3];\n *       ok(arr.length == 3);\n *     });\n *\n *     test('#indexOf()', function() {\n *       var arr = [1,2,3];\n *       ok(arr.indexOf(1) == 0);\n *       ok(arr.indexOf(2) == 1);\n *       ok(arr.indexOf(3) == 2);\n *     });\n *\n *     suite('String');\n *\n *     test('#length', function() {\n *       ok('foo'.length == 3);\n *     });\n *\n * @param {Suite} suite Root suite.\n */\nmodule.exports = function(suite) {\n  var suites = [suite];\n\n  suite.on('pre-require', function(context, file, mocha) {\n    var common = require('./common')(suites, context);\n\n    context.before = common.before;\n    context.after = common.after;\n    context.beforeEach = common.beforeEach;\n    context.afterEach = common.afterEach;\n    context.run = mocha.options.delay && common.runWithSuite(suite);\n    /**\n     * Describe a \"suite\" with the given `title`.\n     */\n\n    context.suite = function(title) {\n      if (suites.length > 1) {\n        suites.shift();\n      }\n      var suite = Suite.create(suites[0], title);\n      suite.file = file;\n      suites.unshift(suite);\n      return suite;\n    };\n\n    /**\n     * Exclusive test-case.\n     */\n\n    context.suite.only = function(title, fn) {\n      var suite = context.suite(title, fn);\n      mocha.grep(suite.fullTitle());\n    };\n\n    /**\n     * Describe a specification or test-case\n     * with the given `title` and callback `fn`\n     * acting as a thunk.\n     */\n\n    context.test = function(title, fn) {\n      var test = new Test(title, fn);\n      test.file = file;\n      suites[0].addTest(test);\n      return test;\n    };\n\n    /**\n     * Exclusive test-case.\n     */\n\n    context.test.only = function(title, fn) {\n      var test = context.test(title, fn);\n      var reString = '^' + escapeRe(test.fullTitle()) + '$';\n      mocha.grep(new RegExp(reString));\n    };\n\n    context.test.skip = common.test.skip;\n  });\n};\n\n},{\"../suite\":37,\"../test\":38,\"./common\":9,\"escape-string-regexp\":68}],13:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Suite = require('../suite');\nvar Test = require('../test');\nvar escapeRe = require('escape-string-regexp');\n\n/**\n * TDD-style interface:\n *\n *      suite('Array', function() {\n *        suite('#indexOf()', function() {\n *          suiteSetup(function() {\n *\n *          });\n *\n *          test('should return -1 when not present', function() {\n *\n *          });\n *\n *          test('should return the index when present', function() {\n *\n *          });\n *\n *          suiteTeardown(function() {\n *\n *          });\n *        });\n *      });\n *\n * @param {Suite} suite Root suite.\n */\nmodule.exports = function(suite) {\n  var suites = [suite];\n\n  suite.on('pre-require', function(context, file, mocha) {\n    var common = require('./common')(suites, context);\n\n    context.setup = common.beforeEach;\n    context.teardown = common.afterEach;\n    context.suiteSetup = common.before;\n    context.suiteTeardown = common.after;\n    context.run = mocha.options.delay && common.runWithSuite(suite);\n\n    /**\n     * Describe a \"suite\" with the given `title` and callback `fn` containing\n     * nested suites and/or tests.\n     */\n    context.suite = function(title, fn) {\n      var suite = Suite.create(suites[0], title);\n      suite.file = file;\n      suites.unshift(suite);\n      fn.call(suite);\n      suites.shift();\n      return suite;\n    };\n\n    /**\n     * Pending suite.\n     */\n    context.suite.skip = function(title, fn) {\n      var suite = Suite.create(suites[0], title);\n      suite.pending = true;\n      suites.unshift(suite);\n      fn.call(suite);\n      suites.shift();\n    };\n\n    /**\n     * Exclusive test-case.\n     */\n    context.suite.only = function(title, fn) {\n      var suite = context.suite(title, fn);\n      mocha.grep(suite.fullTitle());\n    };\n\n    /**\n     * Describe a specification or test-case with the given `title` and\n     * callback `fn` acting as a thunk.\n     */\n    context.test = function(title, fn) {\n      var suite = suites[0];\n      if (suite.pending) {\n        fn = null;\n      }\n      var test = new Test(title, fn);\n      test.file = file;\n      suite.addTest(test);\n      return test;\n    };\n\n    /**\n     * Exclusive test-case.\n     */\n\n    context.test.only = function(title, fn) {\n      var test = context.test(title, fn);\n      var reString = '^' + escapeRe(test.fullTitle()) + '$';\n      mocha.grep(new RegExp(reString));\n    };\n\n    context.test.skip = common.test.skip;\n  });\n};\n\n},{\"../suite\":37,\"../test\":38,\"./common\":9,\"escape-string-regexp\":68}],14:[function(require,module,exports){\n(function (process,global,__dirname){\n/*!\n * mocha\n * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>\n * MIT Licensed\n */\n\n/**\n * Module dependencies.\n */\n\nvar escapeRe = require('escape-string-regexp');\nvar path = require('path');\nvar reporters = require('./reporters');\nvar utils = require('./utils');\n\n/**\n * Expose `Mocha`.\n */\n\nexports = module.exports = Mocha;\n\n/**\n * To require local UIs and reporters when running in node.\n */\n\nif (!process.browser) {\n  var cwd = process.cwd();\n  module.paths.push(cwd, path.join(cwd, 'node_modules'));\n}\n\n/**\n * Expose internals.\n */\n\nexports.utils = utils;\nexports.interfaces = require('./interfaces');\nexports.reporters = reporters;\nexports.Runnable = require('./runnable');\nexports.Context = require('./context');\nexports.Runner = require('./runner');\nexports.Suite = require('./suite');\nexports.Hook = require('./hook');\nexports.Test = require('./test');\n\n/**\n * Return image `name` path.\n *\n * @api private\n * @param {string} name\n * @return {string}\n */\nfunction image(name) {\n  return path.join(__dirname, '../images', name + '.png');\n}\n\n/**\n * Set up mocha with `options`.\n *\n * Options:\n *\n *   - `ui` name \"bdd\", \"tdd\", \"exports\" etc\n *   - `reporter` reporter instance, defaults to `mocha.reporters.spec`\n *   - `globals` array of accepted globals\n *   - `timeout` timeout in milliseconds\n *   - `bail` bail on the first test failure\n *   - `slow` milliseconds to wait before considering a test slow\n *   - `ignoreLeaks` ignore global leaks\n *   - `fullTrace` display the full stack-trace on failing\n *   - `grep` string or regexp to filter tests with\n *\n * @param {Object} options\n * @api public\n */\nfunction Mocha(options) {\n  options = options || {};\n  this.files = [];\n  this.options = options;\n  if (options.grep) {\n    this.grep(new RegExp(options.grep));\n  }\n  if (options.fgrep) {\n    this.grep(options.fgrep);\n  }\n  this.suite = new exports.Suite('', new exports.Context());\n  this.ui(options.ui);\n  this.bail(options.bail);\n  this.reporter(options.reporter, options.reporterOptions);\n  if (typeof options.timeout !== 'undefined' && options.timeout !== null) {\n    this.timeout(options.timeout);\n  }\n  this.useColors(options.useColors);\n  if (options.enableTimeouts !== null) {\n    this.enableTimeouts(options.enableTimeouts);\n  }\n  if (options.slow) {\n    this.slow(options.slow);\n  }\n\n  this.suite.on('pre-require', function(context) {\n    exports.afterEach = context.afterEach || context.teardown;\n    exports.after = context.after || context.suiteTeardown;\n    exports.beforeEach = context.beforeEach || context.setup;\n    exports.before = context.before || context.suiteSetup;\n    exports.describe = context.describe || context.suite;\n    exports.it = context.it || context.test;\n    exports.setup = context.setup || context.beforeEach;\n    exports.suiteSetup = context.suiteSetup || context.before;\n    exports.suiteTeardown = context.suiteTeardown || context.after;\n    exports.suite = context.suite || context.describe;\n    exports.teardown = context.teardown || context.afterEach;\n    exports.test = context.test || context.it;\n    exports.run = context.run;\n  });\n}\n\n/**\n * Enable or disable bailing on the first failure.\n *\n * @api public\n * @param {boolean} [bail]\n */\nMocha.prototype.bail = function(bail) {\n  if (!arguments.length) {\n    bail = true;\n  }\n  this.suite.bail(bail);\n  return this;\n};\n\n/**\n * Add test `file`.\n *\n * @api public\n * @param {string} file\n */\nMocha.prototype.addFile = function(file) {\n  this.files.push(file);\n  return this;\n};\n\n/**\n * Set reporter to `reporter`, defaults to \"spec\".\n *\n * @param {String|Function} reporter name or constructor\n * @param {Object} reporterOptions optional options\n * @api public\n * @param {string|Function} reporter name or constructor\n * @param {Object} reporterOptions optional options\n */\nMocha.prototype.reporter = function(reporter, reporterOptions) {\n  if (typeof reporter === 'function') {\n    this._reporter = reporter;\n  } else {\n    reporter = reporter || 'spec';\n    var _reporter;\n    // Try to load a built-in reporter.\n    if (reporters[reporter]) {\n      _reporter = reporters[reporter];\n    }\n    // Try to load reporters from process.cwd() and node_modules\n    if (!_reporter) {\n      try {\n        _reporter = require(reporter);\n      } catch (err) {\n        err.message.indexOf('Cannot find module') !== -1\n          ? console.warn('\"' + reporter + '\" reporter not found')\n          : console.warn('\"' + reporter + '\" reporter blew up with error:\\n' + err.stack);\n      }\n    }\n    if (!_reporter && reporter === 'teamcity') {\n      console.warn('The Teamcity reporter was moved to a package named '\n        + 'mocha-teamcity-reporter '\n        + '(https://npmjs.org/package/mocha-teamcity-reporter).');\n    }\n    if (!_reporter) {\n      throw new Error('invalid reporter \"' + reporter + '\"');\n    }\n    this._reporter = _reporter;\n  }\n  this.options.reporterOptions = reporterOptions;\n  return this;\n};\n\n/**\n * Set test UI `name`, defaults to \"bdd\".\n *\n * @api public\n * @param {string} bdd\n */\nMocha.prototype.ui = function(name) {\n  name = name || 'bdd';\n  this._ui = exports.interfaces[name];\n  if (!this._ui) {\n    try {\n      this._ui = require(name);\n    } catch (err) {\n      throw new Error('invalid interface \"' + name + '\"');\n    }\n  }\n  this._ui = this._ui(this.suite);\n  return this;\n};\n\n/**\n * Load registered files.\n *\n * @api private\n */\nMocha.prototype.loadFiles = function(fn) {\n  var self = this;\n  var suite = this.suite;\n  var pending = this.files.length;\n  this.files.forEach(function(file) {\n    file = path.resolve(file);\n    suite.emit('pre-require', global, file, self);\n    suite.emit('require', require(file), file, self);\n    suite.emit('post-require', global, file, self);\n    --pending || (fn && fn());\n  });\n};\n\n/**\n * Enable growl support.\n *\n * @api private\n */\nMocha.prototype._growl = function(runner, reporter) {\n  var notify = require('growl');\n\n  runner.on('end', function() {\n    var stats = reporter.stats;\n    if (stats.failures) {\n      var msg = stats.failures + ' of ' + runner.total + ' tests failed';\n      notify(msg, { name: 'mocha', title: 'Failed', image: image('error') });\n    } else {\n      notify(stats.passes + ' tests passed in ' + stats.duration + 'ms', {\n        name: 'mocha',\n        title: 'Passed',\n        image: image('ok')\n      });\n    }\n  });\n};\n\n/**\n * Add regexp to grep, if `re` is a string it is escaped.\n *\n * @param {RegExp|String} re\n * @return {Mocha}\n * @api public\n * @param {RegExp|string} re\n * @return {Mocha}\n */\nMocha.prototype.grep = function(re) {\n  this.options.grep = typeof re === 'string' ? new RegExp(escapeRe(re)) : re;\n  return this;\n};\n\n/**\n * Invert `.grep()` matches.\n *\n * @return {Mocha}\n * @api public\n */\nMocha.prototype.invert = function() {\n  this.options.invert = true;\n  return this;\n};\n\n/**\n * Ignore global leaks.\n *\n * @param {Boolean} ignore\n * @return {Mocha}\n * @api public\n * @param {boolean} ignore\n * @return {Mocha}\n */\nMocha.prototype.ignoreLeaks = function(ignore) {\n  this.options.ignoreLeaks = Boolean(ignore);\n  return this;\n};\n\n/**\n * Enable global leak checking.\n *\n * @return {Mocha}\n * @api public\n */\nMocha.prototype.checkLeaks = function() {\n  this.options.ignoreLeaks = false;\n  return this;\n};\n\n/**\n * Display long stack-trace on failing\n *\n * @return {Mocha}\n * @api public\n */\nMocha.prototype.fullTrace = function() {\n  this.options.fullStackTrace = true;\n  return this;\n};\n\n/**\n * Enable growl support.\n *\n * @return {Mocha}\n * @api public\n */\nMocha.prototype.growl = function() {\n  this.options.growl = true;\n  return this;\n};\n\n/**\n * Ignore `globals` array or string.\n *\n * @param {Array|String} globals\n * @return {Mocha}\n * @api public\n * @param {Array|string} globals\n * @return {Mocha}\n */\nMocha.prototype.globals = function(globals) {\n  this.options.globals = (this.options.globals || []).concat(globals);\n  return this;\n};\n\n/**\n * Emit color output.\n *\n * @param {Boolean} colors\n * @return {Mocha}\n * @api public\n * @param {boolean} colors\n * @return {Mocha}\n */\nMocha.prototype.useColors = function(colors) {\n  if (colors !== undefined) {\n    this.options.useColors = colors;\n  }\n  return this;\n};\n\n/**\n * Use inline diffs rather than +/-.\n *\n * @param {Boolean} inlineDiffs\n * @return {Mocha}\n * @api public\n * @param {boolean} inlineDiffs\n * @return {Mocha}\n */\nMocha.prototype.useInlineDiffs = function(inlineDiffs) {\n  this.options.useInlineDiffs = inlineDiffs !== undefined && inlineDiffs;\n  return this;\n};\n\n/**\n * Set the timeout in milliseconds.\n *\n * @param {Number} timeout\n * @return {Mocha}\n * @api public\n * @param {number} timeout\n * @return {Mocha}\n */\nMocha.prototype.timeout = function(timeout) {\n  this.suite.timeout(timeout);\n  return this;\n};\n\n/**\n * Set slowness threshold in milliseconds.\n *\n * @param {Number} slow\n * @return {Mocha}\n * @api public\n * @param {number} slow\n * @return {Mocha}\n */\nMocha.prototype.slow = function(slow) {\n  this.suite.slow(slow);\n  return this;\n};\n\n/**\n * Enable timeouts.\n *\n * @param {Boolean} enabled\n * @return {Mocha}\n * @api public\n * @param {boolean} enabled\n * @return {Mocha}\n */\nMocha.prototype.enableTimeouts = function(enabled) {\n  this.suite.enableTimeouts(arguments.length && enabled !== undefined ? enabled : true);\n  return this;\n};\n\n/**\n * Makes all tests async (accepting a callback)\n *\n * @return {Mocha}\n * @api public\n */\nMocha.prototype.asyncOnly = function() {\n  this.options.asyncOnly = true;\n  return this;\n};\n\n/**\n * Disable syntax highlighting (in browser).\n *\n * @api public\n */\nMocha.prototype.noHighlighting = function() {\n  this.options.noHighlighting = true;\n  return this;\n};\n\n/**\n * Enable uncaught errors to propagate (in browser).\n *\n * @return {Mocha}\n * @api public\n */\nMocha.prototype.allowUncaught = function() {\n  this.options.allowUncaught = true;\n  return this;\n};\n\n/**\n * Delay root suite execution.\n * @returns {Mocha}\n */\nMocha.prototype.delay = function delay() {\n  this.options.delay = true;\n  return this;\n};\n\n/**\n * Run tests and invoke `fn()` when complete.\n *\n * @api public\n * @param {Function} fn\n * @return {Runner}\n */\nMocha.prototype.run = function(fn) {\n  if (this.files.length) {\n    this.loadFiles();\n  }\n  var suite = this.suite;\n  var options = this.options;\n  options.files = this.files;\n  var runner = new exports.Runner(suite, options.delay);\n  var reporter = new this._reporter(runner, options);\n  runner.ignoreLeaks = options.ignoreLeaks !== false;\n  runner.fullStackTrace = options.fullStackTrace;\n  runner.asyncOnly = options.asyncOnly;\n  runner.allowUncaught = options.allowUncaught;\n  if (options.grep) {\n    runner.grep(options.grep, options.invert);\n  }\n  if (options.globals) {\n    runner.globals(options.globals);\n  }\n  if (options.growl) {\n    this._growl(runner, reporter);\n  }\n  if (options.useColors !== undefined) {\n    exports.reporters.Base.useColors = options.useColors;\n  }\n  exports.reporters.Base.inlineDiffs = options.useInlineDiffs;\n\n  function done(failures) {\n    if (reporter.done) {\n      reporter.done(failures, fn);\n    } else {\n      fn && fn(failures);\n    }\n  }\n\n  return runner.run(done);\n};\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {},\"/lib\")\n},{\"./context\":6,\"./hook\":7,\"./interfaces\":11,\"./reporters\":22,\"./runnable\":35,\"./runner\":36,\"./suite\":37,\"./test\":38,\"./utils\":39,\"_process\":51,\"escape-string-regexp\":68,\"growl\":69,\"path\":41}],15:[function(require,module,exports){\n/**\n * Helpers.\n */\n\nvar s = 1000;\nvar m = s * 60;\nvar h = m * 60;\nvar d = h * 24;\nvar y = d * 365.25;\n\n/**\n * Parse or format the given `val`.\n *\n * Options:\n *\n *  - `long` verbose formatting [false]\n *\n * @api public\n * @param {string|number} val\n * @param {Object} options\n * @return {string|number}\n */\nmodule.exports = function(val, options) {\n  options = options || {};\n  if (typeof val === 'string') {\n    return parse(val);\n  }\n  // https://github.com/mochajs/mocha/pull/1035\n  return options['long'] ? longFormat(val) : shortFormat(val);\n};\n\n/**\n * Parse the given `str` and return milliseconds.\n *\n * @api private\n * @param {string} str\n * @return {number}\n */\nfunction parse(str) {\n  var match = (/^((?:\\d+)?\\.?\\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i).exec(str);\n  if (!match) {\n    return;\n  }\n  var n = parseFloat(match[1]);\n  var type = (match[2] || 'ms').toLowerCase();\n  switch (type) {\n    case 'years':\n    case 'year':\n    case 'y':\n      return n * y;\n    case 'days':\n    case 'day':\n    case 'd':\n      return n * d;\n    case 'hours':\n    case 'hour':\n    case 'h':\n      return n * h;\n    case 'minutes':\n    case 'minute':\n    case 'm':\n      return n * m;\n    case 'seconds':\n    case 'second':\n    case 's':\n      return n * s;\n    case 'ms':\n      return n;\n    default:\n      // No default case\n  }\n}\n\n/**\n * Short format for `ms`.\n *\n * @api private\n * @param {number} ms\n * @return {string}\n */\nfunction shortFormat(ms) {\n  if (ms >= d) {\n    return Math.round(ms / d) + 'd';\n  }\n  if (ms >= h) {\n    return Math.round(ms / h) + 'h';\n  }\n  if (ms >= m) {\n    return Math.round(ms / m) + 'm';\n  }\n  if (ms >= s) {\n    return Math.round(ms / s) + 's';\n  }\n  return ms + 'ms';\n}\n\n/**\n * Long format for `ms`.\n *\n * @api private\n * @param {number} ms\n * @return {string}\n */\nfunction longFormat(ms) {\n  return plural(ms, d, 'day')\n    || plural(ms, h, 'hour')\n    || plural(ms, m, 'minute')\n    || plural(ms, s, 'second')\n    || ms + ' ms';\n}\n\n/**\n * Pluralization helper.\n *\n * @api private\n * @param {number} ms\n * @param {number} n\n * @param {string} name\n */\nfunction plural(ms, n, name) {\n  if (ms < n) {\n    return;\n  }\n  if (ms < n * 1.5) {\n    return Math.floor(ms / n) + ' ' + name;\n  }\n  return Math.ceil(ms / n) + ' ' + name + 's';\n}\n\n},{}],16:[function(require,module,exports){\n\n/**\n * Expose `Pending`.\n */\n\nmodule.exports = Pending;\n\n/**\n * Initialize a new `Pending` error with the given message.\n *\n * @param {string} message\n */\nfunction Pending(message) {\n  this.message = message;\n}\n\n},{}],17:[function(require,module,exports){\n(function (process,global){\n/**\n * Module dependencies.\n */\n\nvar tty = require('tty');\nvar diff = require('diff');\nvar ms = require('../ms');\nvar utils = require('../utils');\nvar supportsColor = process.browser ? null : require('supports-color');\n\n/**\n * Expose `Base`.\n */\n\nexports = module.exports = Base;\n\n/**\n * Save timer references to avoid Sinon interfering.\n * See: https://github.com/mochajs/mocha/issues/237\n */\n\n/* eslint-disable no-unused-vars, no-native-reassign */\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n/* eslint-enable no-unused-vars, no-native-reassign */\n\n/**\n * Check if both stdio streams are associated with a tty.\n */\n\nvar isatty = tty.isatty(1) && tty.isatty(2);\n\n/**\n * Enable coloring by default, except in the browser interface.\n */\n\nexports.useColors = !process.browser && (supportsColor || (process.env.MOCHA_COLORS !== undefined));\n\n/**\n * Inline diffs instead of +/-\n */\n\nexports.inlineDiffs = false;\n\n/**\n * Default color map.\n */\n\nexports.colors = {\n  pass: 90,\n  fail: 31,\n  'bright pass': 92,\n  'bright fail': 91,\n  'bright yellow': 93,\n  pending: 36,\n  suite: 0,\n  'error title': 0,\n  'error message': 31,\n  'error stack': 90,\n  checkmark: 32,\n  fast: 90,\n  medium: 33,\n  slow: 31,\n  green: 32,\n  light: 90,\n  'diff gutter': 90,\n  'diff added': 32,\n  'diff removed': 31\n};\n\n/**\n * Default symbol map.\n */\n\nexports.symbols = {\n  ok: '✓',\n  err: '✖',\n  dot: '․'\n};\n\n// With node.js on Windows: use symbols available in terminal default fonts\nif (process.platform === 'win32') {\n  exports.symbols.ok = '\\u221A';\n  exports.symbols.err = '\\u00D7';\n  exports.symbols.dot = '.';\n}\n\n/**\n * Color `str` with the given `type`,\n * allowing colors to be disabled,\n * as well as user-defined color\n * schemes.\n *\n * @param {string} type\n * @param {string} str\n * @return {string}\n * @api private\n */\nvar color = exports.color = function(type, str) {\n  if (!exports.useColors) {\n    return String(str);\n  }\n  return '\\u001b[' + exports.colors[type] + 'm' + str + '\\u001b[0m';\n};\n\n/**\n * Expose term window size, with some defaults for when stderr is not a tty.\n */\n\nexports.window = {\n  width: 75\n};\n\nif (isatty) {\n  exports.window.width = process.stdout.getWindowSize\n      ? process.stdout.getWindowSize(1)[0]\n      : tty.getWindowSize()[1];\n}\n\n/**\n * Expose some basic cursor interactions that are common among reporters.\n */\n\nexports.cursor = {\n  hide: function() {\n    isatty && process.stdout.write('\\u001b[?25l');\n  },\n\n  show: function() {\n    isatty && process.stdout.write('\\u001b[?25h');\n  },\n\n  deleteLine: function() {\n    isatty && process.stdout.write('\\u001b[2K');\n  },\n\n  beginningOfLine: function() {\n    isatty && process.stdout.write('\\u001b[0G');\n  },\n\n  CR: function() {\n    if (isatty) {\n      exports.cursor.deleteLine();\n      exports.cursor.beginningOfLine();\n    } else {\n      process.stdout.write('\\r');\n    }\n  }\n};\n\n/**\n * Outut the given `failures` as a list.\n *\n * @param {Array} failures\n * @api public\n */\n\nexports.list = function(failures) {\n  console.log();\n  failures.forEach(function(test, i) {\n    // format\n    var fmt = color('error title', '  %s) %s:\\n')\n      + color('error message', '     %s')\n      + color('error stack', '\\n%s\\n');\n\n    // msg\n    var msg;\n    var err = test.err;\n    var message;\n    if (err.message) {\n      message = err.message;\n    } else if (typeof err.inspect === 'function') {\n      message = err.inspect() + '';\n    } else {\n      message = '';\n    }\n    var stack = err.stack || message;\n    var index = stack.indexOf(message);\n    var actual = err.actual;\n    var expected = err.expected;\n    var escape = true;\n\n    if (index === -1) {\n      msg = message;\n    } else {\n      index += message.length;\n      msg = stack.slice(0, index);\n      // remove msg from stack\n      stack = stack.slice(index + 1);\n    }\n\n    // uncaught\n    if (err.uncaught) {\n      msg = 'Uncaught ' + msg;\n    }\n    // explicitly show diff\n    if (err.showDiff !== false && sameType(actual, expected) && expected !== undefined) {\n      escape = false;\n      if (!(utils.isString(actual) && utils.isString(expected))) {\n        err.actual = actual = utils.stringify(actual);\n        err.expected = expected = utils.stringify(expected);\n      }\n\n      fmt = color('error title', '  %s) %s:\\n%s') + color('error stack', '\\n%s\\n');\n      var match = message.match(/^([^:]+): expected/);\n      msg = '\\n      ' + color('error message', match ? match[1] : msg);\n\n      if (exports.inlineDiffs) {\n        msg += inlineDiff(err, escape);\n      } else {\n        msg += unifiedDiff(err, escape);\n      }\n    }\n\n    // indent stack trace\n    stack = stack.replace(/^/gm, '  ');\n\n    console.log(fmt, (i + 1), test.fullTitle(), msg, stack);\n  });\n};\n\n/**\n * Initialize a new `Base` reporter.\n *\n * All other reporters generally\n * inherit from this reporter, providing\n * stats such as test duration, number\n * of tests passed / failed etc.\n *\n * @param {Runner} runner\n * @api public\n */\n\nfunction Base(runner) {\n  var stats = this.stats = { suites: 0, tests: 0, passes: 0, pending: 0, failures: 0 };\n  var failures = this.failures = [];\n\n  if (!runner) {\n    return;\n  }\n  this.runner = runner;\n\n  runner.stats = stats;\n\n  runner.on('start', function() {\n    stats.start = new Date();\n  });\n\n  runner.on('suite', function(suite) {\n    stats.suites = stats.suites || 0;\n    suite.root || stats.suites++;\n  });\n\n  runner.on('test end', function() {\n    stats.tests = stats.tests || 0;\n    stats.tests++;\n  });\n\n  runner.on('pass', function(test) {\n    stats.passes = stats.passes || 0;\n\n    if (test.duration > test.slow()) {\n      test.speed = 'slow';\n    } else if (test.duration > test.slow() / 2) {\n      test.speed = 'medium';\n    } else {\n      test.speed = 'fast';\n    }\n\n    stats.passes++;\n  });\n\n  runner.on('fail', function(test, err) {\n    stats.failures = stats.failures || 0;\n    stats.failures++;\n    test.err = err;\n    failures.push(test);\n  });\n\n  runner.on('end', function() {\n    stats.end = new Date();\n    stats.duration = new Date() - stats.start;\n  });\n\n  runner.on('pending', function() {\n    stats.pending++;\n  });\n}\n\n/**\n * Output common epilogue used by many of\n * the bundled reporters.\n *\n * @api public\n */\nBase.prototype.epilogue = function() {\n  var stats = this.stats;\n  var fmt;\n\n  console.log();\n\n  // passes\n  fmt = color('bright pass', ' ')\n    + color('green', ' %d passing')\n    + color('light', ' (%s)');\n\n  console.log(fmt,\n    stats.passes || 0,\n    ms(stats.duration));\n\n  // pending\n  if (stats.pending) {\n    fmt = color('pending', ' ')\n      + color('pending', ' %d pending');\n\n    console.log(fmt, stats.pending);\n  }\n\n  // failures\n  if (stats.failures) {\n    fmt = color('fail', '  %d failing');\n\n    console.log(fmt, stats.failures);\n\n    Base.list(this.failures);\n    console.log();\n  }\n\n  console.log();\n};\n\n/**\n * Pad the given `str` to `len`.\n *\n * @api private\n * @param {string} str\n * @param {string} len\n * @return {string}\n */\nfunction pad(str, len) {\n  str = String(str);\n  return Array(len - str.length + 1).join(' ') + str;\n}\n\n/**\n * Returns an inline diff between 2 strings with coloured ANSI output\n *\n * @api private\n * @param {Error} err with actual/expected\n * @param {boolean} escape\n * @return {string} Diff\n */\nfunction inlineDiff(err, escape) {\n  var msg = errorDiff(err, 'WordsWithSpace', escape);\n\n  // linenos\n  var lines = msg.split('\\n');\n  if (lines.length > 4) {\n    var width = String(lines.length).length;\n    msg = lines.map(function(str, i) {\n      return pad(++i, width) + ' |' + ' ' + str;\n    }).join('\\n');\n  }\n\n  // legend\n  msg = '\\n'\n    + color('diff removed', 'actual')\n    + ' '\n    + color('diff added', 'expected')\n    + '\\n\\n'\n    + msg\n    + '\\n';\n\n  // indent\n  msg = msg.replace(/^/gm, '      ');\n  return msg;\n}\n\n/**\n * Returns a unified diff between two strings.\n *\n * @api private\n * @param {Error} err with actual/expected\n * @param {boolean} escape\n * @return {string} The diff.\n */\nfunction unifiedDiff(err, escape) {\n  var indent = '      ';\n  function cleanUp(line) {\n    if (escape) {\n      line = escapeInvisibles(line);\n    }\n    if (line[0] === '+') {\n      return indent + colorLines('diff added', line);\n    }\n    if (line[0] === '-') {\n      return indent + colorLines('diff removed', line);\n    }\n    if (line.match(/\\@\\@/)) {\n      return null;\n    }\n    if (line.match(/\\\\ No newline/)) {\n      return null;\n    }\n    return indent + line;\n  }\n  function notBlank(line) {\n    return typeof line !== 'undefined' && line !== null;\n  }\n  var msg = diff.createPatch('string', err.actual, err.expected);\n  var lines = msg.split('\\n').splice(4);\n  return '\\n      '\n    + colorLines('diff added', '+ expected') + ' '\n    + colorLines('diff removed', '- actual')\n    + '\\n\\n'\n    + lines.map(cleanUp).filter(notBlank).join('\\n');\n}\n\n/**\n * Return a character diff for `err`.\n *\n * @api private\n * @param {Error} err\n * @param {string} type\n * @param {boolean} escape\n * @return {string}\n */\nfunction errorDiff(err, type, escape) {\n  var actual = escape ? escapeInvisibles(err.actual) : err.actual;\n  var expected = escape ? escapeInvisibles(err.expected) : err.expected;\n  return diff['diff' + type](actual, expected).map(function(str) {\n    if (str.added) {\n      return colorLines('diff added', str.value);\n    }\n    if (str.removed) {\n      return colorLines('diff removed', str.value);\n    }\n    return str.value;\n  }).join('');\n}\n\n/**\n * Returns a string with all invisible characters in plain text\n *\n * @api private\n * @param {string} line\n * @return {string}\n */\nfunction escapeInvisibles(line) {\n  return line.replace(/\\t/g, '<tab>')\n    .replace(/\\r/g, '<CR>')\n    .replace(/\\n/g, '<LF>\\n');\n}\n\n/**\n * Color lines for `str`, using the color `name`.\n *\n * @api private\n * @param {string} name\n * @param {string} str\n * @return {string}\n */\nfunction colorLines(name, str) {\n  return str.split('\\n').map(function(str) {\n    return color(name, str);\n  }).join('\\n');\n}\n\n/**\n * Object#toString reference.\n */\nvar objToString = Object.prototype.toString;\n\n/**\n * Check that a / b have the same type.\n *\n * @api private\n * @param {Object} a\n * @param {Object} b\n * @return {boolean}\n */\nfunction sameType(a, b) {\n  return objToString.call(a) === objToString.call(b);\n}\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"../ms\":15,\"../utils\":39,\"_process\":51,\"diff\":67,\"supports-color\":41,\"tty\":5}],18:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar utils = require('../utils');\n\n/**\n * Expose `Doc`.\n */\n\nexports = module.exports = Doc;\n\n/**\n * Initialize a new `Doc` reporter.\n *\n * @param {Runner} runner\n * @api public\n */\nfunction Doc(runner) {\n  Base.call(this, runner);\n\n  var indents = 2;\n\n  function indent() {\n    return Array(indents).join('  ');\n  }\n\n  runner.on('suite', function(suite) {\n    if (suite.root) {\n      return;\n    }\n    ++indents;\n    console.log('%s<section class=\"suite\">', indent());\n    ++indents;\n    console.log('%s<h1>%s</h1>', indent(), utils.escape(suite.title));\n    console.log('%s<dl>', indent());\n  });\n\n  runner.on('suite end', function(suite) {\n    if (suite.root) {\n      return;\n    }\n    console.log('%s</dl>', indent());\n    --indents;\n    console.log('%s</section>', indent());\n    --indents;\n  });\n\n  runner.on('pass', function(test) {\n    console.log('%s  <dt>%s</dt>', indent(), utils.escape(test.title));\n    var code = utils.escape(utils.clean(test.fn.toString()));\n    console.log('%s  <dd><pre><code>%s</code></pre></dd>', indent(), code);\n  });\n\n  runner.on('fail', function(test, err) {\n    console.log('%s  <dt class=\"error\">%s</dt>', indent(), utils.escape(test.title));\n    var code = utils.escape(utils.clean(test.fn.toString()));\n    console.log('%s  <dd class=\"error\"><pre><code>%s</code></pre></dd>', indent(), code);\n    console.log('%s  <dd class=\"error\">%s</dd>', indent(), utils.escape(err));\n  });\n}\n\n},{\"../utils\":39,\"./base\":17}],19:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar color = Base.color;\n\n/**\n * Expose `Dot`.\n */\n\nexports = module.exports = Dot;\n\n/**\n * Initialize a new `Dot` matrix test reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction Dot(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var width = Base.window.width * .75 | 0;\n  var n = -1;\n\n  runner.on('start', function() {\n    process.stdout.write('\\n');\n  });\n\n  runner.on('pending', function() {\n    if (++n % width === 0) {\n      process.stdout.write('\\n  ');\n    }\n    process.stdout.write(color('pending', Base.symbols.dot));\n  });\n\n  runner.on('pass', function(test) {\n    if (++n % width === 0) {\n      process.stdout.write('\\n  ');\n    }\n    if (test.speed === 'slow') {\n      process.stdout.write(color('bright yellow', Base.symbols.dot));\n    } else {\n      process.stdout.write(color(test.speed, Base.symbols.dot));\n    }\n  });\n\n  runner.on('fail', function() {\n    if (++n % width === 0) {\n      process.stdout.write('\\n  ');\n    }\n    process.stdout.write(color('fail', Base.symbols.dot));\n  });\n\n  runner.on('end', function() {\n    console.log();\n    self.epilogue();\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Dot, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":39,\"./base\":17,\"_process\":51}],20:[function(require,module,exports){\n(function (process,__dirname){\n/**\n * Module dependencies.\n */\n\nvar JSONCov = require('./json-cov');\nvar readFileSync = require('fs').readFileSync;\nvar join = require('path').join;\n\n/**\n * Expose `HTMLCov`.\n */\n\nexports = module.exports = HTMLCov;\n\n/**\n * Initialize a new `JsCoverage` reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction HTMLCov(runner) {\n  var jade = require('jade');\n  var file = join(__dirname, '/templates/coverage.jade');\n  var str = readFileSync(file, 'utf8');\n  var fn = jade.compile(str, { filename: file });\n  var self = this;\n\n  JSONCov.call(this, runner, false);\n\n  runner.on('end', function() {\n    process.stdout.write(fn({\n      cov: self.cov,\n      coverageClass: coverageClass\n    }));\n  });\n}\n\n/**\n * Return coverage class for a given coverage percentage.\n *\n * @api private\n * @param {number} coveragePctg\n * @return {string}\n */\nfunction coverageClass(coveragePctg) {\n  if (coveragePctg >= 75) {\n    return 'high';\n  }\n  if (coveragePctg >= 50) {\n    return 'medium';\n  }\n  if (coveragePctg >= 25) {\n    return 'low';\n  }\n  return 'terrible';\n}\n\n}).call(this,require('_process'),\"/lib/reporters\")\n},{\"./json-cov\":23,\"_process\":51,\"fs\":41,\"jade\":41,\"path\":41}],21:[function(require,module,exports){\n(function (global){\n/* eslint-env browser */\n\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar utils = require('../utils');\nvar Progress = require('../browser/progress');\nvar escapeRe = require('escape-string-regexp');\nvar escape = utils.escape;\n\n/**\n * Save timer references to avoid Sinon interfering (see GH-237).\n */\n\n/* eslint-disable no-unused-vars, no-native-reassign */\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n/* eslint-enable no-unused-vars, no-native-reassign */\n\n/**\n * Expose `HTML`.\n */\n\nexports = module.exports = HTML;\n\n/**\n * Stats template.\n */\n\nvar statsTemplate = '<ul id=\"mocha-stats\">'\n  + '<li class=\"progress\"><canvas width=\"40\" height=\"40\"></canvas></li>'\n  + '<li class=\"passes\"><a href=\"javascript:void(0);\">passes:</a> <em>0</em></li>'\n  + '<li class=\"failures\"><a href=\"javascript:void(0);\">failures:</a> <em>0</em></li>'\n  + '<li class=\"duration\">duration: <em>0</em>s</li>'\n  + '</ul>';\n\n/**\n * Initialize a new `HTML` reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction HTML(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var stats = this.stats;\n  var stat = fragment(statsTemplate);\n  var items = stat.getElementsByTagName('li');\n  var passes = items[1].getElementsByTagName('em')[0];\n  var passesLink = items[1].getElementsByTagName('a')[0];\n  var failures = items[2].getElementsByTagName('em')[0];\n  var failuresLink = items[2].getElementsByTagName('a')[0];\n  var duration = items[3].getElementsByTagName('em')[0];\n  var canvas = stat.getElementsByTagName('canvas')[0];\n  var report = fragment('<ul id=\"mocha-report\"></ul>');\n  var stack = [report];\n  var progress;\n  var ctx;\n  var root = document.getElementById('mocha');\n\n  if (canvas.getContext) {\n    var ratio = window.devicePixelRatio || 1;\n    canvas.style.width = canvas.width;\n    canvas.style.height = canvas.height;\n    canvas.width *= ratio;\n    canvas.height *= ratio;\n    ctx = canvas.getContext('2d');\n    ctx.scale(ratio, ratio);\n    progress = new Progress();\n  }\n\n  if (!root) {\n    return error('#mocha div missing, add it to your document');\n  }\n\n  // pass toggle\n  on(passesLink, 'click', function() {\n    unhide();\n    var name = (/pass/).test(report.className) ? '' : ' pass';\n    report.className = report.className.replace(/fail|pass/g, '') + name;\n    if (report.className.trim()) {\n      hideSuitesWithout('test pass');\n    }\n  });\n\n  // failure toggle\n  on(failuresLink, 'click', function() {\n    unhide();\n    var name = (/fail/).test(report.className) ? '' : ' fail';\n    report.className = report.className.replace(/fail|pass/g, '') + name;\n    if (report.className.trim()) {\n      hideSuitesWithout('test fail');\n    }\n  });\n\n  root.appendChild(stat);\n  root.appendChild(report);\n\n  if (progress) {\n    progress.size(40);\n  }\n\n  runner.on('suite', function(suite) {\n    if (suite.root) {\n      return;\n    }\n\n    // suite\n    var url = self.suiteURL(suite);\n    var el = fragment('<li class=\"suite\"><h1><a href=\"%s\">%s</a></h1></li>', url, escape(suite.title));\n\n    // container\n    stack[0].appendChild(el);\n    stack.unshift(document.createElement('ul'));\n    el.appendChild(stack[0]);\n  });\n\n  runner.on('suite end', function(suite) {\n    if (suite.root) {\n      return;\n    }\n    stack.shift();\n  });\n\n  runner.on('fail', function(test) {\n    if (test.type === 'hook') {\n      runner.emit('test end', test);\n    }\n  });\n\n  runner.on('test end', function(test) {\n    // TODO: add to stats\n    var percent = stats.tests / this.total * 100 | 0;\n    if (progress) {\n      progress.update(percent).draw(ctx);\n    }\n\n    // update stats\n    var ms = new Date() - stats.start;\n    text(passes, stats.passes);\n    text(failures, stats.failures);\n    text(duration, (ms / 1000).toFixed(2));\n\n    // test\n    var el;\n    if (test.state === 'passed') {\n      var url = self.testURL(test);\n      el = fragment('<li class=\"test pass %e\"><h2>%e<span class=\"duration\">%ems</span> <a href=\"%s\" class=\"replay\">‣</a></h2></li>', test.speed, test.title, test.duration, url);\n    } else if (test.pending) {\n      el = fragment('<li class=\"test pass pending\"><h2>%e</h2></li>', test.title);\n    } else {\n      el = fragment('<li class=\"test fail\"><h2>%e <a href=\"%e\" class=\"replay\">‣</a></h2></li>', test.title, self.testURL(test));\n      var stackString; // Note: Includes leading newline\n      var message = test.err.toString();\n\n      // <=IE7 stringifies to [Object Error]. Since it can be overloaded, we\n      // check for the result of the stringifying.\n      if (message === '[object Error]') {\n        message = test.err.message;\n      }\n\n      if (test.err.stack) {\n        var indexOfMessage = test.err.stack.indexOf(test.err.message);\n        if (indexOfMessage === -1) {\n          stackString = test.err.stack;\n        } else {\n          stackString = test.err.stack.substr(test.err.message.length + indexOfMessage);\n        }\n      } else if (test.err.sourceURL && test.err.line !== undefined) {\n        // Safari doesn't give you a stack. Let's at least provide a source line.\n        stackString = '\\n(' + test.err.sourceURL + ':' + test.err.line + ')';\n      }\n\n      stackString = stackString || '';\n\n      if (test.err.htmlMessage && stackString) {\n        el.appendChild(fragment('<div class=\"html-error\">%s\\n<pre class=\"error\">%e</pre></div>', test.err.htmlMessage, stackString));\n      } else if (test.err.htmlMessage) {\n        el.appendChild(fragment('<div class=\"html-error\">%s</div>', test.err.htmlMessage));\n      } else {\n        el.appendChild(fragment('<pre class=\"error\">%e%e</pre>', message, stackString));\n      }\n    }\n\n    // toggle code\n    // TODO: defer\n    if (!test.pending) {\n      var h2 = el.getElementsByTagName('h2')[0];\n\n      on(h2, 'click', function() {\n        pre.style.display = pre.style.display === 'none' ? 'block' : 'none';\n      });\n\n      var pre = fragment('<pre><code>%e</code></pre>', utils.clean(test.fn.toString()));\n      el.appendChild(pre);\n      pre.style.display = 'none';\n    }\n\n    // Don't call .appendChild if #mocha-report was already .shift()'ed off the stack.\n    if (stack[0]) {\n      stack[0].appendChild(el);\n    }\n  });\n}\n\n/**\n * Makes a URL, preserving querystring (\"search\") parameters.\n *\n * @param {string} s\n * @return {string} A new URL.\n */\nfunction makeUrl(s) {\n  var search = window.location.search;\n\n  // Remove previous grep query parameter if present\n  if (search) {\n    search = search.replace(/[?&]grep=[^&\\s]*/g, '').replace(/^&/, '?');\n  }\n\n  return window.location.pathname + (search ? search + '&' : '?') + 'grep=' + encodeURIComponent(escapeRe(s));\n}\n\n/**\n * Provide suite URL.\n *\n * @param {Object} [suite]\n */\nHTML.prototype.suiteURL = function(suite) {\n  return makeUrl(suite.fullTitle());\n};\n\n/**\n * Provide test URL.\n *\n * @param {Object} [test]\n */\nHTML.prototype.testURL = function(test) {\n  return makeUrl(test.fullTitle());\n};\n\n/**\n * Display error `msg`.\n *\n * @param {string} msg\n */\nfunction error(msg) {\n  document.body.appendChild(fragment('<div id=\"mocha-error\">%s</div>', msg));\n}\n\n/**\n * Return a DOM fragment from `html`.\n *\n * @param {string} html\n */\nfunction fragment(html) {\n  var args = arguments;\n  var div = document.createElement('div');\n  var i = 1;\n\n  div.innerHTML = html.replace(/%([se])/g, function(_, type) {\n    switch (type) {\n      case 's': return String(args[i++]);\n      case 'e': return escape(args[i++]);\n      // no default\n    }\n  });\n\n  return div.firstChild;\n}\n\n/**\n * Check for suites that do not have elements\n * with `classname`, and hide them.\n *\n * @param {text} classname\n */\nfunction hideSuitesWithout(classname) {\n  var suites = document.getElementsByClassName('suite');\n  for (var i = 0; i < suites.length; i++) {\n    var els = suites[i].getElementsByClassName(classname);\n    if (!els.length) {\n      suites[i].className += ' hidden';\n    }\n  }\n}\n\n/**\n * Unhide .hidden suites.\n */\nfunction unhide() {\n  var els = document.getElementsByClassName('suite hidden');\n  for (var i = 0; i < els.length; ++i) {\n    els[i].className = els[i].className.replace('suite hidden', 'suite');\n  }\n}\n\n/**\n * Set an element's text contents.\n *\n * @param {HTMLElement} el\n * @param {string} contents\n */\nfunction text(el, contents) {\n  if (el.textContent) {\n    el.textContent = contents;\n  } else {\n    el.innerText = contents;\n  }\n}\n\n/**\n * Listen on `event` with callback `fn`.\n */\nfunction on(el, event, fn) {\n  if (el.addEventListener) {\n    el.addEventListener(event, fn, false);\n  } else {\n    el.attachEvent('on' + event, fn);\n  }\n}\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"../browser/progress\":4,\"../utils\":39,\"./base\":17,\"escape-string-regexp\":68}],22:[function(require,module,exports){\n// Alias exports to a their normalized format Mocha#reporter to prevent a need\n// for dynamic (try/catch) requires, which Browserify doesn't handle.\nexports.Base = exports.base = require('./base');\nexports.Dot = exports.dot = require('./dot');\nexports.Doc = exports.doc = require('./doc');\nexports.TAP = exports.tap = require('./tap');\nexports.JSON = exports.json = require('./json');\nexports.HTML = exports.html = require('./html');\nexports.List = exports.list = require('./list');\nexports.Min = exports.min = require('./min');\nexports.Spec = exports.spec = require('./spec');\nexports.Nyan = exports.nyan = require('./nyan');\nexports.XUnit = exports.xunit = require('./xunit');\nexports.Markdown = exports.markdown = require('./markdown');\nexports.Progress = exports.progress = require('./progress');\nexports.Landing = exports.landing = require('./landing');\nexports.JSONCov = exports['json-cov'] = require('./json-cov');\nexports.HTMLCov = exports['html-cov'] = require('./html-cov');\nexports.JSONStream = exports['json-stream'] = require('./json-stream');\n\n},{\"./base\":17,\"./doc\":18,\"./dot\":19,\"./html\":21,\"./html-cov\":20,\"./json\":25,\"./json-cov\":23,\"./json-stream\":24,\"./landing\":26,\"./list\":27,\"./markdown\":28,\"./min\":29,\"./nyan\":30,\"./progress\":31,\"./spec\":32,\"./tap\":33,\"./xunit\":34}],23:[function(require,module,exports){\n(function (process,global){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\n\n/**\n * Expose `JSONCov`.\n */\n\nexports = module.exports = JSONCov;\n\n/**\n * Initialize a new `JsCoverage` reporter.\n *\n * @api public\n * @param {Runner} runner\n * @param {boolean} output\n */\nfunction JSONCov(runner, output) {\n  Base.call(this, runner);\n\n  output = arguments.length === 1 || output;\n  var self = this;\n  var tests = [];\n  var failures = [];\n  var passes = [];\n\n  runner.on('test end', function(test) {\n    tests.push(test);\n  });\n\n  runner.on('pass', function(test) {\n    passes.push(test);\n  });\n\n  runner.on('fail', function(test) {\n    failures.push(test);\n  });\n\n  runner.on('end', function() {\n    var cov = global._$jscoverage || {};\n    var result = self.cov = map(cov);\n    result.stats = self.stats;\n    result.tests = tests.map(clean);\n    result.failures = failures.map(clean);\n    result.passes = passes.map(clean);\n    if (!output) {\n      return;\n    }\n    process.stdout.write(JSON.stringify(result, null, 2));\n  });\n}\n\n/**\n * Map jscoverage data to a JSON structure\n * suitable for reporting.\n *\n * @api private\n * @param {Object} cov\n * @return {Object}\n */\n\nfunction map(cov) {\n  var ret = {\n    instrumentation: 'node-jscoverage',\n    sloc: 0,\n    hits: 0,\n    misses: 0,\n    coverage: 0,\n    files: []\n  };\n\n  for (var filename in cov) {\n    if (Object.prototype.hasOwnProperty.call(cov, filename)) {\n      var data = coverage(filename, cov[filename]);\n      ret.files.push(data);\n      ret.hits += data.hits;\n      ret.misses += data.misses;\n      ret.sloc += data.sloc;\n    }\n  }\n\n  ret.files.sort(function(a, b) {\n    return a.filename.localeCompare(b.filename);\n  });\n\n  if (ret.sloc > 0) {\n    ret.coverage = (ret.hits / ret.sloc) * 100;\n  }\n\n  return ret;\n}\n\n/**\n * Map jscoverage data for a single source file\n * to a JSON structure suitable for reporting.\n *\n * @api private\n * @param {string} filename name of the source file\n * @param {Object} data jscoverage coverage data\n * @return {Object}\n */\nfunction coverage(filename, data) {\n  var ret = {\n    filename: filename,\n    coverage: 0,\n    hits: 0,\n    misses: 0,\n    sloc: 0,\n    source: {}\n  };\n\n  data.source.forEach(function(line, num) {\n    num++;\n\n    if (data[num] === 0) {\n      ret.misses++;\n      ret.sloc++;\n    } else if (data[num] !== undefined) {\n      ret.hits++;\n      ret.sloc++;\n    }\n\n    ret.source[num] = {\n      source: line,\n      coverage: data[num] === undefined ? '' : data[num]\n    };\n  });\n\n  ret.coverage = ret.hits / ret.sloc * 100;\n\n  return ret;\n}\n\n/**\n * Return a plain-object representation of `test`\n * free of cyclic properties etc.\n *\n * @api private\n * @param {Object} test\n * @return {Object}\n */\nfunction clean(test) {\n  return {\n    duration: test.duration,\n    fullTitle: test.fullTitle(),\n    title: test.title\n  };\n}\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"./base\":17,\"_process\":51}],24:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\n\n/**\n * Expose `List`.\n */\n\nexports = module.exports = List;\n\n/**\n * Initialize a new `List` test reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction List(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var total = runner.total;\n\n  runner.on('start', function() {\n    console.log(JSON.stringify(['start', { total: total }]));\n  });\n\n  runner.on('pass', function(test) {\n    console.log(JSON.stringify(['pass', clean(test)]));\n  });\n\n  runner.on('fail', function(test, err) {\n    test = clean(test);\n    test.err = err.message;\n    test.stack = err.stack || null;\n    console.log(JSON.stringify(['fail', test]));\n  });\n\n  runner.on('end', function() {\n    process.stdout.write(JSON.stringify(['end', self.stats]));\n  });\n}\n\n/**\n * Return a plain-object representation of `test`\n * free of cyclic properties etc.\n *\n * @api private\n * @param {Object} test\n * @return {Object}\n */\nfunction clean(test) {\n  return {\n    title: test.title,\n    fullTitle: test.fullTitle(),\n    duration: test.duration\n  };\n}\n\n}).call(this,require('_process'))\n},{\"./base\":17,\"_process\":51}],25:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\n\n/**\n * Expose `JSON`.\n */\n\nexports = module.exports = JSONReporter;\n\n/**\n * Initialize a new `JSON` reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction JSONReporter(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var tests = [];\n  var pending = [];\n  var failures = [];\n  var passes = [];\n\n  runner.on('test end', function(test) {\n    tests.push(test);\n  });\n\n  runner.on('pass', function(test) {\n    passes.push(test);\n  });\n\n  runner.on('fail', function(test) {\n    failures.push(test);\n  });\n\n  runner.on('pending', function(test) {\n    pending.push(test);\n  });\n\n  runner.on('end', function() {\n    var obj = {\n      stats: self.stats,\n      tests: tests.map(clean),\n      pending: pending.map(clean),\n      failures: failures.map(clean),\n      passes: passes.map(clean)\n    };\n\n    runner.testResults = obj;\n\n    process.stdout.write(JSON.stringify(obj, null, 2));\n  });\n}\n\n/**\n * Return a plain-object representation of `test`\n * free of cyclic properties etc.\n *\n * @api private\n * @param {Object} test\n * @return {Object}\n */\nfunction clean(test) {\n  return {\n    title: test.title,\n    fullTitle: test.fullTitle(),\n    duration: test.duration,\n    err: errorJSON(test.err || {})\n  };\n}\n\n/**\n * Transform `error` into a JSON object.\n *\n * @api private\n * @param {Error} err\n * @return {Object}\n */\nfunction errorJSON(err) {\n  var res = {};\n  Object.getOwnPropertyNames(err).forEach(function(key) {\n    res[key] = err[key];\n  }, err);\n  return res;\n}\n\n}).call(this,require('_process'))\n},{\"./base\":17,\"_process\":51}],26:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar cursor = Base.cursor;\nvar color = Base.color;\n\n/**\n * Expose `Landing`.\n */\n\nexports = module.exports = Landing;\n\n/**\n * Airplane color.\n */\n\nBase.colors.plane = 0;\n\n/**\n * Airplane crash color.\n */\n\nBase.colors['plane crash'] = 31;\n\n/**\n * Runway color.\n */\n\nBase.colors.runway = 90;\n\n/**\n * Initialize a new `Landing` reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction Landing(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var width = Base.window.width * .75 | 0;\n  var total = runner.total;\n  var stream = process.stdout;\n  var plane = color('plane', '✈');\n  var crashed = -1;\n  var n = 0;\n\n  function runway() {\n    var buf = Array(width).join('-');\n    return '  ' + color('runway', buf);\n  }\n\n  runner.on('start', function() {\n    stream.write('\\n\\n\\n  ');\n    cursor.hide();\n  });\n\n  runner.on('test end', function(test) {\n    // check if the plane crashed\n    var col = crashed === -1 ? width * ++n / total | 0 : crashed;\n\n    // show the crash\n    if (test.state === 'failed') {\n      plane = color('plane crash', '✈');\n      crashed = col;\n    }\n\n    // render landing strip\n    stream.write('\\u001b[' + (width + 1) + 'D\\u001b[2A');\n    stream.write(runway());\n    stream.write('\\n  ');\n    stream.write(color('runway', Array(col).join('⋅')));\n    stream.write(plane);\n    stream.write(color('runway', Array(width - col).join('⋅') + '\\n'));\n    stream.write(runway());\n    stream.write('\\u001b[0m');\n  });\n\n  runner.on('end', function() {\n    cursor.show();\n    console.log();\n    self.epilogue();\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Landing, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":39,\"./base\":17,\"_process\":51}],27:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar color = Base.color;\nvar cursor = Base.cursor;\n\n/**\n * Expose `List`.\n */\n\nexports = module.exports = List;\n\n/**\n * Initialize a new `List` test reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction List(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var n = 0;\n\n  runner.on('start', function() {\n    console.log();\n  });\n\n  runner.on('test', function(test) {\n    process.stdout.write(color('pass', '    ' + test.fullTitle() + ': '));\n  });\n\n  runner.on('pending', function(test) {\n    var fmt = color('checkmark', '  -')\n      + color('pending', ' %s');\n    console.log(fmt, test.fullTitle());\n  });\n\n  runner.on('pass', function(test) {\n    var fmt = color('checkmark', '  ' + Base.symbols.dot)\n      + color('pass', ' %s: ')\n      + color(test.speed, '%dms');\n    cursor.CR();\n    console.log(fmt, test.fullTitle(), test.duration);\n  });\n\n  runner.on('fail', function(test) {\n    cursor.CR();\n    console.log(color('fail', '  %d) %s'), ++n, test.fullTitle());\n  });\n\n  runner.on('end', self.epilogue.bind(self));\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(List, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":39,\"./base\":17,\"_process\":51}],28:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar utils = require('../utils');\n\n/**\n * Constants\n */\n\nvar SUITE_PREFIX = '$';\n\n/**\n * Expose `Markdown`.\n */\n\nexports = module.exports = Markdown;\n\n/**\n * Initialize a new `Markdown` reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction Markdown(runner) {\n  Base.call(this, runner);\n\n  var level = 0;\n  var buf = '';\n\n  function title(str) {\n    return Array(level).join('#') + ' ' + str;\n  }\n\n  function mapTOC(suite, obj) {\n    var ret = obj;\n    var key = SUITE_PREFIX + suite.title;\n\n    obj = obj[key] = obj[key] || { suite: suite };\n    suite.suites.forEach(function(suite) {\n      mapTOC(suite, obj);\n    });\n\n    return ret;\n  }\n\n  function stringifyTOC(obj, level) {\n    ++level;\n    var buf = '';\n    var link;\n    for (var key in obj) {\n      if (key === 'suite') {\n        continue;\n      }\n      if (key !== SUITE_PREFIX) {\n        link = ' - [' + key.substring(1) + ']';\n        link += '(#' + utils.slug(obj[key].suite.fullTitle()) + ')\\n';\n        buf += Array(level).join('  ') + link;\n      }\n      buf += stringifyTOC(obj[key], level);\n    }\n    return buf;\n  }\n\n  function generateTOC(suite) {\n    var obj = mapTOC(suite, {});\n    return stringifyTOC(obj, 0);\n  }\n\n  generateTOC(runner.suite);\n\n  runner.on('suite', function(suite) {\n    ++level;\n    var slug = utils.slug(suite.fullTitle());\n    buf += '<a name=\"' + slug + '\"></a>' + '\\n';\n    buf += title(suite.title) + '\\n';\n  });\n\n  runner.on('suite end', function() {\n    --level;\n  });\n\n  runner.on('pass', function(test) {\n    var code = utils.clean(test.fn.toString());\n    buf += test.title + '.\\n';\n    buf += '\\n```js\\n';\n    buf += code + '\\n';\n    buf += '```\\n\\n';\n  });\n\n  runner.on('end', function() {\n    process.stdout.write('# TOC\\n');\n    process.stdout.write(generateTOC(runner.suite));\n    process.stdout.write(buf);\n  });\n}\n\n}).call(this,require('_process'))\n},{\"../utils\":39,\"./base\":17,\"_process\":51}],29:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\n\n/**\n * Expose `Min`.\n */\n\nexports = module.exports = Min;\n\n/**\n * Initialize a new `Min` minimal test reporter (best used with --watch).\n *\n * @api public\n * @param {Runner} runner\n */\nfunction Min(runner) {\n  Base.call(this, runner);\n\n  runner.on('start', function() {\n    // clear screen\n    process.stdout.write('\\u001b[2J');\n    // set cursor position\n    process.stdout.write('\\u001b[1;3H');\n  });\n\n  runner.on('end', this.epilogue.bind(this));\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Min, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":39,\"./base\":17,\"_process\":51}],30:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\n\n/**\n * Expose `Dot`.\n */\n\nexports = module.exports = NyanCat;\n\n/**\n * Initialize a new `Dot` matrix test reporter.\n *\n * @param {Runner} runner\n * @api public\n */\n\nfunction NyanCat(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var width = Base.window.width * .75 | 0;\n  var nyanCatWidth = this.nyanCatWidth = 11;\n\n  this.colorIndex = 0;\n  this.numberOfLines = 4;\n  this.rainbowColors = self.generateColors();\n  this.scoreboardWidth = 5;\n  this.tick = 0;\n  this.trajectories = [[], [], [], []];\n  this.trajectoryWidthMax = (width - nyanCatWidth);\n\n  runner.on('start', function() {\n    Base.cursor.hide();\n    self.draw();\n  });\n\n  runner.on('pending', function() {\n    self.draw();\n  });\n\n  runner.on('pass', function() {\n    self.draw();\n  });\n\n  runner.on('fail', function() {\n    self.draw();\n  });\n\n  runner.on('end', function() {\n    Base.cursor.show();\n    for (var i = 0; i < self.numberOfLines; i++) {\n      write('\\n');\n    }\n    self.epilogue();\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(NyanCat, Base);\n\n/**\n * Draw the nyan cat\n *\n * @api private\n */\n\nNyanCat.prototype.draw = function() {\n  this.appendRainbow();\n  this.drawScoreboard();\n  this.drawRainbow();\n  this.drawNyanCat();\n  this.tick = !this.tick;\n};\n\n/**\n * Draw the \"scoreboard\" showing the number\n * of passes, failures and pending tests.\n *\n * @api private\n */\n\nNyanCat.prototype.drawScoreboard = function() {\n  var stats = this.stats;\n\n  function draw(type, n) {\n    write(' ');\n    write(Base.color(type, n));\n    write('\\n');\n  }\n\n  draw('green', stats.passes);\n  draw('fail', stats.failures);\n  draw('pending', stats.pending);\n  write('\\n');\n\n  this.cursorUp(this.numberOfLines);\n};\n\n/**\n * Append the rainbow.\n *\n * @api private\n */\n\nNyanCat.prototype.appendRainbow = function() {\n  var segment = this.tick ? '_' : '-';\n  var rainbowified = this.rainbowify(segment);\n\n  for (var index = 0; index < this.numberOfLines; index++) {\n    var trajectory = this.trajectories[index];\n    if (trajectory.length >= this.trajectoryWidthMax) {\n      trajectory.shift();\n    }\n    trajectory.push(rainbowified);\n  }\n};\n\n/**\n * Draw the rainbow.\n *\n * @api private\n */\n\nNyanCat.prototype.drawRainbow = function() {\n  var self = this;\n\n  this.trajectories.forEach(function(line) {\n    write('\\u001b[' + self.scoreboardWidth + 'C');\n    write(line.join(''));\n    write('\\n');\n  });\n\n  this.cursorUp(this.numberOfLines);\n};\n\n/**\n * Draw the nyan cat\n *\n * @api private\n */\nNyanCat.prototype.drawNyanCat = function() {\n  var self = this;\n  var startWidth = this.scoreboardWidth + this.trajectories[0].length;\n  var dist = '\\u001b[' + startWidth + 'C';\n  var padding = '';\n\n  write(dist);\n  write('_,------,');\n  write('\\n');\n\n  write(dist);\n  padding = self.tick ? '  ' : '   ';\n  write('_|' + padding + '/\\\\_/\\\\ ');\n  write('\\n');\n\n  write(dist);\n  padding = self.tick ? '_' : '__';\n  var tail = self.tick ? '~' : '^';\n  write(tail + '|' + padding + this.face() + ' ');\n  write('\\n');\n\n  write(dist);\n  padding = self.tick ? ' ' : '  ';\n  write(padding + '\"\"  \"\" ');\n  write('\\n');\n\n  this.cursorUp(this.numberOfLines);\n};\n\n/**\n * Draw nyan cat face.\n *\n * @api private\n * @return {string}\n */\n\nNyanCat.prototype.face = function() {\n  var stats = this.stats;\n  if (stats.failures) {\n    return '( x .x)';\n  } else if (stats.pending) {\n    return '( o .o)';\n  } else if (stats.passes) {\n    return '( ^ .^)';\n  }\n  return '( - .-)';\n};\n\n/**\n * Move cursor up `n`.\n *\n * @api private\n * @param {number} n\n */\n\nNyanCat.prototype.cursorUp = function(n) {\n  write('\\u001b[' + n + 'A');\n};\n\n/**\n * Move cursor down `n`.\n *\n * @api private\n * @param {number} n\n */\n\nNyanCat.prototype.cursorDown = function(n) {\n  write('\\u001b[' + n + 'B');\n};\n\n/**\n * Generate rainbow colors.\n *\n * @api private\n * @return {Array}\n */\nNyanCat.prototype.generateColors = function() {\n  var colors = [];\n\n  for (var i = 0; i < (6 * 7); i++) {\n    var pi3 = Math.floor(Math.PI / 3);\n    var n = (i * (1.0 / 6));\n    var r = Math.floor(3 * Math.sin(n) + 3);\n    var g = Math.floor(3 * Math.sin(n + 2 * pi3) + 3);\n    var b = Math.floor(3 * Math.sin(n + 4 * pi3) + 3);\n    colors.push(36 * r + 6 * g + b + 16);\n  }\n\n  return colors;\n};\n\n/**\n * Apply rainbow to the given `str`.\n *\n * @api private\n * @param {string} str\n * @return {string}\n */\nNyanCat.prototype.rainbowify = function(str) {\n  if (!Base.useColors) {\n    return str;\n  }\n  var color = this.rainbowColors[this.colorIndex % this.rainbowColors.length];\n  this.colorIndex += 1;\n  return '\\u001b[38;5;' + color + 'm' + str + '\\u001b[0m';\n};\n\n/**\n * Stdout helper.\n *\n * @param {string} string A message to write to stdout.\n */\nfunction write(string) {\n  process.stdout.write(string);\n}\n\n}).call(this,require('_process'))\n},{\"../utils\":39,\"./base\":17,\"_process\":51}],31:[function(require,module,exports){\n(function (process){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar color = Base.color;\nvar cursor = Base.cursor;\n\n/**\n * Expose `Progress`.\n */\n\nexports = module.exports = Progress;\n\n/**\n * General progress bar color.\n */\n\nBase.colors.progress = 90;\n\n/**\n * Initialize a new `Progress` bar test reporter.\n *\n * @api public\n * @param {Runner} runner\n * @param {Object} options\n */\nfunction Progress(runner, options) {\n  Base.call(this, runner);\n\n  var self = this;\n  var width = Base.window.width * .50 | 0;\n  var total = runner.total;\n  var complete = 0;\n  var lastN = -1;\n\n  // default chars\n  options = options || {};\n  options.open = options.open || '[';\n  options.complete = options.complete || '▬';\n  options.incomplete = options.incomplete || Base.symbols.dot;\n  options.close = options.close || ']';\n  options.verbose = false;\n\n  // tests started\n  runner.on('start', function() {\n    console.log();\n    cursor.hide();\n  });\n\n  // tests complete\n  runner.on('test end', function() {\n    complete++;\n\n    var percent = complete / total;\n    var n = width * percent | 0;\n    var i = width - n;\n\n    if (n === lastN && !options.verbose) {\n      // Don't re-render the line if it hasn't changed\n      return;\n    }\n    lastN = n;\n\n    cursor.CR();\n    process.stdout.write('\\u001b[J');\n    process.stdout.write(color('progress', '  ' + options.open));\n    process.stdout.write(Array(n).join(options.complete));\n    process.stdout.write(Array(i).join(options.incomplete));\n    process.stdout.write(color('progress', options.close));\n    if (options.verbose) {\n      process.stdout.write(color('progress', ' ' + complete + ' of ' + total));\n    }\n  });\n\n  // tests are complete, output some stats\n  // and the failures if any\n  runner.on('end', function() {\n    cursor.show();\n    console.log();\n    self.epilogue();\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Progress, Base);\n\n}).call(this,require('_process'))\n},{\"../utils\":39,\"./base\":17,\"_process\":51}],32:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar inherits = require('../utils').inherits;\nvar color = Base.color;\nvar cursor = Base.cursor;\n\n/**\n * Expose `Spec`.\n */\n\nexports = module.exports = Spec;\n\n/**\n * Initialize a new `Spec` test reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction Spec(runner) {\n  Base.call(this, runner);\n\n  var self = this;\n  var indents = 0;\n  var n = 0;\n\n  function indent() {\n    return Array(indents).join('  ');\n  }\n\n  runner.on('start', function() {\n    console.log();\n  });\n\n  runner.on('suite', function(suite) {\n    ++indents;\n    console.log(color('suite', '%s%s'), indent(), suite.title);\n  });\n\n  runner.on('suite end', function() {\n    --indents;\n    if (indents === 1) {\n      console.log();\n    }\n  });\n\n  runner.on('pending', function(test) {\n    var fmt = indent() + color('pending', '  - %s');\n    console.log(fmt, test.title);\n  });\n\n  runner.on('pass', function(test) {\n    var fmt;\n    if (test.speed === 'fast') {\n      fmt = indent()\n        + color('checkmark', '  ' + Base.symbols.ok)\n        + color('pass', ' %s');\n      cursor.CR();\n      console.log(fmt, test.title);\n    } else {\n      fmt = indent()\n        + color('checkmark', '  ' + Base.symbols.ok)\n        + color('pass', ' %s')\n        + color(test.speed, ' (%dms)');\n      cursor.CR();\n      console.log(fmt, test.title, test.duration);\n    }\n  });\n\n  runner.on('fail', function(test) {\n    cursor.CR();\n    console.log(indent() + color('fail', '  %d) %s'), ++n, test.title);\n  });\n\n  runner.on('end', self.epilogue.bind(self));\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(Spec, Base);\n\n},{\"../utils\":39,\"./base\":17}],33:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\n\n/**\n * Expose `TAP`.\n */\n\nexports = module.exports = TAP;\n\n/**\n * Initialize a new `TAP` reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction TAP(runner) {\n  Base.call(this, runner);\n\n  var n = 1;\n  var passes = 0;\n  var failures = 0;\n\n  runner.on('start', function() {\n    var total = runner.grepTotal(runner.suite);\n    console.log('%d..%d', 1, total);\n  });\n\n  runner.on('test end', function() {\n    ++n;\n  });\n\n  runner.on('pending', function(test) {\n    console.log('ok %d %s # SKIP -', n, title(test));\n  });\n\n  runner.on('pass', function(test) {\n    passes++;\n    console.log('ok %d %s', n, title(test));\n  });\n\n  runner.on('fail', function(test, err) {\n    failures++;\n    console.log('not ok %d %s', n, title(test));\n    if (err.stack) {\n      console.log(err.stack.replace(/^/gm, '  '));\n    }\n  });\n\n  runner.on('end', function() {\n    console.log('# tests ' + (passes + failures));\n    console.log('# pass ' + passes);\n    console.log('# fail ' + failures);\n  });\n}\n\n/**\n * Return a TAP-safe title of `test`\n *\n * @api private\n * @param {Object} test\n * @return {String}\n */\nfunction title(test) {\n  return test.fullTitle().replace(/#/g, '');\n}\n\n},{\"./base\":17}],34:[function(require,module,exports){\n(function (global){\n/**\n * Module dependencies.\n */\n\nvar Base = require('./base');\nvar utils = require('../utils');\nvar inherits = utils.inherits;\nvar fs = require('fs');\nvar escape = utils.escape;\n\n/**\n * Save timer references to avoid Sinon interfering (see GH-237).\n */\n\n/* eslint-disable no-unused-vars, no-native-reassign */\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n/* eslint-enable no-unused-vars, no-native-reassign */\n\n/**\n * Expose `XUnit`.\n */\n\nexports = module.exports = XUnit;\n\n/**\n * Initialize a new `XUnit` reporter.\n *\n * @api public\n * @param {Runner} runner\n */\nfunction XUnit(runner, options) {\n  Base.call(this, runner);\n\n  var stats = this.stats;\n  var tests = [];\n  var self = this;\n\n  if (options.reporterOptions && options.reporterOptions.output) {\n    if (!fs.createWriteStream) {\n      throw new Error('file output not supported in browser');\n    }\n    self.fileStream = fs.createWriteStream(options.reporterOptions.output);\n  }\n\n  runner.on('pending', function(test) {\n    tests.push(test);\n  });\n\n  runner.on('pass', function(test) {\n    tests.push(test);\n  });\n\n  runner.on('fail', function(test) {\n    tests.push(test);\n  });\n\n  runner.on('end', function() {\n    self.write(tag('testsuite', {\n      name: 'Mocha Tests',\n      tests: stats.tests,\n      failures: stats.failures,\n      errors: stats.failures,\n      skipped: stats.tests - stats.failures - stats.passes,\n      timestamp: (new Date()).toUTCString(),\n      time: (stats.duration / 1000) || 0\n    }, false));\n\n    tests.forEach(function(t) {\n      self.test(t);\n    });\n\n    self.write('</testsuite>');\n  });\n}\n\n/**\n * Inherit from `Base.prototype`.\n */\ninherits(XUnit, Base);\n\n/**\n * Override done to close the stream (if it's a file).\n *\n * @param failures\n * @param {Function} fn\n */\nXUnit.prototype.done = function(failures, fn) {\n  if (this.fileStream) {\n    this.fileStream.end(function() {\n      fn(failures);\n    });\n  } else {\n    fn(failures);\n  }\n};\n\n/**\n * Write out the given line.\n *\n * @param {string} line\n */\nXUnit.prototype.write = function(line) {\n  if (this.fileStream) {\n    this.fileStream.write(line + '\\n');\n  } else {\n    console.log(line);\n  }\n};\n\n/**\n * Output tag for the given `test.`\n *\n * @param {Test} test\n */\nXUnit.prototype.test = function(test) {\n  var attrs = {\n    classname: test.parent.fullTitle(),\n    name: test.title,\n    time: (test.duration / 1000) || 0\n  };\n\n  if (test.state === 'failed') {\n    var err = test.err;\n    this.write(tag('testcase', attrs, false, tag('failure', {}, false, cdata(escape(err.message) + '\\n' + err.stack))));\n  } else if (test.pending) {\n    this.write(tag('testcase', attrs, false, tag('skipped', {}, true)));\n  } else {\n    this.write(tag('testcase', attrs, true));\n  }\n};\n\n/**\n * HTML tag helper.\n *\n * @param name\n * @param attrs\n * @param close\n * @param content\n * @return {string}\n */\nfunction tag(name, attrs, close, content) {\n  var end = close ? '/>' : '>';\n  var pairs = [];\n  var tag;\n\n  for (var key in attrs) {\n    if (Object.prototype.hasOwnProperty.call(attrs, key)) {\n      pairs.push(key + '=\"' + escape(attrs[key]) + '\"');\n    }\n  }\n\n  tag = '<' + name + (pairs.length ? ' ' + pairs.join(' ') : '') + end;\n  if (content) {\n    tag += content + '</' + name + end;\n  }\n  return tag;\n}\n\n/**\n * Return cdata escaped CDATA `str`.\n */\n\nfunction cdata(str) {\n  return '<![CDATA[' + escape(str) + ']]>';\n}\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"../utils\":39,\"./base\":17,\"fs\":41}],35:[function(require,module,exports){\n(function (global){\n/**\n * Module dependencies.\n */\n\nvar EventEmitter = require('events').EventEmitter;\nvar Pending = require('./pending');\nvar debug = require('debug')('mocha:runnable');\nvar milliseconds = require('./ms');\nvar utils = require('./utils');\nvar inherits = utils.inherits;\n\n/**\n * Save timer references to avoid Sinon interfering (see GH-237).\n */\n\n/* eslint-disable no-unused-vars, no-native-reassign */\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n/* eslint-enable no-unused-vars, no-native-reassign */\n\n/**\n * Object#toString().\n */\n\nvar toString = Object.prototype.toString;\n\n/**\n * Expose `Runnable`.\n */\n\nmodule.exports = Runnable;\n\n/**\n * Initialize a new `Runnable` with the given `title` and callback `fn`.\n *\n * @param {String} title\n * @param {Function} fn\n * @api private\n * @param {string} title\n * @param {Function} fn\n */\nfunction Runnable(title, fn) {\n  this.title = title;\n  this.fn = fn;\n  this.async = fn && fn.length;\n  this.sync = !this.async;\n  this._timeout = 2000;\n  this._slow = 75;\n  this._enableTimeouts = true;\n  this.timedOut = false;\n  this._trace = new Error('done() called multiple times');\n}\n\n/**\n * Inherit from `EventEmitter.prototype`.\n */\ninherits(Runnable, EventEmitter);\n\n/**\n * Set & get timeout `ms`.\n *\n * @api private\n * @param {number|string} ms\n * @return {Runnable|number} ms or Runnable instance.\n */\nRunnable.prototype.timeout = function(ms) {\n  if (!arguments.length) {\n    return this._timeout;\n  }\n  if (ms === 0) {\n    this._enableTimeouts = false;\n  }\n  if (typeof ms === 'string') {\n    ms = milliseconds(ms);\n  }\n  debug('timeout %d', ms);\n  this._timeout = ms;\n  if (this.timer) {\n    this.resetTimeout();\n  }\n  return this;\n};\n\n/**\n * Set & get slow `ms`.\n *\n * @api private\n * @param {number|string} ms\n * @return {Runnable|number} ms or Runnable instance.\n */\nRunnable.prototype.slow = function(ms) {\n  if (!arguments.length) {\n    return this._slow;\n  }\n  if (typeof ms === 'string') {\n    ms = milliseconds(ms);\n  }\n  debug('timeout %d', ms);\n  this._slow = ms;\n  return this;\n};\n\n/**\n * Set and get whether timeout is `enabled`.\n *\n * @api private\n * @param {boolean} enabled\n * @return {Runnable|boolean} enabled or Runnable instance.\n */\nRunnable.prototype.enableTimeouts = function(enabled) {\n  if (!arguments.length) {\n    return this._enableTimeouts;\n  }\n  debug('enableTimeouts %s', enabled);\n  this._enableTimeouts = enabled;\n  return this;\n};\n\n/**\n * Halt and mark as pending.\n *\n * @api private\n */\nRunnable.prototype.skip = function() {\n  throw new Pending();\n};\n\n/**\n * Return the full title generated by recursively concatenating the parent's\n * full title.\n *\n * @api public\n * @return {string}\n */\nRunnable.prototype.fullTitle = function() {\n  return this.parent.fullTitle() + ' ' + this.title;\n};\n\n/**\n * Clear the timeout.\n *\n * @api private\n */\nRunnable.prototype.clearTimeout = function() {\n  clearTimeout(this.timer);\n};\n\n/**\n * Inspect the runnable void of private properties.\n *\n * @api private\n * @return {string}\n */\nRunnable.prototype.inspect = function() {\n  return JSON.stringify(this, function(key, val) {\n    if (key[0] === '_') {\n      return;\n    }\n    if (key === 'parent') {\n      return '#<Suite>';\n    }\n    if (key === 'ctx') {\n      return '#<Context>';\n    }\n    return val;\n  }, 2);\n};\n\n/**\n * Reset the timeout.\n *\n * @api private\n */\nRunnable.prototype.resetTimeout = function() {\n  var self = this;\n  var ms = this.timeout() || 1e9;\n\n  if (!this._enableTimeouts) {\n    return;\n  }\n  this.clearTimeout();\n  this.timer = setTimeout(function() {\n    if (!self._enableTimeouts) {\n      return;\n    }\n    self.callback(new Error('timeout of ' + ms + 'ms exceeded. Ensure the done() callback is being called in this test.'));\n    self.timedOut = true;\n  }, ms);\n};\n\n/**\n * Whitelist a list of globals for this test run.\n *\n * @api private\n * @param {string[]} globals\n */\nRunnable.prototype.globals = function(globals) {\n  this._allowedGlobals = globals;\n};\n\n/**\n * Run the test and invoke `fn(err)`.\n *\n * @param {Function} fn\n * @api private\n */\nRunnable.prototype.run = function(fn) {\n  var self = this;\n  var start = new Date();\n  var ctx = this.ctx;\n  var finished;\n  var emitted;\n\n  // Sometimes the ctx exists, but it is not runnable\n  if (ctx && ctx.runnable) {\n    ctx.runnable(this);\n  }\n\n  // called multiple times\n  function multiple(err) {\n    if (emitted) {\n      return;\n    }\n    emitted = true;\n    self.emit('error', err || new Error('done() called multiple times; stacktrace may be inaccurate'));\n  }\n\n  // finished\n  function done(err) {\n    var ms = self.timeout();\n    if (self.timedOut) {\n      return;\n    }\n    if (finished) {\n      return multiple(err || self._trace);\n    }\n\n    self.clearTimeout();\n    self.duration = new Date() - start;\n    finished = true;\n    if (!err && self.duration > ms && self._enableTimeouts) {\n      err = new Error('timeout of ' + ms + 'ms exceeded. Ensure the done() callback is being called in this test.');\n    }\n    fn(err);\n  }\n\n  // for .resetTimeout()\n  this.callback = done;\n\n  // explicit async with `done` argument\n  if (this.async) {\n    this.resetTimeout();\n\n    if (this.allowUncaught) {\n      return callFnAsync(this.fn);\n    }\n    try {\n      callFnAsync(this.fn);\n    } catch (err) {\n      done(utils.getError(err));\n    }\n    return;\n  }\n\n  if (this.allowUncaught) {\n    callFn(this.fn);\n    done();\n    return;\n  }\n\n  // sync or promise-returning\n  try {\n    if (this.pending) {\n      done();\n    } else {\n      callFn(this.fn);\n    }\n  } catch (err) {\n    done(utils.getError(err));\n  }\n\n  function callFn(fn) {\n    var result = fn.call(ctx);\n    if (result && typeof result.then === 'function') {\n      self.resetTimeout();\n      result\n        .then(function() {\n          done();\n        },\n        function(reason) {\n          done(reason || new Error('Promise rejected with no or falsy reason'));\n        });\n    } else {\n      if (self.asyncOnly) {\n        return done(new Error('--async-only option in use without declaring `done()` or returning a promise'));\n      }\n\n      done();\n    }\n  }\n\n  function callFnAsync(fn) {\n    fn.call(ctx, function(err) {\n      if (err instanceof Error || toString.call(err) === '[object Error]') {\n        return done(err);\n      }\n      if (err) {\n        if (Object.prototype.toString.call(err) === '[object Object]') {\n          return done(new Error('done() invoked with non-Error: '\n            + JSON.stringify(err)));\n        }\n        return done(new Error('done() invoked with non-Error: ' + err));\n      }\n      done();\n    });\n  }\n};\n\n}).call(this,typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"./ms\":15,\"./pending\":16,\"./utils\":39,\"debug\":2,\"events\":3}],36:[function(require,module,exports){\n(function (process,global){\n/**\n * Module dependencies.\n */\n\nvar EventEmitter = require('events').EventEmitter;\nvar Pending = require('./pending');\nvar utils = require('./utils');\nvar inherits = utils.inherits;\nvar debug = require('debug')('mocha:runner');\nvar Runnable = require('./runnable');\nvar filter = utils.filter;\nvar indexOf = utils.indexOf;\nvar keys = utils.keys;\nvar stackFilter = utils.stackTraceFilter();\nvar stringify = utils.stringify;\nvar type = utils.type;\nvar undefinedError = utils.undefinedError;\n\n/**\n * Non-enumerable globals.\n */\n\nvar globals = [\n  'setTimeout',\n  'clearTimeout',\n  'setInterval',\n  'clearInterval',\n  'XMLHttpRequest',\n  'Date',\n  'setImmediate',\n  'clearImmediate'\n];\n\n/**\n * Expose `Runner`.\n */\n\nmodule.exports = Runner;\n\n/**\n * Initialize a `Runner` for the given `suite`.\n *\n * Events:\n *\n *   - `start`  execution started\n *   - `end`  execution complete\n *   - `suite`  (suite) test suite execution started\n *   - `suite end`  (suite) all tests (and sub-suites) have finished\n *   - `test`  (test) test execution started\n *   - `test end`  (test) test completed\n *   - `hook`  (hook) hook execution started\n *   - `hook end`  (hook) hook complete\n *   - `pass`  (test) test passed\n *   - `fail`  (test, err) test failed\n *   - `pending`  (test) test pending\n *\n * @api public\n * @param {Suite} suite Root suite\n * @param {boolean} [delay] Whether or not to delay execution of root suite\n * until ready.\n */\nfunction Runner(suite, delay) {\n  var self = this;\n  this._globals = [];\n  this._abort = false;\n  this._delay = delay;\n  this.suite = suite;\n  this.started = false;\n  this.total = suite.total();\n  this.failures = 0;\n  this.on('test end', function(test) {\n    self.checkGlobals(test);\n  });\n  this.on('hook end', function(hook) {\n    self.checkGlobals(hook);\n  });\n  this._defaultGrep = /.*/;\n  this.grep(this._defaultGrep);\n  this.globals(this.globalProps().concat(extraGlobals()));\n}\n\n/**\n * Wrapper for setImmediate, process.nextTick, or browser polyfill.\n *\n * @param {Function} fn\n * @api private\n */\nRunner.immediately = global.setImmediate || process.nextTick;\n\n/**\n * Inherit from `EventEmitter.prototype`.\n */\ninherits(Runner, EventEmitter);\n\n/**\n * Run tests with full titles matching `re`. Updates runner.total\n * with number of tests matched.\n *\n * @param {RegExp} re\n * @param {Boolean} invert\n * @return {Runner} for chaining\n * @api public\n * @param {RegExp} re\n * @param {boolean} invert\n * @return {Runner} Runner instance.\n */\nRunner.prototype.grep = function(re, invert) {\n  debug('grep %s', re);\n  this._grep = re;\n  this._invert = invert;\n  this.total = this.grepTotal(this.suite);\n  return this;\n};\n\n/**\n * Returns the number of tests matching the grep search for the\n * given suite.\n *\n * @param {Suite} suite\n * @return {Number}\n * @api public\n * @param {Suite} suite\n * @return {number}\n */\nRunner.prototype.grepTotal = function(suite) {\n  var self = this;\n  var total = 0;\n\n  suite.eachTest(function(test) {\n    var match = self._grep.test(test.fullTitle());\n    if (self._invert) {\n      match = !match;\n    }\n    if (match) {\n      total++;\n    }\n  });\n\n  return total;\n};\n\n/**\n * Return a list of global properties.\n *\n * @return {Array}\n * @api private\n */\nRunner.prototype.globalProps = function() {\n  var props = keys(global);\n\n  // non-enumerables\n  for (var i = 0; i < globals.length; ++i) {\n    if (~indexOf(props, globals[i])) {\n      continue;\n    }\n    props.push(globals[i]);\n  }\n\n  return props;\n};\n\n/**\n * Allow the given `arr` of globals.\n *\n * @param {Array} arr\n * @return {Runner} for chaining\n * @api public\n * @param {Array} arr\n * @return {Runner} Runner instance.\n */\nRunner.prototype.globals = function(arr) {\n  if (!arguments.length) {\n    return this._globals;\n  }\n  debug('globals %j', arr);\n  this._globals = this._globals.concat(arr);\n  return this;\n};\n\n/**\n * Check for global variable leaks.\n *\n * @api private\n */\nRunner.prototype.checkGlobals = function(test) {\n  if (this.ignoreLeaks) {\n    return;\n  }\n  var ok = this._globals;\n\n  var globals = this.globalProps();\n  var leaks;\n\n  if (test) {\n    ok = ok.concat(test._allowedGlobals || []);\n  }\n\n  if (this.prevGlobalsLength === globals.length) {\n    return;\n  }\n  this.prevGlobalsLength = globals.length;\n\n  leaks = filterLeaks(ok, globals);\n  this._globals = this._globals.concat(leaks);\n\n  if (leaks.length > 1) {\n    this.fail(test, new Error('global leaks detected: ' + leaks.join(', ') + ''));\n  } else if (leaks.length) {\n    this.fail(test, new Error('global leak detected: ' + leaks[0]));\n  }\n};\n\n/**\n * Fail the given `test`.\n *\n * @api private\n * @param {Test} test\n * @param {Error} err\n */\nRunner.prototype.fail = function(test, err) {\n  ++this.failures;\n  test.state = 'failed';\n\n  if (!(err instanceof Error || err && typeof err.message === 'string')) {\n    err = new Error('the ' + type(err) + ' ' + stringify(err) + ' was thrown, throw an Error :)');\n  }\n\n  err.stack = (this.fullStackTrace || !err.stack)\n    ? err.stack\n    : stackFilter(err.stack);\n\n  this.emit('fail', test, err);\n};\n\n/**\n * Fail the given `hook` with `err`.\n *\n * Hook failures work in the following pattern:\n * - If bail, then exit\n * - Failed `before` hook skips all tests in a suite and subsuites,\n *   but jumps to corresponding `after` hook\n * - Failed `before each` hook skips remaining tests in a\n *   suite and jumps to corresponding `after each` hook,\n *   which is run only once\n * - Failed `after` hook does not alter\n *   execution order\n * - Failed `after each` hook skips remaining tests in a\n *   suite and subsuites, but executes other `after each`\n *   hooks\n *\n * @api private\n * @param {Hook} hook\n * @param {Error} err\n */\nRunner.prototype.failHook = function(hook, err) {\n  if (hook.ctx && hook.ctx.currentTest) {\n    hook.originalTitle = hook.originalTitle || hook.title;\n    hook.title = hook.originalTitle + ' for \"' + hook.ctx.currentTest.title + '\"';\n  }\n\n  this.fail(hook, err);\n  if (this.suite.bail()) {\n    this.emit('end');\n  }\n};\n\n/**\n * Run hook `name` callbacks and then invoke `fn()`.\n *\n * @api private\n * @param {string} name\n * @param {Function} fn\n */\n\nRunner.prototype.hook = function(name, fn) {\n  var suite = this.suite;\n  var hooks = suite['_' + name];\n  var self = this;\n\n  function next(i) {\n    var hook = hooks[i];\n    if (!hook) {\n      return fn();\n    }\n    self.currentRunnable = hook;\n\n    hook.ctx.currentTest = self.test;\n\n    self.emit('hook', hook);\n\n    if (!hook.listeners('error').length) {\n      hook.on('error', function(err) {\n        self.failHook(hook, err);\n      });\n    }\n\n    hook.run(function(err) {\n      var testError = hook.error();\n      if (testError) {\n        self.fail(self.test, testError);\n      }\n      if (err) {\n        if (err instanceof Pending) {\n          suite.pending = true;\n        } else {\n          self.failHook(hook, err);\n\n          // stop executing hooks, notify callee of hook err\n          return fn(err);\n        }\n      }\n      self.emit('hook end', hook);\n      delete hook.ctx.currentTest;\n      next(++i);\n    });\n  }\n\n  Runner.immediately(function() {\n    next(0);\n  });\n};\n\n/**\n * Run hook `name` for the given array of `suites`\n * in order, and callback `fn(err, errSuite)`.\n *\n * @api private\n * @param {string} name\n * @param {Array} suites\n * @param {Function} fn\n */\nRunner.prototype.hooks = function(name, suites, fn) {\n  var self = this;\n  var orig = this.suite;\n\n  function next(suite) {\n    self.suite = suite;\n\n    if (!suite) {\n      self.suite = orig;\n      return fn();\n    }\n\n    self.hook(name, function(err) {\n      if (err) {\n        var errSuite = self.suite;\n        self.suite = orig;\n        return fn(err, errSuite);\n      }\n\n      next(suites.pop());\n    });\n  }\n\n  next(suites.pop());\n};\n\n/**\n * Run hooks from the top level down.\n *\n * @param {String} name\n * @param {Function} fn\n * @api private\n */\nRunner.prototype.hookUp = function(name, fn) {\n  var suites = [this.suite].concat(this.parents()).reverse();\n  this.hooks(name, suites, fn);\n};\n\n/**\n * Run hooks from the bottom up.\n *\n * @param {String} name\n * @param {Function} fn\n * @api private\n */\nRunner.prototype.hookDown = function(name, fn) {\n  var suites = [this.suite].concat(this.parents());\n  this.hooks(name, suites, fn);\n};\n\n/**\n * Return an array of parent Suites from\n * closest to furthest.\n *\n * @return {Array}\n * @api private\n */\nRunner.prototype.parents = function() {\n  var suite = this.suite;\n  var suites = [];\n  while (suite.parent) {\n    suite = suite.parent;\n    suites.push(suite);\n  }\n  return suites;\n};\n\n/**\n * Run the current test and callback `fn(err)`.\n *\n * @param {Function} fn\n * @api private\n */\nRunner.prototype.runTest = function(fn) {\n  var self = this;\n  var test = this.test;\n\n  if (this.asyncOnly) {\n    test.asyncOnly = true;\n  }\n\n  if (this.allowUncaught) {\n    test.allowUncaught = true;\n    return test.run(fn);\n  }\n  try {\n    test.on('error', function(err) {\n      self.fail(test, err);\n    });\n    test.run(fn);\n  } catch (err) {\n    fn(err);\n  }\n};\n\n/**\n * Run tests in the given `suite` and invoke the callback `fn()` when complete.\n *\n * @api private\n * @param {Suite} suite\n * @param {Function} fn\n */\nRunner.prototype.runTests = function(suite, fn) {\n  var self = this;\n  var tests = suite.tests.slice();\n  var test;\n\n  function hookErr(_, errSuite, after) {\n    // before/after Each hook for errSuite failed:\n    var orig = self.suite;\n\n    // for failed 'after each' hook start from errSuite parent,\n    // otherwise start from errSuite itself\n    self.suite = after ? errSuite.parent : errSuite;\n\n    if (self.suite) {\n      // call hookUp afterEach\n      self.hookUp('afterEach', function(err2, errSuite2) {\n        self.suite = orig;\n        // some hooks may fail even now\n        if (err2) {\n          return hookErr(err2, errSuite2, true);\n        }\n        // report error suite\n        fn(errSuite);\n      });\n    } else {\n      // there is no need calling other 'after each' hooks\n      self.suite = orig;\n      fn(errSuite);\n    }\n  }\n\n  function next(err, errSuite) {\n    // if we bail after first err\n    if (self.failures && suite._bail) {\n      return fn();\n    }\n\n    if (self._abort) {\n      return fn();\n    }\n\n    if (err) {\n      return hookErr(err, errSuite, true);\n    }\n\n    // next test\n    test = tests.shift();\n\n    // all done\n    if (!test) {\n      return fn();\n    }\n\n    // grep\n    var match = self._grep.test(test.fullTitle());\n    if (self._invert) {\n      match = !match;\n    }\n    if (!match) {\n      // Run immediately only if we have defined a grep. When we\n      // define a grep — It can cause maximum callstack error if\n      // the grep is doing a large recursive loop by neglecting\n      // all tests. The run immediately function also comes with\n      // a performance cost. So we don't want to run immediately\n      // if we run the whole test suite, because running the whole\n      // test suite don't do any immediate recursive loops. Thus,\n      // allowing a JS runtime to breathe.\n      if (self._grep !== self._defaultGrep) {\n        Runner.immediately(next);\n      } else {\n        next();\n      }\n      return;\n    }\n\n    // pending\n    if (test.pending) {\n      self.emit('pending', test);\n      self.emit('test end', test);\n      return next();\n    }\n\n    // execute test and hook(s)\n    self.emit('test', self.test = test);\n    self.hookDown('beforeEach', function(err, errSuite) {\n      if (suite.pending) {\n        self.emit('pending', test);\n        self.emit('test end', test);\n        return next();\n      }\n      if (err) {\n        return hookErr(err, errSuite, false);\n      }\n      self.currentRunnable = self.test;\n      self.runTest(function(err) {\n        test = self.test;\n\n        if (err) {\n          if (err instanceof Pending) {\n            self.emit('pending', test);\n          } else {\n            self.fail(test, err);\n          }\n          self.emit('test end', test);\n\n          if (err instanceof Pending) {\n            return next();\n          }\n\n          return self.hookUp('afterEach', next);\n        }\n\n        test.state = 'passed';\n        self.emit('pass', test);\n        self.emit('test end', test);\n        self.hookUp('afterEach', next);\n      });\n    });\n  }\n\n  this.next = next;\n  this.hookErr = hookErr;\n  next();\n};\n\n/**\n * Run the given `suite` and invoke the callback `fn()` when complete.\n *\n * @api private\n * @param {Suite} suite\n * @param {Function} fn\n */\nRunner.prototype.runSuite = function(suite, fn) {\n  var i = 0;\n  var self = this;\n  var total = this.grepTotal(suite);\n  var afterAllHookCalled = false;\n\n  debug('run suite %s', suite.fullTitle());\n\n  if (!total || (self.failures && suite._bail)) {\n    return fn();\n  }\n\n  this.emit('suite', this.suite = suite);\n\n  function next(errSuite) {\n    if (errSuite) {\n      // current suite failed on a hook from errSuite\n      if (errSuite === suite) {\n        // if errSuite is current suite\n        // continue to the next sibling suite\n        return done();\n      }\n      // errSuite is among the parents of current suite\n      // stop execution of errSuite and all sub-suites\n      return done(errSuite);\n    }\n\n    if (self._abort) {\n      return done();\n    }\n\n    var curr = suite.suites[i++];\n    if (!curr) {\n      return done();\n    }\n\n    // Avoid grep neglecting large number of tests causing a\n    // huge recursive loop and thus a maximum call stack error.\n    // See comment in `this.runTests()` for more information.\n    if (self._grep !== self._defaultGrep) {\n      Runner.immediately(function() {\n        self.runSuite(curr, next);\n      });\n    } else {\n      self.runSuite(curr, next);\n    }\n  }\n\n  function done(errSuite) {\n    self.suite = suite;\n    self.nextSuite = next;\n\n    if (afterAllHookCalled) {\n      fn(errSuite);\n    } else {\n      // mark that the afterAll block has been called once\n      // and so can be skipped if there is an error in it.\n      afterAllHookCalled = true;\n      self.hook('afterAll', function() {\n        self.emit('suite end', suite);\n        fn(errSuite);\n      });\n    }\n  }\n\n  this.nextSuite = next;\n\n  this.hook('beforeAll', function(err) {\n    if (err) {\n      return done();\n    }\n    self.runTests(suite, next);\n  });\n};\n\n/**\n * Handle uncaught exceptions.\n *\n * @param {Error} err\n * @api private\n */\nRunner.prototype.uncaught = function(err) {\n  if (err) {\n    debug('uncaught exception %s', err !== function() {\n      return this;\n    }.call(err) ? err : (err.message || err));\n  } else {\n    debug('uncaught undefined exception');\n    err = undefinedError();\n  }\n  err.uncaught = true;\n\n  var runnable = this.currentRunnable;\n\n  if (!runnable) {\n    runnable = new Runnable('Uncaught error outside test suite');\n    runnable.parent = this.suite;\n\n    if (this.started) {\n      this.fail(runnable, err);\n    } else {\n      // Can't recover from this failure\n      this.emit('start');\n      this.fail(runnable, err);\n      this.emit('end');\n    }\n\n    return;\n  }\n\n  runnable.clearTimeout();\n\n  // Ignore errors if complete\n  if (runnable.state) {\n    return;\n  }\n  this.fail(runnable, err);\n\n  // recover from test\n  if (runnable.type === 'test') {\n    this.emit('test end', runnable);\n    this.hookUp('afterEach', this.next);\n    return;\n  }\n\n // recover from hooks\n  if (runnable.type === 'hook') {\n    var errSuite = this.suite;\n    // if hook failure is in afterEach block\n    if (runnable.fullTitle().indexOf('after each') > -1) {\n      return this.hookErr(err, errSuite, true);\n    }\n    // if hook failure is in beforeEach block\n    if (runnable.fullTitle().indexOf('before each') > -1) {\n      return this.hookErr(err, errSuite, false);\n    }\n    // if hook failure is in after or before blocks\n    return this.nextSuite(errSuite);\n  }\n\n  // bail\n  this.emit('end');\n};\n\n/**\n * Run the root suite and invoke `fn(failures)`\n * on completion.\n *\n * @param {Function} fn\n * @return {Runner} for chaining\n * @api public\n * @param {Function} fn\n * @return {Runner} Runner instance.\n */\nRunner.prototype.run = function(fn) {\n  var self = this;\n  var rootSuite = this.suite;\n\n  fn = fn || function() {};\n\n  function uncaught(err) {\n    self.uncaught(err);\n  }\n\n  function start() {\n    self.started = true;\n    self.emit('start');\n    self.runSuite(rootSuite, function() {\n      debug('finished running');\n      self.emit('end');\n    });\n  }\n\n  debug('start');\n\n  // callback\n  this.on('end', function() {\n    debug('end');\n    process.removeListener('uncaughtException', uncaught);\n    fn(self.failures);\n  });\n\n  // uncaught exception\n  process.on('uncaughtException', uncaught);\n\n  if (this._delay) {\n    // for reporters, I guess.\n    // might be nice to debounce some dots while we wait.\n    this.emit('waiting', rootSuite);\n    rootSuite.once('run', start);\n  } else {\n    start();\n  }\n\n  return this;\n};\n\n/**\n * Cleanly abort execution.\n *\n * @api public\n * @return {Runner} Runner instance.\n */\nRunner.prototype.abort = function() {\n  debug('aborting');\n  this._abort = true;\n\n  return this;\n};\n\n/**\n * Filter leaks with the given globals flagged as `ok`.\n *\n * @api private\n * @param {Array} ok\n * @param {Array} globals\n * @return {Array}\n */\nfunction filterLeaks(ok, globals) {\n  return filter(globals, function(key) {\n    // Firefox and Chrome exposes iframes as index inside the window object\n    if (/^d+/.test(key)) {\n      return false;\n    }\n\n    // in firefox\n    // if runner runs in an iframe, this iframe's window.getInterface method not init at first\n    // it is assigned in some seconds\n    if (global.navigator && (/^getInterface/).test(key)) {\n      return false;\n    }\n\n    // an iframe could be approached by window[iframeIndex]\n    // in ie6,7,8 and opera, iframeIndex is enumerable, this could cause leak\n    if (global.navigator && (/^\\d+/).test(key)) {\n      return false;\n    }\n\n    // Opera and IE expose global variables for HTML element IDs (issue #243)\n    if (/^mocha-/.test(key)) {\n      return false;\n    }\n\n    var matched = filter(ok, function(ok) {\n      if (~ok.indexOf('*')) {\n        return key.indexOf(ok.split('*')[0]) === 0;\n      }\n      return key === ok;\n    });\n    return !matched.length && (!global.navigator || key !== 'onerror');\n  });\n}\n\n/**\n * Array of globals dependent on the environment.\n *\n * @return {Array}\n * @api private\n */\nfunction extraGlobals() {\n  if (typeof process === 'object' && typeof process.version === 'string') {\n    var parts = process.version.split('.');\n    var nodeVersion = utils.reduce(parts, function(a, v) {\n      return a << 8 | v;\n    });\n\n    // 'errno' was renamed to process._errno in v0.9.11.\n\n    if (nodeVersion < 0x00090B) {\n      return ['errno'];\n    }\n  }\n\n  return [];\n}\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"./pending\":16,\"./runnable\":35,\"./utils\":39,\"_process\":51,\"debug\":2,\"events\":3}],37:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar EventEmitter = require('events').EventEmitter;\nvar Hook = require('./hook');\nvar utils = require('./utils');\nvar inherits = utils.inherits;\nvar debug = require('debug')('mocha:suite');\nvar milliseconds = require('./ms');\n\n/**\n * Expose `Suite`.\n */\n\nexports = module.exports = Suite;\n\n/**\n * Create a new `Suite` with the given `title` and parent `Suite`. When a suite\n * with the same title is already present, that suite is returned to provide\n * nicer reporter and more flexible meta-testing.\n *\n * @api public\n * @param {Suite} parent\n * @param {string} title\n * @return {Suite}\n */\nexports.create = function(parent, title) {\n  var suite = new Suite(title, parent.ctx);\n  suite.parent = parent;\n  if (parent.pending) {\n    suite.pending = true;\n  }\n  title = suite.fullTitle();\n  parent.addSuite(suite);\n  return suite;\n};\n\n/**\n * Initialize a new `Suite` with the given `title` and `ctx`.\n *\n * @api private\n * @param {string} title\n * @param {Context} parentContext\n */\nfunction Suite(title, parentContext) {\n  this.title = title;\n  function Context() {}\n  Context.prototype = parentContext;\n  this.ctx = new Context();\n  this.suites = [];\n  this.tests = [];\n  this.pending = false;\n  this._beforeEach = [];\n  this._beforeAll = [];\n  this._afterEach = [];\n  this._afterAll = [];\n  this.root = !title;\n  this._timeout = 2000;\n  this._enableTimeouts = true;\n  this._slow = 75;\n  this._bail = false;\n  this.delayed = false;\n}\n\n/**\n * Inherit from `EventEmitter.prototype`.\n */\ninherits(Suite, EventEmitter);\n\n/**\n * Return a clone of this `Suite`.\n *\n * @api private\n * @return {Suite}\n */\nSuite.prototype.clone = function() {\n  var suite = new Suite(this.title);\n  debug('clone');\n  suite.ctx = this.ctx;\n  suite.timeout(this.timeout());\n  suite.enableTimeouts(this.enableTimeouts());\n  suite.slow(this.slow());\n  suite.bail(this.bail());\n  return suite;\n};\n\n/**\n * Set timeout `ms` or short-hand such as \"2s\".\n *\n * @api private\n * @param {number|string} ms\n * @return {Suite|number} for chaining\n */\nSuite.prototype.timeout = function(ms) {\n  if (!arguments.length) {\n    return this._timeout;\n  }\n  if (ms.toString() === '0') {\n    this._enableTimeouts = false;\n  }\n  if (typeof ms === 'string') {\n    ms = milliseconds(ms);\n  }\n  debug('timeout %d', ms);\n  this._timeout = parseInt(ms, 10);\n  return this;\n};\n\n/**\n  * Set timeout to `enabled`.\n  *\n  * @api private\n  * @param {boolean} enabled\n  * @return {Suite|boolean} self or enabled\n  */\nSuite.prototype.enableTimeouts = function(enabled) {\n  if (!arguments.length) {\n    return this._enableTimeouts;\n  }\n  debug('enableTimeouts %s', enabled);\n  this._enableTimeouts = enabled;\n  return this;\n};\n\n/**\n * Set slow `ms` or short-hand such as \"2s\".\n *\n * @api private\n * @param {number|string} ms\n * @return {Suite|number} for chaining\n */\nSuite.prototype.slow = function(ms) {\n  if (!arguments.length) {\n    return this._slow;\n  }\n  if (typeof ms === 'string') {\n    ms = milliseconds(ms);\n  }\n  debug('slow %d', ms);\n  this._slow = ms;\n  return this;\n};\n\n/**\n * Sets whether to bail after first error.\n *\n * @api private\n * @param {boolean} bail\n * @return {Suite|number} for chaining\n */\nSuite.prototype.bail = function(bail) {\n  if (!arguments.length) {\n    return this._bail;\n  }\n  debug('bail %s', bail);\n  this._bail = bail;\n  return this;\n};\n\n/**\n * Run `fn(test[, done])` before running tests.\n *\n * @api private\n * @param {string} title\n * @param {Function} fn\n * @return {Suite} for chaining\n */\nSuite.prototype.beforeAll = function(title, fn) {\n  if (this.pending) {\n    return this;\n  }\n  if (typeof title === 'function') {\n    fn = title;\n    title = fn.name;\n  }\n  title = '\"before all\" hook' + (title ? ': ' + title : '');\n\n  var hook = new Hook(title, fn);\n  hook.parent = this;\n  hook.timeout(this.timeout());\n  hook.enableTimeouts(this.enableTimeouts());\n  hook.slow(this.slow());\n  hook.ctx = this.ctx;\n  this._beforeAll.push(hook);\n  this.emit('beforeAll', hook);\n  return this;\n};\n\n/**\n * Run `fn(test[, done])` after running tests.\n *\n * @api private\n * @param {string} title\n * @param {Function} fn\n * @return {Suite} for chaining\n */\nSuite.prototype.afterAll = function(title, fn) {\n  if (this.pending) {\n    return this;\n  }\n  if (typeof title === 'function') {\n    fn = title;\n    title = fn.name;\n  }\n  title = '\"after all\" hook' + (title ? ': ' + title : '');\n\n  var hook = new Hook(title, fn);\n  hook.parent = this;\n  hook.timeout(this.timeout());\n  hook.enableTimeouts(this.enableTimeouts());\n  hook.slow(this.slow());\n  hook.ctx = this.ctx;\n  this._afterAll.push(hook);\n  this.emit('afterAll', hook);\n  return this;\n};\n\n/**\n * Run `fn(test[, done])` before each test case.\n *\n * @api private\n * @param {string} title\n * @param {Function} fn\n * @return {Suite} for chaining\n */\nSuite.prototype.beforeEach = function(title, fn) {\n  if (this.pending) {\n    return this;\n  }\n  if (typeof title === 'function') {\n    fn = title;\n    title = fn.name;\n  }\n  title = '\"before each\" hook' + (title ? ': ' + title : '');\n\n  var hook = new Hook(title, fn);\n  hook.parent = this;\n  hook.timeout(this.timeout());\n  hook.enableTimeouts(this.enableTimeouts());\n  hook.slow(this.slow());\n  hook.ctx = this.ctx;\n  this._beforeEach.push(hook);\n  this.emit('beforeEach', hook);\n  return this;\n};\n\n/**\n * Run `fn(test[, done])` after each test case.\n *\n * @api private\n * @param {string} title\n * @param {Function} fn\n * @return {Suite} for chaining\n */\nSuite.prototype.afterEach = function(title, fn) {\n  if (this.pending) {\n    return this;\n  }\n  if (typeof title === 'function') {\n    fn = title;\n    title = fn.name;\n  }\n  title = '\"after each\" hook' + (title ? ': ' + title : '');\n\n  var hook = new Hook(title, fn);\n  hook.parent = this;\n  hook.timeout(this.timeout());\n  hook.enableTimeouts(this.enableTimeouts());\n  hook.slow(this.slow());\n  hook.ctx = this.ctx;\n  this._afterEach.push(hook);\n  this.emit('afterEach', hook);\n  return this;\n};\n\n/**\n * Add a test `suite`.\n *\n * @api private\n * @param {Suite} suite\n * @return {Suite} for chaining\n */\nSuite.prototype.addSuite = function(suite) {\n  suite.parent = this;\n  suite.timeout(this.timeout());\n  suite.enableTimeouts(this.enableTimeouts());\n  suite.slow(this.slow());\n  suite.bail(this.bail());\n  this.suites.push(suite);\n  this.emit('suite', suite);\n  return this;\n};\n\n/**\n * Add a `test` to this suite.\n *\n * @api private\n * @param {Test} test\n * @return {Suite} for chaining\n */\nSuite.prototype.addTest = function(test) {\n  test.parent = this;\n  test.timeout(this.timeout());\n  test.enableTimeouts(this.enableTimeouts());\n  test.slow(this.slow());\n  test.ctx = this.ctx;\n  this.tests.push(test);\n  this.emit('test', test);\n  return this;\n};\n\n/**\n * Return the full title generated by recursively concatenating the parent's\n * full title.\n *\n * @api public\n * @return {string}\n */\nSuite.prototype.fullTitle = function() {\n  if (this.parent) {\n    var full = this.parent.fullTitle();\n    if (full) {\n      return full + ' ' + this.title;\n    }\n  }\n  return this.title;\n};\n\n/**\n * Return the total number of tests.\n *\n * @api public\n * @return {number}\n */\nSuite.prototype.total = function() {\n  return utils.reduce(this.suites, function(sum, suite) {\n    return sum + suite.total();\n  }, 0) + this.tests.length;\n};\n\n/**\n * Iterates through each suite recursively to find all tests. Applies a\n * function in the format `fn(test)`.\n *\n * @api private\n * @param {Function} fn\n * @return {Suite}\n */\nSuite.prototype.eachTest = function(fn) {\n  utils.forEach(this.tests, fn);\n  utils.forEach(this.suites, function(suite) {\n    suite.eachTest(fn);\n  });\n  return this;\n};\n\n/**\n * This will run the root suite if we happen to be running in delayed mode.\n */\nSuite.prototype.run = function run() {\n  if (this.root) {\n    this.emit('run');\n  }\n};\n\n},{\"./hook\":7,\"./ms\":15,\"./utils\":39,\"debug\":2,\"events\":3}],38:[function(require,module,exports){\n/**\n * Module dependencies.\n */\n\nvar Runnable = require('./runnable');\nvar inherits = require('./utils').inherits;\n\n/**\n * Expose `Test`.\n */\n\nmodule.exports = Test;\n\n/**\n * Initialize a new `Test` with the given `title` and callback `fn`.\n *\n * @api private\n * @param {String} title\n * @param {Function} fn\n */\nfunction Test(title, fn) {\n  Runnable.call(this, title, fn);\n  this.pending = !fn;\n  this.type = 'test';\n}\n\n/**\n * Inherit from `Runnable.prototype`.\n */\ninherits(Test, Runnable);\n\n},{\"./runnable\":35,\"./utils\":39}],39:[function(require,module,exports){\n(function (process,Buffer){\n/* eslint-env browser */\n\n/**\n * Module dependencies.\n */\n\nvar basename = require('path').basename;\nvar debug = require('debug')('mocha:watch');\nvar exists = require('fs').existsSync || require('path').existsSync;\nvar glob = require('glob');\nvar join = require('path').join;\nvar readdirSync = require('fs').readdirSync;\nvar statSync = require('fs').statSync;\nvar watchFile = require('fs').watchFile;\n\n/**\n * Ignored directories.\n */\n\nvar ignore = ['node_modules', '.git'];\n\nexports.inherits = require('util').inherits;\n\n/**\n * Escape special characters in the given string of html.\n *\n * @api private\n * @param  {string} html\n * @return {string}\n */\nexports.escape = function(html) {\n  return String(html)\n    .replace(/&/g, '&amp;')\n    .replace(/\"/g, '&quot;')\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;');\n};\n\n/**\n * Array#forEach (<=IE8)\n *\n * @api private\n * @param {Array} arr\n * @param {Function} fn\n * @param {Object} scope\n */\nexports.forEach = function(arr, fn, scope) {\n  for (var i = 0, l = arr.length; i < l; i++) {\n    fn.call(scope, arr[i], i);\n  }\n};\n\n/**\n * Test if the given obj is type of string.\n *\n * @api private\n * @param {Object} obj\n * @return {boolean}\n */\nexports.isString = function(obj) {\n  return typeof obj === 'string';\n};\n\n/**\n * Array#map (<=IE8)\n *\n * @api private\n * @param {Array} arr\n * @param {Function} fn\n * @param {Object} scope\n * @return {Array}\n */\nexports.map = function(arr, fn, scope) {\n  var result = [];\n  for (var i = 0, l = arr.length; i < l; i++) {\n    result.push(fn.call(scope, arr[i], i, arr));\n  }\n  return result;\n};\n\n/**\n * Array#indexOf (<=IE8)\n *\n * @api private\n * @param {Array} arr\n * @param {Object} obj to find index of\n * @param {number} start\n * @return {number}\n */\nexports.indexOf = function(arr, obj, start) {\n  for (var i = start || 0, l = arr.length; i < l; i++) {\n    if (arr[i] === obj) {\n      return i;\n    }\n  }\n  return -1;\n};\n\n/**\n * Array#reduce (<=IE8)\n *\n * @api private\n * @param {Array} arr\n * @param {Function} fn\n * @param {Object} val Initial value.\n * @return {*}\n */\nexports.reduce = function(arr, fn, val) {\n  var rval = val;\n\n  for (var i = 0, l = arr.length; i < l; i++) {\n    rval = fn(rval, arr[i], i, arr);\n  }\n\n  return rval;\n};\n\n/**\n * Array#filter (<=IE8)\n *\n * @api private\n * @param {Array} arr\n * @param {Function} fn\n * @return {Array}\n */\nexports.filter = function(arr, fn) {\n  var ret = [];\n\n  for (var i = 0, l = arr.length; i < l; i++) {\n    var val = arr[i];\n    if (fn(val, i, arr)) {\n      ret.push(val);\n    }\n  }\n\n  return ret;\n};\n\n/**\n * Object.keys (<=IE8)\n *\n * @api private\n * @param {Object} obj\n * @return {Array} keys\n */\nexports.keys = typeof Object.keys === 'function' ? Object.keys : function(obj) {\n  var keys = [];\n  var has = Object.prototype.hasOwnProperty; // for `window` on <=IE8\n\n  for (var key in obj) {\n    if (has.call(obj, key)) {\n      keys.push(key);\n    }\n  }\n\n  return keys;\n};\n\n/**\n * Watch the given `files` for changes\n * and invoke `fn(file)` on modification.\n *\n * @api private\n * @param {Array} files\n * @param {Function} fn\n */\nexports.watch = function(files, fn) {\n  var options = { interval: 100 };\n  files.forEach(function(file) {\n    debug('file %s', file);\n    watchFile(file, options, function(curr, prev) {\n      if (prev.mtime < curr.mtime) {\n        fn(file);\n      }\n    });\n  });\n};\n\n/**\n * Array.isArray (<=IE8)\n *\n * @api private\n * @param {Object} obj\n * @return {Boolean}\n */\nvar isArray = typeof Array.isArray === 'function' ? Array.isArray : function(obj) {\n  return Object.prototype.toString.call(obj) === '[object Array]';\n};\n\n/**\n * Buffer.prototype.toJSON polyfill.\n *\n * @type {Function}\n */\nif (typeof Buffer !== 'undefined' && Buffer.prototype) {\n  Buffer.prototype.toJSON = Buffer.prototype.toJSON || function() {\n    return Array.prototype.slice.call(this, 0);\n  };\n}\n\n/**\n * Ignored files.\n *\n * @api private\n * @param {string} path\n * @return {boolean}\n */\nfunction ignored(path) {\n  return !~ignore.indexOf(path);\n}\n\n/**\n * Lookup files in the given `dir`.\n *\n * @api private\n * @param {string} dir\n * @param {string[]} [ext=['.js']]\n * @param {Array} [ret=[]]\n * @return {Array}\n */\nexports.files = function(dir, ext, ret) {\n  ret = ret || [];\n  ext = ext || ['js'];\n\n  var re = new RegExp('\\\\.(' + ext.join('|') + ')$');\n\n  readdirSync(dir)\n    .filter(ignored)\n    .forEach(function(path) {\n      path = join(dir, path);\n      if (statSync(path).isDirectory()) {\n        exports.files(path, ext, ret);\n      } else if (path.match(re)) {\n        ret.push(path);\n      }\n    });\n\n  return ret;\n};\n\n/**\n * Compute a slug from the given `str`.\n *\n * @api private\n * @param {string} str\n * @return {string}\n */\nexports.slug = function(str) {\n  return str\n    .toLowerCase()\n    .replace(/ +/g, '-')\n    .replace(/[^-\\w]/g, '');\n};\n\n/**\n * Strip the function definition from `str`, and re-indent for pre whitespace.\n *\n * @param {string} str\n * @return {string}\n */\nexports.clean = function(str) {\n  str = str\n    .replace(/\\r\\n?|[\\n\\u2028\\u2029]/g, '\\n').replace(/^\\uFEFF/, '')\n    .replace(/^function *\\(.*\\)\\s*{|\\(.*\\) *=> *{?/, '')\n    .replace(/\\s+\\}$/, '');\n\n  var spaces = str.match(/^\\n?( *)/)[1].length;\n  var tabs = str.match(/^\\n?(\\t*)/)[1].length;\n  var re = new RegExp('^\\n?' + (tabs ? '\\t' : ' ') + '{' + (tabs ? tabs : spaces) + '}', 'gm');\n\n  str = str.replace(re, '');\n\n  return exports.trim(str);\n};\n\n/**\n * Trim the given `str`.\n *\n * @api private\n * @param {string} str\n * @return {string}\n */\nexports.trim = function(str) {\n  return str.replace(/^\\s+|\\s+$/g, '');\n};\n\n/**\n * Parse the given `qs`.\n *\n * @api private\n * @param {string} qs\n * @return {Object}\n */\nexports.parseQuery = function(qs) {\n  return exports.reduce(qs.replace('?', '').split('&'), function(obj, pair) {\n    var i = pair.indexOf('=');\n    var key = pair.slice(0, i);\n    var val = pair.slice(++i);\n\n    obj[key] = decodeURIComponent(val);\n    return obj;\n  }, {});\n};\n\n/**\n * Highlight the given string of `js`.\n *\n * @api private\n * @param {string} js\n * @return {string}\n */\nfunction highlight(js) {\n  return js\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;')\n    .replace(/\\/\\/(.*)/gm, '<span class=\"comment\">//$1</span>')\n    .replace(/('.*?')/gm, '<span class=\"string\">$1</span>')\n    .replace(/(\\d+\\.\\d+)/gm, '<span class=\"number\">$1</span>')\n    .replace(/(\\d+)/gm, '<span class=\"number\">$1</span>')\n    .replace(/\\bnew[ \\t]+(\\w+)/gm, '<span class=\"keyword\">new</span> <span class=\"init\">$1</span>')\n    .replace(/\\b(function|new|throw|return|var|if|else)\\b/gm, '<span class=\"keyword\">$1</span>');\n}\n\n/**\n * Highlight the contents of tag `name`.\n *\n * @api private\n * @param {string} name\n */\nexports.highlightTags = function(name) {\n  var code = document.getElementById('mocha').getElementsByTagName(name);\n  for (var i = 0, len = code.length; i < len; ++i) {\n    code[i].innerHTML = highlight(code[i].innerHTML);\n  }\n};\n\n/**\n * If a value could have properties, and has none, this function is called,\n * which returns a string representation of the empty value.\n *\n * Functions w/ no properties return `'[Function]'`\n * Arrays w/ length === 0 return `'[]'`\n * Objects w/ no properties return `'{}'`\n * All else: return result of `value.toString()`\n *\n * @api private\n * @param {*} value The value to inspect.\n * @param {string} [type] The type of the value, if known.\n * @returns {string}\n */\nfunction emptyRepresentation(value, type) {\n  type = type || exports.type(value);\n\n  switch (type) {\n    case 'function':\n      return '[Function]';\n    case 'object':\n      return '{}';\n    case 'array':\n      return '[]';\n    default:\n      return value.toString();\n  }\n}\n\n/**\n * Takes some variable and asks `Object.prototype.toString()` what it thinks it\n * is.\n *\n * @api private\n * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString\n * @param {*} value The value to test.\n * @returns {string}\n * @example\n * type({}) // 'object'\n * type([]) // 'array'\n * type(1) // 'number'\n * type(false) // 'boolean'\n * type(Infinity) // 'number'\n * type(null) // 'null'\n * type(new Date()) // 'date'\n * type(/foo/) // 'regexp'\n * type('type') // 'string'\n * type(global) // 'global'\n */\nexports.type = function type(value) {\n  if (value === undefined) {\n    return 'undefined';\n  } else if (value === null) {\n    return 'null';\n  } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) {\n    return 'buffer';\n  }\n  return Object.prototype.toString.call(value)\n    .replace(/^\\[.+\\s(.+?)\\]$/, '$1')\n    .toLowerCase();\n};\n\n/**\n * Stringify `value`. Different behavior depending on type of value:\n *\n * - If `value` is undefined or null, return `'[undefined]'` or `'[null]'`, respectively.\n * - If `value` is not an object, function or array, return result of `value.toString()` wrapped in double-quotes.\n * - If `value` is an *empty* object, function, or array, return result of function\n *   {@link emptyRepresentation}.\n * - If `value` has properties, call {@link exports.canonicalize} on it, then return result of\n *   JSON.stringify().\n *\n * @api private\n * @see exports.type\n * @param {*} value\n * @return {string}\n */\nexports.stringify = function(value) {\n  var type = exports.type(value);\n\n  if (!~exports.indexOf(['object', 'array', 'function'], type)) {\n    if (type !== 'buffer') {\n      return jsonStringify(value);\n    }\n    var json = value.toJSON();\n    // Based on the toJSON result\n    return jsonStringify(json.data && json.type ? json.data : json, 2)\n      .replace(/,(\\n|$)/g, '$1');\n  }\n\n  for (var prop in value) {\n    if (Object.prototype.hasOwnProperty.call(value, prop)) {\n      return jsonStringify(exports.canonicalize(value), 2).replace(/,(\\n|$)/g, '$1');\n    }\n  }\n\n  return emptyRepresentation(value, type);\n};\n\n/**\n * like JSON.stringify but more sense.\n *\n * @api private\n * @param {Object}  object\n * @param {number=} spaces\n * @param {number=} depth\n * @returns {*}\n */\nfunction jsonStringify(object, spaces, depth) {\n  if (typeof spaces === 'undefined') {\n    // primitive types\n    return _stringify(object);\n  }\n\n  depth = depth || 1;\n  var space = spaces * depth;\n  var str = isArray(object) ? '[' : '{';\n  var end = isArray(object) ? ']' : '}';\n  var length = object.length || exports.keys(object).length;\n  // `.repeat()` polyfill\n  function repeat(s, n) {\n    return new Array(n).join(s);\n  }\n\n  function _stringify(val) {\n    switch (exports.type(val)) {\n      case 'null':\n      case 'undefined':\n        val = '[' + val + ']';\n        break;\n      case 'array':\n      case 'object':\n        val = jsonStringify(val, spaces, depth + 1);\n        break;\n      case 'boolean':\n      case 'regexp':\n      case 'number':\n        val = val === 0 && (1 / val) === -Infinity // `-0`\n          ? '-0'\n          : val.toString();\n        break;\n      case 'date':\n        var sDate = isNaN(val.getTime())        // Invalid date\n          ? val.toString()\n          : val.toISOString();\n        val = '[Date: ' + sDate + ']';\n        break;\n      case 'buffer':\n        var json = val.toJSON();\n        // Based on the toJSON result\n        json = json.data && json.type ? json.data : json;\n        val = '[Buffer: ' + jsonStringify(json, 2, depth + 1) + ']';\n        break;\n      default:\n        val = (val === '[Function]' || val === '[Circular]')\n          ? val\n          : JSON.stringify(val); // string\n    }\n    return val;\n  }\n\n  for (var i in object) {\n    if (!object.hasOwnProperty(i)) {\n      continue; // not my business\n    }\n    --length;\n    str += '\\n ' + repeat(' ', space)\n      + (isArray(object) ? '' : '\"' + i + '\": ') // key\n      + _stringify(object[i])                     // value\n      + (length ? ',' : '');                     // comma\n  }\n\n  return str\n    // [], {}\n    + (str.length !== 1 ? '\\n' + repeat(' ', --space) + end : end);\n}\n\n/**\n * Test if a value is a buffer.\n *\n * @api private\n * @param {*} value The value to test.\n * @return {boolean} True if `value` is a buffer, otherwise false\n */\nexports.isBuffer = function(value) {\n  return typeof Buffer !== 'undefined' && Buffer.isBuffer(value);\n};\n\n/**\n * Return a new Thing that has the keys in sorted order. Recursive.\n *\n * If the Thing...\n * - has already been seen, return string `'[Circular]'`\n * - is `undefined`, return string `'[undefined]'`\n * - is `null`, return value `null`\n * - is some other primitive, return the value\n * - is not a primitive or an `Array`, `Object`, or `Function`, return the value of the Thing's `toString()` method\n * - is a non-empty `Array`, `Object`, or `Function`, return the result of calling this function again.\n * - is an empty `Array`, `Object`, or `Function`, return the result of calling `emptyRepresentation()`\n *\n * @api private\n * @see {@link exports.stringify}\n * @param {*} value Thing to inspect.  May or may not have properties.\n * @param {Array} [stack=[]] Stack of seen values\n * @return {(Object|Array|Function|string|undefined)}\n */\nexports.canonicalize = function(value, stack) {\n  var canonicalizedObj;\n  /* eslint-disable no-unused-vars */\n  var prop;\n  /* eslint-enable no-unused-vars */\n  var type = exports.type(value);\n  function withStack(value, fn) {\n    stack.push(value);\n    fn();\n    stack.pop();\n  }\n\n  stack = stack || [];\n\n  if (exports.indexOf(stack, value) !== -1) {\n    return '[Circular]';\n  }\n\n  switch (type) {\n    case 'undefined':\n    case 'buffer':\n    case 'null':\n      canonicalizedObj = value;\n      break;\n    case 'array':\n      withStack(value, function() {\n        canonicalizedObj = exports.map(value, function(item) {\n          return exports.canonicalize(item, stack);\n        });\n      });\n      break;\n    case 'function':\n      /* eslint-disable guard-for-in */\n      for (prop in value) {\n        canonicalizedObj = {};\n        break;\n      }\n      /* eslint-enable guard-for-in */\n      if (!canonicalizedObj) {\n        canonicalizedObj = emptyRepresentation(value, type);\n        break;\n      }\n    /* falls through */\n    case 'object':\n      canonicalizedObj = canonicalizedObj || {};\n      withStack(value, function() {\n        exports.forEach(exports.keys(value).sort(), function(key) {\n          canonicalizedObj[key] = exports.canonicalize(value[key], stack);\n        });\n      });\n      break;\n    case 'date':\n    case 'number':\n    case 'regexp':\n    case 'boolean':\n      canonicalizedObj = value;\n      break;\n    default:\n      canonicalizedObj = value.toString();\n  }\n\n  return canonicalizedObj;\n};\n\n/**\n * Lookup file names at the given `path`.\n *\n * @api public\n * @param {string} path Base path to start searching from.\n * @param {string[]} extensions File extensions to look for.\n * @param {boolean} recursive Whether or not to recurse into subdirectories.\n * @return {string[]} An array of paths.\n */\nexports.lookupFiles = function lookupFiles(path, extensions, recursive) {\n  var files = [];\n  var re = new RegExp('\\\\.(' + extensions.join('|') + ')$');\n\n  if (!exists(path)) {\n    if (exists(path + '.js')) {\n      path += '.js';\n    } else {\n      files = glob.sync(path);\n      if (!files.length) {\n        throw new Error(\"cannot resolve path (or pattern) '\" + path + \"'\");\n      }\n      return files;\n    }\n  }\n\n  try {\n    var stat = statSync(path);\n    if (stat.isFile()) {\n      return path;\n    }\n  } catch (err) {\n    // ignore error\n    return;\n  }\n\n  readdirSync(path).forEach(function(file) {\n    file = join(path, file);\n    try {\n      var stat = statSync(file);\n      if (stat.isDirectory()) {\n        if (recursive) {\n          files = files.concat(lookupFiles(file, extensions, recursive));\n        }\n        return;\n      }\n    } catch (err) {\n      // ignore error\n      return;\n    }\n    if (!stat.isFile() || !re.test(file) || basename(file)[0] === '.') {\n      return;\n    }\n    files.push(file);\n  });\n\n  return files;\n};\n\n/**\n * Generate an undefined error with a message warning the user.\n *\n * @return {Error}\n */\n\nexports.undefinedError = function() {\n  return new Error('Caught undefined error, did you throw without specifying what?');\n};\n\n/**\n * Generate an undefined error if `err` is not defined.\n *\n * @param {Error} err\n * @return {Error}\n */\n\nexports.getError = function(err) {\n  return err || exports.undefinedError();\n};\n\n/**\n * @summary\n * This Filter based on `mocha-clean` module.(see: `github.com/rstacruz/mocha-clean`)\n * @description\n * When invoking this function you get a filter function that get the Error.stack as an input,\n * and return a prettify output.\n * (i.e: strip Mocha and internal node functions from stack trace).\n * @returns {Function}\n */\nexports.stackTraceFilter = function() {\n  // TODO: Replace with `process.browser`\n  var slash = '/';\n  var is = typeof document === 'undefined' ? { node: true } : { browser: true };\n  var cwd = is.node\n      ? process.cwd() + slash\n      : (typeof location === 'undefined' ? window.location : location).href.replace(/\\/[^\\/]*$/, '/');\n\n  function isMochaInternal(line) {\n    return (~line.indexOf('node_modules' + slash + 'mocha' + slash))\n      || (~line.indexOf('components' + slash + 'mochajs' + slash))\n      || (~line.indexOf('components' + slash + 'mocha' + slash))\n      || (~line.indexOf(slash + 'mocha.js'));\n  }\n\n  function isNodeInternal(line) {\n    return (~line.indexOf('(timers.js:'))\n      || (~line.indexOf('(events.js:'))\n      || (~line.indexOf('(node.js:'))\n      || (~line.indexOf('(module.js:'))\n      || (~line.indexOf('GeneratorFunctionPrototype.next (native)'))\n      || false;\n  }\n\n  return function(stack) {\n    stack = stack.split('\\n');\n\n    stack = exports.reduce(stack, function(list, line) {\n      if (isMochaInternal(line)) {\n        return list;\n      }\n\n      if (is.node && isNodeInternal(line)) {\n        return list;\n      }\n\n      // Clean up cwd(absolute)\n      list.push(line.replace(cwd, ''));\n      return list;\n    }, []);\n\n    return stack.join('\\n');\n  };\n};\n\n}).call(this,require('_process'),require(\"buffer\").Buffer)\n},{\"_process\":51,\"buffer\":43,\"debug\":2,\"fs\":41,\"glob\":41,\"path\":41,\"util\":66}],40:[function(require,module,exports){\n(function (process){\nvar WritableStream = require('stream').Writable\nvar inherits = require('util').inherits\n\nmodule.exports = BrowserStdout\n\n\ninherits(BrowserStdout, WritableStream)\n\nfunction BrowserStdout(opts) {\n  if (!(this instanceof BrowserStdout)) return new BrowserStdout(opts)\n\n  opts = opts || {}\n  WritableStream.call(this, opts)\n  this.label = (opts.label !== undefined) ? opts.label : 'stdout'\n}\n\nBrowserStdout.prototype._write = function(chunks, encoding, cb) {\n  var output = chunks.toString ? chunks.toString() : chunks\n  if (this.label === false) {\n    console.log(output)\n  } else {\n    console.log(this.label+':', output)\n  }\n  process.nextTick(cb)\n}\n\n}).call(this,require('_process'))\n},{\"_process\":51,\"stream\":63,\"util\":66}],41:[function(require,module,exports){\n\n},{}],42:[function(require,module,exports){\narguments[4][41][0].apply(exports,arguments)\n},{\"dup\":41}],43:[function(require,module,exports){\n/*!\n * The buffer module from node.js, for the browser.\n *\n * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>\n * @license  MIT\n */\n\nvar base64 = require('base64-js')\nvar ieee754 = require('ieee754')\nvar isArray = require('is-array')\n\nexports.Buffer = Buffer\nexports.SlowBuffer = SlowBuffer\nexports.INSPECT_MAX_BYTES = 50\nBuffer.poolSize = 8192 // not used by this implementation\n\nvar rootParent = {}\n\n/**\n * If `Buffer.TYPED_ARRAY_SUPPORT`:\n *   === true    Use Uint8Array implementation (fastest)\n *   === false   Use Object implementation (most compatible, even IE6)\n *\n * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,\n * Opera 11.6+, iOS 4.2+.\n *\n * Due to various browser bugs, sometimes the Object implementation will be used even\n * when the browser supports typed arrays.\n *\n * Note:\n *\n *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,\n *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.\n *\n *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property\n *     on objects.\n *\n *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.\n *\n *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of\n *     incorrect length in some situations.\n\n * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they\n * get the Object implementation, which is slower but behaves correctly.\n */\nBuffer.TYPED_ARRAY_SUPPORT = (function () {\n  function Bar () {}\n  try {\n    var arr = new Uint8Array(1)\n    arr.foo = function () { return 42 }\n    arr.constructor = Bar\n    return arr.foo() === 42 && // typed array instances can be augmented\n        arr.constructor === Bar && // constructor can be set\n        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`\n        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`\n  } catch (e) {\n    return false\n  }\n})()\n\nfunction kMaxLength () {\n  return Buffer.TYPED_ARRAY_SUPPORT\n    ? 0x7fffffff\n    : 0x3fffffff\n}\n\n/**\n * Class: Buffer\n * =============\n *\n * The Buffer constructor returns instances of `Uint8Array` that are augmented\n * with function properties for all the node `Buffer` API functions. We use\n * `Uint8Array` so that square bracket notation works as expected -- it returns\n * a single octet.\n *\n * By augmenting the instances, we can avoid modifying the `Uint8Array`\n * prototype.\n */\nfunction Buffer (arg) {\n  if (!(this instanceof Buffer)) {\n    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.\n    if (arguments.length > 1) return new Buffer(arg, arguments[1])\n    return new Buffer(arg)\n  }\n\n  this.length = 0\n  this.parent = undefined\n\n  // Common case.\n  if (typeof arg === 'number') {\n    return fromNumber(this, arg)\n  }\n\n  // Slightly less common case.\n  if (typeof arg === 'string') {\n    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')\n  }\n\n  // Unusual.\n  return fromObject(this, arg)\n}\n\nfunction fromNumber (that, length) {\n  that = allocate(that, length < 0 ? 0 : checked(length) | 0)\n  if (!Buffer.TYPED_ARRAY_SUPPORT) {\n    for (var i = 0; i < length; i++) {\n      that[i] = 0\n    }\n  }\n  return that\n}\n\nfunction fromString (that, string, encoding) {\n  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'\n\n  // Assumption: byteLength() return value is always < kMaxLength.\n  var length = byteLength(string, encoding) | 0\n  that = allocate(that, length)\n\n  that.write(string, encoding)\n  return that\n}\n\nfunction fromObject (that, object) {\n  if (Buffer.isBuffer(object)) return fromBuffer(that, object)\n\n  if (isArray(object)) return fromArray(that, object)\n\n  if (object == null) {\n    throw new TypeError('must start with number, buffer, array or string')\n  }\n\n  if (typeof ArrayBuffer !== 'undefined') {\n    if (object.buffer instanceof ArrayBuffer) {\n      return fromTypedArray(that, object)\n    }\n    if (object instanceof ArrayBuffer) {\n      return fromArrayBuffer(that, object)\n    }\n  }\n\n  if (object.length) return fromArrayLike(that, object)\n\n  return fromJsonObject(that, object)\n}\n\nfunction fromBuffer (that, buffer) {\n  var length = checked(buffer.length) | 0\n  that = allocate(that, length)\n  buffer.copy(that, 0, 0, length)\n  return that\n}\n\nfunction fromArray (that, array) {\n  var length = checked(array.length) | 0\n  that = allocate(that, length)\n  for (var i = 0; i < length; i += 1) {\n    that[i] = array[i] & 255\n  }\n  return that\n}\n\n// Duplicate of fromArray() to keep fromArray() monomorphic.\nfunction fromTypedArray (that, array) {\n  var length = checked(array.length) | 0\n  that = allocate(that, length)\n  // Truncating the elements is probably not what people expect from typed\n  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior\n  // of the old Buffer constructor.\n  for (var i = 0; i < length; i += 1) {\n    that[i] = array[i] & 255\n  }\n  return that\n}\n\nfunction fromArrayBuffer (that, array) {\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    // Return an augmented `Uint8Array` instance, for best performance\n    array.byteLength\n    that = Buffer._augment(new Uint8Array(array))\n  } else {\n    // Fallback: Return an object instance of the Buffer class\n    that = fromTypedArray(that, new Uint8Array(array))\n  }\n  return that\n}\n\nfunction fromArrayLike (that, array) {\n  var length = checked(array.length) | 0\n  that = allocate(that, length)\n  for (var i = 0; i < length; i += 1) {\n    that[i] = array[i] & 255\n  }\n  return that\n}\n\n// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.\n// Returns a zero-length buffer for inputs that don't conform to the spec.\nfunction fromJsonObject (that, object) {\n  var array\n  var length = 0\n\n  if (object.type === 'Buffer' && isArray(object.data)) {\n    array = object.data\n    length = checked(array.length) | 0\n  }\n  that = allocate(that, length)\n\n  for (var i = 0; i < length; i += 1) {\n    that[i] = array[i] & 255\n  }\n  return that\n}\n\nfunction allocate (that, length) {\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    // Return an augmented `Uint8Array` instance, for best performance\n    that = Buffer._augment(new Uint8Array(length))\n  } else {\n    // Fallback: Return an object instance of the Buffer class\n    that.length = length\n    that._isBuffer = true\n  }\n\n  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1\n  if (fromPool) that.parent = rootParent\n\n  return that\n}\n\nfunction checked (length) {\n  // Note: cannot use `length < kMaxLength` here because that fails when\n  // length is NaN (which is otherwise coerced to zero.)\n  if (length >= kMaxLength()) {\n    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +\n                         'size: 0x' + kMaxLength().toString(16) + ' bytes')\n  }\n  return length | 0\n}\n\nfunction SlowBuffer (subject, encoding) {\n  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)\n\n  var buf = new Buffer(subject, encoding)\n  delete buf.parent\n  return buf\n}\n\nBuffer.isBuffer = function isBuffer (b) {\n  return !!(b != null && b._isBuffer)\n}\n\nBuffer.compare = function compare (a, b) {\n  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {\n    throw new TypeError('Arguments must be Buffers')\n  }\n\n  if (a === b) return 0\n\n  var x = a.length\n  var y = b.length\n\n  var i = 0\n  var len = Math.min(x, y)\n  while (i < len) {\n    if (a[i] !== b[i]) break\n\n    ++i\n  }\n\n  if (i !== len) {\n    x = a[i]\n    y = b[i]\n  }\n\n  if (x < y) return -1\n  if (y < x) return 1\n  return 0\n}\n\nBuffer.isEncoding = function isEncoding (encoding) {\n  switch (String(encoding).toLowerCase()) {\n    case 'hex':\n    case 'utf8':\n    case 'utf-8':\n    case 'ascii':\n    case 'binary':\n    case 'base64':\n    case 'raw':\n    case 'ucs2':\n    case 'ucs-2':\n    case 'utf16le':\n    case 'utf-16le':\n      return true\n    default:\n      return false\n  }\n}\n\nBuffer.concat = function concat (list, length) {\n  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')\n\n  if (list.length === 0) {\n    return new Buffer(0)\n  }\n\n  var i\n  if (length === undefined) {\n    length = 0\n    for (i = 0; i < list.length; i++) {\n      length += list[i].length\n    }\n  }\n\n  var buf = new Buffer(length)\n  var pos = 0\n  for (i = 0; i < list.length; i++) {\n    var item = list[i]\n    item.copy(buf, pos)\n    pos += item.length\n  }\n  return buf\n}\n\nfunction byteLength (string, encoding) {\n  if (typeof string !== 'string') string = '' + string\n\n  var len = string.length\n  if (len === 0) return 0\n\n  // Use a for loop to avoid recursion\n  var loweredCase = false\n  for (;;) {\n    switch (encoding) {\n      case 'ascii':\n      case 'binary':\n      // Deprecated\n      case 'raw':\n      case 'raws':\n        return len\n      case 'utf8':\n      case 'utf-8':\n        return utf8ToBytes(string).length\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return len * 2\n      case 'hex':\n        return len >>> 1\n      case 'base64':\n        return base64ToBytes(string).length\n      default:\n        if (loweredCase) return utf8ToBytes(string).length // assume utf8\n        encoding = ('' + encoding).toLowerCase()\n        loweredCase = true\n    }\n  }\n}\nBuffer.byteLength = byteLength\n\n// pre-set for values that may exist in the future\nBuffer.prototype.length = undefined\nBuffer.prototype.parent = undefined\n\nfunction slowToString (encoding, start, end) {\n  var loweredCase = false\n\n  start = start | 0\n  end = end === undefined || end === Infinity ? this.length : end | 0\n\n  if (!encoding) encoding = 'utf8'\n  if (start < 0) start = 0\n  if (end > this.length) end = this.length\n  if (end <= start) return ''\n\n  while (true) {\n    switch (encoding) {\n      case 'hex':\n        return hexSlice(this, start, end)\n\n      case 'utf8':\n      case 'utf-8':\n        return utf8Slice(this, start, end)\n\n      case 'ascii':\n        return asciiSlice(this, start, end)\n\n      case 'binary':\n        return binarySlice(this, start, end)\n\n      case 'base64':\n        return base64Slice(this, start, end)\n\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return utf16leSlice(this, start, end)\n\n      default:\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\n        encoding = (encoding + '').toLowerCase()\n        loweredCase = true\n    }\n  }\n}\n\nBuffer.prototype.toString = function toString () {\n  var length = this.length | 0\n  if (length === 0) return ''\n  if (arguments.length === 0) return utf8Slice(this, 0, length)\n  return slowToString.apply(this, arguments)\n}\n\nBuffer.prototype.equals = function equals (b) {\n  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')\n  if (this === b) return true\n  return Buffer.compare(this, b) === 0\n}\n\nBuffer.prototype.inspect = function inspect () {\n  var str = ''\n  var max = exports.INSPECT_MAX_BYTES\n  if (this.length > 0) {\n    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')\n    if (this.length > max) str += ' ... '\n  }\n  return '<Buffer ' + str + '>'\n}\n\nBuffer.prototype.compare = function compare (b) {\n  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')\n  if (this === b) return 0\n  return Buffer.compare(this, b)\n}\n\nBuffer.prototype.indexOf = function indexOf (val, byteOffset) {\n  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff\n  else if (byteOffset < -0x80000000) byteOffset = -0x80000000\n  byteOffset >>= 0\n\n  if (this.length === 0) return -1\n  if (byteOffset >= this.length) return -1\n\n  // Negative offsets start from the end of the buffer\n  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)\n\n  if (typeof val === 'string') {\n    if (val.length === 0) return -1 // special case: looking for empty string always fails\n    return String.prototype.indexOf.call(this, val, byteOffset)\n  }\n  if (Buffer.isBuffer(val)) {\n    return arrayIndexOf(this, val, byteOffset)\n  }\n  if (typeof val === 'number') {\n    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {\n      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)\n    }\n    return arrayIndexOf(this, [ val ], byteOffset)\n  }\n\n  function arrayIndexOf (arr, val, byteOffset) {\n    var foundIndex = -1\n    for (var i = 0; byteOffset + i < arr.length; i++) {\n      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {\n        if (foundIndex === -1) foundIndex = i\n        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex\n      } else {\n        foundIndex = -1\n      }\n    }\n    return -1\n  }\n\n  throw new TypeError('val must be string, number or Buffer')\n}\n\n// `get` is deprecated\nBuffer.prototype.get = function get (offset) {\n  console.log('.get() is deprecated. Access using array indexes instead.')\n  return this.readUInt8(offset)\n}\n\n// `set` is deprecated\nBuffer.prototype.set = function set (v, offset) {\n  console.log('.set() is deprecated. Access using array indexes instead.')\n  return this.writeUInt8(v, offset)\n}\n\nfunction hexWrite (buf, string, offset, length) {\n  offset = Number(offset) || 0\n  var remaining = buf.length - offset\n  if (!length) {\n    length = remaining\n  } else {\n    length = Number(length)\n    if (length > remaining) {\n      length = remaining\n    }\n  }\n\n  // must be an even number of digits\n  var strLen = string.length\n  if (strLen % 2 !== 0) throw new Error('Invalid hex string')\n\n  if (length > strLen / 2) {\n    length = strLen / 2\n  }\n  for (var i = 0; i < length; i++) {\n    var parsed = parseInt(string.substr(i * 2, 2), 16)\n    if (isNaN(parsed)) throw new Error('Invalid hex string')\n    buf[offset + i] = parsed\n  }\n  return i\n}\n\nfunction utf8Write (buf, string, offset, length) {\n  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)\n}\n\nfunction asciiWrite (buf, string, offset, length) {\n  return blitBuffer(asciiToBytes(string), buf, offset, length)\n}\n\nfunction binaryWrite (buf, string, offset, length) {\n  return asciiWrite(buf, string, offset, length)\n}\n\nfunction base64Write (buf, string, offset, length) {\n  return blitBuffer(base64ToBytes(string), buf, offset, length)\n}\n\nfunction ucs2Write (buf, string, offset, length) {\n  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)\n}\n\nBuffer.prototype.write = function write (string, offset, length, encoding) {\n  // Buffer#write(string)\n  if (offset === undefined) {\n    encoding = 'utf8'\n    length = this.length\n    offset = 0\n  // Buffer#write(string, encoding)\n  } else if (length === undefined && typeof offset === 'string') {\n    encoding = offset\n    length = this.length\n    offset = 0\n  // Buffer#write(string, offset[, length][, encoding])\n  } else if (isFinite(offset)) {\n    offset = offset | 0\n    if (isFinite(length)) {\n      length = length | 0\n      if (encoding === undefined) encoding = 'utf8'\n    } else {\n      encoding = length\n      length = undefined\n    }\n  // legacy write(string, encoding, offset, length) - remove in v0.13\n  } else {\n    var swap = encoding\n    encoding = offset\n    offset = length | 0\n    length = swap\n  }\n\n  var remaining = this.length - offset\n  if (length === undefined || length > remaining) length = remaining\n\n  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {\n    throw new RangeError('attempt to write outside buffer bounds')\n  }\n\n  if (!encoding) encoding = 'utf8'\n\n  var loweredCase = false\n  for (;;) {\n    switch (encoding) {\n      case 'hex':\n        return hexWrite(this, string, offset, length)\n\n      case 'utf8':\n      case 'utf-8':\n        return utf8Write(this, string, offset, length)\n\n      case 'ascii':\n        return asciiWrite(this, string, offset, length)\n\n      case 'binary':\n        return binaryWrite(this, string, offset, length)\n\n      case 'base64':\n        // Warning: maxLength not taken into account in base64Write\n        return base64Write(this, string, offset, length)\n\n      case 'ucs2':\n      case 'ucs-2':\n      case 'utf16le':\n      case 'utf-16le':\n        return ucs2Write(this, string, offset, length)\n\n      default:\n        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)\n        encoding = ('' + encoding).toLowerCase()\n        loweredCase = true\n    }\n  }\n}\n\nBuffer.prototype.toJSON = function toJSON () {\n  return {\n    type: 'Buffer',\n    data: Array.prototype.slice.call(this._arr || this, 0)\n  }\n}\n\nfunction base64Slice (buf, start, end) {\n  if (start === 0 && end === buf.length) {\n    return base64.fromByteArray(buf)\n  } else {\n    return base64.fromByteArray(buf.slice(start, end))\n  }\n}\n\nfunction utf8Slice (buf, start, end) {\n  end = Math.min(buf.length, end)\n  var res = []\n\n  var i = start\n  while (i < end) {\n    var firstByte = buf[i]\n    var codePoint = null\n    var bytesPerSequence = (firstByte > 0xEF) ? 4\n      : (firstByte > 0xDF) ? 3\n      : (firstByte > 0xBF) ? 2\n      : 1\n\n    if (i + bytesPerSequence <= end) {\n      var secondByte, thirdByte, fourthByte, tempCodePoint\n\n      switch (bytesPerSequence) {\n        case 1:\n          if (firstByte < 0x80) {\n            codePoint = firstByte\n          }\n          break\n        case 2:\n          secondByte = buf[i + 1]\n          if ((secondByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)\n            if (tempCodePoint > 0x7F) {\n              codePoint = tempCodePoint\n            }\n          }\n          break\n        case 3:\n          secondByte = buf[i + 1]\n          thirdByte = buf[i + 2]\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)\n            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {\n              codePoint = tempCodePoint\n            }\n          }\n          break\n        case 4:\n          secondByte = buf[i + 1]\n          thirdByte = buf[i + 2]\n          fourthByte = buf[i + 3]\n          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {\n            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)\n            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {\n              codePoint = tempCodePoint\n            }\n          }\n      }\n    }\n\n    if (codePoint === null) {\n      // we did not generate a valid codePoint so insert a\n      // replacement char (U+FFFD) and advance only 1 byte\n      codePoint = 0xFFFD\n      bytesPerSequence = 1\n    } else if (codePoint > 0xFFFF) {\n      // encode to utf16 (surrogate pair dance)\n      codePoint -= 0x10000\n      res.push(codePoint >>> 10 & 0x3FF | 0xD800)\n      codePoint = 0xDC00 | codePoint & 0x3FF\n    }\n\n    res.push(codePoint)\n    i += bytesPerSequence\n  }\n\n  return decodeCodePointsArray(res)\n}\n\n// Based on http://stackoverflow.com/a/22747272/680742, the browser with\n// the lowest limit is Chrome, with 0x10000 args.\n// We go 1 magnitude less, for safety\nvar MAX_ARGUMENTS_LENGTH = 0x1000\n\nfunction decodeCodePointsArray (codePoints) {\n  var len = codePoints.length\n  if (len <= MAX_ARGUMENTS_LENGTH) {\n    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()\n  }\n\n  // Decode in chunks to avoid \"call stack size exceeded\".\n  var res = ''\n  var i = 0\n  while (i < len) {\n    res += String.fromCharCode.apply(\n      String,\n      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)\n    )\n  }\n  return res\n}\n\nfunction asciiSlice (buf, start, end) {\n  var ret = ''\n  end = Math.min(buf.length, end)\n\n  for (var i = start; i < end; i++) {\n    ret += String.fromCharCode(buf[i] & 0x7F)\n  }\n  return ret\n}\n\nfunction binarySlice (buf, start, end) {\n  var ret = ''\n  end = Math.min(buf.length, end)\n\n  for (var i = start; i < end; i++) {\n    ret += String.fromCharCode(buf[i])\n  }\n  return ret\n}\n\nfunction hexSlice (buf, start, end) {\n  var len = buf.length\n\n  if (!start || start < 0) start = 0\n  if (!end || end < 0 || end > len) end = len\n\n  var out = ''\n  for (var i = start; i < end; i++) {\n    out += toHex(buf[i])\n  }\n  return out\n}\n\nfunction utf16leSlice (buf, start, end) {\n  var bytes = buf.slice(start, end)\n  var res = ''\n  for (var i = 0; i < bytes.length; i += 2) {\n    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)\n  }\n  return res\n}\n\nBuffer.prototype.slice = function slice (start, end) {\n  var len = this.length\n  start = ~~start\n  end = end === undefined ? len : ~~end\n\n  if (start < 0) {\n    start += len\n    if (start < 0) start = 0\n  } else if (start > len) {\n    start = len\n  }\n\n  if (end < 0) {\n    end += len\n    if (end < 0) end = 0\n  } else if (end > len) {\n    end = len\n  }\n\n  if (end < start) end = start\n\n  var newBuf\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    newBuf = Buffer._augment(this.subarray(start, end))\n  } else {\n    var sliceLen = end - start\n    newBuf = new Buffer(sliceLen, undefined)\n    for (var i = 0; i < sliceLen; i++) {\n      newBuf[i] = this[i + start]\n    }\n  }\n\n  if (newBuf.length) newBuf.parent = this.parent || this\n\n  return newBuf\n}\n\n/*\n * Need to make sure that buffer isn't trying to write out of bounds.\n */\nfunction checkOffset (offset, ext, length) {\n  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')\n  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')\n}\n\nBuffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var val = this[offset]\n  var mul = 1\n  var i = 0\n  while (++i < byteLength && (mul *= 0x100)) {\n    val += this[offset + i] * mul\n  }\n\n  return val\n}\n\nBuffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) {\n    checkOffset(offset, byteLength, this.length)\n  }\n\n  var val = this[offset + --byteLength]\n  var mul = 1\n  while (byteLength > 0 && (mul *= 0x100)) {\n    val += this[offset + --byteLength] * mul\n  }\n\n  return val\n}\n\nBuffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 1, this.length)\n  return this[offset]\n}\n\nBuffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  return this[offset] | (this[offset + 1] << 8)\n}\n\nBuffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  return (this[offset] << 8) | this[offset + 1]\n}\n\nBuffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return ((this[offset]) |\n      (this[offset + 1] << 8) |\n      (this[offset + 2] << 16)) +\n      (this[offset + 3] * 0x1000000)\n}\n\nBuffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset] * 0x1000000) +\n    ((this[offset + 1] << 16) |\n    (this[offset + 2] << 8) |\n    this[offset + 3])\n}\n\nBuffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var val = this[offset]\n  var mul = 1\n  var i = 0\n  while (++i < byteLength && (mul *= 0x100)) {\n    val += this[offset + i] * mul\n  }\n  mul *= 0x80\n\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\n\n  return val\n}\n\nBuffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) checkOffset(offset, byteLength, this.length)\n\n  var i = byteLength\n  var mul = 1\n  var val = this[offset + --i]\n  while (i > 0 && (mul *= 0x100)) {\n    val += this[offset + --i] * mul\n  }\n  mul *= 0x80\n\n  if (val >= mul) val -= Math.pow(2, 8 * byteLength)\n\n  return val\n}\n\nBuffer.prototype.readInt8 = function readInt8 (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 1, this.length)\n  if (!(this[offset] & 0x80)) return (this[offset])\n  return ((0xff - this[offset] + 1) * -1)\n}\n\nBuffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  var val = this[offset] | (this[offset + 1] << 8)\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\n}\n\nBuffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 2, this.length)\n  var val = this[offset + 1] | (this[offset] << 8)\n  return (val & 0x8000) ? val | 0xFFFF0000 : val\n}\n\nBuffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset]) |\n    (this[offset + 1] << 8) |\n    (this[offset + 2] << 16) |\n    (this[offset + 3] << 24)\n}\n\nBuffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n\n  return (this[offset] << 24) |\n    (this[offset + 1] << 16) |\n    (this[offset + 2] << 8) |\n    (this[offset + 3])\n}\n\nBuffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n  return ieee754.read(this, offset, true, 23, 4)\n}\n\nBuffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 4, this.length)\n  return ieee754.read(this, offset, false, 23, 4)\n}\n\nBuffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 8, this.length)\n  return ieee754.read(this, offset, true, 52, 8)\n}\n\nBuffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {\n  if (!noAssert) checkOffset(offset, 8, this.length)\n  return ieee754.read(this, offset, false, 52, 8)\n}\n\nfunction checkInt (buf, value, offset, ext, max, min) {\n  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')\n  if (value > max || value < min) throw new RangeError('value is out of bounds')\n  if (offset + ext > buf.length) throw new RangeError('index out of range')\n}\n\nBuffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)\n\n  var mul = 1\n  var i = 0\n  this[offset] = value & 0xFF\n  while (++i < byteLength && (mul *= 0x100)) {\n    this[offset + i] = (value / mul) & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset | 0\n  byteLength = byteLength | 0\n  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)\n\n  var i = byteLength - 1\n  var mul = 1\n  this[offset + i] = value & 0xFF\n  while (--i >= 0 && (mul *= 0x100)) {\n    this[offset + i] = (value / mul) & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)\n  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)\n  this[offset] = value\n  return offset + 1\n}\n\nfunction objectWriteUInt16 (buf, value, offset, littleEndian) {\n  if (value < 0) value = 0xffff + value + 1\n  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {\n    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>\n      (littleEndian ? i : 1 - i) * 8\n  }\n}\n\nBuffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = value\n    this[offset + 1] = (value >>> 8)\n  } else {\n    objectWriteUInt16(this, value, offset, true)\n  }\n  return offset + 2\n}\n\nBuffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value >>> 8)\n    this[offset + 1] = value\n  } else {\n    objectWriteUInt16(this, value, offset, false)\n  }\n  return offset + 2\n}\n\nfunction objectWriteUInt32 (buf, value, offset, littleEndian) {\n  if (value < 0) value = 0xffffffff + value + 1\n  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {\n    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff\n  }\n}\n\nBuffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset + 3] = (value >>> 24)\n    this[offset + 2] = (value >>> 16)\n    this[offset + 1] = (value >>> 8)\n    this[offset] = value\n  } else {\n    objectWriteUInt32(this, value, offset, true)\n  }\n  return offset + 4\n}\n\nBuffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value >>> 24)\n    this[offset + 1] = (value >>> 16)\n    this[offset + 2] = (value >>> 8)\n    this[offset + 3] = value\n  } else {\n    objectWriteUInt32(this, value, offset, false)\n  }\n  return offset + 4\n}\n\nBuffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) {\n    var limit = Math.pow(2, 8 * byteLength - 1)\n\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\n  }\n\n  var i = 0\n  var mul = 1\n  var sub = value < 0 ? 1 : 0\n  this[offset] = value & 0xFF\n  while (++i < byteLength && (mul *= 0x100)) {\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) {\n    var limit = Math.pow(2, 8 * byteLength - 1)\n\n    checkInt(this, value, offset, byteLength, limit - 1, -limit)\n  }\n\n  var i = byteLength - 1\n  var mul = 1\n  var sub = value < 0 ? 1 : 0\n  this[offset + i] = value & 0xFF\n  while (--i >= 0 && (mul *= 0x100)) {\n    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF\n  }\n\n  return offset + byteLength\n}\n\nBuffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)\n  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)\n  if (value < 0) value = 0xff + value + 1\n  this[offset] = value\n  return offset + 1\n}\n\nBuffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = value\n    this[offset + 1] = (value >>> 8)\n  } else {\n    objectWriteUInt16(this, value, offset, true)\n  }\n  return offset + 2\n}\n\nBuffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value >>> 8)\n    this[offset + 1] = value\n  } else {\n    objectWriteUInt16(this, value, offset, false)\n  }\n  return offset + 2\n}\n\nBuffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = value\n    this[offset + 1] = (value >>> 8)\n    this[offset + 2] = (value >>> 16)\n    this[offset + 3] = (value >>> 24)\n  } else {\n    objectWriteUInt32(this, value, offset, true)\n  }\n  return offset + 4\n}\n\nBuffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {\n  value = +value\n  offset = offset | 0\n  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)\n  if (value < 0) value = 0xffffffff + value + 1\n  if (Buffer.TYPED_ARRAY_SUPPORT) {\n    this[offset] = (value >>> 24)\n    this[offset + 1] = (value >>> 16)\n    this[offset + 2] = (value >>> 8)\n    this[offset + 3] = value\n  } else {\n    objectWriteUInt32(this, value, offset, false)\n  }\n  return offset + 4\n}\n\nfunction checkIEEE754 (buf, value, offset, ext, max, min) {\n  if (value > max || value < min) throw new RangeError('value is out of bounds')\n  if (offset + ext > buf.length) throw new RangeError('index out of range')\n  if (offset < 0) throw new RangeError('index out of range')\n}\n\nfunction writeFloat (buf, value, offset, littleEndian, noAssert) {\n  if (!noAssert) {\n    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)\n  }\n  ieee754.write(buf, value, offset, littleEndian, 23, 4)\n  return offset + 4\n}\n\nBuffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {\n  return writeFloat(this, value, offset, true, noAssert)\n}\n\nBuffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {\n  return writeFloat(this, value, offset, false, noAssert)\n}\n\nfunction writeDouble (buf, value, offset, littleEndian, noAssert) {\n  if (!noAssert) {\n    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)\n  }\n  ieee754.write(buf, value, offset, littleEndian, 52, 8)\n  return offset + 8\n}\n\nBuffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {\n  return writeDouble(this, value, offset, true, noAssert)\n}\n\nBuffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {\n  return writeDouble(this, value, offset, false, noAssert)\n}\n\n// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)\nBuffer.prototype.copy = function copy (target, targetStart, start, end) {\n  if (!start) start = 0\n  if (!end && end !== 0) end = this.length\n  if (targetStart >= target.length) targetStart = target.length\n  if (!targetStart) targetStart = 0\n  if (end > 0 && end < start) end = start\n\n  // Copy 0 bytes; we're done\n  if (end === start) return 0\n  if (target.length === 0 || this.length === 0) return 0\n\n  // Fatal error conditions\n  if (targetStart < 0) {\n    throw new RangeError('targetStart out of bounds')\n  }\n  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')\n  if (end < 0) throw new RangeError('sourceEnd out of bounds')\n\n  // Are we oob?\n  if (end > this.length) end = this.length\n  if (target.length - targetStart < end - start) {\n    end = target.length - targetStart + start\n  }\n\n  var len = end - start\n  var i\n\n  if (this === target && start < targetStart && targetStart < end) {\n    // descending copy from end\n    for (i = len - 1; i >= 0; i--) {\n      target[i + targetStart] = this[i + start]\n    }\n  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {\n    // ascending copy from start\n    for (i = 0; i < len; i++) {\n      target[i + targetStart] = this[i + start]\n    }\n  } else {\n    target._set(this.subarray(start, start + len), targetStart)\n  }\n\n  return len\n}\n\n// fill(value, start=0, end=buffer.length)\nBuffer.prototype.fill = function fill (value, start, end) {\n  if (!value) value = 0\n  if (!start) start = 0\n  if (!end) end = this.length\n\n  if (end < start) throw new RangeError('end < start')\n\n  // Fill 0 bytes; we're done\n  if (end === start) return\n  if (this.length === 0) return\n\n  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')\n  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')\n\n  var i\n  if (typeof value === 'number') {\n    for (i = start; i < end; i++) {\n      this[i] = value\n    }\n  } else {\n    var bytes = utf8ToBytes(value.toString())\n    var len = bytes.length\n    for (i = start; i < end; i++) {\n      this[i] = bytes[i % len]\n    }\n  }\n\n  return this\n}\n\n/**\n * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.\n * Added in Node 0.12. Only available in browsers that support ArrayBuffer.\n */\nBuffer.prototype.toArrayBuffer = function toArrayBuffer () {\n  if (typeof Uint8Array !== 'undefined') {\n    if (Buffer.TYPED_ARRAY_SUPPORT) {\n      return (new Buffer(this)).buffer\n    } else {\n      var buf = new Uint8Array(this.length)\n      for (var i = 0, len = buf.length; i < len; i += 1) {\n        buf[i] = this[i]\n      }\n      return buf.buffer\n    }\n  } else {\n    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')\n  }\n}\n\n// HELPER FUNCTIONS\n// ================\n\nvar BP = Buffer.prototype\n\n/**\n * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods\n */\nBuffer._augment = function _augment (arr) {\n  arr.constructor = Buffer\n  arr._isBuffer = true\n\n  // save reference to original Uint8Array set method before overwriting\n  arr._set = arr.set\n\n  // deprecated\n  arr.get = BP.get\n  arr.set = BP.set\n\n  arr.write = BP.write\n  arr.toString = BP.toString\n  arr.toLocaleString = BP.toString\n  arr.toJSON = BP.toJSON\n  arr.equals = BP.equals\n  arr.compare = BP.compare\n  arr.indexOf = BP.indexOf\n  arr.copy = BP.copy\n  arr.slice = BP.slice\n  arr.readUIntLE = BP.readUIntLE\n  arr.readUIntBE = BP.readUIntBE\n  arr.readUInt8 = BP.readUInt8\n  arr.readUInt16LE = BP.readUInt16LE\n  arr.readUInt16BE = BP.readUInt16BE\n  arr.readUInt32LE = BP.readUInt32LE\n  arr.readUInt32BE = BP.readUInt32BE\n  arr.readIntLE = BP.readIntLE\n  arr.readIntBE = BP.readIntBE\n  arr.readInt8 = BP.readInt8\n  arr.readInt16LE = BP.readInt16LE\n  arr.readInt16BE = BP.readInt16BE\n  arr.readInt32LE = BP.readInt32LE\n  arr.readInt32BE = BP.readInt32BE\n  arr.readFloatLE = BP.readFloatLE\n  arr.readFloatBE = BP.readFloatBE\n  arr.readDoubleLE = BP.readDoubleLE\n  arr.readDoubleBE = BP.readDoubleBE\n  arr.writeUInt8 = BP.writeUInt8\n  arr.writeUIntLE = BP.writeUIntLE\n  arr.writeUIntBE = BP.writeUIntBE\n  arr.writeUInt16LE = BP.writeUInt16LE\n  arr.writeUInt16BE = BP.writeUInt16BE\n  arr.writeUInt32LE = BP.writeUInt32LE\n  arr.writeUInt32BE = BP.writeUInt32BE\n  arr.writeIntLE = BP.writeIntLE\n  arr.writeIntBE = BP.writeIntBE\n  arr.writeInt8 = BP.writeInt8\n  arr.writeInt16LE = BP.writeInt16LE\n  arr.writeInt16BE = BP.writeInt16BE\n  arr.writeInt32LE = BP.writeInt32LE\n  arr.writeInt32BE = BP.writeInt32BE\n  arr.writeFloatLE = BP.writeFloatLE\n  arr.writeFloatBE = BP.writeFloatBE\n  arr.writeDoubleLE = BP.writeDoubleLE\n  arr.writeDoubleBE = BP.writeDoubleBE\n  arr.fill = BP.fill\n  arr.inspect = BP.inspect\n  arr.toArrayBuffer = BP.toArrayBuffer\n\n  return arr\n}\n\nvar INVALID_BASE64_RE = /[^+\\/0-9A-Za-z-_]/g\n\nfunction base64clean (str) {\n  // Node strips out invalid characters like \\n and \\t from the string, base64-js does not\n  str = stringtrim(str).replace(INVALID_BASE64_RE, '')\n  // Node converts strings with length < 2 to ''\n  if (str.length < 2) return ''\n  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not\n  while (str.length % 4 !== 0) {\n    str = str + '='\n  }\n  return str\n}\n\nfunction stringtrim (str) {\n  if (str.trim) return str.trim()\n  return str.replace(/^\\s+|\\s+$/g, '')\n}\n\nfunction toHex (n) {\n  if (n < 16) return '0' + n.toString(16)\n  return n.toString(16)\n}\n\nfunction utf8ToBytes (string, units) {\n  units = units || Infinity\n  var codePoint\n  var length = string.length\n  var leadSurrogate = null\n  var bytes = []\n\n  for (var i = 0; i < length; i++) {\n    codePoint = string.charCodeAt(i)\n\n    // is surrogate component\n    if (codePoint > 0xD7FF && codePoint < 0xE000) {\n      // last char was a lead\n      if (!leadSurrogate) {\n        // no lead yet\n        if (codePoint > 0xDBFF) {\n          // unexpected trail\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n          continue\n        } else if (i + 1 === length) {\n          // unpaired lead\n          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n          continue\n        }\n\n        // valid lead\n        leadSurrogate = codePoint\n\n        continue\n      }\n\n      // 2 leads in a row\n      if (codePoint < 0xDC00) {\n        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n        leadSurrogate = codePoint\n        continue\n      }\n\n      // valid surrogate pair\n      codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000\n    } else if (leadSurrogate) {\n      // valid bmp char, but last char was a lead\n      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)\n    }\n\n    leadSurrogate = null\n\n    // encode utf8\n    if (codePoint < 0x80) {\n      if ((units -= 1) < 0) break\n      bytes.push(codePoint)\n    } else if (codePoint < 0x800) {\n      if ((units -= 2) < 0) break\n      bytes.push(\n        codePoint >> 0x6 | 0xC0,\n        codePoint & 0x3F | 0x80\n      )\n    } else if (codePoint < 0x10000) {\n      if ((units -= 3) < 0) break\n      bytes.push(\n        codePoint >> 0xC | 0xE0,\n        codePoint >> 0x6 & 0x3F | 0x80,\n        codePoint & 0x3F | 0x80\n      )\n    } else if (codePoint < 0x110000) {\n      if ((units -= 4) < 0) break\n      bytes.push(\n        codePoint >> 0x12 | 0xF0,\n        codePoint >> 0xC & 0x3F | 0x80,\n        codePoint >> 0x6 & 0x3F | 0x80,\n        codePoint & 0x3F | 0x80\n      )\n    } else {\n      throw new Error('Invalid code point')\n    }\n  }\n\n  return bytes\n}\n\nfunction asciiToBytes (str) {\n  var byteArray = []\n  for (var i = 0; i < str.length; i++) {\n    // Node's code seems to be doing this and not & 0x7F..\n    byteArray.push(str.charCodeAt(i) & 0xFF)\n  }\n  return byteArray\n}\n\nfunction utf16leToBytes (str, units) {\n  var c, hi, lo\n  var byteArray = []\n  for (var i = 0; i < str.length; i++) {\n    if ((units -= 2) < 0) break\n\n    c = str.charCodeAt(i)\n    hi = c >> 8\n    lo = c % 256\n    byteArray.push(lo)\n    byteArray.push(hi)\n  }\n\n  return byteArray\n}\n\nfunction base64ToBytes (str) {\n  return base64.toByteArray(base64clean(str))\n}\n\nfunction blitBuffer (src, dst, offset, length) {\n  for (var i = 0; i < length; i++) {\n    if ((i + offset >= dst.length) || (i >= src.length)) break\n    dst[i + offset] = src[i]\n  }\n  return i\n}\n\n},{\"base64-js\":44,\"ieee754\":45,\"is-array\":46}],44:[function(require,module,exports){\nvar lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';\n\n;(function (exports) {\n\t'use strict';\n\n  var Arr = (typeof Uint8Array !== 'undefined')\n    ? Uint8Array\n    : Array\n\n\tvar PLUS   = '+'.charCodeAt(0)\n\tvar SLASH  = '/'.charCodeAt(0)\n\tvar NUMBER = '0'.charCodeAt(0)\n\tvar LOWER  = 'a'.charCodeAt(0)\n\tvar UPPER  = 'A'.charCodeAt(0)\n\tvar PLUS_URL_SAFE = '-'.charCodeAt(0)\n\tvar SLASH_URL_SAFE = '_'.charCodeAt(0)\n\n\tfunction decode (elt) {\n\t\tvar code = elt.charCodeAt(0)\n\t\tif (code === PLUS ||\n\t\t    code === PLUS_URL_SAFE)\n\t\t\treturn 62 // '+'\n\t\tif (code === SLASH ||\n\t\t    code === SLASH_URL_SAFE)\n\t\t\treturn 63 // '/'\n\t\tif (code < NUMBER)\n\t\t\treturn -1 //no match\n\t\tif (code < NUMBER + 10)\n\t\t\treturn code - NUMBER + 26 + 26\n\t\tif (code < UPPER + 26)\n\t\t\treturn code - UPPER\n\t\tif (code < LOWER + 26)\n\t\t\treturn code - LOWER + 26\n\t}\n\n\tfunction b64ToByteArray (b64) {\n\t\tvar i, j, l, tmp, placeHolders, arr\n\n\t\tif (b64.length % 4 > 0) {\n\t\t\tthrow new Error('Invalid string. Length must be a multiple of 4')\n\t\t}\n\n\t\t// the number of equal signs (place holders)\n\t\t// if there are two placeholders, than the two characters before it\n\t\t// represent one byte\n\t\t// if there is only one, then the three characters before it represent 2 bytes\n\t\t// this is just a cheap hack to not do indexOf twice\n\t\tvar len = b64.length\n\t\tplaceHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0\n\n\t\t// base64 is 4/3 + up to two characters of the original data\n\t\tarr = new Arr(b64.length * 3 / 4 - placeHolders)\n\n\t\t// if there are placeholders, only get up to the last complete 4 chars\n\t\tl = placeHolders > 0 ? b64.length - 4 : b64.length\n\n\t\tvar L = 0\n\n\t\tfunction push (v) {\n\t\t\tarr[L++] = v\n\t\t}\n\n\t\tfor (i = 0, j = 0; i < l; i += 4, j += 3) {\n\t\t\ttmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))\n\t\t\tpush((tmp & 0xFF0000) >> 16)\n\t\t\tpush((tmp & 0xFF00) >> 8)\n\t\t\tpush(tmp & 0xFF)\n\t\t}\n\n\t\tif (placeHolders === 2) {\n\t\t\ttmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)\n\t\t\tpush(tmp & 0xFF)\n\t\t} else if (placeHolders === 1) {\n\t\t\ttmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)\n\t\t\tpush((tmp >> 8) & 0xFF)\n\t\t\tpush(tmp & 0xFF)\n\t\t}\n\n\t\treturn arr\n\t}\n\n\tfunction uint8ToBase64 (uint8) {\n\t\tvar i,\n\t\t\textraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes\n\t\t\toutput = \"\",\n\t\t\ttemp, length\n\n\t\tfunction encode (num) {\n\t\t\treturn lookup.charAt(num)\n\t\t}\n\n\t\tfunction tripletToBase64 (num) {\n\t\t\treturn encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)\n\t\t}\n\n\t\t// go through the array every three bytes, we'll deal with trailing stuff later\n\t\tfor (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {\n\t\t\ttemp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])\n\t\t\toutput += tripletToBase64(temp)\n\t\t}\n\n\t\t// pad the end with zeros, but make sure to not forget the extra bytes\n\t\tswitch (extraBytes) {\n\t\t\tcase 1:\n\t\t\t\ttemp = uint8[uint8.length - 1]\n\t\t\t\toutput += encode(temp >> 2)\n\t\t\t\toutput += encode((temp << 4) & 0x3F)\n\t\t\t\toutput += '=='\n\t\t\t\tbreak\n\t\t\tcase 2:\n\t\t\t\ttemp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])\n\t\t\t\toutput += encode(temp >> 10)\n\t\t\t\toutput += encode((temp >> 4) & 0x3F)\n\t\t\t\toutput += encode((temp << 2) & 0x3F)\n\t\t\t\toutput += '='\n\t\t\t\tbreak\n\t\t}\n\n\t\treturn output\n\t}\n\n\texports.toByteArray = b64ToByteArray\n\texports.fromByteArray = uint8ToBase64\n}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))\n\n},{}],45:[function(require,module,exports){\nexports.read = function (buffer, offset, isLE, mLen, nBytes) {\n  var e, m\n  var eLen = nBytes * 8 - mLen - 1\n  var eMax = (1 << eLen) - 1\n  var eBias = eMax >> 1\n  var nBits = -7\n  var i = isLE ? (nBytes - 1) : 0\n  var d = isLE ? -1 : 1\n  var s = buffer[offset + i]\n\n  i += d\n\n  e = s & ((1 << (-nBits)) - 1)\n  s >>= (-nBits)\n  nBits += eLen\n  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}\n\n  m = e & ((1 << (-nBits)) - 1)\n  e >>= (-nBits)\n  nBits += mLen\n  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}\n\n  if (e === 0) {\n    e = 1 - eBias\n  } else if (e === eMax) {\n    return m ? NaN : ((s ? -1 : 1) * Infinity)\n  } else {\n    m = m + Math.pow(2, mLen)\n    e = e - eBias\n  }\n  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)\n}\n\nexports.write = function (buffer, value, offset, isLE, mLen, nBytes) {\n  var e, m, c\n  var eLen = nBytes * 8 - mLen - 1\n  var eMax = (1 << eLen) - 1\n  var eBias = eMax >> 1\n  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)\n  var i = isLE ? 0 : (nBytes - 1)\n  var d = isLE ? 1 : -1\n  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0\n\n  value = Math.abs(value)\n\n  if (isNaN(value) || value === Infinity) {\n    m = isNaN(value) ? 1 : 0\n    e = eMax\n  } else {\n    e = Math.floor(Math.log(value) / Math.LN2)\n    if (value * (c = Math.pow(2, -e)) < 1) {\n      e--\n      c *= 2\n    }\n    if (e + eBias >= 1) {\n      value += rt / c\n    } else {\n      value += rt * Math.pow(2, 1 - eBias)\n    }\n    if (value * c >= 2) {\n      e++\n      c /= 2\n    }\n\n    if (e + eBias >= eMax) {\n      m = 0\n      e = eMax\n    } else if (e + eBias >= 1) {\n      m = (value * c - 1) * Math.pow(2, mLen)\n      e = e + eBias\n    } else {\n      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)\n      e = 0\n    }\n  }\n\n  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}\n\n  e = (e << mLen) | m\n  eLen += mLen\n  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}\n\n  buffer[offset + i - d] |= s * 128\n}\n\n},{}],46:[function(require,module,exports){\n\n/**\n * isArray\n */\n\nvar isArray = Array.isArray;\n\n/**\n * toString\n */\n\nvar str = Object.prototype.toString;\n\n/**\n * Whether or not the given `val`\n * is an array.\n *\n * example:\n *\n *        isArray([]);\n *        // > true\n *        isArray(arguments);\n *        // > false\n *        isArray('');\n *        // > false\n *\n * @param {mixed} val\n * @return {bool}\n */\n\nmodule.exports = isArray || function (val) {\n  return !! val && '[object Array]' == str.call(val);\n};\n\n},{}],47:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nfunction EventEmitter() {\n  this._events = this._events || {};\n  this._maxListeners = this._maxListeners || undefined;\n}\nmodule.exports = EventEmitter;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nEventEmitter.defaultMaxListeners = 10;\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function(n) {\n  if (!isNumber(n) || n < 0 || isNaN(n))\n    throw TypeError('n must be a positive number');\n  this._maxListeners = n;\n  return this;\n};\n\nEventEmitter.prototype.emit = function(type) {\n  var er, handler, len, args, i, listeners;\n\n  if (!this._events)\n    this._events = {};\n\n  // If there is no 'error' event listener then throw.\n  if (type === 'error') {\n    if (!this._events.error ||\n        (isObject(this._events.error) && !this._events.error.length)) {\n      er = arguments[1];\n      if (er instanceof Error) {\n        throw er; // Unhandled 'error' event\n      }\n      throw TypeError('Uncaught, unspecified \"error\" event.');\n    }\n  }\n\n  handler = this._events[type];\n\n  if (isUndefined(handler))\n    return false;\n\n  if (isFunction(handler)) {\n    switch (arguments.length) {\n      // fast cases\n      case 1:\n        handler.call(this);\n        break;\n      case 2:\n        handler.call(this, arguments[1]);\n        break;\n      case 3:\n        handler.call(this, arguments[1], arguments[2]);\n        break;\n      // slower\n      default:\n        len = arguments.length;\n        args = new Array(len - 1);\n        for (i = 1; i < len; i++)\n          args[i - 1] = arguments[i];\n        handler.apply(this, args);\n    }\n  } else if (isObject(handler)) {\n    len = arguments.length;\n    args = new Array(len - 1);\n    for (i = 1; i < len; i++)\n      args[i - 1] = arguments[i];\n\n    listeners = handler.slice();\n    len = listeners.length;\n    for (i = 0; i < len; i++)\n      listeners[i].apply(this, args);\n  }\n\n  return true;\n};\n\nEventEmitter.prototype.addListener = function(type, listener) {\n  var m;\n\n  if (!isFunction(listener))\n    throw TypeError('listener must be a function');\n\n  if (!this._events)\n    this._events = {};\n\n  // To avoid recursion in the case that type === \"newListener\"! Before\n  // adding it to the listeners, first emit \"newListener\".\n  if (this._events.newListener)\n    this.emit('newListener', type,\n              isFunction(listener.listener) ?\n              listener.listener : listener);\n\n  if (!this._events[type])\n    // Optimize the case of one listener. Don't need the extra array object.\n    this._events[type] = listener;\n  else if (isObject(this._events[type]))\n    // If we've already got an array, just append.\n    this._events[type].push(listener);\n  else\n    // Adding the second element, need to change to array.\n    this._events[type] = [this._events[type], listener];\n\n  // Check for listener leak\n  if (isObject(this._events[type]) && !this._events[type].warned) {\n    var m;\n    if (!isUndefined(this._maxListeners)) {\n      m = this._maxListeners;\n    } else {\n      m = EventEmitter.defaultMaxListeners;\n    }\n\n    if (m && m > 0 && this._events[type].length > m) {\n      this._events[type].warned = true;\n      console.error('(node) warning: possible EventEmitter memory ' +\n                    'leak detected. %d listeners added. ' +\n                    'Use emitter.setMaxListeners() to increase limit.',\n                    this._events[type].length);\n      if (typeof console.trace === 'function') {\n        // not supported in IE 10\n        console.trace();\n      }\n    }\n  }\n\n  return this;\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.once = function(type, listener) {\n  if (!isFunction(listener))\n    throw TypeError('listener must be a function');\n\n  var fired = false;\n\n  function g() {\n    this.removeListener(type, g);\n\n    if (!fired) {\n      fired = true;\n      listener.apply(this, arguments);\n    }\n  }\n\n  g.listener = listener;\n  this.on(type, g);\n\n  return this;\n};\n\n// emits a 'removeListener' event iff the listener was removed\nEventEmitter.prototype.removeListener = function(type, listener) {\n  var list, position, length, i;\n\n  if (!isFunction(listener))\n    throw TypeError('listener must be a function');\n\n  if (!this._events || !this._events[type])\n    return this;\n\n  list = this._events[type];\n  length = list.length;\n  position = -1;\n\n  if (list === listener ||\n      (isFunction(list.listener) && list.listener === listener)) {\n    delete this._events[type];\n    if (this._events.removeListener)\n      this.emit('removeListener', type, listener);\n\n  } else if (isObject(list)) {\n    for (i = length; i-- > 0;) {\n      if (list[i] === listener ||\n          (list[i].listener && list[i].listener === listener)) {\n        position = i;\n        break;\n      }\n    }\n\n    if (position < 0)\n      return this;\n\n    if (list.length === 1) {\n      list.length = 0;\n      delete this._events[type];\n    } else {\n      list.splice(position, 1);\n    }\n\n    if (this._events.removeListener)\n      this.emit('removeListener', type, listener);\n  }\n\n  return this;\n};\n\nEventEmitter.prototype.removeAllListeners = function(type) {\n  var key, listeners;\n\n  if (!this._events)\n    return this;\n\n  // not listening for removeListener, no need to emit\n  if (!this._events.removeListener) {\n    if (arguments.length === 0)\n      this._events = {};\n    else if (this._events[type])\n      delete this._events[type];\n    return this;\n  }\n\n  // emit removeListener for all listeners on all events\n  if (arguments.length === 0) {\n    for (key in this._events) {\n      if (key === 'removeListener') continue;\n      this.removeAllListeners(key);\n    }\n    this.removeAllListeners('removeListener');\n    this._events = {};\n    return this;\n  }\n\n  listeners = this._events[type];\n\n  if (isFunction(listeners)) {\n    this.removeListener(type, listeners);\n  } else {\n    // LIFO order\n    while (listeners.length)\n      this.removeListener(type, listeners[listeners.length - 1]);\n  }\n  delete this._events[type];\n\n  return this;\n};\n\nEventEmitter.prototype.listeners = function(type) {\n  var ret;\n  if (!this._events || !this._events[type])\n    ret = [];\n  else if (isFunction(this._events[type]))\n    ret = [this._events[type]];\n  else\n    ret = this._events[type].slice();\n  return ret;\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  var ret;\n  if (!emitter._events || !emitter._events[type])\n    ret = 0;\n  else if (isFunction(emitter._events[type]))\n    ret = 1;\n  else\n    ret = emitter._events[type].length;\n  return ret;\n};\n\nfunction isFunction(arg) {\n  return typeof arg === 'function';\n}\n\nfunction isNumber(arg) {\n  return typeof arg === 'number';\n}\n\nfunction isObject(arg) {\n  return typeof arg === 'object' && arg !== null;\n}\n\nfunction isUndefined(arg) {\n  return arg === void 0;\n}\n\n},{}],48:[function(require,module,exports){\nif (typeof Object.create === 'function') {\n  // implementation from standard node.js 'util' module\n  module.exports = function inherits(ctor, superCtor) {\n    ctor.super_ = superCtor\n    ctor.prototype = Object.create(superCtor.prototype, {\n      constructor: {\n        value: ctor,\n        enumerable: false,\n        writable: true,\n        configurable: true\n      }\n    });\n  };\n} else {\n  // old school shim for old browsers\n  module.exports = function inherits(ctor, superCtor) {\n    ctor.super_ = superCtor\n    var TempCtor = function () {}\n    TempCtor.prototype = superCtor.prototype\n    ctor.prototype = new TempCtor()\n    ctor.prototype.constructor = ctor\n  }\n}\n\n},{}],49:[function(require,module,exports){\nmodule.exports = Array.isArray || function (arr) {\n  return Object.prototype.toString.call(arr) == '[object Array]';\n};\n\n},{}],50:[function(require,module,exports){\nexports.endianness = function () { return 'LE' };\n\nexports.hostname = function () {\n    if (typeof location !== 'undefined') {\n        return location.hostname\n    }\n    else return '';\n};\n\nexports.loadavg = function () { return [] };\n\nexports.uptime = function () { return 0 };\n\nexports.freemem = function () {\n    return Number.MAX_VALUE;\n};\n\nexports.totalmem = function () {\n    return Number.MAX_VALUE;\n};\n\nexports.cpus = function () { return [] };\n\nexports.type = function () { return 'Browser' };\n\nexports.release = function () {\n    if (typeof navigator !== 'undefined') {\n        return navigator.appVersion;\n    }\n    return '';\n};\n\nexports.networkInterfaces\n= exports.getNetworkInterfaces\n= function () { return {} };\n\nexports.arch = function () { return 'javascript' };\n\nexports.platform = function () { return 'browser' };\n\nexports.tmpdir = exports.tmpDir = function () {\n    return '/tmp';\n};\n\nexports.EOL = '\\n';\n\n},{}],51:[function(require,module,exports){\n// shim for using process in browser\n\nvar process = module.exports = {};\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = setTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    clearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        setTimeout(drainQueue, 0);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n},{}],52:[function(require,module,exports){\nmodule.exports = require(\"./lib/_stream_duplex.js\")\n\n},{\"./lib/_stream_duplex.js\":53}],53:[function(require,module,exports){\n(function (process){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// a duplex stream is just a stream that is both readable and writable.\n// Since JS doesn't have multiple prototypal inheritance, this class\n// prototypally inherits from Readable, and then parasitically from\n// Writable.\n\nmodule.exports = Duplex;\n\n/*<replacement>*/\nvar objectKeys = Object.keys || function (obj) {\n  var keys = [];\n  for (var key in obj) keys.push(key);\n  return keys;\n}\n/*</replacement>*/\n\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nvar Readable = require('./_stream_readable');\nvar Writable = require('./_stream_writable');\n\nutil.inherits(Duplex, Readable);\n\nforEach(objectKeys(Writable.prototype), function(method) {\n  if (!Duplex.prototype[method])\n    Duplex.prototype[method] = Writable.prototype[method];\n});\n\nfunction Duplex(options) {\n  if (!(this instanceof Duplex))\n    return new Duplex(options);\n\n  Readable.call(this, options);\n  Writable.call(this, options);\n\n  if (options && options.readable === false)\n    this.readable = false;\n\n  if (options && options.writable === false)\n    this.writable = false;\n\n  this.allowHalfOpen = true;\n  if (options && options.allowHalfOpen === false)\n    this.allowHalfOpen = false;\n\n  this.once('end', onend);\n}\n\n// the no-half-open enforcer\nfunction onend() {\n  // if we allow half-open state, or if the writable side ended,\n  // then we're ok.\n  if (this.allowHalfOpen || this._writableState.ended)\n    return;\n\n  // no more data can be written.\n  // But allow more writes to happen in this tick.\n  process.nextTick(this.end.bind(this));\n}\n\nfunction forEach (xs, f) {\n  for (var i = 0, l = xs.length; i < l; i++) {\n    f(xs[i], i);\n  }\n}\n\n}).call(this,require('_process'))\n},{\"./_stream_readable\":55,\"./_stream_writable\":57,\"_process\":51,\"core-util-is\":58,\"inherits\":48}],54:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// a passthrough stream.\n// basically just the most minimal sort of Transform stream.\n// Every written chunk gets output as-is.\n\nmodule.exports = PassThrough;\n\nvar Transform = require('./_stream_transform');\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nutil.inherits(PassThrough, Transform);\n\nfunction PassThrough(options) {\n  if (!(this instanceof PassThrough))\n    return new PassThrough(options);\n\n  Transform.call(this, options);\n}\n\nPassThrough.prototype._transform = function(chunk, encoding, cb) {\n  cb(null, chunk);\n};\n\n},{\"./_stream_transform\":56,\"core-util-is\":58,\"inherits\":48}],55:[function(require,module,exports){\n(function (process){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nmodule.exports = Readable;\n\n/*<replacement>*/\nvar isArray = require('isarray');\n/*</replacement>*/\n\n\n/*<replacement>*/\nvar Buffer = require('buffer').Buffer;\n/*</replacement>*/\n\nReadable.ReadableState = ReadableState;\n\nvar EE = require('events').EventEmitter;\n\n/*<replacement>*/\nif (!EE.listenerCount) EE.listenerCount = function(emitter, type) {\n  return emitter.listeners(type).length;\n};\n/*</replacement>*/\n\nvar Stream = require('stream');\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nvar StringDecoder;\n\n\n/*<replacement>*/\nvar debug = require('util');\nif (debug && debug.debuglog) {\n  debug = debug.debuglog('stream');\n} else {\n  debug = function () {};\n}\n/*</replacement>*/\n\n\nutil.inherits(Readable, Stream);\n\nfunction ReadableState(options, stream) {\n  var Duplex = require('./_stream_duplex');\n\n  options = options || {};\n\n  // the point at which it stops calling _read() to fill the buffer\n  // Note: 0 is a valid value, means \"don't call _read preemptively ever\"\n  var hwm = options.highWaterMark;\n  var defaultHwm = options.objectMode ? 16 : 16 * 1024;\n  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;\n\n  // cast to ints.\n  this.highWaterMark = ~~this.highWaterMark;\n\n  this.buffer = [];\n  this.length = 0;\n  this.pipes = null;\n  this.pipesCount = 0;\n  this.flowing = null;\n  this.ended = false;\n  this.endEmitted = false;\n  this.reading = false;\n\n  // a flag to be able to tell if the onwrite cb is called immediately,\n  // or on a later tick.  We set this to true at first, because any\n  // actions that shouldn't happen until \"later\" should generally also\n  // not happen before the first write call.\n  this.sync = true;\n\n  // whenever we return null, then we set a flag to say\n  // that we're awaiting a 'readable' event emission.\n  this.needReadable = false;\n  this.emittedReadable = false;\n  this.readableListening = false;\n\n\n  // object stream flag. Used to make read(n) ignore n and to\n  // make all the buffer merging and length checks go away\n  this.objectMode = !!options.objectMode;\n\n  if (stream instanceof Duplex)\n    this.objectMode = this.objectMode || !!options.readableObjectMode;\n\n  // Crypto is kind of old and crusty.  Historically, its default string\n  // encoding is 'binary' so we have to make this configurable.\n  // Everything else in the universe uses 'utf8', though.\n  this.defaultEncoding = options.defaultEncoding || 'utf8';\n\n  // when piping, we only care about 'readable' events that happen\n  // after read()ing all the bytes and not getting any pushback.\n  this.ranOut = false;\n\n  // the number of writers that are awaiting a drain event in .pipe()s\n  this.awaitDrain = 0;\n\n  // if true, a maybeReadMore has been scheduled\n  this.readingMore = false;\n\n  this.decoder = null;\n  this.encoding = null;\n  if (options.encoding) {\n    if (!StringDecoder)\n      StringDecoder = require('string_decoder/').StringDecoder;\n    this.decoder = new StringDecoder(options.encoding);\n    this.encoding = options.encoding;\n  }\n}\n\nfunction Readable(options) {\n  var Duplex = require('./_stream_duplex');\n\n  if (!(this instanceof Readable))\n    return new Readable(options);\n\n  this._readableState = new ReadableState(options, this);\n\n  // legacy\n  this.readable = true;\n\n  Stream.call(this);\n}\n\n// Manually shove something into the read() buffer.\n// This returns true if the highWaterMark has not been hit yet,\n// similar to how Writable.write() returns true if you should\n// write() some more.\nReadable.prototype.push = function(chunk, encoding) {\n  var state = this._readableState;\n\n  if (util.isString(chunk) && !state.objectMode) {\n    encoding = encoding || state.defaultEncoding;\n    if (encoding !== state.encoding) {\n      chunk = new Buffer(chunk, encoding);\n      encoding = '';\n    }\n  }\n\n  return readableAddChunk(this, state, chunk, encoding, false);\n};\n\n// Unshift should *always* be something directly out of read()\nReadable.prototype.unshift = function(chunk) {\n  var state = this._readableState;\n  return readableAddChunk(this, state, chunk, '', true);\n};\n\nfunction readableAddChunk(stream, state, chunk, encoding, addToFront) {\n  var er = chunkInvalid(state, chunk);\n  if (er) {\n    stream.emit('error', er);\n  } else if (util.isNullOrUndefined(chunk)) {\n    state.reading = false;\n    if (!state.ended)\n      onEofChunk(stream, state);\n  } else if (state.objectMode || chunk && chunk.length > 0) {\n    if (state.ended && !addToFront) {\n      var e = new Error('stream.push() after EOF');\n      stream.emit('error', e);\n    } else if (state.endEmitted && addToFront) {\n      var e = new Error('stream.unshift() after end event');\n      stream.emit('error', e);\n    } else {\n      if (state.decoder && !addToFront && !encoding)\n        chunk = state.decoder.write(chunk);\n\n      if (!addToFront)\n        state.reading = false;\n\n      // if we want the data now, just emit it.\n      if (state.flowing && state.length === 0 && !state.sync) {\n        stream.emit('data', chunk);\n        stream.read(0);\n      } else {\n        // update the buffer info.\n        state.length += state.objectMode ? 1 : chunk.length;\n        if (addToFront)\n          state.buffer.unshift(chunk);\n        else\n          state.buffer.push(chunk);\n\n        if (state.needReadable)\n          emitReadable(stream);\n      }\n\n      maybeReadMore(stream, state);\n    }\n  } else if (!addToFront) {\n    state.reading = false;\n  }\n\n  return needMoreData(state);\n}\n\n\n\n// if it's past the high water mark, we can push in some more.\n// Also, if we have no data yet, we can stand some\n// more bytes.  This is to work around cases where hwm=0,\n// such as the repl.  Also, if the push() triggered a\n// readable event, and the user called read(largeNumber) such that\n// needReadable was set, then we ought to push more, so that another\n// 'readable' event will be triggered.\nfunction needMoreData(state) {\n  return !state.ended &&\n         (state.needReadable ||\n          state.length < state.highWaterMark ||\n          state.length === 0);\n}\n\n// backwards compatibility.\nReadable.prototype.setEncoding = function(enc) {\n  if (!StringDecoder)\n    StringDecoder = require('string_decoder/').StringDecoder;\n  this._readableState.decoder = new StringDecoder(enc);\n  this._readableState.encoding = enc;\n  return this;\n};\n\n// Don't raise the hwm > 128MB\nvar MAX_HWM = 0x800000;\nfunction roundUpToNextPowerOf2(n) {\n  if (n >= MAX_HWM) {\n    n = MAX_HWM;\n  } else {\n    // Get the next highest power of 2\n    n--;\n    for (var p = 1; p < 32; p <<= 1) n |= n >> p;\n    n++;\n  }\n  return n;\n}\n\nfunction howMuchToRead(n, state) {\n  if (state.length === 0 && state.ended)\n    return 0;\n\n  if (state.objectMode)\n    return n === 0 ? 0 : 1;\n\n  if (isNaN(n) || util.isNull(n)) {\n    // only flow one buffer at a time\n    if (state.flowing && state.buffer.length)\n      return state.buffer[0].length;\n    else\n      return state.length;\n  }\n\n  if (n <= 0)\n    return 0;\n\n  // If we're asking for more than the target buffer level,\n  // then raise the water mark.  Bump up to the next highest\n  // power of 2, to prevent increasing it excessively in tiny\n  // amounts.\n  if (n > state.highWaterMark)\n    state.highWaterMark = roundUpToNextPowerOf2(n);\n\n  // don't have that much.  return null, unless we've ended.\n  if (n > state.length) {\n    if (!state.ended) {\n      state.needReadable = true;\n      return 0;\n    } else\n      return state.length;\n  }\n\n  return n;\n}\n\n// you can override either this method, or the async _read(n) below.\nReadable.prototype.read = function(n) {\n  debug('read', n);\n  var state = this._readableState;\n  var nOrig = n;\n\n  if (!util.isNumber(n) || n > 0)\n    state.emittedReadable = false;\n\n  // if we're doing read(0) to trigger a readable event, but we\n  // already have a bunch of data in the buffer, then just trigger\n  // the 'readable' event and move on.\n  if (n === 0 &&\n      state.needReadable &&\n      (state.length >= state.highWaterMark || state.ended)) {\n    debug('read: emitReadable', state.length, state.ended);\n    if (state.length === 0 && state.ended)\n      endReadable(this);\n    else\n      emitReadable(this);\n    return null;\n  }\n\n  n = howMuchToRead(n, state);\n\n  // if we've ended, and we're now clear, then finish it up.\n  if (n === 0 && state.ended) {\n    if (state.length === 0)\n      endReadable(this);\n    return null;\n  }\n\n  // All the actual chunk generation logic needs to be\n  // *below* the call to _read.  The reason is that in certain\n  // synthetic stream cases, such as passthrough streams, _read\n  // may be a completely synchronous operation which may change\n  // the state of the read buffer, providing enough data when\n  // before there was *not* enough.\n  //\n  // So, the steps are:\n  // 1. Figure out what the state of things will be after we do\n  // a read from the buffer.\n  //\n  // 2. If that resulting state will trigger a _read, then call _read.\n  // Note that this may be asynchronous, or synchronous.  Yes, it is\n  // deeply ugly to write APIs this way, but that still doesn't mean\n  // that the Readable class should behave improperly, as streams are\n  // designed to be sync/async agnostic.\n  // Take note if the _read call is sync or async (ie, if the read call\n  // has returned yet), so that we know whether or not it's safe to emit\n  // 'readable' etc.\n  //\n  // 3. Actually pull the requested chunks out of the buffer and return.\n\n  // if we need a readable event, then we need to do some reading.\n  var doRead = state.needReadable;\n  debug('need readable', doRead);\n\n  // if we currently have less than the highWaterMark, then also read some\n  if (state.length === 0 || state.length - n < state.highWaterMark) {\n    doRead = true;\n    debug('length less than watermark', doRead);\n  }\n\n  // however, if we've ended, then there's no point, and if we're already\n  // reading, then it's unnecessary.\n  if (state.ended || state.reading) {\n    doRead = false;\n    debug('reading or ended', doRead);\n  }\n\n  if (doRead) {\n    debug('do read');\n    state.reading = true;\n    state.sync = true;\n    // if the length is currently zero, then we *need* a readable event.\n    if (state.length === 0)\n      state.needReadable = true;\n    // call internal read method\n    this._read(state.highWaterMark);\n    state.sync = false;\n  }\n\n  // If _read pushed data synchronously, then `reading` will be false,\n  // and we need to re-evaluate how much data we can return to the user.\n  if (doRead && !state.reading)\n    n = howMuchToRead(nOrig, state);\n\n  var ret;\n  if (n > 0)\n    ret = fromList(n, state);\n  else\n    ret = null;\n\n  if (util.isNull(ret)) {\n    state.needReadable = true;\n    n = 0;\n  }\n\n  state.length -= n;\n\n  // If we have nothing in the buffer, then we want to know\n  // as soon as we *do* get something into the buffer.\n  if (state.length === 0 && !state.ended)\n    state.needReadable = true;\n\n  // If we tried to read() past the EOF, then emit end on the next tick.\n  if (nOrig !== n && state.ended && state.length === 0)\n    endReadable(this);\n\n  if (!util.isNull(ret))\n    this.emit('data', ret);\n\n  return ret;\n};\n\nfunction chunkInvalid(state, chunk) {\n  var er = null;\n  if (!util.isBuffer(chunk) &&\n      !util.isString(chunk) &&\n      !util.isNullOrUndefined(chunk) &&\n      !state.objectMode) {\n    er = new TypeError('Invalid non-string/buffer chunk');\n  }\n  return er;\n}\n\n\nfunction onEofChunk(stream, state) {\n  if (state.decoder && !state.ended) {\n    var chunk = state.decoder.end();\n    if (chunk && chunk.length) {\n      state.buffer.push(chunk);\n      state.length += state.objectMode ? 1 : chunk.length;\n    }\n  }\n  state.ended = true;\n\n  // emit 'readable' now to make sure it gets picked up.\n  emitReadable(stream);\n}\n\n// Don't emit readable right away in sync mode, because this can trigger\n// another read() call => stack overflow.  This way, it might trigger\n// a nextTick recursion warning, but that's not so bad.\nfunction emitReadable(stream) {\n  var state = stream._readableState;\n  state.needReadable = false;\n  if (!state.emittedReadable) {\n    debug('emitReadable', state.flowing);\n    state.emittedReadable = true;\n    if (state.sync)\n      process.nextTick(function() {\n        emitReadable_(stream);\n      });\n    else\n      emitReadable_(stream);\n  }\n}\n\nfunction emitReadable_(stream) {\n  debug('emit readable');\n  stream.emit('readable');\n  flow(stream);\n}\n\n\n// at this point, the user has presumably seen the 'readable' event,\n// and called read() to consume some data.  that may have triggered\n// in turn another _read(n) call, in which case reading = true if\n// it's in progress.\n// However, if we're not ended, or reading, and the length < hwm,\n// then go ahead and try to read some more preemptively.\nfunction maybeReadMore(stream, state) {\n  if (!state.readingMore) {\n    state.readingMore = true;\n    process.nextTick(function() {\n      maybeReadMore_(stream, state);\n    });\n  }\n}\n\nfunction maybeReadMore_(stream, state) {\n  var len = state.length;\n  while (!state.reading && !state.flowing && !state.ended &&\n         state.length < state.highWaterMark) {\n    debug('maybeReadMore read 0');\n    stream.read(0);\n    if (len === state.length)\n      // didn't get any data, stop spinning.\n      break;\n    else\n      len = state.length;\n  }\n  state.readingMore = false;\n}\n\n// abstract method.  to be overridden in specific implementation classes.\n// call cb(er, data) where data is <= n in length.\n// for virtual (non-string, non-buffer) streams, \"length\" is somewhat\n// arbitrary, and perhaps not very meaningful.\nReadable.prototype._read = function(n) {\n  this.emit('error', new Error('not implemented'));\n};\n\nReadable.prototype.pipe = function(dest, pipeOpts) {\n  var src = this;\n  var state = this._readableState;\n\n  switch (state.pipesCount) {\n    case 0:\n      state.pipes = dest;\n      break;\n    case 1:\n      state.pipes = [state.pipes, dest];\n      break;\n    default:\n      state.pipes.push(dest);\n      break;\n  }\n  state.pipesCount += 1;\n  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);\n\n  var doEnd = (!pipeOpts || pipeOpts.end !== false) &&\n              dest !== process.stdout &&\n              dest !== process.stderr;\n\n  var endFn = doEnd ? onend : cleanup;\n  if (state.endEmitted)\n    process.nextTick(endFn);\n  else\n    src.once('end', endFn);\n\n  dest.on('unpipe', onunpipe);\n  function onunpipe(readable) {\n    debug('onunpipe');\n    if (readable === src) {\n      cleanup();\n    }\n  }\n\n  function onend() {\n    debug('onend');\n    dest.end();\n  }\n\n  // when the dest drains, it reduces the awaitDrain counter\n  // on the source.  This would be more elegant with a .once()\n  // handler in flow(), but adding and removing repeatedly is\n  // too slow.\n  var ondrain = pipeOnDrain(src);\n  dest.on('drain', ondrain);\n\n  function cleanup() {\n    debug('cleanup');\n    // cleanup event handlers once the pipe is broken\n    dest.removeListener('close', onclose);\n    dest.removeListener('finish', onfinish);\n    dest.removeListener('drain', ondrain);\n    dest.removeListener('error', onerror);\n    dest.removeListener('unpipe', onunpipe);\n    src.removeListener('end', onend);\n    src.removeListener('end', cleanup);\n    src.removeListener('data', ondata);\n\n    // if the reader is waiting for a drain event from this\n    // specific writer, then it would cause it to never start\n    // flowing again.\n    // So, if this is awaiting a drain, then we just call it now.\n    // If we don't know, then assume that we are waiting for one.\n    if (state.awaitDrain &&\n        (!dest._writableState || dest._writableState.needDrain))\n      ondrain();\n  }\n\n  src.on('data', ondata);\n  function ondata(chunk) {\n    debug('ondata');\n    var ret = dest.write(chunk);\n    if (false === ret) {\n      debug('false write response, pause',\n            src._readableState.awaitDrain);\n      src._readableState.awaitDrain++;\n      src.pause();\n    }\n  }\n\n  // if the dest has an error, then stop piping into it.\n  // however, don't suppress the throwing behavior for this.\n  function onerror(er) {\n    debug('onerror', er);\n    unpipe();\n    dest.removeListener('error', onerror);\n    if (EE.listenerCount(dest, 'error') === 0)\n      dest.emit('error', er);\n  }\n  // This is a brutally ugly hack to make sure that our error handler\n  // is attached before any userland ones.  NEVER DO THIS.\n  if (!dest._events || !dest._events.error)\n    dest.on('error', onerror);\n  else if (isArray(dest._events.error))\n    dest._events.error.unshift(onerror);\n  else\n    dest._events.error = [onerror, dest._events.error];\n\n\n\n  // Both close and finish should trigger unpipe, but only once.\n  function onclose() {\n    dest.removeListener('finish', onfinish);\n    unpipe();\n  }\n  dest.once('close', onclose);\n  function onfinish() {\n    debug('onfinish');\n    dest.removeListener('close', onclose);\n    unpipe();\n  }\n  dest.once('finish', onfinish);\n\n  function unpipe() {\n    debug('unpipe');\n    src.unpipe(dest);\n  }\n\n  // tell the dest that it's being piped to\n  dest.emit('pipe', src);\n\n  // start the flow if it hasn't been started already.\n  if (!state.flowing) {\n    debug('pipe resume');\n    src.resume();\n  }\n\n  return dest;\n};\n\nfunction pipeOnDrain(src) {\n  return function() {\n    var state = src._readableState;\n    debug('pipeOnDrain', state.awaitDrain);\n    if (state.awaitDrain)\n      state.awaitDrain--;\n    if (state.awaitDrain === 0 && EE.listenerCount(src, 'data')) {\n      state.flowing = true;\n      flow(src);\n    }\n  };\n}\n\n\nReadable.prototype.unpipe = function(dest) {\n  var state = this._readableState;\n\n  // if we're not piping anywhere, then do nothing.\n  if (state.pipesCount === 0)\n    return this;\n\n  // just one destination.  most common case.\n  if (state.pipesCount === 1) {\n    // passed in one, but it's not the right one.\n    if (dest && dest !== state.pipes)\n      return this;\n\n    if (!dest)\n      dest = state.pipes;\n\n    // got a match.\n    state.pipes = null;\n    state.pipesCount = 0;\n    state.flowing = false;\n    if (dest)\n      dest.emit('unpipe', this);\n    return this;\n  }\n\n  // slow case. multiple pipe destinations.\n\n  if (!dest) {\n    // remove all.\n    var dests = state.pipes;\n    var len = state.pipesCount;\n    state.pipes = null;\n    state.pipesCount = 0;\n    state.flowing = false;\n\n    for (var i = 0; i < len; i++)\n      dests[i].emit('unpipe', this);\n    return this;\n  }\n\n  // try to find the right one.\n  var i = indexOf(state.pipes, dest);\n  if (i === -1)\n    return this;\n\n  state.pipes.splice(i, 1);\n  state.pipesCount -= 1;\n  if (state.pipesCount === 1)\n    state.pipes = state.pipes[0];\n\n  dest.emit('unpipe', this);\n\n  return this;\n};\n\n// set up data events if they are asked for\n// Ensure readable listeners eventually get something\nReadable.prototype.on = function(ev, fn) {\n  var res = Stream.prototype.on.call(this, ev, fn);\n\n  // If listening to data, and it has not explicitly been paused,\n  // then call resume to start the flow of data on the next tick.\n  if (ev === 'data' && false !== this._readableState.flowing) {\n    this.resume();\n  }\n\n  if (ev === 'readable' && this.readable) {\n    var state = this._readableState;\n    if (!state.readableListening) {\n      state.readableListening = true;\n      state.emittedReadable = false;\n      state.needReadable = true;\n      if (!state.reading) {\n        var self = this;\n        process.nextTick(function() {\n          debug('readable nexttick read 0');\n          self.read(0);\n        });\n      } else if (state.length) {\n        emitReadable(this, state);\n      }\n    }\n  }\n\n  return res;\n};\nReadable.prototype.addListener = Readable.prototype.on;\n\n// pause() and resume() are remnants of the legacy readable stream API\n// If the user uses them, then switch into old mode.\nReadable.prototype.resume = function() {\n  var state = this._readableState;\n  if (!state.flowing) {\n    debug('resume');\n    state.flowing = true;\n    if (!state.reading) {\n      debug('resume read 0');\n      this.read(0);\n    }\n    resume(this, state);\n  }\n  return this;\n};\n\nfunction resume(stream, state) {\n  if (!state.resumeScheduled) {\n    state.resumeScheduled = true;\n    process.nextTick(function() {\n      resume_(stream, state);\n    });\n  }\n}\n\nfunction resume_(stream, state) {\n  state.resumeScheduled = false;\n  stream.emit('resume');\n  flow(stream);\n  if (state.flowing && !state.reading)\n    stream.read(0);\n}\n\nReadable.prototype.pause = function() {\n  debug('call pause flowing=%j', this._readableState.flowing);\n  if (false !== this._readableState.flowing) {\n    debug('pause');\n    this._readableState.flowing = false;\n    this.emit('pause');\n  }\n  return this;\n};\n\nfunction flow(stream) {\n  var state = stream._readableState;\n  debug('flow', state.flowing);\n  if (state.flowing) {\n    do {\n      var chunk = stream.read();\n    } while (null !== chunk && state.flowing);\n  }\n}\n\n// wrap an old-style stream as the async data source.\n// This is *not* part of the readable stream interface.\n// It is an ugly unfortunate mess of history.\nReadable.prototype.wrap = function(stream) {\n  var state = this._readableState;\n  var paused = false;\n\n  var self = this;\n  stream.on('end', function() {\n    debug('wrapped end');\n    if (state.decoder && !state.ended) {\n      var chunk = state.decoder.end();\n      if (chunk && chunk.length)\n        self.push(chunk);\n    }\n\n    self.push(null);\n  });\n\n  stream.on('data', function(chunk) {\n    debug('wrapped data');\n    if (state.decoder)\n      chunk = state.decoder.write(chunk);\n    if (!chunk || !state.objectMode && !chunk.length)\n      return;\n\n    var ret = self.push(chunk);\n    if (!ret) {\n      paused = true;\n      stream.pause();\n    }\n  });\n\n  // proxy all the other methods.\n  // important when wrapping filters and duplexes.\n  for (var i in stream) {\n    if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {\n      this[i] = function(method) { return function() {\n        return stream[method].apply(stream, arguments);\n      }}(i);\n    }\n  }\n\n  // proxy certain important events.\n  var events = ['error', 'close', 'destroy', 'pause', 'resume'];\n  forEach(events, function(ev) {\n    stream.on(ev, self.emit.bind(self, ev));\n  });\n\n  // when we try to consume some more bytes, simply unpause the\n  // underlying stream.\n  self._read = function(n) {\n    debug('wrapped _read', n);\n    if (paused) {\n      paused = false;\n      stream.resume();\n    }\n  };\n\n  return self;\n};\n\n\n\n// exposed for testing purposes only.\nReadable._fromList = fromList;\n\n// Pluck off n bytes from an array of buffers.\n// Length is the combined lengths of all the buffers in the list.\nfunction fromList(n, state) {\n  var list = state.buffer;\n  var length = state.length;\n  var stringMode = !!state.decoder;\n  var objectMode = !!state.objectMode;\n  var ret;\n\n  // nothing in the list, definitely empty.\n  if (list.length === 0)\n    return null;\n\n  if (length === 0)\n    ret = null;\n  else if (objectMode)\n    ret = list.shift();\n  else if (!n || n >= length) {\n    // read it all, truncate the array.\n    if (stringMode)\n      ret = list.join('');\n    else\n      ret = Buffer.concat(list, length);\n    list.length = 0;\n  } else {\n    // read just some of it.\n    if (n < list[0].length) {\n      // just take a part of the first list item.\n      // slice is the same for buffers and strings.\n      var buf = list[0];\n      ret = buf.slice(0, n);\n      list[0] = buf.slice(n);\n    } else if (n === list[0].length) {\n      // first list is a perfect match\n      ret = list.shift();\n    } else {\n      // complex case.\n      // we have enough to cover it, but it spans past the first buffer.\n      if (stringMode)\n        ret = '';\n      else\n        ret = new Buffer(n);\n\n      var c = 0;\n      for (var i = 0, l = list.length; i < l && c < n; i++) {\n        var buf = list[0];\n        var cpy = Math.min(n - c, buf.length);\n\n        if (stringMode)\n          ret += buf.slice(0, cpy);\n        else\n          buf.copy(ret, c, 0, cpy);\n\n        if (cpy < buf.length)\n          list[0] = buf.slice(cpy);\n        else\n          list.shift();\n\n        c += cpy;\n      }\n    }\n  }\n\n  return ret;\n}\n\nfunction endReadable(stream) {\n  var state = stream._readableState;\n\n  // If we get here before consuming all the bytes, then that is a\n  // bug in node.  Should never happen.\n  if (state.length > 0)\n    throw new Error('endReadable called on non-empty stream');\n\n  if (!state.endEmitted) {\n    state.ended = true;\n    process.nextTick(function() {\n      // Check that we didn't get one last unshift.\n      if (!state.endEmitted && state.length === 0) {\n        state.endEmitted = true;\n        stream.readable = false;\n        stream.emit('end');\n      }\n    });\n  }\n}\n\nfunction forEach (xs, f) {\n  for (var i = 0, l = xs.length; i < l; i++) {\n    f(xs[i], i);\n  }\n}\n\nfunction indexOf (xs, x) {\n  for (var i = 0, l = xs.length; i < l; i++) {\n    if (xs[i] === x) return i;\n  }\n  return -1;\n}\n\n}).call(this,require('_process'))\n},{\"./_stream_duplex\":53,\"_process\":51,\"buffer\":43,\"core-util-is\":58,\"events\":47,\"inherits\":48,\"isarray\":49,\"stream\":63,\"string_decoder/\":64,\"util\":42}],56:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n// a transform stream is a readable/writable stream where you do\n// something with the data.  Sometimes it's called a \"filter\",\n// but that's not a great name for it, since that implies a thing where\n// some bits pass through, and others are simply ignored.  (That would\n// be a valid example of a transform, of course.)\n//\n// While the output is causally related to the input, it's not a\n// necessarily symmetric or synchronous transformation.  For example,\n// a zlib stream might take multiple plain-text writes(), and then\n// emit a single compressed chunk some time in the future.\n//\n// Here's how this works:\n//\n// The Transform stream has all the aspects of the readable and writable\n// stream classes.  When you write(chunk), that calls _write(chunk,cb)\n// internally, and returns false if there's a lot of pending writes\n// buffered up.  When you call read(), that calls _read(n) until\n// there's enough pending readable data buffered up.\n//\n// In a transform stream, the written data is placed in a buffer.  When\n// _read(n) is called, it transforms the queued up data, calling the\n// buffered _write cb's as it consumes chunks.  If consuming a single\n// written chunk would result in multiple output chunks, then the first\n// outputted bit calls the readcb, and subsequent chunks just go into\n// the read buffer, and will cause it to emit 'readable' if necessary.\n//\n// This way, back-pressure is actually determined by the reading side,\n// since _read has to be called to start processing a new chunk.  However,\n// a pathological inflate type of transform can cause excessive buffering\n// here.  For example, imagine a stream where every byte of input is\n// interpreted as an integer from 0-255, and then results in that many\n// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in\n// 1kb of data being output.  In this case, you could write a very small\n// amount of input, and end up with a very large amount of output.  In\n// such a pathological inflating mechanism, there'd be no way to tell\n// the system to stop doing the transform.  A single 4MB write could\n// cause the system to run out of memory.\n//\n// However, even in such a pathological case, only a single written chunk\n// would be consumed, and then the rest would wait (un-transformed) until\n// the results of the previous transformed chunk were consumed.\n\nmodule.exports = Transform;\n\nvar Duplex = require('./_stream_duplex');\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nutil.inherits(Transform, Duplex);\n\n\nfunction TransformState(options, stream) {\n  this.afterTransform = function(er, data) {\n    return afterTransform(stream, er, data);\n  };\n\n  this.needTransform = false;\n  this.transforming = false;\n  this.writecb = null;\n  this.writechunk = null;\n}\n\nfunction afterTransform(stream, er, data) {\n  var ts = stream._transformState;\n  ts.transforming = false;\n\n  var cb = ts.writecb;\n\n  if (!cb)\n    return stream.emit('error', new Error('no writecb in Transform class'));\n\n  ts.writechunk = null;\n  ts.writecb = null;\n\n  if (!util.isNullOrUndefined(data))\n    stream.push(data);\n\n  if (cb)\n    cb(er);\n\n  var rs = stream._readableState;\n  rs.reading = false;\n  if (rs.needReadable || rs.length < rs.highWaterMark) {\n    stream._read(rs.highWaterMark);\n  }\n}\n\n\nfunction Transform(options) {\n  if (!(this instanceof Transform))\n    return new Transform(options);\n\n  Duplex.call(this, options);\n\n  this._transformState = new TransformState(options, this);\n\n  // when the writable side finishes, then flush out anything remaining.\n  var stream = this;\n\n  // start out asking for a readable event once data is transformed.\n  this._readableState.needReadable = true;\n\n  // we have implemented the _read method, and done the other things\n  // that Readable wants before the first _read call, so unset the\n  // sync guard flag.\n  this._readableState.sync = false;\n\n  this.once('prefinish', function() {\n    if (util.isFunction(this._flush))\n      this._flush(function(er) {\n        done(stream, er);\n      });\n    else\n      done(stream);\n  });\n}\n\nTransform.prototype.push = function(chunk, encoding) {\n  this._transformState.needTransform = false;\n  return Duplex.prototype.push.call(this, chunk, encoding);\n};\n\n// This is the part where you do stuff!\n// override this function in implementation classes.\n// 'chunk' is an input chunk.\n//\n// Call `push(newChunk)` to pass along transformed output\n// to the readable side.  You may call 'push' zero or more times.\n//\n// Call `cb(err)` when you are done with this chunk.  If you pass\n// an error, then that'll put the hurt on the whole operation.  If you\n// never call cb(), then you'll never get another chunk.\nTransform.prototype._transform = function(chunk, encoding, cb) {\n  throw new Error('not implemented');\n};\n\nTransform.prototype._write = function(chunk, encoding, cb) {\n  var ts = this._transformState;\n  ts.writecb = cb;\n  ts.writechunk = chunk;\n  ts.writeencoding = encoding;\n  if (!ts.transforming) {\n    var rs = this._readableState;\n    if (ts.needTransform ||\n        rs.needReadable ||\n        rs.length < rs.highWaterMark)\n      this._read(rs.highWaterMark);\n  }\n};\n\n// Doesn't matter what the args are here.\n// _transform does all the work.\n// That we got here means that the readable side wants more data.\nTransform.prototype._read = function(n) {\n  var ts = this._transformState;\n\n  if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {\n    ts.transforming = true;\n    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);\n  } else {\n    // mark that we need a transform, so that any data that comes in\n    // will get processed, now that we've asked for it.\n    ts.needTransform = true;\n  }\n};\n\n\nfunction done(stream, er) {\n  if (er)\n    return stream.emit('error', er);\n\n  // if there's nothing in the write buffer, then that means\n  // that nothing more will ever be provided\n  var ws = stream._writableState;\n  var ts = stream._transformState;\n\n  if (ws.length)\n    throw new Error('calling transform done when ws.length != 0');\n\n  if (ts.transforming)\n    throw new Error('calling transform done when still transforming');\n\n  return stream.push(null);\n}\n\n},{\"./_stream_duplex\":53,\"core-util-is\":58,\"inherits\":48}],57:[function(require,module,exports){\n(function (process){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// A bit simpler than readable streams.\n// Implement an async ._write(chunk, cb), and it'll handle all\n// the drain event emission and buffering.\n\nmodule.exports = Writable;\n\n/*<replacement>*/\nvar Buffer = require('buffer').Buffer;\n/*</replacement>*/\n\nWritable.WritableState = WritableState;\n\n\n/*<replacement>*/\nvar util = require('core-util-is');\nutil.inherits = require('inherits');\n/*</replacement>*/\n\nvar Stream = require('stream');\n\nutil.inherits(Writable, Stream);\n\nfunction WriteReq(chunk, encoding, cb) {\n  this.chunk = chunk;\n  this.encoding = encoding;\n  this.callback = cb;\n}\n\nfunction WritableState(options, stream) {\n  var Duplex = require('./_stream_duplex');\n\n  options = options || {};\n\n  // the point at which write() starts returning false\n  // Note: 0 is a valid value, means that we always return false if\n  // the entire buffer is not flushed immediately on write()\n  var hwm = options.highWaterMark;\n  var defaultHwm = options.objectMode ? 16 : 16 * 1024;\n  this.highWaterMark = (hwm || hwm === 0) ? hwm : defaultHwm;\n\n  // object stream flag to indicate whether or not this stream\n  // contains buffers or objects.\n  this.objectMode = !!options.objectMode;\n\n  if (stream instanceof Duplex)\n    this.objectMode = this.objectMode || !!options.writableObjectMode;\n\n  // cast to ints.\n  this.highWaterMark = ~~this.highWaterMark;\n\n  this.needDrain = false;\n  // at the start of calling end()\n  this.ending = false;\n  // when end() has been called, and returned\n  this.ended = false;\n  // when 'finish' is emitted\n  this.finished = false;\n\n  // should we decode strings into buffers before passing to _write?\n  // this is here so that some node-core streams can optimize string\n  // handling at a lower level.\n  var noDecode = options.decodeStrings === false;\n  this.decodeStrings = !noDecode;\n\n  // Crypto is kind of old and crusty.  Historically, its default string\n  // encoding is 'binary' so we have to make this configurable.\n  // Everything else in the universe uses 'utf8', though.\n  this.defaultEncoding = options.defaultEncoding || 'utf8';\n\n  // not an actual buffer we keep track of, but a measurement\n  // of how much we're waiting to get pushed to some underlying\n  // socket or file.\n  this.length = 0;\n\n  // a flag to see when we're in the middle of a write.\n  this.writing = false;\n\n  // when true all writes will be buffered until .uncork() call\n  this.corked = 0;\n\n  // a flag to be able to tell if the onwrite cb is called immediately,\n  // or on a later tick.  We set this to true at first, because any\n  // actions that shouldn't happen until \"later\" should generally also\n  // not happen before the first write call.\n  this.sync = true;\n\n  // a flag to know if we're processing previously buffered items, which\n  // may call the _write() callback in the same tick, so that we don't\n  // end up in an overlapped onwrite situation.\n  this.bufferProcessing = false;\n\n  // the callback that's passed to _write(chunk,cb)\n  this.onwrite = function(er) {\n    onwrite(stream, er);\n  };\n\n  // the callback that the user supplies to write(chunk,encoding,cb)\n  this.writecb = null;\n\n  // the amount that is being written when _write is called.\n  this.writelen = 0;\n\n  this.buffer = [];\n\n  // number of pending user-supplied write callbacks\n  // this must be 0 before 'finish' can be emitted\n  this.pendingcb = 0;\n\n  // emit prefinish if the only thing we're waiting for is _write cbs\n  // This is relevant for synchronous Transform streams\n  this.prefinished = false;\n\n  // True if the error was already emitted and should not be thrown again\n  this.errorEmitted = false;\n}\n\nfunction Writable(options) {\n  var Duplex = require('./_stream_duplex');\n\n  // Writable ctor is applied to Duplexes, though they're not\n  // instanceof Writable, they're instanceof Readable.\n  if (!(this instanceof Writable) && !(this instanceof Duplex))\n    return new Writable(options);\n\n  this._writableState = new WritableState(options, this);\n\n  // legacy.\n  this.writable = true;\n\n  Stream.call(this);\n}\n\n// Otherwise people can pipe Writable streams, which is just wrong.\nWritable.prototype.pipe = function() {\n  this.emit('error', new Error('Cannot pipe. Not readable.'));\n};\n\n\nfunction writeAfterEnd(stream, state, cb) {\n  var er = new Error('write after end');\n  // TODO: defer error events consistently everywhere, not just the cb\n  stream.emit('error', er);\n  process.nextTick(function() {\n    cb(er);\n  });\n}\n\n// If we get something that is not a buffer, string, null, or undefined,\n// and we're not in objectMode, then that's an error.\n// Otherwise stream chunks are all considered to be of length=1, and the\n// watermarks determine how many objects to keep in the buffer, rather than\n// how many bytes or characters.\nfunction validChunk(stream, state, chunk, cb) {\n  var valid = true;\n  if (!util.isBuffer(chunk) &&\n      !util.isString(chunk) &&\n      !util.isNullOrUndefined(chunk) &&\n      !state.objectMode) {\n    var er = new TypeError('Invalid non-string/buffer chunk');\n    stream.emit('error', er);\n    process.nextTick(function() {\n      cb(er);\n    });\n    valid = false;\n  }\n  return valid;\n}\n\nWritable.prototype.write = function(chunk, encoding, cb) {\n  var state = this._writableState;\n  var ret = false;\n\n  if (util.isFunction(encoding)) {\n    cb = encoding;\n    encoding = null;\n  }\n\n  if (util.isBuffer(chunk))\n    encoding = 'buffer';\n  else if (!encoding)\n    encoding = state.defaultEncoding;\n\n  if (!util.isFunction(cb))\n    cb = function() {};\n\n  if (state.ended)\n    writeAfterEnd(this, state, cb);\n  else if (validChunk(this, state, chunk, cb)) {\n    state.pendingcb++;\n    ret = writeOrBuffer(this, state, chunk, encoding, cb);\n  }\n\n  return ret;\n};\n\nWritable.prototype.cork = function() {\n  var state = this._writableState;\n\n  state.corked++;\n};\n\nWritable.prototype.uncork = function() {\n  var state = this._writableState;\n\n  if (state.corked) {\n    state.corked--;\n\n    if (!state.writing &&\n        !state.corked &&\n        !state.finished &&\n        !state.bufferProcessing &&\n        state.buffer.length)\n      clearBuffer(this, state);\n  }\n};\n\nfunction decodeChunk(state, chunk, encoding) {\n  if (!state.objectMode &&\n      state.decodeStrings !== false &&\n      util.isString(chunk)) {\n    chunk = new Buffer(chunk, encoding);\n  }\n  return chunk;\n}\n\n// if we're already writing something, then just put this\n// in the queue, and wait our turn.  Otherwise, call _write\n// If we return false, then we need a drain event, so set that flag.\nfunction writeOrBuffer(stream, state, chunk, encoding, cb) {\n  chunk = decodeChunk(state, chunk, encoding);\n  if (util.isBuffer(chunk))\n    encoding = 'buffer';\n  var len = state.objectMode ? 1 : chunk.length;\n\n  state.length += len;\n\n  var ret = state.length < state.highWaterMark;\n  // we must ensure that previous needDrain will not be reset to false.\n  if (!ret)\n    state.needDrain = true;\n\n  if (state.writing || state.corked)\n    state.buffer.push(new WriteReq(chunk, encoding, cb));\n  else\n    doWrite(stream, state, false, len, chunk, encoding, cb);\n\n  return ret;\n}\n\nfunction doWrite(stream, state, writev, len, chunk, encoding, cb) {\n  state.writelen = len;\n  state.writecb = cb;\n  state.writing = true;\n  state.sync = true;\n  if (writev)\n    stream._writev(chunk, state.onwrite);\n  else\n    stream._write(chunk, encoding, state.onwrite);\n  state.sync = false;\n}\n\nfunction onwriteError(stream, state, sync, er, cb) {\n  if (sync)\n    process.nextTick(function() {\n      state.pendingcb--;\n      cb(er);\n    });\n  else {\n    state.pendingcb--;\n    cb(er);\n  }\n\n  stream._writableState.errorEmitted = true;\n  stream.emit('error', er);\n}\n\nfunction onwriteStateUpdate(state) {\n  state.writing = false;\n  state.writecb = null;\n  state.length -= state.writelen;\n  state.writelen = 0;\n}\n\nfunction onwrite(stream, er) {\n  var state = stream._writableState;\n  var sync = state.sync;\n  var cb = state.writecb;\n\n  onwriteStateUpdate(state);\n\n  if (er)\n    onwriteError(stream, state, sync, er, cb);\n  else {\n    // Check if we're actually ready to finish, but don't emit yet\n    var finished = needFinish(stream, state);\n\n    if (!finished &&\n        !state.corked &&\n        !state.bufferProcessing &&\n        state.buffer.length) {\n      clearBuffer(stream, state);\n    }\n\n    if (sync) {\n      process.nextTick(function() {\n        afterWrite(stream, state, finished, cb);\n      });\n    } else {\n      afterWrite(stream, state, finished, cb);\n    }\n  }\n}\n\nfunction afterWrite(stream, state, finished, cb) {\n  if (!finished)\n    onwriteDrain(stream, state);\n  state.pendingcb--;\n  cb();\n  finishMaybe(stream, state);\n}\n\n// Must force callback to be called on nextTick, so that we don't\n// emit 'drain' before the write() consumer gets the 'false' return\n// value, and has a chance to attach a 'drain' listener.\nfunction onwriteDrain(stream, state) {\n  if (state.length === 0 && state.needDrain) {\n    state.needDrain = false;\n    stream.emit('drain');\n  }\n}\n\n\n// if there's something in the buffer waiting, then process it\nfunction clearBuffer(stream, state) {\n  state.bufferProcessing = true;\n\n  if (stream._writev && state.buffer.length > 1) {\n    // Fast case, write everything using _writev()\n    var cbs = [];\n    for (var c = 0; c < state.buffer.length; c++)\n      cbs.push(state.buffer[c].callback);\n\n    // count the one we are adding, as well.\n    // TODO(isaacs) clean this up\n    state.pendingcb++;\n    doWrite(stream, state, true, state.length, state.buffer, '', function(err) {\n      for (var i = 0; i < cbs.length; i++) {\n        state.pendingcb--;\n        cbs[i](err);\n      }\n    });\n\n    // Clear buffer\n    state.buffer = [];\n  } else {\n    // Slow case, write chunks one-by-one\n    for (var c = 0; c < state.buffer.length; c++) {\n      var entry = state.buffer[c];\n      var chunk = entry.chunk;\n      var encoding = entry.encoding;\n      var cb = entry.callback;\n      var len = state.objectMode ? 1 : chunk.length;\n\n      doWrite(stream, state, false, len, chunk, encoding, cb);\n\n      // if we didn't call the onwrite immediately, then\n      // it means that we need to wait until it does.\n      // also, that means that the chunk and cb are currently\n      // being processed, so move the buffer counter past them.\n      if (state.writing) {\n        c++;\n        break;\n      }\n    }\n\n    if (c < state.buffer.length)\n      state.buffer = state.buffer.slice(c);\n    else\n      state.buffer.length = 0;\n  }\n\n  state.bufferProcessing = false;\n}\n\nWritable.prototype._write = function(chunk, encoding, cb) {\n  cb(new Error('not implemented'));\n\n};\n\nWritable.prototype._writev = null;\n\nWritable.prototype.end = function(chunk, encoding, cb) {\n  var state = this._writableState;\n\n  if (util.isFunction(chunk)) {\n    cb = chunk;\n    chunk = null;\n    encoding = null;\n  } else if (util.isFunction(encoding)) {\n    cb = encoding;\n    encoding = null;\n  }\n\n  if (!util.isNullOrUndefined(chunk))\n    this.write(chunk, encoding);\n\n  // .end() fully uncorks\n  if (state.corked) {\n    state.corked = 1;\n    this.uncork();\n  }\n\n  // ignore unnecessary end() calls.\n  if (!state.ending && !state.finished)\n    endWritable(this, state, cb);\n};\n\n\nfunction needFinish(stream, state) {\n  return (state.ending &&\n          state.length === 0 &&\n          !state.finished &&\n          !state.writing);\n}\n\nfunction prefinish(stream, state) {\n  if (!state.prefinished) {\n    state.prefinished = true;\n    stream.emit('prefinish');\n  }\n}\n\nfunction finishMaybe(stream, state) {\n  var need = needFinish(stream, state);\n  if (need) {\n    if (state.pendingcb === 0) {\n      prefinish(stream, state);\n      state.finished = true;\n      stream.emit('finish');\n    } else\n      prefinish(stream, state);\n  }\n  return need;\n}\n\nfunction endWritable(stream, state, cb) {\n  state.ending = true;\n  finishMaybe(stream, state);\n  if (cb) {\n    if (state.finished)\n      process.nextTick(cb);\n    else\n      stream.once('finish', cb);\n  }\n  state.ended = true;\n}\n\n}).call(this,require('_process'))\n},{\"./_stream_duplex\":53,\"_process\":51,\"buffer\":43,\"core-util-is\":58,\"inherits\":48,\"stream\":63}],58:[function(require,module,exports){\n(function (Buffer){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n// NOTE: These type checking functions intentionally don't use `instanceof`\n// because it is fragile and can be easily faked with `Object.create()`.\nfunction isArray(ar) {\n  return Array.isArray(ar);\n}\nexports.isArray = isArray;\n\nfunction isBoolean(arg) {\n  return typeof arg === 'boolean';\n}\nexports.isBoolean = isBoolean;\n\nfunction isNull(arg) {\n  return arg === null;\n}\nexports.isNull = isNull;\n\nfunction isNullOrUndefined(arg) {\n  return arg == null;\n}\nexports.isNullOrUndefined = isNullOrUndefined;\n\nfunction isNumber(arg) {\n  return typeof arg === 'number';\n}\nexports.isNumber = isNumber;\n\nfunction isString(arg) {\n  return typeof arg === 'string';\n}\nexports.isString = isString;\n\nfunction isSymbol(arg) {\n  return typeof arg === 'symbol';\n}\nexports.isSymbol = isSymbol;\n\nfunction isUndefined(arg) {\n  return arg === void 0;\n}\nexports.isUndefined = isUndefined;\n\nfunction isRegExp(re) {\n  return isObject(re) && objectToString(re) === '[object RegExp]';\n}\nexports.isRegExp = isRegExp;\n\nfunction isObject(arg) {\n  return typeof arg === 'object' && arg !== null;\n}\nexports.isObject = isObject;\n\nfunction isDate(d) {\n  return isObject(d) && objectToString(d) === '[object Date]';\n}\nexports.isDate = isDate;\n\nfunction isError(e) {\n  return isObject(e) &&\n      (objectToString(e) === '[object Error]' || e instanceof Error);\n}\nexports.isError = isError;\n\nfunction isFunction(arg) {\n  return typeof arg === 'function';\n}\nexports.isFunction = isFunction;\n\nfunction isPrimitive(arg) {\n  return arg === null ||\n         typeof arg === 'boolean' ||\n         typeof arg === 'number' ||\n         typeof arg === 'string' ||\n         typeof arg === 'symbol' ||  // ES6 symbol\n         typeof arg === 'undefined';\n}\nexports.isPrimitive = isPrimitive;\n\nfunction isBuffer(arg) {\n  return Buffer.isBuffer(arg);\n}\nexports.isBuffer = isBuffer;\n\nfunction objectToString(o) {\n  return Object.prototype.toString.call(o);\n}\n}).call(this,require(\"buffer\").Buffer)\n},{\"buffer\":43}],59:[function(require,module,exports){\nmodule.exports = require(\"./lib/_stream_passthrough.js\")\n\n},{\"./lib/_stream_passthrough.js\":54}],60:[function(require,module,exports){\nexports = module.exports = require('./lib/_stream_readable.js');\nexports.Stream = require('stream');\nexports.Readable = exports;\nexports.Writable = require('./lib/_stream_writable.js');\nexports.Duplex = require('./lib/_stream_duplex.js');\nexports.Transform = require('./lib/_stream_transform.js');\nexports.PassThrough = require('./lib/_stream_passthrough.js');\n\n},{\"./lib/_stream_duplex.js\":53,\"./lib/_stream_passthrough.js\":54,\"./lib/_stream_readable.js\":55,\"./lib/_stream_transform.js\":56,\"./lib/_stream_writable.js\":57,\"stream\":63}],61:[function(require,module,exports){\nmodule.exports = require(\"./lib/_stream_transform.js\")\n\n},{\"./lib/_stream_transform.js\":56}],62:[function(require,module,exports){\nmodule.exports = require(\"./lib/_stream_writable.js\")\n\n},{\"./lib/_stream_writable.js\":57}],63:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nmodule.exports = Stream;\n\nvar EE = require('events').EventEmitter;\nvar inherits = require('inherits');\n\ninherits(Stream, EE);\nStream.Readable = require('readable-stream/readable.js');\nStream.Writable = require('readable-stream/writable.js');\nStream.Duplex = require('readable-stream/duplex.js');\nStream.Transform = require('readable-stream/transform.js');\nStream.PassThrough = require('readable-stream/passthrough.js');\n\n// Backwards-compat with node 0.4.x\nStream.Stream = Stream;\n\n\n\n// old-style streams.  Note that the pipe method (the only relevant\n// part of this class) is overridden in the Readable class.\n\nfunction Stream() {\n  EE.call(this);\n}\n\nStream.prototype.pipe = function(dest, options) {\n  var source = this;\n\n  function ondata(chunk) {\n    if (dest.writable) {\n      if (false === dest.write(chunk) && source.pause) {\n        source.pause();\n      }\n    }\n  }\n\n  source.on('data', ondata);\n\n  function ondrain() {\n    if (source.readable && source.resume) {\n      source.resume();\n    }\n  }\n\n  dest.on('drain', ondrain);\n\n  // If the 'end' option is not supplied, dest.end() will be called when\n  // source gets the 'end' or 'close' events.  Only dest.end() once.\n  if (!dest._isStdio && (!options || options.end !== false)) {\n    source.on('end', onend);\n    source.on('close', onclose);\n  }\n\n  var didOnEnd = false;\n  function onend() {\n    if (didOnEnd) return;\n    didOnEnd = true;\n\n    dest.end();\n  }\n\n\n  function onclose() {\n    if (didOnEnd) return;\n    didOnEnd = true;\n\n    if (typeof dest.destroy === 'function') dest.destroy();\n  }\n\n  // don't leave dangling pipes when there are errors.\n  function onerror(er) {\n    cleanup();\n    if (EE.listenerCount(this, 'error') === 0) {\n      throw er; // Unhandled stream error in pipe.\n    }\n  }\n\n  source.on('error', onerror);\n  dest.on('error', onerror);\n\n  // remove all the event listeners that were added.\n  function cleanup() {\n    source.removeListener('data', ondata);\n    dest.removeListener('drain', ondrain);\n\n    source.removeListener('end', onend);\n    source.removeListener('close', onclose);\n\n    source.removeListener('error', onerror);\n    dest.removeListener('error', onerror);\n\n    source.removeListener('end', cleanup);\n    source.removeListener('close', cleanup);\n\n    dest.removeListener('close', cleanup);\n  }\n\n  source.on('end', cleanup);\n  source.on('close', cleanup);\n\n  dest.on('close', cleanup);\n\n  dest.emit('pipe', source);\n\n  // Allow for unix-like usage: A.pipe(B).pipe(C)\n  return dest;\n};\n\n},{\"events\":47,\"inherits\":48,\"readable-stream/duplex.js\":52,\"readable-stream/passthrough.js\":59,\"readable-stream/readable.js\":60,\"readable-stream/transform.js\":61,\"readable-stream/writable.js\":62}],64:[function(require,module,exports){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nvar Buffer = require('buffer').Buffer;\n\nvar isBufferEncoding = Buffer.isEncoding\n  || function(encoding) {\n       switch (encoding && encoding.toLowerCase()) {\n         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;\n         default: return false;\n       }\n     }\n\n\nfunction assertEncoding(encoding) {\n  if (encoding && !isBufferEncoding(encoding)) {\n    throw new Error('Unknown encoding: ' + encoding);\n  }\n}\n\n// StringDecoder provides an interface for efficiently splitting a series of\n// buffers into a series of JS strings without breaking apart multi-byte\n// characters. CESU-8 is handled as part of the UTF-8 encoding.\n//\n// @TODO Handling all encodings inside a single object makes it very difficult\n// to reason about this code, so it should be split up in the future.\n// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code\n// points as used by CESU-8.\nvar StringDecoder = exports.StringDecoder = function(encoding) {\n  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');\n  assertEncoding(encoding);\n  switch (this.encoding) {\n    case 'utf8':\n      // CESU-8 represents each of Surrogate Pair by 3-bytes\n      this.surrogateSize = 3;\n      break;\n    case 'ucs2':\n    case 'utf16le':\n      // UTF-16 represents each of Surrogate Pair by 2-bytes\n      this.surrogateSize = 2;\n      this.detectIncompleteChar = utf16DetectIncompleteChar;\n      break;\n    case 'base64':\n      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.\n      this.surrogateSize = 3;\n      this.detectIncompleteChar = base64DetectIncompleteChar;\n      break;\n    default:\n      this.write = passThroughWrite;\n      return;\n  }\n\n  // Enough space to store all bytes of a single character. UTF-8 needs 4\n  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).\n  this.charBuffer = new Buffer(6);\n  // Number of bytes received for the current incomplete multi-byte character.\n  this.charReceived = 0;\n  // Number of bytes expected for the current incomplete multi-byte character.\n  this.charLength = 0;\n};\n\n\n// write decodes the given buffer and returns it as JS string that is\n// guaranteed to not contain any partial multi-byte characters. Any partial\n// character found at the end of the buffer is buffered up, and will be\n// returned when calling write again with the remaining bytes.\n//\n// Note: Converting a Buffer containing an orphan surrogate to a String\n// currently works, but converting a String to a Buffer (via `new Buffer`, or\n// Buffer#write) will replace incomplete surrogates with the unicode\n// replacement character. See https://codereview.chromium.org/121173009/ .\nStringDecoder.prototype.write = function(buffer) {\n  var charStr = '';\n  // if our last write ended with an incomplete multibyte character\n  while (this.charLength) {\n    // determine how many remaining bytes this buffer has to offer for this char\n    var available = (buffer.length >= this.charLength - this.charReceived) ?\n        this.charLength - this.charReceived :\n        buffer.length;\n\n    // add the new bytes to the char buffer\n    buffer.copy(this.charBuffer, this.charReceived, 0, available);\n    this.charReceived += available;\n\n    if (this.charReceived < this.charLength) {\n      // still not enough chars in this buffer? wait for more ...\n      return '';\n    }\n\n    // remove bytes belonging to the current character from the buffer\n    buffer = buffer.slice(available, buffer.length);\n\n    // get the character that was split\n    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);\n\n    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character\n    var charCode = charStr.charCodeAt(charStr.length - 1);\n    if (charCode >= 0xD800 && charCode <= 0xDBFF) {\n      this.charLength += this.surrogateSize;\n      charStr = '';\n      continue;\n    }\n    this.charReceived = this.charLength = 0;\n\n    // if there are no more bytes in this buffer, just emit our char\n    if (buffer.length === 0) {\n      return charStr;\n    }\n    break;\n  }\n\n  // determine and set charLength / charReceived\n  this.detectIncompleteChar(buffer);\n\n  var end = buffer.length;\n  if (this.charLength) {\n    // buffer the incomplete character bytes we got\n    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);\n    end -= this.charReceived;\n  }\n\n  charStr += buffer.toString(this.encoding, 0, end);\n\n  var end = charStr.length - 1;\n  var charCode = charStr.charCodeAt(end);\n  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character\n  if (charCode >= 0xD800 && charCode <= 0xDBFF) {\n    var size = this.surrogateSize;\n    this.charLength += size;\n    this.charReceived += size;\n    this.charBuffer.copy(this.charBuffer, size, 0, size);\n    buffer.copy(this.charBuffer, 0, 0, size);\n    return charStr.substring(0, end);\n  }\n\n  // or just emit the charStr\n  return charStr;\n};\n\n// detectIncompleteChar determines if there is an incomplete UTF-8 character at\n// the end of the given buffer. If so, it sets this.charLength to the byte\n// length that character, and sets this.charReceived to the number of bytes\n// that are available for this character.\nStringDecoder.prototype.detectIncompleteChar = function(buffer) {\n  // determine how many bytes we have to check at the end of this buffer\n  var i = (buffer.length >= 3) ? 3 : buffer.length;\n\n  // Figure out if one of the last i bytes of our buffer announces an\n  // incomplete char.\n  for (; i > 0; i--) {\n    var c = buffer[buffer.length - i];\n\n    // See http://en.wikipedia.org/wiki/UTF-8#Description\n\n    // 110XXXXX\n    if (i == 1 && c >> 5 == 0x06) {\n      this.charLength = 2;\n      break;\n    }\n\n    // 1110XXXX\n    if (i <= 2 && c >> 4 == 0x0E) {\n      this.charLength = 3;\n      break;\n    }\n\n    // 11110XXX\n    if (i <= 3 && c >> 3 == 0x1E) {\n      this.charLength = 4;\n      break;\n    }\n  }\n  this.charReceived = i;\n};\n\nStringDecoder.prototype.end = function(buffer) {\n  var res = '';\n  if (buffer && buffer.length)\n    res = this.write(buffer);\n\n  if (this.charReceived) {\n    var cr = this.charReceived;\n    var buf = this.charBuffer;\n    var enc = this.encoding;\n    res += buf.slice(0, cr).toString(enc);\n  }\n\n  return res;\n};\n\nfunction passThroughWrite(buffer) {\n  return buffer.toString(this.encoding);\n}\n\nfunction utf16DetectIncompleteChar(buffer) {\n  this.charReceived = buffer.length % 2;\n  this.charLength = this.charReceived ? 2 : 0;\n}\n\nfunction base64DetectIncompleteChar(buffer) {\n  this.charReceived = buffer.length % 3;\n  this.charLength = this.charReceived ? 3 : 0;\n}\n\n},{\"buffer\":43}],65:[function(require,module,exports){\nmodule.exports = function isBuffer(arg) {\n  return arg && typeof arg === 'object'\n    && typeof arg.copy === 'function'\n    && typeof arg.fill === 'function'\n    && typeof arg.readUInt8 === 'function';\n}\n},{}],66:[function(require,module,exports){\n(function (process,global){\n// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\nvar formatRegExp = /%[sdj%]/g;\nexports.format = function(f) {\n  if (!isString(f)) {\n    var objects = [];\n    for (var i = 0; i < arguments.length; i++) {\n      objects.push(inspect(arguments[i]));\n    }\n    return objects.join(' ');\n  }\n\n  var i = 1;\n  var args = arguments;\n  var len = args.length;\n  var str = String(f).replace(formatRegExp, function(x) {\n    if (x === '%%') return '%';\n    if (i >= len) return x;\n    switch (x) {\n      case '%s': return String(args[i++]);\n      case '%d': return Number(args[i++]);\n      case '%j':\n        try {\n          return JSON.stringify(args[i++]);\n        } catch (_) {\n          return '[Circular]';\n        }\n      default:\n        return x;\n    }\n  });\n  for (var x = args[i]; i < len; x = args[++i]) {\n    if (isNull(x) || !isObject(x)) {\n      str += ' ' + x;\n    } else {\n      str += ' ' + inspect(x);\n    }\n  }\n  return str;\n};\n\n\n// Mark that a method should not be used.\n// Returns a modified function which warns once by default.\n// If --no-deprecation is set, then it is a no-op.\nexports.deprecate = function(fn, msg) {\n  // Allow for deprecating things in the process of starting up.\n  if (isUndefined(global.process)) {\n    return function() {\n      return exports.deprecate(fn, msg).apply(this, arguments);\n    };\n  }\n\n  if (process.noDeprecation === true) {\n    return fn;\n  }\n\n  var warned = false;\n  function deprecated() {\n    if (!warned) {\n      if (process.throwDeprecation) {\n        throw new Error(msg);\n      } else if (process.traceDeprecation) {\n        console.trace(msg);\n      } else {\n        console.error(msg);\n      }\n      warned = true;\n    }\n    return fn.apply(this, arguments);\n  }\n\n  return deprecated;\n};\n\n\nvar debugs = {};\nvar debugEnviron;\nexports.debuglog = function(set) {\n  if (isUndefined(debugEnviron))\n    debugEnviron = process.env.NODE_DEBUG || '';\n  set = set.toUpperCase();\n  if (!debugs[set]) {\n    if (new RegExp('\\\\b' + set + '\\\\b', 'i').test(debugEnviron)) {\n      var pid = process.pid;\n      debugs[set] = function() {\n        var msg = exports.format.apply(exports, arguments);\n        console.error('%s %d: %s', set, pid, msg);\n      };\n    } else {\n      debugs[set] = function() {};\n    }\n  }\n  return debugs[set];\n};\n\n\n/**\n * Echos the value of a value. Trys to print the value out\n * in the best way possible given the different types.\n *\n * @param {Object} obj The object to print out.\n * @param {Object} opts Optional options object that alters the output.\n */\n/* legacy: obj, showHidden, depth, colors*/\nfunction inspect(obj, opts) {\n  // default options\n  var ctx = {\n    seen: [],\n    stylize: stylizeNoColor\n  };\n  // legacy...\n  if (arguments.length >= 3) ctx.depth = arguments[2];\n  if (arguments.length >= 4) ctx.colors = arguments[3];\n  if (isBoolean(opts)) {\n    // legacy...\n    ctx.showHidden = opts;\n  } else if (opts) {\n    // got an \"options\" object\n    exports._extend(ctx, opts);\n  }\n  // set default options\n  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;\n  if (isUndefined(ctx.depth)) ctx.depth = 2;\n  if (isUndefined(ctx.colors)) ctx.colors = false;\n  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;\n  if (ctx.colors) ctx.stylize = stylizeWithColor;\n  return formatValue(ctx, obj, ctx.depth);\n}\nexports.inspect = inspect;\n\n\n// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics\ninspect.colors = {\n  'bold' : [1, 22],\n  'italic' : [3, 23],\n  'underline' : [4, 24],\n  'inverse' : [7, 27],\n  'white' : [37, 39],\n  'grey' : [90, 39],\n  'black' : [30, 39],\n  'blue' : [34, 39],\n  'cyan' : [36, 39],\n  'green' : [32, 39],\n  'magenta' : [35, 39],\n  'red' : [31, 39],\n  'yellow' : [33, 39]\n};\n\n// Don't use 'blue' not visible on cmd.exe\ninspect.styles = {\n  'special': 'cyan',\n  'number': 'yellow',\n  'boolean': 'yellow',\n  'undefined': 'grey',\n  'null': 'bold',\n  'string': 'green',\n  'date': 'magenta',\n  // \"name\": intentionally not styling\n  'regexp': 'red'\n};\n\n\nfunction stylizeWithColor(str, styleType) {\n  var style = inspect.styles[styleType];\n\n  if (style) {\n    return '\\u001b[' + inspect.colors[style][0] + 'm' + str +\n           '\\u001b[' + inspect.colors[style][1] + 'm';\n  } else {\n    return str;\n  }\n}\n\n\nfunction stylizeNoColor(str, styleType) {\n  return str;\n}\n\n\nfunction arrayToHash(array) {\n  var hash = {};\n\n  array.forEach(function(val, idx) {\n    hash[val] = true;\n  });\n\n  return hash;\n}\n\n\nfunction formatValue(ctx, value, recurseTimes) {\n  // Provide a hook for user-specified inspect functions.\n  // Check that value is an object with an inspect function on it\n  if (ctx.customInspect &&\n      value &&\n      isFunction(value.inspect) &&\n      // Filter out the util module, it's inspect function is special\n      value.inspect !== exports.inspect &&\n      // Also filter out any prototype objects using the circular check.\n      !(value.constructor && value.constructor.prototype === value)) {\n    var ret = value.inspect(recurseTimes, ctx);\n    if (!isString(ret)) {\n      ret = formatValue(ctx, ret, recurseTimes);\n    }\n    return ret;\n  }\n\n  // Primitive types cannot have properties\n  var primitive = formatPrimitive(ctx, value);\n  if (primitive) {\n    return primitive;\n  }\n\n  // Look up the keys of the object.\n  var keys = Object.keys(value);\n  var visibleKeys = arrayToHash(keys);\n\n  if (ctx.showHidden) {\n    keys = Object.getOwnPropertyNames(value);\n  }\n\n  // IE doesn't make error fields non-enumerable\n  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx\n  if (isError(value)\n      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {\n    return formatError(value);\n  }\n\n  // Some type of object without properties can be shortcutted.\n  if (keys.length === 0) {\n    if (isFunction(value)) {\n      var name = value.name ? ': ' + value.name : '';\n      return ctx.stylize('[Function' + name + ']', 'special');\n    }\n    if (isRegExp(value)) {\n      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');\n    }\n    if (isDate(value)) {\n      return ctx.stylize(Date.prototype.toString.call(value), 'date');\n    }\n    if (isError(value)) {\n      return formatError(value);\n    }\n  }\n\n  var base = '', array = false, braces = ['{', '}'];\n\n  // Make Array say that they are Array\n  if (isArray(value)) {\n    array = true;\n    braces = ['[', ']'];\n  }\n\n  // Make functions say that they are functions\n  if (isFunction(value)) {\n    var n = value.name ? ': ' + value.name : '';\n    base = ' [Function' + n + ']';\n  }\n\n  // Make RegExps say that they are RegExps\n  if (isRegExp(value)) {\n    base = ' ' + RegExp.prototype.toString.call(value);\n  }\n\n  // Make dates with properties first say the date\n  if (isDate(value)) {\n    base = ' ' + Date.prototype.toUTCString.call(value);\n  }\n\n  // Make error with message first say the error\n  if (isError(value)) {\n    base = ' ' + formatError(value);\n  }\n\n  if (keys.length === 0 && (!array || value.length == 0)) {\n    return braces[0] + base + braces[1];\n  }\n\n  if (recurseTimes < 0) {\n    if (isRegExp(value)) {\n      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');\n    } else {\n      return ctx.stylize('[Object]', 'special');\n    }\n  }\n\n  ctx.seen.push(value);\n\n  var output;\n  if (array) {\n    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);\n  } else {\n    output = keys.map(function(key) {\n      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);\n    });\n  }\n\n  ctx.seen.pop();\n\n  return reduceToSingleString(output, base, braces);\n}\n\n\nfunction formatPrimitive(ctx, value) {\n  if (isUndefined(value))\n    return ctx.stylize('undefined', 'undefined');\n  if (isString(value)) {\n    var simple = '\\'' + JSON.stringify(value).replace(/^\"|\"$/g, '')\n                                             .replace(/'/g, \"\\\\'\")\n                                             .replace(/\\\\\"/g, '\"') + '\\'';\n    return ctx.stylize(simple, 'string');\n  }\n  if (isNumber(value))\n    return ctx.stylize('' + value, 'number');\n  if (isBoolean(value))\n    return ctx.stylize('' + value, 'boolean');\n  // For some reason typeof null is \"object\", so special case here.\n  if (isNull(value))\n    return ctx.stylize('null', 'null');\n}\n\n\nfunction formatError(value) {\n  return '[' + Error.prototype.toString.call(value) + ']';\n}\n\n\nfunction formatArray(ctx, value, recurseTimes, visibleKeys, keys) {\n  var output = [];\n  for (var i = 0, l = value.length; i < l; ++i) {\n    if (hasOwnProperty(value, String(i))) {\n      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,\n          String(i), true));\n    } else {\n      output.push('');\n    }\n  }\n  keys.forEach(function(key) {\n    if (!key.match(/^\\d+$/)) {\n      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,\n          key, true));\n    }\n  });\n  return output;\n}\n\n\nfunction formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {\n  var name, str, desc;\n  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };\n  if (desc.get) {\n    if (desc.set) {\n      str = ctx.stylize('[Getter/Setter]', 'special');\n    } else {\n      str = ctx.stylize('[Getter]', 'special');\n    }\n  } else {\n    if (desc.set) {\n      str = ctx.stylize('[Setter]', 'special');\n    }\n  }\n  if (!hasOwnProperty(visibleKeys, key)) {\n    name = '[' + key + ']';\n  }\n  if (!str) {\n    if (ctx.seen.indexOf(desc.value) < 0) {\n      if (isNull(recurseTimes)) {\n        str = formatValue(ctx, desc.value, null);\n      } else {\n        str = formatValue(ctx, desc.value, recurseTimes - 1);\n      }\n      if (str.indexOf('\\n') > -1) {\n        if (array) {\n          str = str.split('\\n').map(function(line) {\n            return '  ' + line;\n          }).join('\\n').substr(2);\n        } else {\n          str = '\\n' + str.split('\\n').map(function(line) {\n            return '   ' + line;\n          }).join('\\n');\n        }\n      }\n    } else {\n      str = ctx.stylize('[Circular]', 'special');\n    }\n  }\n  if (isUndefined(name)) {\n    if (array && key.match(/^\\d+$/)) {\n      return str;\n    }\n    name = JSON.stringify('' + key);\n    if (name.match(/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)) {\n      name = name.substr(1, name.length - 2);\n      name = ctx.stylize(name, 'name');\n    } else {\n      name = name.replace(/'/g, \"\\\\'\")\n                 .replace(/\\\\\"/g, '\"')\n                 .replace(/(^\"|\"$)/g, \"'\");\n      name = ctx.stylize(name, 'string');\n    }\n  }\n\n  return name + ': ' + str;\n}\n\n\nfunction reduceToSingleString(output, base, braces) {\n  var numLinesEst = 0;\n  var length = output.reduce(function(prev, cur) {\n    numLinesEst++;\n    if (cur.indexOf('\\n') >= 0) numLinesEst++;\n    return prev + cur.replace(/\\u001b\\[\\d\\d?m/g, '').length + 1;\n  }, 0);\n\n  if (length > 60) {\n    return braces[0] +\n           (base === '' ? '' : base + '\\n ') +\n           ' ' +\n           output.join(',\\n  ') +\n           ' ' +\n           braces[1];\n  }\n\n  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];\n}\n\n\n// NOTE: These type checking functions intentionally don't use `instanceof`\n// because it is fragile and can be easily faked with `Object.create()`.\nfunction isArray(ar) {\n  return Array.isArray(ar);\n}\nexports.isArray = isArray;\n\nfunction isBoolean(arg) {\n  return typeof arg === 'boolean';\n}\nexports.isBoolean = isBoolean;\n\nfunction isNull(arg) {\n  return arg === null;\n}\nexports.isNull = isNull;\n\nfunction isNullOrUndefined(arg) {\n  return arg == null;\n}\nexports.isNullOrUndefined = isNullOrUndefined;\n\nfunction isNumber(arg) {\n  return typeof arg === 'number';\n}\nexports.isNumber = isNumber;\n\nfunction isString(arg) {\n  return typeof arg === 'string';\n}\nexports.isString = isString;\n\nfunction isSymbol(arg) {\n  return typeof arg === 'symbol';\n}\nexports.isSymbol = isSymbol;\n\nfunction isUndefined(arg) {\n  return arg === void 0;\n}\nexports.isUndefined = isUndefined;\n\nfunction isRegExp(re) {\n  return isObject(re) && objectToString(re) === '[object RegExp]';\n}\nexports.isRegExp = isRegExp;\n\nfunction isObject(arg) {\n  return typeof arg === 'object' && arg !== null;\n}\nexports.isObject = isObject;\n\nfunction isDate(d) {\n  return isObject(d) && objectToString(d) === '[object Date]';\n}\nexports.isDate = isDate;\n\nfunction isError(e) {\n  return isObject(e) &&\n      (objectToString(e) === '[object Error]' || e instanceof Error);\n}\nexports.isError = isError;\n\nfunction isFunction(arg) {\n  return typeof arg === 'function';\n}\nexports.isFunction = isFunction;\n\nfunction isPrimitive(arg) {\n  return arg === null ||\n         typeof arg === 'boolean' ||\n         typeof arg === 'number' ||\n         typeof arg === 'string' ||\n         typeof arg === 'symbol' ||  // ES6 symbol\n         typeof arg === 'undefined';\n}\nexports.isPrimitive = isPrimitive;\n\nexports.isBuffer = require('./support/isBuffer');\n\nfunction objectToString(o) {\n  return Object.prototype.toString.call(o);\n}\n\n\nfunction pad(n) {\n  return n < 10 ? '0' + n.toString(10) : n.toString(10);\n}\n\n\nvar months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',\n              'Oct', 'Nov', 'Dec'];\n\n// 26 Feb 16:19:34\nfunction timestamp() {\n  var d = new Date();\n  var time = [pad(d.getHours()),\n              pad(d.getMinutes()),\n              pad(d.getSeconds())].join(':');\n  return [d.getDate(), months[d.getMonth()], time].join(' ');\n}\n\n\n// log is just a thin wrapper to console.log that prepends a timestamp\nexports.log = function() {\n  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));\n};\n\n\n/**\n * Inherit the prototype methods from one constructor into another.\n *\n * The Function.prototype.inherits from lang.js rewritten as a standalone\n * function (not on Function.prototype). NOTE: If this file is to be loaded\n * during bootstrapping this function needs to be rewritten using some native\n * functions as prototype setup using normal JavaScript does not work as\n * expected during bootstrapping (see mirror.js in r114903).\n *\n * @param {function} ctor Constructor function which needs to inherit the\n *     prototype.\n * @param {function} superCtor Constructor function to inherit prototype from.\n */\nexports.inherits = require('inherits');\n\nexports._extend = function(origin, add) {\n  // Don't do anything if add isn't an object\n  if (!add || !isObject(add)) return origin;\n\n  var keys = Object.keys(add);\n  var i = keys.length;\n  while (i--) {\n    origin[keys[i]] = add[keys[i]];\n  }\n  return origin;\n};\n\nfunction hasOwnProperty(obj, prop) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"./support/isBuffer\":65,\"_process\":51,\"inherits\":48}],67:[function(require,module,exports){\n/* See LICENSE file for terms of use */\n\n/*\n * Text diff implementation.\n *\n * This library supports the following APIS:\n * JsDiff.diffChars: Character by character diff\n * JsDiff.diffWords: Word (as defined by \\b regex) diff which ignores whitespace\n * JsDiff.diffLines: Line based diff\n *\n * JsDiff.diffCss: Diff targeted at CSS content\n *\n * These methods are based on the implementation proposed in\n * \"An O(ND) Difference Algorithm and its Variations\" (Myers, 1986).\n * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927\n */\n(function(global, undefined) {\n  var objectPrototypeToString = Object.prototype.toString;\n\n  /*istanbul ignore next*/\n  function map(arr, mapper, that) {\n    if (Array.prototype.map) {\n      return Array.prototype.map.call(arr, mapper, that);\n    }\n\n    var other = new Array(arr.length);\n\n    for (var i = 0, n = arr.length; i < n; i++) {\n      other[i] = mapper.call(that, arr[i], i, arr);\n    }\n    return other;\n  }\n  function clonePath(path) {\n    return { newPos: path.newPos, components: path.components.slice(0) };\n  }\n  function removeEmpty(array) {\n    var ret = [];\n    for (var i = 0; i < array.length; i++) {\n      if (array[i]) {\n        ret.push(array[i]);\n      }\n    }\n    return ret;\n  }\n  function escapeHTML(s) {\n    var n = s;\n    n = n.replace(/&/g, '&amp;');\n    n = n.replace(/</g, '&lt;');\n    n = n.replace(/>/g, '&gt;');\n    n = n.replace(/\"/g, '&quot;');\n\n    return n;\n  }\n\n  // This function handles the presence of circular references by bailing out when encountering an\n  // object that is already on the \"stack\" of items being processed.\n  function canonicalize(obj, stack, replacementStack) {\n    stack = stack || [];\n    replacementStack = replacementStack || [];\n\n    var i;\n\n    for (i = 0; i < stack.length; i += 1) {\n      if (stack[i] === obj) {\n        return replacementStack[i];\n      }\n    }\n\n    var canonicalizedObj;\n\n    if ('[object Array]' === objectPrototypeToString.call(obj)) {\n      stack.push(obj);\n      canonicalizedObj = new Array(obj.length);\n      replacementStack.push(canonicalizedObj);\n      for (i = 0; i < obj.length; i += 1) {\n        canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack);\n      }\n      stack.pop();\n      replacementStack.pop();\n    } else if (typeof obj === 'object' && obj !== null) {\n      stack.push(obj);\n      canonicalizedObj = {};\n      replacementStack.push(canonicalizedObj);\n      var sortedKeys = [],\n          key;\n      for (key in obj) {\n        sortedKeys.push(key);\n      }\n      sortedKeys.sort();\n      for (i = 0; i < sortedKeys.length; i += 1) {\n        key = sortedKeys[i];\n        canonicalizedObj[key] = canonicalize(obj[key], stack, replacementStack);\n      }\n      stack.pop();\n      replacementStack.pop();\n    } else {\n      canonicalizedObj = obj;\n    }\n    return canonicalizedObj;\n  }\n\n  function buildValues(components, newString, oldString, useLongestToken) {\n    var componentPos = 0,\n        componentLen = components.length,\n        newPos = 0,\n        oldPos = 0;\n\n    for (; componentPos < componentLen; componentPos++) {\n      var component = components[componentPos];\n      if (!component.removed) {\n        if (!component.added && useLongestToken) {\n          var value = newString.slice(newPos, newPos + component.count);\n          value = map(value, function(value, i) {\n            var oldValue = oldString[oldPos + i];\n            return oldValue.length > value.length ? oldValue : value;\n          });\n\n          component.value = value.join('');\n        } else {\n          component.value = newString.slice(newPos, newPos + component.count).join('');\n        }\n        newPos += component.count;\n\n        // Common case\n        if (!component.added) {\n          oldPos += component.count;\n        }\n      } else {\n        component.value = oldString.slice(oldPos, oldPos + component.count).join('');\n        oldPos += component.count;\n\n        // Reverse add and remove so removes are output first to match common convention\n        // The diffing algorithm is tied to add then remove output and this is the simplest\n        // route to get the desired output with minimal overhead.\n        if (componentPos && components[componentPos - 1].added) {\n          var tmp = components[componentPos - 1];\n          components[componentPos - 1] = components[componentPos];\n          components[componentPos] = tmp;\n        }\n      }\n    }\n\n    return components;\n  }\n\n  function Diff(ignoreWhitespace) {\n    this.ignoreWhitespace = ignoreWhitespace;\n  }\n  Diff.prototype = {\n    diff: function(oldString, newString, callback) {\n      var self = this;\n\n      function done(value) {\n        if (callback) {\n          setTimeout(function() { callback(undefined, value); }, 0);\n          return true;\n        } else {\n          return value;\n        }\n      }\n\n      // Handle the identity case (this is due to unrolling editLength == 0\n      if (newString === oldString) {\n        return done([{ value: newString }]);\n      }\n      if (!newString) {\n        return done([{ value: oldString, removed: true }]);\n      }\n      if (!oldString) {\n        return done([{ value: newString, added: true }]);\n      }\n\n      newString = this.tokenize(newString);\n      oldString = this.tokenize(oldString);\n\n      var newLen = newString.length, oldLen = oldString.length;\n      var editLength = 1;\n      var maxEditLength = newLen + oldLen;\n      var bestPath = [{ newPos: -1, components: [] }];\n\n      // Seed editLength = 0, i.e. the content starts with the same values\n      var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);\n      if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {\n        // Identity per the equality and tokenizer\n        return done([{value: newString.join('')}]);\n      }\n\n      // Main worker method. checks all permutations of a given edit length for acceptance.\n      function execEditLength() {\n        for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {\n          var basePath;\n          var addPath = bestPath[diagonalPath - 1],\n              removePath = bestPath[diagonalPath + 1],\n              oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;\n          if (addPath) {\n            // No one else is going to attempt to use this value, clear it\n            bestPath[diagonalPath - 1] = undefined;\n          }\n\n          var canAdd = addPath && addPath.newPos + 1 < newLen,\n              canRemove = removePath && 0 <= oldPos && oldPos < oldLen;\n          if (!canAdd && !canRemove) {\n            // If this path is a terminal then prune\n            bestPath[diagonalPath] = undefined;\n            continue;\n          }\n\n          // Select the diagonal that we want to branch from. We select the prior\n          // path whose position in the new string is the farthest from the origin\n          // and does not pass the bounds of the diff graph\n          if (!canAdd || (canRemove && addPath.newPos < removePath.newPos)) {\n            basePath = clonePath(removePath);\n            self.pushComponent(basePath.components, undefined, true);\n          } else {\n            basePath = addPath;   // No need to clone, we've pulled it from the list\n            basePath.newPos++;\n            self.pushComponent(basePath.components, true, undefined);\n          }\n\n          oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);\n\n          // If we have hit the end of both strings, then we are done\n          if (basePath.newPos + 1 >= newLen && oldPos + 1 >= oldLen) {\n            return done(buildValues(basePath.components, newString, oldString, self.useLongestToken));\n          } else {\n            // Otherwise track this path as a potential candidate and continue.\n            bestPath[diagonalPath] = basePath;\n          }\n        }\n\n        editLength++;\n      }\n\n      // Performs the length of edit iteration. Is a bit fugly as this has to support the\n      // sync and async mode which is never fun. Loops over execEditLength until a value\n      // is produced.\n      if (callback) {\n        (function exec() {\n          setTimeout(function() {\n            // This should not happen, but we want to be safe.\n            /*istanbul ignore next */\n            if (editLength > maxEditLength) {\n              return callback();\n            }\n\n            if (!execEditLength()) {\n              exec();\n            }\n          }, 0);\n        }());\n      } else {\n        while (editLength <= maxEditLength) {\n          var ret = execEditLength();\n          if (ret) {\n            return ret;\n          }\n        }\n      }\n    },\n\n    pushComponent: function(components, added, removed) {\n      var last = components[components.length - 1];\n      if (last && last.added === added && last.removed === removed) {\n        // We need to clone here as the component clone operation is just\n        // as shallow array clone\n        components[components.length - 1] = {count: last.count + 1, added: added, removed: removed };\n      } else {\n        components.push({count: 1, added: added, removed: removed });\n      }\n    },\n    extractCommon: function(basePath, newString, oldString, diagonalPath) {\n      var newLen = newString.length,\n          oldLen = oldString.length,\n          newPos = basePath.newPos,\n          oldPos = newPos - diagonalPath,\n\n          commonCount = 0;\n      while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {\n        newPos++;\n        oldPos++;\n        commonCount++;\n      }\n\n      if (commonCount) {\n        basePath.components.push({count: commonCount});\n      }\n\n      basePath.newPos = newPos;\n      return oldPos;\n    },\n\n    equals: function(left, right) {\n      var reWhitespace = /\\S/;\n      return left === right || (this.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right));\n    },\n    tokenize: function(value) {\n      return value.split('');\n    }\n  };\n\n  var CharDiff = new Diff();\n\n  var WordDiff = new Diff(true);\n  var WordWithSpaceDiff = new Diff();\n  WordDiff.tokenize = WordWithSpaceDiff.tokenize = function(value) {\n    return removeEmpty(value.split(/(\\s+|\\b)/));\n  };\n\n  var CssDiff = new Diff(true);\n  CssDiff.tokenize = function(value) {\n    return removeEmpty(value.split(/([{}:;,]|\\s+)/));\n  };\n\n  var LineDiff = new Diff();\n\n  var TrimmedLineDiff = new Diff();\n  TrimmedLineDiff.ignoreTrim = true;\n\n  LineDiff.tokenize = TrimmedLineDiff.tokenize = function(value) {\n    var retLines = [],\n        lines = value.split(/^/m);\n    for (var i = 0; i < lines.length; i++) {\n      var line = lines[i],\n          lastLine = lines[i - 1],\n          lastLineLastChar = lastLine && lastLine[lastLine.length - 1];\n\n      // Merge lines that may contain windows new lines\n      if (line === '\\n' && lastLineLastChar === '\\r') {\n          retLines[retLines.length - 1] = retLines[retLines.length - 1].slice(0, -1) + '\\r\\n';\n      } else {\n        if (this.ignoreTrim) {\n          line = line.trim();\n          // add a newline unless this is the last line.\n          if (i < lines.length - 1) {\n            line += '\\n';\n          }\n        }\n        retLines.push(line);\n      }\n    }\n\n    return retLines;\n  };\n\n  var PatchDiff = new Diff();\n  PatchDiff.tokenize = function(value) {\n    var ret = [],\n        linesAndNewlines = value.split(/(\\n|\\r\\n)/);\n\n    // Ignore the final empty token that occurs if the string ends with a new line\n    if (!linesAndNewlines[linesAndNewlines.length - 1]) {\n      linesAndNewlines.pop();\n    }\n\n    // Merge the content and line separators into single tokens\n    for (var i = 0; i < linesAndNewlines.length; i++) {\n      var line = linesAndNewlines[i];\n\n      if (i % 2) {\n        ret[ret.length - 1] += line;\n      } else {\n        ret.push(line);\n      }\n    }\n    return ret;\n  };\n\n  var SentenceDiff = new Diff();\n  SentenceDiff.tokenize = function(value) {\n    return removeEmpty(value.split(/(\\S.+?[.!?])(?=\\s+|$)/));\n  };\n\n  var JsonDiff = new Diff();\n  // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a\n  // dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:\n  JsonDiff.useLongestToken = true;\n  JsonDiff.tokenize = LineDiff.tokenize;\n  JsonDiff.equals = function(left, right) {\n    return LineDiff.equals(left.replace(/,([\\r\\n])/g, '$1'), right.replace(/,([\\r\\n])/g, '$1'));\n  };\n\n  var JsDiff = {\n    Diff: Diff,\n\n    diffChars: function(oldStr, newStr, callback) { return CharDiff.diff(oldStr, newStr, callback); },\n    diffWords: function(oldStr, newStr, callback) { return WordDiff.diff(oldStr, newStr, callback); },\n    diffWordsWithSpace: function(oldStr, newStr, callback) { return WordWithSpaceDiff.diff(oldStr, newStr, callback); },\n    diffLines: function(oldStr, newStr, callback) { return LineDiff.diff(oldStr, newStr, callback); },\n    diffTrimmedLines: function(oldStr, newStr, callback) { return TrimmedLineDiff.diff(oldStr, newStr, callback); },\n\n    diffSentences: function(oldStr, newStr, callback) { return SentenceDiff.diff(oldStr, newStr, callback); },\n\n    diffCss: function(oldStr, newStr, callback) { return CssDiff.diff(oldStr, newStr, callback); },\n    diffJson: function(oldObj, newObj, callback) {\n      return JsonDiff.diff(\n        typeof oldObj === 'string' ? oldObj : JSON.stringify(canonicalize(oldObj), undefined, '  '),\n        typeof newObj === 'string' ? newObj : JSON.stringify(canonicalize(newObj), undefined, '  '),\n        callback\n      );\n    },\n\n    createTwoFilesPatch: function(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader) {\n      var ret = [];\n\n      if (oldFileName == newFileName) {\n        ret.push('Index: ' + oldFileName);\n      }\n      ret.push('===================================================================');\n      ret.push('--- ' + oldFileName + (typeof oldHeader === 'undefined' ? '' : '\\t' + oldHeader));\n      ret.push('+++ ' + newFileName + (typeof newHeader === 'undefined' ? '' : '\\t' + newHeader));\n\n      var diff = PatchDiff.diff(oldStr, newStr);\n      diff.push({value: '', lines: []});   // Append an empty value to make cleanup easier\n\n      // Formats a given set of lines for printing as context lines in a patch\n      function contextLines(lines) {\n        return map(lines, function(entry) { return ' ' + entry; });\n      }\n\n      // Outputs the no newline at end of file warning if needed\n      function eofNL(curRange, i, current) {\n        var last = diff[diff.length - 2],\n            isLast = i === diff.length - 2,\n            isLastOfType = i === diff.length - 3 && current.added !== last.added;\n\n        // Figure out if this is the last line for the given file and missing NL\n        if (!(/\\n$/.test(current.value)) && (isLast || isLastOfType)) {\n          curRange.push('\\\\ No newline at end of file');\n        }\n      }\n\n      var oldRangeStart = 0, newRangeStart = 0, curRange = [],\n          oldLine = 1, newLine = 1;\n      for (var i = 0; i < diff.length; i++) {\n        var current = diff[i],\n            lines = current.lines || current.value.replace(/\\n$/, '').split('\\n');\n        current.lines = lines;\n\n        if (current.added || current.removed) {\n          // If we have previous context, start with that\n          if (!oldRangeStart) {\n            var prev = diff[i - 1];\n            oldRangeStart = oldLine;\n            newRangeStart = newLine;\n\n            if (prev) {\n              curRange = contextLines(prev.lines.slice(-4));\n              oldRangeStart -= curRange.length;\n              newRangeStart -= curRange.length;\n            }\n          }\n\n          // Output our changes\n          curRange.push.apply(curRange, map(lines, function(entry) {\n            return (current.added ? '+' : '-') + entry;\n          }));\n          eofNL(curRange, i, current);\n\n          // Track the updated file position\n          if (current.added) {\n            newLine += lines.length;\n          } else {\n            oldLine += lines.length;\n          }\n        } else {\n          // Identical context lines. Track line changes\n          if (oldRangeStart) {\n            // Close out any changes that have been output (or join overlapping)\n            if (lines.length <= 8 && i < diff.length - 2) {\n              // Overlapping\n              curRange.push.apply(curRange, contextLines(lines));\n            } else {\n              // end the range and output\n              var contextSize = Math.min(lines.length, 4);\n              ret.push(\n                  '@@ -' + oldRangeStart + ',' + (oldLine - oldRangeStart + contextSize)\n                  + ' +' + newRangeStart + ',' + (newLine - newRangeStart + contextSize)\n                  + ' @@');\n              ret.push.apply(ret, curRange);\n              ret.push.apply(ret, contextLines(lines.slice(0, contextSize)));\n              if (lines.length <= 4) {\n                eofNL(ret, i, current);\n              }\n\n              oldRangeStart = 0;\n              newRangeStart = 0;\n              curRange = [];\n            }\n          }\n          oldLine += lines.length;\n          newLine += lines.length;\n        }\n      }\n\n      return ret.join('\\n') + '\\n';\n    },\n\n    createPatch: function(fileName, oldStr, newStr, oldHeader, newHeader) {\n      return JsDiff.createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader);\n    },\n\n    applyPatch: function(oldStr, uniDiff) {\n      var diffstr = uniDiff.split('\\n'),\n          hunks = [],\n          i = 0,\n          remEOFNL = false,\n          addEOFNL = false;\n\n      // Skip to the first change hunk\n      while (i < diffstr.length && !(/^@@/.test(diffstr[i]))) {\n        i++;\n      }\n\n      // Parse the unified diff\n      for (; i < diffstr.length; i++) {\n        if (diffstr[i][0] === '@') {\n          var chnukHeader = diffstr[i].split(/@@ -(\\d+),(\\d+) \\+(\\d+),(\\d+) @@/);\n          hunks.unshift({\n            start: chnukHeader[3],\n            oldlength: +chnukHeader[2],\n            removed: [],\n            newlength: chnukHeader[4],\n            added: []\n          });\n        } else if (diffstr[i][0] === '+') {\n          hunks[0].added.push(diffstr[i].substr(1));\n        } else if (diffstr[i][0] === '-') {\n          hunks[0].removed.push(diffstr[i].substr(1));\n        } else if (diffstr[i][0] === ' ') {\n          hunks[0].added.push(diffstr[i].substr(1));\n          hunks[0].removed.push(diffstr[i].substr(1));\n        } else if (diffstr[i][0] === '\\\\') {\n          if (diffstr[i - 1][0] === '+') {\n            remEOFNL = true;\n          } else if (diffstr[i - 1][0] === '-') {\n            addEOFNL = true;\n          }\n        }\n      }\n\n      // Apply the diff to the input\n      var lines = oldStr.split('\\n');\n      for (i = hunks.length - 1; i >= 0; i--) {\n        var hunk = hunks[i];\n        // Sanity check the input string. Bail if we don't match.\n        for (var j = 0; j < hunk.oldlength; j++) {\n          if (lines[hunk.start - 1 + j] !== hunk.removed[j]) {\n            return false;\n          }\n        }\n        Array.prototype.splice.apply(lines, [hunk.start - 1, hunk.oldlength].concat(hunk.added));\n      }\n\n      // Handle EOFNL insertion/removal\n      if (remEOFNL) {\n        while (!lines[lines.length - 1]) {\n          lines.pop();\n        }\n      } else if (addEOFNL) {\n        lines.push('');\n      }\n      return lines.join('\\n');\n    },\n\n    convertChangesToXML: function(changes) {\n      var ret = [];\n      for (var i = 0; i < changes.length; i++) {\n        var change = changes[i];\n        if (change.added) {\n          ret.push('<ins>');\n        } else if (change.removed) {\n          ret.push('<del>');\n        }\n\n        ret.push(escapeHTML(change.value));\n\n        if (change.added) {\n          ret.push('</ins>');\n        } else if (change.removed) {\n          ret.push('</del>');\n        }\n      }\n      return ret.join('');\n    },\n\n    // See: http://code.google.com/p/google-diff-match-patch/wiki/API\n    convertChangesToDMP: function(changes) {\n      var ret = [],\n          change,\n          operation;\n      for (var i = 0; i < changes.length; i++) {\n        change = changes[i];\n        if (change.added) {\n          operation = 1;\n        } else if (change.removed) {\n          operation = -1;\n        } else {\n          operation = 0;\n        }\n\n        ret.push([operation, change.value]);\n      }\n      return ret;\n    },\n\n    canonicalize: canonicalize\n  };\n\n  /*istanbul ignore next */\n  /*global module */\n  if (typeof module !== 'undefined' && module.exports) {\n    module.exports = JsDiff;\n  } else if (typeof define === 'function' && define.amd) {\n    /*global define */\n    define([], function() { return JsDiff; });\n  } else if (typeof global.JsDiff === 'undefined') {\n    global.JsDiff = JsDiff;\n  }\n}(this));\n\n},{}],68:[function(require,module,exports){\n'use strict';\n\nvar matchOperatorsRe = /[|\\\\{}()[\\]^$+*?.]/g;\n\nmodule.exports = function (str) {\n\tif (typeof str !== 'string') {\n\t\tthrow new TypeError('Expected a string');\n\t}\n\n\treturn str.replace(matchOperatorsRe,  '\\\\$&');\n};\n\n},{}],69:[function(require,module,exports){\n(function (process){\n// Growl - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)\n\n/**\n * Module dependencies.\n */\n\nvar exec = require('child_process').exec\n  , fs = require('fs')\n  , path = require('path')\n  , exists = fs.existsSync || path.existsSync\n  , os = require('os')\n  , quote = JSON.stringify\n  , cmd;\n\nfunction which(name) {\n  var paths = process.env.PATH.split(':');\n  var loc;\n  \n  for (var i = 0, len = paths.length; i < len; ++i) {\n    loc = path.join(paths[i], name);\n    if (exists(loc)) return loc;\n  }\n}\n\nswitch(os.type()) {\n  case 'Darwin':\n    if (which('terminal-notifier')) {\n      cmd = {\n          type: \"Darwin-NotificationCenter\"\n        , pkg: \"terminal-notifier\"\n        , msg: '-message'\n        , title: '-title'\n        , subtitle: '-subtitle'\n        , priority: {\n              cmd: '-execute'\n            , range: []\n          }\n      };\n    } else {\n      cmd = {\n          type: \"Darwin-Growl\"\n        , pkg: \"growlnotify\"\n        , msg: '-m'\n        , sticky: '--sticky'\n        , priority: {\n              cmd: '--priority'\n            , range: [\n                -2\n              , -1\n              , 0\n              , 1\n              , 2\n              , \"Very Low\"\n              , \"Moderate\"\n              , \"Normal\"\n              , \"High\"\n              , \"Emergency\"\n            ]\n          }\n      };\n    }\n    break;\n  case 'Linux':\n    cmd = {\n        type: \"Linux\"\n      , pkg: \"notify-send\"\n      , msg: ''\n      , sticky: '-t 0'\n      , icon: '-i'\n      , priority: {\n          cmd: '-u'\n        , range: [\n            \"low\"\n          , \"normal\"\n          , \"critical\"\n        ]\n      }\n    };\n    break;\n  case 'Windows_NT':\n    cmd = {\n        type: \"Windows\"\n      , pkg: \"growlnotify\"\n      , msg: ''\n      , sticky: '/s:true'\n      , title: '/t:'\n      , icon: '/i:'\n      , priority: {\n            cmd: '/p:'\n          , range: [\n              -2\n            , -1\n            , 0\n            , 1\n            , 2\n          ]\n        }\n    };\n    break;\n}\n\n/**\n * Expose `growl`.\n */\n\nexports = module.exports = growl;\n\n/**\n * Node-growl version.\n */\n\nexports.version = '1.4.1'\n\n/**\n * Send growl notification _msg_ with _options_.\n *\n * Options:\n *\n *  - title   Notification title\n *  - sticky  Make the notification stick (defaults to false)\n *  - priority  Specify an int or named key (default is 0)\n *  - name    Application name (defaults to growlnotify)\n *  - image\n *    - path to an icon sets --iconpath\n *    - path to an image sets --image\n *    - capitalized word sets --appIcon\n *    - filename uses extname as --icon\n *    - otherwise treated as --icon\n *\n * Examples:\n *\n *   growl('New email')\n *   growl('5 new emails', { title: 'Thunderbird' })\n *   growl('Email sent', function(){\n *     // ... notification sent\n *   })\n *\n * @param {string} msg\n * @param {object} options\n * @param {function} fn\n * @api public\n */\n\nfunction growl(msg, options, fn) {\n  var image\n    , args\n    , options = options || {}\n    , fn = fn || function(){};\n\n  // noop\n  if (!cmd) return fn(new Error('growl not supported on this platform'));\n  args = [cmd.pkg];\n\n  // image\n  if (image = options.image) {\n    switch(cmd.type) {\n      case 'Darwin-Growl':\n        var flag, ext = path.extname(image).substr(1)\n        flag = flag || ext == 'icns' && 'iconpath'\n        flag = flag || /^[A-Z]/.test(image) && 'appIcon'\n        flag = flag || /^png|gif|jpe?g$/.test(ext) && 'image'\n        flag = flag || ext && (image = ext) && 'icon'\n        flag = flag || 'icon'\n        args.push('--' + flag, quote(image))\n        break;\n      case 'Linux':\n        args.push(cmd.icon, quote(image));\n        // libnotify defaults to sticky, set a hint for transient notifications\n        if (!options.sticky) args.push('--hint=int:transient:1');\n        break;\n      case 'Windows':\n        args.push(cmd.icon + quote(image));\n        break;\n    }\n  }\n\n  // sticky\n  if (options.sticky) args.push(cmd.sticky);\n\n  // priority\n  if (options.priority) {\n    var priority = options.priority + '';\n    var checkindexOf = cmd.priority.range.indexOf(priority);\n    if (~cmd.priority.range.indexOf(priority)) {\n      args.push(cmd.priority, options.priority);\n    }\n  }\n\n  // name\n  if (options.name && cmd.type === \"Darwin-Growl\") {\n    args.push('--name', options.name);\n  }\n\n  switch(cmd.type) {\n    case 'Darwin-Growl':\n      args.push(cmd.msg);\n      args.push(quote(msg));\n      if (options.title) args.push(quote(options.title));\n      break;\n    case 'Darwin-NotificationCenter':\n      args.push(cmd.msg);\n      args.push(quote(msg));\n      if (options.title) {\n        args.push(cmd.title);\n        args.push(quote(options.title));\n      }\n      if (options.subtitle) {\n        args.push(cmd.subtitle);\n        args.push(quote(options.subtitle));\n      }\n      break;\n    case 'Darwin-Growl':\n      args.push(cmd.msg);\n      args.push(quote(msg));\n      if (options.title) args.push(quote(options.title));\n      break;\n    case 'Linux':\n      if (options.title) {\n        args.push(quote(options.title));\n        args.push(cmd.msg);\n        args.push(quote(msg));\n      } else {\n        args.push(quote(msg));\n      }\n      break;\n    case 'Windows':\n      args.push(quote(msg));\n      if (options.title) args.push(cmd.title + quote(options.title));\n      break;\n  }\n\n  // execute\n  exec(args.join(' '), fn);\n};\n\n}).call(this,require('_process'))\n},{\"_process\":51,\"child_process\":41,\"fs\":41,\"os\":50,\"path\":41}],70:[function(require,module,exports){\n(function (process,global){\n/**\n * Shim process.stdout.\n */\n\nprocess.stdout = require('browser-stdout')();\n\nvar Mocha = require('../');\n\n/**\n * Create a Mocha instance.\n *\n * @return {undefined}\n */\n\nvar mocha = new Mocha({ reporter: 'html' });\n\n/**\n * Save timer references to avoid Sinon interfering (see GH-237).\n */\n\nvar Date = global.Date;\nvar setTimeout = global.setTimeout;\nvar setInterval = global.setInterval;\nvar clearTimeout = global.clearTimeout;\nvar clearInterval = global.clearInterval;\n\nvar uncaughtExceptionHandlers = [];\n\nvar originalOnerrorHandler = global.onerror;\n\n/**\n * Remove uncaughtException listener.\n * Revert to original onerror handler if previously defined.\n */\n\nprocess.removeListener = function(e, fn){\n  if ('uncaughtException' == e) {\n    if (originalOnerrorHandler) {\n      global.onerror = originalOnerrorHandler;\n    } else {\n      global.onerror = function() {};\n    }\n    var i = Mocha.utils.indexOf(uncaughtExceptionHandlers, fn);\n    if (i != -1) { uncaughtExceptionHandlers.splice(i, 1); }\n  }\n};\n\n/**\n * Implements uncaughtException listener.\n */\n\nprocess.on = function(e, fn){\n  if ('uncaughtException' == e) {\n    global.onerror = function(err, url, line){\n      fn(new Error(err + ' (' + url + ':' + line + ')'));\n      return !mocha.allowUncaught;\n    };\n    uncaughtExceptionHandlers.push(fn);\n  }\n};\n\n// The BDD UI is registered by default, but no UI will be functional in the\n// browser without an explicit call to the overridden `mocha.ui` (see below).\n// Ensure that this default UI does not expose its methods to the global scope.\nmocha.suite.removeAllListeners('pre-require');\n\nvar immediateQueue = []\n  , immediateTimeout;\n\nfunction timeslice() {\n  var immediateStart = new Date().getTime();\n  while (immediateQueue.length && (new Date().getTime() - immediateStart) < 100) {\n    immediateQueue.shift()();\n  }\n  if (immediateQueue.length) {\n    immediateTimeout = setTimeout(timeslice, 0);\n  } else {\n    immediateTimeout = null;\n  }\n}\n\n/**\n * High-performance override of Runner.immediately.\n */\n\nMocha.Runner.immediately = function(callback) {\n  immediateQueue.push(callback);\n  if (!immediateTimeout) {\n    immediateTimeout = setTimeout(timeslice, 0);\n  }\n};\n\n/**\n * Function to allow assertion libraries to throw errors directly into mocha.\n * This is useful when running tests in a browser because window.onerror will\n * only receive the 'message' attribute of the Error.\n */\nmocha.throwError = function(err) {\n  Mocha.utils.forEach(uncaughtExceptionHandlers, function (fn) {\n    fn(err);\n  });\n  throw err;\n};\n\n/**\n * Override ui to ensure that the ui functions are initialized.\n * Normally this would happen in Mocha.prototype.loadFiles.\n */\n\nmocha.ui = function(ui){\n  Mocha.prototype.ui.call(this, ui);\n  this.suite.emit('pre-require', global, null, this);\n  return this;\n};\n\n/**\n * Setup mocha with the given setting options.\n */\n\nmocha.setup = function(opts){\n  if ('string' == typeof opts) opts = { ui: opts };\n  for (var opt in opts) this[opt](opts[opt]);\n  return this;\n};\n\n/**\n * Run mocha, returning the Runner.\n */\n\nmocha.run = function(fn){\n  var options = mocha.options;\n  mocha.globals('location');\n\n  var query = Mocha.utils.parseQuery(global.location.search || '');\n  if (query.grep) mocha.grep(new RegExp(query.grep));\n  if (query.fgrep) mocha.grep(query.fgrep);\n  if (query.invert) mocha.invert();\n\n  return Mocha.prototype.run.call(mocha, function(err){\n    // The DOM Document is not available in Web Workers.\n    var document = global.document;\n    if (document && document.getElementById('mocha') && options.noHighlighting !== true) {\n      Mocha.utils.highlightTags('code');\n    }\n    if (fn) fn(err);\n  });\n};\n\n/**\n * Expose the process shim.\n * https://github.com/mochajs/mocha/pull/916\n */\n\nMocha.process = process;\n\n/**\n * Expose mocha.\n */\n\nwindow.Mocha = Mocha;\nwindow.mocha = mocha;\n\n}).call(this,require('_process'),typeof global !== \"undefined\" ? global : typeof self !== \"undefined\" ? self : typeof window !== \"undefined\" ? window : {})\n},{\"../\":1,\"_process\":51,\"browser-stdout\":40}]},{},[70]);\n"

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var should = __webpack_require__(18);
	var testFile = __webpack_require__(3);

	describe("testing", function() {

	  it("should work", function() {
	    ("test").should.equal("test");
	  });

	  it("can import a file", function() {
	    testFile.should.equal("It works from content.");
	  });

	  it("knows right from wrong", function() {
	    (false).should.equal(true);
	  });

	});


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var should = __webpack_require__(19);

	var defaultProto = Object.prototype;
	var defaultProperty = 'should';

	//Expose api via `Object#should`.
	try {
	  var prevShould = should.extend(defaultProperty, defaultProto);
	  should._prevShould = prevShould;
	} catch(e) {
	  //ignore errors
	}

	module.exports = should;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Should
	 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */


	var util = __webpack_require__(20);

	/**
	 * Our function should
	 *
	 * @param {*} obj Object to assert
	 * @returns {should.Assertion} Returns new Assertion for beginning assertion chain
	 * @example
	 *
	 * var should = require('should');
	 * should('abc').be.a.String();
	 */
	var should = function should(obj) {
	  return (new should.Assertion(obj));
	};

	should.AssertionError = __webpack_require__(30);
	should.Assertion = __webpack_require__(31);

	should.format = util.format;
	should.type = __webpack_require__(21);
	should.util = util;

	/**
	 * Object with configuration.
	 * It contains such properties:
	 * * `checkProtoEql` boolean - Affect if `.eql` will check objects prototypes
	 * Also it can contain options for should-format.
	 *
	 * @type {Object}
	 * @memberOf should
	 * @static
	 * @example
	 *
	 * var a = { a: 10 }, b = Object.create(null);
	 * b.a = 10;
	 *
	 * a.should.be.eql(b);
	 * //not throws
	 *
	 * should.config.checkProtoEql = true;
	 * a.should.be.eql(b);
	 * //throws AssertionError: expected { a: 10 } to equal { a: 10 } (because A and B have different prototypes)
	 */
	should.config = __webpack_require__(27);

	//Expose should to external world.
	exports = module.exports = should;

	/**
	 * Allow to extend given prototype with should property using given name. This getter will **unwrap** all standard wrappers like `Number`, `Boolean`, `String`.
	 * Using `should(obj)` is the equivalent of using `obj.should` with known issues (like nulls and method calls etc).
	 *
	 * @param {string} [propertyName] Name of property to add. Default is `'should'`.
	 * @param {Object} [proto] Prototype to extend with. Default is `Object.prototype`.
	 * @memberOf should
	 * @returns {{ name: string, descriptor: Object, proto: Object }} Descriptor enough to return all back
	 * @static
	 * @example
	 *
	 * var prev = should.extend('must', Object.prototype);
	 *
	 * 'abc'.must.startWith('a');
	 *
	 * var should = should.noConflict(prev);
	 * should.not.exist(Object.prototype.must);
	 */
	should.extend = function(propertyName, proto) {
	  propertyName = propertyName || 'should';
	  proto = proto || Object.prototype;

	  var prevDescriptor = Object.getOwnPropertyDescriptor(proto, propertyName);

	  Object.defineProperty(proto, propertyName, {
	    set: function() {
	    },
	    get: function() {
	      return should(util.isWrapperType(this) ? this.valueOf() : this);
	    },
	    configurable: true
	  });

	  return { name: propertyName, descriptor: prevDescriptor, proto: proto };
	};

	/**
	 * Delete previous extension. If `desc` missing it will remove default extension.
	 *
	 * @param {{ name: string, descriptor: Object, proto: Object }} [desc] Returned from `should.extend` object
	 * @memberOf should
	 * @returns {Function} Returns should function
	 * @static
	 * @example
	 *
	 * var should = require('should').noConflict();
	 *
	 * should(Object.prototype).not.have.property('should');
	 *
	 * var prev = should.extend('must', Object.prototype);
	 * 'abc'.must.startWith('a');
	 * should.noConflict(prev);
	 *
	 * should(Object.prototype).not.have.property('must');
	 */
	should.noConflict = function(desc) {
	  desc = desc || should._prevShould;

	  if(desc) {
	    delete desc.proto[desc.name];

	    if(desc.descriptor) {
	      Object.defineProperty(desc.proto, desc.name, desc.descriptor);
	    }
	  }
	  return should;
	};

	/**
	 * Simple utility function for a bit more easier should assertion extension
	 * @param {Function} f So called plugin function. It should accept 2 arguments: `should` function and `Assertion` constructor
	 * @memberOf should
	 * @returns {Function} Returns `should` function
	 * @static
	 * @example
	 *
	 * should.use(function(should, Assertion) {
	 *   Assertion.add('asset', function() {
	 *      this.params = { operator: 'to be asset' };
	 *
	 *      this.obj.should.have.property('id').which.is.a.Number();
	 *      this.obj.should.have.property('path');
	 *  })
	 * })
	 */
	should.use = function(f) {
	  f(should, should.Assertion);
	  return this;
	};

	should
	  .use(__webpack_require__(32))
	  .use(__webpack_require__(36))
	  .use(__webpack_require__(37))
	  .use(__webpack_require__(38))
	  .use(__webpack_require__(39))
	  .use(__webpack_require__(40))
	  .use(__webpack_require__(41))
	  .use(__webpack_require__(42))
	  .use(__webpack_require__(43))
	  .use(__webpack_require__(44))
	  .use(__webpack_require__(45));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Should
	 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	var type = __webpack_require__(21);
	var config = __webpack_require__(27);

	/**
	 * Check if given obj just a primitive type wrapper
	 * @param {Object} obj
	 * @returns {boolean}
	 * @private
	 */
	exports.isWrapperType = function(obj) {
	  return obj instanceof Number || obj instanceof String || obj instanceof Boolean;
	};

	exports.merge = function(a, b) {
	  if(a && b) {
	    for(var key in b) {
	      a[key] = b[key];
	    }
	  }
	  return a;
	};

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	exports.forEach = function forEach(obj, f, context) {
	  if(exports.isGeneratorFunction(obj)) {
	    return forEach(obj(), f, context);
	  } else if (exports.isGeneratorObject(obj)) {
	    var value = obj.next();
	    while(!value.done) {
	      if(f.call(context, value.value, 'value', obj) === false)
	        return;
	      value = obj.next();
	    }
	  } else {
	    for(var prop in obj) {
	      if(hasOwnProperty.call(obj, prop)) {
	        if(f.call(context, obj[prop], prop, obj) === false)
	          return;
	      }
	    }
	  }
	};

	exports.some = function(obj, f, context) {
	  var res = false;
	  exports.forEach(obj, function(value, key) {
	    if(f.call(context, value, key, obj)) {
	      res = true;
	      return false;
	    }
	  }, context);
	  return res;
	};

	exports.isEmptyObject = function(obj) {
	  for(var prop in obj) {
	    if(hasOwnProperty.call(obj, prop)) {
	      return false;
	    }
	  }
	  return true;
	};

	exports.isIndexable = function(obj) {
	  var t = type(obj);
	  return (t.type === type.OBJECT && t.cls === type.ARRAY) ||
	   (t.type === type.OBJECT && t.cls === type.BUFFER) ||
	   (t.type === type.OBJECT && t.cls === type.ARGUMENTS) ||
	   (t.type === type.OBJECT && t.cls === type.ARRAY_BUFFER) ||
	   (t.type === type.OBJECT && t.cls === type.TYPED_ARRAY) ||
	   (t.type === type.OBJECT && t.cls === type.DATA_VIEW) ||
	   (t.type === type.OBJECT && t.cls === type.STRING) ||
	   (t.type === type.STRING);
	};

	exports.length = function(obj) {
	  var t = type(obj);
	  switch(t.type) {
	    case type.STRING:
	      return obj.length;
	    case type.OBJECT:
	      switch(t.cls) {
	        case type.ARRAY_BUFFER:
	        case type.TYPED_ARRAY:
	        case type.DATA_VIEW:
	          return obj.byteLength;

	        case type.ARRAY:
	        case type.BUFFER:
	        case type.ARGUMENTS:
	        case type.FUNCTION:
	          return obj.length;
	      }
	  }
	};

	exports.convertPropertyName = function(name) {
	  if(typeof name == 'symbol') {
	    return name;
	  } else {
	    return String(name);
	  }
	};

	exports.isGeneratorObject = function(obj) {
	  if(!obj) return false;

	  return typeof obj.next == 'function' &&
	          typeof obj[Symbol.iterator] == 'function' &&
	          obj[Symbol.iterator]() === obj;
	};

	//TODO find better way
	exports.isGeneratorFunction = function(f) {
	  if(typeof f != 'function') return false;

	  return /^function\s*\*\s*/.test(f.toString());
	};

	exports.format = function(value, opts) {
	  return config.getFormatter(opts).format(value);
	};

	exports.functionName = __webpack_require__(28).Formatter.functionName;

	exports.formatProp = function(value) {
	  return config.getFormatter().formatPropertyName(String(value));
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var toString = Object.prototype.toString;

	var types = __webpack_require__(26);

	/**
	 * Simple data function to store type information
	 * @param {string} type Usually what is returned from typeof
	 * @param {string} cls  Sanitized @Class via Object.prototype.toString
	 * @param {string} sub  If type and cls the same, and need to specify somehow
	 * @private
	 * @example
	 *
	 * //for null
	 * new Type('null');
	 *
	 * //for Date
	 * new Type('object', 'date');
	 *
	 * //for Uint8Array
	 *
	 * new Type('object', 'typed-array', 'uint8');
	 */
	function Type(type, cls, sub) {
	  this.type = type;
	  this.cls = cls;
	  this.sub = sub;
	}

	/**
	 * Function to store type checks
	 * @private
	 */
	function TypeChecker() {
	  this.checks = [];
	}

	TypeChecker.prototype = {
	  add: function(func) {
	    this.checks.push(func);
	    return this;
	  },

	  addTypeOf: function(type, res) {
	    return this.add(function(obj, tpeOf) {
	      if(tpeOf === type) {
	        return new Type(res);
	      }
	    });
	  },

	  addClass: function(cls, res, sub) {
	    return this.add(function(obj, tpeOf, objCls) {
	      if(objCls === cls) {
	        return new Type(types.OBJECT, res, sub);
	      }
	    });
	  },

	  getType: function(obj) {
	    var typeOf = typeof obj;
	    var cls = toString.call(obj);

	    for(var i = 0, l = this.checks.length; i < l; i++) {
	      var res = this.checks[i].call(this, obj, typeOf, cls);
	      if(typeof res !== 'undefined') return res;
	    }

	  }
	};

	var main = new TypeChecker();

	//TODO add iterators

	main
	  .addTypeOf(types.NUMBER, types.NUMBER)
	  .addTypeOf(types.UNDEFINED, types.UNDEFINED)
	  .addTypeOf(types.STRING, types.STRING)
	  .addTypeOf(types.BOOLEAN, types.BOOLEAN)
	  .addTypeOf(types.FUNCTION, types.FUNCTION)
	  .addTypeOf(types.SYMBOL, types.SYMBOL)
	  .add(function(obj, tpeOf) {
	    if(obj === null) return new Type(types.NULL);
	  })
	  .addClass('[object String]', types.STRING)
	  .addClass('[object Boolean]', types.BOOLEAN)
	  .addClass('[object Number]', types.NUMBER)
	  .addClass('[object Array]', types.ARRAY)
	  .addClass('[object RegExp]', types.REGEXP)
	  .addClass('[object Error]', types.ERROR)
	  .addClass('[object Date]', types.DATE)
	  .addClass('[object Arguments]', types.ARGUMENTS)
	  .addClass('[object Math]')
	  .addClass('[object JSON]')
	  .addClass('[object ArrayBuffer]', types.ARRAY_BUFFER)
	  .addClass('[object Int8Array]', types.TYPED_ARRAY, 'int8')
	  .addClass('[object Uint8Array]', types.TYPED_ARRAY, 'uint8')
	  .addClass('[object Uint8ClampedArray]', types.TYPED_ARRAY, 'uint8clamped')
	  .addClass('[object Int16Array]', types.TYPED_ARRAY, 'int16')
	  .addClass('[object Uint16Array]', types.TYPED_ARRAY, 'uint16')
	  .addClass('[object Int32Array]', types.TYPED_ARRAY, 'int32')
	  .addClass('[object Uint32Array]', types.TYPED_ARRAY, 'uint32')
	  .addClass('[object Float32Array]', types.TYPED_ARRAY, 'float32')
	  .addClass('[object Float64Array]', types.TYPED_ARRAY, 'float64')
	  .addClass('[object DataView]', types.DATA_VIEW)
	  .addClass('[object Map]', types.MAP)
	  .addClass('[object WeakMap]', types.WEAK_MAP)
	  .addClass('[object Set]', types.SET)
	  .addClass('[object WeakSet]', types.WEAK_SET)
	  .addClass('[object Promise]', types.PROMISE)
	  .addClass('[object Blob]', types.BLOB)
	  .addClass('[object File]', types.FILE)
	  .addClass('[object FileList]', types.FILE_LIST)
	  .addClass('[object XMLHttpRequest]', types.XHR)
	  .add(function(obj) {
	    if((typeof Promise === types.FUNCTION && obj instanceof Promise) ||
	        (typeof obj.then === types.FUNCTION)) {
	          return new Type(types.OBJECT, types.PROMISE);
	        }
	  })
	  .add(function(obj) {
	    if(typeof Buffer !== 'undefined' && obj instanceof Buffer) {
	      return new Type(types.OBJECT, types.BUFFER);
	    }
	  })
	  .add(function(obj) {
	    if(typeof Node !== 'undefined' && obj instanceof Node) {
	      return new Type(types.OBJECT, types.HTML_ELEMENT, obj.nodeName);
	    }
	  })
	  .add(function(obj) {
	    // probably at the begginging should be enough these checks
	    if(obj.Boolean === Boolean && obj.Number === Number && obj.String === String && obj.Date === Date) {
	      return new Type(types.OBJECT, types.HOST);
	    }
	  })
	  .add(function() {
	    return new Type(types.OBJECT);
	  });

	/**
	 * Get type information of anything
	 *
	 * @param  {any} obj Anything that could require type information
	 * @return {Type}    type info
	 */
	function getGlobalType(obj) {
	  return main.getType(obj);
	}

	getGlobalType.checker = main;
	getGlobalType.TypeChecker = TypeChecker;
	getGlobalType.Type = Type;

	Object.keys(types).forEach(function(typeName) {
	  getGlobalType[typeName] = types[typeName];
	});

	module.exports = getGlobalType;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22).Buffer))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	var base64 = __webpack_require__(23)
	var ieee754 = __webpack_require__(24)
	var isArray = __webpack_require__(25)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : (function () {
	      function Bar () {}
	      try {
	        var arr = new Uint8Array(1)
	        arr.foo = function () { return 42 }
	        arr.constructor = Bar
	        return arr.foo() === 42 && // typed array instances can be augmented
	            arr.constructor === Bar && // constructor can be set
	            typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	            arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	      } catch (e) {
	        return false
	      }
	    })()

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  this.length = 0
	  this.parent = undefined

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22).Buffer, (function() { return this; }())))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 24 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 25 */
/***/ function(module, exports) {

	
	/**
	 * isArray
	 */

	var isArray = Array.isArray;

	/**
	 * toString
	 */

	var str = Object.prototype.toString;

	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */

	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	var types = {
	  NUMBER: 'number',
	  UNDEFINED: 'undefined',
	  STRING: 'string',
	  BOOLEAN: 'boolean',
	  OBJECT: 'object',
	  FUNCTION: 'function',
	  NULL: 'null',
	  ARRAY: 'array',
	  REGEXP: 'regexp',
	  DATE: 'date',
	  ERROR: 'error',
	  ARGUMENTS: 'arguments',
	  SYMBOL: 'symbol',
	  ARRAY_BUFFER: 'array-buffer',
	  TYPED_ARRAY: 'typed-array',
	  DATA_VIEW: 'data-view',
	  MAP: 'map',
	  SET: 'set',
	  WEAK_SET: 'weak-set',
	  WEAK_MAP: 'weak-map',
	  PROMISE: 'promise',

	// node buffer
	  BUFFER: 'buffer',

	// dom html element
	  HTML_ELEMENT: 'html-element',
	  HTML_ELEMENT_TEXT: 'html-element-text',
	  DOCUMENT: 'document',
	  WINDOW: 'window',
	  FILE: 'file',
	  FILE_LIST: 'file-list',
	  BLOB: 'blob',

	  HOST: 'host',

	  XHR: 'xhr'
	};

	module.exports = types;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Formatter = __webpack_require__(28).Formatter;

	var config = {
	  checkProtoEql: false,

	  getFormatter: function(opts) {
	    return new Formatter(opts || config);
	  }
	};

	module.exports = config;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var getType = __webpack_require__(21);
	var util = __webpack_require__(29);

	function genKeysFunc(f) {
	  return function(value) {
	    var k = f(value);
	    k.sort();
	    return k;
	  };
	}


	function Formatter(opts) {
	  opts = opts || {};

	  this.seen = [];
	  this.keys = genKeysFunc(opts.keys === false ? Object.getOwnPropertyNames : Object.keys);

	  this.maxLineLength = typeof opts.maxLineLength === 'number' ? opts.maxLineLength : 60;
	  this.propSep = opts.propSep || ',';

	  this.isUTCdate = !!opts.isUTCdate;
	}

	Formatter.prototype = {
	  constructor: Formatter,

	  format: function(value) {
	    var t = getType(value);
	    var name1 = t.type, name2 = t.type;
	    if(t.cls) {
	      name1 += '_' + t.cls;
	      name2 += '_' + t.cls;
	    }
	    if(t.sub) {
	      name2 += '_' + t.sub;
	    }
	    var f = this['_format_' + name2] || this['_format_' + name1] || this['_format_' + t.type] || this.defaultFormat;
	    return f.call(this, value).trim();
	  },

	  _formatObject: function(value, opts) {
	    opts = opts || {};
	    var mainKeys = opts.keys || this.keys(value);

	    var len = 0;

	    var formatPropertyValue = opts.formatPropertyValue || this.formatPropertyValue;
	    var formatPropertyName = opts.formatPropertyName || this.formatPropertyName;
	    var keyValueSep = opts.keyValueSep || ': ';
	    var keyFilter = opts.keyFilter || function() { return true; };

	    this.seen.push(value);
	    var keys = [];

	    mainKeys.forEach(function(key) {
	      if(!keyFilter(key)) return;

	      var fName = formatPropertyName.call(this, key);

	      var f = (fName ? fName + keyValueSep : '') + formatPropertyValue.call(this, value, key);
	      len += f.length;
	      keys.push(f);
	    }, this);
	    this.seen.pop();

	    (opts.additionalProperties || []).forEach(function(keyValue) {
	      var f = keyValue[0] + keyValueSep + this.format(keyValue[1]);
	      len += f.length;
	      keys.push(f);
	    }, this);

	    var prefix = opts.prefix || Formatter.constructorName(value) || '';
	    if(prefix.length > 0) prefix += ' ';

	    var lbracket, rbracket;
	    if(Array.isArray(opts.brackets)) {
	      lbracket = opts.brackets && opts.brackets[0];
	      rbracket = opts.brackets && opts.brackets[1];
	    } else {
	      lbracket = '{';
	      rbracket = '}';
	    }

	    var rootValue = opts.value || '';

	    if(keys.length === 0)
	      return rootValue || (prefix + lbracket + rbracket);

	    if(len <= this.maxLineLength) {
	      return prefix + lbracket + ' ' + (rootValue ? rootValue + ' ' : '') + keys.join(this.propSep + ' ') + ' ' + rbracket;
	    } else {
	      return prefix + lbracket + '\n' + (rootValue ? '  ' + rootValue + '\n' : '') + keys.map(util.addSpaces).join(this.propSep + '\n') + '\n' + rbracket;
	    }
	  },

	  formatObject: function(value, prefix, props) {
	    props = props || this.keys(value);

	    var len = 0;

	    this.seen.push(value);
	    props = props.map(function(prop) {
	      var f = this.formatProperty(value, prop);
	      len += f.length;
	      return f;
	    }, this);
	    this.seen.pop();

	    if(props.length === 0) return '{}';

	    if(len <= this.maxLineLength) {
	      return '{ ' + (prefix ? prefix + ' ' : '') + props.join(this.propSep + ' ') + ' }';
	    } else {
	      return '{' + '\n' + (prefix ? '  ' + prefix + '\n' : '') + props.map(util.addSpaces).join(this.propSep + '\n') + '\n' + '}';
	    }
	  },

	  formatPropertyName: function(name) {
	    return name.match(/^[a-zA-Z_$][a-zA-Z_$0-9]*$/) ? name : this.format(name);
	  },

	  formatProperty: function(value, prop) {
	    var desc = Formatter.getPropertyDescriptor(value, prop);

	    var propName = this.formatPropertyName(prop);

	    var propValue = desc.get && desc.set ?
	      '[Getter/Setter]' : desc.get ?
	      '[Getter]' : desc.set ?
	      '[Setter]' : this.seen.indexOf(desc.value) >= 0 ?
	      '[Circular]' :
	      this.format(desc.value);

	    return propName + ': ' + propValue;
	  },

	  formatPropertyValue: function(value, prop) {
	    var desc = Formatter.getPropertyDescriptor(value, prop);

	    var propValue = desc.get && desc.set ?
	      '[Getter/Setter]' : desc.get ?
	      '[Getter]' : desc.set ?
	      '[Setter]' : this.seen.indexOf(desc.value) >= 0 ?
	      '[Circular]' :
	      this.format(desc.value);

	    return propValue;
	  }
	};

	Formatter.add = function add(type, cls, sub, f) {
	  var args = Array.prototype.slice.call(arguments);
	  f = args.pop();
	  Formatter.prototype['_format_' + args.join('_')] = f;
	};

	Formatter.formatObjectWithPrefix = function formatObjectWithPrefix(f) {
	  return function(value) {
	    var prefix = f.call(this, value);
	    var props = this.keys(value);
	    if(props.length == 0) return prefix;
	    else return this.formatObject(value, prefix, props);
	  };
	};

	var functionNameRE = /^\s*function\s*(\S*)\s*\(/;

	Formatter.functionName = function functionName(f) {
	  if(f.name) {
	    return f.name;
	  }
	  var name = f.toString().match(functionNameRE)[1];
	  return name;
	};

	Formatter.constructorName = function(obj) {
	  while (obj) {
	    var descriptor = Object.getOwnPropertyDescriptor(obj, 'constructor');
	    if (descriptor !== undefined &&
	        typeof descriptor.value === 'function') {

	        var name = Formatter.functionName(descriptor.value);
	        if(name !== '') {
	          return name;
	        }
	    }

	    obj = Object.getPrototypeOf(obj);
	  }
	};

	Formatter.getPropertyDescriptor = function(obj, value) {
	  var desc;
	  try {
	    desc = Object.getOwnPropertyDescriptor(obj, value) || {value: obj[value]};
	  } catch(e) {
	    desc = {value: e};
	  }
	  return desc;
	};

	Formatter.generateFunctionForIndexedArray = function generateFunctionForIndexedArray(lengthProp, name, padding) {
	  return function(value) {
	    var max = this.byteArrayMaxLength || 50;
	    var length = value[lengthProp];
	    var formattedValues = [];
	    var len = 0;
	    for(var i = 0; i < max && i < length; i++) {
	      var b = value[i] || 0;
	      var v = util.pad0(b.toString(16), padding);
	      len += v.length;
	      formattedValues.push(v);
	    }
	    var prefix = value.constructor.name || name || '';
	    if(prefix) prefix += ' ';

	    if(formattedValues.length === 0)
	      return prefix + '[]';

	    if(len <= this.maxLineLength) {
	      return prefix + '[ ' + formattedValues.join(this.propSep + ' ') + ' ' + ']';
	    } else {
	      return prefix + '[\n' + formattedValues.map(util.addSpaces).join(this.propSep + '\n') + '\n' + ']';
	    }
	  };
	};

	['undefined', 'boolean', 'null', 'symbol'].forEach(function(name) {
	  Formatter.add(name, String);
	});

	['number', 'boolean'].forEach(function(name) {
	  Formatter.add('object', name, function(value) {
	    return this._formatObject(value, {
	      additionalProperties: [['[[PrimitiveValue]]', value.valueOf()]]
	    });
	  });
	});

	Formatter.add('object', 'string', function(value) {
	  var realValue = value.valueOf();

	  return this._formatObject(value, {
	    keyFilter: function(key) {
	      //skip useless indexed properties
	      return !(key.match(/\d+/) && parseInt(key, 10) < realValue.length);
	    },
	    additionalProperties: [['[[PrimitiveValue]]', realValue]]
	  });
	});

	Formatter.add('object', 'regexp', function(value) {
	  return this._formatObject(value, {
	    value: String(value)
	  });
	});

	Formatter.add('number', function(value) {
	  if(value === 0 && 1 / value < 0) return '-0';
	  return String(value);
	});

	Formatter.add('string', function(value) {
	  return '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	      .replace(/'/g, "\\'")
	      .replace(/\\"/g, '"') + '\'';
	});

	Formatter.add('object', function(value) {
	  return this._formatObject(value);
	});

	Formatter.add('object', 'arguments', function(value) {
	  return this._formatObject(value, {
	    prefix: 'Arguments',
	    formatPropertyName: function(key) {
	      if(!key.match(/\d+/)) {
	        return this.formatPropertyName(key);
	      }
	    },
	    brackets: ['[', ']']
	  });
	});

	Formatter.add('object', 'array', function(value) {
	  return this._formatObject(value, {
	    formatPropertyName: function(key) {
	      if(!key.match(/\d+/)) {
	        return this.formatPropertyName(key);
	      }
	    },
	    brackets: ['[', ']']
	  });
	});


	function formatDate(value, isUTC) {
	  var prefix = isUTC ? 'UTC' : '';

	  var date = value['get' + prefix + 'FullYear']() +
	    '-' +
	    util.pad0(value['get' + prefix + 'Month']() + 1, 2) +
	    '-' +
	    util.pad0(value['get' + prefix + 'Date'](), 2);

	  var time = util.pad0(value['get' + prefix + 'Hours'](), 2) +
	    ':' +
	    util.pad0(value['get' + prefix + 'Minutes'](), 2) +
	    ':' +
	    util.pad0(value['get' + prefix + 'Seconds'](), 2) +
	    '.' +
	    util.pad0(value['get' + prefix + 'Milliseconds'](), 3);

	  var to = value.getTimezoneOffset();
	  var absTo = Math.abs(to);
	  var hours = Math.floor(absTo / 60);
	  var minutes = absTo - hours * 60;
	  var tzFormat = (to < 0 ? '+' : '-') + util.pad0(hours, 2) + util.pad0(minutes, 2);

	  return date + ' ' + time + (isUTC ? '' : ' ' + tzFormat);
	}

	Formatter.add('object', 'date', function(value) {
	  return this._formatObject(value, { value: formatDate(value, this.isUTCdate) });
	});

	Formatter.add('function', function(value) {
	  return this._formatObject(value, {
	    additionalProperties: [['name', Formatter.functionName(value)]]
	  });
	});

	Formatter.add('object', 'error', function(value) {
	  return this._formatObject(value, {
	    prefix: value.name,
	    additionalProperties: [['message', value.message]]
	  });
	});

	Formatter.add('object', 'buffer', Formatter.generateFunctionForIndexedArray('length', 'Buffer', 2));

	Formatter.add('object', 'array-buffer', Formatter.generateFunctionForIndexedArray('byteLength', 'ArrayBuffer', 2));

	Formatter.add('object', 'typed-array', 'int8', Formatter.generateFunctionForIndexedArray('length', 'Int8Array', 2));
	Formatter.add('object', 'typed-array', 'uint8', Formatter.generateFunctionForIndexedArray('length', 'Uint8Array', 2));
	Formatter.add('object', 'typed-array', 'uint8clamped', Formatter.generateFunctionForIndexedArray('length', 'Uint8ClampedArray', 2));

	Formatter.add('object', 'typed-array', 'int16', Formatter.generateFunctionForIndexedArray('length', 'Int16Array', 4));
	Formatter.add('object', 'typed-array', 'uint16', Formatter.generateFunctionForIndexedArray('length', 'Uint16Array', 4));

	Formatter.add('object', 'typed-array', 'int32', Formatter.generateFunctionForIndexedArray('length', 'Int32Array', 8));
	Formatter.add('object', 'typed-array', 'uint32', Formatter.generateFunctionForIndexedArray('length', 'Uint32Array', 8));

	//TODO add float32 and float64

	Formatter.add('object', 'promise', function() {
	  return '[Promise]';//TODO it could be nice to inspect its state and value
	});

	Formatter.add('object', 'xhr', function() {
	  return '[XMLHttpRequest]';//TODO it could be nice to inspect its state
	});

	Formatter.add('object', 'html-element', function(value) {
	  return value.outerHTML;
	});

	Formatter.add('object', 'html-element', '#text', function(value) {
	  return value.nodeValue;
	});

	Formatter.add('object', 'html-element', '#document', function(value) {
	  return value.documentElement.outerHTML;
	});

	Formatter.add('object', 'host', function() {
	  return '[Host]';
	});

	Formatter.add('object', 'set', function(value) {
	  var iter = value.values();
	  var len = 0;

	  this.seen.push(value);

	  var props = [];

	  var next = iter.next();
	  while(!next.done) {
	    var val = next.value;
	    var f = this.format(val);
	    len += f.length;
	    props.push(f);

	    next = iter.next();
	  }

	  this.seen.pop();

	  if(props.length === 0) return 'Set {}';

	  if(len <= this.maxLineLength) {
	    return 'Set { ' + props.join(this.propSep + ' ') + ' }';
	  } else {
	    return 'Set {\n' + props.map(util.addSpaces).join(this.propSep + '\n') + '\n' + '}';
	  }
	});

	Formatter.add('object', 'map', function(value) {
	  var iter = value.entries();
	  var len = 0;

	  this.seen.push(value);

	  var props = [];

	  var next = iter.next();
	  while(!next.done) {
	    var val = next.value;
	    var fK = this.format(val[0]);
	    var fV = this.format(val[1]);

	    var f;
	    if((fK.length + fV.length + 4) <= this.maxLineLength) {
	      f = fK + ' => ' + fV;
	    } else {
	      f = fK + ' =>\n' + fV;
	    }

	    len += fK.length + fV.length + 4;
	    props.push(f);

	    next = iter.next();
	  }

	  this.seen.pop();

	  if(props.length === 0) return 'Map {}';

	  if(len <= this.maxLineLength) {
	    return 'Map { ' + props.join(this.propSep + ' ') + ' }';
	  } else {
	    return 'Map {\n' + props.map(util.addSpaces).join(this.propSep + '\n') + '\n' + '}';
	  }
	});

	Formatter.prototype.defaultFormat = Formatter.prototype._format_object;

	function defaultFormat(value, opts) {
	  return new Formatter(opts).format(value);
	}

	defaultFormat.Formatter = Formatter;
	module.exports = defaultFormat;


/***/ },
/* 29 */
/***/ function(module, exports) {

	function addSpaces(v) {
	  return v.split('\n').map(function(vv) { return '  ' + vv; }).join('\n');
	}

	function pad(str, value, filler) {
	  str = String(str)
	  var isRight = false;

	  if(value < 0) {
	    isRight = true;
	    value = -value;
	  }

	  if(str.length < value) {
	    var padding = new Array(value - str.length + 1).join(filler);
	    return isRight ? str + padding : padding + str;
	  } else{
	    return str;
	  }
	}

	module.exports = {
	  addSpaces: addSpaces,
	  pad: pad,
	  pad0: function(str, value) {
	    return pad(str, value, '0');
	  }
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(20);

	/**
	 * should AssertionError
	 * @param {Object} options
	 * @constructor
	 * @memberOf should
	 * @static
	 */
	var AssertionError = function AssertionError(options) {
	  util.merge(this, options);

	  if(!options.message) {
	    Object.defineProperty(this, 'message', {
	        get: function() {
	          if(!this._message) {
	            this._message = this.generateMessage();
	            this.generatedMessage = true;
	          }
	          return this._message;
	        },
	        configurable: true,
	        enumerable: false
	      }
	    );
	  }

	  if(Error.captureStackTrace) {
	    Error.captureStackTrace(this, this.stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if(err.stack) {
	      var out = err.stack;

	      if(this.stackStartFunction) {
	        // try to strip useless frames
	        var fn_name = util.functionName(this.stackStartFunction);
	        var idx = out.indexOf('\n' + fn_name);
	        if(idx >= 0) {
	          // once we have located the function frame
	          // we need to strip out everything before it (and its line)
	          var next_line = out.indexOf('\n', idx + 1);
	          out = out.substring(next_line + 1);
	        }
	      }

	      this.stack = out;
	    }
	  }
	};


	var indent = '    ';
	function prependIndent(line) {
	  return indent + line;
	}

	function indentLines(text) {
	  return text.split('\n').map(prependIndent).join('\n');
	}


	// assert.AssertionError instanceof Error
	AssertionError.prototype = Object.create(Error.prototype, {
	  name: {
	    value: 'AssertionError'
	  },

	  generateMessage: {
	    value: function() {
	      if(!this.operator && this.previous) {
	        return this.previous.message;
	      }
	      var actual = util.format(this.actual);
	      var expected = 'expected' in this ? ' ' + util.format(this.expected) : '';
	      var details = 'details' in this && this.details ? ' (' + this.details + ')' : '';

	      var previous = this.previous ? '\n' + indentLines(this.previous.message) : '';

	      return 'expected ' + actual + (this.negate ? ' not ' : ' ') + this.operator + expected + details + previous;
	    }
	  }
	});

	module.exports = AssertionError;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var AssertionError = __webpack_require__(30);
	var util = __webpack_require__(20);

	/**
	 * should Assertion
	 * @param {*} obj Given object for assertion
	 * @constructor
	 * @memberOf should
	 * @static
	 */
	function Assertion(obj) {
	  this.obj = obj;

	  this.anyOne = false;
	  this.negate = false;

	  this.params = {actual: obj};
	}

	/**
	 * Way to extend Assertion function. It uses some logic
	 * to define only positive assertions and itself rule with negative assertion.
	 *
	 * All actions happen in subcontext and this method take care about negation.
	 * Potentially we can add some more modifiers that does not depends from state of assertion.
	 * @memberOf Assertion
	 * @category assertion
	 * @static
	 * @param {String} name Name of assertion. It will be used for defining method or getter on Assertion.prototype
	 * @param {Function} func Function that will be called on executing assertion
	 * @example
	 *
	 * Assertion.add('asset', function() {
	 *      this.params = { operator: 'to be asset' };
	 *
	 *      this.obj.should.have.property('id').which.is.a.Number();
	 *      this.obj.should.have.property('path');
	 * });
	 */
	Assertion.add = function(name, func) {
	  var prop = {enumerable: true, configurable: true};

	  prop.value = function() {
	    var context = new Assertion(this.obj, this, name);
	    context.anyOne = this.anyOne;

	    try {
	      func.apply(context, arguments);
	    } catch(e) {
	      //check for fail
	      if(e instanceof AssertionError) {
	        //negative fail
	        if(this.negate) {
	          this.obj = context.obj;
	          this.negate = false;
	          return this;
	        }

	        if(context !== e.assertion) {
	          context.params.previous = e;
	        }

	        //positive fail
	        context.negate = false;
	        context.fail();
	      }
	      // throw if it is another exception
	      throw e;
	    }

	    //negative pass
	    if(this.negate) {
	      context.negate = true;//because .fail will set negate
	      context.params.details = 'false negative fail';
	      context.fail();
	    }

	    //positive pass
	    if(!this.params.operator) this.params = context.params;//shortcut
	    this.obj = context.obj;
	    this.negate = false;
	    return this;
	  };

	  Object.defineProperty(Assertion.prototype, name, prop);
	};

	Assertion.addChain = function(name, onCall) {
	  onCall = onCall || function() {
	  };
	  Object.defineProperty(Assertion.prototype, name, {
	    get: function() {
	      onCall();
	      return this;
	    },
	    enumerable: true
	  });
	};

	/**
	 * Create alias for some `Assertion` property
	 *
	 * @memberOf Assertion
	 * @category assertion
	 * @static
	 * @param {String} from Name of to map
	 * @param {String} to Name of alias
	 * @example
	 *
	 * Assertion.alias('true', 'True');
	 */
	Assertion.alias = function(from, to) {
	  var desc = Object.getOwnPropertyDescriptor(Assertion.prototype, from);
	  if(!desc) throw new Error('Alias ' + from + ' -> ' + to + ' could not be created as ' + from + ' not defined');
	  Object.defineProperty(Assertion.prototype, to, desc);
	};

	Assertion.prototype = {
	  constructor: Assertion,

	  /**
	   * Base method for assertions. Before calling this method need to fill Assertion#params object. This method usually called from other assertion methods.
	   * `Assertion#params` can contain such properties:
	   * * `operator` - required string containing description of this assertion
	   * * `obj` - optional replacement for this.obj, it usefull if you prepare more clear object then given
	   * * `message` - if this property filled with string any others will be ignored and this one used as assertion message
	   * * `expected` - any object used when you need to assert relation between given object and expected. Like given == expected (== is a relation)
	   * * `details` - additional string with details to generated message
	   *
	   * @memberOf Assertion
	   * @category assertion
	   * @param {*} expr Any expression that will be used as a condition for asserting.
	   * @example
	   *
	   * var a = new should.Assertion(42);
	   *
	   * a.params = {
	   *  operator: 'to be magic number',
	   * }
	   *
	   * a.assert(false);
	   * //throws AssertionError: expected 42 to be magic number
	   */
	  assert: function(expr) {
	    if(expr) return this;

	    var params = this.params;

	    if('obj' in params && !('actual' in params)) {
	      params.actual = params.obj;
	    } else if(!('obj' in params) && !('actual' in params)) {
	      params.actual = this.obj;
	    }

	    params.stackStartFunction = params.stackStartFunction || this.assert;
	    params.negate = this.negate;

	    params.assertion = this;

	    throw new AssertionError(params);
	  },

	  /**
	   * Shortcut for `Assertion#assert(false)`.
	   *
	   * @memberOf Assertion
	   * @category assertion
	   * @example
	   *
	   * var a = new should.Assertion(42);
	   *
	   * a.params = {
	   *  operator: 'to be magic number',
	   * }
	   *
	   * a.fail();
	   * //throws AssertionError: expected 42 to be magic number
	   */
	  fail: function() {
	    return this.assert(false);
	  },

	  /**
	   * Negation modifier. Current assertion chain become negated. Each call invert negation on current assertion.
	   *
	   * @memberOf Assertion
	   * @category assertion
	   */
	  get not() {
	    this.negate = !this.negate;
	    return this;
	  },

	  /**
	   * Any modifier - it affect on execution of sequenced assertion to do not `check all`, but `check any of`.
	   *
	   * @memberOf Assertion
	   * @category assertion
	   */
	  get any() {
	    this.anyOne = true;
	    return this;
	  }
	};

	module.exports = Assertion;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Should
	 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	var util = __webpack_require__(20)
	  , assert = __webpack_require__(33)
	  , AssertionError = __webpack_require__(30);

	module.exports = function(should) {
	  var i = should.format;

	  /*
	   * Expose assert to should
	   *
	   * This allows you to do things like below
	   * without require()ing the assert module.
	   *
	   *    should.equal(foo.bar, undefined);
	   *
	   */
	  util.merge(should, assert);

	  /**
	   * Assert _obj_ exists, with optional message.
	   *
	   * @static
	   * @memberOf should
	   * @category assertion assert
	   * @alias should.exists
	   * @param {*} obj
	   * @param {String} [msg]
	   * @example
	   *
	   * should.exist(1);
	   * should.exist(new Date());
	   */
	  should.exist = should.exists = function(obj, msg) {
	    if(null == obj) {
	      throw new AssertionError({
	        message: msg || ('expected ' + i(obj) + ' to exist'), stackStartFunction: should.exist
	      });
	    }
	  };

	  should.not = {};
	  /**
	   * Asserts _obj_ does not exist, with optional message.
	   *
	   * @name not.exist
	   * @static
	   * @memberOf should
	   * @category assertion assert
	   * @alias should.not.exists
	   * @param {*} obj
	   * @param {String} [msg]
	   * @example
	   *
	   * should.not.exist(null);
	   * should.not.exist(void 0);
	   */
	  should.not.exist = should.not.exists = function(obj, msg) {
	    if(null != obj) {
	      throw new AssertionError({
	        message: msg || ('expected ' + i(obj) + ' to not exist'), stackStartFunction: should.not.exist
	      });
	    }
	  };
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// implement assert interface using already written peaces of should.js

	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	// when used in node, this will actually load the util module we depend on
	// versus loading the builtin util module as happens otherwise
	// this is a bug in node module loading as far as I am concerned
	var Assertion = __webpack_require__(31);

	var _deepEqual = __webpack_require__(34);

	var pSlice = Array.prototype.slice;

	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.

	var assert = module.exports = ok;

	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.
	/**
	 * Node.js standard [`assert.fail`](http://nodejs.org/api/assert.html#assert_assert_fail_actual_expected_message_operator).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} actual Actual object
	 * @param {*} expected Expected object
	 * @param {string} message Message for assertion
	 * @param {string} operator Operator text
	 */
	function fail(actual, expected, message, operator, stackStartFunction) {
	  var a = new Assertion(actual);
	  a.params = {
	    operator: operator,
	    expected: expected,
	    message: message,
	    stackStartFunction: stackStartFunction || fail
	  };

	  a.fail();
	}

	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;

	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.
	/**
	 * Node.js standard [`assert.ok`](http://nodejs.org/api/assert.html#assert_assert_value_message_assert_ok_value_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} value
	 * @param {string} [message]
	 */
	function ok(value, message) {
	  if(!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;

	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);

	/**
	 * Node.js standard [`assert.equal`](http://nodejs.org/api/assert.html#assert_assert_equal_actual_expected_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} actual
	 * @param {*} expected
	 * @param {string} [message]
	 */
	assert.equal = function equal(actual, expected, message) {
	  if(actual != expected) fail(actual, expected, message, '==', assert.equal);
	};

	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);
	/**
	 * Node.js standard [`assert.notEqual`](http://nodejs.org/api/assert.html#assert_assert_notequal_actual_expected_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} actual
	 * @param {*} expected
	 * @param {string} [message]
	 */
	assert.notEqual = function notEqual(actual, expected, message) {
	  if(actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};

	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);
	/**
	 * Node.js standard [`assert.deepEqual`](http://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} actual
	 * @param {*} expected
	 * @param {string} [message]
	 */
	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if(!_deepEqual(actual, expected).result) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};


	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);
	/**
	 * Node.js standard [`assert.notDeepEqual`](http://nodejs.org/api/assert.html#assert_assert_notdeepequal_actual_expected_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} actual
	 * @param {*} expected
	 * @param {string} [message]
	 */
	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if(_deepEqual(actual, expected).result) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};

	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);
	/**
	 * Node.js standard [`assert.strictEqual`](http://nodejs.org/api/assert.html#assert_assert_strictequal_actual_expected_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} actual
	 * @param {*} expected
	 * @param {string} [message]
	 */
	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if(actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};

	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);
	/**
	 * Node.js standard [`assert.notStrictEqual`](http://nodejs.org/api/assert.html#assert_assert_notstrictequal_actual_expected_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {*} actual
	 * @param {*} expected
	 * @param {string} [message]
	 */
	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if(actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};

	function expectedException(actual, expected) {
	  if(!actual || !expected) {
	    return false;
	  }

	  if(Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  } else if(actual instanceof expected) {
	    return true;
	  } else if(expected.call({}, actual) === true) {
	    return true;
	  }

	  return false;
	}

	function _throws(shouldThrow, block, expected, message) {
	  var actual;

	  if(typeof expected == 'string') {
	    message = expected;
	    expected = null;
	  }

	  try {
	    block();
	  } catch(e) {
	    actual = e;
	  }

	  message = (expected && expected.name ? ' (' + expected.name + ')' : '.') +
	  (message ? ' ' + message : '.');

	  if(shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }

	  if(!shouldThrow && expectedException(actual, expected)) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }

	  if((shouldThrow && actual && expected && !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}

	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);
	/**
	 * Node.js standard [`assert.throws`](http://nodejs.org/api/assert.html#assert_assert_throws_block_error_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {Function} block
	 * @param {Function} [error]
	 * @param {String} [message]
	 */
	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws.apply(this, [true].concat(pSlice.call(arguments)));
	};

	// EXTENSION! This is annoying to write outside this module.
	/**
	 * Node.js standard [`assert.doesNotThrow`](http://nodejs.org/api/assert.html#assert_assert_doesnotthrow_block_message).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {Function} block
	 * @param {String} [message]
	 */
	assert.doesNotThrow = function(block, /*optional*/message) {
	  _throws.apply(this, [false].concat(pSlice.call(arguments)));
	};

	/**
	 * Node.js standard [`assert.ifError`](http://nodejs.org/api/assert.html#assert_assert_iferror_value).
	 * @static
	 * @memberOf should
	 * @category assertion assert
	 * @param {Error} err
	 */
	assert.ifError = function(err) {
	  if(err) {
	    throw err;
	  }
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var getType = __webpack_require__(21);
	var format = __webpack_require__(35);
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function makeResult(r, path, reason, a, b) {
	  var o = {result: r};
	  if(!r) {
	    o.path = path;
	    o.reason = reason;
	    o.a = a;
	    o.b = b;
	  }
	  return o;
	}

	var EQUALS = makeResult(true);

	function typeToString(t) {
	  return t.type + (t.cls ? '(' + t.cls + (t.sub ? ' ' + t.sub : '') + ')' : '');
	}



	var REASON = {
	  PLUS_0_AND_MINUS_0: '+0 is not equal to -0',
	  DIFFERENT_TYPES: 'A has type %s and B has type %s',
	  NAN_NUMBER: 'NaN is not equal to any number',
	  EQUALITY: 'A is not equal to B',
	  EQUALITY_PROTOTYPE: 'A and B have different prototypes',
	  WRAPPED_VALUE: 'A wrapped value is not equal to B wrapped value',
	  FUNCTION_SOURCES: 'function A is not equal to B by source code value (via .toString call)',
	  MISSING_KEY: '%s has no key %s',
	  CIRCULAR_VALUES: 'A has circular reference that was visited not in the same time as B',
	  SET_MAP_MISSING_KEY: 'Set/Map missing key',
	  MAP_VALUE_EQUALITY: 'Values of the same key in A and B is not equal'
	};

	function eqInternal(a, b, opts, stackA, stackB, path) {
	  var r = EQUALS;

	  function result(comparison, reason) {
	    return makeResult(comparison, path, reason, a, b);
	  }

	  function checkPropertyEquality(property) {
	    return eqInternal(a[property], b[property], opts, stackA, stackB, path.concat([property]));
	  }


	  // equal a and b exit early
	  if(a === b) {
	    // check for +0 !== -0;
	    return result(a !== 0 || (1 / a == 1 / b), REASON.PLUS_0_AND_MINUS_0);
	  }

	  var l, p;

	  var typeA = getType(a),
	    typeB = getType(b);

	  // if objects has different types they are not equals
	  var typeDifferents = typeA.type !== typeB.type || typeA.cls !== typeB.cls;

	  if(typeDifferents || ((opts.checkSubType && typeA.sub !== typeB.sub) || !opts.checkSubType)) {
	    return result(false, format(REASON.DIFFERENT_TYPES, typeToString(typeA), typeToString(typeB)));
	  }

	  //early checks for types
	  switch(typeA.type) {
	    case 'number':
	      // NaN !== NaN
	      return (a !== a) ? result(b !== b, REASON.NAN_NUMBER)
	        // but treat `+0` vs. `-0` as not equal
	        : (a === 0 ? result(1 / a === 1 / b, REASON.PLUS_0_AND_MINUS_0) : result(a === b, REASON.EQUALITY));

	    case 'boolean':
	    case 'string':
	      return result(a === b, REASON.EQUALITY);

	    case 'function':
	      var fA = a.toString(), fB = b.toString();
	      r = eqInternal(fA, fB, opts, stackA, stackB, path);
	      if(!r.result) {
	        r.reason = REASON.FUNCTION_SOURCES;
	        return r;
	      }

	      break;//check user properties

	    case 'object':
	      // additional checks for object instances
	      switch(typeA.cls) {
	        // check regexp flags
	        // TODO add es6 flags
	        case 'regexp':
	          p = ['source', 'global', 'multiline', 'lastIndex', 'ignoreCase'];
	          while(p.length) {
	            r = checkPropertyEquality(p.shift());
	            if(!r.result) return r;
	          }
	          break;//check user properties

	        //check by timestamp only
	        case 'date':
	          if(+a !== +b) {
	            return result(false, REASON.EQUALITY);
	          }
	          break;//check user properties

	        //primitive type wrappers
	        case 'number':
	        case 'boolean':
	        case 'string':
	          r = eqInternal(a.valueOf(), b.valueOf(), opts, stackA, stackB, path);
	          if(!r.result) {
	            r.reason = REASON.WRAPPED_VALUE;
	            return r;
	          }
	          break;//check user properties

	        //node buffer
	        case 'buffer':
	          //if length different it is obviously different
	          r = checkPropertyEquality('length');
	          if(!r.result) return r;

	          l = a.length;
	          while(l--) {
	            r = checkPropertyEquality(l);
	            if(!r.result) return r;
	          }

	          //we do not check for user properties because
	          //node Buffer have some strange hidden properties
	          return EQUALS;

	        case 'error':
	          //check defined properties
	          p = ['name', 'message'];
	          while(p.length) {
	            r = checkPropertyEquality(p.shift());
	            if(!r.result) return r;
	          }

	          break;//check user properties

	        case 'array':
	        case 'arguments':
	        case 'typed-array':
	          r = checkPropertyEquality('length');
	          if(!r.result) return r;

	          break;//check user properties

	        case 'array-buffer':
	          r = checkPropertyEquality('byteLength');
	          if(!r.result) return r;

	          break;//check user properties

	        case 'map':
	        case 'set':
	          r = checkPropertyEquality('size');
	          if(!r.result) return r;

	          stackA.push(a);
	          stackB.push(b);

	          var itA = a.entries();
	          var nextA = itA.next();

	          while(!nextA.done) {
	            var key = nextA.value[0];
	            //first check for primitive key if we can do light check
	            //using .has and .get
	            if(getType(key).type != 'object') {
	              if(b.has(key)) {
	                if(typeA.cls == 'map') {
	                  //for map we also check its value to be equal
	                  var value = b.get(key);
	                  r = eqInternal(nextA.value[1], value, opts, stackA, stackB, path);
	                  if(!r.result) {
	                    r.a = nextA.value;
	                    r.b = value;
	                    r.reason = REASON.MAP_VALUE_EQUALITY;

	                    break;
	                  }
	                }

	              } else {
	                r = result(false, REASON.SET_MAP_MISSING_KEY);
	                r.a = key;
	                r.b = key;

	                break;
	              }
	            } else {
	              //heavy check
	              //we search by iterator for key equality using equal
	              var itB = b.entries();
	              var nextB = itB.next();

	              while(!nextB.done) {
	                //first check for keys
	                r = eqInternal(nextA.value[0], nextB.value[0], opts, stackA, stackB, path);

	                if(!r.result) {
	                  r.reason = REASON.SET_MAP_MISSING_KEY;
	                  r.a = key;
	                  r.b = key;
	                } else {
	                  if(typeA.cls == 'map') {
	                    r = eqInternal(nextA.value[1], nextB.value[1], opts, stackA, stackB, path);

	                    if(!r.result) {
	                      r.a = nextA.value;
	                      r.b = nextB.value;
	                      r.reason = REASON.MAP_VALUE_EQUALITY;
	                    }
	                  }

	                  break;
	                }

	                nextB = itB.next();
	              }
	            }

	            if(!r.result) {
	              break;
	            }

	            nextA = itA.next();
	          }

	          stackA.pop();
	          stackB.pop();

	          if(!r.result) {
	            r.reason = REASON.SET_MAP_MISSING_ENTRY;
	            return r;
	          }

	          break; //check user properties
	      }
	  }

	  // compare deep objects and arrays
	  // stacks contain references only
	  //

	  l = stackA.length;
	  while(l--) {
	    if(stackA[l] == a) {
	      return result(stackB[l] == b, REASON.CIRCULAR_VALUES);
	    }
	  }

	  // add `a` and `b` to the stack of traversed objects
	  stackA.push(a);
	  stackB.push(b);

	  var key;

	  for(key in b) {
	    if(hasOwnProperty.call(b, key)) {
	      r = result(hasOwnProperty.call(a, key), format(REASON.MISSING_KEY, 'A', key));
	      if(!r.result) {
	        break;
	      }

	      if(r.result) {
	        r = checkPropertyEquality(key);
	        if(!r.result) {
	          break;
	        }
	      }
	    }
	  }

	  if(r.result) {
	    // ensure both objects have the same number of properties
	    for(key in a) {
	      if(hasOwnProperty.call(a, key)) {
	        r = result(hasOwnProperty.call(b, key), format(REASON.MISSING_KEY, 'B', key));
	        if(!r.result) {
	          return r;
	        }
	      }
	    }
	  }

	  stackA.pop();
	  stackB.pop();

	  if(!r.result) return r;

	  var prototypesEquals = false, canComparePrototypes = false;

	  if(opts.checkProtoEql) {
	    if(Object.getPrototypeOf) {//TODO should i check prototypes for === or use eq?
	      prototypesEquals = Object.getPrototypeOf(a) === Object.getPrototypeOf(b);
	      canComparePrototypes = true;
	    } else if(a.__proto__ && b.__proto__) {
	      prototypesEquals = a.__proto__ === b.__proto__;
	      canComparePrototypes = true;
	    }

	    if(canComparePrototypes && !prototypesEquals) {
	      r = result(prototypesEquals, REASON.EQUALITY_PROTOTYPE);
	      r.showReason = true;
	      if(!r.result) {
	        return r;
	      }
	    }
	  }

	  return EQUALS;
	}

	var defaultOptions = {
	  checkProtoEql: true,
	  checkSubType: true
	};

	function eq(a, b, opts) {
	  opts = opts || {};
	  if(typeof opts.checkProtoEql !== 'boolean')
	    opts.checkProtoEql = defaultOptions.checkProtoEql;
	  if(typeof opts.checkSubType !== 'boolean')
	    opts.checkSubType = defaultOptions.checkSubType;

	  var r = eqInternal(a, b, opts, [], [], []);
	  return r;
	}

	module.exports = eq;

	eq.r = REASON;


/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function format(msg) {
	  var args = arguments;
	  for(var i = 1, l = args.length; i < l; i++) {
	    msg = msg.replace(/%s/, args[i]);
	  }
	  return msg;
	}


/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = function(should, Assertion) {
	  /**
	   * Simple chaining. It actually do nothing.
	   *
	   * @memberOf Assertion
	   * @name be
	   * @property {should.Assertion} be
	   * @alias Assertion#an
	   * @alias Assertion#of
	   * @alias Assertion#a
	   * @alias Assertion#and
	   * @alias Assertion#have
	   * @alias Assertion#has
	   * @alias Assertion#with
	   * @alias Assertion#is
	   * @alias Assertion#which
	   * @alias Assertion#the
	   * @alias Assertion#it
	   * @category assertion chaining
	   */
	  ['an', 'of', 'a', 'and', 'be', 'has', 'have', 'with', 'is', 'which', 'the', 'it'].forEach(function(name) {
	    Assertion.addChain(name);
	  });
	};


/***/ },
/* 37 */
/***/ function(module, exports) {

	/*
	 * Should
	 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	module.exports = function(should, Assertion) {
	  /**
	   * Assert given object is exactly `true`.
	   *
	   * @name true
	   * @memberOf Assertion
	   * @category assertion bool
	   * @alias Assertion#True
	   * @example
	   *
	   * (true).should.be.true();
	   * false.should.not.be.true();
	   *
	   * ({ a: 10}).should.not.be.true();
	   */
	  Assertion.add('true', function() {
	    this.is.exactly(true);
	  });

	  Assertion.alias('true', 'True');

	  /**
	   * Assert given object is exactly `false`.
	   *
	   * @name false
	   * @memberOf Assertion
	   * @category assertion bool
	   * @alias Assertion#False
	   * @example
	   *
	   * (true).should.not.be.false();
	   * false.should.be.false();
	   */
	  Assertion.add('false', function() {
	    this.is.exactly(false);
	  });

	  Assertion.alias('false', 'False');

	  /**
	   * Assert given object is thuthy according javascript type conversions.
	   *
	   * @name ok
	   * @memberOf Assertion
	   * @category assertion bool
	   * @example
	   *
	   * (true).should.be.ok();
	   * ''.should.not.be.ok();
	   * should(null).not.be.ok();
	   * should(void 0).not.be.ok();
	   *
	   * (10).should.be.ok();
	   * (0).should.not.be.ok();
	   */
	  Assertion.add('ok', function() {
	    this.params = { operator: 'to be truthy' };

	    this.assert(this.obj);
	  });
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	/*
	 * Should
	 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	module.exports = function(should, Assertion) {

	  /**
	   * Assert given object is NaN
	   * @name NaN
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @example
	   *
	   * (10).should.not.be.NaN();
	   * NaN.should.be.NaN();
	   */
	  Assertion.add('NaN', function() {
	    this.params = { operator: 'to be NaN' };

	    this.assert(this.obj !== this.obj);
	  });

	  /**
	   * Assert given object is not finite (positive or negative)
	   *
	   * @name Infinity
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @example
	   *
	   * (10).should.not.be.Infinity();
	   * NaN.should.not.be.Infinity();
	   */
	  Assertion.add('Infinity', function() {
	    this.params = { operator: 'to be Infinity' };

	    this.is.a.Number()
	      .and.not.a.NaN()
	      .and.assert(!isFinite(this.obj));
	  });

	  /**
	   * Assert given number between `start` and `finish` or equal one of them.
	   *
	   * @name within
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @param {number} start Start number
	   * @param {number} finish Finish number
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * (10).should.be.within(0, 20);
	   */
	  Assertion.add('within', function(start, finish, description) {
	    this.params = { operator: 'to be within ' + start + '..' + finish, message: description };

	    this.assert(this.obj >= start && this.obj <= finish);
	  });

	  /**
	   * Assert given number near some other `value` within `delta`
	   *
	   * @name approximately
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @param {number} value Center number
	   * @param {number} delta Radius
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * (9.99).should.be.approximately(10, 0.1);
	   */
	  Assertion.add('approximately', function(value, delta, description) {
	    this.params = { operator: 'to be approximately ' + value + ' ±' + delta, message: description };

	    this.assert(Math.abs(this.obj - value) <= delta);
	  });

	  /**
	   * Assert given number above `n`.
	   *
	   * @name above
	   * @alias Assertion#greaterThan
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @param {number} n Margin number
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * (10).should.be.above(0);
	   */
	  Assertion.add('above', function(n, description) {
	    this.params = { operator: 'to be above ' + n, message: description };

	    this.assert(this.obj > n);
	  });

	  /**
	   * Assert given number below `n`.
	   *
	   * @name below
	   * @alias Assertion#lessThan
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @param {number} n Margin number
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * (0).should.be.below(10);
	   */
	  Assertion.add('below', function(n, description) {
	    this.params = { operator: 'to be below ' + n, message: description };

	    this.assert(this.obj < n);
	  });

	  Assertion.alias('above', 'greaterThan');
	  Assertion.alias('below', 'lessThan');

	  /**
	   * Assert given number above `n`.
	   *
	   * @name aboveOrEqual
	   * @alias Assertion#greaterThanOrEqual
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @param {number} n Margin number
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * (10).should.be.aboveOrEqual(0);
	   * (10).should.be.aboveOrEqual(10);
	   */
	  Assertion.add('aboveOrEqual', function(n, description) {
	    this.params = { operator: 'to be above or equal' + n, message: description };

	    this.assert(this.obj >= n);
	  });

	  /**
	   * Assert given number below `n`.
	   *
	   * @name belowOrEqual
	   * @alias Assertion#lessThanOrEqual
	   * @memberOf Assertion
	   * @category assertion numbers
	   * @param {number} n Margin number
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * (0).should.be.belowOrEqual(10);
	   * (0).should.be.belowOrEqual(0);
	   */
	  Assertion.add('belowOrEqual', function(n, description) {
	    this.params = { operator: 'to be below or equal' + n, message: description };

	    this.assert(this.obj <= n);
	  });

	  Assertion.alias('aboveOrEqual', 'greaterThanOrEqual');
	  Assertion.alias('belowOrEqual', 'lessThanOrEqual');

	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Should
	 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	var eql = __webpack_require__(34);
	var type = __webpack_require__(21);
	var util = __webpack_require__(20);

	function formatEqlResult(r, a, b) {
	  return ((r.path.length > 0 ? 'at ' + r.path.map(util.formatProp).join(' -> ') : '') +
	  (r.a === a ? '' : ', A has ' + util.format(r.a)) +
	  (r.b === b ? '' : ' and B has ' + util.format(r.b)) +
	  (r.showReason ? ' because ' + r.reason : '')).trim();
	}

	module.exports = function(should, Assertion) {

	  /**
	   * Deep object equality comparison. For full spec see [`should-equal tests`](https://github.com/shouldjs/equal/blob/master/test.js).
	   *
	   * @name eql
	   * @memberOf Assertion
	   * @category assertion equality
	   * @alias Assertion#deepEqual
	   * @param {*} val Expected value
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * (10).should.be.eql(10);
	   * ('10').should.not.be.eql(10);
	   * (-0).should.not.be.eql(+0);
	   *
	   * NaN.should.be.eql(NaN);
	   *
	   * ({ a: 10}).should.be.eql({ a: 10 });
	   * [ 'a' ].should.not.be.eql({ '0': 'a' });
	   */
	  Assertion.add('eql', function(val, description) {
	    this.params = {operator: 'to equal', expected: val, message: description};

	    var result = eql(this.obj, val, should.config);
	    this.params.details = result.result ? '' : formatEqlResult(result, this.obj, val);

	    this.params.showDiff = eql(type(this.obj), type(val)).result;

	    this.assert(result.result);
	  });

	  /**
	   * Exact comparison using ===.
	   *
	   * @name equal
	   * @memberOf Assertion
	   * @category assertion equality
	   * @alias Assertion#exactly
	   * @param {*} val Expected value
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * 10.should.be.equal(10);
	   * 'a'.should.be.exactly('a');
	   *
	   * should(null).be.exactly(null);
	   */
	  Assertion.add('equal', function(val, description) {
	    this.params = {operator: 'to be', expected: val, message: description};

	    this.params.showDiff = eql(type(this.obj), type(val)).result;

	    this.assert(val === this.obj);
	  });

	  Assertion.alias('equal', 'exactly');
	  Assertion.alias('eql', 'deepEqual');

	  function addOneOf(name, message, method) {
	    Assertion.add(name, function(vals) {
	      if(arguments.length !== 1) {
	        vals = Array.prototype.slice.call(arguments);
	      } else {
	        should(vals).be.Array();
	      }

	      this.params = {operator: message, expected: vals};

	      var obj = this.obj;
	      var found = false;

	      util.forEach(vals, function(val) {
	        try {
	          should(val)[method](obj);
	          found = true;
	          return false;
	        } catch(e) {
	          if(e instanceof should.AssertionError) {
	            return;//do nothing
	          }
	          throw e;
	        }
	      });

	      this.assert(found);
	    });
	  }

	  /**
	   * Exact comparison using === to be one of supplied objects.
	   *
	   * @name equalOneOf
	   * @memberOf Assertion
	   * @category assertion equality
	   * @param {Array|*} vals Expected values
	   * @example
	   *
	   * 'ab'.should.be.equalOneOf('a', 10, 'ab');
	   * 'ab'.should.be.equalOneOf(['a', 10, 'ab']);
	   */
	  addOneOf('equalOneOf', 'to be equals one of', 'equal');

	  /**
	   * Exact comparison using .eql to be one of supplied objects.
	   *
	   * @name oneOf
	   * @memberOf Assertion
	   * @category assertion equality
	   * @param {Array|*} vals Expected values
	   * @example
	   *
	   * ({a: 10}).should.be.oneOf('a', 10, 'ab', {a: 10});
	   * ({a: 10}).should.be.oneOf(['a', 10, 'ab', {a: 10}]);
	   */
	  addOneOf('oneOf', 'to be one of', 'eql');

	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Should
	 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	var util = __webpack_require__(20);

	module.exports = function(should, Assertion) {
	  /**
	   * Assert given object is number
	   * @name Number
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('Number', function() {
	    this.params = {operator: 'to be a number'};

	    this.have.type('number');
	  });

	  /**
	   * Assert given object is arguments
	   * @name arguments
	   * @alias Assertion#Arguments
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('arguments', function() {
	    this.params = {operator: 'to be arguments'};

	    this.have.class('Arguments');
	  });

	  Assertion.alias('arguments', 'Arguments');

	  /**
	   * Assert given object has some type using `typeof`
	   * @name type
	   * @memberOf Assertion
	   * @param {string} type Type name
	   * @param {string} [description] Optional message
	   * @category assertion types
	   */
	  Assertion.add('type', function(type, description) {
	    this.params = {operator: 'to have type ' + type, message: description};

	    should(typeof this.obj).be.exactly(type);
	  });

	  /**
	   * Assert given object is instance of `constructor`
	   * @name instanceof
	   * @alias Assertion#instanceOf
	   * @memberOf Assertion
	   * @param {Function} constructor Constructor function
	   * @param {string} [description] Optional message
	   * @category assertion types
	   */
	  Assertion.add('instanceof', function(constructor, description) {
	    this.params = {operator: 'to be an instance of ' + util.functionName(constructor), message: description};

	    this.assert(Object(this.obj) instanceof constructor);
	  });

	  Assertion.alias('instanceof', 'instanceOf');

	  /**
	   * Assert given object is function
	   * @name Function
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('Function', function() {
	    this.params = {operator: 'to be a function'};

	    this.have.type('function');
	  });

	  /**
	   * Assert given object is object
	   * @name Object
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('Object', function() {
	    this.params = {operator: 'to be an object'};

	    this.is.not.null().and.have.type('object');
	  });

	  /**
	   * Assert given object is string
	   * @name String
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('String', function() {
	    this.params = {operator: 'to be a string'};

	    this.have.type('string');
	  });

	  /**
	   * Assert given object is array
	   * @name Array
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('Array', function() {
	    this.params = {operator: 'to be an array'};

	    this.have.class('Array');
	  });

	  /**
	   * Assert given object is boolean
	   * @name Boolean
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('Boolean', function() {
	    this.params = {operator: 'to be a boolean'};

	    this.have.type('boolean');
	  });

	  /**
	   * Assert given object is error
	   * @name Error
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('Error', function() {
	    this.params = {operator: 'to be an error'};

	    this.have.instanceOf(Error);
	  });

	  /**
	   * Assert given object is null
	   * @name null
	   * @alias Assertion#Null
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('null', function() {
	    this.params = {operator: 'to be null'};

	    this.assert(this.obj === null);
	  });

	  Assertion.alias('null', 'Null');

	  /**
	   * Assert given object has some internal [[Class]], via Object.prototype.toString call
	   * @name class
	   * @alias Assertion#Class
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('class', function(cls) {
	    this.params = {operator: 'to have [[Class]] ' + cls};

	    this.assert(Object.prototype.toString.call(this.obj) === '[object ' + cls + ']');
	  });

	  Assertion.alias('class', 'Class');

	  /**
	   * Assert given object is undefined
	   * @name undefined
	   * @alias Assertion#Undefined
	   * @memberOf Assertion
	   * @category assertion types
	   */
	  Assertion.add('undefined', function() {
	    this.params = {operator: 'to be undefined'};

	    this.assert(this.obj === void 0);
	  });

	  Assertion.alias('undefined', 'Undefined');

	  /**
	   * Assert given object supports es6 iterable protocol (just check
	   * that object has property Symbol.iterator, which is a function)
	   * @name iterable
	   * @memberOf Assertion
	   * @category assertion es6
	   */
	  Assertion.add('iterable', function() {
	    this.params = {operator: 'to be iterable'};

	    should(this.obj).have.property(Symbol.iterator).which.is.a.Function();
	  });

	  /**
	   * Assert given object supports es6 iterator protocol (just check
	   * that object has property next, which is a function)
	   * @name iterator
	   * @memberOf Assertion
	   * @category assertion es6
	   */
	  Assertion.add('iterator', function() {
	    this.params = {operator: 'to be iterator'};

	    should(this.obj).have.property('next').which.is.a.Function();
	  });

	  /**
	   * Assert given object is a generator object
	   * @name generator
	   * @memberOf Assertion
	   * @category assertion es6
	   */
	  Assertion.add('generator', function() {
	    this.params = {operator: 'to be generator'};

	    should(this.obj).be.iterable
	      .and.iterator
	      .and.it.is.equal(this.obj[Symbol.iterator]());
	  });
	};


/***/ },
/* 41 */
/***/ function(module, exports) {

	/*
	 * Should
	 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	module.exports = function(should, Assertion) {
	  /**
	   * Assert given string starts with prefix
	   * @name startWith
	   * @memberOf Assertion
	   * @category assertion strings
	   * @param {string} str Prefix
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * 'abc'.should.startWith('a');
	   */
	  Assertion.add('startWith', function(str, description) {
	    this.params = { operator: 'to start with ' + should.format(str), message: description };

	    this.assert(0 === this.obj.indexOf(str));
	  });

	  /**
	   * Assert given string starts with prefix
	   * @name endWith
	   * @memberOf Assertion
	   * @category assertion strings
	   * @param {string} str Prefix
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * 'abca'.should.endWith('a');
	   */
	  Assertion.add('endWith', function(str, description) {
	    this.params = { operator: 'to end with ' + should.format(str), message: description };

	    this.assert(this.obj.indexOf(str, this.obj.length - str.length) >= 0);
	  });
	};


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Should
	 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	var util = __webpack_require__(20);
	var eql = __webpack_require__(34);

	var aSlice = Array.prototype.slice;

	module.exports = function(should, Assertion) {
	  var i = should.format;
	  /**
	   * Asserts given object has some descriptor. **On success it change given object to be value of property**.
	   *
	   * @name propertyWithDescriptor
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {string} name Name of property
	   * @param {Object} desc Descriptor like used in Object.defineProperty (not required to add all properties)
	   * @example
	   *
	   * ({ a: 10 }).should.have.propertyWithDescriptor('a', { enumerable: true });
	   */
	  Assertion.add('propertyWithDescriptor', function(name, desc) {
	    this.params = {actual: this.obj, operator: 'to have own property with descriptor ' + i(desc)};
	    var obj = this.obj;
	    this.have.ownProperty(name);
	    should(Object.getOwnPropertyDescriptor(Object(obj), name)).have.properties(desc);
	  });

	  function processPropsArgs() {
	    var args = {};
	    if(arguments.length > 1) {
	      args.names = aSlice.call(arguments);
	    } else {
	      var arg = arguments[0];
	      if(typeof arg === 'string') {
	        args.names = [arg];
	      } else if(util.isIndexable(arg)) {
	        args.names = arg;
	      } else {
	        args.names = Object.keys(arg);
	        args.values = arg;
	      }
	    }
	    return args;
	  }


	  /**
	   * Asserts given object has enumerable property with optionally value. **On success it change given object to be value of property**.
	   *
	   * @name enumerable
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {string} name Name of property
	   * @param {*} [val] Optional property value to check
	   * @example
	   *
	   * ({ a: 10 }).should.have.enumerable('a');
	   */
	  Assertion.add('enumerable', function(name, val) {
	    name = util.convertPropertyName(name);

	    this.params = {
	      operator: "to have enumerable property " + util.formatProp(name) + (arguments.length > 1 ? " equal to " + i(val): "")
	    };

	    var desc = { enumerable: true };
	    if(arguments.length > 1) desc.value = val;
	    this.have.propertyWithDescriptor(name, desc);
	  });

	  /**
	   * Asserts given object has enumerable properties
	   *
	   * @name enumerables
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {Array|...string|Object} names Names of property
	   * @example
	   *
	   * ({ a: 10, b: 10 }).should.have.enumerables('a');
	   */
	  Assertion.add('enumerables', function(names) {
	    var args = processPropsArgs.apply(null, arguments);

	    this.params = {
	      operator: "to have enumerables " + args.names.map(util.formatProp)
	    };

	    var obj = this.obj;
	    args.names.forEach(function(name) {
	      should(obj).have.enumerable(name);
	    });
	  });

	  /**
	   * Asserts given object has property with optionally value. **On success it change given object to be value of property**.
	   *
	   * @name property
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {string} name Name of property
	   * @param {*} [val] Optional property value to check
	   * @example
	   *
	   * ({ a: 10 }).should.have.property('a');
	   */
	  Assertion.add('property', function(name, val) {
	    name = util.convertPropertyName(name);
	    if(arguments.length > 1) {
	      var p = {};
	      p[name] = val;
	      this.have.properties(p);
	    } else {
	      this.have.properties(name);
	    }
	    this.obj = this.obj[name];
	  });

	  /**
	   * Asserts given object has properties. On this method affect .any modifier, which allow to check not all properties.
	   *
	   * @name properties
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {Array|...string|Object} names Names of property
	   * @example
	   *
	   * ({ a: 10 }).should.have.properties('a');
	   * ({ a: 10, b: 20 }).should.have.properties([ 'a' ]);
	   * ({ a: 10, b: 20 }).should.have.properties({ b: 20 });
	   */
	  Assertion.add('properties', function(names) {
	    var values = {};
	    if(arguments.length > 1) {
	      names = aSlice.call(arguments);
	    } else if(!Array.isArray(names)) {
	      if(typeof names == 'string' || typeof names == 'symbol') {
	        names = [names];
	      } else {
	        values = names;
	        names = Object.keys(names);
	      }
	    }

	    var obj = Object(this.obj), missingProperties = [];

	    //just enumerate properties and check if they all present
	    names.forEach(function(name) {
	      if(!(name in obj)) missingProperties.push(util.formatProp(name));
	    });

	    var props = missingProperties;
	    if(props.length === 0) {
	      props = names.map(util.formatProp);
	    } else if(this.anyOne) {
	      props = names.filter(function(name) {
	        return missingProperties.indexOf(util.formatProp(name)) < 0;
	      }).map(util.formatProp);
	    }

	    var operator = (props.length === 1 ?
	        'to have property ' : 'to have ' + (this.anyOne ? 'any of ' : '') + 'properties ') + props.join(', ');

	    this.params = {obj: this.obj, operator: operator};

	    //check that all properties presented
	    //or if we request one of them that at least one them presented
	    this.assert(missingProperties.length === 0 || (this.anyOne && missingProperties.length != names.length));

	    // check if values in object matched expected
	    var valueCheckNames = Object.keys(values);
	    if(valueCheckNames.length) {
	      var wrongValues = [];
	      props = [];

	      // now check values, as there we have all properties
	      valueCheckNames.forEach(function(name) {
	        var value = values[name];
	        if(!eql(obj[name], value).result) {
	          wrongValues.push(util.formatProp(name) + ' of ' + i(value) + ' (got ' + i(obj[name]) + ')');
	        } else {
	          props.push(util.formatProp(name) + ' of ' + i(value));
	        }
	      });

	      if((wrongValues.length !== 0 && !this.anyOne) || (this.anyOne && props.length === 0)) {
	        props = wrongValues;
	      }

	      operator = (props.length === 1 ?
	        'to have property ' : 'to have ' + (this.anyOne ? 'any of ' : '') + 'properties ') + props.join(', ');

	      this.params = {obj: this.obj, operator: operator};

	      //if there is no not matched values
	      //or there is at least one matched
	      this.assert(wrongValues.length === 0 || (this.anyOne && wrongValues.length != valueCheckNames.length));
	    }
	  });

	  /**
	   * Asserts given object has property `length` with given value `n`
	   *
	   * @name length
	   * @alias Assertion#lengthOf
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {number} n Expected length
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * [1, 2].should.have.length(2);
	   */
	  Assertion.add('length', function(n, description) {
	    this.have.property('length', n, description);
	  });

	  Assertion.alias('length', 'lengthOf');

	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  /**
	   * Asserts given object has own property. **On success it change given object to be value of property**.
	   *
	   * @name ownProperty
	   * @alias Assertion#hasOwnProperty
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {string} name Name of property
	   * @param {string} [description] Optional message
	   * @example
	   *
	   * ({ a: 10 }).should.have.ownProperty('a');
	   */
	  Assertion.add('ownProperty', function(name, description) {
	    name = util.convertPropertyName(name);
	    this.params = {
	      actual: this.obj,
	      operator: 'to have own property ' + util.formatProp(name),
	      message: description
	    };

	    this.assert(hasOwnProperty.call(this.obj, name));

	    this.obj = this.obj[name];
	  });

	  Assertion.alias('ownProperty', 'hasOwnProperty');

	  /**
	   * Asserts given object is empty. For strings, arrays and arguments it checks .length property, for objects it checks keys.
	   *
	   * @name empty
	   * @memberOf Assertion
	   * @category assertion property
	   * @example
	   *
	   * ''.should.be.empty();
	   * [].should.be.empty();
	   * ({}).should.be.empty();
	   */
	  Assertion.add('empty', function() {
	    this.params = {operator: 'to be empty'};

	    if(util.length(this.obj) !== void 0) {
	      should(this.obj).have.property('length', 0);
	    } else {
	      var obj = Object(this.obj); // wrap to reference for booleans and numbers
	      for(var prop in obj) {
	        should(this.obj).not.have.ownProperty(prop);
	      }
	    }
	  }, true);

	  /**
	   * Asserts given object has exact keys. Compared to `properties`, `keys` does not accept Object as a argument.
	   *
	   * @name keys
	   * @alias Assertion#key
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {Array|...string} [keys] Keys to check
	   * @example
	   *
	   * ({ a: 10 }).should.have.keys('a');
	   * ({ a: 10, b: 20 }).should.have.keys('a', 'b');
	   * ({ a: 10, b: 20 }).should.have.keys([ 'a', 'b' ]);
	   * ({}).should.have.keys();
	   */
	  Assertion.add('keys', function(keys) {
	    if(arguments.length > 1) keys = aSlice.call(arguments);
	    else if(arguments.length === 1 && typeof keys === 'string') keys = [keys];
	    else if(arguments.length === 0) keys = [];

	    keys = keys.map(String);

	    var obj = Object(this.obj);

	    // first check if some keys are missing
	    var missingKeys = [];
	    keys.forEach(function(key) {
	      if(!hasOwnProperty.call(this.obj, key))
	        missingKeys.push(util.formatProp(key));
	    }, this);

	    // second check for extra keys
	    var extraKeys = [];
	    Object.keys(obj).forEach(function(key) {
	      if(keys.indexOf(key) < 0) {
	        extraKeys.push(util.formatProp(key));
	      }
	    });

	    var verb = keys.length === 0 ? 'to be empty' :
	    'to have ' + (keys.length === 1 ? 'key ' : 'keys ');

	    this.params = {operator: verb + keys.map(util.formatProp).join(', ')};

	    if(missingKeys.length > 0)
	      this.params.operator += '\n\tmissing keys: ' + missingKeys.join(', ');

	    if(extraKeys.length > 0)
	      this.params.operator += '\n\textra keys: ' + extraKeys.join(', ');

	    this.assert(missingKeys.length === 0 && extraKeys.length === 0);
	  });

	  Assertion.alias("keys", "key");

	  /**
	   * Asserts given object has nested property in depth by path. **On success it change given object to be value of final property**.
	   *
	   * @name propertyByPath
	   * @memberOf Assertion
	   * @category assertion property
	   * @param {Array|...string} properties Properties path to search
	   * @example
	   *
	   * ({ a: {b: 10}}).should.have.propertyByPath('a', 'b').eql(10);
	   */
	  Assertion.add('propertyByPath', function(properties) {
	    if(arguments.length > 1) properties = aSlice.call(arguments);
	    else if(arguments.length === 1 && typeof properties == 'string') properties = [properties];
	    else if(arguments.length === 0) properties = [];

	    var allProps = properties.map(util.formatProp);

	    properties = properties.map(String);

	    var obj = should(Object(this.obj));

	    var foundProperties = [];

	    var currentProperty;
	    while(currentProperty = properties.shift()) {
	      this.params = {operator: 'to have property by path ' + allProps.join(', ') + ' - failed on ' + util.formatProp(currentProperty)};
	      obj = obj.have.property(currentProperty);
	      foundProperties.push(currentProperty);
	    }

	    this.params = {obj: this.obj, operator: 'to have property by path ' + allProps.join(', ')};

	    this.obj = obj.obj;
	  });
	};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Should
	 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */
	var util = __webpack_require__(20);

	module.exports = function(should, Assertion) {
	  var i = should.format;

	  /**
	   * Assert given function throws error with such message.
	   *
	   * @name throw
	   * @memberOf Assertion
	   * @category assertion errors
	   * @alias Assertion#throwError
	   * @param {string|RegExp|Function|Object|GeneratorFunction|GeneratorObject} [message] Message to match or properties
	   * @param {Object} [properties] Optional properties that will be matched to thrown error
	   * @example
	   *
	   * (function(){ throw new Error('fail') }).should.throw();
	   * (function(){ throw new Error('fail') }).should.throw('fail');
	   * (function(){ throw new Error('fail') }).should.throw(/fail/);
	   *
	   * (function(){ throw new Error('fail') }).should.throw(Error);
	   * var error = new Error();
	   * error.a = 10;
	   * (function(){ throw error; }).should.throw(Error, { a: 10 });
	   * (function(){ throw error; }).should.throw({ a: 10 });
	   * (function*() {
	   *   yield throwError();
	   * }).should.throw();
	   */
	  Assertion.add('throw', function(message, properties) {
	    var fn = this.obj
	      , err = {}
	      , errorInfo = ''
	      , thrown = false;

	    if(util.isGeneratorFunction(fn)) {
	      return should(fn()).throw(message, properties);
	    } else if(util.isGeneratorObject(fn)) {
	      return should(fn.next.bind(fn)).throw(message, properties);
	    }

	    this.is.a.Function();

	    var errorMatched = true;

	    try {
	      fn();
	    } catch(e) {
	      thrown = true;
	      err = e;
	    }

	    if(thrown) {
	      if(message) {
	        if('string' == typeof message) {
	          errorMatched = message == err.message;
	        } else if(message instanceof RegExp) {
	          errorMatched = message.test(err.message);
	        } else if('function' == typeof message) {
	          errorMatched = err instanceof message;
	        } else if(null != message) {
	          try {
	            should(err).match(message);
	          } catch(e) {
	            if(e instanceof should.AssertionError) {
	              errorInfo = ": " + e.message;
	              errorMatched = false;
	            } else {
	              throw e;
	            }
	          }
	        }

	        if(!errorMatched) {
	          if('string' == typeof message || message instanceof RegExp) {
	            errorInfo = " with a message matching " + i(message) + ", but got '" + err.message + "'";
	          } else if('function' == typeof message) {
	            errorInfo = " of type " + util.functionName(message) + ", but got " + util.functionName(err.constructor);
	          }
	        } else if('function' == typeof message && properties) {
	          try {
	            should(err).match(properties);
	          } catch(e) {
	            if(e instanceof should.AssertionError) {
	              errorInfo = ": " + e.message;
	              errorMatched = false;
	            } else {
	              throw e;
	            }
	          }
	        }
	      } else {
	        errorInfo = " (got " + i(err) + ")";
	      }
	    }

	    this.params = { operator: 'to throw exception' + errorInfo };

	    this.assert(thrown);
	    this.assert(errorMatched);
	  });

	  Assertion.alias('throw', 'throwError');
	};


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Should
	 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	var util = __webpack_require__(20);
	var eql = __webpack_require__(34);

	module.exports = function(should, Assertion) {
	  var i = should.format;

	  /**
	   * Asserts if given object match `other` object, using some assumptions:
	   * First object matched if they are equal,
	   * If `other` is a regexp and given object is a string check on matching with regexp
	   * If `other` is a regexp and given object is an array check if all elements matched regexp
	   * If `other` is a regexp and given object is an object check values on matching regexp
	   * If `other` is a function check if this function throws AssertionError on given object or return false - it will be assumed as not matched
	   * If `other` is an object check if the same keys matched with above rules
	   * All other cases failed
	   *
	   * @name match
	   * @memberOf Assertion
	   * @category assertion matching
	   * @param {*} other Object to match
	   * @param {string} [description] Optional message
	   * @example
	   * 'foobar'.should.match(/^foo/);
	   * 'foobar'.should.not.match(/^bar/);
	   *
	   * ({ a: 'foo', c: 'barfoo' }).should.match(/foo$/);
	   *
	   * ['a', 'b', 'c'].should.match(/[a-z]/);
	   *
	   * (5).should.not.match(function(n) {
	   *   return n < 0;
	   * });
	   * (5).should.not.match(function(it) {
	   *    it.should.be.an.Array();
	   * });
	   * ({ a: 10, b: 'abc', c: { d: 10 }, d: 0 }).should
	   * .match({ a: 10, b: /c$/, c: function(it) {
	   *    return it.should.have.property('d', 10);
	   * }});
	   *
	   * [10, 'abc', { d: 10 }, 0].should
	   * .match({ '0': 10, '1': /c$/, '2': function(it) {
	   *    return it.should.have.property('d', 10);
	   * }});
	   */
	  Assertion.add('match', function(other, description) {
	    this.params = {operator: 'to match ' + i(other), message: description};

	    if(!eql(this.obj, other).result) {
	      if(other instanceof RegExp) { // something - regex

	        if(typeof this.obj == 'string') {

	          this.assert(other.exec(this.obj));
	        } else if(util.isIndexable(this.obj)) {
	          util.forEach(this.obj, function(item) {
	            this.assert(other.exec(item));// should we try to convert to String and exec?
	          }, this);
	        } else if(null != this.obj && typeof this.obj == 'object') {

	          var notMatchedProps = [], matchedProps = [];
	          util.forEach(this.obj, function(value, name) {
	            if(other.exec(value)) matchedProps.push(util.formatProp(name));
	            else notMatchedProps.push(util.formatProp(name) + ' (' + i(value) + ')');
	          }, this);

	          if(notMatchedProps.length)
	            this.params.operator += '\n    not matched properties: ' + notMatchedProps.join(', ');
	          if(matchedProps.length)
	            this.params.operator += '\n    matched properties: ' + matchedProps.join(', ');

	          this.assert(notMatchedProps.length === 0);
	        } // should we try to convert to String and exec?
	      } else if(typeof other == 'function') {
	        var res;

	        res = other(this.obj);

	        //if(res instanceof Assertion) {
	        //  this.params.operator += '\n    ' + res.getMessage();
	        //}

	        //if we throw exception ok - it is used .should inside
	        if(typeof res == 'boolean') {
	          this.assert(res); // if it is just boolean function assert on it
	        }
	      } else if(other != null && typeof other == 'object') { // try to match properties (for Object and Array)
	        notMatchedProps = [];
	        matchedProps = [];

	        util.forEach(other, function(value, key) {
	          try {
	            should(this.obj).have.property(key).which.match(value);
	            matchedProps.push(util.formatProp(key));
	          } catch(e) {
	            if(e instanceof should.AssertionError) {
	              notMatchedProps.push(util.formatProp(key) + ' (' + i(this.obj[key]) + ')');
	            } else {
	              throw e;
	            }
	          }
	        }, this);

	        if(notMatchedProps.length)
	          this.params.operator += '\n    not matched properties: ' + notMatchedProps.join(', ');
	        if(matchedProps.length)
	          this.params.operator += '\n    matched properties: ' + matchedProps.join(', ');

	        this.assert(notMatchedProps.length === 0);
	      } else {
	        this.assert(false);
	      }
	    }
	  });

	  /**
	   * Asserts if given object values or array elements all match `other` object, using some assumptions:
	   * First object matched if they are equal,
	   * If `other` is a regexp - matching with regexp
	   * If `other` is a function check if this function throws AssertionError on given object or return false - it will be assumed as not matched
	   * All other cases check if this `other` equal to each element
	   *
	   * @name matchEach
	   * @memberOf Assertion
	   * @category assertion matching
	   * @alias Assertion#matchSome
	   * @param {*} other Object to match
	   * @param {string} [description] Optional message
	   * @example
	   * [ 'a', 'b', 'c'].should.matchEach(/\w+/);
	   * [ 'a', 'a', 'a'].should.matchEach('a');
	   *
	   * [ 'a', 'a', 'a'].should.matchEach(function(value) { value.should.be.eql('a') });
	   *
	   * { a: 'a', b: 'a', c: 'a' }.should.matchEach(function(value) { value.should.be.eql('a') });
	   */
	  Assertion.add('matchEach', function(other, description) {
	    this.params = {operator: 'to match each ' + i(other), message: description};

	    util.forEach(this.obj, function(value) {
	      should(value).match(other);
	    }, this);
	  });

	  /**
	  * Asserts if any of given object values or array elements match `other` object, using some assumptions:
	  * First object matched if they are equal,
	  * If `other` is a regexp - matching with regexp
	  * If `other` is a function check if this function throws AssertionError on given object or return false - it will be assumed as not matched
	  * All other cases check if this `other` equal to each element
	  *
	  * @name matchAny
	  * @memberOf Assertion
	  * @category assertion matching
	  * @param {*} other Object to match
	  * @alias Assertion#matchEvery
	  * @param {string} [description] Optional message
	  * @example
	  * [ 'a', 'b', 'c'].should.matchAny(/\w+/);
	  * [ 'a', 'b', 'c'].should.matchAny('a');
	  *
	  * [ 'a', 'b', 'c'].should.matchAny(function(value) { value.should.be.eql('a') });
	  *
	  * { a: 'a', b: 'b', c: 'c' }.should.matchAny(function(value) { value.should.be.eql('a') });
	  */
	  Assertion.add('matchAny', function(other, description) {
	    this.params = {operator: 'to match any ' + i(other), message: description};

	    this.assert(util.some(this.obj, function(value) {
	      try {
	        should(value).match(other);
	        return true;
	      } catch(e) {
	        if(e instanceof should.AssertionError) {
	          // Caught an AssertionError, return false to the iterator
	          return false;
	        }
	        throw e;
	      }
	    }));
	  });

	  Assertion.alias('matchAny', 'matchSome');
	  Assertion.alias('matchEach', 'matchEvery');
	};


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Should
	 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
	 * MIT Licensed
	 */

	var util = __webpack_require__(20);
	var eql = __webpack_require__(34);

	module.exports = function(should, Assertion) {
	  var i = should.format;

	  /**
	   * Assert that given object contain something that equal to `other`. It uses `should-equal` for equality checks.
	   * If given object is array it search that one of elements was equal to `other`.
	   * If given object is string it checks if `other` is a substring - expected that `other` is a string.
	   * If given object is Object it checks that `other` is a subobject - expected that `other` is a object.
	   *
	   * @name containEql
	   * @memberOf Assertion
	   * @category assertion contain
	   * @param {*} other Nested object
	   * @example
	   *
	   * [1, 2, 3].should.containEql(1);
	   * [{ a: 1 }, 'a', 10].should.containEql({ a: 1 });
	   *
	   * 'abc'.should.containEql('b');
	   * 'ab1c'.should.containEql(1);
	   *
	   * ({ a: 10, c: { d: 10 }}).should.containEql({ a: 10 });
	   * ({ a: 10, c: { d: 10 }}).should.containEql({ c: { d: 10 }});
	   * ({ a: 10, c: { d: 10 }}).should.containEql({ b: 10 });
	   * // throws AssertionError: expected { a: 10, c: { d: 10 } } to contain { b: 10 }
	   * //            expected { a: 10, c: { d: 10 } } to have property b
	   */
	  Assertion.add('containEql', function(other) {
	    this.params = {operator: 'to contain ' + i(other)};

	    this.is.not.null().and.not.undefined();

	    var obj = this.obj;

	    if(typeof obj == 'string') {
	      this.assert(obj.indexOf(String(other)) >= 0);
	    } else if(util.isIndexable(obj)) {
	      this.assert(util.some(obj, function(v) {
	        return eql(v, other).result;
	      }));
	    } else {
	      this.have.properties(other);
	    }
	  });

	  /**
	   * Assert that given object is contain equally structured object on the same depth level.
	   * If given object is an array and `other` is an array it checks that the eql elements is going in the same sequence in given array (recursive)
	   * If given object is an object it checks that the same keys contain deep equal values (recursive)
	   * On other cases it try to check with `.eql`
	   *
	   * @name containDeepOrdered
	   * @memberOf Assertion
	   * @category assertion contain
	   * @param {*} other Nested object
	   * @example
	   *
	   * [ 1, 2, 3].should.containDeepOrdered([1, 2]);
	   * [ 1, 2, [ 1, 2, 3 ]].should.containDeepOrdered([ 1, [ 2, 3 ]]);
	   *
	   * ({ a: 10, b: { c: 10, d: [1, 2, 3] }}).should.containDeepOrdered({a: 10});
	   * ({ a: 10, b: { c: 10, d: [1, 2, 3] }}).should.containDeepOrdered({b: {c: 10}});
	   * ({ a: 10, b: { c: 10, d: [1, 2, 3] }}).should.containDeepOrdered({b: {d: [1, 3]}});
	   */
	  Assertion.add('containDeepOrdered', function(other) {
	    this.params = {operator: 'to contain ' + i(other)};

	    var obj = this.obj;
	    if(typeof obj == 'string') {// expect other to be string
	      this.is.equal(String(other));
	    } else if(util.isIndexable(obj) && util.isIndexable(other)) {
	      for(var objIdx = 0, otherIdx = 0, objLength = util.length(obj), otherLength = util.length(other); objIdx < objLength && otherIdx < otherLength; objIdx++) {
	        try {
	          should(obj[objIdx]).containDeepOrdered(other[otherIdx]);
	          otherIdx++;
	        } catch(e) {
	          if(e instanceof should.AssertionError) {
	            continue;
	          }
	          throw e;
	        }
	      }

	      this.assert(otherIdx === otherLength);
	    } else if(obj != null && other != null && typeof obj == 'object' && typeof other == 'object') {// object contains object case
	      util.forEach(other, function(value, key) {
	        should(obj[key]).containDeepOrdered(value);
	      });

	      // if both objects is empty means we finish traversing - and we need to compare for hidden values
	      if(util.isEmptyObject(other)) {
	        this.eql(other);
	      }
	    } else {
	      this.eql(other);
	    }
	  });

	  /**
	   * The same like `Assertion#containDeepOrdered` but all checks on arrays without order.
	   *
	   * @name containDeep
	   * @memberOf Assertion
	   * @category assertion contain
	   * @param {*} other Nested object
	   * @example
	   *
	   * [ 1, 2, 3].should.containDeep([2, 1]);
	   * [ 1, 2, [ 1, 2, 3 ]].should.containDeep([ 1, [ 3, 1 ]]);
	   */
	  Assertion.add('containDeep', function(other) {
	    this.params = {operator: 'to contain ' + i(other)};

	    var obj = this.obj;
	    if(typeof obj == 'string') {// expect other to be string
	      this.is.equal(String(other));
	    } else if(util.isIndexable(obj) && util.isIndexable(other)) {
	      var usedKeys = {};
	      util.forEach(other, function(otherItem) {
	        this.assert(util.some(obj, function(item, index) {
	          if(index in usedKeys) return false;

	          try {
	            should(item).containDeep(otherItem);
	            usedKeys[index] = true;
	            return true;
	          } catch(e) {
	            if(e instanceof should.AssertionError) {
	              return false;
	            }
	            throw e;
	          }
	        }));
	      }, this);
	    } else if(obj != null && other != null && typeof obj == 'object' && typeof other == 'object') {// object contains object case
	      util.forEach(other, function(value, key) {
	        should(obj[key]).containDeep(value);
	      });

	      // if both objects is empty means we finish traversing - and we need to compare for hidden values
	      if(util.isEmptyObject(other)) {
	        this.eql(other);
	      }
	    } else {
	      this.eql(other);
	    }
	  });

	};


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {process.nextTick(function() {
		delete __webpack_require__.c[module.id];
		if(typeof window !== "undefined" && window.mochaPhantomJS)
			mochaPhantomJS.run();
		else
			mocha.run();
	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(47)))

/***/ },
/* 47 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 48 */
/***/ function(module, exports) {

	

/***/ }
/******/ ]);