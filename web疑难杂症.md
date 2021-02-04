* 关于ie浏览器在mac虚拟机中a标签control(键)+click不会触发click事件的问题：把a标签中的文本通过其他标签包裹一层就好(span/div)
* safari 中ajax回调中进行input=file click操作无效，需要放到setTimeout里面
  ```
     new Ajax().$http('xxx').then(() => {
        const inputFile = document.querySelector('#upload_file_input');
        inputFile.value = '';
        inputFile.click();
        setTimeout(()=> {
           // TODO 执行上面的代码有效
        });
      }).catch(err => {
        console.log(err);
      });
    }
  ```
