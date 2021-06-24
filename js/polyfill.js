if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}
if (!Array.isArray){
    Array.isArray = function(arg){
      return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
if(!Number.isNaN){
    Number.isNaN = function(value) {
        var n = Number(value);
        return n !== n;
    };
}
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement /*, fromIndex*/) {
    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }

    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false;
    }
    var n = parseInt(arguments[1], 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    } else {
      k = len + n;
      if (k < 0) {
        k = 0;
      }
    }
    var currentElement;
    while (k < len) {
      currentElement = O[k];
      if (searchElement === currentElement || (searchElement !== searchElement && currentElement !== currentElement)) {
        // NaN !== NaN
        return true;
      }
      k++;
    }
    return false;
  };
}
let grafLastTime = 0;
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function(callback) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16.7 - (currTime - grafLastTime));
    const id = window.setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);
    grafLastTime = currTime + timeToCall;
    return id;
  };
}
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function(id) {
    clearTimeout(id);
  };
}
// Element remove action
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
        this.parentNode && this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype].filter(Boolean));
