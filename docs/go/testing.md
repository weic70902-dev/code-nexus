# Go 测试策略

测试是软件开发中不可或缺的一部分，它有助于确保代码质量、减少错误并提高代码的可维护性。Go 语言内置了强大的测试支持，本章将介绍各种测试策略和最佳实践。

## Go 测试基础

Go 语言提供了内置的测试工具，使用 `testing` 包来编写和运行测试。

### 编写基本测试

创建一个名为 `math.go` 的文件：

```go
package math

// Add 两个整数相加
func Add(a, b int) int {
    return a + b
}

// Divide 两个数相除
func Divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}
```

创建对应的测试文件 `math_test.go`：

```go
package math

import (
    "testing"
)

// 基本测试函数
func TestAdd(t *testing.T) {
    result := Add(2, 3)
    expected := 5
    if result != expected {
        t.Errorf("Add(2, 3) = %d; expected %d", result, expected)
    }
}

// 测试错误情况
func TestDivide(t *testing.T) {
    _, err := Divide(10, 0)
    if err == nil {
        t.Error("Expected error for division by zero")
    }
}

// 测试正常情况
func TestDivideNormal(t *testing.T) {
    result, err := Divide(10, 2)
    if err != nil {
        t.Fatalf("Unexpected error: %v", err)
    }
    expected := 5.0
    if result != expected {
        t.Errorf("Divide(10, 2) = %f; expected %f", result, expected)
    }
}
```

### 运行测试

```bash
# 运行当前目录下的所有测试
go test

# 运行当前目录及子目录下的所有测试
go test ./...

# 显示详细输出
go test -v

# 运行特定测试
go test -run TestAdd

# 覆盖率测试
go test -cover
go test -coverprofile=coverage.out
go tool cover -html=coverage.out
```

## 表格驱动测试

表格驱动测试是 Go 语言中常用的测试模式，可以减少重复代码并提高测试的可维护性。

```go
package math

import (
    "testing"
)

func TestAddTableDriven(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive numbers", 2, 3, 5},
        {"negative numbers", -1, 1, 0},
        {"zeros", 0, 0, 0},
        {"large numbers", 1000000, 2000000, 3000000},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := Add(tt.a, tt.b)
            if result != tt.expected {
                t.Errorf("Add(%d, %d) = %d; expected %d", tt.a, tt.b, result, tt.expected)
            }
        })
    }
}

func TestDivideTableDriven(t *testing.T) {
    tests := []struct {
        name        string
        a, b        float64
        expected    float64
        expectError bool
    }{
        {"normal division", 10, 2, 5, false},
        {"division by zero", 10, 0, 0, true},
        {"negative numbers", -10, 2, -5, false},
        {"decimal numbers", 7.5, 2.5, 3, false},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result, err := Divide(tt.a, tt.b)
            
            if tt.expectError {
                if err == nil {
                    t.Error("Expected error but got none")
                }
                return
            }

            if err != nil {
                t.Fatalf("Unexpected error: %v", err)
            }

            if result != tt.expected {
                t.Errorf("Divide(%f, %f) = %f; expected %f", tt.a, tt.b, result, tt.expected)
            }
        })
    }
}
```

## Mock 和 Stub 测试

在测试中，我们经常需要模拟外部依赖（如数据库、网络请求等）以隔离被测试的代码。

### 使用接口进行依赖注入

```go
// database.go
package service

import (
    "errors"
)

// UserRepository 定义用户仓库接口
type UserRepository interface {
    GetUserByID(id int) (*User, error)
    SaveUser(user *User) error
}

// User 用户结构体
type User struct {
    ID   int
    Name string
    Age  int
}

// UserService 用户服务
type UserService struct {
    repo UserRepository
}

// NewUserService 创建用户服务实例
func NewUserService(repo UserRepository) *UserService {
    return &UserService{repo: repo}
}

// GetUser 获取用户信息
func (s *UserService) GetUser(id int) (*User, error) {
    if id <= 0 {
        return nil, errors.New("invalid user id")
    }
    return s.repo.GetUserByID(id)
}

// CreateUser 创建用户
func (s *UserService) CreateUser(name string, age int) (*User, error) {
    if name == "" || age <= 0 {
        return nil, errors.New("invalid user data")
    }
    user := &User{Name: name, Age: age}
    err := s.repo.SaveUser(user)
    if err != nil {
        return nil, err
    }
    return user, nil
}
```

```go
// database_test.go
package service

import (
    "errors"
    "testing"
)

// MockUserRepository 模拟用户仓库实现
type MockUserRepository struct {
    users map[int]*User
    err   error // 模拟错误
}

func (m *MockUserRepository) GetUserByID(id int) (*User, error) {
    if m.err != nil {
        return nil, m.err
    }
    user, exists := m.users[id]
    if !exists {
        return nil, errors.New("user not found")
    }
    return user, nil
}

func (m *MockUserRepository) SaveUser(user *User) error {
    if m.err != nil {
        return m.err
    }
    if m.users == nil {
        m.users = make(map[int]*User)
    }
    user.ID = len(m.users) + 1
    m.users[user.ID] = user
    return nil
}

// 测试 UserService
func TestUserService_GetUser(t *testing.T) {
    // 创建 mock 仓库
    mockRepo := &MockUserRepository{
        users: map[int]*User{
            1: {ID: 1, Name: "Alice", Age: 25},
        },
    }

    // 创建服务实例
    userService := NewUserService(mockRepo)

    // 测试正常情况
    user, err := userService.GetUser(1)
    if err != nil {
        t.Fatalf("Unexpected error: %v", err)
    }
    if user.Name != "Alice" {
        t.Errorf("Expected user name 'Alice', got '%s'", user.Name)
    }

    // 测试错误情况
    _, err = userService.GetUser(0)
    if err == nil {
        t.Error("Expected error for invalid user id")
    }

    // 测试用户不存在的情况
    _, err = userService.GetUser(999)
    if err == nil {
        t.Error("Expected error for non-existent user")
    }
}

func TestUserService_CreateUser(t *testing.T) {
    // 创建 mock 仓库
    mockRepo := &MockUserRepository{}

    // 创建服务实例
    userService := NewUserService(mockRepo)

    // 测试正常情况
    user, err := userService.CreateUser("Bob", 30)
    if err != nil {
        t.Fatalf("Unexpected error: %v", err)
    }
    if user.Name != "Bob" || user.Age != 30 {
        t.Errorf("Expected user 'Bob' age 30, got '%s' age %d", user.Name, user.Age)
    }

    // 测试无效数据情况
    _, err = userService.CreateUser("", 30)
    if err == nil {
        t.Error("Expected error for empty name")
    }

    _, err = userService.CreateUser("Bob", 0)
    if err == nil {
        t.Error("Expected error for zero age")
    }

    // 测试仓库错误情况
    mockRepo.err = errors.New("database error")
    _, err = userService.CreateUser("Charlie", 35)
    if err == nil {
        t.Error("Expected error for database failure")
    }
}
```

## 基准测试

基准测试用于测量代码的性能，Go 语言提供了内置的基准测试支持。

```go
// benchmark_test.go
package math

import (
    "testing"
)

// 基准测试函数以 Benchmark 开头
func BenchmarkAdd(b *testing.B) {
    // 重置计时器
    b.ResetTimer()
    
    // 运行 b.N 次
    for i := 0; i < b.N; i++ {
        Add(1, 2)
    }
}

func BenchmarkDivide(b *testing.B) {
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        Divide(10.0, 2.0)
    }
}

// 并发基准测试
func BenchmarkAddParallel(b *testing.B) {
    b.RunParallel(func(pb *testing.PB) {
        for pb.Next() {
            Add(1, 2)
        }
    })
}

// 带参数的基准测试
func BenchmarkAddWithSize(b *testing.B) {
    // 测试不同大小的输入
    sizes := []int{100, 1000, 10000}
    
    for _, size := range sizes {
        b.Run(fmt.Sprintf("size-%d", size), func(b *testing.B) {
            numbers := make([]int, size)
            for i := 0; i < size; i++ {
                numbers[i] = i
            }
            
            b.ResetTimer()
            for i := 0; i < b.N; i++ {
                sum := 0
                for _, n := range numbers {
                    sum = Add(sum, n)
                }
            }
        })
    }
}
```

运行基准测试：

```bash
# 运行基准测试
go test -bench=.

# 运行特定基准测试
go test -bench=BenchmarkAdd

# 运行基准测试并显示内存分配
go test -bench=. -benchmem

# 运行基准测试并生成 CPU profile
go test -bench=. -cpuprofile=cpu.prof
```

## 集成测试

集成测试用于测试多个组件之间的交互。

```go
// integration_test.go
package service

import (
    "testing"
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
)

// 集成测试通常需要真实的数据库连接
func TestUserServiceIntegration(t *testing.T) {
    // 跳过集成测试，除非明确指定
    if testing.Short() {
        t.Skip("skipping integration test in short mode")
    }

    // 连接测试数据库
    db, err := sql.Open("mysql", "test_user:test_pass@tcp(localhost:3306)/test_db")
    if err != nil {
        t.Fatalf("Failed to connect to database: %v", err)
    }
    defer db.Close()

    // 创建真实的仓库实现
    repo := NewMySQLUserRepository(db)
    userService := NewUserService(repo)

    // 测试创建用户
    user, err := userService.CreateUser("Integration Test User", 25)
    if err != nil {
        t.Fatalf("Failed to create user: %v", err)
    }

    // 测试获取用户
    retrievedUser, err := userService.GetUser(user.ID)
    if err != nil {
        t.Fatalf("Failed to get user: %v", err)
    }

    if retrievedUser.Name != "Integration Test User" {
        t.Errorf("Expected user name 'Integration Test User', got '%s'", retrievedUser.Name)
    }
}
```

## 测试覆盖率

测试覆盖率是衡量测试完整性的重要指标。

```bash
# 运行测试并生成覆盖率报告
go test -cover

# 生成覆盖率概要文件
go test -coverprofile=coverage.out

# 在浏览器中查看详细覆盖率报告
go tool cover -html=coverage.out

# 显示覆盖率概要
go tool cover -func=coverage.out
```

## 测试最佳实践

### 1. 测试命名规范

```go
// 好的命名
func TestUserService_GetUser_ValidID(t *testing.T) { }
func TestUserService_GetUser_InvalidID(t *testing.T) { }
func TestUserService_GetUser_UserNotFound(t *testing.T) { }

// 避免的命名
func Test1(t *testing.T) { }
func TestGetUser(t *testing.T) { }
```

### 2. 测试数据组织

```go
func TestUserService_GetUser(t *testing.T) {
    tests := []struct {
        name          string
        userID        int
        mockUsers     map[int]*User
        mockError     error
        expectedUser  *User
        expectedError string
    }{
        {
            name:   "valid user",
            userID: 1,
            mockUsers: map[int]*User{
                1: {ID: 1, Name: "Alice", Age: 25},
            },
            expectedUser: &User{ID: 1, Name: "Alice", Age: 25},
        },
        {
            name:          "invalid id",
            userID:        0,
            expectedError: "invalid user id",
        },
        // 更多测试用例...
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            // 测试实现
        })
    }
}
```

### 3. 测试辅助函数

```go
// test_helpers.go
package service

import (
    "testing"
)

// assertError 检查错误是否符合预期
func assertError(t *testing.T, err error, expectedMsg string) {
    t.Helper()
    if err == nil {
        t.Fatal("Expected error but got nil")
    }
    if err.Error() != expectedMsg {
        t.Errorf("Expected error message '%s', got '%s'", expectedMsg, err.Error())
    }
}

// assertNoError 检查是否没有错误
func assertNoError(t *testing.T, err error) {
    t.Helper()
    if err != nil {
        t.Fatalf("Unexpected error: %v", err)
    }
}

// assertEqualUsers 检查用户是否相等
func assertEqualUsers(t *testing.T, actual, expected *User) {
    t.Helper()
    if actual == nil && expected == nil {
        return
    }
    if actual == nil || expected == nil {
        t.Fatalf("Expected user %+v, got %+v", expected, actual)
    }
    if actual.ID != expected.ID || actual.Name != expected.Name || actual.Age != expected.Age {
        t.Errorf("Expected user %+v, got %+v", expected, actual)
    }
}
```

## 实践练习

1. 为现有的 Go 项目编写单元测试
2. 实现表格驱动测试以提高测试覆盖率
3. 使用 mock 对象测试依赖外部服务的代码
4. 编写基准测试来优化性能关键代码
5. 设置测试覆盖率目标并持续改进

## 下一步

- [Go 语言基础](./basics) - 如果您是 Go 语言初学者
- [Go 语言进阶](./advanced) - 学习并发编程、接口、错误处理等高级主题
- [Go Web 编程](./web) - 学习如何使用 Go 构建 Web 应用
- [Go 微服务](./microservices) - 学习如何使用 Go 构建微服务架构
- [Go 最佳实践](./best-practices) - 学习 Go 语言编码规范与优化技巧# Go 测试策略

测试是软件开发中不可或缺的一部分，它有助于确保代码质量、减少错误并提高代码的可维护性。Go 语言内置了强大的测试支持，本章将介绍各种测试策略和最佳实践。

## Go 测试基础

Go 语言提供了内置的测试工具，使用 `testing` 包来编写和运行测试。

### 编写基本测试

创建一个名为 `math.go` 的文件：

```go
package math

// Add 两个整数相加
func Add(a, b int) int {
    return a + b
}

// Divide 两个数相除
func Divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}
```

创建对应的测试文件 `math_test.go`：

```go
package math

import (
    "testing"
)

// 基本测试函数
func TestAdd(t *testing.T) {
    result := Add(2, 3)
    expected := 5
    if result != expected {
        t.Errorf("Add(2, 3) = %d; expected %d", result, expected)
    }
}

// 测试错误情况
func TestDivide(t *testing.T) {
    _, err := Divide(10, 0)
    if err == nil {
        t.Error("Expected error for division by zero")
    }
}

// 测试正常情况
func TestDivideNormal(t *testing.T) {
    result, err := Divide(10, 2)
    if err != nil {
        t.Fatalf("Unexpected error: %v", err)
    }
    expected := 5.0
    if result != expected {
        t.Errorf("Divide(10, 2) = %f; expected %f", result, expected)
    }
}
```

### 运行测试

```bash
# 运行当前目录下的所有测试
go test

# 运行当前目录及子目录下的所有测试
go test ./...

# 显示详细输出
go test -v

# 运行特定测试
go test -run TestAdd

# 覆盖率测试
go test -cover
go test -coverprofile=coverage.out
go tool cover -html=coverage.out
```

## 表格驱动测试

表格驱动测试是 Go 语言中常用的测试模式，可以减少重复代码并提高测试的可维护性。

```go
package math

import (
    "testing"
)

func TestAddTableDriven(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive numbers", 2, 3, 5},
        {"negative numbers", -1, 1, 0},
        {"zeros", 0, 0, 0},
        {"large numbers", 1000000, 2000000, 3000000},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := Add(tt.a, tt.b)
            if result != tt.expected {
                t.Errorf("Add(%d, %d) = %d; expected %d", tt.a, tt.b, result, tt.expected)
            }
        })
    }
}

func TestDivideTableDriven(t *testing.T) {
    tests := []struct {
        name        string
        a, b        float64
        expected    float64
        expectError bool
    }{
        {"normal division", 10, 2, 5, false},
        {"division by zero", 10, 0, 0, true},
        {"negative numbers", -10, 2, -5, false},
        {"decimal numbers", 7.5, 2.5, 3, false},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result, err := Divide(tt.a, tt.b)
            
            if tt.expectError {
                if err == nil {
                    t.Error("Expected error but got none")
                }
                return
            }

            if err != nil {
                t.Fatalf("Unexpected error: %v", err)
            }

            if result != tt.expected {
                t.Errorf("Divide(%f, %f) = %f; expected %f", tt.a, tt.b, result, tt.expected)
            }
        })
    }
}
```

## Mock 和 Stub 测试

在测试中，我们经常需要模拟外部依赖（如数据库、网络请求等）以隔离被测试的代码。

### 使用接口进行依赖注入

```go
// database.go
package service

import (
    "errors"
)

// UserRepository 定义用户仓库接口
type UserRepository interface {
    GetUserByID(id int) (*User, error)
    SaveUser(user *User) error
}

// User 用户结构体
type User struct {
    ID   int
    Name string
    Age  int
}

// UserService 用户服务
type UserService struct {
    repo UserRepository
}

// NewUserService 创建用户服务实例
func NewUserService(repo UserRepository) *UserService {
    return &UserService{repo: repo}
}

// GetUser 获取用户信息
func (s *UserService) GetUser(id int) (*User, error) {
    if id <= 0 {
        return nil, errors.New("invalid user id")
    }
    return s.repo.GetUserByID(id)
}

// CreateUser 创建用户
func (s *UserService) CreateUser(name string, age int) (*User, error) {
    if name == "" || age <= 0 {
        return nil, errors.New("invalid user data")
    }
    user := &User{Name: name, Age: age}
    err := s.repo.SaveUser(user)
    if err != nil {
        return nil, err
    }
    return user, nil
}
```

```go
// database_test.go
package service

import (
    "errors"
    "testing"
)

// MockUserRepository 模拟用户仓库实现
type MockUserRepository struct {
    users map[int]*User
    err   error // 模拟错误
}

func (m *MockUserRepository) GetUserByID(id int) (*User, error) {
    if m.err != nil {
        return nil, m.err
    }
    user, exists := m.users[id]
    if !exists {
        return nil, errors.New("user not found")
    }
    return user, nil
}

func (m *MockUserRepository) SaveUser(user *User) error {
    if m.err != nil {
        return m.err
    }
    if m.users == nil {
        m.users = make(map[int]*User)
    }
    user.ID = len(m.users) + 1
    m.users[user.ID] = user
    return nil
}

// 测试 UserService
func TestUserService_GetUser(t *testing.T) {
    // 创建 mock 仓库
    mockRepo := &MockUserRepository{
        users: map[int]*User{
            1: {ID: 1, Name: "Alice", Age: 25},
        },
    }

    // 创建服务实例
    userService := NewUserService(mockRepo)

    // 测试正常情况
    user, err := userService.GetUser(1)
    if err != nil {
        t.Fatalf("Unexpected error: %v", err)
    }
    if user.Name != "Alice" {
        t.Errorf("Expected user name 'Alice', got '%s'", user.Name)
    }

    // 测试错误情况
    _, err = userService.GetUser(0)
    if err == nil {
        t.Error("Expected error for invalid user id")
    }

    // 测试用户不存在的情况
    _, err = userService.GetUser(999)
    if err == nil {
        t.Error("Expected error for non-existent user")
    }
}

func TestUserService_CreateUser(t *testing.T) {
    // 创建 mock 仓库
    mockRepo := &MockUserRepository{}

    // 创建服务实例
    userService := NewUserService(mockRepo)

    // 测试正常情况
    user, err := userService.CreateUser("Bob", 30)
    if err != nil {
        t.Fatalf("Unexpected error: %v", err)
    }
    if user.Name != "Bob" || user.Age != 30 {
        t.Errorf("Expected user 'Bob' age 30, got '%s' age %d", user.Name, user.Age)
    }

    // 测试无效数据情况
    _, err = userService.CreateUser("", 30)
    if err == nil {
        t.Error("Expected error for empty name")
    }

    _, err = userService.CreateUser("Bob", 0)
    if err == nil {
        t.Error("Expected error for zero age")
    }

    // 测试仓库错误情况
    mockRepo.err = errors.New("database error")
    _, err = userService.CreateUser("Charlie", 35)
    if err == nil {
        t.Error("Expected error for database failure")
    }
}
```

## 基准测试

基准测试用于测量代码的性能，Go 语言提供了内置的基准测试支持。

```go
// benchmark_test.go
package math

import (
    "testing"
)

// 基准测试函数以 Benchmark 开头
func BenchmarkAdd(b *testing.B) {
    // 重置计时器
    b.ResetTimer()
    
    // 运行 b.N 次
    for i := 0; i < b.N; i++ {
        Add(1, 2)
    }
}

func BenchmarkDivide(b *testing.B) {
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        Divide(10.0, 2.0)
    }
}

// 并发基准测试
func BenchmarkAddParallel(b *testing.B) {
    b.RunParallel(func(pb *testing.PB) {
        for pb.Next() {
            Add(1, 2)
        }
    })
}

// 带参数的基准测试
func BenchmarkAddWithSize(b *testing.B) {
    // 测试不同大小的输入
    sizes := []int{100, 1000, 10000}
    
    for _, size := range sizes {
        b.Run(fmt.Sprintf("size-%d", size), func(b *testing.B) {
            numbers := make([]int, size)
            for i := 0; i < size; i++ {
                numbers[i] = i
            }
            
            b.ResetTimer()
            for i := 0; i < b.N; i++ {
                sum := 0
                for _, n := range numbers {
                    sum = Add(sum, n)
                }
            }
        })
    }
}
```

运行基准测试：

```bash
# 运行基准测试
go test -bench=.

# 运行特定基准测试
go test -bench=BenchmarkAdd

# 运行基准测试并显示内存分配
go test -bench=. -benchmem

# 运行基准测试并生成 CPU profile
go test -bench=. -cpuprofile=cpu.prof
```

## 集成测试

集成测试用于测试多个组件之间的交互。

```go
// integration_test.go
package service

import (
    "testing"
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
)

// 集成测试通常需要真实的数据库连接
func TestUserServiceIntegration(t *testing.T) {
    // 跳过集成测试，除非明确指定
    if testing.Short() {
        t.Skip("skipping integration test in short mode")
    }

    // 连接测试数据库
    db, err := sql.Open("mysql", "test_user:test_pass@tcp(localhost:3306)/test_db")
    if err != nil {
        t.Fatalf("Failed to connect to database: %v", err)
    }
    defer db.Close()

    // 创建真实的仓库实现
    repo := NewMySQLUserRepository(db)
    userService := NewUserService(repo)

    // 测试创建用户
    user, err := userService.CreateUser("Integration Test User", 25)
    if err != nil {
        t.Fatalf("Failed to create user: %v", err)
    }

    // 测试获取用户
    retrievedUser, err := userService.GetUser(user.ID)
    if err != nil {
        t.Fatalf("Failed to get user: %v", err)
    }

    if retrievedUser.Name != "Integration Test User" {
        t.Errorf("Expected user name 'Integration Test User', got '%s'", retrievedUser.Name)
    }
}
```

## 测试覆盖率

测试覆盖率是衡量测试完整性的重要指标。

```bash
# 运行测试并生成覆盖率报告
go test -cover

# 生成覆盖率概要文件
go test -coverprofile=coverage.out

# 在浏览器中查看详细覆盖率报告
go tool cover -html=coverage.out

# 显示覆盖率概要
go tool cover -func=coverage.out
```

## 测试最佳实践

### 1. 测试命名规范

```go
// 好的命名
func TestUserService_GetUser_ValidID(t *testing.T) { }
func TestUserService_GetUser_InvalidID(t *testing.T) { }
func TestUserService_GetUser_UserNotFound(t *testing.T) { }

// 避免的命名
func Test1(t *testing.T) { }
func TestGetUser(t *testing.T) { }
```

### 2. 测试数据组织

```go
func TestUserService_GetUser(t *testing.T) {
    tests := []struct {
        name          string
        userID        int
        mockUsers     map[int]*User
        mockError     error
        expectedUser  *User
        expectedError string
    }{
        {
            name:   "valid user",
            userID: 1,
            mockUsers: map[int]*User{
                1: {ID: 1, Name: "Alice", Age: 25},
            },
            expectedUser: &User{ID: 1, Name: "Alice", Age: 25},
        },
        {
            name:          "invalid id",
            userID:        0,
            expectedError: "invalid user id",
        },
        // 更多测试用例...
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            // 测试实现
        })
    }
}
```

### 3. 测试辅助函数

```go
// test_helpers.go
package service

import (
    "testing"
)

// assertError 检查错误是否符合预期
func assertError(t *testing.T, err error, expectedMsg string) {
    t.Helper()
    if err == nil {
        t.Fatal("Expected error but got nil")
    }
    if err.Error() != expectedMsg {
        t.Errorf("Expected error message '%s', got '%s'", expectedMsg, err.Error())
    }
}

// assertNoError 检查是否没有错误
func assertNoError(t *testing.T, err error) {
    t.Helper()
    if err != nil {
        t.Fatalf("Unexpected error: %v", err)
    }
}

// assertEqualUsers 检查用户是否相等
func assertEqualUsers(t *testing.T, actual, expected *User) {
    t.Helper()
    if actual == nil && expected == nil {
        return
    }
    if actual == nil || expected == nil {
        t.Fatalf("Expected user %+v, got %+v", expected, actual)
    }
    if actual.ID != expected.ID || actual.Name != expected.Name || actual.Age != expected.Age {
        t.Errorf("Expected user %+v, got %+v", expected, actual)
    }
}
```

## 实践练习

1. 为现有的 Go 项目编写单元测试
2. 实现表格驱动测试以提高测试覆盖率
3. 使用 mock 对象测试依赖外部服务的代码
4. 编写基准测试来优化性能关键代码
5. 设置测试覆盖率目标并持续改进

## 下一步

- [Go 语言基础](./basics) - 如果您是 Go 语言初学者
- [Go 语言进阶](./advanced) - 学习并发编程、接口、错误处理等高级主题
- [Go Web 编程](./web) - 学习如何使用 Go 构建 Web 应用
- [Go 微服务](./microservices) - 学习如何使用 Go 构建微服务架构
- [Go 最佳实践](./best-practices) - 学习 Go 语言编码规范与优化技巧