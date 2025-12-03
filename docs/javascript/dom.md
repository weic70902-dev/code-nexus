# DOM 操作

DOM（Document Object Model，文档对象模型）是 HTML 和 XML 文档的编程接口。JavaScript 可以通过 DOM API 来访问和操作网页元素。

## DOM 基础

### 获取元素

```javascript
// 通过 ID 获取元素
const element = document.getElementById('myId');

// 通过类名获取元素集合
const elements = document.getElementsByClassName('myClass');

// 通过标签名获取元素集合
const paragraphs = document.getElementsByTagName('p');

// 使用 CSS 选择器获取元素（推荐）
const firstMatch = document.querySelector('.myClass');
const allMatches = document.querySelectorAll('.myClass');

// 获取特定元素
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
element.classList.contains('someClass'); // 检查是否包含某个类

// 设置 data-* 属性
element.dataset.userId = '123';
element.dataset.userName = '张三';
```

### 修改元素样式

```javascript
// 直接修改样式
element.style.color = 'red';
element.style.fontSize = '20px';

// 修改 CSS 类来控制样式
element.classList.add('highlight');

// 批量设置样式
element.style.cssText = 'color: blue; font-size: 18px;';

// 获取计算后的样式
const color = getComputedStyle(element).color;

// 设置 CSS 变量
element.style.setProperty('--custom-color', 'green');

// 批量添加类名
element.classList.add('class1', 'class2', 'class3');
```

## 事件处理

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

// 事件对象属性和方法
button.addEventListener('click', function(event) {
    console.log('事件类型:', event.type);
    console.log('目标元素:', event.target);
    console.log('当前目标:', event.currentTarget);
    console.log('鼠标坐标:', event.clientX, event.clientY);
    
    // 阻止默认行为
    event.preventDefault();
    
    // 阻止事件冒泡
    event.stopPropagation();
});

// 事件捕获和冒泡
// 捕获阶段
button.addEventListener('click', handler, true);
// 冒泡阶段（默认）
button.addEventListener('click', handler, false);
// 或者使用对象形式
button.addEventListener('click', handler, { capture: true });

// 一次性事件监听器
button.addEventListener('click', handler, { once: true });

// 被动事件监听器（提升性能）
button.addEventListener('touchstart', handler, { passive: true });
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
element.addEventListener('mouseenter', handler); // 鼠标进入
element.addEventListener('mouseleave', handler); // 鼠标离开
element.addEventListener('wheel', handler);      // 鼠标滚轮

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
input.addEventListener('select', handler);       // 文本被选中

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

## 表单操作

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
```

## 实践练习

1. 创建一个待办事项列表应用，支持添加、删除和标记完成任务
2. 实现一个图片轮播组件，支持自动播放和手动切换
3. 创建一个表单验证系统，实时显示验证结果
4. 实现一个模态对话框组件，支持打开、关闭和自定义内容

## 下一步

接下来您可以学习：
- [TypeScript 埀门](./ts-basics) - 开始学习 TypeScript
- [最佳实践](./best-practices) - 学习 JavaScript 和 TypeScript 编码规范与优化技巧