(function(){
    $(".mouseenter>li").on("mouseenter",function(){
        console.log("enter");
        $(this).directChildNodes("sub-drop-down").show();
    });
    $(".mouseenter >li").on("mouseleave",function(){
        console.log("leave");
        $(this).directChildNodes("sub-drop-down").hide();
    });

    $(".mouseover>li").on("mouseover",function(){
        console.log("over");
        $(this).directChildNodes("sub-drop-down").show();
    });
    $(".mouseover >li").on("mouseout",function(){
        console.log("out");
        $(this).directChildNodes("sub-drop-down").hide();
    });

    $(".mouseenter-v2>li .w").on("mouseenter",function(e){
        var hoverContent =  $(this).parent().directChildNodes("sub-drop-down");
        hoverContent.show();
    });
    $(".mouseenter-v2>li .w").on("mouseleave",function(e){
        var relatedTar = e.relatedTarget;
        if (relatedTar&&relatedTar.className.indexOf("sub-drop-down")!=-1){
            return;
        }
        var hoverContent =  $(this).parent().directChildNodes("sub-drop-down");
        hoverContent.hide();
    });
    $(".mouseenter-v2>li .sub-drop-down").on("mouseleave",function(e){
        var relatedTar = e.relatedTarget;
        var relatedHoverDom = $(this).parent().directChildNodes("w");
        if (relatedTar==relatedHoverDom){
            return;
        }
        var hoverContent =  $(this);
        hoverContent.hide();
    });

    $(".mouseover-v2>li .w").on("mouseover",function(){
        console.log("v2 over");
        var hoverContent =  $(this).parent().directChildNodes("sub-drop-down");
        hoverContent.show();
    });
    $(".mouseover-v2>li .w").on("mouseout",function(){
        console.log("v2 out");
        var hoverContent =  $(this).parent().directChildNodes("sub-drop-down");
        hoverContent.hide();
    });
}());