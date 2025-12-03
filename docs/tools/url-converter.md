# URL 编解码工具

URL 编解码工具可以对 URL 进行编码和解码操作，确保 URL 中的特殊字符能被正确传输和解析。

## 功能特性

- URL 编码（百分号编码）
- URL 解码
- 实时转换
- 支持各种特殊字符

## 使用方法

1. 在输入框中输入您要编码的 URL 或粘贴要解码的编码字符串
2. 工具会自动进行相应的转换
3. 转换结果会显示在输出框中
4. 可以复制结果到剪贴板

## 应用场景

- 在 URL 中包含特殊字符（如空格、中文等）
- 避免 URL 中的特殊字符被误解
- 符合 RFC 3986 标准

## 编码规则

- 空格会被编码为 `%20`
- 中文字符会被编码为 UTF-8 格式的百分号编码
- 特殊字符如 `#`, `&`, `=`, `?` 等会被编码

## 示例

### 原始 URL
```
https://example.com/search?q=hello world&lang=中文
```

### 编码后
```
https://example.com/search?q=hello%20world&lang=%E4%B8%AD%E6%96%87
```

### JavaScript 代码示例
```javascript
// URL 编码
const originalUrl = "https://example.com/search?q=hello world&lang=中文";
const encodedUrl = encodeURIComponent(originalUrl);
console.log(encodedUrl);
// 输出: https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26lang%3D%E4%B8%AD%E6%96%87

// URL 解码
const decodedUrl = decodeURIComponent(encodedUrl);
console.log(decodedUrl);
// 输出: https://example.com/search?q=hello world&lang=中文

// 仅编码 URI 组件（适合参数值）
const paramValue = "hello world & 中文";
const encodedParam = encodeURIComponent(paramValue);
console.log(encodedParam);
// 输出: hello%20world%20%26%20%E4%B8%AD%E6%96%87

// 编码整个 URL
const fullUrl = "https://example.com/search?q=hello world&lang=中文";
const encodedFullUrl = encodeURI(fullUrl);
console.log(encodedFullUrl);
// 输出: https://example.com/search?q=hello%20world&lang=%E4%B8%AD%E6%96%87
```

### Python 代码示例
```python
from urllib.parse import quote, unquote, quote_plus

# URL 编码
original_url = "https://example.com/search?q=hello world&lang=中文"
encoded_url = quote(original_url, safe='')
print(encoded_url)
# 输出: https%3A//example.com/search%3Fq%3Dhello%20world%26lang%3D%E4%B8%AD%E6%96%87

# URL 解码
decoded_url = unquote(encoded_url)
print(decoded_url)
# 输出: https://example.com/search?q=hello world&lang=中文

# 编码查询参数值
param_value = "hello world & 中文"
encoded_param = quote_plus(param_value)
print(encoded_param)
# 输出: hello+world+%26+%E4%B8%AD%E6%96%87

# 解码查询参数值
decoded_param = unquote_plus(encoded_param)
print(decoded_param)
# 输出: hello world & 中文
```

## 应用场景示例

### 1. AJAX 请求参数编码
```javascript
// 发送包含特殊字符的 AJAX 请求
const searchTerm = "hello world & 中文";
const encodedTerm = encodeURIComponent(searchTerm);
const url = `/api/search?q=${encodedTerm}`;

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));
```

### 2. 构造带参数的 URL
```javascript
// 构造带查询参数的 URL
function buildUrl(baseUrl, params) {
  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  
  return `${baseUrl}?${queryString}`;
}

const url = buildUrl('https://api.example.com/users', {
  name: '张三',
  city: 'New York & Boston',
  hobby: '读书 & 写作'
});

console.log(url);
// 输出: https://api.example.com/users?name=%E5%BC%A0%E4%B8%89&city=New%20York%20%26%20Boston&hobby=%E8%AF%BB%E4%B9%A6%20%26%20%E5%86%99%E4%BD%9C
```

## 注意事项

- 编码和解码操作是可逆的
- 已经编码的 URL 再次编码可能会产生意外结果
- 仅对需要编码的部分进行操作