(function (global,factory){
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory()
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return factory();
        });
    } else {
        global.DigitalLinearChange = factory();
    }
}(this,function(){
    /**
     *
     * @method DigitalLinearChange
     * @param {object} options
     * @param {Number} options.StartDigital
     * @param {Number} options.EndDigital
     * @param {jQuery} options.Ele
     * @param {Function} options.Callback
     */
    function DigitalLinearChange(options){
        if (!(this instanceof DigitalLinearChange)){
            return new DigitalLinearChange(options);
        }
        if (!options || typeof options != "object"){
            throw new Error("please set correct options");
        }
        if (typeof options.StartDigital !== "number"||typeof options.EndDigital !== "number"){
            throw new Error("StartDigital and EndDigital must be number.");
        }
        if (!options.Ele||options.Ele.length < 0){
            throw new Error("Ele can't be empty.");
        }
        this.init(options);
        this.initAction();
    }
    DigitalLinearChange.prototype.init = function (options){
        this.rAF = window.requestAnimationFrame;
        this.Ele = options.Ele;
        this.StartDigital = options.StartDigital;
        this.EndDigital = options.EndDigital;
        this.curIndex = 0; // current modify index.
        this.Callback = options.Callback;
    }
    DigitalLinearChange.prototype.begin = function(){
        this._begin();
    }
    DigitalLinearChange.prototype.initAction = function(){
        var rAF = this.rAF,
            // options = this.options,
            curIndex = this.curIndex,
            StartDigital = this.StartDigital,
            EndDigital = this.EndDigital,
            Ele = this.Ele, 
            StartDigitalArray = [],
            EndDigitalArray = [],
            Callback = this.Callback;

        function countUpAndDow(){
            if (String(StartDigital) == String(EndDigital)){
                return;
            }
            curIndex = 0;
            __DigitalPrefix();
            __countUpAndDow();
        }
        this._begin = countUpAndDow;
        function __cb(){
            if (typeof Callback == "function") {
                Callback.call(Ele,EndDigital);
            }
        }
        function __DigitalPaddingBefore(number,length){
            for(var len = String(number).length; len < length; len = number.length) {
                number = "0" + number;            
            }
            return number;
        }
        function __DigitalPaddingAfter(number,length){
            for(var len = String(number).length; len < length; len = number.length) {
                number = number + "0";            
            }
            return number; 
        }
        function __isDecimal(number){
            if (String(number).indexOf(".")!=-1){
                return true;
            }
            return false;
        }
        function __DigitalPrefix(){
            var maxLength = String(EndDigital).length > String(StartDigital).length?String(EndDigital).length:String(StartDigital).length;
            if (!__isDecimal(StartDigital)&&!__isDecimal(EndDigital)){
                EndDigitalArray = String(__DigitalPaddingBefore(EndDigital,maxLength)).split("");
                StartDigitalArray = String(__DigitalPaddingBefore(StartDigital,maxLength)).split("");
            }else{
                // console.log(StartDigital);
                // console.log(EndDigital);
                var startInt = String(StartDigital).split(".")[0];
                var startDec = '';
                var endInt = String(EndDigital).split(".")[0];
                var endDec = '';
                if (__isDecimal(StartDigital)){
                    startDec = String(StartDigital).split(".")[1];
                }
                if (__isDecimal(EndDigital)){
                    endDec = String(EndDigital).split(".")[1];
                }
                var startStr = '';
                var endStr = '';
                var intLength = startInt.length>endInt.length?startInt.length:endInt.length;
                var decLength = startDec.length>endDec.length?startDec.length:endDec.length;
                startStr += __DigitalPaddingBefore(startInt,intLength);
                endStr += __DigitalPaddingBefore(endInt,intLength);
                startStr += ".";
                endStr += ".";
                startStr += __DigitalPaddingAfter(startDec,decLength);
                endStr += __DigitalPaddingAfter(endDec,decLength);
                StartDigitalArray = startStr.split("");
                EndDigitalArray = endStr.split("");
            }
            // console.log(StartDigitalArray);
            // console.log(EndDigitalArray);
        }
        function __GetRandom(length) {
            return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
        }
        function __countUpAndDow(){
            var result = StartDigitalArray;
            if (EndDigitalArray[curIndex] == "."){
                tmpN = ".";
            }else{
                var startN = parseInt(StartDigitalArray[curIndex]);
                var endN = parseInt(EndDigitalArray[curIndex]);
                startN += 1
                var tmpN = (startN)%10;
            }
            StartDigitalArray[curIndex] = tmpN;
            result[curIndex] = tmpN;
            var leftLength = EndDigitalArray.length-curIndex-1;
            if (leftLength > 0){
                var randStr = (__GetRandom(leftLength)+"").split("");
                for(var j=curIndex+1;j<EndDigitalArray.length;j++){
                    result[j] = randStr[j-curIndex-1];
                }
            }
            if (tmpN == endN||tmpN == "."){
                curIndex++;
            }
            Ele.text(parseFloat(result.join("")));
            if (parseFloat(EndDigitalArray.join("")) == parseFloat(result.join(""))){
                __cb();
                return;
            }
            rAF(__countUpAndDow);
        }
    }
    return DigitalLinearChange;
}));
