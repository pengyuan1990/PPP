* 用window.crypto.getRandomValues生成随机数
   * getRandomValues 的参数必须是整形TypedArray数组，上次分析二进制数据的时候说过(Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array or UInt8ClampedArray)。否则会报错
   * 在分配内存的时候字节数有限制：65536
   * 根据TypedArray类型为数组中每一个位置生成一个随机数值
* 上面的操作只是生成了随机的数值，我们一般的选取是生成随机的字符串，所以在此基础之上还要生成相应的操作。将数字生成16进制字符串然后进行取值。

``` javascript
  function dec2hex (dec) {
    console.log(dec,"<====>",('0' + dec.toString(16)))
    return ('0' + dec.toString(16)).substr(-2);
  }

  var array = new Uint8Array(5);
  window.crypto.getRandomValues(array);
  Array.from(array,dec2hex)

  var array = new Uint32Array(5);
  window.crypto.getRandomValues(array);
  Array.from(array,dec2hex)

  var array = new Uint32Array(5);
  window.crypto.getRandomValues(array);
  console.log("Your lucky numbers:");
  for (var i = 0; i < array.length; i++) {
      console.log(array[i]);
  }
```
* 上面的代码就处理了上次netflix ip数字小于16时候的问题。默认在前面填充0，然后读取后面两位
* 这样做有个缺点就是由于是通过16进制的，所有字母最多是a,b,c,d,e,f.但是js Number.toString()可以跟进制数，我们可以传36进制这样就可以包括所有的字母。不过还是要视具体情况而定。
