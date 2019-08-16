## promise

*  如果promise已经完成了，当再次触发该promise只会立刻得到上次的结果(事件每次触发就可能得到不同的结果)。
*  通过new Promise();构造promise对象,promise对象里面的代码会立即执行，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行(相当于setTimeout为0，本轮事件循环的末尾执行,而setTimeout放到下次循环开始执行)，针对异步方法，可以在异步回调里面触发resolve和reject方法
    ```javascript
    /* begin,000,111,222,success,resolved false,333,555,444*/
    const promise = new Promise(function(resolve,reject){
        //立即执行的代码，包括异步和同步代码
        console.log("begin");
        let result = 2;
        if (result%2==0){
            resolve();
        }else{
            reject();
        }
    });
    console.log("000");
    setTimeout(() => {
        console.log("333");
    }, 0);
    setTimeout(() => {
        console.log("444");
    }, 10);
    promise.then(()=>{
        console.log("success");
    },()=>{
        console.log("failed");
    });
    setTimeout(() => {
        console.log("555");
    }, 0);
    console.log("111");
    for (let i=0;i<1000000000;i++){} // 耗时操作
    console.log("222");
    ```
*  如果promise.then()的resolve的参数是其他的promise对象的时候,父promise会等待子promise
*  **调用resolve或reject并不会终结 Promise 的参数函数的执行.即resolve和reject后面的操作还是会执行,最好的实现方式只在调用这两个方法之后立即return，交给后面的promise处理**
* 如果同时提供连续then，catch。而且then中处理了reject，则catch不会触发
* promise的错误具有传递性，直到被catch或者reject处理。一般提倡catch而不写reject方法，更接近于try..catch写法
* finally.es2018提供的，不论promise最终什么状态都会执行，放在最后，虽然允许出现在链中任意位置
* Promise.resolve的参数问题：
    * 如果是一个简单对象或者简单变量的话，直接返回新promise对象同时将值当做返回结果传递下去//number,object,string,function,array....
    * 如果是promise对象直接返回改对象实例,则直接放回该promise对象
    * 带有then方法属性的对象，返回promise对象，同时立即执行then方法
* promise内部的promise异步操作会先于外部执行
    ```javascript
    // 000 111 222 333
    new Promise(function(resolve, reject) {
        console.log('000');
        resolve();
        new Promise(function(resolve, reject) {
            console.log('111');
            resolve();
        }).then(function() {
            console.log('222');
        });
    }).then(function() {
        console.log('333');
    });
    ```

### 缺点
*  无法取消
*  内部抛出的错误，外部无法捕获
*  只能知道处于pending，无法获取根据细节的信息