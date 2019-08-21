## 事件循环&消息队列(tasks)&microtasks

* [MDN事件循环](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
* [JavaScript 中的 macrotask 和 microtask](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
    * 每个web worker都有自己的事件循环系统，而同一域名下的窗口采用同一个事件循环
    * **Microtasks** are usually scheduled for things that should happen straight after the currently executing script.promise的对象参数的异步操作就是一个微任务。
    * **macrotasks**: setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI rendering
    * **microtasks**: process.nextTick, Promises, Object.observe, MutationObserver
