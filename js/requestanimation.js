(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());
function RequestAnimation(func) {
    this.animationing = false;
    this.animationId = null;
    this.animationFuncList = [];
    this._init(func);
}
RequestAnimation._isArray = function (func) {
    return Object.prototype.toString.call(func) === "[object Array]";
};
RequestAnimation._isFunction = function (func) {
    return Object.prototype.toString.call(func) === "[object Function]";
};
RequestAnimation.prototype = {
    constructor: RequestAnimation,
    _init: function (func) {
        if (!!func) {
            this._addAction(func);
        }
    },
    _animationAction: function () {
        if (this.animationFuncList.length > 0) {
            for (let i = 0; i < this.animationFuncList.length; i++) {
                this.animationFuncList[i]();
            }
        }
        this.animationing = false;
    },
    _addAction: function (func) {
        var self = this;
        function add(tfunc) {
            if (self.animationFuncList.indexOf(tfunc) == -1 && RequestAnimation._isFunction(tfunc)) {
                self.animationFuncList.push(tfunc);
            }
        }
        if (RequestAnimation._isArray(func)) {
            for (var i = 0; i < func.length; i++) {
                add(func[i]);
            }
        } else {
            add(func);
        }
    },
    /**
     * do animation in requestAnimationFrame
     * @param {*} func
     * func: function list or a function
     */
    DoAnimation: function (func) {
        if (!!func) {
            this._addAction(func);
        }
        if (!this.animationing && this.animationFuncList.length > 0) {
            this.animationId = requestAnimationFrame(this._animationAction.bind(this));
            this.animationing = true;
        }
    },
    AddActioin: function (func) {
        this._addAction(func);
    },
    /**
     * @param {*} shouldClearFuncList bool
     */
    CancelAnimation: function (shouldClearFuncList) {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (shouldClearFuncList) {
            this.ClearFuncList();
        }
        this.animationing = false;
    },
    ClearFuncList: function () {
        this.animationFuncList = [];
        this.animationing = false;
    },
};