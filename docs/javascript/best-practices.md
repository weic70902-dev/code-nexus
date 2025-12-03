# JavaScript 和 TypeScript 最佳实践

编写高质量的 JavaScript 和 TypeScript 代码不仅能提高代码可维护性，还能改善团队协作效率和项目稳定性。

## 代码风格和规范

### 命名约定

```javascript
// 使用驼峰命名法命名变量和函数
const userName = "张三";
const userAge = 25;

function getUserInfo() {
    return { name: userName, age: userAge };
}

// 使用帕斯卡命名法命名类和构造函数
class UserManager {
    constructor() {
        this.users = [];
    }
    
    addUser(user) {
        this.users.push(user);
    }
}

// 使用全大写字母命名常量
const MAX_USERS = 100;
const API_BASE_URL = "https://api.example.com";

// 使用下划线前缀表示私有成员（约定）
class Counter {
    constructor() {
        this._count = 0; // 私有变量
    }
    
    _increment() { // 私有方法
        this._count++;
    }
    
    getCount() {
        return this._count;
    }
}
```

### 注释和文档

```javascript
/**
 * 计算两个数的和
 * @param {number} a - 第一个数
 * @param {number} b - 第二个数
 * @returns {number} 两数之和
 * @example
 * // 返回 5
 * add(2, 3);
 */
function add(a, b) {
    return a + b;
}

// 单行注释
const result = add(1, 2); // 计算结果

/*
 * 多行注释
 * 用于解释复杂逻辑
 */
function complexCalculation(data) {
    // 实现复杂计算逻辑
    return data.reduce((acc, item) => acc + item.value, 0);
}
```

## JavaScript 最佳实践

### 变量声明和作用域

```javascript
// 优先使用 const，需要重新赋值时使用 let
const PI = 3.14159;
let counter = 0;

// 避免使用 var
// var name = "张三"; // 不推荐

// 合理使用解构赋值
const person = { name: "李四", age: 30, city: "北京" };
const { name, age } = person;

const numbers = [1, 2, 3];
const [first, second] = numbers;

// 使用模板字符串
const greeting = `你好，${name}，你今年${age}岁了`;

// 合理使用扩展运算符
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
```

### 函数最佳实践

```javascript
// 使用默认参数替代短路运算符
function createUser(name, age = 18, city = "未知") {
    return { name, age, city };
}

// 使用剩余参数替代 arguments
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// 箭头函数适合简短的回调函数
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);

// 避免在循环中创建函数
const buttons = document.querySelectorAll('.button');

// 不好的做法
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // 每次循环都创建新函数
    });
});

// 推荐的做法
function handleButtonClick(event) {
    console.log('按钮被点击');
}

buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
```

### 对象和数组操作

```javascript
// 使用对象字面量和计算属性名
const key = "dynamicKey";
const value = "dynamicValue";
const obj = {
    staticKey: "staticValue",
    [key]: value
};

// 使用 Object.assign() 或扩展运算符合并对象
const defaults = { theme: "light", lang: "zh" };
const userPrefs = { lang: "en", notifications: true };
const settings = { ...defaults, ...userPrefs };

// 使用 Array.isArray() 检查数组
function processItems(items) {
    if (!Array.isArray(items)) {
        throw new Error("参数必须是数组");
    }
    // 处理数组
}

// 使用数组方法链式调用
const products = [
    { name: "苹果", price: 5, category: "水果" },
    { name: "香蕉", price: 3, category: "水果" },
    { name: "胡萝卜", price: 2, category: "蔬菜" }
];

const result = products
    .filter(product => product.price > 2)
    .map(product => ({ ...product, discountPrice: product.price * 0.9 }))
    .sort((a, b) => a.price - b.price);
```

### 异步编程

```javascript
// 使用 Promise.all() 并行处理多个异步操作
async function loadUserData(userId) {
    const [profile, posts, friends] = await Promise.all([
        fetch(`/api/users/${userId}/profile`).then(res => res.json()),
        fetch(`/api/users/${userId}/posts`).then(res => res.json()),
        fetch(`/api/users/${userId}/friends`).then(res => res.json())
    ]);
    
    return { profile, posts, friends };
}

// 合理处理异步错误
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("获取数据失败:", error);
        throw error; // 重新抛出错误让调用者处理
    }
}

// 避免回调地狱，使用 async/await
async function processUserOrder(userId, orderId) {
    try {
        const user = await fetchUser(userId);
        const order = await fetchOrder(orderId);
        const payment = await processPayment(user, order);
        const confirmation = await sendConfirmation(user, payment);
        return confirmation;
    } catch (error) {
        console.error("处理订单失败:", error);
        throw new Error("订单处理失败，请稍后重试");
    }
}
```

## TypeScript 最佳实践

### 类型安全

```typescript
// 启用严格的 TypeScript 编译选项
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}

// 使用接口定义对象结构
interface User {
    readonly id: number;
    name: string;
    email: string;
    age?: number; // 可选属性
}

// 使用类型别名定义联合类型
type Status = "pending" | "approved" | "rejected";

// 使用泛型提高代码复用性
interface Repository<T> {
    findById(id: number): T | undefined;
    findAll(): T[];
    save(entity: T): void;
}

class UserRepository implements Repository<User> {
    // 实现接口方法
    findById(id: number): User | undefined {
        // 实现查找逻辑
        return undefined;
    }
    
    findAll(): User[] {
        return [];
    }
    
    save(entity: User): void {
        // 实现保存逻辑
    }
}
```

### 高级类型技巧

```typescript
// 使用类型守卫进行类型检查
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function processValue(value: unknown) {
    if (isString(value)) {
        // 在这个分支中，TypeScript 知道 value 是 string 类型
        console.log(value.toUpperCase());
    }
}

// 使用 discriminated unions（可辨识联合）
interface SuccessState {
    type: "success";
    data: string;
}

interface ErrorState {
    type: "error";
    message: string;
}

type State = SuccessState | ErrorState;

function handleState(state: State) {
    switch (state.type) {
        case "success":
            // 在这个分支中，TypeScript 知道 state 是 SuccessState 类型
            console.log(state.data);
            break;
        case "error":
            // 在这个分支中，TypeScript 知道 state 是 ErrorState 类型
            console.log(state.message);
            break;
    }
}

// 使用 const 断言创建字面量类型
const colors = ["red", "green", "blue"] as const;
type Color = typeof colors[number]; // "red" | "green" | "blue"

// 使用 satisfies 操作符（TypeScript 4.9+）
type Route = `/${string}`;
 
const routes = {
    home: "/",
    about: "/about",
    contact: "/contact"
} satisfies Record<string, Route>;
```

### 模块和组织

```typescript
// 导出类型和值
export interface User {
    id: number;
    name: string;
}

export class UserService {
    getUser(id: number): User {
        return { id, name: "用户" + id };
    }
}

// 使用命名空间组织相关功能
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
    
    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;
    
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
    
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

// 合理组织大型项目的目录结构
/*
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.types.ts
│   │   └── index.ts
│   └── Form/
│       ├── Form.tsx
│       ├── Form.types.ts
│       └── index.ts
├── services/
│   ├── api/
│   │   ├── userService.ts
│   │   └── productService.ts
│   └── utils/
│       └── httpClient.ts
├── types/
│   ├── user.ts
│   └── product.ts
└── utils/
    ├── formatDate.ts
    └── validation.ts
*/
```

## 性能优化

### JavaScript 性能

```javascript
// 避免全局变量
// 不好的做法
function calculateTotal() {
    total = 0; // 全局变量
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}

// 推荐的做法
function calculateTotal(items) {
    let total = 0; // 局部变量
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}

// 缓存 DOM 查询结果
// 不好的做法
function updateUserInfo() {
    document.getElementById('userName').textContent = userName;
    document.getElementById('userAge').textContent = userAge;
    document.getElementById('userCity').textContent = userCity;
}

// 推荐的做法
function updateUserInfo() {
    const userInfoElements = {
        name: document.getElementById('userName'),
        age: document.getElementById('userAge'),
        city: document.getElementById('userCity')
    };
    
    userInfoElements.name.textContent = userName;
    userInfoElements.age.textContent = userAge;
    userInfoElements.city.textContent = userCity;
}

// 使用事件委托减少事件监听器
// 不好的做法
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    button.addEventListener('click', handleClick);
});

// 推荐的做法
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('button')) {
        handleClick(event);
    }
});
```

### TypeScript 性能

```typescript
// 避免复杂的条件类型
// 不好的做法
type ComplexType<T> = T extends string 
    ? T extends `${infer U}${infer V}` 
        ? U extends string 
            ? V extends string 
                ? `${U}${V}` 
                : never 
            : never 
        : T 
    : T;

// 推荐的做法
type SimpleType<T> = T extends string ? T : never;

// 合理使用 any 和 unknown
// 不好的做法
function processData(data: any) {
    // 失去了类型安全
    return data.someProperty.someMethod();
}

// 推荐的做法
function processData(data: unknown) {
    if (isUserData(data)) {
        // 类型守卫确保类型安全
        return data.name.toUpperCase();
    }
    throw new Error("Invalid data format");
}

function isUserData(data: unknown): data is { name: string } {
    return typeof data === "object" && data !== null && "name" in data;
}
```

## 测试最佳实践

### 单元测试

```javascript
// 使用 Jest 编写测试
// user.test.js
import { User } from './user';

describe('User', () => {
    let user;
    
    beforeEach(() => {
        user = new User('张三', 25);
    });
    
    test('should create user with correct properties', () => {
        expect(user.name).toBe('张三');
        expect(user.age).toBe(25);
    });
    
    test('should increment age correctly', () => {
        user.incrementAge();
        expect(user.age).toBe(26);
    });
    
    test('should throw error for negative age', () => {
        expect(() => {
            new User('李四', -1);
        }).toThrow('年龄不能为负数');
    });
});

// 使用测试驱动开发 (TDD)
// 先写测试
test('should calculate factorial correctly', () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
    expect(factorial(5)).toBe(120);
});

// 再实现功能
function factorial(n) {
    if (n < 0) throw new Error('参数不能为负数');
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}
```

## 实践练习

1. 重构现有代码，应用命名约定和代码风格规范
2. 为项目添加 TypeScript 支持，并逐步迁移 JavaScript 代码
3. 实现一个类型安全的表单验证库
4. 编写单元测试覆盖核心业务逻辑

## 总结

遵循 JavaScript 和 TypeScript 最佳实践能够：
- 提高代码质量和可维护性
- 增强团队协作效率
- 减少运行时错误
- 提升开发体验
- 改善性能表现

持续学习和应用这些最佳实践，您将成为一名更优秀的前端开发者。