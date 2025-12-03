# HTML5 新特性

HTML5 是 HTML 的最新版本，引入了许多新特性和改进，使网页开发更加强大和便捷。

## HTML5 的主要改进

### 语义化标签

HTML5 引入了新的语义化标签，使页面结构更加清晰：

```html
<header>
    <h1>网站标题</h1>
    <nav>
        <ul>
            <li><a href="/">首页</a></li>
            <li><a href="/about">关于</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <h2>文章标题</h2>
        <p>文章内容...</p>
    </article>
    
    <aside>
        <h3>侧边栏</h3>
        <p>相关内容...</p>
    </aside>
</main>

<footer>
    <p>&copy; 2025 版权信息</p>
</footer>
```

#### 常用语义化标签

- `<header>`：页面或章节的头部
- `<nav>`：导航链接
- `<main>`：主要内容
- `<article>`：独立的文章内容
- `<section>`：文档中的节
- `<aside>`：侧边栏内容
- `<footer>`：页面或章节的底部
- `<figure>` 和 `<figcaption>`：媒体内容及其标题
- `<time>`：日期或时间
- `<mark>`：高亮文本
- `<details>` 和 `<summary>`：可展开的详情信息
- `<dialog>`：对话框
- `<progress>`：进度条
- `<meter>`：度量衡标尺
- `<output>`：计算结果输出
- `<data>`：机器可读的翻译内容
- `<template>`：模板内容
- `<slot>`：Web Components 插槽
- `<ruby>`、`<rt>`、`<rp>`： ruby 注解
- `<bdi>`：双向隔离文本
- `<wbr>`：换行机会

### 多媒体元素

HTML5 原生支持音频和视频播放：

#### 音频

```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    您的浏览器不支持 audio 标签。
</audio>

<!-- 带有更多属性的音频 -->
<audio controls preload="none" loop muted>
    <source src="audio.mp3" type="audio/mpeg">
    <track kind="captions" src="captions.vtt" srclang="zh" label="中文">
    您的浏览器不支持 audio 标签。
</audio>

<!-- 完整的音频示例 -->
<audio controls 
       autoplay 
       loop 
       muted 
       preload="auto" 
       crossorigin="anonymous">
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    <track kind="subtitles" src="subtitles.vtt" srclang="zh" label="中文">
    您的浏览器不支持 audio 标签。
</audio>
```

#### 视频

```html
<video width="320" height="240" controls>
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.ogg" type="video/ogg">
    您的浏览器不支持 video 标签。
</video>

<!-- 带有更多属性的视频 -->
<video width="320" height="240" controls poster="poster.jpg" preload="metadata" loop autoplay muted>
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    <track kind="subtitles" src="subtitles_en.vtt" srclang="en" label="English">
    <track kind="subtitles" src="subtitles_zh.vtt" srclang="zh" label="中文" default>
    您的浏览器不支持 video 标签。
</video>

<!-- 完整的视频示例 -->
<video width="1280" height="720" 
       controls 
       autoplay 
       loop 
       muted 
       poster="poster.jpg" 
       preload="auto" 
       crossorigin="anonymous">
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    <track kind="captions" src="captions_en.vtt" srclang="en" label="English" default>
    <track kind="subtitles" src="subtitles_zh.vtt" srclang="zh" label="中文">
    您的浏览器不支持 video 标签。
</video>

<!-- 嵌入 YouTube 视频 -->
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" 
        frameborder="0" allowfullscreen></iframe>
```

### Canvas 绘图

Canvas 提供了通过 JavaScript 绘制图形的能力：

```html
<canvas id="myCanvas" width="200" height="100"></canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制红色矩形
ctx.fillStyle = '#FF0000';
ctx.fillRect(0, 0, 150, 75);

// 绘制蓝色边框矩形
ctx.strokeStyle = '#0000FF';
ctx.lineWidth = 2;
ctx.strokeRect(10, 10, 100, 50);

// 绘制圆形
ctx.beginPath();
ctx.arc(100, 50, 30, 0, 2 * Math.PI);
ctx.fillStyle = '#00FF00';
ctx.fill();

// 绘制文本
ctx.font = '20px Arial';
ctx.fillStyle = '#000000';
ctx.fillText('Hello Canvas', 10, 90);

// 绘制线条
ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.strokeStyle = '#FF00FF';
ctx.lineWidth = 3;
ctx.stroke();
</script>
```

#### Canvas 常用方法

- `getContext('2d')`：获取 2D 绘图上下文
- `fillRect(x, y, width, height)`：绘制填充矩形
- `strokeRect(x, y, width, height)`：绘制边框矩形
- `clearRect(x, y, width, height)`：清除矩形区域
- `beginPath()`：开始绘制路径
- `moveTo(x, y)`：移动到指定点
- `lineTo(x, y)`：绘制直线到指定点
- `arc(x, y, radius, startAngle, endAngle)`：绘制圆弧
- `fill()`：填充当前路径
- `stroke()`：绘制当前路径的边框
- `fillText(text, x, y)`：绘制文本
- `strokeText(text, x, y)`：绘制文本边框

### 本地存储

HTML5 提供了比 Cookie 更强大的本地存储功能：

#### localStorage

```javascript
// 存储数据
localStorage.setItem('username', 'John');

// 获取数据
const username = localStorage.getItem('username');

// 删除数据
localStorage.removeItem('username');

// 清空所有数据
localStorage.clear();

// 存储对象
const user = {name: 'John', age: 30};
localStorage.setItem('user', JSON.stringify(user));

// 获取对象
const storedUser = JSON.parse(localStorage.getItem('user'));
```

#### sessionStorage

```javascript
// 存储数据（仅在当前会话有效）
sessionStorage.setItem('theme', 'dark');

// 获取数据
const theme = sessionStorage.getItem('theme');

// 删除数据
sessionStorage.removeItem('theme');

// 清空所有数据
sessionStorage.clear();
```

#### Cookie vs Web Storage

| 特性 | Cookie | localStorage | sessionStorage |
|------|--------|--------------|----------------|
| 存储大小 | 4KB | 5-10MB | 5-10MB |
| 生命周期 | 手动设置过期时间 | 持久存储 | 会话结束清除 |
| 发送至服务器 | 每次请求都会发送 | 仅客户端 | 仅客户端 |
| 访问方式 | document.cookie | window.localStorage | window.sessionStorage |

## 新的表单元素和属性

HTML5 为表单增加了许多新的输入类型和属性：

```html
<!-- 新的输入类型 -->
<input type="email" placeholder="请输入邮箱">
<input type="url" placeholder="请输入网址">
<input type="number" min="0" max="100" placeholder="请输入数字">
<input type="date" placeholder="请选择日期">
<input type="color" placeholder="请选择颜色">
<input type="range" min="0" max="100" value="50">
<input type="datetime-local" placeholder="请选择日期和时间">
<input type="month" placeholder="请选择月份">
<input type="week" placeholder="请选择周">
<input type="time" placeholder="请选择时间">
<input type="search" placeholder="搜索...">

<!-- 表单属性 -->
<input type="text" required placeholder="必填字段">
<input type="text" autofocus placeholder="自动获得焦点">
<input type="text" autocomplete="off" placeholder="关闭自动完成">
<input type="text" placeholder="输入提示" list="suggestions">
<datalist id="suggestions">
    <option value="选项1">
    <option value="选项2">
</datalist>

<!-- 新的表单元素 -->
<output name="result" for="num1 num2">0</output>
<meter value="70" min="0" max="100" low="30" high="80" optimum="90">70%</meter>
<progress value="70" max="100">70%</progress>
```

## 地理定位

HTML5 提供了获取用户地理位置的 API：

```javascript
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`纬度: ${latitude}, 经度: ${longitude}`);
    });
} else {
    console.log("浏览器不支持地理定位");
}
```

## Web Workers

Web Workers 允许在后台运行 JavaScript，避免阻塞用户界面：

```javascript
// 创建 worker
const worker = new Worker('worker.js');

// 发送消息给 worker
worker.postMessage('Hello Worker');

// 接收来自 worker 的消息
worker.onmessage = function(e) {
    console.log('收到消息:', e.data);
};
```

## WebSocket

WebSocket 提供了全双工通信通道：

```javascript
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function(event) {
    console.log('连接已建立');
    socket.send('Hello Server');
};

socket.onmessage = function(event) {
    console.log('收到消息:', event.data);
};
```

## 最佳实践

1. **渐进增强**：使用新特性时要考虑旧浏览器的兼容性
2. **语义化优先**：合理使用语义化标签提高可读性和可访问性
3. **性能优化**：合理使用本地存储和缓存策略
4. **安全性**：注意处理用户输入，防止 XSS 攻击

## 实践练习

1. 使用语义化标签重构一个简单的博客页面
2. 创建一个包含音频和视频元素的多媒体页面
3. 使用 Canvas 绘制一个简单的图形（如国旗、徽标等）
4. 实现一个本地存储的待办事项列表

## 下一步

接下来您可以学习：
- [HTML APIs 和 DOM 操作](./apis) - 学习 DOM 操作和事件处理
- [最佳实践](./best-practices) - 学习 HTML 编写的最佳实践