# HTML 表单

表单是网页中用于收集用户输入的重要元素。通过表单，网站可以与用户进行交互，收集信息如用户名、密码、评论等。

## 表单基础

表单由 `<form>` 标签定义，包含各种输入元素：

```html
<form action="/submit" method="post">
    <!-- 表单元素 -->
</form>
```

### 常用属性

- `action`：表单提交的目标 URL
- `method`：HTTP 方法（GET 或 POST）
- `enctype`：表单数据的编码类型
- `target`：提交后在哪里显示响应
- `autocomplete`：是否启用自动完成功能
- `novalidate`：提交时是否跳过验证
- `accept-charset`：表单提交使用的字符编码

### enctype 属性值

- `application/x-www-form-urlencoded`：默认值，表单数据被编码为键值对
- `multipart/form-data`：用于文件上传
- `text/plain`：纯文本格式

## 输入元素

### 文本输入框

```html
<!-- 单行文本输入框 -->
<input type="text" name="username" placeholder="请输入用户名">

<!-- 密码输入框 -->
<input type="password" name="password" placeholder="请输入密码">

<!-- 多行文本输入框 -->
<textarea name="message" rows="5" cols="30" placeholder="请输入您的留言"></textarea>

<!-- 其他文本输入类型 -->
<input type="email" name="email" placeholder="请输入邮箱地址">
<input type="url" name="website" placeholder="请输入网址">
<input type="tel" name="phone" placeholder="请输入电话号码">
<input type="search" name="query" placeholder="搜索...">
<input type="number" name="quantity" min="1" max="100" placeholder="数量">
<input type="range" name="range" min="0" max="100" value="50">
<input type="color" name="color" value="#ff0000">
<input type="date" name="date" placeholder="请选择日期">
<input type="time" name="time" placeholder="请选择时间">
<input type="datetime-local" name="datetime" placeholder="请选择日期和时间">
<input type="month" name="month" placeholder="请选择月份">
<input type="week" name="week" placeholder="请选择周">

<!-- 带有更多属性的输入框 -->
<input type="text" name="fullname" placeholder="请输入姓名" 
       minlength="2" maxlength="50" required>

<!-- 带有所有可能属性的输入框 -->
<input type="text" name="complete" 
       placeholder="提示文本" 
       value="默认值" 
       minlength="2" 
       maxlength="50" 
       required 
       disabled 
       readonly 
       autofocus 
       autocomplete="off" 
       pattern="[A-Za-z]+" 
       title="只能输入字母">
```

### 选择框

```html
<!-- 单选按钮 -->
<input type="radio" id="male" name="gender" value="male">
<label for="male">男</label>

<input type="radio" id="female" name="gender" value="female">
<label for="female">女</label>

<!-- 复选框 -->
<input type="checkbox" id="subscribe" name="subscribe" value="yes">
<label for="subscribe">订阅邮件</label>

<!-- 下拉选择框 -->
<select name="country">
    <option value="">请选择国家</option>
    <option value="cn">中国</option>
    <option value="us">美国</option>
    <option value="uk">英国</option>
</select>

<!-- 带optgroup的下拉选择框 -->
<select name="cars">
    <optgroup label="德国品牌">
        <option value="bmw">宝马</option>
        <option value="audi">奥迪</option>
    </optgroup>
    <optgroup label="日本品牌">
        <option value="toyota">丰田</option>
        <option value="honda">本田</option>
    </optgroup>
</select>

<!-- 多选下拉框 -->
<select name="skills" multiple>
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
</select>

<!-- 数据列表 -->
<input list="browsers" name="browser">
<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
</datalist>

<!-- 带有更多属性的选择框 -->
<select name="country" required disabled>
    <option value="">请选择国家</option>
    <option value="cn" selected>中国</option>
    <option value="us">美国</option>
    <option value="uk">英国</option>
</select>

<!-- 大小和多选属性 -->
<select name="fruits" size="3" multiple>
    <option value="apple">苹果</option>
    <option value="banana">香蕉</option>
    <option value="orange">橙子</option>
    <option value="grape">葡萄</option>
</select>
```

### 按钮

```html
<!-- 提交按钮 -->
<input type="submit" value="提交">

<!-- 重置按钮 -->
<input type="reset" value="重置">

<!-- 普通按钮 -->
<input type="button" value="点击我">

<!-- 使用 button 标签 -->
<button type="submit">提交表单</button>

<!-- 带有更多属性的按钮 -->
<button type="button" onclick="alert('Hello')" disabled>禁用按钮</button>
<button type="submit" formaction="/save">保存</button>
<button type="submit" formenctype="multipart/form-data">上传文件</button>

<!-- 图像按钮 -->
<input type="image" src="submit-icon.png" alt="提交">

<!-- 不同类型的按钮 -->
<button type="button">普通按钮</button>
<button type="submit">提交按钮</button>
<button type="reset">重置按钮</button>

<!-- 带有更多属性的 button -->
<button type="submit" 
        name="action" 
        value="save" 
        disabled 
        autofocus 
        form="form1" 
        formaction="/submit" 
        formenctype="application/x-www-form-urlencoded" 
        formmethod="post" 
        formnovalidate 
        formtarget="_blank">
    提交
</button>
```

## 表单验证

HTML5 提供了内置的表单验证功能：

```html
<!-- 必填字段 -->
<input type="text" name="username" required>

<!-- 电子邮件验证 -->
<input type="email" name="email" placeholder="请输入邮箱地址">

<!-- 数字范围验证 -->
<input type="number" name="age" min="1" max="120">

<!-- 正则表达式验证 -->
<input type="text" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="格式：123-456-7890">

<!-- 其他验证属性 -->
<input type="text" name="zipcode" minlength="5" maxlength="10" placeholder="邮政编码">
<input type="password" name="password" minlength="8" placeholder="密码至少8位">
<input type="url" name="website" placeholder="网站地址">
<input type="file" name="avatar" accept="image/*" placeholder="选择头像">
<input type="text" name="color" pattern="^#[0-9A-F]{6}$" placeholder="十六进制颜色值">

<!-- 数字相关验证 -->
<input type="number" name="score" min="0" max="100" step="0.1" placeholder="分数">
<input type="range" name="rating" min="1" max="5" step="0.5" placeholder="评分">

<!-- 自定义验证消息 -->
<input type="text" name="custom" required oninvalid="this.setCustomValidity('请填写此字段')" 
       oninput="this.setCustomValidity('')">

<!-- 多种验证组合 -->
<input type="email" name="workEmail" 
       required 
       placeholder="请输入工作邮箱" 
       pattern="^[a-zA-Z0-9._%+-]+@company\.com$" 
       title="请输入公司邮箱地址"
       minlength="10">
```

## 表单组织

使用 `<fieldset>` 和 `<legend>` 来组织表单内容：

```html
<form>
    <fieldset>
        <legend>个人信息</legend>
        
        <label for="name">姓名：</label>
        <input type="text" id="name" name="name"><br><br>
        
        <label for="email">邮箱：</label>
        <input type="email" id="email" name="email"><br><br>
    </fieldset>
    
    <fieldset>
        <legend>账户设置</legend>
        
        <label for="username">用户名：</label>
        <input type="text" id="username" name="username"><br><br>
        
        <label for="password">密码：</label>
        <input type="password" id="password" name="password"><br><br>
    </fieldset>
</form>
```

## 最佳实践

1. **始终使用 label 标签**：为每个表单元素提供明确的标签
2. **合理的 name 属性**：确保服务器能正确识别表单数据
3. **适当的占位符**：使用 placeholder 属性提供输入提示
4. **表单验证**：结合客户端和服务器端验证确保数据有效性
5. **无障碍访问**：使用 aria-* 属性增强可访问性

## 实践练习

创建一个用户注册表单，包含以下字段：
1. 用户名（必填）
2. 密码（必填，至少8位）
3. 邮箱（必填，邮箱格式）
4. 性别（单选）
5. 兴趣爱好（多选）
6. 个人简介（多行文本）
7. 提交和重置按钮

## 下一步

接下来您可以学习：
- [HTML5 新特性](./html5) - 了解更多 HTML5 的新功能
- [最佳实践](./best-practices) - 学习 HTML 编写的最佳实践