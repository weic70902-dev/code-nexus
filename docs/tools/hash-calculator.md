# 哈希计算工具

哈希计算工具可以计算文本或文件的哈希值，常用于数据完整性校验和密码存储等场景。

## 功能特性

- 支持多种哈希算法
- 实时计算哈希值
- 支持文本和文件输入
- 大小写格式切换

## 支持的算法

- **MD5** - 常用的消息摘要算法
- **SHA1** - 安全哈希算法1
- **SHA256** - 安全哈希算法256位
- **SHA512** - 安全哈希算法512位
- **CRC32** - 循环冗余校验算法

## 使用方法

1. 选择哈希算法
2. 在输入框中输入文本或上传文件
3. 工具会自动计算哈希值
4. 可以复制结果到剪贴板

## 应用场景

- **文件完整性校验** - 下载文件后验证文件是否完整
- **密码存储** - 存储密码的哈希值而非明文密码
- **数据去重** - 通过哈希值识别重复文件
- **数字签名** - 验证数据是否被篡改

## 示例

### 输入文本
```
Hello, World!
```

### 不同算法的哈希值
- **MD5**: 65a8e27d8879283831b664bd8b7f0ad4
- **SHA1**: 0a0a9f2a6772942557ab5355d76af442f8f65e01
- **SHA256**: dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f

### 文件校验示例
```javascript
// 验证下载文件的完整性
const expectedHash = "dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f";
const fileHash = calculateFileHash(fileInput.files[0], "SHA256");

if (fileHash === expectedHash) {
    console.log("文件完整性校验通过");
} else {
    console.log("文件可能已被篡改");
}
```

### 密码存储示例
```javascript
// 安全地存储用户密码
const password = "userPassword123";
const salt = generateSalt(); // 生成随机盐值
const hashedPassword = sha256(password + salt);

// 存储 hashedPassword 和 salt 到数据库
storeUserCredentials(username, hashedPassword, salt);

// 验证用户登录
const storedHash = getStoredHash(username);
const storedSalt = getStoredSalt(username);
const inputHash = sha256(inputPassword + storedSalt);

if (inputHash === storedHash) {
    console.log("登录成功");
} else {
    console.log("密码错误");
}
```

## 注意事项

- MD5 和 SHA1 已被认为不够安全，不建议用于密码存储
- SHA256 及以上算法更适合安全相关的应用
- 哈希计算是单向的，无法从哈希值反推出原文
- 相同的输入总是产生相同的哈希值