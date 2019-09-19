(function (global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory()
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory();
        });
    } else {
        global.Turntable = factory();
    }

}(this, function () {
    /*
     * @method Turntable
     * @param {Object} options
     * @param {jQuery} options.ele,jQuery dom object
     * @param {Object} options.gifts,gifts angle info
     * @param {Function} options.callback,stop callback
     * @param {Number} options.speed
     * @param {Number} options.startAngle
     *
     * */
    function Turntable(options) {
        //判断当前用户传入的参数是否正确
        if (!(this instanceof Turntable)) {
            return new Turntable(options);
        }
        if (!options || typeof options != "object") {
            throw new Error("please set corrent options");
        }
        try {
            if (options.ele.length < 0) {
                throw new Error("please set at least one dom element");
            }
        } catch (e) {
            throw new Error("please set corrent dom element",e);
        }
        this.init(options);
        this.initEvent();
    }

    Turntable.prototype.init = function (options) {
        this.rAF = window.requestAnimationFrame;
        this.options = options;
        this.ele = options.ele;
        this.baseSpeed = options.speed || 10;
        this.speed = this.baseSpeed;
        this.statusCode = {
            "defaultStatus": "1",
            "activityStatus": "2",
            "stopingStatus": "3"
        };
        this.status = this.statusCode.defaultStatus;
        this.beiginStep = 0.1;
        this.stopStep = 0.1;
    };
    Turntable.prototype.begin = function () {
        var statusCode = this.statusCode;
        if (statusCode.defaultStatus != this.status) {
            return "";
        }
        this.status = statusCode.activityStatus;
        this.speed = Math.floor(this.baseSpeed / 2);
        this._beigin();
        this.stopId = "";
        this.json = "";

    };
    Turntable.prototype.stop = function (id, json) {
        var statusCode = this.statusCode;
        if (statusCode.activityStatus != this.status) {
            return "";
        }
        this.status = statusCode.stopingStatus;
        this.stopId = id;
        this.json = json;
    };

    Turntable.prototype.isStoped = function () {
        return this.status == this.statusCode.defaultStatus;
    };
    Turntable.prototype.getStopAngle = function () {
        var speed = this.speed,
            n = 0,
            angle = 0,
            stopStep = this.stopStep;

        n = Math.ceil(speed / stopStep);
        angle = n * speed - n * (n - 1) * stopStep / 2 + 3600;
        return angle % 360;
    };
    Turntable.prototype.initEvent = function () {
        var rAF = this.rAF,
            that = this,
            ele = this.ele,
            options = this.options,
            gifts = options.gifts,
            callback = options.callback,
            curAngle = options.startAngle || 0,
            cbs = {},
            statusCode = this.statusCode,
            baseSpeed = this.baseSpeed,
            beiginStep = this.beiginStep,
            stopStep = this.stopStep,
            isStoping = false;
        function _cb() {
            if (typeof callback == "function") {
                callback.call(ele, that.stopId, that.json);
            }
        }
        function _scroll(speed) {
            curAngle = curAngle + speed;
            if (curAngle >= 360) {
                curAngle = curAngle % 360;
            }
            ele.css({ "-webkit-transform": "rotate(" + curAngle + "deg)" });
            ele.css({ "-ms-transform": "rotate(" + curAngle + "deg)" });
            ele.css({ "transform": "rotate(" + curAngle + "deg)" });
        }
        cbs[statusCode.defaultStatus] = function () {
        };
        cbs[statusCode.activityStatus] = function () {
            if (that.speed < baseSpeed) {
                that.speed += beiginStep;
            }
            if (that.speed > baseSpeed) {
                that.speed = baseSpeed;
            }
            _scroll(that.speed);
        };
        cbs[statusCode.stopingStatus] = function () {
            if (that.speed < 0.1 * stopStep) {
                that.status = statusCode.defaultStatus;
                isStoping = false;
                _cb();
                return "";
            }
            if (!isStoping && !_isBeginStop()) {
                cbs[statusCode.activityStatus]();
                return "";
            }
            isStoping = true;
            if (that.speed > 2 * stopStep) {
                if (_justfiyStop()) {
                    that.speed -= stopStep;
                }
            } else {
                if (_canStop()) {
                    that.speed -= stopStep;
                }
            }
            _scroll(that.speed);
        };
        function _circle() {
            var status = that.status,
                cb = cbs[status];
            if (typeof cb == "function") {
                cb();
            }
            if (status != statusCode.defaultStatus) {
                rAF(_circle);
            }
        }
        this._beigin = _circle;
        function _canStop() {
            var gift = gifts[that.stopId];
                // flag = false;
            if (gift) {
                return true;
            }
            return Math.abs(that.lastAngle - curAngle) < 0.001;
        }
        function _justfiyStop() {
            var bwAngle = that.getStopAngle(),
                curBase = 0;

            curBase = that.lastAngle - bwAngle;
            if (curBase < 0) {
                curBase += 360;
            }
            if (Math.abs(curBase - curAngle) < that.speed) {
                return true;
            } else {
                return false;
            }
        }
        // error direct middle line
        function _getErrorAngle() {
            var errorAngles = {},
                errorArr = [],
                i = "",
                one = null,
                angle = 0,
                len = 0;

            for (i in gifts) {
                one = gifts[i];
                angle = one.angleCenter - one.angleRange;
                //                    angleCenter用户设置的区域的中心的角度
                //                    angleRange用户设置的区域的以中心两侧的范围大小
                if (angle < 0) {
                    angle = 360 + angle;
                }

                errorAngles[angle] = 1;
                angle = one.angleCenter + one.angleRange;

                if (angle >= 360) {
                    angle = angle - 360;
                }
                errorAngles[angle] = 1;
            }

            for (i in errorAngles) {
                errorArr.push(i);
            }

            len = errorArr.length;

            _getErrorAngle = function () {
                return errorArr[Math.floor(Math.random() * len)];
            };

            return _getErrorAngle();

        }
        function _getStopAngle(gift) {
            var angleRange = gift.angleRange,
                flag = Math.random - 0.5 > 0 ? 1 : -1,
                angle = 0;

            angle = gift.angleCenter - flag * Math.floor(Math.random() * angleRange * 0.6);
            return (angle + 360) % 360;
        }
        function _isBeginStop() {
            var gift = gifts[that.stopId],
                bwAngle = 0,
                lastAngle = 0,
                curBase = 0;

            if (!gift) {
                lastAngle = _getErrorAngle();
            } else {
                lastAngle = _getStopAngle(gift);
            }
            bwAngle = that.getStopAngle();
            curBase = lastAngle - bwAngle;
            if (curBase < 0) {
                curBase += 360;
            }
            if (Math.abs(curBase - curAngle) < that.speed) {
                that.lastAngle = lastAngle;
                return true;
            } else {
                that.lastAngle = "";
                return false;
            }
        }
    };
    return Turntable;
}));
