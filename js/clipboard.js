// base on: https://gist.github.com/rproenca/64781c6a1329b48a455b645d361a9aa3
window._Clipboard = (function(window, document, navigator) {
    var textArea,
        copy;

    function isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    function createTextArea(text) {
        textArea = document.createElement('textArea');
        textArea.style.position = 'fixed';// fix ie scroll to bottom bug.
        textArea.style.bottom= 0;
        textArea.style.left= 0;
        textArea.readOnly = true; // fix iphone scroll to bottom bug.
        textArea.value = text;
        document.body.appendChild(textArea);
    }

    function selectText() {
        var range,
            selection;
        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }

    function copyToClipboard() {        
        document.execCommand('copy');
        // document.body.removeChild(textArea);
    }

    copy = function(text) {
        createTextArea(text);
        selectText();
        copyToClipboard();
    };

    return {
        copy: copy
    };
})(window, document, navigator);
// use demo
 function copyTextToClipboard(selector) {
    var txt = document.querySelector(selector).innerText || document.querySelector(selector).value;
    _Clipboard.copy(txt);
 }
