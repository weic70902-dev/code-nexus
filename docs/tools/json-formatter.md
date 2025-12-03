# JSON 格式化工具

JSON 格式化工具可以帮助您美化和压缩 JSON 数据，使其更易于阅读和调试。

## 功能特性

- JSON 数据格式化和美化
- JSON 数据压缩
- 错误检测和提示
- 实时格式化

## 使用方法

1. 在输入框中粘贴您的 JSON 数据
2. 工具会自动检测并格式化数据
3. 如果数据有误，会显示错误信息
4. 可以切换格式化和压缩视图

## 示例

### 输入
```json
{"name":"John","age":30,"city":"New York"}
```

### 输出
```json
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

### 压缩输出
```json
{"name":"John","age":30,"city":"New York"}
```

### 复杂 JSON 示例
```json
{
  "users": [
    {
      "id": 1,
      "name": "张三",
      "email": "zhangsan@example.com",
      "profile": {
        "age": 25,
        "address": {
          "street": "中山路123号",
          "city": "北京",
          "zipcode": "100000"
        },
        "hobbies": ["读书", "游泳", "编程"]
      }
    },
    {
      "id": 2,
      "name": "李四",
      "email": "lisi@example.com",
      "profile": {
        "age": 30,
        "address": {
          "street": "南京路456号",
          "city": "上海",
          "zipcode": "200000"
        },
        "hobbies": ["音乐", "电影", "旅行"]
      }
    }
  ],
  "total": 2,
  "page": 1
}
```

## 应用场景

- **API 调试** - 格式化 API 返回的 JSON 数据以便查看
- **配置文件编辑** - 美化和验证 JSON 配置文件
- **数据转换** - 压缩 JSON 数据以减少传输大小
- **日志分析** - 格式化日志中的 JSON 数据

## 注意事项

- 仅支持标准 JSON 格式
- 不支持 JavaScript 对象格式（如单引号、函数等）