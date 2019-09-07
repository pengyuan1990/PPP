## 类
* private,public,protected
    * 默认是public。private不能在外部调用。protected和private类似，但是可以在子类在的方法中访问protected属性
    * 当构造函数被定义为protected的时候，该构造函数只能在子类中进行调用，而不能实例化自身
    * 当构造函数被定义为private的时候，该对象无法被继承也无法实例化，因为该构造函数只能在内部调用
    * readonly 属性只能在定义的时候或者构造函数中进行赋值。
    * Parameter properties：通过构造函数参数定义对象属性，该参数需要通过：readonly，private，protected或者public进行修饰
* 抽象类：abstract修饰class xx。抽象类只能被继承无法实例化，与interface的一个区别是抽象了中的函数可以实现
    * 继承函数必须实现抽象类中还没有实现的方法 
## generics(泛型)
* 与any关键词的一个区别：any表示所有任何类型都可以，这样就失去了ts的优势
* 泛型的一般使用方式:通过T来进行占位操作，在具体使用的饿时候确定具体参数类型
    ```typescript
    function identity<T>(arg: T): T {
        return arg;
    }
    let o1 = identity<string>("myString");
    let o2 = identity("myString");
    ```

