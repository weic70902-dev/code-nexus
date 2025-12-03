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

// 通过 name 属性获取元素
const inputs = document.getElementsByName('username');

// 获取特定关系的元素
const parent = element.parentElement;
const children = element.children;
const firstChild = element.firstElementChild;
const lastChild = element.lastElementChild;
const nextSibling = element.nextElementSibling;
const previousSibling = element.previousElementSibling;
```

### 修改元素内容

```javascript
// 修改文本内容
element.textContent = '新的文本内容';

// 修改 HTML 内容
element.innerHTML = '<strong>新的 HTML 内容</strong>';

// 修改表单元素的值
inputElement.value = '新的值';

// 其他内容修改方法
element.innerText = '新的文本内容'; // 考虑样式影响的文本内容
element.outerHTML = '<div>新的整个元素</div>';

// 修改多个元素的内容
const elements = document.querySelectorAll('.myClass');
elements.forEach(el => el.textContent = '新内容');
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

// 其他属性操作
const hasClass = element.classList.contains('someClass');
element.dataset.userId = '123'; // 设置 data-* 属性
element.style.backgroundColor = 'blue'; // 修改内联样式

// 批量设置属性
const attrs = {src: 'image.jpg', alt: '描述', width: '300'};
Object.keys(attrs).forEach(key => element.setAttribute(key, attrs[key]));
```

### 修改元素样式

```javascript
// 直接修改样式
element.style.color = 'red';
element.style.fontSize = '20px';

// 修改 CSS 类来控制样式
element.classList.add('highlight');

// 其他样式操作
element.style.cssText = 'color: blue; font-size: 18px;'; // 批量设置样式
const color = getComputedStyle(element).color; // 获取计算后的样式
element.style.setProperty('--custom-color', 'green'); // 设置 CSS 变量

// 批量添加类名
element.classList.add('class1', 'class2', 'class3');

// 条件性添加类名
element.classList.toggle('active', isActive);
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
element.addEventListener('mousedown', handler);  // 鼠标按下
element.addEventListener('mouseup', handler);    // 鼠标释放
element.addEventListener('contextmenu', handler); // 右键菜单

// 键盘事件
input.addEventListener('keydown', handler);      // 按键按下
input.addEventListener('keyup', handler);        // 按键释放
input.addEventListener('keypress', handler);    // 按键按住

// 表单事件
form.addEventListener('submit', handler);        // 表单提交
input.addEventListener('change', handler);       // 值改变
input.addEventListener('focus', handler);        // 获得焦点
input.addEventListener('blur', handler);         // 失去焦点
input.addEventListener('input', handler);        // 输入时触发

// 页面事件
document.addEventListener('DOMContentLoaded', handler); // DOM 加载完成
window.addEventListener('load', handler);        // 页面完全加载
document.addEventListener('scroll', handler);    // 页面滚动
window.addEventListener('resize', handler);      // 窗口大小改变

// 触摸事件
element.addEventListener('touchstart', handler); // 触摸开始
element.addEventListener('touchmove', handler);  // 触摸移动
element.addEventListener('touchend', handler);   // 触摸结束
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

// 创建复杂的元素结构
const container = document.createElement('div');
container.className = 'card';

const title = document.createElement('h2');
title.textContent = '卡片标题';

const content = document.createElement('p');
content.textContent = '卡片内容';

container.appendChild(title);
container.appendChild(content);
```

### 添加元素到页面

```javascript
// 添加到父元素末尾
parentElement.appendChild(newElement);

// 在指定元素前插入
parentElement.insertBefore(newElement, referenceElement);

// 替换现有元素
parentElement.replaceChild(newElement, oldElement);

// 其他插入方法
parentElement.prepend(newElement);  // 插入到开头
parentElement.append(newElement);   // 插入到末尾
referenceElement.before(newElement); // 插入到参考元素前
referenceElement.after(newElement);  // 插入到参考元素后

// 使用 innerHTML 插入 HTML 字符串
parentElement.innerHTML += '<p>新段落</p>';

// 使用 insertAdjacentHTML 插入 HTML
parentElement.insertAdjacentHTML('beforeend', '<p>新段落</p>');
```

### 删除元素

```javascript
// 删除元素
element.remove();

// 或者通过父元素删除
parentElement.removeChild(element);

// 删除所有子元素
while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
}

// 条件性删除
if (element.parentNode) {
    element.parentNode.removeChild(element);
}
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
    
    // 转换为普通对象
    const formObject = Object.fromEntries(formData.entries());
    
    // 获取特定字段值
    const username = formData.get('username');
    
    // 检查字段是否存在
    const hasEmail = formData.has('email');
    
    // 添加额外数据
    formData.append('timestamp', Date.now());
});

// 手动创建 FormData
const manualData = new FormData();
manualData.append('name', 'John');
manualData.append('file', fileInput.files[0]);
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

// 获取验证状态
const validity = input.validity;
console.log(validity.valid); // 是否有效
console.log(validity.patternMismatch); // 是否与pattern不匹配
console.log(validity.valueMissing); // 是否缺少必填值

// 显示验证消息
input.reportValidity();

// 自定义验证逻辑
input.addEventListener('input', function() {
    if (this.value.length < 8) {
        this.setCustomValidity('密码至少8位');
    } else {
        this.setCustomValidity('');
    }
});
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
sessionStorage.removeItem('key');
sessionStorage.clear(); // 清空所有数据

// 存储复杂数据类型
const user = {name: 'John', age: 30};
localStorage.setItem('user', JSON.stringify(user));
const storedUser = JSON.parse(localStorage.getItem('user'));

// 监听存储变化
window.addEventListener('storage', function(e) {
    console.log('存储发生变化:', e.key, e.newValue);
});

// 检查存储支持
if (typeof(Storage) !== "undefined") {
    localStorage.setItem('test', 'supported');
} else {
    console.log('不支持 Web Storage');
}
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

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    
    // 创建对象仓库（类似表）
    const objectStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
    
    // 创建索引
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
    
    // 添加初始数据
    objectStore.add({name: 'John', email: 'john@example.com'});
};

// 添加数据
function addUser(db, user) {
    const transaction = db.transaction(['users'], 'readwrite');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.add(user);
    
    request.onsuccess = function(event) {
        console.log('用户添加成功');
    };
}

// 查询数据
function getUser(db, id) {
    const transaction = db.transaction(['users']);
    const objectStore = transaction.objectStore('users');
    const request = objectStore.get(id);
    
    request.onsuccess = function(event) {
        console.log('用户信息:', request.result);
    };
}
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

// 更完整的 Fetch 示例
async function fetchData() {
    try {
        const response = await fetch('/api/users', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取数据失败:', error);
    }
}

// 上传文件
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('/api/upload', {
    method: 'POST',
    body: formData
});
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

// 监视位置变化
const watchId = navigator.geolocation.watchPosition(
    function(position) {
        console.log(`新位置: ${position.coords.latitude}, ${position.coords.longitude}`);
    },
    function(error) {
        console.log('监视位置失败:', error.message);
    },
    {
        enableHighAccuracy: true, // 高精度
        timeout: 5000,           // 超时时间
        maximumAge: 0            // 缓存时间
    }
);

// 停止监视
navigator.geolocation.clearWatch(watchId);

// 获取位置的选项参数
navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
    enableHighAccuracy: true,  // 启用高精度
    timeout: 10000,           // 超时时间（毫秒）
    maximumAge: 60000         // 最大缓存时间（毫秒）
});
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