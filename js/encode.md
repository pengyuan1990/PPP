* [编码对照参考](https://www.ascii.cl/htmlcodes.htm)
* 项目中编码效果
```javascript 
var  __HMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
 };
```
* 通过上面的参考表里面的数据可以发现
  * &,<,>," 这几个字符编码使用的是HTML Name。即HTML中有专门对照名称写法
  * ',\` 则是采用的HTML Number。通过编码数值进行解析显示的
    * 其中\&\#x27; == \&\#39;  \&\#x60; == \&\#96;前面采用的是16进制进行显示的，后面这种采用的10进制进行显示
  * js 中的encodeURIComponent/encodeURI将对应特殊字符转成%+(16进制)进行显示: < == %3c ,% == %25。通过[MDN]()上关于fix（!, ', (, ), 和 *）的例子可以看出
     ```javascript
     function fixedEncodeURIComponent (str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
          return '%' + c.charCodeAt(0).toString(16);
        });
      }
     ```
