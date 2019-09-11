var rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i,
    rcheckableType = ( /^(?:checkbox|radio)$/i );
function serializeForm(formDom){
    if (!formDom||formDom.nodeName.toLowerCase()!="form"||formDom.elements.length<=0){
        return;
    }
    var eleList = formDom.elements;
    var list = [];
    for(var index=0;index<eleList.length;index++){
        list.push(eleList[index]);
    }
    var filterList = list.filter( function(ele) {
        var type = ele.type;
        // disabled will be ture,even disabled="false" in html
        return ele.name && !ele.disabled &&
            rsubmittable.test( ele.nodeName ) && !rsubmitterTypes.test( type ) &&
            ( ele.checked || !rcheckableType.test( type ));
    } );
    var unmergeredList = filterList.map( function(elem) {
        var tagName = elem.tagName.toLowerCase();
        var name = elem.name;
        switch (tagName){
            case "select":
                var options = elem.options;
                var result = [];
                if (options){
                    var opt = null;
                    for (var i=0;i<options.length;i++){
                        opt = options[i];
                        if (opt.selected){
                            result.push(opt.value||opt.text);
                        }
                    }
                }
                if (result.length>0){
                    return {
                        name:name,
                        value:result,
                    }
                }
                return null;
            default:
                //var type = elem.type;
                if (elem.value){
                    return {
                        name:name,
                        value:elem.value,
                    };
                }
                return null;
        }
    });
    return mergeValueWithSameName(unmergeredList);
}
function _isArray(obj){
    return obj && Object.prototype.toString.call(obj) === "[object Array]";
}
function mergeValueWithSameName(unmergeredList){
    var fData = {};
    if (!unmergeredList||unmergeredList.length<=0){
        return fData;
    }
    function jsonValue(val){
        if (_isArray(val)){
           return JSON.stringify(val);
        }else{
            return val;
        }
    }
    for(var i=0;i<unmergeredList.length;i++){
        var dataItem = unmergeredList[i];
        if (!dataItem){
            continue;
        }
        var name = dataItem.name;
        var value = dataItem.value;
        if (fData[name]){ // exist
            var oldValue = fData[name];
            var tmp = [];
            tmp = tmp.concat(oldValue,value);
            fData[name] = tmp;
        }else{
            fData[name] = value; // maybe array for select
        }
    }
    for (var key in fData){
        var v = fData[key];
        fData[key] = jsonValue(v);
    }
    return fData;
}
