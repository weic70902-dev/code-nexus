# Base64 编解码工具

Base64 编解码工具可以将文本数据编码为 Base64 格式，或将 Base64 数据解码为原始文本。

## 功能特性

- 文本到 Base64 编码
- Base64 到文本解码
- 实时转换
- 错误处理

## 使用方法

1. 在输入框中输入您要编码的文本，或粘贴要解码的 Base64 字符串
2. 工具会自动进行相应的转换
3. 转换结果会显示在输出框中
4. 可以复制结果到剪贴板

## 应用场景

- 在 URL 中安全传输二进制数据
- 在 HTML 或 CSS 中嵌入小图片
- 电子邮件系统中的附件编码
- 数据存储和传输

## 示例

### 文本编码为 Base64
```
原始文本: Hello, World!
编码结果: SGVsbG8sIFdvcmxkIQ==
```

### Base64 解码为文本
```
编码文本: SGVsbG8sIFdvcmxkIQ==
解码结果: Hello, World!
```

### 在 HTML 中嵌入图片
```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==" alt="红点图片">
```

## 注意事项

- Base64 编码会增加数据大小约 33%
- 仅适用于文本数据的编码/解码
- 不应用于敏感数据的加密（Base64 不是加密算法）