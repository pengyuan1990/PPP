* 通过innerText(textContent)和innerHTML进行编码操作：缺点比较严重：只能针对&,<,>,进行处理而其他比如©不会进行处理
    ```javascript
    var HtmlUtil = {
    	htmlEncode: function (html) {
        	var temp = document.createElement("div");
        	//HTML编码
        	(temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
        	var output = temp.innerHTML;
        	temp = null;
        	return output;
    	},
    	htmlDecode: function (text) {
        	var temp = document.createElement("div");
        	//HTML解码
        	temp.innerHTML = text;
        	var output = temp.innerText || temp.textContent;
        	temp = null;
        	return output;
    	}
    };
    ```
 * 封装的js里面',`是&#x27和&#x60。而网上大部分的编码都是采用的&#39和&#96进行处理。我们这种方式编码结果和js自带的decodeURIComponent数值是一样的只不过js前缀是%。对比起来就是10进制和16进制的显示区别，通过MDN上的一个例子也能看出js的编码操作逻辑
   ```javascript
	function fixedEncodeURIComponent (str) {
   		return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
     		return '%' + c.charCodeAt(0).toString(16);
   		});
 	 }
   ```
 * https://www.ascii.cl/htmlcodes.htm 这个上面看得比较清楚。最开始以为非&,<,>,@以为js提供了对应的编解码函数然而没有。
