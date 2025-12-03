# Go 语言基础

Go（又称 Golang）是由 Google 开发的一种静态强类型、编译型、并发型，并具有垃圾回收功能的编程语言。Go 语言具有简洁的语法、高效的性能和强大的标准库，特别适合构建高性能的网络服务和分布式系统。

## 环境搭建

### 安装 Go

1. 访问 [Go 官网](https://golang.org/dl/) 下载适合您操作系统的安装包
2. 运行安装程序并按照提示完成安装
3. 验证安装是否成功：

```bash
go version
```

### 配置环境变量

Go 有几个重要的环境变量：

- `GOROOT`：Go 的安装目录
- `GOPATH`：工作目录（Go 1.11 之后可以使用 Go Modules）
- `GOBIN`：存放可执行文件的目录

### 第一个 Go 程序

创建一个名为 `hello.go` 的文件：

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

运行程序：

```bash
go run hello.go
```

编译程序：

```bash
go build hello.go
./hello  # Linux/macOS
hello.exe  # Windows
```

## 基本语法

### 包声明

每个 Go 程序都必须属于某个包，`main` 包是程序的入口点：

```go
package main
```

### 导入包

使用 `import` 关键字导入其他包：

```go
import "fmt"
import "math"

// 或者批量导入
import (
    "fmt"
    "math"
)
```

### 函数

函数使用 `func` 关键字声明：

```go
func functionName(parameterName parameterType) returnType {
    // 函数体
    return returnValue
}
```

示例：

```go
func add(x int, y int) int {
    return x + y
}

// 简化参数类型
func multiply(x, y int) int {
    return x * y
}
```

### 变量声明

Go 支持多种变量声明方式：

```go
// 显式声明类型
var name string = "Go"

// 类型推断
var age = 25

// 短变量声明（只能在函数内使用）
height := 180

// 声明多个变量
var (
    firstName = "John"
    lastName  = "Doe"
    age       = 30
)
```

### 常量

使用 `const` 关键字声明常量：

```go
const pi = 3.14159
const (
    statusOk = 200
    notFound = 404
)
```

## 数据类型

### 基本数据类型

```go
// 布尔类型
var isActive bool = true

// 数字类型
var integer int = 42
var floatNum float64 = 3.14

// 字符串类型
var message string = "Hello, Go!"

// 字符类型（实际上是整数类型）
var char rune = 'A'
```

### 数组

数组是固定长度的序列：

```go
// 声明数组
var numbers [5]int
var names [3]string = [3]string{"Alice", "Bob", "Charlie"}

// 初始化数组
scores := [5]int{90, 85, 92, 88, 95}

// 使用 ... 让编译器推断长度
colors := [...]string{"red", "green", "blue"}
```

### 切片（Slice）

切片是动态数组，更为常用：

```go
// 创建切片
var slice []int
slice = make([]int, 5) // 长度为5的切片

// 从数组创建切片
arr := [5]int{1, 2, 3, 4, 5}
slice1 := arr[1:4] // [2, 3, 4]

// 直接初始化切片
numbers := []int{1, 2, 3, 4, 5}

// 添加元素
numbers = append(numbers, 6)

// 切片操作
fmt.Println(numbers[1:3]) // [2, 3]
fmt.Println(numbers[:3])  // [1, 2, 3]
fmt.Println(numbers[2:])  // [3, 4, 5, 6]
```

### 映射（Map）

映射是键值对的集合：

```go
// 创建映射
var ages map[string]int
ages = make(map[string]int)

// 初始化映射
scores := map[string]int{
    "Alice": 95,
    "Bob":   87,
    "Carol": 92,
}

// 添加或更新元素
ages["John"] = 30
ages["Jane"] = 25

// 删除元素
delete(ages, "John")

// 检查键是否存在
if age, exists := ages["Jane"]; exists {
    fmt.Printf("Jane is %d years old\n", age)
} else {
    fmt.Println("Jane not found")
}
```

## 控制结构

### 条件语句

```go
// if 语句
if x > 0 {
    fmt.Println("x is positive")
} else if x < 0 {
    fmt.Println("x is negative")
} else {
    fmt.Println("x is zero")
}

// 简洁赋值语句
if num := 9; num < 0 {
    fmt.Println(num, "is negative")
} else {
    fmt.Println(num, "has", len(strconv.Itoa(num)), "digits")
}
```

### 循环语句

Go 只有一种循环结构：`for` 循环：

```go
// 基本 for 循环
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// while 循环形式
sum := 1
for sum < 1000 {
    sum += sum
}

// 无限循环
for {
    // 无限循环
    break // 跳出循环
}

// 遍历数组/切片
numbers := []int{1, 2, 3, 4, 5}
for index, value := range numbers {
    fmt.Printf("Index: %d, Value: %d\n", index, value)
}

// 遍历映射
scores := map[string]int{"Alice": 95, "Bob": 87}
for key, value := range scores {
    fmt.Printf("Name: %s, Score: %d\n", key, value)
}
```

### Switch 语句

```go
// 基本 switch
switch os := runtime.GOOS; os {
case "darwin":
    fmt.Println("OS X.")
case "linux":
    fmt.Println("Linux.")
default:
    fmt.Printf("%s.\n", os)
}

// 不带条件的 switch（相当于 if-else 链）
t := time.Now()
switch {
case t.Hour() < 12:
    fmt.Println("Good morning!")
case t.Hour() < 17:
    fmt.Println("Good afternoon.")
default:
    fmt.Println("Good evening.")
}
```

## 结构体

结构体是一种自定义数据类型，允许我们组合多个字段：

```go
// 定义结构体
type Person struct {
    Name string
    Age  int
    Email string
}

// 创建结构体实例
person1 := Person{Name: "Alice", Age: 30, Email: "alice@example.com"}
person2 := Person{"Bob", 25, "bob@example.com"}

// 访问字段
fmt.Println(person1.Name)
person1.Age = 31

// 指针结构体
person3 := &Person{Name: "Charlie", Age: 35}
fmt.Println(person3.Name) // Go 会自动解引用
```

## 指针

Go 支持指针，但比 C/C++ 更安全：

```go
// 声明指针
var p *int

// 获取变量地址
i := 42
p = &i

// 解引用指针
fmt.Println(*p) // 42
*p = 21         // 修改 i 的值
```

## 方法

Go 没有类，但可以为类型定义方法：

```go
type Rectangle struct {
    Width, Height float64
}

// 为 Rectangle 类型定义方法
func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}

// 使用指针接收者修改原始值
func (r *Rectangle) Scale(factor float64) {
    r.Width *= factor
    r.Height *= factor
}

// 使用方法
rect := Rectangle{Width: 10, Height: 5}
fmt.Println("Area:", rect.Area())
fmt.Println("Perimeter:", rect.Perimeter())

rect.Scale(2)
fmt.Println("Scaled Area:", rect.Area())
```

## 实践练习

1. 编写一个程序，计算并打印斐波那契数列的前 20 个数字
2. 创建一个学生管理系统，使用结构体存储学生信息（姓名、年龄、成绩），并实现添加、查询、删除学生等功能
3. 编写一个程序，统计一段文本中每个单词出现的次数

## 下一步

接下来您可以学习：
- [Go 语言进阶](./advanced) - 学习并发编程、接口、错误处理等高级主题
- [Go Web 编程](./web) - 开始学习如何使用 Go 构建 Web 应用