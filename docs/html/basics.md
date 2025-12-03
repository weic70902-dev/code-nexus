# HTML 基础

HTML（HyperText Markup Language，超文本标记语言）是构建网页的基础。本教程将带您从零开始学习 HTML 的基本概念和语法。

## 什么是 HTML？

HTML 是一种标记语言，用于创建网页结构和内容。它使用一系列标签（tags）来描述网页的不同部分，如标题、段落、图像、链接等。

## HTML 文档结构

一个基本的 HTML 文档包含以下部分：

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>页面标题</title>
</head>
<body>
    <h1>这是一个标题</h1>
    <p>这是一个段落。</p>
</body>
</html>
```

### 各部分说明：

- `<!DOCTYPE html>`：声明文档类型，告诉浏览器这是 HTML5 文档
- `<html>`：根元素，包含整个 HTML 文档
- `<head>`：文档头部，包含元数据（如字符编码、标题等）
- `<meta charset="UTF-8">`：指定字符编码
- `<title>`：页面标题，在浏览器标签页中显示
- `<body>`：文档主体，包含可见内容

### head 部分详解

`<head>` 元素包含了文档的元数据，这些数据不会直接显示在网页上，但对浏览器和搜索引擎非常重要：

```html
<head>
    <!-- 字符编码声明 -->
    <meta charset="UTF-8">
    
    <!-- 页面标题 -->
    <title>页面标题</title>
    
    <!-- 页面描述 -->
    <meta name="description" content="这是一个页面描述">
    
    <!-- 关键词 -->
    <meta name="keywords" content="HTML, CSS, JavaScript">
    
    <!-- 作者信息 -->
    <meta name="author" content="作者姓名">
    
    <!-- 视口设置，用于响应式设计 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- 禁止翻译 -->
    <meta name="google" content="notranslate">
    
    <!-- 禁止缓存 -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    
    <!-- 页面刷新 -->
    <meta http-equiv="refresh" content="30">
    
    <!-- 基准 URL -->
    <base href="https://example.com/" target="_blank">
    
    <!-- 外部 CSS -->
    <link rel="stylesheet" href="styles.css">
    
    <!-- 网站图标 -->
    <link rel="icon" type="image/png" href="/favicon.png">
    
    <!-- 内联 CSS -->
    <style>
        body { font-family: Arial, sans-serif; }
    </style>
    
    <!-- 内联 JavaScript -->
    <script>
        console.log('页面加载');
    </script>
</head>
```

## 常用 HTML 标签

### 标题标签

HTML 提供了六级标题标签，从 `<h1>` 到 `<h6>`：

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

### 段落和文本格式

```html
<p>这是一个段落。</p>

<!-- 文本格式化标签 -->
<strong>粗体文本</strong>
<em>斜体文本</em>
<u>下划线文本</u>
<del>删除线文本</del>

<!-- 其他文本格式标签 -->
<small>小号文本</small>
<mark>高亮文本</mark>
<sub>下标文本</sub>
<sup>上标文本</sup>
<code>代码片段</code>
<pre>预格式化文本块</pre>
<blockquote>引用文本</blockquote>
<q>短引用</q>
<abbr title="HyperText Markup Language">HTML</abbr>
<cite>作品标题</cite>
```

### 链接和锚点

```html
<!-- 外部链接 -->
<a href="https://www.example.com">访问示例网站</a>

<!-- 内部链接 -->
<a href="./other-page.html">跳转到其他页面</a>

<!-- 锚点链接 -->
<a href="#section1">跳转到第一部分</a>

<!-- 其他链接类型 -->
<a href="mailto:someone@example.com">发送邮件</a>
<a href="tel:+1234567890">拨打电话</a>
<a href="sms:+1234567890">发送短信</a>
<a href="#" onclick="alert('点击事件')">JavaScript 链接</a>
<a href="document.pdf" download>下载文件</a>
<a href="https://www.example.com" target="_blank" rel="noopener">在新窗口打开</a>
```

### 图像

```html
<!-- 基本图像 -->
<img src="image.jpg" alt="图片描述" width="300" height="200">

<!-- 带有附加属性的图像 -->
<img src="image.jpg" alt="图片描述" width="300" height="200" 
     loading="lazy" title="图片标题" crossorigin="anonymous">

<!-- 响应式图像 -->
<img src="image.jpg" srcset="image-small.jpg 300w, image-medium.jpg 600w, image-large.jpg 1200w" 
     sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px" 
     alt="响应式图片">

<!-- 图像映射 -->
<img src="map.jpg" alt="地图" usemap="#workmap" width="400" height="300">
<map name="workmap">
  <area shape="rect" coords="34,44,270,350" alt="计算机" href="computer.htm">
  <area shape="rect" coords="290,172,333,250" alt="电话" href="phone.htm">
</map>
```

### 列表

```html
<!-- 无序列表 -->
<ul>
    <li>列表项 1</li>
    <li>列表项 2</li>
    <li>列表项 3</li>
</ul>

<!-- 有序列表 -->
<ol>
    <li>第一项</li>
    <li>第二项</li>
    <li>第三项</li>
</ol>

<!-- 描述列表 -->
<dl>
    <dt>HTML</dt>
    <dd>超文本标记语言</dd>
    <dt>CSS</dt>
    <dd>层叠样式表</dd>
</dl>

<!-- 嵌套列表 -->
<ul>
    <li>主列表项 1
        <ul>
            <li>子列表项 1</li>
            <li>子列表项 2</li>
        </ul>
    </li>
    <li>主列表项 2</li>
</ul>
```

## 注释

在 HTML 中添加注释：

```html
<!-- 这是一个注释，不会在浏览器中显示 -->
```

## 实践练习

尝试创建一个简单的个人介绍页面，包含以下内容：
1. 页面标题
2. 个人姓名（使用标题标签）
3. 一段自我介绍（使用段落标签）
4. 一张个人照片
5. 一个链接到您社交媒体的链接

## 下一步

接下来您可以学习：
- [HTML 表单](./forms) - 学习如何创建交互式表单
- [HTML5 新特性](./html5) - 了解 HTML5 的新标签和功能