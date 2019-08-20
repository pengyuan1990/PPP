## async&await

* 基本用法：当async函数执行的时候，一旦async内部遇到await就会先返回等到异步操作完成，再接着执行函数体内后面的语句。而和async同级的同步方法会继续执行，不受async内部异步操作影响。await中的同步执行方法和普通的同步执行方法一样，而await后面的方法就放在本轮事件循环的后面执行了，这点和promis一样。
  ```javascript
    /* 
        11
        >>>>asyncTest  tttt
        xxxx 000
        xxxx 111
        22
        >>>>asyncTest  5555
    */
    function xxx(){
        console.log("xxxx 000");
        for(let i=0;i<1000000000;i++){} // 虽然卡了主线程，但是后面的同步代码还是会等待这个完成
        console.log("xxxx 111");
        return "5555";
    }
    async function asyncTest(tt){
        console.log(">>>>asyncTest ",tt);
        let vv =  await xxx();
        console.log(">>>>asyncTest ",vv);
    }
    console.log("11");
    asyncTest("tttt");
    console.log("22");
  ```
* async 返回一个promise对象，而**async内部的return值会成为then后面回调函数的参数，async内部throw的错误会被后面的catch或者reject处理**
* await 正常后面接一个promise对象(**直接获取promise的resolve或者reject状态,如果是reject则会跑到async的函数体里面，需要async返回的promise的catch捕获,如果是resolve则直接吧resolve的参数当做返回值放回给async,而忽略return的返回值**),如果不是promise对象则直接返回对应的值
* 任何一个await的promise对象变为reject，那么整个async函数都会中断执行。
  ```javascript
    /*
      如果调用pp：直接抛出error "www"，然后被catch捕获
      不调用pp：直接把rrr的参数"aaa"当作结果返回给p2,而”xxx“被抛弃
      如果async直接有返回值”yyy“,则传递给then
      如果async自身抛出”zzz",也会被catch捕获
    */
    function pp(){
        return new Promise((rrr,jjj)=>{
            // throw new Error("www");
            jjj("www");
        });
    }
    function ppp(){
        return new Promise((rrr,jjj)=>{
            rrr("rrr");
            return "xxx";
        });
    }
    (async () => {
        const p1 = await pp();
        const p2 = await ppp();
        console.log(p1);
        console.log(p2);
        throw new Error("zzz");
        //return "yyy";
    })().then(v=>console.log("rr",v)).catch(e=>console.log("ee",e));
  ```
* 如果不希望await的reject或者error影响后面的await代码的执行，可以对await语句添加的try..catch或者跟catch处理错误
* 多个并列的await语句之间如果没有先后关系，应该同时触发异步操作
    ```javascript
    // 写法一
    let [foo, bar] = await Promise.all([getFoo(), getBar()]);
    // 写法二
    let fooPromise = getFoo();
    let barPromise = getBar();
    let foo = await fooPromise;
    let bar = await barPromise;
    ```
