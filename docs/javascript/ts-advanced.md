# TypeScript 进阶

在掌握了 TypeScript 基础知识之后，我们可以学习一些更高级的特性，这些特性可以帮助我们编写更加强大和灵活的代码。

## 高级类型

### 联合类型

联合类型表示一个值可以是几种类型之一：

```typescript
// 联合类型
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

padLeft("Hello world", 4); // returns "    Hello world"
padLeft("Hello world", "  "); // returns "  Hello world"
```

### 交叉类型

交叉类型将多个类型合并为一个类型：

```typescript
// 交叉类型
interface ErrorHandling {
    success: boolean;
    error?: { message: string };
}

interface ArtworksData {
    artworks: { title: string }[];
}

interface ArtistsData {
    artists: { name: string }[];
}

// 这些接口可以是 ErrorHandling 与 ArtworksData 或 ArtistsData 的交叉类型
type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
    if (response.success) {
        response.artists.map(artist => artist.name); // OK
    }
};
```

### 字面量类型

字面量类型允许我们指定变量必须具有的确切值：

```typescript
// 字符串字面量类型
type Easing = "ease-in" | "ease-out" | "ease-in-out";

class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        } else if (easing === "ease-out") {
        } else if (easing === "ease-in-out") {
        } else {
            // It's possible that someone could reach this
            // by ignoring your types though.
        }
    }
}

let button = new UIElement();
button.animate(0, 0, "ease-in"); // OK
// button.animate(0, 0, "uneasy"); // Error: "uneasy" is not allowed

// 数字字面量类型
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
    return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}

// 布尔字面量类型
interface ValidationSuccess {
    isValid: true;
    reason: null;
}

interface ValidationFailure {
    isValid: false;
    reason: string;
}

type ValidationResult = ValidationSuccess | ValidationFailure;
```

### 索引类型

索引类型允许我们检查对象上的属性：

```typescript
// 索引类型查询操作符 keyof T
interface Person {
    name: string;
    age: number;
}

let personProps: keyof Person; // 'name' | 'age'

// 索引访问操作符 T[K]
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
// getProperty(x, "m"); // error: Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'
```

### 映射类型

映射类型从旧类型创建新类型：

```typescript
// 映射类型
interface PersonPartial {
    name?: string;
    age?: number;
}

// 使用 Partial 工具类型
type PersonPartial2 = Partial<Person>;

// Readonly 工具类型
type PersonReadonly = Readonly<Person>;

// Record 工具类型
type PageInfo = {
    id: string;
    title: string;
};

type Page = "home" | "about" | "contact";

const nav: Record<Page, PageInfo> = {
    about: { id: "about", title: "About" },
    contact: { id: "contact", title: "Contact" },
    home: { id: "home", title: "Home" }
};

// Pick 工具类型
type PersonNameOnly = Pick<Person, "name">;

// Omit 工具类型 (TypeScript 3.5+)
type PersonWithoutName = Omit<Person, "name">;
```

## 泛型进阶

### 泛型约束

```typescript
// 使用 extends 关键字约束泛型
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // Now we know it has a .length property
    return arg;
}

loggingIdentity(3);  // Error, number doesn't have a .length property
loggingIdentity({length: 10, value: 3}); // OK

// 在泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
// getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```

### 泛型类

```typescript
// 泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
```

## 装饰器

装饰器是一种特殊类型的声明，可以被附加到类声明、方法、访问符、属性或参数上。

```typescript
// 配置 tsconfig.json 启用装饰器
// {
//   "compilerOptions": {
//     "target": "ES5",
//     "experimentalDecorators": true
//   }
// }

// 类装饰器
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

// 方法装饰器
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}

class Greeter2 {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}

// 访问符装饰器
function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}

class Point {
    private _x: number;
    private _y: number;
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}

// 属性装饰器
function format(formatString: string) {
    return function (target: any, propertyKey: string) {
        // 属性装饰器的实现
    };
}

class Greeter3 {
    @format("Hello, %s")
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }
}

// 参数装饰器
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    // 参数装饰器的实现
}

class Greeter4 {
    greet(@required name: string) {
        return "Hello " + name;
    }
}
```

## 模块解析和声明文件

### 模块解析

```typescript
// 相对导入
import Entry from "./components/Entry";
import { DefaultHeaders } from "../constants/http";
import "/mod";

// 非相对导入
import * as fs from "fs";
import { connect } from "http2";
import { Component } from "@angular/core";
```

### 声明文件

```typescript
// 声明全局变量
declare var $: JQueryStatic;

// 声明函数
declare function greet(greeting: string): void;

// 声明类
declare class Greeter {
    constructor(greeting: string);
    greeting: string;
    showGreeting(): void;
}

// 声明枚举
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

// 声明命名空间
declare namespace GreetingLib {
    function hello(world: string): string;
    
    namespace greetings {
        function goodbye(world: string): string;
    }
}

// 声明模块
declare module "path" {
    export function normalize(p: string): string;
    export function join(...paths: any[]): string;
    export let sep: string;
}
```

## 高级技巧

### 条件类型

```typescript
// 条件类型
type TypeName<T> = 
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

type T0 = TypeName<string>;  // "string"
type T1 = TypeName<"a">;  // "string"
type T2 = TypeName<true>;  // "boolean"
type T3 = TypeName<() => void>;  // "function"
type T4 = TypeName<string[]>;  // "object"
```

### infer 关键字

```typescript
// infer 关键字用于在条件类型中推断类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type Func = (user: User) => User;
type Test = ReturnType<Func>;   // User
```

### 实用工具类型

```typescript
// Exclude<T, U> - 从 T 中排除可分配给 U 的类型
type T0 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;  // "c"
type T2 = Exclude<string | number | (() => void), Function>;  // string | number

// Extract<T, U> - 从 T 中提取可分配给 U 的类型
type T3 = Extract<"a" | "b" | "c", "a" | "f">;  // "a"
type T4 = Extract<string | number | (() => void), Function>;  // () => void

// NonNullable<T> - 从 T 中排除 null 和 undefined
type T5 = NonNullable<string | number | undefined>;  // string | number
type T6 = NonNullable<string[] | null | undefined>;  // string[]

// Parameters<T> - 获取函数类型的参数类型
type T7 = Parameters<() => string>;  // []
type T8 = Parameters<(s: string) => void>;  // [string]

// ConstructorParameters<T> - 获取构造函数类型的参数类型
type T9 = ConstructorParameters<ErrorConstructor>;  // [message?: string]

// InstanceType<T> - 获取构造函数类型的实例类型
type T10 = InstanceType<ErrorConstructor>;  // Error
```

## 实践练习

1. 创建一个类型安全的状态管理库，使用泛型和高级类型
2. 实现一个装饰器系统，用于日志记录和性能监控
3. 编写声明文件为第三方 JavaScript 库提供类型支持
4. 使用条件类型和 infer 关键字创建复杂的类型操作工具

## 下一步

接下来您可以学习：
- [最佳实践](./best-practices) - 学习 TypeScript 编码规范与优化技巧