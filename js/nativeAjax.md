function ajaxSendByUrlQuery(url,key,value,success,error){
    vaule = JSON.stringify(value);
    function urlv(v){
       return encodeURIComponent(v).replace("'","%27");
    }
    if (url.indexOf("?")!==-1){
        url += "&"+urlv(key)+"="+urlv(value);
    }else{
        url += "?"+urlv(key)+"="+urlv(value);
    }
    var oReq;
    if (window.XMLHttpRequest) {
        oReq = new XMLHttpRequest();
    } else {
        oReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    oReq.onreadystatechange = function(){
        if (oReq.readyState!==4){
            return;
        }
        var resText = oReq.responseText;
        if (oReq.status !== 200) { // error
            error(resText);
            return;
        }
        // success
        success(resText);
    }
    oReq.open("POST", url);
    oReq.timeout = 15000;
    oReq.send();
}
function ajaxSendByBody(url,value,success,error){
    vaule = JSON.stringify(value);
    var oReq;
    if (window.XMLHttpRequest) {
        oReq = new XMLHttpRequest();
    } else {
        oReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    oReq.onreadystatechange = function(){
        if (oReq.readyState!==4){
            return;
        }
        var resText = oReq.responseText;
        if (oReq.status !== 200) { // error
            error(resText);
            return;
        }
        // success
        success(resText);
    }
    oReq.open("POST", url);
    oReq.timeout = 15000;
    oReq.send(value);
}
