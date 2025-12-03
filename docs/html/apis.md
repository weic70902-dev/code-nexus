# HTML APIs 和 DOM 操作

HTML 不仅仅是一种标记语言，它还提供了一系列强大的 API，允许开发者通过 JavaScript 与页面元素进行交互和操作。这些 API 是现代 Web 开发的核心组成部分。

## DOM (Document Object Model)

DOM 是 HTML 文档的对象表示，它将整个文档视为一个树状结构，其中每个节点都是一个对象，代表文档的一部分。

### 获取元素

```javascript
// 通过 ID 获取元素
const element = document.getElementById('myId');

// 通过类名获取元素集合
const elements = document.getElementsByClassName('myClass');

// 通过标签名获取元素集合
const paragraphs = document.getElementsByTagName('p');

// 使用 CSS 选择器获取元素
const firstMatch = document.querySelector('.myClass');
const allMatches = document.querySelectorAll('.myClass');
```

### 修改元素内容

```javascript
// 修改文本内容
element.textContent = '新的文本内容';

// 修改 HTML 内容
element.innerHTML = '<strong>新的 HTML 内容</strong>';

// 修改表单元素的值
inputElement.value = '新的值';
```

### 修改元素属性

```javascript
// 获取属性
const src = imgElement.getAttribute('src');

// 设置属性
imgElement.setAttribute('src', 'new-image.jpg');

// 直接修改属性（适用于标准属性）
imgElement.src = 'new-image.jpg';
imgElement.alt = '图片描述';

// 修改类名
element.className = 'newClass';
element.classList.add('anotherClass');
element.classList.remove('oldClass');
element.classList.toggle('toggleClass');
```

### 修改元素样式

```javascript
// 直接修改样式
element.style.color = 'red';
element.style.fontSize = '20px';

// 修改 CSS 类来控制样式
element.classList.add('highlight');
```

## 事件处理

事件是用户与网页交互的方式，如点击、悬停、按键等。

### 添加事件监听器

```javascript
// 添加点击事件监听器
button.addEventListener('click', function(event) {
    console.log('按钮被点击了');
});

// 使用箭头函数
button.addEventListener('click', (event) => {
    console.log('按钮被点击了');
});

// 移除事件监听器
function handleClick(event) {
    console.log('按钮被点击了');
}
button.addEventListener('click', handleClick);
// 移除监听器
button.removeEventListener('click', handleClick);
```

### 常见事件类型

```javascript
// 鼠标事件
element.addEventListener('click', handler);      // 点击
element.addEventListener('dblclick', handler);   // 双击
element.addEventListener('mouseover', handler);  // 鼠标悬停
element.addEventListener('mouseout', handler);   // 鼠标离开
element.addEventListener('mousemove', handler);  // 鼠标移动

// 键盘事件
input.addEventListener('keydown', handler);      // 按键按下
input.addEventListener('keyup', handler);        // 按键释放
input.addEventListener('keypress', handler);    // 按键按住

// 表单事件
form.addEventListener('submit', handler);        // 表单提交
input.addEventListener('change', handler);       // 值改变
input.addEventListener('focus', handler);        // 获得焦点
input.addEventListener('blur', handler);         // 失去焦点
```

## 创建和操作元素

### 创建新元素

```javascript
// 创建新元素
const newDiv = document.createElement('div');
const newText = document.createTextNode('这是新文本');

// 添加内容到元素
newDiv.appendChild(newText);

// 或者直接设置内容
newDiv.textContent = '这是新文本';
```

### 添加元素到页面

```javascript
// 添加到父元素末尾
parentElement.appendChild(newElement);

// 在指定元素前插入
parentElement.insertBefore(newElement, referenceElement);

// 替换现有元素
parentElement.replaceChild(newElement, oldElement);
```

### 删除元素

```javascript
// 删除元素
element.remove();

// 或者通过父元素删除
parentElement.removeChild(element);
```

## 表单 API

### 表单数据收集

```javascript
// 获取表单元素
const form = document.getElementById('myForm');

// 监听表单提交
form.addEventListener('submit', function(event) {
    // 阻止默认提交行为
    event.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(form);
    
    // 遍历表单数据
    for (let [name, value] of formData.entries()) {
        console.log(name, value);
    }
});
```

### 表单验证

```javascript
// 检查表单有效性
if (form.checkValidity()) {
    console.log('表单有效');
} else {
    console.log('表单无效');
}

// 显示自定义验证消息
input.setCustomValidity('这是一个自定义错误消息');

// 清除验证消息
input.setCustomValidity('');
```

## 数据存储 API

### localStorage 和 sessionStorage

```javascript
// localStorage - 持久存储
localStorage.setItem('key', 'value');
const value = localStorage.getItem('key');
localStorage.removeItem('key');
localStorage.clear(); // 清空所有数据

// sessionStorage - 会话存储
sessionStorage.setItem('key', 'value');
const sessionValue = sessionStorage.getItem('key');
```

### IndexedDB

```javascript
// 打开数据库
const request = indexedDB.open('MyDatabase', 1);

request.onsuccess = function(event) {
    const db = event.target.result;
    // 使用数据库
};

request.onerror = function(event) {
    console.log('数据库打开失败');
};
```

## 网络 API

### Fetch API

```javascript
// GET 请求
fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// POST 请求
fetch('/api/data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({key: 'value'})
})
.then(response => response.json())
.then(data => console.log(data));
```

## 地理位置 API

```javascript
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log(`纬度: ${lat}, 经度: ${lon}`);
        },
        function(error) {
            console.log('获取位置失败:', error.message);
        }
    );
} else {
    console.log('浏览器不支持地理定位');
}
```

## 最佳实践

### 1. 使用现代 DOM API

```javascript
// 推荐：使用 querySelector
const element = document.querySelector('.my-class');

// 避免：使用过时的方法
const elements = document.getElementsByClassName('my-class');
```

### 2. 合理使用事件委托

```javascript
// 对于动态生成的元素，使用事件委托
parentElement.addEventListener('click', function(event) {
    if (event.target.classList.contains('dynamic-button')) {
        // 处理按钮点击
        console.log('动态按钮被点击');
    }
});
```

### 3. 注意内存泄漏

```javascript
// 移除不必要的事件监听器
element.removeEventListener('click', handler);

// 清理定时器
const timer = setTimeout(() => {}, 1000);
// 使用完毕后清理
clearTimeout(timer);
```

## 实践练习

1. 创建一个简单的待办事项列表应用，支持添加、删除和标记完成
2. 实现一个图片轮播组件，支持自动播放和手动切换
3. 创建一个表单验证系统，实时显示验证结果
4. 实现一个本地存储的笔记应用

## 下一步

接下来您可以深入学习：
- [最佳实践](./best-practices) - 学习更多 HTML 和 JavaScript 编写的最佳实践
- [现代前端框架](../resources/) - 了解 React、Vue 等框架如何简化 DOM 操作