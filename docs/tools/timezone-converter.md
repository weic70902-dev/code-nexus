# 时区转换工具

时区转换工具可以帮助您在不同时区之间转换时间，方便国际化应用开发和跨时区协作。

## 功能特性

- 时区之间的时间转换
- 支持全球主要城市时区
- 显示时区偏移信息
- 实时转换

## 使用方法

1. 选择源时区（默认为本地时区）
2. 选择目标时区
3. 输入或选择时间
4. 工具会自动显示转换后的时间

## 支持的时区

- UTC（协调世界时）
- GMT（格林威治标准时间）
- EST/PST（美国东部/太平洋时间）
- CET/CEST（欧洲中部时间）
- JST（日本标准时间）
- CST（中国标准时间）
- IST（印度标准时间）
- AEST/AEDT（澳大利亚东部时间）

## 示例

### 转换示例
```
源时区：北京时间 (CST, UTC+8)
目标时区：纽约时间 (EST, UTC-5)
输入时间：2021-01-01 20:00:00
转换结果：2021-01-01 07:00:00
```

### JavaScript 代码示例
```javascript
// 创建日期对象
const date = new Date('2021-01-01T20:00:00+08:00'); // 北京时间
console.log(date.toString()); // Fri Jan 01 2021 20:00:00 GMT+0800 (中国标准时间)

// 转换为 UTC 时间
console.log(date.toISOString()); // 2021-01-01T12:00:00.000Z

// 转换为纽约时间
const options = {
  timeZone: 'America/New_York',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
};
const nyTime = new Intl.DateTimeFormat('zh-CN', options).format(date);
console.log(nyTime); // 2021/01/01 07:00:00

// 获取时区偏移
console.log(date.getTimezoneOffset()); // -480 (分钟)
```

### Python 代码示例
```python
from datetime import datetime
import pytz

# 创建带时区的日期时间对象
beijing_tz = pytz.timezone('Asia/Shanghai')
ny_tz = pytz.timezone('America/New_York')

# 北京时间
beijing_time = beijing_tz.localize(datetime(2021, 1, 1, 20, 0, 0))
print(beijing_time) # 2021-01-01 20:00:00+08:00

# 转换为纽约时间
ny_time = beijing_time.astimezone(ny_tz)
print(ny_time) # 2021-01-01 07:00:00-05:00

# 获取时区信息
print(beijing_time.tzname()) # CST
print(ny_time.tzname()) # EST

# UTC 时间转换
utc_time = datetime(2021, 1, 1, 12, 0, 0, tzinfo=pytz.UTC)
beijing_from_utc = utc_time.astimezone(beijing_tz)
print(beijing_from_utc) # 2021-01-01 20:00:00+08:00
```

## 应用场景

- **国际会议安排** - 将会议时间转换为参与者所在时区的时间
- **跨国团队协作** - 统一不同时区成员的工作时间
- **全球产品发布** - 确定产品在各地区上线的最佳时间
- **旅行计划** - 计算出发地和目的地的时间差

## 注意事项

- 夏令时会影响某些时区的时间转换
- 工具会自动考虑夏令时的变化
- 转换结果会显示时区缩写和UTC偏移