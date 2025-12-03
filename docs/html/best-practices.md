# HTML 最佳实践

编写高质量的 HTML 代码不仅能提高代码可维护性，还能改善用户体验和搜索引擎优化效果。

## 语义化 HTML

使用正确的 HTML 标签来表达内容的含义：

```html
<!-- 好的做法 -->
<article>
    <header>
        <h1>文章标题</h1>
        <time datetime="2025-01-01">2025年1月1日</time>
    </header>
    <p>文章内容...</p>
</article>

<!-- 避免的做法 -->
<div class="article">
    <div class="header">
        <div class="title">文章标题</div>
        <div class="date">2025年1月1日</div>
    </div>
    <div class="content">文章内容...</div>
</div>
```

### 常见语义化标签使用场景

- `<header>`：页面或章节的头部
- `<nav>`：导航区域
- `<main>`：页面主要内容
- `<article>`：独立的内容单元
- `<section>`：文档中的节
- `<aside>`：辅助内容
- `<footer>`：页面或章节的底部

## 可访问性 (Accessibility)

确保所有人都能访问您的网页内容：

### 正确使用 alt 属性

```html
<!-- 信息性图片 -->
<img src="chart.png" alt="2025年销售额增长趋势图">

<!-- 装饰性图片 -->
<img src="decoration.png" alt="">

<!-- 功能性图片 -->
<img src="print-icon.png" alt="打印此页面">
```

### 使用 label 关联表单控件

```html
<!-- 好的做法 -->
<label for="username">用户名:</label>
<input type="text" id="username" name="username">

<!-- 或者 -->
<label>
    用户名:
    <input type="text" name="username">
</label>
```

### ARIA 属性

```html
<!-- 指示当前页面 -->
<nav aria-label="主导航">
    <ul>
        <li><a href="/" aria-current="page">首页</a></li>
        <li><a href="/about">关于</a></li>
    </ul>
</nav>

<!-- 描述复杂组件 -->
<div role="alert" aria-live="assertive">
    错误：请填写必填字段
</div>
```

## SEO 优化

### 合理使用标题层级

```html
<!-- 好的标题结构 -->
<h1>网站标题</h1>
<h2>页面主题</h2>
<h3>子主题</h3>
<h4>详细内容</h4>

<!-- 避免跳级 -->
<h1>网站标题</h1>
<h3>错误的跳级标题</h3> <!-- 应该是 h2 -->
```

### 使用 meta 标签

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="简洁明了的页面描述，长度控制在150个字符以内">
    <meta name="keywords" content="关键词1, 关键词2, 关键词3">
    <title>页面标题 - 网站名称</title>
</head>
```

## 代码规范

### 缩进和格式

```html
<!-- 统一缩进（推荐2个或4个空格） -->
<div class="container">
    <header>
        <h1>网站标题</h1>
        <nav>
            <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/about">关于</a></li>
            </ul>
        </nav>
    </header>
</div>
```

### 属性书写顺序

```html
<!-- 推荐的属性顺序 -->
<input 
    class="form-control"
    id="username"
    name="username"
    type="text"
    placeholder="请输入用户名"
    required>
```

### 布尔属性

```html
<!-- 布尔属性的正确写法 -->
<input type="checkbox" checked>
<input type="checkbox" disabled>
<input type="text" readonly>
```

## 性能优化

### 预加载关键资源

```html
<head>
    <!-- 预加载关键字体 -->
    <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
    
    <!-- 预连接外部域名 -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
</head>
```

### 图片优化

```html
<!-- 响应式图片 -->
<picture>
    <source media="(min-width: 768px)" srcset="large.jpg">
    <source media="(min-width: 480px)" srcset="medium.jpg">
    <img src="small.jpg" alt="描述文字">
</picture>

<!-- 使用 srcset -->
<img 
    src="image-400.jpg"
    srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
    sizes="(max-width: 400px) 100vw, (max-width: 800px) 50vw, 33vw"
    alt="描述文字">
```

## 安全性

### 防止 XSS 攻击

```html
<!-- 避免直接插入用户输入 -->
<!-- 错误做法 -->
<div id="content"></div>
<script>
    // 危险！可能导致 XSS
    document.getElementById('content').innerHTML = userInput;
</script>

<!-- 正确做法 -->
<div id="content"></div>
<script>
    // 安全的做法
    const textNode = document.createTextNode(userInput);
    document.getElementById('content').appendChild(textNode);
</script>
```

### 使用 noopener

```html
<!-- 外部链接添加安全属性 -->
<a href="https://external-site.com" target="_blank" rel="noopener noreferrer">
    访问外部网站
</a>
```

## 移动端适配

### viewport 设置

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 触摸友好的交互

```html
<!-- 合适的按钮大小 -->
<button class="btn-large">点击按钮</button>

<style>
.btn-large {
    min-height: 44px; /* 至少44像素高 */
    min-width: 44px;   /* 至少44像素宽 */
}
</style>
```

## 测试和验证

### 使用验证工具

定期使用 W3C 验证服务检查 HTML 代码：
- [W3C Markup Validation Service](https://validator.w3.org/)

### 跨浏览器测试

确保在主流浏览器中正常工作：
- Chrome
- Firefox
- Safari
- Edge

## 实践练习

1. 选择一个现有的网页，使用语义化标签重构其结构
2. 为一个表单添加完整的可访问性支持
3. 优化一个页面的 SEO 元素
4. 实现响应式图片加载

## 总结

遵循 HTML 最佳实践能够：
- 提高代码质量和可维护性
- 增强用户体验和可访问性
- 改善搜索引擎排名
- 提升网站性能
- 增强安全性

持续学习和应用这些最佳实践，您将成为一名更优秀的前端开发者。