# TypeScript 基础

TypeScript 是 JavaScript 的一个超集，添加了静态类型定义。它可以帮助开发者在开发阶段发现潜在的错误，提供更好的代码提示和重构支持。

## 什么是 TypeScript？

TypeScript 是由微软开发的开源编程语言，它是 JavaScript 的超集，最终会被编译成普通的 JavaScript 代码。TypeScript 的主要优势包括：

1. 静态类型检查
2. 更好的代码提示和自动补全
3. 更易于维护大型项目
4. 与现有 JavaScript 代码兼容

## TypeScript 基本类型

### 基本数据类型

```typescript
// boolean 布尔值
let isDone: boolean = false;

// number 数字
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

// string 字符串
let color: string = "blue";
color = 'red';

// 模板字符串
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}. I'll be ${age + 1} years old next month.`;

// array 数组
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// tuple 元组
let x: [string, number];
x = ['hello', 10]; // OK
// x = [10, 'hello']; // Error

// enum 枚举
enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// enum 可以手动设置值
enum Color2 {Red = 1, Green = 2, Blue = 4}
let c2: Color2 = Color2.Green;

// any 任意类型
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// void 空值
function warnUser(): void {
    console.log("This is my warning message");
}

// null 和 undefined
let u: undefined = undefined;
let n: null = null;

// never 永不存在的值
function error(message: string): never {
    throw new Error(message);
}

// object 对象类型
declare function create(o: object | null): void;
create({ prop: 0 }); // OK
create(null); // OK
```

### 类型断言

```typescript
// 尖括号语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as 语法（推荐在 JSX 中使用）
let someValue2: any = "this is a string";
let strLength2: number = (someValue2 as string).length;
```

## 接口（Interfaces）

接口用于定义对象的结构：

```typescript
// 基本接口
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };
console.log(greeter(user));

// 可选属性
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

// 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // Error!

// 函数类型
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
};

// 可索引类型
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];
```

## 类（Classes）

TypeScript 支持基于类的面向对象编程：

```typescript
// 基本类
class Greeter {
    greeting: string;
    
    constructor(message: string) {
        this.greeting = message;
    }
    
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");

// 继承
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

// 公共、私有与受保护的修饰符
class Animal2 {
    public name: string;
    private _age: number;
    protected species: string;
    
    constructor(theName: string, theAge: number, theSpecies: string) {
        this.name = theName;
        this._age = theAge;
        this.species = theSpecies;
    }
    
    public getAge(): number {
        return this._age;
    }
}

// getter 和 setter
class Employee {
    private _fullName: string = "";
    
    get fullName(): string {
        return this._fullName;
    }
    
    set fullName(newName: string) {
        if (newName && newName.length > 0) {
            this._fullName = newName;
        } else {
            console.log("错误：姓名不能为空！");
        }
    }
}

let employee = new Employee();
employee.fullName = "张三";
if (employee.fullName) {
    console.log(employee.fullName);
}

// 静态属性
class Grid {
    static origin = {x: 0, y: 0};
    
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
```

## 函数

TypeScript 为函数提供了更强的类型检查：

```typescript
// 函数声明
function add(x: number, y: number): number {
    return x + y;
}

// 函数表达式
let myAdd = function(x: number, y: number): number { 
    return x + y; 
};

// 完整的函数类型
let myAdd2: (x: number, y: number) => number =
    function(x: number, y: number): number { 
        return x + y; 
    };

// 可选参数和默认参数
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

function buildName2(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

// 剩余参数
function buildName3(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName3("Joseph", "Samuel", "Lucas", "MacKinzie");

// this 和箭头函数
interface Card {
    suit: string;
    card: number;
}

interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            
            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
```

## 泛型

泛型允许我们创建可重用的组件，这些组件可以处理多种类型：

```typescript
// 基本泛型
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("myString");  // type of output will be 'string'
let output2 = identity("myString");  // type argument inferred

// 泛型接口
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity2<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity2;

// 泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

// 泛型约束
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```

## 模块

TypeScript 支持模块系统：

```typescript
// math.ts
export const PI = 3.14159;

export function add(x: number, y: number): number {
    return x + y;
}

export function multiply(x: number, y: number): number {
    return x * y;
}

// 默认导出
export default function subtract(x: number, y: number): number {
    return x - y;
}

// main.ts
import subtract, { PI, add, multiply } from './math';

console.log(PI);
console.log(add(2, 3));
console.log(multiply(4, 5));
console.log(subtract(10, 3));

// 导入所有导出内容
import * as math from './math';
console.log(math.PI);
console.log(math.add(1, 2));
```

## 实践练习

1. 创建一个 TypeScript 项目，实现一个简单的学生管理系统
2. 使用接口定义不同类型的数据结构，并实现相应的处理函数
3. 创建一个泛型工具库，包含常用的数组和对象操作方法
4. 实现一个简单的计算器类，支持加减乘除运算

## 下一步

接下来您可以学习：
- [TypeScript 进阶](./ts-advanced) - 学习泛型、装饰器等高级特性
- [最佳实践](./best-practices) - 学习 TypeScript 编码规范与优化技巧