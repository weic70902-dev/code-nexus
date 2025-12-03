# JavaScript 基础

JavaScript 是一种轻量级的解释型或即时编译型编程语言，主要用于 Web 开发中实现网页的动态交互效果。本教程将带您从零开始学习 JavaScript 的基本概念和语法。

## 什么是 JavaScript？

JavaScript 是一种多范式的编程语言，支持面向对象编程、命令式编程和函数式编程。它是 Web 的三大核心技术之一（HTML、CSS 和 JavaScript）。

## JavaScript 基本语法

### 变量声明

JavaScript 提供了三种方式来声明变量：

```javascript
// var（函数作用域，不推荐在现代 JavaScript 中使用）
var name = "张三";

// let（块级作用域，推荐用于可变变量）
let age = 25;

// const（块级作用域，推荐用于不可变变量）
const PI = 3.14159;
```

### 数据类型

JavaScript 有以下几种基本数据类型：

```javascript
// Number（数字）
let num = 42;
let float = 3.14;

// String（字符串）
let str = "Hello World";
let anotherStr = 'JavaScript';

// Boolean（布尔值）
let isTrue = true;
let isFalse = false;

// Undefined（未定义）
let undefinedVar;

// Null（空值）
let nullVar = null;

// Symbol（符号，ES6 新增）
let sym = Symbol('description');

// BigInt（大整数，ES2020 新增）
let bigInt = 123456789012345678901234567890n;
```

### 对象

对象是 JavaScript 中的一种复合数据类型：

```javascript
// 对象字面量
let person = {
    name: "张三",
    age: 25,
    isStudent: false,
    greet: function() {
        return "你好，我是 " + this.name;
    }
};

// 访问对象属性
console.log(person.name); // "张三"
console.log(person['age']); // 25

// 调用对象方法
console.log(person.greet()); // "你好，我是 张三"
```

### 数组

数组是一种特殊的对象，用于存储有序的数据集合：

```javascript
// 数组字面量
let fruits = ["苹果", "香蕉", "橙子"];

// 访问数组元素
console.log(fruits[0]); // "苹果"

// 数组长度
console.log(fruits.length); // 3

// 添加元素
fruits.push("葡萄");
console.log(fruits); // ["苹果", "香蕉", "橙子", "葡萄"]

// 删除最后一个元素
fruits.pop();
console.log(fruits); // ["苹果", "香蕉", "橙子"]
```

## 运算符

JavaScript 支持多种运算符：

```javascript
// 算术运算符
let a = 10;
let b = 3;
console.log(a + b); // 13（加法）
console.log(a - b); // 7（减法）
console.log(a * b); // 30（乘法）
console.log(a / b); // 3.333...（除法）
console.log(a % b); // 1（取余）
console.log(a ** b); // 1000（幂运算）

// 比较运算符
console.log(a > b); // true
console.log(a < b); // false
console.log(a >= b); // true
console.log(a <= b); // false
console.log(a == b); // false
console.log(a === b); // false（严格相等）
console.log(a != b); // true
console.log(a !== b); // true（严格不相等）

// 逻辑运算符
let x = true;
let y = false;
console.log(x && y); // false（逻辑与）
console.log(x || y); // true（逻辑或）
console.log(!x); // false（逻辑非）
```

## 控制结构

### 条件语句

```javascript
let score = 85;

// if...else 语句
if (score >= 90) {
    console.log("优秀");
} else if (score >= 80) {
    console.log("良好");
} else if (score >= 60) {
    console.log("及格");
} else {
    console.log("不及格");
}

// switch 语句
let day = 3;
switch (day) {
    case 1:
        console.log("星期一");
        break;
    case 2:
        console.log("星期二");
        break;
    case 3:
        console.log("星期三");
        break;
    default:
        console.log("未知");
}
```

### 循环语句

```javascript
// for 循环
for (let i = 0; i < 5; i++) {
    console.log("循环次数: " + i);
}

// while 循环
let j = 0;
while (j < 3) {
    console.log("while 循环: " + j);
    j++;
}

// do...while 循环
let k = 0;
do {
    console.log("do...while 循环: " + k);
    k++;
} while (k < 3);

// for...of 循环（遍历数组）
let colors = ["红", "绿", "蓝"];
for (let color of colors) {
    console.log(color);
}

// for...in 循环（遍历对象属性）
let obj = {a: 1, b: 2, c: 3};
for (let key in obj) {
    console.log(key + ": " + obj[key]);
}
```

## 函数

函数是 JavaScript 中的基本构建块：

```javascript
// 函数声明
function greet(name) {
    return "你好，" + name;
}

console.log(greet("张三")); // "你好，张三"

// 函数表达式
let add = function(a, b) {
    return a + b;
};

console.log(add(5, 3)); // 8

// 箭头函数（ES6 新增）
let multiply = (a, b) => a * b;
console.log(multiply(4, 5)); // 20

// 带默认参数的函数
function introduce(name, age = 18) {
    return "我是 " + name + "，今年 " + age + " 岁";
}

console.log(introduce("李四")); // "我是 李四，今年 18 岁"
console.log(introduce("王五", 25)); // "我是 王五，今年 25 岁"
```

## 实践练习

1. 创建一个程序，计算并输出 1 到 100 之间所有偶数的和
2. 编写一个函数，接受一个数组作为参数，返回数组中的最大值
3. 创建一个对象，表示一个学生的信息（姓名、年龄、成绩等），并为其添加一个方法来计算平均成绩

## 下一步

接下来您可以学习：
- [JavaScript 进阶](./js-advanced) - 学习闭包、原型链等高级概念
- [ES6+ 新特性](./es6-plus) - 了解现代 JavaScript 的新特性
- [DOM 操作](./dom) - 学习如何使用 JavaScript 操作网页元素