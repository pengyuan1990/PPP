function urlv(v){
       return encodeURIComponent(v).replace("'","%27");
    }
function urlAddParameter(url,key,value){
    if (url.indexOf("?")!==-1){
        url += "&"+urlv(key)+"="+urlv(value);
    }else{
        url += "?"+urlv(key)+"="+urlv(value);
    }
    return url;
}
// value:json data
function ajaxSendByUrlQuery(req){
    vaule = JSON.stringify(req.value);
    req.url = urlAddParameter(req.url,req.key,req.value);
    var oReq;
    if (window.XMLHttpRequest) {
        oReq = new XMLHttpRequest();
    } else {
        oReq = new ActiveXObject("Microsoft.XMLHTTP");
    }
    oReq.onreadystatechange = function(){
        if (oReq.readyState===4){
            if (oReq.status === 200) {
                if (req.success){
                    req.success(oReq);
                }
                if (req.complete){
                    req.complete(oReq);
                }
            }else{// error status==0 timeout
                if (req.complete){
                    req.complete(oReq);
                }
                if (req.error){
                    req.error(oReq);
                }
            }
        }
    }
    oReq.open("POST", req.url);
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
