## 基本类型
### 参考：[官方文档](https://www.typescriptlang.org/docs/handbook/basic-types.html)&[深入理解ts](https://jkchao.github.io/typescript-book-chinese/)
* Boolean: boolean
* Number: number
    * js和ts中所有的数字类型都是float
* String: string
* Array: type[]或者Array<type>
     * ReadonlyArray<type>：不能将只读数组赋给普通数组，但是通过类型断言进行转换赋值操作.**当通过断言操作把只读数组赋值给普通数组之后，通过修改被赋值的普通数组，则只读数组也被修改了，但是还是不能对原来定义的只读数组进行修改！**
    ```typescript
    function testArray(input:string[]):Array<string>{
        let ra:ReadonlyArray<number> = [1,2,3];
        let na:Array<number> = [4,5,6];
        console.log("--0",ra,na); //[1,2,3] [4,5,6]
        na = <Array<number>>ra;
        console.log("--1",ra,na); //[1,2,3] [1,2,4]
        na[0] = 10; // ok
        console.log("--2",ra,na); // [10,2,3] [10,2,3]
        ra[1] = 11; // error
        return input;
    }
    ```
* Tuple(元组):
    * 和数组类似，但是元组中的参数个数是固定的，而且每个参数的类型也是确定的(不一定相同)，但是在使用的时候必须类型必须一一对应。可以通过for..of进行遍历
    * 可以通过index对特定位置的数据进行赋值操作，但是需要保证类型一致，而且index必须数组最大长度范围之内
    ```typescript
        input:[string,string,number,string[]]  = ["a","b",1,["1","3"]];
    ```
* Enum:
    * 通过enum xx {a,b,x};进行定义,其中起始值为0，通过xx.a进行访问。同时可以通过xx[index]进行访问，如果index超过最大值返回Undefined
    * 同时
    ```typescript
        function testEnum():void{
            enum Color {Red,Green,Blue};
            let c:Color = Color.Red;
            console.log(c);
        }
    ```
* Any: any.当我们不知道该数据会是什么类型的时候使用。any类型的数据变量可以动态赋不同类型的数值
    * 和Object的区别：Object也是一个具体的类型，明确了该值所具有的方法，而any则无法确定！！
* Void: void 
    * any的对立面，不需要任何类型。常用于没有返回值的函数中
    * 定义void类型的变量没什么作用，因为void类型的变量只能被赋值null或者undefined
* Null and Undefined: null/undefined
    * 这种类型的变量，只能被赋值相应的null/undefined
* Never: never
    * 不存在正常返回值的情况：死循环或者总算throw error的函数返回值为never
    * 与void的区别：一个函数没有返回值使用void，一个函数总是没有返回值使用never。never变量不能被赋值任何其他类型除了never
    ```typescript
        function foo(x: string | number): boolean {
            if (typeof x === 'string') {
                return true;
            } else if (typeof x === 'number') {
                return false;
            }
            // 如果不是一个 never 类型，这会报错：
            // - 不是所有条件都有返回值 （严格模式下）
            // - 或者检查到无法访问的代码
            // 但是由于 TypeScript 理解 `fail` 函数返回为 `never` 类型
            // 它可以让你调用它，因为你可能会在运行时用它来做安全或者详细的检查。
            // 因为never根本不会有返回值，也就是说不存在返回值不是boolean的情况
            return fail('Unexhaustive');
        }
        function fail(message: string): never {
            throw new Error(message);
        }
    ```
* Object: object is a type that represents the non-primitive type(非基础类型之外的类型:number,string,boolean,symbol,null,orundefined)
    * Object的类型变量可以赋值：enum,[]
* 类型断言:**类似**类型转换
    * \<type\>value \/ value as type 
