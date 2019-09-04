## 类
* private,public,protected
    * 默认是public。private不能在外部调用。protected和private类似，但是可以在子类在的方法中访问protected属性
    * 当构造函数被定义为protected的时候，该构造函数只能在子类中进行调用，而不能实例化自身
    * 当构造函数被定义为private的时候，该对象无法被继承也无法实例化，因为该构造函数只能在内部调用
    * readonly 属性只能在定义的时候或者构造函数中进行赋值。
    * Parameter properties：通过构造函数参数定义对象属性，该参数需要通过：readonly，private，protected或者public进行修饰
* 抽象类：abstract修饰class xx。抽象类只能被继承无法实例化，与interface的一个区别是抽象了中的函数可以实现
    * 继承函数必须实现抽象类中还没有实现的方法
