* html和body都设置height的高度设置问题
* 只设置html为100%：则body的高度是由document撑起来的，可以对body设置min-height:100%，保证最小高度为屏幕高度
* html设置为min-height:100%:  
    * document：超过window
        * body不管如何设置：html和body都由document高度撑开
    * document：没超过window
        * body不管如何设置：body由document撑开，而html为window高度
* 总结：当html设置为min-height:100%时最小高度为window，如果不设置则由document高度进行填充。当设置min-height的时候资源的时候body的height百分比无效，因为父元素的高度没法确认
* 解决footer底部定位的两种方式：
    * html元素min-height:100%,保证最小高度为window高度同时设置position:relative，然后footer设置position:absolute;这样footer是与html高度进行绑定的，当document高度超过window时，html的高度就自动设置为了最大高度，然后footer定位在最底部
    * html设置为height:100%,而设置body的min-height:100%同时position:relative;原理同方法1类似

