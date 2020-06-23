```html
  <head>
    <script>
        setTimeout(() => {
            console.log(document.querySelectorAll('h1'));
        }, 0)
        document.addEventListener('DOMContentLoaded', function() {
            console.log(">>>>>",document.querySelectorAll('h1'));
        });
    </script>
    <style>h1 {color: red;}</style>
  </head>
  <body>
    <h1>hello World</h1>
    <link href="https://cdn.bootcss.com/bootstrap/4.0.0- alpha.6/css/bootstrap.css" rel="stylesheet">
    <h1>hello World</h1>
  </body>
```
* 按照以上html代码进行布局：
  * css文件的加载影响力第二个h1的渲染，第一个h1渲染完成，同时setTimeout打印个数为1.等到bootstrap.css加载完成后第二个h1渲染，通过颜色改变，DOMContentLoaded
调动显示2个h1
* 将真个css link放到head里面script下面
  * 两个h1等css下载完成后显示，setTimeout和DOMContentLoaded打印个数为2，DOMContentLoaded在setTimeout之前。猜测表示script在css和dom生成对应的DOMTree
和Style解析规则后开始执行，在生成渲染树之前执行(js可能会改变dom和css)
* 将link换成style标签，放在body中的实现效果
  * 界面很快渲染完成,dom和css并行进行编译生成对应解析树。setTimeout打印h1个数为1，DOMContentLoaded打印个数为2(这个比较好理解)。setTimeout为1是因为sytle
阻塞了第二个h1的渲染导致  
* 将link换成style标签，放在head中的实现效果
  * 界面很快渲染完成，dom和css并行进行编译生成对应解析树。setTimeout打印h1个数为0，DOMContentLoaded打印个数为2,在生成渲染树之前setTimeout执行
  
