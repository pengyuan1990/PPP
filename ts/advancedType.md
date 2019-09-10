## Advanced Types

* Intersection Types(交叉类型):多个类型共同组合成同一类型，包括所有类型的相关属性:**a&b&c**
* Union Types(联合类型)：任意类型中的一个类型:**a|b|c**
    * Type Guards and Differentiating Types:
    ```typescript
    let pet = getSmallPet();
    if (pet.swim) {
        pet.swim();
    }else if ((pet as Bird).fly) { //和上if里面的判断等价
        pet.fly();
    }
    ```
    * User-Defined Type Guards && Using the in operator 
    ```typescript
    function isFish(pet: Fish | Bird): pet is Fish {
        return (pet as Fish).swim !== undefined;
    }
    function move(pet: Fish | Bird) {
        if ("swim" in pet) {
            return pet.swim();
        }
        return pet.fly();
    }
    ```
* Nullable types:null和undefined：默认情况下它们可分配给任何类型内容即它们是所有类型的有效值，除非设置了--strictNullChecks。这时候就需要通过union type进行定义(a|null|undefined)
    * Optional parameters and properties:当设置了--strictNullChecks的情况下可选属性或参数都是默认定义为 **a|undefined**
    * 在编译器无法消除null和undefined的时候可以通过**param!**移除null和undefined的影响(嵌套函数...)
    ```typescript
    function fixed(name: string | null): string {
        function postfix(epithet: string) {
            return name!.charAt(0) + '.  the ' + epithet; // ok
        }
        name = name || "Bob";
        return postfix("great");
    }
    ```
* Type Aliases:别名没有创造新类型，而只是新建了一个名称关联对应的类型
    ```typescript
    type Name = string;
    type NameResolver = () => string;
    type NameOrResolver = Name | NameResolver;
    ```
    * 类型别名不能出现在**声明语句的右侧**
* String Literal Types && Numeric Literal Types:
    ```typescript
    type Easing = "ease-in" | "ease-out" | "ease-in-out";
    type Level = 1 | 2 | 3 | 4 | 5 | 6;
    ```
* Discriminated Unions:
   * 为每个类型定义一个名称相同的属性，通过该属性判断具体类型
   * 用union将所有类型进行进行组合
   ```typescript
    interface Square {
        kind: "square";
        size: number;
    }
    interface Rectangle {
        kind: "rectangle";
        width: number;
        height: number;
    }
    interface Circle {
        kind: "circle";
        radius: number;
    }
    type Shape = Square | Rectangle | Circle;
    function area(s: Shape) {
        switch (s.kind) {
            case "square": return s.size * s.size;
            case "rectangle": return s.height * s.width;
            case "circle": return Math.PI * s.radius ** 2;
        }
    }
   ```
   * Exhaustiveness checking(完整性检查):如果联合的类型太多，而switch没有检查所有类型的时候
        * 设置 --strictNullChecks。没有处理的情况当中undefined处理，老版本代码可能不兼容该方法
        * 没有处理的情况返回never(即抛出错误)
* Conditional Types
   ```typescript
   T extends U ? X : Y
   ```
