# StdTable

`2025-09-26@WaterRun`

![一个StdTable示例](./assets/StdTable示例图.png)
*一个StdTable示例*  

## 概述

`PageHeader`是一个通用的表格,封装了多种功能,包括导出,可调高度,标记等.  

## 样式与交互

从上到下,依次分为三个区域:  

### 表头域

![一个StdTable表头域示例](./assets/StdTable表头域示例.png)  
*一个StdTable表头域示例*  

表头域位于表的最顶上,从做到右依次是:  

- 表标题  
- 表信息.悬浮可查看(可选,该项值为空时不显示图标)  
- 扩展功能组,悬浮可展开功能选单.包含标记和导出功能  
- 表高调节功能组,包括表高调节按钮和调节滑动条  

![一个StdTable导出浮窗示例](./assets/StdTable导出浮窗.png)  
*StdTable内置了导出功能.可以导出为多种类型,当鼠标悬浮到对应扩展功能组图标上时展开,点击对应项执行导出*  

> 导出功能收到浏览器引擎约束,导出数据量过大的表时导出内容会提示相应错误  

> 包括可导出一个带交互的独立HTML网页  

![一个StdTable表高调节浮窗示例](./assets/StdTable表高调节浮窗.png)
*一个StdTable表高调节浮窗示例.当鼠标悬浮到对应扩展功能组图标上时展开*

调节表高可以通过拖动滑条,或修改输入框内的值(带内置按钮)实现,都是实时响应的.  
滑条设置5,10,15,30,75五个挡位.输入框则没有这些限制.表高调节的范围是5-75条/页.滑条底部提示中央为当前设置表高.当当前表高不再这些值之一时,会显示对应橙色提示(如图所示).  

### 数据域

![一个StdTable数据域示例](./assets/StdTable数据域示例.png)
*一个StdTable数据域示例*  

数据域是表的核心部分: 表头字段和数据字段.  
表头字段居中显示,宽度是可自定义配置的,并会根据缩放响应.  
数据字段居左显示,和顶上的表头字段对齐.在数据字段右键可以将数据标记删除线,双击可标记高亮.  
![高亮删除线,以及展开的标记功能组件](./assets/一个带标记的StdTable.png)  
*高亮删除线,以及展开的标记功能组件*  

数据是保存在设备本机上的,只要不清除缓存,下次加载页面时仍能加载.不过,要持久化数据,还是选择导出为Python模块.导出的`.py`代码中有使用示例.  

在表的最后一页,会用占位数据填充缺失内容.  
![占位数据,高亮和删除线](./assets/StdTable占位数据和高亮与删除线.png)
*占位数据,高亮和删除线*  

### 控件域

![一个StdTable控件域示例](./assets/StdTable控件域示例.png)  
*一个StdTable控件域示例*  

表的底部是控件域.从左到右依次是状态指示器,辅助信息和GOTO跳转控件.  
状态指示器位于表的最左侧,指示当前组件的工作状态: 加载,就绪,警告,和错误.包括一个呼吸灯,状态文本,以及页数指示文本.  

控件域的正中央是辅助信息,鼠标悬浮可以显示对应内容.包括管理员配置信息,使用指引,和组件信息.  
![展开辅助信息](./assets/StdTable控件域信息.png)  
*一个展开的辅助信息*  

控件域的右侧是GOTO跳转按钮.可以点击按钮跳到首末页,或上下页.中央的输入框可以调整具体页面,并点击GOTO调整按钮或摁下回车(需要保证`key.enter`不被覆盖)进行跳转.最右侧是控件信息.  

![跳转按钮: 在最终页](./assets/StdTable无法跳转.png)  
*一个在最终页的跳转按钮*  

交互均有响应式设计,对应当前的表的状态.  

### 管理员配置

管理员可以配置表的功能.例如,修改前端过窄的响应级别乃至整个禁用,设置预定表高,或停用某些子组件.  

![禁用功能的空表](./assets/StdTable被管理员禁用功能的空表.png)  
*一个被管理员禁用了功能的空表*  

例如,当要保证表格以固定高度显示时,就可以配置预设表高,并禁用表高调节.或者,当表的内容过大导出会出错时,可以禁用导出功能.  

## 表的状态

### 加载状态

当表尝试加载数据时,表就处于加载状态.  
此时,状态指示灯闪烁,提示加载.数据段为呼吸状的加载图标:  

![加载中的表格](./assets/StdTable加载示例.png)  
*一个加载中的表格*  

每次换页,调整表高都会重新进行加载.  

### 就绪状态

当表加载完毕,且没有异常情况时,就处于就绪状态.  
就绪态不代表表中就有数据,例如加载完毕的空表也是就绪态.  

### 警告和错误

当表的运行出现故障时,便会进入警告和错误.  
![空表头的表格](./assets/StdTable无表头示例.png)  
*一个构建时表头字段为空的表格*  

例如,以上就是一个由空的表头字段构造的表格.此时,状态指示灯为橙色,显示警告.  

### 特别: 前端过窄

![前端过窄示例](./assets/StdTable前端过窄.png)  
*StdTable前端过窄*  

当识别到表的宽度不足时,表会自动进入前端过窄显示,覆盖整个表,提示用户,避免造成内容显示错误.  
管理员可配置倍率来调整响应的敏感度: 倍率越大,越敏感.也可以禁用到这整个功能.  

## 参数

```typescript
export interface StdTableConfig {
    /** 表格名称 */
    tableName: string;
    /** 表格字段列表 */
    fields: TableField[]; // "titile": 表头, "size": 宽度,整数,自动加和分配
    /** 表格初始高度(单页展示行数)，可选，默认10 */
    initialHeight?: number;
    /** 表格说明信息，可选，默认为空 */
    description?: string;
    /** 表的最小宽度倍率，可选，默认1.0 */
    minWidthRatio?: number;
    /** 表格数据，可选 */
    data?: TableRow[];
    /** 总数据条数，用于分页计算，可选 */
    totalCount?: number;
    /** 当前页码，可选，默认1 */
    currentPage?: number;
    /** 数据加载URL，用于异步加载，可选 */
    dataUrl?: string;
    /** 忽略宽度限制，可选 */
    ignoreWidthLimit?: boolean;
    /** 禁用高度调节控件，可选 */
    disableHeightAdjust?: boolean;
    /** 禁用标记控件，可选 */
    disableMarking?: boolean;
    /** 禁用导出控件，可选 */
    disableOutput?: boolean;
    /** 管理员注释，可选 */
    adminComment?: string;
}
```

## API参考

表格组件暴露了完整的API接口，可以通过组件实例访问。获取API实例的方法：

```javascript
// 等待组件加载完成
function waitForTableAPI() {
  const tableContainer = document.querySelector('#std-table-app')
  const vueInstance = tableContainer?.__vueParentComponent?.exposed || 
                     tableContainer?._vueComponent?.exposed ||
                     window.vueTableInstance
  
  if (vueInstance?.api) {
    window.tableAPI = vueInstance.api
    console.log('表格 API 已就绪')
  }
}
```

### 数据获取API

|名称|说明|参数|返回值|备注|
|---|---|---|---|---|
|`getCurrentPageData()`|获取当前页显示的数据|无|`Array`|清理后的数据数组|
|`getCurrentPageRawData()`|获取当前页原始数据|无|`Array`|包含标记信息的原始数据|
|`getAllData()`|获取全部数据|无|`Promise<Array>`|所有数据的Promise|
|`getMarkedData()`|获取标记数据|无|`Promise<Object>`|包含`highlighted`、`strikethrough`、`total`字段|
|`getFilteredData()`|获取筛选排序后的数据|无|`Promise<Array>`|应用排序后的数据|

### 状态获取API

|名称|说明|参数|返回值|备注|
|---|---|---|---|---|
|`getTableStatus()`|获取表格状态信息|无|`Object`|包含分页、状态等信息|
|`getFieldsInfo()`|获取字段配置信息|无|`Object`|包含原始字段、显示字段、置顶排序信息|
|`getMarkingStats()`|获取标记统计信息|无|`Object`|标记数量统计|
|`getConfig()`|获取表格配置|无|`Object`|完整配置对象|

### 基础操作API

|名称|说明|参数|返回值|备注|
|---|---|---|---|---|
|`gotoPage(page)`|跳转到指定页面|`number` 页码|`boolean`|是否成功跳转|
|`setTableHeight(height)`|设置表格高度|`number` 高度(5-75)|`boolean`|是否设置成功|
|`reload(params)`|重载表格数据|`Object` 可选参数|`void`|触发数据重新加载|

### 标记操作API

|名称|说明|参数|返回值|备注|
|---|---|---|---|---|
|`clearAllMarks()`|清除所有标记|无|`boolean`|是否成功|
|`clearHighlights()`|清除所有高亮|无|`boolean`|是否成功|
|`clearStrikethroughs()`|清除所有删除线|无|`boolean`|是否成功|
|`markRow(index, type)`|标记指定行|`number` 行索引, `string` 标记类型|`boolean`|type: 'highlight'或'strikethrough'|

### 字段操作API

|名称|说明|参数|返回值|备注|
|---|---|---|---|---|
|`pinField(fieldIndex)`|置顶指定字段|`number` 字段索引|`boolean`|是否成功|
|`sortByField(fieldIndex, order)`|按字段排序|`number` 字段索引, `string` 排序方向|`boolean`|order: 'asc'或'desc'|
|`clearSort()`|清除排序|无|`boolean`|是否成功|

### 导出API

|名称|说明|参数|返回值|备注|
|---|---|---|---|---|
|`exportData(format)`|导出数据|`string` 格式|`Promise<boolean>`|支持csv、json、html、markdown等|
|`exportMarkingData()`|导出标记数据|无|`Promise<boolean>`|导出Python模块|

### 查询API

|名称|说明|参数|返回值|备注|
|---|---|---|---|---|
|`queryData(predicate)`|条件查询数据|`Function` 查询函数|`Promise<Array>`|筛选函数接收row参数|
|`getUniqueValues(fieldName)`|获取字段唯一值|`string` 字段名|`Promise<Array>`|去重后的值数组|
|`getFieldStats(fieldName)`|获取字段统计|`string` 字段名|`Promise<Object>`|包含总数、唯一值、数值统计|
|`searchInField(fieldName, term, caseSensitive)`|字段内搜索|`string` 字段名, `string` 搜索词, `boolean` 区分大小写|`Promise<Array>`|匹配的数据|

### 存储管理API

|名称|说明|参数|返回值|备注|
|---|---|---|---|---|
|`clearLocalStorage()`|清除所有本地存储|无|`boolean`|清除标记和字段状态|
|`clearMarkingStorage()`|清除标记存储|无|`boolean`|仅清除当前表标记|
|`clearFieldStateStorage()`|清除字段状态存储|无|`boolean`|清除置顶排序状态|
|`getStorageInfo()`|获取存储信息|无|`Object`|存储大小统计|

### 超控操作API

|名称|说明|参数|返回值|备注|
|---|---|---|---|---|
|`override.enableMarking()`|启用标记功能|无|`boolean`|返回原始状态|
|`override.enableOutput()`|启用导出功能|无|`boolean`|返回原始状态|
|`override.enableHeightAdjust()`|启用高度调节|无|`boolean`|返回原始状态|
|`override.enableSort()`|启用排序功能|无|`boolean`|返回原始状态|
|`override.ignoreWidthLimit()`|忽略宽度限制|无|`boolean`|返回原始状态|
|`override.enableAll()`|启用所有功能|无|`Object`|返回原始配置|
|`override.restoreConfig(config)`|恢复配置|`Object` 配置对象|`void`|恢复到指定配置|
|`override.forceTableHeight(height)`|强制设置表高|`number` 高度(1-100)|`boolean`|绕过限制设置|
|`override.bypassProcessingLock()`|绕过处理锁定|无|`void`|解除处理状态锁定|

### 高级功能API

|名称|说明|参数|返回值|备注|
|---|---|---|---|---|
|`advanced.getRawConfig()`|获取原始配置|无|`Object`|内部配置对象|
|`advanced.setRawConfig(config)`|设置原始配置|`Object` 配置|`void`|直接修改内部配置|
|`advanced.getInternalState()`|获取内部状态|无|`Object`|完整内部状态|
|`advanced.setInternalState(state)`|设置内部状态|`Object` 状态|`void`|直接修改内部状态|
|`advanced.executeCustomFunction(fn)`|执行自定义函数|`Function` 自定义函数|`any`|传入内部对象执行|
|`advanced.forceUpdate()`|强制更新|无|`void`|触发组件重新渲染|

### 调试API

|名称|说明|参数|返回值|备注|
|---|---|---|---|---|
|`advanced.debug.logState()`|打印状态信息|无|`void`|控制台输出调试信息|
|`advanced.debug.testDataLoad()`|测试数据加载|无|`Promise<Array>`|测试数据获取功能|
|`advanced.debug.simulateError(type)`|模拟错误状态|`string` 错误类型|`void`|用于测试错误处理|
|`advanced.debug.resetToNormal()`|重置到正常状态|无|`void`|清除模拟的错误状态|

### 控制台使用实例

本节提供在浏览器开发者工具控制台中使用StdTable API的完整实例。所有示例均可直接复制到控制台执行。

#### API初始化

在执行任何API操作前，必须先获取API实例：

```javascript
// 获取表格API实例
function initTableAPI() {
  const tableContainer = document.querySelector('#std-table-app')
  const vueInstance = tableContainer?.__vueParentComponent?.exposed || 
                     tableContainer?._vueComponent?.exposed ||
                     window.vueTableInstance
  
  if (vueInstance?.api) {
    window.tableAPI = vueInstance.api
    console.log('表格API已就绪，可开始使用')
    return true
  } else {
    console.log('表格API未找到，请确保组件已加载完成')
    return false
  }
}

// 执行初始化
initTableAPI()
```

#### 数据查询操作

```javascript
// 获取当前页数据
const currentData = window.tableAPI.getCurrentPageData()
console.log('当前页数据条数:', currentData.length)
console.log('当前页数据:', currentData)
```

```javascript
// 获取全部数据（异步操作）
window.tableAPI.getAllData().then(allData => {
  console.log('总数据条数:', allData.length)
  console.log('前5条数据:', allData.slice(0, 5))
})
```

```javascript
// 条件查询示例：查找特定字段包含指定值的数据
window.tableAPI.queryData(row => {
  return row['品牌'] && row['品牌'].includes('华为')
}).then(results => {
  console.log('品牌包含"华为"的数据:', results)
})
```

```javascript
// 获取字段统计信息
window.tableAPI.getFieldStats('数量').then(stats => {
  console.log('数量字段统计:', stats)
})
```

```javascript
// 字段内容搜索
window.tableAPI.searchInField('条码', 'ABC', false).then(results => {
  console.log('条码字段包含"ABC"的数据:', results)
})
```

#### 表格状态查询

```javascript
// 获取表格完整状态
const status = window.tableAPI.getTableStatus()
console.log('表格状态:', status)
console.log('当前页码:', status.currentPage)
console.log('总页数:', status.totalPages)
```

```javascript
// 获取字段配置信息
const fieldsInfo = window.tableAPI.getFieldsInfo()
console.log('字段配置:', fieldsInfo)
console.log('置顶字段:', fieldsInfo.pinnedFields)
console.log('排序配置:', fieldsInfo.sortConfig)
```

```javascript
// 获取标记统计
const markingStats = window.tableAPI.getMarkingStats()
console.log('标记统计:', markingStats)
console.log('高亮行数:', markingStats.highlighted)
console.log('删除线行数:', markingStats.strikethrough)
```

#### 基础操作示例

```javascript
// 跳转到指定页面
const success = window.tableAPI.gotoPage(3)
console.log('跳转到第3页:', success ? '成功' : '失败')
```

```javascript
// 设置表格高度
const heightSet = window.tableAPI.setTableHeight(20)
console.log('设置表高为20行:', heightSet ? '成功' : '失败')
```

```javascript
// 重载表格数据
window.tableAPI.reload()
console.log('表格数据重载已触发')
```

#### 标记操作示例

```javascript
// 标记第5行为高亮
const highlighted = window.tableAPI.markRow(4, 'highlight')
console.log('标记第5行高亮:', highlighted ? '成功' : '失败')
```

```javascript
// 标记第3行为删除线
const struckthrough = window.tableAPI.markRow(2, 'strikethrough')
console.log('标记第3行删除线:', struckthrough ? '成功' : '失败')
```

```javascript
// 清除所有高亮标记
const highlightsClear = window.tableAPI.clearHighlights()
console.log('清除高亮标记:', highlightsClear ? '成功' : '失败')
```

```javascript
// 清除所有删除线标记
const strikethroughsClear = window.tableAPI.clearStrikethroughs()
console.log('清除删除线标记:', strikethroughsClear ? '成功' : '失败')
```

```javascript
// 清除所有标记
const allMarksClear = window.tableAPI.clearAllMarks()
console.log('清除所有标记:', allMarksClear ? '成功' : '失败')
```

#### 字段操作示例

```javascript
// 置顶第2个字段（索引从0开始）
const pinned = window.tableAPI.pinField(1)
console.log('置顶第2个字段:', pinned ? '成功' : '失败')
```

```javascript
// 按第1个字段升序排序
const sorted = window.tableAPI.sortByField(0, 'asc')
console.log('按第1个字段升序排序:', sorted ? '成功' : '失败')
```

```javascript
// 按第3个字段降序排序
const sortedDesc = window.tableAPI.sortByField(2, 'desc')
console.log('按第3个字段降序排序:', sortedDesc ? '成功' : '失败')
```

```javascript
// 清除排序
const sortCleared = window.tableAPI.clearSort()
console.log('清除排序:', sortCleared ? '成功' : '失败')
```

#### 导出操作示例

```javascript
// 导出为CSV格式
window.tableAPI.exportData('csv').then(success => {
  console.log('导出CSV:', success ? '成功' : '失败')
})
```

```javascript
// 导出为JSON格式
window.tableAPI.exportData('json').then(success => {
  console.log('导出JSON:', success ? '成功' : '失败')
})
```

```javascript
// 导出为独立HTML页面
window.tableAPI.exportData('html').then(success => {
  console.log('导出HTML:', success ? '成功' : '失败')
})
```

```javascript
// 导出标记数据为Python模块
window.tableAPI.exportMarkingData().then(success => {
  console.log('导出标记数据:', success ? '成功' : '失败')
})
```

#### 存储管理示例

```javascript
// 查看存储使用情况
const storageInfo = window.tableAPI.getStorageInfo()
console.log('存储信息:', storageInfo)
```

```javascript
// 清除当前表的标记存储
const markingCleared = window.tableAPI.clearMarkingStorage()
console.log('清除标记存储:', markingCleared ? '成功' : '失败')
```

```javascript
// 清除当前表的字段状态存储
const fieldStateCleared = window.tableAPI.clearFieldStateStorage()
console.log('清除字段状态存储:', fieldStateCleared ? '成功' : '失败')
```

```javascript
// 清除所有本地存储
const allStorageCleared = window.tableAPI.clearLocalStorage()
console.log('清除所有存储:', allStorageCleared ? '成功' : '失败')
```

#### 高级操作示例

```javascript
// 临时启用被管理员禁用的功能
const originalMarking = window.tableAPI.override.enableMarking()
console.log('启用标记功能，原始状态:', originalMarking)

const originalOutput = window.tableAPI.override.enableOutput()
console.log('启用导出功能，原始状态:', originalOutput)

const originalHeight = window.tableAPI.override.enableHeightAdjust()
console.log('启用高度调节，原始状态:', originalHeight)
```

```javascript
// 强制设置表高（绕过5-75限制）
const forceHeight = window.tableAPI.override.forceTableHeight(100)
console.log('强制设置表高为100行:', forceHeight ? '成功' : '失败')
```

```javascript
// 忽略宽度限制
const widthOverride = window.tableAPI.override.ignoreWidthLimit()
console.log('忽略宽度限制，原始状态:', widthOverride)
```

```javascript
// 获取内部状态（调试用）
const internalState = window.tableAPI.advanced.getInternalState()
console.log('内部状态:', internalState)
```

#### 批量操作示例

```javascript
// 批量标记数据：将所有"数量"大于100的行标记为高亮
window.tableAPI.getAllData().then(allData => {
  allData.forEach((row, index) => {
    if (row['数量'] && parseInt(row['数量']) > 100) {
      window.tableAPI.markRow(index, 'highlight')
    }
  })
  console.log('批量高亮标记完成')
})
```

```javascript
// 统计分析：按品牌统计数量
window.tableAPI.getAllData().then(allData => {
  const brandStats = {}
  allData.forEach(row => {
    const brand = row['品牌'] || '未知'
    const quantity = parseInt(row['数量']) || 0
    brandStats[brand] = (brandStats[brand] || 0) + quantity
  })
  console.log('按品牌统计数量:', brandStats)
})
```

```javascript
// 复合查询：查找特定条件的数据并导出
window.tableAPI.queryData(row => {
  const quantity = parseInt(row['数量']) || 0
  const brand = row['品牌'] || ''
  return quantity > 50 && brand.includes('华为')
}).then(results => {
  console.log('符合条件的数据:', results)
  if (results.length > 0) {
    // 这里可以进一步处理结果数据
    console.log('找到', results.length, '条符合条件的记录')
  }
})
```

#### 调试和监控示例

```javascript
// 监控表格状态变化
let previousStatus = window.tableAPI.getTableStatus()
setInterval(() => {
  const currentStatus = window.tableAPI.getTableStatus()
  if (currentStatus.currentPage !== previousStatus.currentPage) {
    console.log('页面变化：从第', previousStatus.currentPage, '页跳转到第', currentStatus.currentPage, '页')
  }
  if (currentStatus.tableHeight !== previousStatus.tableHeight) {
    console.log('表高变化：从', previousStatus.tableHeight, '行变更为', currentStatus.tableHeight, '行')
  }
  previousStatus = currentStatus
}, 1000)
```

```javascript
// 测试数据加载功能
window.tableAPI.advanced.debug.testDataLoad().then(testData => {
  console.log('数据加载测试结果:', testData)
})
```

```javascript
// 输出完整调试信息
window.tableAPI.advanced.debug.logState()
```

#### 完整工作流示例

```javascript
// 完整的数据分析工作流
async function completeAnalysis() {
  console.log('开始数据分析工作流...')
  
  // 1. 获取数据概况
  const status = window.tableAPI.getTableStatus()
  console.log('表格概况:', `共${status.totalRows}行数据，${status.totalPages}页`)
  
  // 2. 获取字段统计
  const fieldsInfo = window.tableAPI.getFieldsInfo()
  for (let field of fieldsInfo.originalFields) {
    const stats = await window.tableAPI.getFieldStats(field.title)
    console.log(`${field.title}字段统计:`, stats)
  }
  
  // 3. 查找异常数据
  const allData = await window.tableAPI.getAllData()
  const anomalies = allData.filter(row => {
    const quantity = parseInt(row['数量']) || 0
    return quantity < 0 || quantity > 10000 // 假设正常范围是0-10000
  })
  
  if (anomalies.length > 0) {
    console.log('发现', anomalies.length, '条异常数据:', anomalies)
    // 标记异常数据
    anomalies.forEach((_, index) => {
      window.tableAPI.markRow(allData.indexOf(anomalies[index]), 'strikethrough')
    })
  }
  
  // 4. 导出分析结果
  await window.tableAPI.exportData('json')
  console.log('数据分析完成，结果已导出')
}

// 执行完整分析
completeAnalysis()
```

## `.tpl`中的调用示例

<HTML>中的挂载点:

```php
    <!-- Vue StdTable组件挂载点 -->
    <div id="std-table-app">
        <div style="padding: 40px; text-align: center; color: #6c757d;">
            <div>Vue StdTable组件将在此处渲染</div>
        </div>
    </div>
```

调用示例:  

```php
    window.stdTableConfig = {
        tableName: '日库存明细表',
        fields: [
            {title: '数量',},
            {title: '条码',},
            {title: '品牌',},
        ],
        dataUrl: window.location.pathname + '?route=caiwu/daily_inventory_detail/getTableData&token=' + window.pageConfig.token,
        disableOutput: true,
    };
```

## 更新

### `2025-09-28`

- 修复了大容量导出的问题  
- 修复了在切换筛选条件后(表重载)标记不同步的问题  
- 修复了表高初始化参数无效的问题  
- 增加了执行中的表状态,以及对应提示信息  
- 表现在获取了按字段排序能力  
- 表现在获取的指定字段的能力  

已知问题:  

- `defaultPinIndex`属性不可用.  

### `2025-09-29`  

- 移除了`defaultPinIndex`属性  
- 添加了对外暴露的API功能  

