_isArray = function (array) {
    return Object.prototype.toString.call(array) === "[object Array]";
};
_isFunction = function (func) {
    return Object.prototype.toString.call(func) === "[object Function]";
};
_isNumber = function (num) {
    return Object.prototype.toString.call(num) === "[object Number]";
};
_isString = function (str) {
    return Object.prototype.toString.call(str) === "[object String]";
};
_isBool = function (bo) {
    return Object.prototype.toString.call(bo) === "[object Boolean]";
};
_isNull = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Null]";
};
_isUndefined = function (obj) {
    return Object.prototype.toString.call(obj) === "[object Undefined]";
};
