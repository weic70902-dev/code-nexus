# Go Web 编程

Go 语言内置了强大的 HTTP 处理能力，非常适合构建 Web 应用和服务。本章将介绍如何使用 Go 语言开发 Web 应用，包括路由处理、中间件、模板渲染、表单处理、会话管理等内容。

## HTTP 基础

Go 标准库中的 `net/http` 包提供了 HTTP 客户端和服务端的实现：

```go
package main

import (
    "fmt"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, World!")
}

func main() {
    http.HandleFunc("/", helloHandler)
    http.ListenAndServe(":8080", nil)
}
```

### 处理不同的 HTTP 方法

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type User struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

func userHandler(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case "GET":
        // 获取用户信息
        user := User{ID: 1, Name: "John Doe"}
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(user)
    case "POST":
        // 创建新用户
        var user User
        if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }
        // 处理用户创建逻辑
        user.ID = 2
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(user)
    default:
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}

func main() {
    http.HandleFunc("/users", userHandler)
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", nil)
}
```

## 路由和中间件

虽然标准库提供了基本的路由功能，但在实际项目中我们通常需要更强大的路由和中间件支持。让我们看看如何实现：

### 自定义路由器

```go
package main

import (
    "fmt"
    "net/http"
)

type Route struct {
    Method  string
    Pattern string
    Handler http.HandlerFunc
}

type Router struct {
    routes []Route
}

func (r *Router) AddRoute(method, pattern string, handler http.HandlerFunc) {
    r.routes = append(r.routes, Route{method, pattern, handler})
}

func (r *Router) ServeHTTP(w http.ResponseWriter, req *http.Request) {
    for _, route := range r.routes {
        if route.Method == req.Method && route.Pattern == req.URL.Path {
            route.Handler(w, req)
            return
        }
    }
    http.NotFound(w, req)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Welcome to the home page!")
}

func aboutHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "This is the about page.")
}

func main() {
    router := &Router{}
    router.AddRoute("GET", "/", homeHandler)
    router.AddRoute("GET", "/about", aboutHandler)
    
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", router)
}
```

### 中间件

中间件是在处理请求前后执行的函数，常用于日志记录、认证、错误处理等：

```go
package main

import (
    "fmt"
    "log"
    "net/http"
    "time"
)

// 日志中间件
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        log.Printf("Started %s %s", r.Method, r.URL.Path)
        
        next.ServeHTTP(w, r)
        
        log.Printf("Completed %s in %v", r.URL.Path, time.Since(start))
    })
}

// 认证中间件
func authMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // 简单的认证检查
        if r.Header.Get("Authorization") != "Bearer secret-token" {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Welcome to the home page!")
}

func protectedHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "This is a protected page.")
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", homeHandler)
    mux.HandleFunc("/protected", protectedHandler)
    
    // 应用中间件
    handler := loggingMiddleware(authMiddleware(mux))
    
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", handler)
}
```

## 模板渲染

Go 的 `html/template` 包提供了强大的模板引擎：

```go
package main

import (
    "html/template"
    "net/http"
)

type PageData struct {
    Title string
    Body  string
    Users []User
}

type User struct {
    ID   int
    Name string
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    tmpl := `
<!DOCTYPE html>
<html>
<head>
    <title>{{.Title}}</title>
</head>
<body>
    <h1>{{.Body}}</h1>
    <ul>
    {{range .Users}}
        <li>{{.Name}} (ID: {{.ID}})</li>
    {{end}}
    </ul>
</body>
</html>
`
    
    t, _ := template.New("home").Parse(tmpl)
    
    data := PageData{
        Title: "Home Page",
        Body:  "Welcome to our website!",
        Users: []User{
            {ID: 1, Name: "Alice"},
            {ID: 2, Name: "Bob"},
            {ID: 3, Name: "Charlie"},
        },
    }
    
    t.Execute(w, data)
}

func main() {
    http.HandleFunc("/", homeHandler)
    http.ListenAndServe(":8080", nil)
}
```

## 表单处理

处理 HTML 表单是 Web 应用的重要组成部分：

```go
package main

import (
    "fmt"
    "html/template"
    "net/http"
)

type Contact struct {
    Name  string
    Email string
    Message string
}

func formHandler(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case "GET":
        tmpl := `
<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
</head>
<body>
    <h1>Contact Us</h1>
    <form method="POST">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br><br>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>
        
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" rows="4" cols="50" required></textarea><br><br>
        
        <input type="submit" value="Submit">
    </form>
</body>
</html>
`
        t, _ := template.New("form").Parse(tmpl)
        t.Execute(w, nil)
        
    case "POST":
        // 解析表单数据
        if err := r.ParseForm(); err != nil {
            http.Error(w, "Error parsing form", http.StatusBadRequest)
            return
        }
        
        contact := Contact{
            Name:    r.FormValue("name"),
            Email:   r.FormValue("email"),
            Message: r.FormValue("message"),
        }
        
        // 处理联系信息（这里只是简单显示）
        fmt.Fprintf(w, "Thank you, %s! We received your message: %s", contact.Name, contact.Message)
    }
}

func main() {
    http.HandleFunc("/contact", formHandler)
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", nil)
}
```

## Cookie 和 Session

### Cookie 操作

```go
package main

import (
    "fmt"
    "net/http"
    "time"
)

func setCookieHandler(w http.ResponseWriter, r *http.Request) {
    cookie := &http.Cookie{
        Name:    "username",
        Value:   "john_doe",
        Expires: time.Now().Add(24 * time.Hour),
        Path:    "/",
    }
    http.SetCookie(w, cookie)
    fmt.Fprint(w, "Cookie set!")
}

func getCookieHandler(w http.ResponseWriter, r *http.Request) {
    cookie, err := r.Cookie("username")
    if err != nil {
        http.Error(w, "Cookie not found", http.StatusNotFound)
        return
    }
    fmt.Fprintf(w, "Username: %s", cookie.Value)
}

func main() {
    http.HandleFunc("/set-cookie", setCookieHandler)
    http.HandleFunc("/get-cookie", getCookieHandler)
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", nil)
}
```

### Session 管理

虽然 Go 标准库没有内置 session 支持，但我们可以使用第三方库如 `gorilla/sessions`：

```go
// 注意：需要先安装 gorilla/sessions
// go get github.com/gorilla/sessions

package main

import (
    "fmt"
    "net/http"
    
    "github.com/gorilla/sessions"
)

var (
    // 密钥用于加密 cookie
    store = sessions.NewCookieStore([]byte("your-secret-key"))
)

func sessionHandler(w http.ResponseWriter, r *http.Request) {
    // 获取 session
    session, err := store.Get(r, "session-name")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    // 设置 session 值
    session.Values["username"] = "john_doe"
    session.Values["authenticated"] = true
    
    // 保存 session
    err = session.Save(r, w)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    fmt.Fprintln(w, "Session saved!")
}

func profileHandler(w http.ResponseWriter, r *http.Request) {
    session, err := store.Get(r, "session-name")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    // 检查用户是否已认证
    if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
        http.Error(w, "Forbidden", http.StatusForbidden)
        return
    }
    
    username := session.Values["username"]
    fmt.Fprintf(w, "Hello, %s!", username)
}

func main() {
    http.HandleFunc("/session", sessionHandler)
    http.HandleFunc("/profile", profileHandler)
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", nil)
}
```

## 文件上传

处理文件上传是 Web 应用的常见需求：

```go
package main

import (
    "fmt"
    "io"
    "net/http"
    "os"
)

func uploadHandler(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case "GET":
        tmpl := `
<!DOCTYPE html>
<html>
<body>
    <form enctype="multipart/form-data" action="/upload" method="post">
        <input type="file" name="uploadfile" />
        <input type="submit" value="upload" />
    </form>
</body>
</html>
`
        fmt.Fprint(w, tmpl)
        
    case "POST":
        // 解析 multipart 表单，最大内存 32MB
        r.ParseMultipartForm(32 << 20)
        
        // 获取文件句柄
        file, handler, err := r.FormFile("uploadfile")
        if err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }
        defer file.Close()
        
        fmt.Fprintf(w, "Uploaded File: %+v\n", handler.Filename)
        fmt.Fprintf(w, "File Size: %+v\n", handler.Size)
        fmt.Fprintf(w, "MIME Header: %+v\n", handler.Header)
        
        // 创建目标文件
        dst, err := os.Create("./uploads/" + handler.Filename)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        defer dst.Close()
        
        // 复制文件内容
        _, err = io.Copy(dst, file)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        
        fmt.Fprintf(w, "File uploaded successfully: %s", handler.Filename)
    }
}

func main() {
    // 确保 uploads 目录存在
    os.MkdirAll("./uploads", os.ModePerm)
    
    http.HandleFunc("/upload", uploadHandler)
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", nil)
}
```

## RESTful API 设计

构建 RESTful API 是现代 Web 开发的重要部分：

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "strconv"
    
    "github.com/gorilla/mux"
)

type Book struct {
    ID     int    `json:"id"`
    Title  string `json:"title"`
    Author string `json:"author"`
}

var books []Book
var nextID = 1

func init() {
    books = append(books, Book{ID: nextID, Title: "Go Programming", Author: "John Doe"})
    nextID++
    books = append(books, Book{ID: nextID, Title: "Web Development", Author: "Jane Smith"})
    nextID++
}

func getBooks(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(books)
}

func getBook(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    
    for _, book := range books {
        if book.ID == id {
            json.NewEncoder(w).Encode(book)
            return
        }
    }
    
    http.Error(w, "Book not found", http.StatusNotFound)
}

func createBook(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    var book Book
    _ = json.NewDecoder(r.Body).Decode(&book)
    book.ID = nextID
    nextID++
    books = append(books, book)
    json.NewEncoder(w).Encode(book)
}

func updateBook(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    
    for index, book := range books {
        if book.ID == id {
            books = append(books[:index], books[index+1:]...)
            var updatedBook Book
            _ = json.NewDecoder(r.Body).Decode(&updatedBook)
            updatedBook.ID = id
            books = append(books, updatedBook)
            json.NewEncoder(w).Encode(updatedBook)
            return
        }
    }
    
    http.Error(w, "Book not found", http.StatusNotFound)
}

func deleteBook(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    
    for index, book := range books {
        if book.ID == id {
            books = append(books[:index], books[index+1:]...)
            break
        }
    }
    
    json.NewEncoder(w).Encode(books)
}

func main() {
    r := mux.NewRouter()
    
    r.HandleFunc("/api/books", getBooks).Methods("GET")
    r.HandleFunc("/api/books/{id}", getBook).Methods("GET")
    r.HandleFunc("/api/books", createBook).Methods("POST")
    r.HandleFunc("/api/books/{id}", updateBook).Methods("PUT")
    r.HandleFunc("/api/books/{id}", deleteBook).Methods("DELETE")
    
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", r)
}
```

## 实践练习

1. 创建一个博客系统，支持文章的增删改查功能
2. 实现用户注册和登录功能，包括密码加密和会话管理
3. 构建一个文件共享服务，支持文件上传、下载和权限控制
4. 开发一个简单的任务管理系统，支持任务的创建、分配和状态跟踪

## 下一步

接下来您可以学习：
- [Go 微服务](./microservices) - 学习如何使用 Go 构建微服务架构
- [Go 最佳实践](./best-practices) - 学习 Go 语言编码规范与优化技巧# Go Web 编程

Go 语言内置了强大的 HTTP 处理能力，非常适合构建 Web 应用和服务。本章将介绍如何使用 Go 语言开发 Web 应用，包括路由处理、中间件、模板渲染、表单处理、会话管理等内容。

## HTTP 基础

Go 标准库中的 `net/http` 包提供了 HTTP 客户端和服务端的实现：

```go
package main

import (
    "fmt"
    "net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, World!")
}

func main() {
    http.HandleFunc("/", helloHandler)
    http.ListenAndServe(":8080", nil)
}
```

### 处理不同的 HTTP 方法

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
)

type User struct {
    ID   int    `json:"id"`
    Name string `json:"name"`
}

func userHandler(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case "GET":
        // 获取用户信息
        user := User{ID: 1, Name: "John Doe"}
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(user)
    case "POST":
        // 创建新用户
        var user User
        if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }
        // 处理用户创建逻辑
        user.ID = 2
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(user)
    default:
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
    }
}

func main() {
    http.HandleFunc("/users", userHandler)
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", nil)
}
```

## 路由和中间件

虽然标准库提供了基本的路由功能，但在实际项目中我们通常需要更强大的路由和中间件支持。让我们看看如何实现：

### 自定义路由器

```go
package main

import (
    "fmt"
    "net/http"
)

type Route struct {
    Method  string
    Pattern string
    Handler http.HandlerFunc
}

type Router struct {
    routes []Route
}

func (r *Router) AddRoute(method, pattern string, handler http.HandlerFunc) {
    r.routes = append(r.routes, Route{method, pattern, handler})
}

func (r *Router) ServeHTTP(w http.ResponseWriter, req *http.Request) {
    for _, route := range r.routes {
        if route.Method == req.Method && route.Pattern == req.URL.Path {
            route.Handler(w, req)
            return
        }
    }
    http.NotFound(w, req)
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Welcome to the home page!")
}

func aboutHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "This is the about page.")
}

func main() {
    router := &Router{}
    router.AddRoute("GET", "/", homeHandler)
    router.AddRoute("GET", "/about", aboutHandler)
    
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", router)
}
```

### 中间件

中间件是在处理请求前后执行的函数，常用于日志记录、认证、错误处理等：

```go
package main

import (
    "fmt"
    "log"
    "net/http"
    "time"
)

// 日志中间件
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        log.Printf("Started %s %s", r.Method, r.URL.Path)
        
        next.ServeHTTP(w, r)
        
        log.Printf("Completed %s in %v", r.URL.Path, time.Since(start))
    })
}

// 认证中间件
func authMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // 简单的认证检查
        if r.Header.Get("Authorization") != "Bearer secret-token" {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Welcome to the home page!")
}

func protectedHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "This is a protected page.")
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("/", homeHandler)
    mux.HandleFunc("/protected", protectedHandler)
    
    // 应用中间件
    handler := loggingMiddleware(authMiddleware(mux))
    
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", handler)
}
```

## 模板渲染

Go 的 `html/template` 包提供了强大的模板引擎：

```go
package main

import (
    "html/template"
    "net/http"
)

type PageData struct {
    Title string
    Body  string
    Users []User
}

type User struct {
    ID   int
    Name string
}

func homeHandler(w http.ResponseWriter, r *http.Request) {
    tmpl := `
<!DOCTYPE html>
<html>
<head>
    <title>{{.Title}}</title>
</head>
<body>
    <h1>{{.Body}}</h1>
    <ul>
    {{range .Users}}
        <li>{{.Name}} (ID: {{.ID}})</li>
    {{end}}
    </ul>
</body>
</html>
`
    
    t, _ := template.New("home").Parse(tmpl)
    
    data := PageData{
        Title: "Home Page",
        Body:  "Welcome to our website!",
        Users: []User{
            {ID: 1, Name: "Alice"},
            {ID: 2, Name: "Bob"},
            {ID: 3, Name: "Charlie"},
        },
    }
    
    t.Execute(w, data)
}

func main() {
    http.HandleFunc("/", homeHandler)
    http.ListenAndServe(":8080", nil)
}
```

## 表单处理

处理 HTML 表单是 Web 应用的重要组成部分：

```go
package main

import (
    "fmt"
    "html/template"
    "net/http"
)

type Contact struct {
    Name  string
    Email string
    Message string
}

func formHandler(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case "GET":
        tmpl := `
<!DOCTYPE html>
<html>
<head>
    <title>Contact Form</title>
</head>
<body>
    <h1>Contact Us</h1>
    <form method="POST">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required><br><br>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>
        
        <label for="message">Message:</label><br>
        <textarea id="message" name="message" rows="4" cols="50" required></textarea><br><br>
        
        <input type="submit" value="Submit">
    </form>
</body>
</html>
`
        t, _ := template.New("form").Parse(tmpl)
        t.Execute(w, nil)
        
    case "POST":
        // 解析表单数据
        if err := r.ParseForm(); err != nil {
            http.Error(w, "Error parsing form", http.StatusBadRequest)
            return
        }
        
        contact := Contact{
            Name:    r.FormValue("name"),
            Email:   r.FormValue("email"),
            Message: r.FormValue("message"),
        }
        
        // 处理联系信息（这里只是简单显示）
        fmt.Fprintf(w, "Thank you, %s! We received your message: %s", contact.Name, contact.Message)
    }
}

func main() {
    http.HandleFunc("/contact", formHandler)
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", nil)
}
```

## Cookie 和 Session

### Cookie 操作

```go
package main

import (
    "fmt"
    "net/http"
    "time"
)

func setCookieHandler(w http.ResponseWriter, r *http.Request) {
    cookie := &http.Cookie{
        Name:    "username",
        Value:   "john_doe",
        Expires: time.Now().Add(24 * time.Hour),
        Path:    "/",
    }
    http.SetCookie(w, cookie)
    fmt.Fprint(w, "Cookie set!")
}

func getCookieHandler(w http.ResponseWriter, r *http.Request) {
    cookie, err := r.Cookie("username")
    if err != nil {
        http.Error(w, "Cookie not found", http.StatusNotFound)
        return
    }
    fmt.Fprintf(w, "Username: %s", cookie.Value)
}

func main() {
    http.HandleFunc("/set-cookie", setCookieHandler)
    http.HandleFunc("/get-cookie", getCookieHandler)
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", nil)
}
```

### Session 管理

虽然 Go 标准库没有内置 session 支持，但我们可以使用第三方库如 `gorilla/sessions`：

```go
// 注意：需要先安装 gorilla/sessions
// go get github.com/gorilla/sessions

package main

import (
    "fmt"
    "net/http"
    
    "github.com/gorilla/sessions"
)

var (
    // 密钥用于加密 cookie
    store = sessions.NewCookieStore([]byte("your-secret-key"))
)

func sessionHandler(w http.ResponseWriter, r *http.Request) {
    // 获取 session
    session, err := store.Get(r, "session-name")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    // 设置 session 值
    session.Values["username"] = "john_doe"
    session.Values["authenticated"] = true
    
    // 保存 session
    err = session.Save(r, w)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    fmt.Fprintln(w, "Session saved!")
}

func profileHandler(w http.ResponseWriter, r *http.Request) {
    session, err := store.Get(r, "session-name")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    
    // 检查用户是否已认证
    if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
        http.Error(w, "Forbidden", http.StatusForbidden)
        return
    }
    
    username := session.Values["username"]
    fmt.Fprintf(w, "Hello, %s!", username)
}

func main() {
    http.HandleFunc("/session", sessionHandler)
    http.HandleFunc("/profile", profileHandler)
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", nil)
}
```

## 文件上传

处理文件上传是 Web 应用的常见需求：

```go
package main

import (
    "fmt"
    "io"
    "net/http"
    "os"
)

func uploadHandler(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
    case "GET":
        tmpl := `
<!DOCTYPE html>
<html>
<body>
    <form enctype="multipart/form-data" action="/upload" method="post">
        <input type="file" name="uploadfile" />
        <input type="submit" value="upload" />
    </form>
</body>
</html>
`
        fmt.Fprint(w, tmpl)
        
    case "POST":
        // 解析 multipart 表单，最大内存 32MB
        r.ParseMultipartForm(32 << 20)
        
        // 获取文件句柄
        file, handler, err := r.FormFile("uploadfile")
        if err != nil {
            http.Error(w, err.Error(), http.StatusBadRequest)
            return
        }
        defer file.Close()
        
        fmt.Fprintf(w, "Uploaded File: %+v\n", handler.Filename)
        fmt.Fprintf(w, "File Size: %+v\n", handler.Size)
        fmt.Fprintf(w, "MIME Header: %+v\n", handler.Header)
        
        // 创建目标文件
        dst, err := os.Create("./uploads/" + handler.Filename)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        defer dst.Close()
        
        // 复制文件内容
        _, err = io.Copy(dst, file)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        
        fmt.Fprintf(w, "File uploaded successfully: %s", handler.Filename)
    }
}

func main() {
    // 确保 uploads 目录存在
    os.MkdirAll("./uploads", os.ModePerm)
    
    http.HandleFunc("/upload", uploadHandler)
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", nil)
}
```

## RESTful API 设计

构建 RESTful API 是现代 Web 开发的重要部分：

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "strconv"
    
    "github.com/gorilla/mux"
)

type Book struct {
    ID     int    `json:"id"`
    Title  string `json:"title"`
    Author string `json:"author"`
}

var books []Book
var nextID = 1

func init() {
    books = append(books, Book{ID: nextID, Title: "Go Programming", Author: "John Doe"})
    nextID++
    books = append(books, Book{ID: nextID, Title: "Web Development", Author: "Jane Smith"})
    nextID++
}

func getBooks(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(books)
}

func getBook(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    
    for _, book := range books {
        if book.ID == id {
            json.NewEncoder(w).Encode(book)
            return
        }
    }
    
    http.Error(w, "Book not found", http.StatusNotFound)
}

func createBook(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    var book Book
    _ = json.NewDecoder(r.Body).Decode(&book)
    book.ID = nextID
    nextID++
    books = append(books, book)
    json.NewEncoder(w).Encode(book)
}

func updateBook(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    
    for index, book := range books {
        if book.ID == id {
            books = append(books[:index], books[index+1:]...)
            var updatedBook Book
            _ = json.NewDecoder(r.Body).Decode(&updatedBook)
            updatedBook.ID = id
            books = append(books, updatedBook)
            json.NewEncoder(w).Encode(updatedBook)
            return
        }
    }
    
    http.Error(w, "Book not found", http.StatusNotFound)
}

func deleteBook(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])
    
    for index, book := range books {
        if book.ID == id {
            books = append(books[:index], books[index+1:]...)
            break
        }
    }
    
    json.NewEncoder(w).Encode(books)
}

func main() {
    r := mux.NewRouter()
    
    r.HandleFunc("/api/books", getBooks).Methods("GET")
    r.HandleFunc("/api/books/{id}", getBook).Methods("GET")
    r.HandleFunc("/api/books", createBook).Methods("POST")
    r.HandleFunc("/api/books/{id}", updateBook).Methods("PUT")
    r.HandleFunc("/api/books/{id}", deleteBook).Methods("DELETE")
    
    fmt.Println("Server starting on :8080...")
    http.ListenAndServe(":8080", r)
}
```

## 实践练习

1. 创建一个博客系统，支持文章的增删改查功能
2. 实现用户注册和登录功能，包括密码加密和会话管理
3. 构建一个文件共享服务，支持文件上传、下载和权限控制
4. 开发一个简单的任务管理系统，支持任务的创建、分配和状态跟踪

## 下一步

接下来您可以学习：
- [Go 微服务](./microservices) - 学习如何使用 Go 构建微服务架构
- [Go 最佳实践](./best-practices) - 学习 Go 语言编码规范与优化技巧