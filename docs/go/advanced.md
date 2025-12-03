# Go 语言进阶

在掌握了 Go 语言的基础知识后，我们可以深入学习一些更高级的主题，包括并发编程、接口、错误处理、反射等。这些特性是 Go 语言强大功能的核心，掌握它们将帮助您编写更高效、更优雅的代码。

## 并发编程

Go 语言以其出色的并发支持而闻名，通过 goroutine 和 channel 实现了 CSP（Communicating Sequential Processes）并发模型。

### Goroutines

Goroutine 是轻量级的线程，由 Go 运行时管理：

```go
package main

import (
    "fmt"
    "time"
)

func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    // 启动一个 goroutine
    go say("world")
    
    // 主 goroutine 继续执行
    say("hello")
    
    // 等待一段时间，让 goroutine 完成
    time.Sleep(time.Second)
}
```

### Channels

Channel 是 goroutine 之间通信的管道：

```go
package main

import "fmt"

func sum(s []int, c chan int) {
    sum := 0
    for _, v := range s {
        sum += v
    }
    c <- sum // 将 sum 发送到 channel c
}

func main() {
    s := []int{7, 2, 8, -9, 4, 0}
    
    c := make(chan int)
    go sum(s[:len(s)/2], c)
    go sum(s[len(s)/2:], c)
    
    x, y := <-c, <-c // 从 channel c 接收
    
    fmt.Println(x, y, x+y)
}
```

### Channel 缓冲

```go
// 创建带缓冲的 channel
ch := make(chan int, 2)
ch <- 1
ch <- 2
// ch <- 3 // 这会导致死锁，因为缓冲区已满

fmt.Println(<-ch)
fmt.Println(<-ch)
```

### Channel 方向

```go
// 只发送 channel
func ping(pings chan<- string, msg string) {
    pings <- msg
}

// 接收和发送 channel
func pong(pings <-chan string, pongs chan<- string) {
    msg := <-pings
    pongs <- msg
}

func main() {
    pings := make(chan string, 1)
    pongs := make(chan string, 1)
    
    ping(pings, "passed message")
    pong(pings, pongs)
    
    fmt.Println(<-pongs)
}
```

### Select 语句

Select 语句用于在多个 channel 操作中进行选择：

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    c1 := make(chan string)
    c2 := make(chan string)
    
    go func() {
        time.Sleep(1 * time.Second)
        c1 <- "one"
    }()
    
    go func() {
        time.Sleep(2 * time.Second)
        c2 <- "two"
    }()
    
    for i := 0; i < 2; i++ {
        select {
        case msg1 := <-c1:
            fmt.Println("received", msg1)
        case msg2 := <-c2:
            fmt.Println("received", msg2)
        }
    }
}
```

### 超时控制

```go
c := make(chan string, 1)

go func() {
    time.Sleep(2 * time.Second)
    c <- "result 1"
}()

select {
case res := <-c:
    fmt.Println(res)
case <-time.After(1 * time.Second):
    fmt.Println("timeout 1")
}
```

## 接口

接口是 Go 语言中实现多态的关键机制：

```go
package main

import "fmt"

// 定义接口
type Shape interface {
    Area() float64
    Perimeter() float64
}

// 实现接口的结构体
type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}

type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return 3.14 * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
    return 2 * 3.14 * c.Radius
}

func main() {
    r := Rectangle{Width: 10, Height: 5}
    c := Circle{Radius: 3}
    
    shapes := []Shape{r, c}
    
    for _, shape := range shapes {
        fmt.Printf("Area: %.2f, Perimeter: %.2f\n", shape.Area(), shape.Perimeter())
    }
}
```

### 空接口

空接口 `interface{}` 可以保存任何类型的值：

```go
package main

import "fmt"

func main() {
    var i interface{}
    
    i = 42
    fmt.Println(i)
    
    i = "hello"
    fmt.Println(i)
    
    // 类型断言
    s, ok := i.(string)
    if ok {
        fmt.Printf("String value: %s\n", s)
    }
    
    // 类型选择
    switch v := i.(type) {
    case int:
        fmt.Printf("Integer: %d\n", v)
    case string:
        fmt.Printf("String: %s\n", v)
    default:
        fmt.Printf("Unknown type: %T\n", v)
    }
}
```

## 错误处理

Go 语言通过返回错误值来处理错误，而不是使用异常：

```go
package main

import (
    "errors"
    "fmt"
)

// 自定义错误
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

func main() {
    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println("Result:", result)
}
```

### 自定义错误类型

```go
type MyError struct {
    Code int
    Msg  string
}

func (e *MyError) Error() string {
    return fmt.Sprintf("Error %d: %s", e.Code, e.Msg)
}

func doSomething() error {
    return &MyError{Code: 404, Msg: "Not Found"}
}

func main() {
    err := doSomething()
    if err != nil {
        fmt.Println(err)
        
        // 类型断言获取详细信息
        if myErr, ok := err.(*MyError); ok {
            fmt.Printf("Code: %d, Message: %s\n", myErr.Code, myErr.Msg)
        }
    }
}
```

## Defer、Panic 和 Recover

### Defer

Defer 用于延迟执行函数，通常用于资源清理：

```go
package main

import "fmt"

func main() {
    defer fmt.Println("world")
    fmt.Println("hello")
    
    // 多个 defer 按后进先出顺序执行
    for i := 0; i < 4; i++ {
        defer fmt.Print(i, " ")
    }
}
```

### Panic 和 Recover

```go
package main

import "fmt"

func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from panic:", r)
        }
    }()
    
    fmt.Println("Starting...")
    panic("Something went wrong!")
    fmt.Println("This line won't be executed")
}
```

## 反射

反射允许程序在运行时检查变量和值：

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    var x float64 = 3.4
    fmt.Println("Type:", reflect.TypeOf(x))
    fmt.Println("Value:", reflect.ValueOf(x))
    
    v := reflect.ValueOf(x)
    fmt.Println("Type:", v.Type())
    fmt.Println("Kind:", v.Kind())
    fmt.Println("Value:", v.Float())
    
    // 修改值（需要可设置的值）
    y := 4.5
    p := reflect.ValueOf(&y)
    v2 := p.Elem()
    v2.SetFloat(7.1)
    fmt.Println("New value of y:", y)
}
```

## 泛型（Go 1.18+）

Go 1.18 引入了泛型支持：

```go
// 泛型函数
func min[T comparable](a, b T) T {
    if a < b {
        return a
    }
    return b
}

// 泛型类型
type Stack[T any] struct {
    elements []T
}

func (s *Stack[T]) Push(element T) {
    s.elements = append(s.elements, element)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.elements) == 0 {
        var zero T
        return zero, false
    }
    
    index := len(s.elements) - 1
    element := s.elements[index]
    s.elements = s.elements[:index]
    return element, true
}

func main() {
    // 使用泛型函数
    fmt.Println(min(3, 5))      // 3
    fmt.Println(min("a", "b"))  // "a"
    
    // 使用泛型类型
    var intStack Stack[int]
    intStack.Push(1)
    intStack.Push(2)
    if value, ok := intStack.Pop(); ok {
        fmt.Println("Popped:", value)
    }
}
```

## 实践练习

1. 编写一个并发程序，使用 goroutine 和 channel 实现生产者-消费者模式
2. 创建一个支持多种几何形状的接口，并为每种形状实现面积和周长计算方法
3. 实现一个简单的 HTTP 客户端，能够处理各种 HTTP 状态码和错误情况
4. 使用反射实现一个通用的结构体转 map 的函数

## 下一步

接下来您可以学习：
- [Go Web 编程](./web) - 学习如何使用 Go 构建 Web 应用
- [Go 微服务](./microservices) - 开始学习如何使用 Go 构建微服务架构
- [Go 最佳实践](./best-practices) - 学习 Go 语言编码规范与优化技巧