VUE 基础
1. computed：计算属性：
    计算属性不能作为普通属性，如果作为普通属性的话(存在于data中)，计算属性所具有的特性消失！！！！
    当包含计算属性的节点被移除并且模板中其他地方没有再引用该属性的时候，那么对应的计算属性的getter函数方法不会执行
    在v-for中使用计算属性，起到类似"过滤器的作用"
2. watch:中的属性又必须存在于data中
3. click事件：名称都用小写.???
4. 能够检测到数组更新的方法：push，pop，shift，unshift，splice，sort，reverse
   当你利用索引直接设置一个数组项时/当你修改数组的长度时 不会触发更新状态
5. vue updated事件：只有当dom节点有更新，才会调用
6. v-model:内容封装了value和event对象，用于表示被重写的事件和数值(自定义事件)
   * 忽略表单元素value，checked，selected的初始值，将vue数据作为数据源
   * .lazy:只有当数据内容改变后才触发
   * 针对自定义模板根节点的dom上的事件，可以通过在子模板 v-on='this.$listeners'绑定到子节点
7. 模板:想要获取动态vue数据的属性一般通过v-bind和v-on进行修饰，如果是静态内容的话，直接用属性值就好。如果用了修饰关键字，则value就会到vue的属性中去找，找不到报错！！！
   * 组件名：推荐方式：全部小写通过连字符连接(kebab-case)，也可以XxxXxxXxx(PascalCase)方式XxxXxxXxx组件可以通过xxx-xxx-xxx使用。!!!注意，尽管如此，直接在 DOM (即非字符串的模板) 中**使用时**只有 kebab-case 是有效的。!!!
   * 全局注册：Vue.component
   * 局部注册：var ComponentA = { /* ... */ }
   * !!!每个模板只能有一个根元素。!!!如果是写局部组件的时候，没有唯一根元素的话，那么其他引入的组件不会渲染。如果没有最外层的div，component-b不渲染！！！！
   ```javascript
    var ComponentB = {
       template: `<div>child2</div>`,
    };
    var ComponentA = {
    components:{
        "component-b":ComponentB,
    },
    template:`
       <div>
           <div>child1xxxx</div>
           <component-b></component-b>
       </div>`,
    };
    ```
8. prop：
   * 大小写问题：由于html大小写不敏感,camelCase(驼峰命名法)的prop名需要使用其等价的kebab-case(短横线分隔命名)命名.!!!重申一次，如果你使用字符串模板，那么这个限制就不存在了!!!
9:inheritAttrs:false和$attrs 配合使用：
  * $attrs只从父组件读取数据,style class 用户事件不被包含
  * 其中$attrs只能传递到子组件,即只能在字组件中使用。如果想在后续孙子组件中继续使用则在子节点中需要通过v-bind='$attrs',向下传递,在传递过程中还能通过v-bind添加属性
  * inheritAttrs:false只控制本身组件是否继承父组件的东西。
10:$listener
  * 直接在页面渲染的时候为{}空对象，console.log能够显示具体监听事件信息
  * 大致使用和$attr一样,只从父组件读取监听对象信息，想向下传递需要手动v-on='$listener',可以在传递过程中通过v-on进行添加
  * (孙)子组件想触发事件可以通过this.$emit("actionName")或者this.$listener.actionName();
  * 如果在实际定义是添加.native修饰符则不会被包含在$listener中
11:事件：
  * 在template html字符串中直接定义，任何命名方式可以
    ```javascript
    template: `
        <div>
        <hr>
        <div style='font-weight:bold;color:red;'>level one</div>
        <p @click='click1'>panda from china</p>
        <div>{{$attrs}}</div>
        <city :name='name' :addr='addr' @my-Event='doSomething' @click1.native='click1' @click2='click2' @click3='click3'>
        </city>
        </div>`
    ```
  * !!否则的话，事件名称会转换为小写!!
12. sync双向实时更新数据：需要在子组件触发this.$emit("update:title", "fdfasd");达到更新数据的需求
   <text-document v-bind:title.sync="doc.title"></text-document>
   <text-document v-bind:title="doc.title" v-on:update:title="doc.title = value"></text-document>
13 插槽，组件dom包含的内容如何在组件内部使用分发
    * 组件内必须包含一个<slot>，否则组件插槽内容会被丢弃
    * 插槽中的内容满足动态绑定，如果父组件的相关内容变化，插槽中的数据动态变更
    * 父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。
    * 为slot设置默认内容：在<slot>xxx</slot>,其中xxx为默认内容，如果外部没有提供数据，渲染默认内容
    * 具名插槽：通过template包裹，v-slot:xx进行命名，<slot name='xx'></slot>进行填充
    * template v-slot:prop="slotProps"，用于绑定slotProps对应插槽prop属性的对象.所有组件内部的插槽绑定的对象都会被放到soltProps对象中
    * v-slot="slotProps"等价于v-slot:default="slotProps"。如果只有一个插槽则可以将v-slot直接定义在组件dom上否则需要单独设置template进行设置
    *  <current-user v-slot="{ user:u }"> 重命名
14. $refs:只能访问到当前作用域下的带ref的组件,可以通过$ref一级一级往下找(this.$refs.xxx.$refs.input.focus())
    * 只有通过v-for,变量生成的dom，带有相同ref名称，然后获取到的ref才是数组，如果是自己手动写的几个一样的名称只会获取最后一个
