## 接口
### 参考 [interface赋值报错问题stackoverflow](https://stackoverflow.com/questions/31816061/why-am-i-getting-an-error-object-literal-may-only-specify-known-properties)

* 数据对象接口：接口里面的属性都是普通类型变量。类似于定义了一个简单的Object
    ```typescript
    interface LabeledValue {
        label: string;
        number:number;
        name?: string;
        readonly r:string;
    }
    function printLabel(labeledObj:LabeledValue) {
        console.log(labeledObj.label+" number=",labeledObj.number);
    }
    function testInterface(){
        let myObj = {size: 10, label: "Size 10 Object",number:12,r:"12"};
        // ok。猜想是不是内部断言操作呢还是其他操作？
        printLabel(myObj);
        // error.原因由于size不在LabeledValue指定的属性中。猜想是直接将整个对象转成LabeledValue，然后进行处理
        // As of TypeScript 1.6, properties in object literals that do not have a corresponding property in the type they're being assigned to are flagged as errors.[Excess Property Checks导致报错的根本原因]
        printLabel({size: 10, label: "Size 10 Object",number:12,r:"12"});
    }
    ```
* Excess Property Checks:当直接将一个{}对象赋值给一个确定类型的变量的时候，就会发生过量属性检查即如果{}中包含类型中没有定义的变量就会报错。而如果将{}先赋值给一个没有定义类型的变量，然后通过这个未定义类型的变量给确定类型的变量的时候是可以的(类型断言?)
* 函数类型接口：接口中的属性是函数类型
    ```typescript
    interface SearchFunc {
        search (source:string,subString:string):boolean;
    }
    ```
    * 如果接口中只有一个函数的话则可以直接将函数赋值给该接口，否则需要定义对象分别赋值
    * function中的参数如果没有明确类型的话，ts会在确定的值被赋值给变量的时候推导出具体类型
* Indexable Types:用来定义interface中未被定义的属性
    * 索引签名类型只能是string或者number中的一个。确定x[]访问是索引的类型其中number是string的子类，所以当类型为string的时候，传入数字索引也不会报错
    * 普通属性的类型必须是索引类型值的类型的子类。其实可以这么理解：这个interface中的所有的值都可能通过索引的方式就行获取，如果普通属性的类型和索引值类型不同就可能冲突了
    * 假如一个interface中同时存在[index:string]:type1和[index:number]:type2,type1的类型必须是type2的子类，因为遍历number的时候先转成string再通过string进行查找
    ```typescript
    // 简单indexable使用
    interface SimpleArryIndex {
        [index:number]:string;
    }
    interface SimpleMapIndex {
        [index:string]:string;
    }
    let sa:SimpleArryIndex = ["1","2","3"];
    let sm:SimpleMapIndex = {
        "a":"a",
        "b":"b",
        12:"12",
    }
    // 多属性interface包括indexable
    interface IIndexableTypes {
        name:string;
        sex:string;
        age:number;
        [others:string]:any;
    }
    let iit1:IIndexableTypes = {
        name:"fa",
        sex:"boy",
        age:12,
        //others
        o1:"o1",
        o2:"o2", 
    }
    // 赋值操作
    interface IIT{
        [others:number]:any;
        tall:number;
        name:string;
    }
    let iit:IIT = {
        name:"",
        tall:12,
        // othters
        12:"4242",
        13:"31312",
    };
    function testIndexable(i:IIndexableTypes):void{
        console.log(i.name,i.age,i.sex,i["12"],i[13],i[14]);
    }
    function testIIT(i:IIT):void{
        console.log(i.name,i.tall,i[12],i[0],i[13]);
    }
    testIIT({name:"py",tall:172,0:0,12:"12",13:"13",14:14}); //py 172 12 0 13
    testIndexable({name:"ppp",sex:"middle",age:28,"12":"12",13:"13"});//ppp 28 middle 12 13 undefined
    ```
* class types：被class的继承的接口
    * interface不能用new进行实例化，但是可以将interface作为变量，然后再进行new操作
* interface的继承:
    * interface可以继承其他interface，而且可以继承多个interface
    * 如果继承的多个interface中具有相同的属性名称而且类型不一样则会报错
    * interface可以继承自class
        * 假如class中具有private和protected属性也会被继承，当接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）
* 混合类型的interface:包括普通属性和函数属性
