function _pageVisibilityApi(fn){
    var hidden = "hidden";
    // Standards:
    if (hidden in document){
        document.addEventListener("visibilitychange", onchange);
    }else if ((hidden = "mozHidden") in document){
        document.addEventListener("mozvisibilitychange", onchange);
    }else if ((hidden = "webkitHidden") in document){
        document.addEventListener("webkitvisibilitychange", onchange);
    }else if ((hidden = "msHidden") in document){
        document.addEventListener("msvisibilitychange", onchange);
    }else if ("onfocusin" in document){// IE 9 and lower:
        document.onfocusin = document.onfocusout = onchange;
    }else{
        window.onpageshow = window.onpagehide= window.onfocus = window.onblur = onchange;
    }
    function onchange (evt) {
        let v = "visible", h = "hidden";
        let evtMap = {
            focus:v,
            focusin:v,
            pageshow:v,
            blur:h,
            focusout:h,
            pagehide:h
        };
        evt = evt || window.event;
        let status = '';
        if (evt.type in evtMap){
           status = evtMap[evt.type];
        }else{
            status = this[hidden] ? "hidden" : "visible";
        }
        if (_ZZ._isFunction(fn)){
            fn(status);
        }
    }
    //set the initial state (but only if browser supports the Page Visibility API)
    //for first open page
    if( document[hidden] !== undefined ){
        onchange({type: document[hidden] ? "blur" : "focus"});
    }
}
function _pageBlurFocus(fn){
    if ("onfocusin" in document){// IE 9 and lower:
        document.onfocusin = document.onfocusout = onchange;
    }else{
        window.onpageshow = window.onpagehide= window.onfocus = window.onblur = onchange;
    }
    function onchange (evt) {
        let v = "visible", h = "hidden";
        let evtMap = {
            focus:v,
            focusin:v,
            pageshow:v,
            blur:h,
            focusout:h,
            pagehide:h
        };
        evt = evt || window.event;
        let status = '';
        if (evt.type in evtMap){
           status = evtMap[evt.type];
        }
        if (_ZZ._isFunction(fn)){
            fn(status);
        }
    }
}
