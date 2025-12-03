# JavaScript 进阶

在掌握了 JavaScript 基础知识之后，我们需要深入了解一些更高级的概念和特性，这些内容对于编写高质量的 JavaScript 代码至关重要。

## 作用域和闭包

### 作用域

作用域决定了变量的可访问范围：

```javascript
// 全局作用域
var globalVar = "我是全局变量";

function outerFunction() {
    // 函数作用域
    var outerVar = "我是外部函数变量";
    
    function innerFunction() {
        // 嵌套函数作用域
        var innerVar = "我是内部函数变量";
        console.log(globalVar); // 可以访问全局变量
        console.log(outerVar);  // 可以访问外部函数变量
        console.log(innerVar);  // 可以访问自己的变量
    }
    
    innerFunction();
    console.log(globalVar); // 可以访问全局变量
    console.log(outerVar);  // 可以访问自己的变量
    // console.log(innerVar); // 错误！无法访问内部函数变量
}

outerFunction();
```

### 闭包

闭包是指函数可以访问并操作其外部作用域中的变量：

```javascript
function createCounter() {
    let count = 0; // 外部函数的局部变量
    
    // 返回一个内部函数，形成闭包
    return function() {
        count++; // 内部函数可以访问外部函数的变量
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// 每个计数器实例都有独立的计数状态
const counter2 = createCounter();
console.log(counter2()); // 1
console.log(counter());  // 4
```

## this 关键字

`this` 的值取决于函数的调用方式：

```javascript
// 全局环境中的 this
console.log(this); // 在浏览器中指向 window 对象

// 对象方法中的 this
const person = {
    name: "张三",
    greet: function() {
        console.log("你好，我是 " + this.name);
    }
};
person.greet(); // "你好，我是 张三"

// 构造函数中的 this
function Student(name) {
    this.name = name;
    this.greet = function() {
        console.log("学生 " + this.name + " 向你问好");
    };
}

const student1 = new Student("李四");
student1.greet(); // "学生 李四 向你问好"

// 箭头函数中的 this
const teacher = {
    name: "王老师",
    teach: function() {
        // 普通函数中的 this 指向 teacher 对象
        console.log("教师 " + this.name + " 正在讲课");
        
        // 箭头函数中的 this 继承自外层作用域
        const innerFunction = () => {
            console.log("箭头函数中的 this: " + this.name);
        };
        innerFunction();
    }
};

teacher.teach();
```

## 原型和原型链

JavaScript 是基于原型的语言：

```javascript
// 构造函数
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(this.name + " 发出了声音");
};

// 创建实例
const dog = new Animal("小狗");
dog.speak(); // "小狗 发出了声音"

// 继承
function Dog(name, breed) {
    Animal.call(this, name); // 调用父构造函数
    this.breed = breed;
}

// 设置原型链
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// 添加子类特有的方法
Dog.prototype.bark = function() {
    console.log(this.name + " 在汪汪叫");
};

const myDog = new Dog("旺财", "金毛");
myDog.speak(); // "旺财 发出了声音"
myDog.bark();  // "旺财 在汪汪叫"

// 检查原型链
console.log(myDog instanceof Dog);    // true
console.log(myDog instanceof Animal); // true
```

## 异步编程

JavaScript 使用异步编程来处理耗时操作：

### 回调函数

```javascript
// 模拟异步操作
function fetchData(callback) {
    setTimeout(() => {
        callback("数据加载完成");
    }, 2000);
}

console.log("开始加载数据...");
fetchData((data) => {
    console.log(data); // 2秒后输出 "数据加载完成"
});
console.log("继续执行其他代码...");
```

### Promise

```javascript
// 使用 Promise 处理异步操作
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        // 模拟网络请求
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: "用户" + userId,
                    email: "user" + userId + "@example.com"
                });
            } else {
                reject("无效的用户ID");
            }
        }, 1000);
    });
}

// 使用 Promise
fetchUserData(1)
    .then(user => {
        console.log("获取用户信息:", user);
        return fetchUserData(user.id + 1);
    })
    .then(nextUser => {
        console.log("获取下一个用户信息:", nextUser);
    })
    .catch(error => {
        console.error("发生错误:", error);
    });
```

### async/await

```javascript
// 使用 async/await 简化异步代码
async function loadUsers() {
    try {
        console.log("正在加载用户1...");
        const user1 = await fetchUserData(1);
        console.log("用户1:", user1);
        
        console.log("正在加载用户2...");
        const user2 = await fetchUserData(2);
        console.log("用户2:", user2);
        
        console.log("所有用户加载完成");
    } catch (error) {
        console.error("加载失败:", error);
    }
}

loadUsers();
```

## 错误处理

适当的错误处理是健壮应用程序的关键：

```javascript
// try...catch 语句
function divide(a, b) {
    try {
        if (b === 0) {
            throw new Error("除数不能为零");
        }
        return a / b;
    } catch (error) {
        console.error("计算错误:", error.message);
        return null;
    } finally {
        console.log("计算完成");
    }
}

console.log(divide(10, 2)); // 5
console.log(divide(10, 0)); // 错误处理
```

## 模块系统

现代 JavaScript 支持模块化开发：

```javascript
// math.js - 导出模块
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// 默认导出
export default function subtract(a, b) {
    return a - b;
}

// main.js - 导入模块
import subtract, { PI, add, multiply } from './math.js';

console.log(PI); // 3.14159
console.log(add(2, 3)); // 5
console.log(multiply(4, 5)); // 20
console.log(subtract(10, 3)); // 7

// 导入所有导出内容
import * as math from './math.js';
console.log(math.PI); // 3.14159
console.log(math.add(1, 2)); // 3
```

## 实践练习

1. 创建一个计算器对象，具有加减乘除方法，并使用闭包保护计算结果
2. 实现一个简单的发布-订阅模式，使用原型和原型链
3. 编写一个异步函数，按顺序加载多个用户的数据，并处理可能出现的错误
4. 创建一个模块，封装常用的数组操作方法，并在另一个文件中使用这些方法

## 下一步

接下来您可以学习：
- [ES6+ 新特性](./es6-plus) - 了解现代 JavaScript 的新特性
- [DOM 操作](./dom) - 学习如何使用 JavaScript 操作网页元素
- [TypeScript 埀门](./ts-basics) - 开始学习 TypeScript