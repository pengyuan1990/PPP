/**
 * this library just supports ie9
 *
 * @param {*} selector
 */
function _ZZ(selector) {
    this._init(selector);
}
/**
* Object.prototype.toString.call(obj) get obj type
* [object String],[object Number],[object Array],[object Function]
*/
_ZZ._isFunction = function (obj) {
    return obj && Object.prototype.toString.call(obj) === "[object Function]";
};
_ZZ._isNumber = function (num) {
    return num && Object.prototype.toString.call(num) === "[object Number]";
};
_ZZ._isInteger = function (num) {
    return _ZZ._isNumber(num) && Math.floor(num) === num;
};
_ZZ.__xssMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
};
_ZZ._xssH = function (s) {
    s += "";
    if (/(?:&|<|>|"|'|`)/.test(s) == false) {
        return s;
    }
    return s.replace(/(?:&|<|>|"|'|`)/g, function (match) {
        return _ZZ.__xssMap[match];
    });
};
_ZZ._xssUrlv = function (s) {
    return encodeURIComponent(s).replace("'", "%27");
};
_ZZ.windowW = function(){
    return window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
};
_ZZ.windowH = function(){
    return window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
};
_ZZ.prototype = {
    constructor: _ZZ,
    // private function
    _init: function (selector) {
        var eleList = [];
        if (typeof selector === "string") {
            eleList = document.querySelectorAll(selector);
        } else if (typeof selector === "object") {
            if (selector.hasOwnProperty("length")) {
                if (Array.from) {
                    eleList = Array.from(selector);
                } else {
                    for (var i = 0; i < selector.length; i++) {
                        eleList.push(selector[i]);
                    }
                }
            } else {
                eleList = [selector];
            }
        }
        this._selector = selector;
        this._eleList = eleList;
    },
    _isNull: function () {
        return this._eleList.length === 0;
    },
    _traversingEleAction: function (setFunc) {
        if (this._isNull()) {
            return;
        }
        for (var i = 0; i < this._eleList.length; i++) {
            setFunc(this._eleList[i]);
        }
    },
    _checkHasClass: function (ele, classStr) {
        if (ele.classList) { // 
            if (ele.classList.contains(classStr)) {
                return true;
            }
            return false;
        } else {
            var classList = ele.className.split(" ");
            if (classList.indexOf(classStr) > -1) {
                return true;
            }
            return false;
        }
    },
    _getEmptyObj: function () {
        return $();
    },
    // public function
    isEmpty: function () {
        return this._isNull();
    },
    value: function (val) {
        if (this._isNull()){
            return;
        }
        if (val!=null&&val!=undefined) {
            this._traversingEleAction(function (ele) {
                ele.value = val;
            });
        } else {
            return this._eleList[0].value;
        }
    },
    text: function (val) {
        if (val!=null&&val!=undefined) {
            this._traversingEleAction(function (ele) {
                ele.textContent = val;
            });
        } else {
            return this._eleList[0].textContent;
        }
    },
    html(htmlStr){
        if (this._isNull()){
            return;
        }
        this._eleList[0].innerHTML = htmlStr;
    },
    show: function () {
        this._traversingEleAction(function (ele) { ele.style.display = "block"; });
    },
    hide: function () {
        this._traversingEleAction(function (ele) { ele.style.display = "none"; });
    },
    showInlineBlock: function () {
        this._traversingEleAction(function (ele) { ele.style.display = "inline-block"; });
    },
    opacityShow:function(){
        this._traversingEleAction(function (ele) { ele.style.opacity = "1"; });
    },
    opacityHide:function(){
        this._traversingEleAction(function (ele) { ele.style.opacity = "0"; });
    },
    toggleDisplay: function () {
        this._traversingEleAction(function (ele) {
            var displayStr = window.getComputedStyle(ele, null).display;
            if (displayStr == "none") {
                ele.style.display = "block";
            } else {
                ele.style.display = "none";
            }
        });
    },
    style: function (name) {
        if (this._isNull()) { return; }
        var ele = this._eleList[0];
        return window.getComputedStyle(ele, null)[name];
    },
    css: function (prop, value) {
        if (this._isNull()) { return; }
        value = String(value);
        if (!!value) {
            this._traversingEleAction(function (ele) { ele.style[prop] = value; });
        } else {
            return this._eleList[0].style[prop];
        }
    },
    prop: function (propName, value) {
        if (this._isNull()) { return; }
        if (!!value) {
            this._traversingEleAction(function (ele) { ele[propName] = value; });
        } else {
            return this._eleList[0].getAttribute(propName);
        }
    },
    height: function (h) {
        if (this._isNull()) { return null; }
        if (h) {
            this._eleList[0].style.height = h;
            return;
        }
        return this._eleList[0].clientHeight;
    },
    width: function (w) {
        if (this._isNull()) { return null; }
        if (w) {
            this._eleList[0].style.width = w;
            return;
        }
        return this._eleList[0].clientWidth;
    },
    parent: function () {
        if (this._isNull()) { return null; }
        return $(this._eleList[0].parentNode);
    },
    eq: function (index) {
        if (index + 1 > this._eleList.length) return console.error(`index error`);
        return $ && $(this._eleList[index]);
    },
    attr: function (attrName, value) {
        if (this._isNull()) { return null; }
        if (!!value) {
            this._traversingEleAction(function (ele) {
                ele.setAttribute(attrName, value);
            });
            return;
        }
        return this._eleList[0].getAttribute(attrName);
    },
    length: function () {
        if (this._isNull()) {
            return 0;
        }
        return this._eleList.length;
    },
    toArray: function () {
        if (this._isNull()) {
            return [];
        }
        return this._eleList;
    },
    hasClass: function (classStr) {
        if (this._isNull()) {
            return false;
        }
        var has = false;
        var self = this;
        this._traversingEleAction(function (ele) {
            if (self._checkHasClass(ele, classStr)) {
                has = true;
            }
        });
        return has;
    },
    addClass: function (classStr) {
        if (this._isNull()) {
            return null;
        }
        var self = this;
        this._traversingEleAction(function (ele) {
            if (self._checkHasClass(ele, classStr)) {
                return;
            }
            if (ele.classList) {
                ele.classList.add(classStr);
                return;
            }
            ele.className += (" " + classStr);
            return;
        });
    },
    removeClass: function (classStr) {
        if (this._isNull()) {
            return null;
        }
        var self = this;
        this._traversingEleAction(function (ele) {
            if (!self._checkHasClass(ele, classStr)) {
                return;
            }
            if (ele.classList) {
                ele.classList.remove(classStr);
                return;
            }
            var classNameList = ele.className.split(" ");
            var index = classNameList.indexOf(classStr);
            classNameList.splice(index, 1);
            ele.className = classNameList.join(" ");
            return;
        });
    },
    toggleClass: function (classStr) {
        if (this._isNull()) {
            return null;
        }
        var self = this;
        this._traversingEleAction(function (ele) {
            if (ele.classList) {
                ele.classList.toggle(classStr);
                return;
            }
            if (self._checkHasClass(ele, classStr)) {
                var classNameList = ele.className.split(" ");
                var index = classNameList.indexOf(classStr);
                classNameList.splice(index, 1);
                ele.className = classNameList.join(" ");
            } else {
                ele.className += (" " + classStr);
                return;
            }
        });
    },
    removeSelf:function(){
        if (this._isNull()){
            return;
        }
        // polyfill by MDN 
        (function (arr) {
            arr.forEach(function (item) {
              if (item.hasOwnProperty('remove')) {
                return;
              }
              Object.defineProperty(item, 'remove', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function remove() {
                  if (this.parentNode === null) {
                    return;
                  }
                  this.parentNode.removeChild(this);
                }
              });
            });
        })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
        this._eleList[0].remove();
    },
    insertHtmlBeforeParent(htmlStr){
        if (this._isNull()){
            return;
        }
        this._eleList[0].insertAdjacentHTML("beforebegin",htmlStr);
    },
    insertHtmlInParentBegin(htmlStr){
        if (this._isNull()){
            return;
        }
        this._eleList[0].insertAdjacentHTML("afterbegin",htmlStr);
    },
    insertHtmlInParentEnd(htmlStr){
        if (this._isNull()){
            return;
        }
        this._eleList[0].insertAdjacentHTML("beforeend",htmlStr);
    },
    insertHtmlAfterParent(htmlStr){
        if (this._isNull()){
            return;
        }
        this._eleList[0].insertAdjacentHTML("afterend",htmlStr);
    },
    // event bind
    on: function (eventName, handler) {
        if (!_ZZ._isFunction(handler)) {
            return console.error("Handler Type Error");
        }
        this._traversingEleAction(function (ele) {
            ele.addEventListener(eventName, function (e) {
                handler.call(ele, e);
            });
        });
    },
    trigger: function (eventName) {
        if (this._isNull()) {
            return null;
        }
        this._traversingEleAction(function (ele) {
            var event = document.createEvent("Event");
            event.initEvent(eventName, true, true);
            ele.dispatchEvent(event);
        });
    },
    click: function (handler) {
        this.on("click", handler);
    },
    input: function (handler) {
        this.on("input", handler);
    },
    // element node action
    _getChildNodes: function (parentNode, childClassName, selfNode) {
        let _childNodes = [];
        if (!parentNode) {
            return _childNodes;
        }
        if ((parentNode.hasChildNodes&&parentNode.hasChildNodes()||!!parentNode.firstChild)) {
            for (var j = 0; j < parentNode.childNodes.length; j++) {
                var _childNode = parentNode.childNodes[j];
                if (_childNode.nodeType != 1||selfNode == _childNode) {
                    continue;
                }
                var className = _childNode.className;
                if (typeof childClassName === "string") {
                    if (className.indexOf(childClassName) != -1) {
                        _childNodes.push(_childNode);
                    }
                } else {
                    _childNodes.push(_childNode);
                }
            }
        }
        return _childNodes;
    },
    directChildNodes: function (childClassName) {
        if (this._isNull()) {
            return this._getEmptyObj();
        }
        var childNodes = [];
        for (var i = 0; i < this._eleList.length; i++) {
            var _nodes = this._getChildNodes(this._eleList[i], childClassName);
            childNodes = childNodes.concat(_nodes);
        }
        return $(childNodes);
    },
    siblingNodes: function (childClassName,skipSelf) {
        if (this._isNull()) {
            return this._getEmptyObj();
        }
        var _siblingArray = [];
        for (var i = 0; i < this._eleList.length; i++) {
            var selfNode = this._eleList[i];
            var parentNode = selfNode.parentNode;
            if (parentNode && parentNode.nodeType == 1) { // just include element
                if (skipSelf) {
                    var _tmpNodes = this._getChildNodes(parentNode, childClassName, selfNode);
                    _siblingArray = _siblingArray.concat(_tmpNodes);
                } else {
                    var _tmpNodesv2 = this._getChildNodes(parentNode, childClassName);
                    _siblingArray = _siblingArray.concat(_tmpNodesv2);
                }
            }
        }
        return $(_siblingArray);
    },
    appendNode: function (str) {
        if (this._isNull()) {
            return null;
        }
        this._traversingEleAction(function(ele){
            var div = document.createElement("div");
            div.innerHTML = str;
            var newNodes = div.childNodes;
            for (var i = 0; i < newNodes.length; i++) {
                ele.appendChild(newNodes[i].cloneNode(true));
            }
        });
    },
    boundingClientRect:function(){
        if (this._isNull()){
            return null;
        }
        // position relative to the viewport.check visible
        return this._eleList[0].getBoundingClientRect();
    },
    clientRectTopToViewport: function(){
        if (this._isNull()){
            return null;
        }
        var domRect = this.boundingClientRect();
        return domRect.top;
    },
    clientRectBottomToViewport: function(){
        if (this._isNull()){
            return null;
        }
        var domRect = this.boundingClientRect();
        return domRect.bottom;
    },
    // get top to document
    getElementTop:function() {
        if (this._isNull()){
            return null;
        }
        var element = this._eleList[0];
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null) {
          actualTop += current.offsetTop;
          current = current.offsetParent;
        }
        return actualTop;
    },
    clientRectTopToDocument:function(){
        var wScrollTop = document.documentElement.scrollTop;
        var domRect = this.boundingClientRect();
        return wScrollTop + domRect.top;
    },
    checkDomIsInViewport: function(){
        if (this._isNull()){
            return false;
        }
        var wh = _ZZ.windowH();
        var topToViewport = this.clientRectTopToViewport();
        var bottomToViewport = this.clientRectBottomToViewport();
        if (bottomToViewport > 0 && topToViewport < wh){
            return true;
        }
        return false;
    },
    checkDomIsInViewportByTopToDocument:function(){
        if (this._isNull()){
            return false;
        }
        var clientHeight = _ZZ.windowH();
        var scrollTop = document.documentElement.scrollTop;
        var offsetTop = $(this._eleList[0]).clientRectTopToDocument();
        var objHeight = $(this._eleList[0]).height();
        if(offsetTop < scrollTop + clientHeight && offsetTop + objHeight > scrollTop) {
            return true;
        }
        return false;
    },
    checkDomIsInViewportByIntersectionApi:function(callback,option){
        if (this._isNull()){
            return null;
        }
        if (!window.IntersectionObserver){
            console.log("not support IntersectionObserver");
            return;
        }
        var io = new IntersectionObserver(function(entries){
            if(_ZZ._isFunction(callback)){
                callback(entries);
            }
        },option);
        this._traversingEleAction(function(ele){
            io.observe(ele);
        });
    },
    scrollTop: function(value){
        if (this._isNull()){
            return null;
        }
        var dom = this._eleList[0];
        if (!!value){
            if (dom.scrollTop===undefined&&dom.documentElement){
                dom.documentElement.scrollTop = parseFloat(value);
            }else{
                dom.scrollTop = parseFloat(value);
            }
            return;
        }
        if (dom.scrollTop===undefined&&dom.documentElement){
            return dom.documentElement.scrollTop;
        }else{
            return dom.scrollTop;
        }
    }
};
(function(){
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) { }
                return i > -1;
            };
    }
    window.$P = function(selector){
        return new _ZZ(selector);
    };
}());
