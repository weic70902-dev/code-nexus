# 现代 JavaScript 教程

本教程将带您从基础到高级全面了解现代 JavaScript。

## 目录

1. [JavaScript 基础](#javascript-基础)
2. [ES6+ 新特性](#es6-新特性)
3. [异步编程](#异步编程)
4. [模块化](#模块化)
5. [最佳实践](#最佳实践)

## JavaScript 基础

### 变量声明
```javascript
// var（函数作用域，不推荐）
var name = 'John';

// let（块级作用域，推荐用于可变变量）
let age = 30;

// const（块级作用域，推荐用于不可变变量）
const PI = 3.14159;
```

### 数据类型
- **基本类型**：number, string, boolean, null, undefined, symbol, bigint
- **引用类型**：object, array, function

### 函数
```javascript
// 函数声明
function greet(name) {
  return `Hello, ${name}!`;
}

// 箭头函数
const greet = (name) => `Hello, ${name}!`;

// 默认参数
function multiply(a, b = 1) {
  return a * b;
}
```

## ES6+ 新特性

### 解构赋值
```javascript
// 数组解构
const [first, second] = [1, 2];

// 对象解构
const { name, age } = { name: 'John', age: 30 };

// 剩余语法
const [head, ...tail] = [1, 2, 3, 4];
```

### 模板字符串
```javascript
const name = 'John';
const greeting = `Hello, ${name}!`;
```

### 类
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}
```

## 异步编程

### Promise
```javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched');
    }, 1000);
  });
};

fetchData().then(data => console.log(data));
```

### Async/Await
```javascript
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

## 模块化

### 导出
```javascript
// math.js
export const add = (a, b) => a + b;
export default function multiply(a, b) {
  return a * b;
}
```

### 导入
```javascript
// main.js
import multiply, { add } from './math.js';
```

## 最佳实践

1. **使用 const 和 let** 而不是 var
2. **使用箭头函数** 处理简短的函数
3. **使用模板字符串** 而不是字符串拼接
4. **使用解构赋值** 提取对象和数组的值
5. **使用 Promise 或 async/await** 处理异步操作
6. **使用模块化** 组织代码结构