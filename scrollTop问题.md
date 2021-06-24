* js:整个页面scrollTop属性的问题：这个地方就要说一下chrome也有和其他不一样的时候：
  * 其他的浏览器是通过document.documentElement.scrollTop进行滚动高度获取和设置的
  * 然而chrome则是在不同版本不一样：document.documentElement.scrollTop和document.body.scrollTop
    * 比较新的版本和其他浏览器一致，而document.body.scrollTop无效
    * 老版本正好相反：导致问题就是在获取和设置的时候就要处理一发了
    
    * 获取：
        * window.pageYOffset：所有都支持
        * document.documentElement.scrollTop || document.body.scrollTop;
    * 设置：就比较坑了
        最开始想的就是同时设置：毕竟只有一个有效
        window.scrollTo(x,y)进行滚动设置(现在使用)
        
* 参考：
* https://www.jianshu.com/p/b42781fec93e  
* https://segmentfault.com/a/1190000008065472
