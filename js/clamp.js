/*!
* Clamp.js 0.5.1
*
* Copyright 2011-2013, Joseph Schmitt http://joe.sh
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
* add overflowhidden function for ie by ppp
*/
(function () {

    function clamp(element, options) {
      options = options || {};
  
      var win = window,
        opt = {
          clamp: options.clamp || 2,
          useNativeClamp: typeof (options.useNativeClamp) != 'undefined' ? options.useNativeClamp : true,
          splitOnChars: options.splitOnChars || ['.', '-', '–', '—', ' '], //Split on sentences (periods), hypens, en-dashes, em-dashes, and words (spaces).
          animate: options.animate || false,
          truncationChar: options.truncationChar || '…'
        },
  
        sty = element.style,
        originalText = element.innerHTML,
        // 通过overflowhidden进行处理的时候，如果从小到大变化。会导致最大字符数不会变化，这时候需要把最原始的文本传递进来，然后每次通过原始版本进行处理，可以通过data-xx进行保存
        originalTextV2 = options.originalContent,
        supportsNativeClamp = typeof (element.style.webkitLineClamp) != 'undefined',
        clampValue = opt.clamp,
        isCSSValue = clampValue.indexOf && (clampValue.indexOf('px') > -1 || clampValue.indexOf('em') > -1),
        truncationHTMLContainer;
  
      if (opt.truncationHTML) {
        truncationHTMLContainer = document.createElement('span');
        truncationHTMLContainer.innerHTML = opt.truncationHTML;
      }
  
      // UTILITY FUNCTIONS __________________________________________________________
  
      /**
       * Return the current style for an element.
       * @param {HTMLElement} elem The element to compute.
       * @param {string} prop The style property.
       * @returns {number}
       */
      function computeStyle(elem, prop) {
        if (!win.getComputedStyle) {
          win.getComputedStyle = function (el, pseudo) {
            this.el = el;
            this.getPropertyValue = function (prop) {
              var re = /(\-([a-z]){1})/g;
              if (prop == 'float') prop = 'styleFloat';
              if (re.test(prop)) {
                prop = prop.replace(re, function () {
                  return arguments[2].toUpperCase();
                });
              }
              return el.currentStyle && el.currentStyle[prop] ? el.currentStyle[prop] : null;
            };
            return this;
          };
        }
        return win.getComputedStyle(elem, null).getPropertyValue(prop);
      }
      function getMaxLines(height) {
        var availHeight = height || element.clientHeight,
          lineHeight = getLineHeight(element);
  
        return Math.max(Math.floor(availHeight / lineHeight), 0);
      }
      function getMaxHeight(clmp) {
        var lineHeight = getLineHeight(element);
        return lineHeight * clmp;
      }
      function getLineHeight(elem) {
        var lh = computeStyle(elem, 'line-height');
        if (lh == 'normal') {
          lh = parseFloat(computeStyle(elem, 'font-size')) * 1.2;
        }
        return parseFloat(lh);
      }
  
  
      // MEAT AND POTATOES (MMMM, POTATOES...) ______________________________________
      var splitOnChars = opt.splitOnChars.slice(0),
        splitChar = splitOnChars[0],
        chunks,
        lastChunk;
      function getLastChild(elem) {
        if (elem.lastChild.children && elem.lastChild.children.length > 0) {
          return getLastChild(Array.prototype.slice.call(elem.children).pop());
        }
        else if  (elem.lastChild.nodeValue == opt.truncationChar){
          return elem.lastChild;
        }
        else if (!elem.lastChild || !elem.lastChild.nodeValue || elem.lastChild.nodeValue == '' || elem.lastChild.nodeValue == opt.truncationChar) {
          elem.lastChild.parentNode.removeChild(elem.lastChild);
          return getLastChild(element);
        }
        else {
          return elem.lastChild;
        }
      }
  
      function truncate(target, maxHeight) {
        if (!maxHeight) { return; }
        function reset() {
          splitOnChars = opt.splitOnChars.slice(0);
          splitChar = splitOnChars[0];
          chunks = null;
          lastChunk = null;
        }
  
        var nodeValue = target.nodeValue.replace(opt.truncationChar, '');
        if (!chunks) {
          if (splitOnChars.length > 0) {
            splitChar = splitOnChars.shift();
          }
          else {
            splitChar = '';
          }
          chunks = nodeValue.split(splitChar);
        }
        if (chunks.length > 1) {
          lastChunk = chunks.pop(); // 获取最后一块
          applyEllipsis(target, chunks.join(splitChar));
        }
        else {
          chunks = null;
        }
        if (truncationHTMLContainer) {
          target.nodeValue = target.nodeValue.replace(opt.truncationChar, '');
          element.innerHTML = target.nodeValue + ' ' + truncationHTMLContainer.innerHTML + opt.truncationChar;
        }
        if (chunks) {
          if (element.clientHeight <= maxHeight) {
            if (splitOnChars.length >= 0 && splitChar != '') {
              applyEllipsis(target, chunks.join(splitChar) + splitChar + lastChunk);
              chunks = null;
            }
            else {
              return element.innerHTML;
            }
          }
        }
        else {
          if (splitChar == '') {
            applyEllipsis(target, '');
            target = getLastChild(element);
  
            reset();
          }
        }
        if (opt.animate) {
          setTimeout(function () {
            truncate(target, maxHeight);
          }, opt.animate === true ? 10 : opt.animate);
        }
        else {
          return truncate(target, maxHeight);
        }
      }
      function overflowhidden(){
        var text = element;
        var rows = opt.clamp;
        var lineHeight = getLineHeight(element);
        var at = rows*parseFloat(lineHeight);
        var tempstr = element.innerHTML;
        text.innerHTML = tempstr;
        text.style.height = 'auto'; // 不设置这个，如果line-height高度发生变化可能会导致bug
        var len = tempstr.length;
        var i = 0;
        if(text.clientHeight <= at){
            return text.innerHTML;
        }else {
            var temp = "";
            text.innerHTML = temp;
            for (i=0;i<tempstr.length;i++){
              if (text.clientHeight <= at){
                temp = tempstr.substring(0, i+1);
                text.innerHTML = temp;
                // 最后一个字符刚刚好单独换行就存在一个bug
                if(i==tempstr.length-1&&text.clientHeight>at){
                  text.innerHTML = tempstr.substring(0, len-3) +"...";
                  text.style.height = at+'px';
                  return text.innerHTML;
                }
              }else{
                var slen = temp.length;
                tempstr = temp.substring(0, slen-1);
                len = tempstr.length;
                text.innerHTML = tempstr.substring(0, len-3) +"...";
                text.style.height = at+'px';
                return text.innerHTML;
              }
            }
            // return text.innerHTML;
        } 
      }
      function applyEllipsis(elem, str) {
        elem.nodeValue = str + opt.truncationChar;
      }
  
  
      // CONSTRUCTOR ________________________________________________________________
  
      if (clampValue == 'auto') {
        clampValue = getMaxLines();
      }
      else if (isCSSValue) {
        clampValue = getMaxLines(parseInt(clampValue));
      }
  
      var clampedText;
      if (supportsNativeClamp && opt.useNativeClamp) {
        sty.overflow = 'hidden';
        sty.textOverflow = 'ellipsis';
        sty.webkitBoxOrient = 'vertical';
        sty.display = '-webkit-box';
        sty.webkitLineClamp = clampValue;
  
        if (isCSSValue) {
          sty.height = opt.clamp + 'px';
        }
      }
      else {
        var height = getMaxHeight(clampValue);
        if (height <= element.clientHeight) {
          clampedText = overflowhidden();
        }
      }
  
      return {
        'original': originalText,
        'clamped': clampedText
      };
    }

  window.$clamp = clamp;
})();
