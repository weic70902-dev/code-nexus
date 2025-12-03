# Go 部署和运维

在开发完 Go 应用程序后，如何将其部署到生产环境并进行有效运维是确保应用稳定运行的关键。本章将介绍 Go 应用的容器化部署、云原生部署、监控和日志管理等运维实践。

## 应用构建和优化

在部署之前，我们需要正确构建和优化 Go 应用程序。

### 构建优化

```bash
# 基本构建
go build -o myapp main.go

# 交叉编译（构建不同平台的二进制文件）
GOOS=linux GOARCH=amd64 go build -o myapp-linux main.go
GOOS=windows GOARCH=amd64 go build -o myapp.exe main.go
GOOS=darwin GOARCH=amd64 go build -o myapp-mac main.go

# 构建优化参数
go build -ldflags="-s -w" -o myapp main.go

# 完整的生产环境构建命令
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -a -installsuffix cgo -ldflags="-s -w" -o myapp main.go
```

### 构建标志说明

- `-a`: 强制重新构建所有包
- `-installsuffix cgo`: 在包安装目录中使用后缀
- `-ldflags="-s -w"`: 去除符号表和调试信息，减小二进制文件大小
- `CGO_ENABLED=0`: 禁用 CGO，创建纯静态二进制文件

## Docker 容器化部署

Docker 是现代应用部署的标准方式，它提供了环境一致性、易于部署和扩展等优势。

### 编写 Dockerfile

```dockerfile
# 使用官方 Go 镜像作为构建环境
FROM golang:1.19-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 go mod 和 sum 文件
COPY go.mod go.sum ./
# 下载依赖
RUN go mod download

# 复制源代码
COPY . .

# 构建应用
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags="-s -w" -o main .

# 使用 Alpine 镜像作为运行环境
FROM alpine:latest

# 安装 ca-certificates 以支持 HTTPS 请求
RUN apk --no-cache add ca-certificates

# 设置工作目录
WORKDIR /root/

# 从构建器镜像复制预构建的二进制文件
COPY --from=builder /app/main .

# 暴露端口
EXPOSE 8080

# 运行二进制文件
CMD ["./main"]
```

### 多阶段构建优化

```dockerfile
# 构建阶段
FROM golang:1.19-alpine AS builder

WORKDIR /app

# 先复制依赖文件，利用 Docker 缓存
COPY go.mod go.sum ./
RUN go mod download

# 复制源代码
COPY . .

# 构建
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -ldflags="-s -w" -o main .

# 运行阶段
FROM gcr.io/distroless/static:nonroot

WORKDIR /

# 从构建阶段复制二进制文件
COPY --from=builder /app/main .

# 非 root 用户
USER nonroot:nonroot

EXPOSE 8080

ENTRYPOINT ["./main"]
```

### 构建和运行 Docker 镜像

```bash
# 构建镜像
docker build -t myapp:latest .

# 运行容器
docker run -p 8080:8080 myapp:latest

# 查看运行的容器
docker ps

# 查看容器日志
docker logs <container_id>
```

## Docker Compose 编排

对于复杂的多服务应用，可以使用 Docker Compose 进行编排。

```yaml
# docker-compose.yml
version: '3.8'

services:
  # API 网关
  api-gateway:
    build: ./api-gateway
    ports:
      - "8080:8080"
    depends_on:
      - user-service
      - order-service
    environment:
      - USER_SERVICE_URL=http://user-service:8080
      - ORDER_SERVICE_URL=http://order-service:8080

  # 用户服务
  user-service:
    build: ./user-service
    ports:
      - "8081:8080"
    depends_on:
      - database
    environment:
      - DB_HOST=database
      - DB_PORT=5432
      - DB_USER=user
      - DB_PASSWORD=password
      - DB_NAME=myapp

  # 订单服务
  order-service:
    build: ./order-service
    ports:
      - "8082:8080"
    depends_on:
      - database
      - rabbitmq
    environment:
      - DB_HOST=database
      - DB_PORT=5432
      - DB_USER=user
      - DB_PASSWORD=password
      - DB_NAME=myapp
      - RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672/

  # 数据库
  database:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # 消息队列
  rabbitmq:
    image: rabbitmq:3-management
    ports:
      - "5672:5672"
      - "15672:15672"

  # 服务发现
  consul:
    image: consul:latest
    ports:
      - "8500:8500"
    command: "agent -dev -client=0.0.0.0"

volumes:
  postgres_data:
```

运行 Docker Compose：

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs

# 停止所有服务
docker-compose down
```

## Kubernetes 部署

Kubernetes 是容器编排的事实标准，适用于大规模生产环境。

### Deployment 配置

```yaml
# user-service-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
  labels:
    app: user-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: user-service
  template:
    metadata:
      labels:
        app: user-service
    spec:
      containers:
      - name: user-service
        image: myregistry/user-service:latest
        ports:
        - containerPort: 8080
        env:
        - name: DB_HOST
          value: "postgres-service"
        - name: DB_PORT
          value: "5432"
        - name: DB_USER
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: username
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: password
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 8080
  type: ClusterIP
```

### ConfigMap 和 Secret

```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  log.level: "info"
  server.port: "8080"
  database.max.connections: "100"
---
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
data:
  username: dXNlcm5hbWU=  # base64 encoded "username"
  password: cGFzc3dvcmQ=  # base64 encoded "password"
```

### Ingress 配置

```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /users
        pathType: Prefix
        backend:
          service:
            name: user-service
            port:
              number: 8080
      - path: /orders
        pathType: Prefix
        backend:
          service:
            name: order-service
            port:
              number: 8080
```

## 监控和日志

### 应用监控

使用 Prometheus 和 Grafana 进行监控：

```go
// metrics.go
package main

import (
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promauto"
    "github.com/prometheus/client_golang/prometheus/promhttp"
    "net/http"
)

var (
    httpRequestsTotal = promauto.NewCounterVec(
        prometheus.CounterOpts{
            Name: "http_requests_total",
            Help: "Total number of HTTP requests",
        },
        []string{"method", "endpoint", "status"},
    )

    httpRequestDuration = promauto.NewHistogramVec(
        prometheus.HistogramOpts{
            Name:    "http_request_duration_seconds",
            Help:    "Duration of HTTP requests",
            Buckets: prometheus.DefBuckets,
        },
        []string{"method", "endpoint"},
    )
)

func recordMetrics(method, endpoint string, status int, duration float64) {
    httpRequestsTotal.WithLabelValues(method, endpoint, string(status)).Inc()
    httpRequestDuration.WithLabelValues(method, endpoint).Observe(duration)
}

func main() {
    // 注册 Prometheus 指标端点
    http.Handle("/metrics", promhttp.Handler())
    
    // 启动 HTTP 服务器
    http.ListenAndServe(":8080", nil)
}
```

Prometheus 配置文件：

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'go-app'
    static_configs:
      - targets: ['localhost:8080']
```

### 结构化日志

```go
// logging.go
package main

import (
    "go.uber.org/zap"
    "time"
)

func setupLogger() (*zap.Logger, error) {
    cfg := zap.NewProductionConfig()
    cfg.OutputPaths = []string{
        "logs/app.log",
        "stdout",
    }
    return cfg.Build()
}

func main() {
    logger, _ := setupLogger()
    defer logger.Sync()

    logger.Info("Application started",
        zap.String("version", "1.0.0"),
        zap.Int("port", 8080),
    )

    // 在业务逻辑中使用
    processRequest(logger, "request-id-123")
}

func processRequest(logger *zap.Logger, requestID string) {
    startTime := time.Now()
    
    logger.Info("Processing request",
        zap.String("request_id", requestID),
        zap.Time("start_time", startTime),
    )

    // 处理逻辑...
    
    duration := time.Since(startTime)
    logger.Info("Request processed",
        zap.String("request_id", requestID),
        zap.Duration("duration", duration),
    )
}
```

## CI/CD 流水线

使用 GitHub Actions 实现自动化构建和部署：

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Go
      uses: actions/setup-go@v3
      with:
        go-version: 1.19
        
    - name: Build
      run: go build -v ./...
      
    - name: Test
      run: go test -v ./...
      
    - name: Coverage
      run: go test -coverprofile=coverage.out ./...
      
  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
      
    - name: Login to DockerHub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}
        
    - name: Build and push
      uses: docker/build-push-action@v3
      with:
        context: .
        push: true
        tags: myusername/myapp:latest
        
    - name: Deploy to Kubernetes
      run: |
        echo "${{ secrets.KUBE_CONFIG_DATA }}" | base64 -d > kubeconfig
        kubectl --kubeconfig=kubeconfig set image deployment/user-service user-service=myusername/myapp:latest
```

## 故障排查和调试

### 性能分析

```bash
# 生成 CPU profile
go tool pprof http://localhost:8080/debug/pprof/profile

# 生成内存 profile
go tool pprof http://localhost:8080/debug/pprof/heap

# 生成 goroutine profile
go tool pprof http://localhost:8080/debug/pprof/goroutine

# 交互式分析
(pprof) top
(pprof) web
(pprof) list functionName
```

### 调试工具

```go
// debug.go
package main

import (
    "net/http"
    _ "net/http/pprof" // 自动注册 pprof 端点
)

func main() {
    // 启动 pprof 服务器
    go func() {
        http.ListenAndServe("localhost:6060", nil)
    }()
    
    // 应用主逻辑
    http.ListenAndServe(":8080", nil)
}
```

## 安全最佳实践

### 容器安全

```dockerfile
# 使用非 root 用户
FROM alpine:latest
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup
USER appuser

# 最小化依赖
FROM gcr.io/distroless/static:nonroot

# 扫描漏洞
# docker scan myapp:latest
```

### 网络安全

```go
// security.go
package main

import (
    "crypto/tls"
    "net/http"
    "time"
)

func createSecureClient() *http.Client {
    return &http.Client{
        Timeout: 30 * time.Second,
        Transport: &http.Transport{
            TLSClientConfig: &tls.Config{
                MinVersion: tls.VersionTLS12,
                // 验证证书
                InsecureSkipVerify: false,
            },
        },
    }
}
```

## 实践练习

1. 为现有 Go 应用创建 Dockerfile 并构建镜像
2. 编写 docker-compose.yml 文件编排多服务应用
3. 部署应用到 Kubernetes 集群
4. 配置 Prometheus 监控和 Grafana 仪表板
5. 设置 CI/CD 流水线实现自动化部署
6. 使用 pprof 工具分析应用性能

## 下一步

- [Go 语言基础](./basics) - 如果您是 Go 语言初学者
- [Go 语言进阶](./advanced) - 学习并发编程、接口、错误处理等高级主题
- [Go Web 编程](./web) - 学习如何使用 Go 构建 Web 应用
- [Go 微服务](./microservices) - 学习如何使用 Go 构建微服务架构
- [Go 包管理和依赖注入](./dependencies) - 学习 Go Modules 和依赖注入
- [Go 测试策略](./testing) - 学习各种测试方法和策略
- [Go 最佳实践](./best-practices) - 学习 Go 语言编码规范与优化技巧