# ES6+ 新特性

ES6（ECMAScript 2015）是 JavaScript 语言的一个重要更新，引入了许多新特性和语法糖，使代码更加简洁和强大。之后的版本（ES2016, ES2017, 等）也持续添加了新的功能。

## let 和 const

ES6 引入了块级作用域的变量声明：

```javascript
// let 声明块级作用域变量
function example() {
    if (true) {
        let blockScoped = "我是块级变量";
        console.log(blockScoped); // 正常访问
    }
    // console.log(blockScoped); // 错误！无法访问块级变量
}

// const 声明常量
const API_URL = "https://api.example.com";
// API_URL = "new url"; // 错误！不能重新赋值常量

// 但 const 对象的内容可以修改
const config = {
    timeout: 5000,
    retries: 3
};
config.timeout = 10000; // 可以修改对象属性
console.log(config);
```

## 模板字符串

使用反引号（`）创建模板字符串，支持多行和插值：

```javascript
const name = "张三";
const age = 25;

// 模板字符串
const greeting = `你好，我是 ${name}，今年 ${age} 岁`;
console.log(greeting);

// 多行字符串
const multiline = `
这是第一行
这是第二行
这是第三行
`;
console.log(multiline);

// 在模板字符串中使用表达式
const price = 100;
const tax = 0.1;
const total = `总价：${price * (1 + tax)} 元`;
console.log(total);
```

## 解构赋值

从数组或对象中提取值并赋给变量：

```javascript
// 数组解构
const colors = ["红", "绿", "蓝"];
const [red, green, blue] = colors;
console.log(red, green, blue); // 红 绿 蓝

// 跳过某些值
const [first, , third] = colors;
console.log(first, third); // 红 蓝

// 对象解构
const person = {
    name: "李四",
    age: 30,
    city: "北京"
};

const { name, age, city } = person;
console.log(name, age, city); // 李四 30 北京

// 重命名变量
const { name: fullName, age: yearsOld } = person;
console.log(fullName, yearsOld); // 李四 30

// 默认值
const { name: userName, country = "中国" } = person;
console.log(userName, country); // 李四 中国
```

## 扩展运算符

使用 ... 语法展开数组或对象：

```javascript
// 数组扩展
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 复制数组
const copied = [...arr1];
console.log(copied); // [1, 2, 3]

// 将 NodeList 转换为数组
// const elements = [...document.querySelectorAll('div')];

// 对象扩展
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// 复制对象
const cloned = { ...obj1 };
console.log(cloned); // { a: 1, b: 2 }

// 合并对象（后者覆盖前者）
const defaults = { theme: "light", lang: "zh" };
const userPrefs = { lang: "en", notifications: true };
const settings = { ...defaults, ...userPrefs };
console.log(settings); // { theme: "light", lang: "en", notifications: true }
```

## 箭头函数

更简洁的函数语法，且不绑定自己的 this：

```javascript
// 基本语法
const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

// 单参数可以省略括号
const square = x => x * x;
console.log(square(4)); // 16

// 多行函数体需要大括号和 return
const multiply = (a, b) => {
    const result = a * b;
    return result;
};
console.log(multiply(3, 4)); // 12

// 箭头函数不绑定 this
const calculator = {
    number: 10,
    // 普通函数
    add: function(x) {
        return this.number + x;
    },
    // 箭头函数
    multiply: (x) => {
        // 这里的 this 不是 calculator 对象
        return this.number * x; // 可能不是期望的结果
    },
    // 在方法中使用箭头函数保持 this 绑定
    addWithArrow: function() {
        return (x) => this.number + x;
    }
};

console.log(calculator.add(5)); // 15
const adder = calculator.addWithArrow();
console.log(adder(5)); // 15
```

## 类（Class）

ES6 引入了类语法，使面向对象编程更加直观：

```javascript
// 基本类定义
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(`${this.name} 发出了声音`);
    }
}

// 继承
class Dog extends Animal {
    constructor(name, breed) {
        super(name); // 调用父类构造函数
        this.breed = breed;
    }
    
    speak() {
        super.speak(); // 调用父类方法
        console.log(`${this.name} 在汪汪叫`);
    }
    
    // 静态方法
    static getSpecies() {
        return "犬类";
    }
}

const dog = new Dog("旺财", "金毛");
dog.speak();
console.log(Dog.getSpecies()); // "犬类"

// Getter 和 Setter
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    
    // Getter
    get area() {
        return this.width * this.height;
    }
    
    // Setter
    set area(value) {
        this.width = Math.sqrt(value);
        this.height = Math.sqrt(value);
    }
}

const rect = new Rectangle(4, 5);
console.log(rect.area); // 20
rect.area = 25;
console.log(rect.width, rect.height); // 5 5
```

## 模块

ES6 模块提供了标准化的模块系统：

```javascript
// utils.js - 导出模块
// 命名导出
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

// 默认导出
export default function multiply(a, b) {
    return a * b;
}

// 可以导出整个对象
const mathUtils = {
    square: (x) => x * x,
    cube: (x) => x * x * x
};
export { mathUtils };

// main.js - 导入模块
// 导入命名导出
import { PI, add, subtract } from './utils.js';

// 导入默认导出
import multiply from './utils.js';

// 导入所有命名导出
import * as utils from './utils.js';

// 导入默认导出和命名导出
import multiplyFunc, { PI as pi, add as sum } from './utils.js';

console.log(pi); // 3.14159
console.log(sum(2, 3)); // 5
console.log(multiplyFunc(4, 5)); // 20
console.log(utils.subtract(10, 3)); // 7
```

## Promise 和异步函数

更好的异步编程支持：

```javascript
// Promise 链式调用
function fetchUserData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: `用户${id}` });
            } else {
                reject(new Error("无效的用户ID"));
            }
        }, 1000);
    });
}

fetchUserData(1)
    .then(user => {
        console.log("用户信息:", user);
        return fetchUserData(user.id + 1);
    })
    .then(nextUser => {
        console.log("下一个用户:", nextUser);
    })
    .catch(error => {
        console.error("错误:", error.message);
    });

// async/await
async function loadUsers() {
    try {
        const user1 = await fetchUserData(1);
        console.log("用户1:", user1);
        
        const user2 = await fetchUserData(2);
        console.log("用户2:", user2);
        
        // 并行执行
        const [user3, user4] = await Promise.all([
            fetchUserData(3),
            fetchUserData(4)
        ]);
        console.log("用户3和4:", user3, user4);
    } catch (error) {
        console.error("加载失败:", error.message);
    }
}

loadUsers();
```

## 其他有用的新特性

```javascript
// 默认参数
function greet(name = "陌生人", greeting = "你好") {
    return `${greeting}，${name}！`;
}
console.log(greet()); // "你好，陌生人！"
console.log(greet("张三")); // "你好，张三！"
console.log(greet("李四", "欢迎")); // "欢迎，李四！"

// 剩余参数
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15

// for...of 循环
const fruits = ["苹果", "香蕉", "橙子"];
for (const fruit of fruits) {
    console.log(fruit);
}

// Map 和 Set 数据结构
const map = new Map();
map.set("name", "张三");
map.set("age", 25);
console.log(map.get("name")); // "张三"

const set = new Set([1, 2, 3, 3, 4, 4]);
console.log(set); // Set { 1, 2, 3, 4 }

// Symbol 类型
const sym1 = Symbol("description");
const sym2 = Symbol("description");
console.log(sym1 === sym2); // false（每个 Symbol 都是唯一的）

// 解构赋值与函数参数
function printUser({ name, age = 18, city = "未知" } = {}) {
    console.log(`姓名: ${name}, 年龄: ${age}, 城市: ${city}`);
}
printUser({ name: "王五", age: 30 }); // "姓名: 王五, 年龄: 30, 城市: 未知"
```

## 实践练习

1. 使用类语法重构之前创建的计算器对象
2. 创建一个模块，封装常用的 DOM 操作方法，并在另一个文件中使用
3. 实现一个异步数据加载器，使用 async/await 处理多个并发请求
4. 使用解构赋值和扩展运算符简化对象和数组的操作代码

## 下一步

接下来您可以学习：
- [DOM 操作](./dom) - 学习如何使用 JavaScript 操作网页元素
- [TypeScript 埀门](./ts-basics) - 开始学习 TypeScript
- [最佳实践](./best-practices) - 学习 JavaScript 编码规范与优化技巧