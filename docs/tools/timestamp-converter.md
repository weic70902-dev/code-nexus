# 时间戳转换工具

时间戳转换工具可以在 Unix 时间戳和人类可读的日期时间格式之间进行相互转换。

## 功能特性

- Unix 时间戳转日期时间
- 日期时间转 Unix 时间戳
- 支持多种时间格式
- 实时转换

## 使用方法

### 时间戳转日期时间
1. 在时间戳输入框中输入 Unix 时间戳（秒或毫秒）
2. 工具会自动显示对应的日期时间

### 日期时间转时间戳
1. 在日期时间输入框中输入日期时间
2. 工具会自动显示对应的 Unix 时间戳

## 支持的格式

### 输入格式
- Unix 时间戳（秒）：1609459200
- Unix 时间戳（毫秒）：1609459200000
- 日期时间：2021-01-01 00:00:00
- ISO 8601：2021-01-01T00:00:00Z

### 输出格式
- 标准日期时间格式
- ISO 8601 格式
- 本地时间格式

## 示例

### 时间戳转日期时间
```
输入：1609459200
输出：2021-01-01 00:00:00
```

### 日期时间转时间戳
```
输入：2021-01-01 00:00:00
输出：1609459200 (秒)
输出：1609459200000 (毫秒)
```

### JavaScript 代码示例
```javascript
// 获取当前时间戳（毫秒）
const now = Date.now();
console.log(now); // 例如: 1609459200000

// 获取当前时间戳（秒）
const nowInSeconds = Math.floor(Date.now() / 1000);
console.log(nowInSeconds); // 例如: 1609459200

// 时间戳转日期时间
const timestamp = 1609459200000;
const date = new Date(timestamp);
console.log(date.toString()); // Fri Jan 01 2021 08:00:00 GMT+0800 (中国标准时间)
console.log(date.toISOString()); // 2021-01-01T00:00:00.000Z

// 日期时间转时间戳
const dateString = "2021-01-01T00:00:00Z";
const dateObj = new Date(dateString);
const timestampFromDateString = dateObj.getTime();
console.log(timestampFromDateString); // 1609459200000
```

### Python 代码示例
```python
import time
from datetime import datetime

# 获取当前时间戳
now = time.time()
print(now) # 例如: 1609459200.123456

# 获取当前时间戳（整数）
now_int = int(time.time())
print(now_int) # 例如: 1609459200

# 时间戳转日期时间
timestamp = 1609459200
date = datetime.fromtimestamp(timestamp)
print(date) # 2021-01-01 08:00:00

# UTC 时间戳转日期时间
date_utc = datetime.utcfromtimestamp(timestamp)
print(date_utc) # 2021-01-01 00:00:00

# 日期时间转时间戳
date_obj = datetime(2021, 1, 1, 0, 0, 0)
timestamp_from_date = int(date_obj.timestamp())
print(timestamp_from_date) # 1609430400 (注意时区差异)
```

## 应用场景

- **日志分析** - 将日志中的时间戳转换为可读日期时间
- **API 开发** - 处理和转换不同格式的时间数据
- **数据分析** - 统一数据集中时间字段的格式
- **系统集成** - 在不同系统间传递和转换时间数据

## 注意事项

- Unix 时间戳是从 1970-01-01 00:00:00 UTC 开始计算的秒数
- 工具会自动检测输入的时间戳是秒级还是毫秒级
- 转换结果会显示本地时区和 UTC 时区的时间