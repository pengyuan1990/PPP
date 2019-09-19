// https://www.ascii.cl/htmlcodes.htm
var __HMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
function _EncodeH(s){
    if ((typeof s) !== "string"){
        return "";
    }
    if (/(?:&|<|>|"|'|`)/.test(s)==false){
        return s;
    }
    return s.replace(/(?:&|<|>|"|'|`)/g, function(match){
        return __HMap[match];
    });
}

function _EncodeUrlv(s){
    // 为了让它转义出来的东西，可以直接放在 ' 包含的html field 里面。
    return encodeURIComponent(s).replace("'","%27");
}
